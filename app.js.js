let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let mng = document.querySelector("#msg");
let moves = document.querySelector(".moves");
let display1 = document.querySelector(".display1");
let display2 = document.querySelector(".display2");
let undoBtn = document.querySelector(".undo");

let turnO = true; 
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

//Working of buttons after listening
const removeScores = ()=>{
    display1.innerText="";
    display2.innerText="";
};
const newGame = ()=>{
    turnO = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
    moves.classList.add("hide");
    removeScores();
};
const resetGame = ()=>{
    turnO = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
    moves.classList.add("hide");
};

//display Draw match
const showDraw=()=>{
    msg.innerText = `Match is Draw`;
    msgcontainer.classList.remove("hide");
    moves.classList.add("hide");
    countDraw=0;
}

//displaying O & X in boxes 
let countO = 0, countX = 0, countDraw = 0;
boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turnO===true){//playerO
            box.innerText = "O";
            turnO = false;
            countO++;
        }else{//playerX
            box.innerText = "X";           
            turnO = true;
            countX++;
        }
        box.disabled = true;
        countDraw++;
        // console.log("box was clicked");        
        checkwinner();
    });
});

//disable & enable function 
const disabledBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
};
const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

//showing number of moves taken by winner
const showMoves = (winner) =>{
    moves.classList.remove("hide");
    if(winner==="O"){
        moves.innerText= `${winner} won the match by ${countO} moves`;
    }
    else{
        moves.innerText= `${winner} won the match my ${countX}`;
    } 
    countO = 0;
    countX = 0; 
};

//displaying Scores
let scoreO=0;
let scoreX=0;
const displayScore = (winner)=>{
    if(winner==="O"){
        scoreO++;
        display1.innerText=`${scoreO}`;
    }else{
        scoreX++;
        display2.innerText=`${scoreX}`;
    }
};

//showing winner on the top of the webpage
const showWinner =(winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    displayScore(winner);
    showMoves(winner);
    disabledBoxes();
};

//              M A I N                                  A L G O R I T H M
const checkwinner = ()=>{
    for(let pattern of winPatterns){ //checking each pattern one by one
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);
        let pos1Val = boxes[pattern[0]].innerText;  
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !=="" && pos2Val !=="" && pos3Val !== ""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){//for winnig conditions , if there is same value at all three postion 
                console.log("winner",pos1Val);
                showWinner(pos1Val);
            }
            else if(countDraw===9){//for match draw condition
                showDraw();
            }
        }
    }
};

const undo = () =>{
    enableBoxes();
}

//for enabling buttons
newGameBtn.addEventListener("click",newGame);
resetBtn.addEventListener("click",resetGame);
undoBtn.addEventListener("click",undo);