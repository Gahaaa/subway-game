import './style.css';

const Result = () => {
    return (
        <div className="result">
            <div>
                <img id="level_img" className="level_img" src="./img/level1.png" alt="level1"/>
                <p className="score">
                    <strong><span id="my_score"></span>점</strong>
                    <span id="result_txt"></span>
                </p>
            </div>
            <span className="retry_btn"  onClick="window.location.replace('main.html');">
                <img className="level_img" src="./img/retry_btn.png" alt="다시하기"/>
            </span>
        </div>
    );
};

export default Result;
