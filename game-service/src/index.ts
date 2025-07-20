import { WebSocketServer, WebSocket } from 'ws';
import { URL } from 'url';

interface Paddle { x: number; y: number; width: number; height: number; score: number; }
interface Ball { x: number; y: number; radius: number; speedX: number; speedY: number; }
interface GameState { ball: Ball; player1: Paddle; player2: Paddle; }
interface PlayerInputs { [key: string]: boolean; }
interface ClientData { ws: WebSocket; username: string; inputs: PlayerInputs; }
interface Game {
  player1Id: string;
  player2Id: string;
  gameState: GameState;
  gameLoopInterval: NodeJS.Timeout | null;
}

const CANVAS_WIDTH = 800, CANVAS_HEIGHT = 600;
const PADDLE_WIDTH = 15, PADDLE_HEIGHT = 100, BALL_RADIUS = 10;
const PADDLE_SPEED = 8, WIN_SCORE = 3;

const clients = new Map<string, ClientData>();
const games = new Map<string, Game>();
let waitingPlayerId: string | null = null;

const wss = new WebSocketServer({ port: 8081 });

function createInitialGameState(): GameState {
  return {
    player1: { x: 10, y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2, width: PADDLE_WIDTH, height: PADDLE_HEIGHT, score: 0 },
    player2: { x: CANVAS_WIDTH - PADDLE_WIDTH - 10, y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2, width: PADDLE_WIDTH, height: PADDLE_HEIGHT, score: 0 },
    ball: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, radius: BALL_RADIUS, speedX: 0, speedY: 0 },
  };
}

function resetBall(gameState: GameState) {
  gameState.ball.x = CANVAS_WIDTH / 2;
  gameState.ball.y = CANVAS_HEIGHT / 2;
  gameState.ball.speedX = (Math.random() > 0.5 ? 1 : -1) * 5;
  gameState.ball.speedY = (Math.random() * 6) - 3;
}

function startGame(player1Id: string, player2Id: string) {
    const player1Client = clients.get(player1Id);
    const player2Client = clients.get(player2Id);

    if (player1Client && player2Client) {
        const gameId = `${player1Id}-${player2Id}`;
        const gameState = createInitialGameState();
        resetBall(gameState);

        const newGame: Game = {
            player1Id,
            player2Id,
            gameState,
            gameLoopInterval: null,
        };
        games.set(gameId, newGame);

        newGame.gameLoopInterval = setInterval(() => updateGame(gameId), 1000 / 60);

        player1Client.ws.send(JSON.stringify({ type: 'game_start', gameId, opponentUsername: player2Client.username, playerNumber: 1 }));
        player2Client.ws.send(JSON.stringify({ type: 'game_start', gameId, opponentUsername: player1Client.username, playerNumber: 2 }));

        console.log(`Jogo iniciado entre ${player1Client.username} e ${player2Client.username}. GameId: ${gameId}`);
    } else {
        console.error("Não foi possível iniciar o jogo: um ou ambos os jogadores não foram encontrados.");
    }
}


