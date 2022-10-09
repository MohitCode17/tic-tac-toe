let music = new Audio("./music/music.mp3");
let turnAudio = new Audio("./music/ting.mp3");
let gameOverAudio = new Audio("./music/gameover.mp3");
let resetBtn = document.getElementById("reset");
let isGameOver = false;

let turn = "X";
// **Function to Change Turn ( X to 0 / 0 to X )
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
}


// **Function to Check Who win (X or 0)
const checkWin = () => {
  let boxText = document.getElementsByClassName("boxText");

  // Position where x or 0 can be placed to be win
  let wins = [
    [0, 1, 2, 3, 5, 0],
    [3, 4, 5, 3, 15, 0],
    [6, 7, 8, 3, 25, 0],
    [0, 3, 6, -7, 15, 90],
    [1, 4, 7, 3, 15, 90],
    [2, 5, 8, 13, 15, 90],
    [0, 4, 8, 3, 15, 45],
    [2, 4, 6, 3, 15, 135],
  ]
  wins.forEach(ele => {
    if ((boxText[ele[0]].innerText === boxText[ele[1]].innerText) && (boxText[ele[2]].innerText === boxText[ele[1]].innerText) && (boxText[ele[0]].innerText !== "")) {
      document.querySelector('.info').innerText = boxText[ele[0]].innerText + " Won";
      isGameOver = true;
      document.querySelector(".imgBox").querySelector("img").style.width = "250px";
      document.querySelector(".line").style.transform = `translate(${ele[3]}vw, ${ele[4]}vw) rotate(${ele[5]}deg)`
      document.querySelector(".line").style.width = "24vw";
      music.play();
    }
  })
}



// **Function to Game Logic
let boxes = document.querySelectorAll(".box");
boxes.forEach(element => {
  let boxContent = element.querySelector(".boxText");
  element.addEventListener("click", () => {
    if (boxContent.innerText === "") {
      boxContent.innerText = turn;
      turn = changeTurn();
      turnAudio.play();
      checkWin();
      if (!isGameOver) {
        // agar gameovr nhi hua hai tabhi turns ko change karna hai
        document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
      }
    }
  })
})



// **Reset the Game
resetBtn.addEventListener('click', () => {
  let boxContent = document.querySelectorAll(".boxText");
  boxContent.forEach(ele => {
    ele.innerText = "";
  })
  turn = "X";
  // isGameOver = false;
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  document.querySelector(".imgBox").querySelector("img").style.width = "0px";
  document.querySelector(".line").style.width = "0vw";
  music.pause();
})