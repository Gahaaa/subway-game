const urlParams = new URL(location.href).searchParams;

const score = parseInt(urlParams.get('score'));
const myScoreTxt = document.getElementById('my_score');
const resultTxt = document.getElementById('result_txt');
const resultImg = document.getElementById('level_img');

(() => {
    myScoreTxt.innerText= score;
    if(score>=70){
        resultTxt.innerHTML="원하는 역에 도착했어요.<br/>서울쥐가 다 됐군요.";
        resultImg.src = "./images/level3.png";
        return false;

    }else if(score>=40){
        resultTxt.innerHTML="거의 다 왔어요.<br/>노선도를 유심히 보세요.";
        resultImg.src = "./images/level2.png";
        return false;

    }else {
        resultTxt.innerHTML="미아가 되었군요.<br/>역무원을 찾아가세요.";
        resultImg.src = "./images/level1.png";
        return false;

    }
})();
