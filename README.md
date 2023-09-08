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
정답 입력시 마다

## 3. result