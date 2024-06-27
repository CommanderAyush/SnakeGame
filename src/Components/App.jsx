import React from "react";
import OverScreen from './OverScreen';
var initialDirection="Left";
var direction=initialDirection;

function App(){
    var initialSnake=[{x:5,y:5},{x:4,y:5},{x:3,y:5}];
    var initialFood={x:8,y:8};
    
    var CellArray=[];
    
    var gridSize=20;
    var [Score,setScore]=React.useState(0);
    var [game,Setgame]=React.useState(false);
    var [Snake,SetSnake]=React.useState(initialSnake);
    var [Food,SetFood]=React.useState(initialFood);
    var [highScore,setHighScore]=React.useState(0);
    function create()
    {
        
        var count=0;
        var ind=0;
        for(var i=0;i<gridSize;i++)
        {
            for(var j=0;j<gridSize;j++)
            {
                if(ind===0){ind=1}
                else{ind=0}
                var className="Cell";
                var isFood=Food.x===i && Food.y===j;
                var isSnake=Snake.some(ele=> ele.x===i && ele.y===j)
                var head=Snake[0].x===i && Snake[0].y===j;
                if(ind){
                    className=className+" diff";
                }
                if(isFood){
                    className=className+" Food";
                }
                else if(head){
                    className=className+" Head";
                }
                else if(isSnake){
                    className=className+" Snake";
                }
                    
                var ele=<div className={className} key={count} ></div>;
                CellArray.push(ele);
                count++;
            }
            if(ind===0){ind=1}
                else{ind=0}
        }
        return CellArray
    }

    function FoodGenerator()
    {
       
        while(1<2)
        {
            var A=Math.floor(Math.random()*gridSize);
            var B=Math.floor(Math.random()*gridSize);
            if(Snake.find((val)=> val.x!==A) && Snake.find(val=> val.y!==B)){
              SetFood({x:A,y:B});
                return;
            }
        }
    }
    function gameOver()
    {
        SetSnake(initialSnake);
        direction=initialDirection;
        SetFood(initialFood);
        if(highScore<Score){
           setHighScore(Score);
        }
        setScore(0);
        Setgame(false);
    }
    function Path()
    {
        
        var ateFood=false;            
        var newSnake=[...Snake];
        if(direction==="Left"){
            newSnake.unshift({x:Snake[0].x,y:Snake[0].y-1})
        }
        else if(direction==="Right"){
            newSnake.unshift({x:Snake[0].x,y:Snake[0].y+1})
        }
        else if(direction==="Up"){
            newSnake.unshift({x:Snake[0].x-1,y:Snake[0].y})
        }
        else if(direction==="Down"){
            newSnake.unshift({x:Snake[0].x+1,y:Snake[0].y})
        }

        var bit=false;
        for(var i=1;i<newSnake.length;i++){
            if(newSnake[0].x===newSnake[i].x && newSnake[0].y===newSnake[i].y){
                bit=true;
                break;
            }
        }

        if(Food.x===newSnake[0].x && Food.y===newSnake[0].y){
            setScore(Score+1);
            ateFood=true;
            FoodGenerator();
        }

        if(bit|| newSnake[0].x<0 || newSnake[0].x>=gridSize || newSnake[0].y<0 || newSnake[0].y>=gridSize){
            Setgame(true);
            return;
        }
       

        if(!ateFood){
            newSnake.pop();
        }
        SetSnake(newSnake);
    }
    
    function updateDirection(evt)
    {
      
        console.log(direction);
        var Key=evt.code;
        console.log(Key);
        switch(Key){
        case "ArrowUp":
            if((direction!=="Down")){direction="Up";}
            break
        case "ArrowDown":
            if(direction!=="Up"){
                direction="Down";
            }   
            break;
        case "ArrowRight":
            if(direction!=="Left"){
                direction="Right";
            }   
            break;
        case "ArrowLeft":
            if(direction!=="Right"){
                direction="Left";
            }   
            break;
        }
        console.log(direction);
    }
    React.useEffect(()=>{
        let interval=setInterval(Path,100);
        return ()=>{
            clearInterval(interval,Path);
        }
    },)

    React.useEffect(()=>{
        document.body.addEventListener("keydown",updateDirection)
        return ()=>{
            clearInterval("keydown",updateDirection);
        }
    },)

    return(
        <div>
            {game?<OverScreen 
            score={Score} 
            GameOver={gameOver}
            highScore={highScore}/>
            :
            
            <div className="main">
                <div className="MainScore">High Score:{highScore}</div>  
                <div className="MainScore">Score:{Score}</div>
                <div className="board">
                    {create()}
                </div>
            </div>}
            
        </div>
    )
}

export default App;