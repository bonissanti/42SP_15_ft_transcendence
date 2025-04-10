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
let speed = 8;
let keys = {};
let round = 1;
let letBarPoint = 0;
let intrightBarPoint = 0;
let intleftBarPoint = 0;

document.addEventListener("keydown", (event) => keys[event.key] = true);
document.addEventListener("keyup", (event) => keys[event.key] = false);

function moveBars() {
    if (keys["w"]) leftY = Math.max(0, leftY - speed);
    if (keys["s"]) leftY = Math.min(window.innerHeight - 100, leftY + speed);
    if (keys["ArrowUp"]) rightY = Math.max(0, rightY - speed);
    if (keys["ArrowDown"]) rightY = Math.min(window.innerHeight - 100, rightY + speed);
    
    leftBar.style.top = leftY + "px";
    rightBar.style.top = rightY + "px";
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
        round++;
        roundDisplay.textContent = `ROUND ${round}`;
		if(ballX <= 0){
			intrightBarPoint++;
			rightBarPoint.textContent = `${intrightBarPoint}`;
		}
		else{
			intleftBarPoint++;
			leftBarPoint.textContent = `${intleftBarPoint}`;
		}
		if(intrightBarPoint == 1 || intleftBarPoint == 1){
			window.location.replace("src/pong/perdeu.html");
		} 
        ballX = window.innerWidth / 2;
        ballY = window.innerHeight / 2;
        ballSpeedX = (Math.random() > 0.5 ? 5 : -5);
        ballSpeedY = (Math.random() > 0.5 ? 5 : -5);
    }
    
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
}

function gameLoop() {
    moveBars();
    moveBall();
    requestAnimationFrame(gameLoop);
}

gameLoop();