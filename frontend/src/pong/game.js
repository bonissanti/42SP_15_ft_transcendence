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
const barSpeed = 15;
let round = 1;
let leftScore = 0;
let rightScore = 0;
const keys = {};
let running = false;
let maxPoints = 30;

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

function startMultiplayerGame() {
  showScreen("game-screen");
  resetGame();
  running = true;
  requestAnimationFrame(gameLoop);
}

function startSinglePlayerStartGame() {
	showScreen("game-screen");
	resetGame();
	running = true;
	setInterval(increaseBallSpeed, 2000); // 2 segundos
	requestAnimationFrame(gameLoopAI);
  }

function goHome() {
  showScreen("home-screen");
  running = false;
}

function showScreen(id) {
	["home-screen", "game-screen", "win-screen", "lose-screen", "rps-screen"].forEach(screen =>
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
  aiError = Math.random() < 0.05 ? (Math.random() * 100 - 50) : 0;
}

let aiError = 0;

function moveBars() {
  if (keys["w"] || keys["W"]) leftY = Math.max(0, leftY - barSpeed);
  if (keys["s"] || keys["S"]) leftY = Math.min(window.innerHeight - 100, leftY + barSpeed);
  if (keys["ArrowUp"]) rightY = Math.max(0, rightY - barSpeed);
  if (keys["ArrowDown"]) rightY = Math.min(window.innerHeight - 100, rightY + barSpeed);
  leftBar.style.top = `${leftY}px`;
  rightBar.style.top = `${rightY}px`;
}

function moveBarsAI() {
	if (keys["w"] || keys["W"]) leftY = Math.max(0, leftY - barSpeed);
	if (keys["s"] || keys["S"]) leftY = Math.min(window.innerHeight - 100, leftY + barSpeed);
	if (ballX > window.innerWidth / 2 && ballSpeedX > 0) {
	  const targetY = ballY + aiError;
	  const distanceToTarget = targetY - rightY;
	  const moveSpeed = Math.min(Math.abs(distanceToTarget), barSpeed);
	  if (distanceToTarget > 0) {
		rightY = Math.min(window.innerHeight - 100, rightY + moveSpeed); 
	  } else if (distanceToTarget < 0) {
		rightY = Math.max(0, rightY - moveSpeed); 
	  }
	}
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
      navigateTo("lose-screen");
      running = false;
    }
  } else {
    leftScore++;
    leftBarPoint.textContent = leftScore;
    if (leftScore === maxPoints) {
      navigateTo("win-screen");
      running = false;
    }
  }
}

function increaseBallSpeed() {
    const speedFactor = 1.1;
    ballSpeedX *= speedFactor;
    ballSpeedY *= speedFactor;
}
  

function gameLoop() {
  if (!running) return;
  moveBars();
  moveBall();
  requestAnimationFrame(gameLoop);
}

function startRPSGame() {
	showScreen("rps-screen");
  }  

function gameLoopAI() {
	if (!running) return;
	moveBarsAI();
	moveBall();
	requestAnimationFrame(gameLoopAI);
}

function playRPS(playerChoice) {
	const choices = ["pedra", "papel", "tesoura"];
	const botChoice = choices[Math.floor(Math.random() * choices.length)];
	
	let result = "";
  
	if (playerChoice === botChoice) {
	  result = "Empate!";
	} else if (
	  (playerChoice === "pedra" && botChoice === "tesoura") ||
	  (playerChoice === "papel" && botChoice === "pedra") ||
	  (playerChoice === "tesoura" && botChoice === "papel")
	) {
	  result = "Você ganhou!";
	} else {
	  result = "Você perdeu!";
	}
  
	document.getElementById("rps-result").textContent = `Você escolheu ${playerChoice}. O diabo escolheu ${botChoice}.${result}`;
  }
  