function updateGame(gameId: string) {
  const game = games.get(gameId);
  if (!game) return;

  const { gameState, player1Id, player2Id } = game;
  const { ball, player1, player2 } = gameState;

  const player1Client = clients.get(player1Id);
  const player2Client = clients.get(player2Id);

  if (!player1Client || !player2Client) {
    stopGame(gameId, player1Client ? player2Id : player1Id);
    return;
  }

  if (player1Client.inputs['w'] && player1.y > 0) player1.y -= PADDLE_SPEED;
  if (player1Client.inputs['s'] && player1.y < CANVAS_HEIGHT - player1.height) player1.y += PADDLE_SPEED;
  if (player2Client.inputs['ArrowUp'] && player2.y > 0) player2.y -= PADDLE_SPEED;
  if (player2Client.inputs['ArrowDown'] && player2.y < CANVAS_HEIGHT - player2.height) player2.y += PADDLE_SPEED;

  ball.x += ball.speedX;
  ball.y += ball.speedY;

  if (ball.y - ball.radius < 0 || ball.y + ball.radius > CANVAS_HEIGHT) {
    ball.speedY *= -1;
  }

  if (ball.x - ball.radius < 0) {
    player2.score++;
    resetBall(gameState);
  } else if (ball.x + ball.radius > CANVAS_WIDTH) {
    player1.score++;
    resetBall(gameState);
  }

  if (player1.score >= WIN_SCORE || player2.score >= WIN_SCORE) {
    const winner = player1.score >= WIN_SCORE ? 1 : 2;
    player1Client.ws.send(JSON.stringify({ type: 'game_over', winner, playerNumber: 1 }));
    player2Client.ws.send(JSON.stringify({ type: 'game_over', winner, playerNumber: 2 }));
    stopGame(gameId);
    return;
  }

  const player = (ball.x < CANVAS_WIDTH / 2) ? player1 : player2;
  if (collides(ball, player)) {
    const collidePoint = (ball.y - (player.y + player.height / 2)) / (player.height / 2);
    const angleRad = (Math.PI / 4) * collidePoint;
    const direction = (ball.x < CANVAS_WIDTH / 2) ? 1 : -1;
    ball.speedX = direction * 7 * Math.cos(angleRad);
    ball.speedY = 7 * Math.sin(angleRad);
  }

  const updateMessage = JSON.stringify({ type: 'update', ...gameState });
  if (player1Client.ws.readyState === WebSocket.OPEN) player1Client.ws.send(updateMessage);
  if (player2Client.ws.readyState === WebSocket.OPEN) player2Client.ws.send(updateMessage);
}

function collides(b: Ball, p: Paddle): boolean {
  const p_top = p.y, p_bottom = p.y + p.height;
  const p_left = p.x, p_right = p.x + p.width;
  const b_top = b.y - b.radius, b_bottom = b.y + b.radius;
  const b_left = b.x - b.radius, b_right = b.x + b.radius;
  return p_left < b_right && p_right > b_left && p_top < b_bottom && p_bottom > b_top;
}

function stopGame(gameId: string, disconnectedPlayerId?: string) {
    const game = games.get(gameId);
    if (game) {
        if (game.gameLoopInterval) {
            clearInterval(game.gameLoopInterval);
            game.gameLoopInterval = null;
        }

        const remainingPlayerId = game.player1Id === disconnectedPlayerId ? game.player2Id : game.player1Id;
        const remainingClient = clients.get(remainingPlayerId);
        if (remainingClient && remainingClient.ws.readyState === WebSocket.OPEN) {
            remainingClient.ws.send(JSON.stringify({ type: 'opponent_disconnected' }));
        }

        games.delete(gameId);
        console.log(`Jogo ${gameId} finalizado.`);
    }
}


wss.on('connection', (ws, req) => {
  const url = new URL(req.url!, `http://${req.headers.host}`);
  const userId = url.searchParams.get('userId');
  const username = url.searchParams.get('username') || 'Anônimo';

  if (!userId || clients.has(userId)) {
    ws.send(JSON.stringify({ type: 'error', message: 'ID de usuário inválido ou já conectado.' }));
    ws.close();
    return;
  }

  console.log(`Jogador ${username} (${userId}) conectado.`);
  clients.set(userId, { ws, username, inputs: {} });

  if (waitingPlayerId) {
    const opponentId = waitingPlayerId;
    waitingPlayerId = null;
    console.log(`Pareando ${username} (${userId}) com ${clients.get(opponentId)?.username} (${opponentId})`);
    startGame(opponentId, userId);
  } else {
    waitingPlayerId = userId;
    ws.send(JSON.stringify({ type: 'waiting_for_opponent' }));
    console.log(`${username} (${userId}) está esperando por um oponente.`);
  }

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      const clientData = clients.get(userId);
      if (!clientData) return;

      if (data.type === 'keys') {
          clientData.inputs = data.keys;
      }
    } catch (e) {
      console.error("Mensagem inválida recebida: ", message.toString());
    }
  });

  ws.on('close', () => {
    const clientData = clients.get(userId);
    console.log(`Jogador ${clientData?.username} (${userId}) desconectado.`);
    
    if (waitingPlayerId === userId) {
        waitingPlayerId = null;
        console.log("Jogador em espera desconectou. Fila limpa.");
    }
    
    for (const [gameId, game] of games.entries()) {
      if (game.player1Id === userId || game.player2Id === userId) {
        stopGame(gameId, userId);
      }
    }
    clients.delete(userId);
  });
});

console.log('🚀 Game service (com matchmaking) rodando na porta 8081 e aguardando jogadores...');