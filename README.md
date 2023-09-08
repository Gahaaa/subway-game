# subway-game

## 1. loading
로딩화면
4.5초후 main으로 넘어감

## 2. main
간단한 방법,
게임 시작 버튼

## 3. game

### 지하철 노선도 API 사용
https://data.seoul.go.kr/dataList/OA-15442/S/1/datasetView.do
공공 데이터 가져옴
```js
fetch(url)
    .then(response => response.text())
    .then(data => {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data, 'text/xml');
        // getElementByTagName 메서드를 사용하여 원하는 태그 선택
        console.log(xmlDoc);
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
```

<br>

### 퀴즈 랜덤노출
정답 입력시 마다 1~4호선 문제 랜덤노출
```js
function randomQuiz() {
    randomLine = Math.floor(Math.random() * 4+1);
    randomLineTxt = `${randomLine}호선`;

    quizBg.classList.remove('line1','line2','line3','line4');
    quizBg.classList.add(`line${randomLine}`);

    quizTit.innerText = randomLineTxt;

}
```

### 정답 확인
두 베열에 각각 호선, 역이름 넣음
```js
for (var i = 0; i < nameTags.length; i++) {
            subwayNM.push(nameTags[i].textContent);
            subwayLine.push(numTags[i].textContent);


        }
```
전체 배열에 내 답이 있을 때(해당역이 존재할 때)

1. 호선, 역이름이 일치할 때(정답)
- 배열에 해당 역이 하나만 존재
- 두 개 이상 존재 (환승역)

2. 배열에만 존재하고 일치하지 않을 때(오답)

```js
    // 1. 배열에 해당 역이 하나만 존재
    if(answrNum === `0${randomLineTxt}`){
        nextQuiz(answr);
        clearAnswr();

    // 1. 두 개 이상 존재 (환승역)
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

   //2. 배열에만 존재하고 일치하지 않을 때(오답)
    }else {
        alert('틀렸습니다.');
        clearAnswr();
        console.log('배열에 존재하지만 답이 아님');
        console.log(result.length);
        console.log(answrNum + "," + randomLineTxt);

    }

``` 

<br>

## 3. result
game에서 점수를 넘김
```js
// game.js
if(myQuiz === 10){
        alert('퀴즈 끝!');
        location.replace(`result.html?score=${myScore}`);
        // window.location.replace('main.html');

    }
```
result에서 점수를 가져와
점수에 따른 결과 노출!
```js
result.js
const urlParams = new URL(location.href).searchParams;

const score = parseInt(urlParams.get('score'));
```