import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8081 });

interface Paddle {
  x: number; y: number; width: number; height: number; score: number;
}
interface Ball {
  x: number; y: number; radius: number; speedX: number; speedY: number;
}
interface GameState {
  ball: Ball;
  player1: Paddle;
  player2: Paddle;
}
interface PlayerInputs {
  [key: string]: boolean;
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PADDLE_WIDTH = 15, PADDLE_HEIGHT = 100, BALL_RADIUS = 10;
const PADDLE_SPEED = 8;
const WIN_SCORE = 3;

let gameState: GameState;
let clients: { ws: WebSocket; inputs: PlayerInputs; playerNumber: 1 | 2 }[] = [];
let gameLoopInterval: NodeJS.Timeout | null = null;


function initializeGameState() {
    gameState = {
        player1: { x: 10, y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2, width: PADDLE_WIDTH, height: PADDLE_HEIGHT, score: 0 },
        player2: { x: CANVAS_WIDTH - PADDLE_WIDTH - 10, y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2, width: PADDLE_WIDTH, height: PADDLE_HEIGHT, score: 0 },
        ball: { x: 0, y: 0, radius: BALL_RADIUS, speedX: 0, speedY: 0 },
    };
    resetBall();
}

function resetBall() {
  gameState.ball = {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    radius: BALL_RADIUS,
    speedX: (Math.random() > 0.5 ? 1 : -1) * 5,
    speedY: Math.random() * 6 - 3,
  };
}

function startGame() {
    if (gameLoopInterval) clearInterval(gameLoopInterval);
    initializeGameState();
    gameLoopInterval = setInterval(updateGame, 1000 / 60);
    console.log("Jogo iniciado com 2 jogadores.");
}

function stopGame() {
    if (gameLoopInterval) {
        clearInterval(gameLoopInterval);
        gameLoopInterval = null;
    }
    console.log("Jogo parado. Aguardando jogadores...");
}

function updateGame() {
  if (clients.length < 2) return;

  const { ball, player1, player2 } = gameState;
  const player1Inputs = clients.find(c => c.playerNumber === 1)?.inputs || {};
  const player2Inputs = clients.find(c => c.playerNumber === 2)?.inputs || {};

  // Movimento dos Paddles
  if (player1Inputs['w'] && player1.y > 0) player1.y -= PADDLE_SPEED;
  if (player1Inputs['s'] && player1.y < CANVAS_HEIGHT - player1.height) player1.y += PADDLE_SPEED;
  if (player2Inputs['ArrowUp'] && player2.y > 0) player2.y -= PADDLE_SPEED;
  if (player2Inputs['ArrowDown'] && player2.y < CANVAS_HEIGHT - player2.height) player2.y += PADDLE_SPEED;

  ball.x += ball.speedX;
  ball.y += ball.speedY;

  if (ball.y - ball.radius < 0 || ball.y + ball.radius > CANVAS_HEIGHT) {
    ball.speedY *= -1;
  }

  // Pontuação
  let scored = false;
  if (ball.x - ball.radius < 0) {
    player2.score++;
    scored = true;
  } else if (ball.x + ball.radius > CANVAS_WIDTH) {
    player1.score++;
    scored = true;
  }
  
  if (scored) {
      if (player1.score >= WIN_SCORE || player2.score >= WIN_SCORE) {
          const winner = player1.score >= WIN_SCORE ? 1 : 2;
          clients.forEach(client => client.ws.send(JSON.stringify({ type: 'game_over', winner })));
          stopGame();
          clients.forEach(c => c.ws.close());
          clients = [];
          return;
      }
      resetBall();
  }

  const player = (ball.x < CANVAS_WIDTH / 2) ? player1 : player2;
  if (collides(ball, player)) {
      const collidePoint = (ball.y - (player.y + player.height / 2)) / (player.height / 2);
      const angleRad = (Math.PI / 4) * collidePoint;
      const direction = (ball.x < CANVAS_WIDTH / 2) ? 1 : -1;
      const currentSpeed = Math.sqrt(ball.speedX ** 2 + ball.speedY ** 2);
      ball.speedX = direction * currentSpeed * Math.cos(angleRad);
      ball.speedY = currentSpeed * Math.sin(angleRad);
  }

  const message = JSON.stringify({ type: 'update', ...gameState });
  clients.forEach(client => {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(message);
    }
  });
}

function collides(b: Ball, p: Paddle): boolean {
    const p_top = p.y;
    const p_bottom = p.y + p.height;
    const p_left = p.x;
    const p_right = p.x + p.width;

    const b_top = b.y - b.radius;
    const b_bottom = b.y + b.radius;
    const b_left = b.x - b.radius;
    const b_right = b.x + b.radius;

    return p_left < b_right && p_right > b_left && p_top < b_bottom && p_bottom > b_top;
}

wss.on('connection', (ws) => {
  if (clients.length >= 2) {
    ws.send(JSON.stringify({ type: 'error', message: 'Game is full' }));
    ws.close();
    return;
  }

  const playerNumber: 1 | 2 = clients.length === 0 ? 1 : 2;
  
  const newClient = { ws, inputs: {}, playerNumber };
  clients.push(newClient);

  ws.send(JSON.stringify({ type: 'assign_player', player: playerNumber }));
  console.log(`Jogador ${playerNumber} conectado.`);

  if (clients.length === 1) {
    ws.send(JSON.stringify({ type: 'waiting' }));
  } else if (clients.length === 2) {
    startGame();
  }
  
  ws.on('message', (message) => {
    try {
        const data = JSON.parse(message.toString());
        if (data.type === 'keys') {
            newClient.inputs = data.keys;
        }
    } catch(e) {
        console.error("Mensagem inválida recebida: ", message.toString());
    }
  });

  ws.on('close', () => {
    console.log(`Jogador ${playerNumber} desconectado.`);
    clients = clients.filter(client => client.ws !== ws);
    if (clients.length < 2) {
        stopGame();
        if (clients.length === 1) {
            clients[0].ws.send(JSON.stringify({ type: 'waiting' }));
        }
    }
  });
});

console.log('Game service rodando na porta 8081 e aguardando jogadores...');