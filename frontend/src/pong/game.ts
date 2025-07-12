interface Paddle {
  x: number; y: number; width: number; height: number; score: number;
}
interface Ball {
  x: number; y: number; radius: number; speedX: number; speedY: number;
}

let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D;
let ball: Ball, player1: Paddle, player2: Paddle;
let gameMode: 'singleplayer' | 'multiplayer';
let animationFrameId: number | null = null;
const keys: { [key: string]: boolean } = {};

const PADDLE_WIDTH = 15, PADDLE_HEIGHT = 100, BALL_RADIUS = 10;
const PADDLE_SPEED = 8, AI_SPEED = 5;
const WIN_SCORE = 3;

let speedIntervalId: number | null = null;

function keyDownHandler(e: KeyboardEvent) { keys[e.key] = true; }
function keyUpHandler(e: KeyboardEvent) { keys[e.key] = false; }

export function initPongGame(mode: 'singleplayer' | 'multiplayer'): void {
  canvas = document.getElementById('pongCanvas') as HTMLCanvasElement;
  if (!canvas) return;
  ctx = canvas.getContext('2d')!;
  gameMode = mode;

  player1 = { x: 10, y: canvas.height / 2 - PADDLE_HEIGHT / 2, width: PADDLE_WIDTH, height: PADDLE_HEIGHT, score: 0 };
  player2 = { x: canvas.width - PADDLE_WIDTH - 10, y: canvas.height / 2 - PADDLE_HEIGHT / 2, width: PADDLE_WIDTH, height: PADDLE_HEIGHT, score: 0 };

  resetBall();

  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);

  speedIntervalId = setInterval(increaseBallSpeed, 5000);
  gameLoop();
}

export function stopPongGame(): void {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  if (speedIntervalId) {
    clearInterval(speedIntervalId);
    speedIntervalId = null;
  }
  document.removeEventListener('keydown', keyDownHandler);
  document.removeEventListener('keyup', keyUpHandler);
}

function gameLoop(): void {
  update();
  draw();
  animationFrameId = requestAnimationFrame(gameLoop);
}

function update(): void {
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height)
    ball.speedY *= -1;

  if (ball.x - ball.radius < 0) {
    player2.score++;
    checkWinCondition();
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    player1.score++;
    checkWinCondition();
    resetBall();
  }

  const player = (ball.x < canvas.width / 2) ? player1 : player2;
  if (collides(ball, player)) {
    const collidePoint = (ball.y - (player.y + player.height / 2)) / (player.height / 2);
    const angleRad = (Math.PI / 4) * collidePoint;
    const direction = (ball.x < canvas.width / 2) ? 1 : -1;
    const speed = Math.sqrt(ball.speedX ** 2 + ball.speedY ** 2);
    ball.speedX = direction * speed * Math.cos(angleRad);
    ball.speedY = speed * Math.sin(angleRad);
  }

  if (keys['w'] && player1.y > 0) player1.y -= PADDLE_SPEED;
  if (keys['s'] && player1.y < canvas.height - player1.height) player1.y += PADDLE_SPEED;

  if (gameMode === 'multiplayer') {
    if (keys['ArrowUp'] && player2.y > 0) player2.y -= PADDLE_SPEED;
    if (keys['ArrowDown'] && player2.y < canvas.height - player2.height) player2.y += PADDLE_SPEED;
  } else {
    const targetY = ball.y - player2.height / 2;
    if (player2.y < targetY && player2.y < canvas.height - player2.height) player2.y += AI_SPEED;
    if (player2.y > targetY && player2.y > 0) player2.y -= AI_SPEED;
  }
}

function draw(): void {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#fff';
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#fff';
  ctx.font = '45px "Press Start 2P"';
  ctx.fillText(player1.score.toString(), canvas.width / 4, 60);
  ctx.fillText(player2.score.toString(), 3 * canvas.width / 4, 60);

  ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
  ctx.fillRect(player2.x, player2.y, player2.width, player2.height);

  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
}

function collides(b: Ball, p: Paddle): boolean {
  return b.x - b.radius < p.x + p.width && b.x + b.radius > p.x &&
         b.y - b.radius < p.y + p.height && b.y + b.radius > p.y;
}

function resetBall(): void {
  ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: BALL_RADIUS,
    speedX: (Math.random() > 0.5 ? 1 : -1) * 5,
    speedY: Math.random() * 6 - 3
  };
}

function increaseBallSpeed(): void {
  const speedMultiplier = 1.1;
  ball.speedX *= speedMultiplier;
  ball.speedY *= speedMultiplier;
}

function checkWinCondition(): void {
  if (player1.score >= WIN_SCORE) {
    stopPongGame();
    alert('Você ganhou');
    window.location.href = '/';
  } else if (player2.score >= WIN_SCORE) {
    stopPongGame();
    alert('Você perdeu');
    window.location.href = '/';
  }
}
