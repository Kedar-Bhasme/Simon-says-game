let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","green","purple"];

let started = false;
let level = 0;
let highScore = 0;
let h2=document.querySelector("h2");

// document.addEventListener("keypress",function(){
//     if(started==false){
//         console.log("game is started")
//         started=true
//         levelUp();
//     }
// });

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },800);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },350);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level }`;

    let randIdx= Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000); // Continue the game
        }
    } else {
        // Set Game Over message
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;

        const body = document.querySelector("body");
        body.classList.add("game-over"); // Apply red background

        // Transition to white background after a short delay
        setTimeout(() => {
            body.classList.remove("game-over");
            body.classList.add("white-bg"); // Apply white background
        }, 200);

        reset(); // Reset game state
    }
}

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game is restarted");
        started = true;

        const body = document.querySelector("body");

        // Temporarily remove the body class (force reset)
        body.classList.remove("white-bg");
        body.classList.remove("game-over");

        // **Remove and reapply the default class with a tiny delay**
        setTimeout(() => {
            body.classList.remove("game-start"); // Remove it first
            void body.offsetWidth; // Force browser repaint
            body.classList.add("game-start"); // Add back default class
        }, 10); // Short delay to allow proper reset

        levelUp(); // Start the game
    }
});

function btnPress() {  
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor= btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq=[];
    userSeq=[];
    level = 0;

}
