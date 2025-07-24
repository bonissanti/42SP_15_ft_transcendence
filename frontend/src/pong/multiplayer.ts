import {
  initSharedState, stopSharedState, draw, collides, resetBall, keys,
  getCanvas, getBall, getPlayer1, getPlayer2, setAnimationFrameId,
  PADDLE_SPEED, WIN_SCORE
} from './common';

let speedIntervalId: number | null = null;

function updateMultiplayer() {
  const ball = getBall();
  const p1 = getPlayer1();
  const p2 = getPlayer2();
  const canvas = getCanvas();
  if (!ball || !p1 || !p2 || !canvas) return;

  ball.x += ball.speedX;
  ball.y += ball.speedY;

  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) ball.speedY *= -1;

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

  if (keys['ArrowUp'] && p2.y > 0) p2.y -= PADDLE_SPEED;
  if (keys['ArrowDown'] && p2.y < canvas.height - p2.height) p2.y += PADDLE_SPEED;
}

function increaseBallSpeed() {
  const ball = getBall();
  if (ball) {
    ball.speedX *= 1.2;
    ball.speedY *= 1.2;
  }
}

async function getUserProfile(): Promise<{ username: string, profilePic: string }> {
  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return { username: 'Jogador 1', profilePic: 'https://placehold.co/128x128/000000/FFFFFF?text=P1' };
    }

    const response = await fetch('/api/users/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) {
      return { username: 'Jogador 1', profilePic: 'https://placehold.co/128x128/000000/FFFFFF?text=P1' };
    }
    
    const user = await response.json();
    return { 
      username: user.Username || 'Jogador 1',
      profilePic: user.ProfilePic || 'https://placehold.co/128x128/000000/FFFFFF?text=P1'
    };
  } catch (error) {
    return { username: 'Jogador 1', profilePic: 'https://placehold.co/128x128/000000/FFFFFF?text=P1' };
  }
}

async function checkWinCondition() {
  const p1 = getPlayer1();
  const p2 = getPlayer2();
  
  if (p1.score >= WIN_SCORE || p2.score >= WIN_SCORE) {
    stopMultiplayerGame();
    
    const { username, profilePic } = await getUserProfile();
    
    if (p1.score >= WIN_SCORE) {
      const path = `/winner?username=${encodeURIComponent(username)}&profilePic=${encodeURIComponent(profilePic)}`;
      history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      history.pushState({}, '', '/defeat');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }
}

function gameLoop() {
  updateMultiplayer();
  draw();
  setAnimationFrameId(requestAnimationFrame(gameLoop));
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

export function initMultiplayerGame() {
  if (!initSharedState()) return;
  resetPaddles();
  resetPoints();
  resetBall();
  speedIntervalId = setInterval(increaseBallSpeed, 3000);
  gameLoop();
}

export function stopMultiplayerGame() {
  stopSharedState();
  if (speedIntervalId) {
    clearInterval(speedIntervalId);
    speedIntervalId = null;
  }
}