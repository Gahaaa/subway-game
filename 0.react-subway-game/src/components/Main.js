import { Link } from 'react-router-dom';
import './style.css';

function popupOpen() {
    document.querySelector('#popup').style.display='block';

}

function popupClose() {
    document.querySelector('#popup').style.display='none';
}

const Main = () => {
    return (
        <>
        <div className="main">
            <h1><img src="./img/tit.png" alt="제목"/></h1>
            <ul className="number_wrap">
                <li><img src="./img/num1.png" alt="1"/></li>
                <li><img src="./img/num2.png" alt="2"/></li>
                <li><img src="./img/num3.png" alt="3"/></li>
                <li><img src="./img/num4.png" alt="4"/></li>
            </ul>

            <div className="subway_wrap">
                <ul className="subway">
                    <li><img src="./img/subway.jpg" alt="지하철"/></li>
                    <li><img src="./img/subway.jpg" alt="지하철"/></li>
                    <li><img src="./img/subway.jpg" alt="지하철"/></li>
                    <li><img src="./img/subway.jpg" alt="지하철"/></li>
                </ul>
            </div>

            <ul className="btn_wrap">
                <li>
                    <Link to="/game">
                        <img className="btn" src="./img/btn_start.png" alt="시작버튼"/>
                    </Link>
                    <img className="mice" src="./img/mice.png" alt="시골쥐"/>
                </li>
                <li>
                    <img 
                    className="btn" 
                    src="./img/btn_howto.png" 
                    alt="게임방법"
                    onClick={popupOpen}/>
                    <img className="mice" src="./img/mice.png" alt="시골쥐"/>
                </li>
            </ul>
        </div>
        <div className="popup" id="popup">
        <div className="bg" onClick={popupClose}></div>
        <div className="cont">
            <span 
            className="close" 
            onClick={popupClose}>
                x
            </span>
            <p>
                랜덤으로 나오는 지하철 호선에
                <br/>정답을 입력해 주세요~
                <br/>중복으로 정답 입력시 오답처리됩니다.
                <br/>한 문제당 10초안에 풀어주세요
                <br/>
                <br/><span>*'역'을 제외하고 입력해주세요
                <br/>예: 강남역 →강남</span>
            </p>
        </div>
    </div>
    </>
    );
};

export default Main;