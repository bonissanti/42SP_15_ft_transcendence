const leftBar = document.getElementById("left-bar");
const rightBar = document.getElementById("right-bar");
const ball = document.getElementById("ball");
const roundDisplay = document.getElementById("round-display");
const leftBarPoint = document.getElementById("left-bar-point");
const rightBarPoint = document.getElementById("right-bar-point");

let leftY = window.innerHeight / 2 - 50;
let rightY = window.innerHeight / 2 - 50;
let ballX = window.innerWidth / 2;
let ballY = window.innerHeight / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
const barSpeed = 8;
let round = 1;
let leftScore = 0;
let rightScore = 0;
const keys = {};
let running = false;
let maxPoints = 5;

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

function startGame() {
  showScreen("game-screen");
  resetGame();
  running = true;
  requestAnimationFrame(gameLoop);
}

function goHome() {
  showScreen("home-screen");
  running = false;
}

function showScreen(id) {
  ["home-screen", "game-screen", "win-screen", "lose-screen"].forEach(screen =>
    document.getElementById(screen).classList.add("hidden")
  );
  document.getElementById(id).classList.remove("hidden");
}

function resetGame() {
  leftScore = 0;
  rightScore = 0;
  round = 2;
  leftBarPoint.textContent = "0";
  rightBarPoint.textContent = "0";
  roundDisplay.textContent = "ROUND 1";
  leftY = window.innerHeight / 2 - 50;
  rightY = window.innerHeight / 2 - 50;
  resetBall();
}

function resetBall() {
  ballX = window.innerWidth / 2;
  ballY = window.innerHeight / 2;
  ballSpeedX = Math.random() > 0.5 ? 5 : -5;
  ballSpeedY = Math.random() > 0.5 ? 5 : -5;
}

function moveBars() {
  if (keys["w"] || keys["W"]) leftY = Math.max(0, leftY - barSpeed);
  if (keys["s"] || keys["S"]) leftY = Math.min(window.innerHeight - 100, leftY + barSpeed);
  if (keys["ArrowUp"]) rightY = Math.max(0, rightY - barSpeed);
  if (keys["ArrowDown"]) rightY = Math.min(window.innerHeight - 100, rightY + barSpeed);
  leftBar.style.top = `${leftY}px`;
  rightBar.style.top = `${rightY}px`;
}

function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY >= window.innerHeight - 15) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX <= 50 && ballY + 15 >= leftY && ballY <= leftY + 100) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballX >= window.innerWidth - 60 && ballY + 15 >= rightY && ballY <= rightY + 100) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballX <= 0 || ballX >= window.innerWidth) {
    updateScore();
    resetBall();
  }

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
}

function updateScore() {
  roundDisplay.textContent = `ROUND ${round++}`; /* Por algum motivo na tela aparece round - 1 então eu preciso iniciar ele como 2, n sei pq */

  if (ballX <= 0) {
    rightScore++;
    rightBarPoint.textContent = rightScore;
    if (rightScore === maxPoints) {
      showScreen("lose-screen");
      running = false;
    }
  } else {
    leftScore++;
    leftBarPoint.textContent = leftScore;
    if (leftScore === maxPoints) {
      showScreen("win-screen");
      running = false;
    }
  }
}

function gameLoop() {
  if (!running) return;
  moveBars();
  moveBall();
  requestAnimationFrame(gameLoop);
}
