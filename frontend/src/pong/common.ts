export interface Paddle {
  x: number; y: number; width: number; height: number; score: number;
}
export interface Ball {
  x: number; y: number; radius: number; speedX: number; speedY: number;
}

export const PADDLE_WIDTH = 15, PADDLE_HEIGHT = 100, BALL_RADIUS = 10;
export const PADDLE_SPEED = 8, AI_SPEED = 5;
export const WIN_SCORE = 3;

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let ball: Ball | null = null;
let player1: Paddle;
let player2: Paddle;
let animationFrameId: number | null = null;
let isWaiting = false;

export const keys: { [key: string]: boolean } = {};

export const getCanvas = () => canvas;
export const getCtx = () => ctx;
export const getBall = () => ball;
export const getPlayer1 = () => player1;
export const getPlayer2 = () => player2;

export const setBall = (newBall: Ball | null) => { ball = newBall; };
export const setPlayer1 = (newP1: Paddle) => { player1 = newP1; };
export const setPlayer2 = (newP2: Paddle) => { player2 = newP2; };
export const setAnimationFrameId = (id: number | null) => { animationFrameId = id; };
export const setIsWaiting = (waiting: boolean) => { isWaiting = waiting; };

export function keyDownHandler(e: KeyboardEvent) { keys[e.key] = true; }
export function keyUpHandler(e: KeyboardEvent) { keys[e.key] = false; }

export function initSharedState(): boolean {
  canvas = document.getElementById('pongCanvas') as HTMLCanvasElement;
  if (!canvas) return false;
  ctx = canvas.getContext('2d')!;

  player1 = { x: 10, y: canvas.height / 2 - PADDLE_HEIGHT / 2, width: PADDLE_WIDTH, height: PADDLE_HEIGHT, score: 0 };
  player2 = { x: canvas.width - PADDLE_WIDTH - 10, y: canvas.height / 2 - PADDLE_HEIGHT / 2, width: PADDLE_WIDTH, height: PADDLE_HEIGHT, score: 0 };

  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);
  return true;
}

export function stopSharedState(): void {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    setAnimationFrameId(null);
  }
  document.removeEventListener('keydown', keyDownHandler);
  document.removeEventListener('keyup', keyUpHandler);
}

export function draw(): void {
  if (!ctx) return;

  if (isWaiting) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '24px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText('Aguardando oponente...', canvas.width / 2, canvas.height / 2);
    ctx.textAlign = 'left';
    return;
  }

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
  if (player1 && player2) {
    ctx.fillText(player1.score.toString(), canvas.width / 4, 60);
    ctx.fillText(player2.score.toString(), 3 * canvas.width / 4, 60);
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
  }

  if (ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function collides(b: Ball, p: Paddle): boolean {
  return b.x - b.radius < p.x + p.width && b.x + b.radius > p.x &&
         b.y - b.radius < p.y + p.height && b.y + b.radius > p.y;
}

export function resetBall(): void {
  if (!canvas) return;
  ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: BALL_RADIUS,
    speedX: (Math.random() > 0.5 ? 1 : -1) * 5,
    speedY: Math.random() * 6 - 3
  };
}