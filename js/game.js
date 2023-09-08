// var xhr = new XMLHttpRequest();
// var url = 'http://openapi.seoul.go.kr:8088/747a62694f7279753132327063576747/xml/SearchSTNBySubwayLineInfo/1/100/%20/%20/1%ED%98%B8%EC%84%A0'; /* URL */

const url = 'http://openapi.seoul.go.kr:8088/747a62694f7279753132327063576747/xml/SearchSTNBySubwayLineInfo/1/300/';
const urlNum1 = 'http://openapi.seoul.go.kr:8088/747a62694f7279753132327063576747/xml/SearchSTNBySubwayLineInfo/1/500/%20/%20/1%ED%98%B8%EC%84%A0';
const urlNum2 = 'http://openapi.seoul.go.kr:8088/747a62694f7279753132327063576747/xml/SearchSTNBySubwayLineInfo/1/500/%20/%20/2%ED%98%B8%EC%84%A0';
const urlNum3 = 'http://openapi.seoul.go.kr:8088/747a62694f7279753132327063576747/xml/SearchSTNBySubwayLineInfo/1/500/%20/%20/3%ED%98%B8%EC%84%A0';

let subwayNM =[];
let subwayLine =[];
let myAnswr =[];
// 푼 문제 개수
let myQuiz = 0;
// 맞은 점수
let myScore = 0;
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


    })
    .catch(error => {
        console.error('API 호출 중 오류 발생:', error);
    });

const quizBg = document.querySelector('.quiz_area >div:first-of-type');
const quizTit = document.querySelector('.quiz_area .quiz > p span');
const quizBtn = document.getElementById('quiz_submit');
let randomLine = Math.floor(Math.random() * 4+1);
let randomLineTxt = `${randomLine}호선`;

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

        let answr = document.getElementById('subwayName').value;
        let answrNum = subwayLine[subwayNM.indexOf(answr)];
        const result = subwayNM.filter((item, idx) =>item == answr);

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
                alert('틀렸습니다.');
                clearAnswr();
                console.log('배열에 존재하지만 답이 아님');
                console.log(result.length);
                console.log(answrNum + "," + randomLineTxt);

            }

            // 배열 자체에 있지도 않음;;
        }else {
            alert('틀렸습니다.');
            clearAnswr();
            console.log('배열 자체에 있지도 않음;;');
        }



    });


}

// 정답일 때 처리(중복체크/스코어)
function nextQuiz(answr){
    if(myAnswr.includes(answr)){
        alert("중복입력");
        return false;
    }
    alert('맞았습니다.');
    myAnswr.push(answr);
    myScore = myScore + 10;

}
// input값 초기화
function clearAnswr() {
    if(myQuiz === 10){
        alert('퀴즈 끝!');

    }
    randomQuiz();
    document.getElementById('subwayName').value = null;
    console.log(myQuiz);
    console.log(myScore);
}



//중복체크, 스코어, 시간초