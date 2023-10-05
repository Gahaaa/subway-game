import './style.css';
import Result from "./Result";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// useNavigate

const Game = () => {
  const [subwayNM, setSubwayNM] = useState([]); // 지하철 역 이름을 저장하는 상태
  const [subwayLine, setSubwayLine] = useState([]); // 지하철 라인 번호를 저장하는 상태
  const [randomLine, setRandomLine] = useState(Math.floor(Math.random() * 4+1));//랜덤 문제
  const [myQuiz, setMyQuiz] = useState(0);// 푼 퀴즈 개수
  const [myScore, setMyScore] = useState(0);// 점수
  const [timer, setTimer] = useState(10);// 타이머
  const [myAnswr, setMyAnswr] = useState([]);// 맞은 문제 배열
  const [formData, setFormData] = useState("");
  const [animation, setAnimation] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://openapi.seoul.go.kr:8088/747a62694f7279753132327063576747/xml/SearchSTNBySubwayLineInfo/1/300/");
        if (!response.ok) {
          throw new Error('API 호출 중 오류 발생');
        }
        const data = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');

        const nameTags = xmlDoc.getElementsByTagName('STATION_NM');
        const numTags = xmlDoc.getElementsByTagName('LINE_NUM');

        const subwayNMArray = [];
        const subwayLineArray = [];

        for (let i = 0; i < nameTags.length; i++) {
          subwayNMArray.push(nameTags[i].textContent);
          subwayLineArray.push(numTags[i].textContent);
        }

        setSubwayNM(subwayNMArray);
        setSubwayLine(subwayLineArray);
        console.log(subwayNMArray);
        console.log(subwayLineArray);
        

        // chkAnswr();
        // setInterval(timerStart, 1000);
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 두 번째 인수로 전달하여 한 번만 실행되도록 설정

  // render 메서드에서 상태(subwayNM, subwayLine) 사용 가능

  const chkAnswr = (e) =>{
    e.preventDefault();
    
    // 답 입력값
    let answr = document.getElementById('subwayName').value;
    if(answr === "서울") {
        answr = "서울역";
    }

    let answrNum = subwayLine[subwayNM.indexOf(answr)];
    // 중복호선(환승역)확인
    const result = subwayNM.filter((item) =>item === answr);

    // 애니메이션 실행 끝난 후
    if(animation){
      setAnimation(animation=> animation=false);
      setMyQuiz(myQuiz=> myQuiz+=1);

      // 전체 지하철 배열에 내가 입력한 역이 있을 때
    if(subwayNM.includes(answr)) {
      // 문제 호선과 일치할 때
      if(answrNum === `0${randomLine}호선`){
          nextQuiz(answr);
          clearAnswr();
          console.log("문제 호선과 일치할 때")

          // 중복 노선 처리
      }else if(result.length >= 2) {
        nextQuiz(answr);
        clearAnswr();

          subwayLine.map((el, idx) =>{
              if(el[idx] === `0${randomLine}`){
                  console.log(el[idx]);
                  console.log(`0${randomLine}`);
                  return false;

              }
              

          })
          console.log("중복 노선 처리")
          

          // 배열에 존재하지만 답이 아님
      }else {
          scoring(2);
          clearAnswr();
          console.log('배열에 존재하지만 답이 아님');
          console.log(answrNum + "," + randomLine);

      }

      // 배열 자체에 있지도 않음;;
  }else {
      scoring(2);
      clearAnswr();
      console.log('배열 자체에 있지도 않음;;');
  }

  setTimeout(()=>{
    setAnimation(animation=> animation=true)

  },1000)

    }

    
  }

  // 정답일 때 처리(중복체크/스코어)
function nextQuiz(answr){
  if(myAnswr.includes(answr)){
      scoring(3);
      console.log("중복입력, 정답 x")
      return false;
  }
  scoring(1);
  setMyScore(myScore=>myScore + 10);
  setMyAnswr([...myAnswr, answr]);

}

// input값 초기화
function clearAnswr() {
  console.log(`${myQuiz}푼 개수`)
  if(myQuiz >= 10){
      alert('퀴즈 끝!');
      document.querySelector('.quiz_area').style.display = 'none';
      document.querySelector('.result').style.display = 'block';

      setMyQuiz(myQuiz=>myQuiz=0);

  }

  setRandomLine(randomLine => randomLine = Math.floor(Math.random() * 4+1));
  document.getElementById('subwayName').value = null;

}

// 채점
function scoring(scr) {
  const scoringImg = document.getElementById('scoring');

  scoringImg.src = `./img/scoring${scr}.png`;
  scoringImg.style.display="block";
  setTimeout(function () {
      scoringImg.style.display="none";
  }, 1000);
}

useEffect(() => {
  let interval;

  // timer가 0보다 큰 경우에만 타이머 설정
  if (timer > 0) {
    interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
  }

  // 컴포넌트가 언마운트될 때 타이머 정리
  return () => {
    clearInterval(interval);
  };
}, [timer]);

  

    return (
      <>
      <div className="quiz_area">
            <div className={`quiz line${randomLine}`}>
                <p><span>{randomLine}호선</span> 역은?</p>
            </div>
            <div className="answr_area">
                <form id="quiz_submit" onSubmit={chkAnswr}>
                    <label htmlFor="subwayName">
                        {/* 답안 입력 */}
                        <input id="subwayName" type="text" placeholder="" autoComplete="off"/>
                    </label>
                    <button id="answr_btn" type="submit">제출</button>
                </form>
                {/* 타이머 이미지 */}
                <img id="timer" className="timer" src={`./img/timer_${timer}s.png`} alt="타이머"/>
            </div>
            {/* 정답, 오답 팝업 */}
            <img className="scoring" id="scoring" src="./img/scoring1.png" alt="채점"/>
        </div>
        <Result myScore={myScore}/>
      </>
    );
};

export default Game;
