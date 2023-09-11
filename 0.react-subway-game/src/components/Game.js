import './style.css';

const Game = () => {
    return (
        <div className="quiz_area">
            <div className="quiz">
                <p><span></span> 역은?</p>
            </div>
            <div className="answr_area">
                <form id="quiz_submit">
                    <label htmlFor="subwayName">
                        {/* 답안 입력 */}
                        <input id="subwayName" type="text" placeholder="" autoComplete="off"/>
                    </label>
                    <button>제출</button>
                </form>
                {/* 타이머 이미지 */}
                <img id="timer" className="timer" src="./img/timer_10s.png" alt="타이머"/>
            </div>
            {/* 정답, 오답 팝업 */}
            <img className="scoring" id="scoring" src="./img/scoring1.png" alt="채점"/>
        </div>
    );
};

export default Game;
