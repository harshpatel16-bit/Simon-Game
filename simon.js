gameSeq = [];
userSeq = [];
level = 0;
started = false;
let h3 = document.querySelector("h3");
let btns = ["blue", "red", "green", "purple"];
let Score=[];
let HighScore=0;


function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4); //3
  let randColor = btns[randIdx]; //purple
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);

  btnFlash(randBtn);
}

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    console.log("game Started");
    levelUp();
  }
});

function checkAns(idx) {
  if (gameSeq[idx] === userSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    Score.push(level);
    HighScore=Math.max(...Score);

    document.querySelector("body").style.backgroundColor="red";

    setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
    },100);
    h3.innerHTML = `Game Over!! Your Score Is: ${level} <br> Press Any Key To Start Again.<br> HighScore:${HighScore}`;
    reset();
  }
}

function btnPress() {
  let btn = this;
  btnFlash(btn);
  userSeq.push(btn.getAttribute("id"));
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset(){
    gameSeq=[];
    userSeq=[];
    level=0;
    started=false;
}