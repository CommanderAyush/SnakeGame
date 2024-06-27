import React from "react";

function OverScreen(props)
{
    var newhighscore=props.score<props.highScore;
    return(
        <div className="gameOver">
            <div className="Window">
                {newhighscore?
                <div className="Score">Score:{props.score}</div>
                :
                <div className="Score">New highscore:{props.score}</div>
                }
                <div className="PlayAgain"><button  onClick={()=>{props.GameOver()}}>Play Again</button></div>
            </div>
        </div>
    )
}
export default OverScreen;