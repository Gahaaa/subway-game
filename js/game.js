const url = 'http://openapi.seoul.go.kr:8088/747a62694f7279753132327063576747/xml/SearchSTNBySubwayLineInfo/1/300/';
// 역이름
let subwayNM =[];
// 노선 정보
let subwayLine =[];

fetch(url)
    .then(response => response.text())
    .then(data => {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data, 'text/xml');
        // getElementByTagName 메서드를 사용하여 원하는 태그 선택
        var nameTags = xmlDoc.getElementsByTagName('STATION_NM');
        var numTags = xmlDoc.getElementsByTagName('LINE_NUM');

        // console.log(nameTags.textContent);
        for (var i = 0; i < nameTags.length; i++) {
            subwayNM.push(nameTags[i].textContent);
            subwayLine.push(numTags[i].textContent);


        }
        console.log(subwayNM);

        randomQuiz();
        chkAnswr();
        setInterval(timer, 1000);


    })
    .catch(error => {
        console.error('API 호출 중 오류 발생:', error);
    });


// 맞은 정답 배열
let myAnswr =[];
// 푼 문제 개수
let myQuiz = 0;
// 맞은 점수
let myScore = 0;
// 타이머
let timerNum = 6;

const quizBg = document.querySelector('.quiz_area >div:first-of-type');
const quizTit = document.querySelector('.quiz_area .quiz > p span');
const quizBtn = document.getElementById('quiz_submit');
const timerImg = document.getElementById('timer');

// 랜덤노선 문제
let randomLine = Math.floor(Math.random() * 4+1);
let randomLineTxt = `${randomLine}호선`;

// 퀴즈 랜덤 노출& class 추가, 삭제
function randomQuiz() {
    randomLine = Math.floor(Math.random() * 4+1);
    randomLineTxt = `${randomLine}호선`;

    quizBg.classList.remove('line1','line2','line3','line4');
    quizBg.classList.add(`line${randomLine}`);

    quizTit.innerText = randomLineTxt;

}


function chkAnswr(){
    quizBtn.addEventListener('submit', (e)=>{
        e.preventDefault();
        // 푼문제 카운트
        myQuiz+=1;
        setTimeout(clearTime, 1000);
        if(timerNum === 6){
            setInterval(timer, 1000);
        }



        let answr = document.getElementById('subwayName').value;
        let answrNum = subwayLine[subwayNM.indexOf(answr)];
        const result = subwayNM.filter((item) =>item == answr);

        // 전체 지하철 배열에 내가 입력한 역이 있을 때
        if(subwayNM.includes(answr)) {
            console.log(subwayLine.length);

            // 문제 호선과 일치할 때
            if(answrNum === `0${randomLineTxt}`){
                nextQuiz(answr);
                clearAnswr();

                // 중복 노선 처리
            }else if(result.length >= 2) {
                for(i=1; i < subwayLine.length; i++){
                    // console.log(subwayLine[i]);
                    if(subwayLine[i] === `0${randomLineTxt}`){
                        console.log(subwayLine[i]);
                        console.log(`0${randomLineTxt}`);

                        nextQuiz(answr);
                        clearAnswr();
                        return false;
                    }
                }

                // 배열에 존재하지만 답이 아님
            }else {
                scoring(2);
                clearAnswr();
                console.log('배열에 존재하지만 답이 아님');
                console.log(result.length);
                console.log(answrNum + "," + randomLineTxt);

            }

            // 배열 자체에 있지도 않음;;
        }else {
            scoring(2);
            clearAnswr();
            console.log('배열 자체에 있지도 않음;;');
        }



    });


}

// 정답일 때 처리(중복체크/스코어)
function nextQuiz(answr){
    if(myAnswr.includes(answr)){
        scoring(3);
        return false;
    }
    scoring(1);
    myAnswr.push(answr);
    myScore = myScore + 10;

}
// input값 초기화
function clearAnswr() {
    if(myQuiz === 10){
        alert('퀴즈 끝!');
        location.replace(`result.html?score=${myScore}`);
        // window.location.replace('main.html');

    }
    randomQuiz();
    document.getElementById('subwayName').value = null;
    console.log(myQuiz);
    console.log(myScore);
}

// 타이머
function timer() {
    if(timerNum === 0){
        clearTime();
        location.replace(`result.html?score=${myScore}`);
        timerNum=6;
        return false;
    }
    timerNum-=1;
    timerImg.src = `./images/timer_${timerNum}s.png`;
    console.log(timerNum)


}

function clearTime() {
    clearInterval(timer);
    timerNum=6;
    timerImg.src = `./images/timer_${timerNum}s.png`;
    
}

// 채점
function scoring(scr) {
    const scoringImg = document.getElementById('scoring');

    scoringImg.src = `./images/scoring${scr}.png`;
    scoringImg.style.display="block";
    setTimeout(function () {
        scoringImg.style.display="none";
    }, 1000);
}



//시간초