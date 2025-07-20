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
let player1Name = 'Player 1';
let player2Name = 'Player 2';

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

export function setPlayerNames(p1Name: string, p2Name: string) {
    player1Name = p1Name;
    player2Name = p2Name;
}

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

export function draw() {
    const canvas = document.getElementById('pongCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (isWaiting) {
        context.fillStyle = 'white';
        context.font = '30px Arial';
        context.textAlign = 'center';
        context.fillText('Aguardando um oponente...', canvas.width / 2, canvas.height / 2);
        return;
    }

    if (!player1 || !player2 || !ball) {
        return;
    }

    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.textAlign = 'center';
    context.fillText(player1Name, canvas.width / 4, 30);
    context.fillText(player2Name, (canvas.width / 4) * 3, 30);
    context.font = '40px Arial';
    context.fillText(player1.score.toString(), canvas.width / 4, 80);
    context.fillText(player2.score.toString(), (canvas.width / 4) * 3, 80);

    context.fillStyle = 'white';
    context.fillRect(player1.x, player1.y, player1.width, player1.height);
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();
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