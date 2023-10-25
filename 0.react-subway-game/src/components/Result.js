import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';


const Result = ({myScore}) => {
    const navigate = useNavigate();
    return (
        <div className="result">
            <div>
                <img id="level_img" className="level_img" src="./img/level1.png" alt="level1"/>
                <p className="score">
                    <strong><span id="my_score">{myScore}</span>점</strong>
                    <span id="result_txt"></span>
                </p>
            </div>
            <span className="retry_btn" 
            // onClick={navigate("/")}
            >
                <img className="level_img" src="./img/retry_btn.png" alt="다시하기"/>
            </span>
        </div>
    );
};

export default Result;