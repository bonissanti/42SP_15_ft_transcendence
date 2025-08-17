import {
  initSharedState, stopSharedState, draw, collides, resetBall, keys,
  getCanvas, getBall, getPlayer1, getPlayer2, setAnimationFrameId,
  PADDLE_SPEED, AI_SPEED, WIN_SCORE
} from './common';

import { sendMatchHistory, getUserProfile, getCachoraoProfile } from './common';

let speedIntervalId: ReturnType<typeof setInterval> | null = null;

function updateSinglePlayer() {
  const ball = getBall();
  const p1 = getPlayer1();
  const p2 = getPlayer2();
  const canvas = getCanvas();
  if (!ball || !p1 || !p2 || !canvas) return;

  ball.x += ball.speedX;
  ball.y += ball.speedY;

  if (ball.y - ball.radius < 0) {
    ball.y = ball.radius;
    ball.speedY *= -1;
  } else if (ball.y + ball.radius > canvas.height) {
    ball.y = canvas.height - ball.radius;
    ball.speedY *= -1;
  }

  if (ball.x - ball.radius < 0) {
    p2.score++; checkWinCondition(); resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    p1.score++; checkWinCondition(); resetBall();
  }

  const player = (ball.x < canvas.width / 2) ? p1 : p2;
  if (collides(ball, player)) {
    const collidePoint = (ball.y - (player.y + player.height / 2)) / (player.height / 2);
    const angleRad = (Math.PI / 4) * collidePoint;
    const direction = (ball.x < canvas.width / 2) ? 1 : -1;
    const speed = Math.sqrt(ball.speedX ** 2 + ball.speedY ** 2);
    ball.speedX = direction * speed * Math.cos(angleRad);
    ball.speedY = speed * Math.sin(angleRad);
  }

  if (keys['w'] && p1.y > 0) p1.y -= PADDLE_SPEED;
  if (keys['s'] && p1.y < canvas.height - p1.height) p1.y += PADDLE_SPEED;

  
  if (ball.speedX > 0 && ball.x > canvas.width / 2) {
    let predictedY = ball.y;
    let timeToReachPaddle = (p2.x - ball.x) / ball.speedX;
    let futureBallY = ball.y + ball.speedY * timeToReachPaddle;

    if (futureBallY < 0) {
        predictedY = -futureBallY;
    } else if (futureBallY > canvas.height) {
        predictedY = 2 * canvas.height - futureBallY;
    } else {
        predictedY = futureBallY;
    }

    const aiPaddleCenter = p2.y + p2.height / 2;
    if (aiPaddleCenter < predictedY && p2.y < canvas.height - p2.height) {
      p2.y += AI_SPEED;
    } else if (aiPaddleCenter > predictedY && p2.y > 0) {
      p2.y -= AI_SPEED;
    }
  }
}


function increaseBallSpeed() {
  const ball = getBall();
  if (ball) {
    ball.speedX *= 1.2;
    ball.speedY *= 1.2;
  }
}

async function checkWinCondition() {
  const p1 = getPlayer1();
  const p2 = getPlayer2();
  
  if (p1.score >= WIN_SCORE || p2.score >= WIN_SCORE) {
    stopSinglePlayerGame();
    
    const [playerProfile, cachoraoProfile] = await Promise.all([
      getUserProfile(),
      getCachoraoProfile()
    ]);
    
    let winnerProfile;
    let winnerUuid: string;
    let loserUuid: string;
    
    if (p1.score >= WIN_SCORE) {
      winnerProfile = playerProfile;
      winnerUuid = playerProfile.uuid;
      loserUuid = cachoraoProfile.uuid;
      await sendMatchHistory("SINGLEPLAYER", "Singleplayer", winnerUuid, p1.score, loserUuid, p2.score);
    } else {
      winnerProfile = cachoraoProfile;
      winnerUuid = cachoraoProfile.uuid;
      loserUuid = playerProfile.uuid;
      await sendMatchHistory("SINGLEPLAYER", "Singleplayer", winnerUuid, p2.score, loserUuid, p1.score);
    }
    
    const path = `/winner?username=${encodeURIComponent(winnerProfile.username)}&profilePic=${encodeURIComponent(winnerProfile.profilePic)}`;
    history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

function resetPaddles() {
  const p1 = getPlayer1();
  const p2 = getPlayer2();
  if (p1) {
    p1.y = (getCanvas()?.height || 0) / 2 - p1.height / 2;
    p1.score = 0;
  }
  if (p2) {
    p2.y = (getCanvas()?.height || 0) / 2 - p2.height / 2;
    p2.score = 0;
  }
}

function resetPoints() {
  const p1 = getPlayer1();
  const p2 = getPlayer2();
  if (p1) p1.score = 0;
  if (p2) p2.score = 0;
}

function gameLoop() {
  updateSinglePlayer();
  draw();
  setAnimationFrameId(requestAnimationFrame(gameLoop));
}

export async function initSinglePlayerGame() {
  if (!initSharedState()) return;
  
  const [playerProfile, cachoraoProfile] = await Promise.all([
    getUserProfile(),
    getCachoraoProfile()
  ]);
  
  const playerNames = [playerProfile.username, cachoraoProfile.username];
  const { setPlayerNames } = await import('./common');
  setPlayerNames(playerNames);
  
  resetPaddles();
  resetPoints();
  resetBall();
  speedIntervalId = setInterval(increaseBallSpeed, 3000);
  gameLoop();
}

export function stopSinglePlayerGame() {
  stopSharedState();
  if (speedIntervalId) {
    clearInterval(speedIntervalId);
    speedIntervalId = null;
  }
}