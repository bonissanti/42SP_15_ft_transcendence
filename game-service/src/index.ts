import { WebSocketServer, WebSocket } from 'ws';
import { URL } from 'url';
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import prisma from "./Infrastructure/Service/PrismaService";
import { TournamentRoutes } from "./Presentation/Routes/TournamentRoutes/TournamentRoutes";
import { TournamentController } from "./Presentation/Controllers/TournamentController";
import { HistoryController } from "./Presentation/Controllers/HistoryController";
import { HistoryRoutes } from "./Presentation/Routes/HistoryRoutes/HistoryRoutes";
import { MatchmakingController } from "./Presentation/Controllers/MatchmakingController";
import { MatchmakingRoutes } from "./Presentation/Routes/MatchmakingRoutes/MatchmakingRoutes";

interface Paddle { x: number; y: number; width: number; height: number; score: number; lost: boolean; }
interface Ball { x: number; y: number; radius: number; speedX: number; speedY: number; }
interface GameState { ball: Ball; paddles: Paddle[]; }
interface PlayerInputs { [key: string]: boolean; }
interface ClientData { ws: WebSocket; username: string; inputs: PlayerInputs; id: string; profilePic: string; }
interface Game {
  playerIds: string[];
  gameState: GameState;
  gameLoopInterval: NodeJS.Timeout | null;
  speedUpInterval: NodeJS.Timeout | null;
}

const CANVAS_WIDTH = 800, CANVAS_HEIGHT = 600;
const PADDLE_WIDTH = 100, PADDLE_HEIGHT = 15;
const BALL_RADIUS = 10;
const PADDLE_SPEED = 8;
const LOSE_SCORE = 5;
const INITIAL_BALL_SPEED = 5;

const clients = new Map<string, ClientData>();
const games = new Map<string, Game>();
const lobby: ClientData[] = [];

function broadcastLobbyUpdate() {
  const lobbyInfo = lobby.map(c => ({ id: c.id, username: c.username, profilePic: c.profilePic }));
  const message = JSON.stringify({ type: 'lobby_update', players: lobbyInfo });
  lobby.forEach(client => client.ws.send(message));
}

function createInitialGameState(): GameState {
  return {
    paddles: [
      { x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2, y: 10, width: PADDLE_WIDTH, height: PADDLE_HEIGHT, score: 0, lost: false },
      { x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2, y: CANVAS_HEIGHT - PADDLE_HEIGHT - 10, width: PADDLE_WIDTH, height: PADDLE_HEIGHT, score: 0, lost: false },
      { x: 10, y: CANVAS_HEIGHT / 2 - PADDLE_WIDTH / 2, width: PADDLE_HEIGHT, height: PADDLE_WIDTH, score: 0, lost: false },
      { x: CANVAS_WIDTH - PADDLE_HEIGHT - 10, y: CANVAS_HEIGHT / 2 - PADDLE_WIDTH / 2, width: PADDLE_HEIGHT, height: PADDLE_WIDTH, score: 0, lost: false }
    ],
    ball: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, radius: BALL_RADIUS, speedX: 0, speedY: 0 },
  };
}

function resetBall(gameState: GameState) {
  gameState.ball.x = CANVAS_WIDTH / 2;
  gameState.ball.y = CANVAS_HEIGHT / 2;
  const angle = Math.random() * Math.PI * 2;
  gameState.ball.speedX = Math.cos(angle) * INITIAL_BALL_SPEED;
  gameState.ball.speedY = Math.sin(angle) * INITIAL_BALL_SPEED;
}

function startGame(playerIds: string[]) {
    const gameId = playerIds.join('-');
    const gameState = createInitialGameState();
    resetBall(gameState);

    const newGame: Game = {
        playerIds,
        gameState,
        gameLoopInterval: null,
        speedUpInterval: null,
    };
    games.set(gameId, newGame);

    newGame.speedUpInterval = setInterval(() => {
        const game = games.get(gameId);
        if (game) {
            game.gameState.ball.speedX *= 1.4;
            game.gameState.ball.speedY *= 1.4;
        }
    }, 5000);

    newGame.gameLoopInterval = setInterval(() => updateGame(gameId), 1000 / 60);

    const playerInfos = playerIds.map(id => clients.get(id)!);
    const usernames = playerInfos.map(p => p.username);

    playerIds.forEach((playerId, index) => {
        const client = clients.get(playerId);
        if (client) {
            client.ws.send(JSON.stringify({ type: 'game_start', gameId, opponents: usernames, playerNumber: index + 1 }));
        }
    });
    console.log(`Jogo iniciado entre 4 jogadores. GameId: ${gameId}`);
}
function updateGame(gameId: string) {
    const game = games.get(gameId);
    if (!game) return;

    const { gameState, playerIds } = game;
    const { ball, paddles } = gameState;

    const playerClients = playerIds.map(id => clients.get(id));
    if (playerClients.some(c => !c)) {
        stopGame(gameId);
        return;
    }

    const [p1, p2, p3, p4] = playerClients.map(c => c!.inputs);
    if (!paddles[0].lost && p1['a'] && paddles[0].x > 0) paddles[0].x -= PADDLE_SPEED;
    if (!paddles[0].lost && p1['d'] && paddles[0].x < CANVAS_WIDTH - paddles[0].width) paddles[0].x += PADDLE_SPEED;
    if (!paddles[1].lost && p2['ArrowLeft'] && paddles[1].x > 0) paddles[1].x -= PADDLE_SPEED;
    if (!paddles[1].lost && p2['ArrowRight'] && paddles[1].x < CANVAS_WIDTH - paddles[1].width) paddles[1].x += PADDLE_SPEED;
    if (!paddles[2].lost && p3['w'] && paddles[2].y > 0) paddles[2].y -= PADDLE_SPEED;
    if (!paddles[2].lost && p3['s'] && paddles[2].y < CANVAS_HEIGHT - paddles[2].height) paddles[2].y += PADDLE_SPEED;
    if (!paddles[3].lost && p4['ArrowUp'] && paddles[3].y > 0) paddles[3].y -= PADDLE_SPEED;
    if (!paddles[3].lost && p4['ArrowDown'] && paddles[3].y < CANVAS_HEIGHT - paddles[3].height) paddles[3].y += PADDLE_SPEED;

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.y - ball.radius < 0) {
        if (paddles[0].lost && collides(ball, paddles[0])) {
            ball.speedY *= -1;
            ball.y = paddles[0].y + paddles[0].height + ball.radius;
        } else {
            paddles[0].score++;
            resetBall(gameState);
        }
    } else if (ball.y + ball.radius > CANVAS_HEIGHT) {
        if (paddles[1].lost && collides(ball, paddles[1])) {
            ball.speedY *= -1;
            ball.y = paddles[1].y - ball.radius;
        } else {
            paddles[1].score++;
            resetBall(gameState);
        }
    }

    if (ball.x - ball.radius < 0) {
        if (paddles[2].lost && collides(ball, paddles[2])) {
            ball.speedX *= -1;
            ball.x = paddles[2].x + paddles[2].width + ball.radius;
        } else {
            paddles[2].score++;
            resetBall(gameState);
        }
    } else if (ball.x + ball.radius > CANVAS_WIDTH) {
        if (paddles[3].lost && collides(ball, paddles[3])) {
            ball.speedX *= -1;
            ball.x = paddles[3].x - ball.radius;
        } else {
            paddles[3].score++;
            resetBall(gameState);
        }
    }
  
    paddles.forEach((paddle, index) => {
        if (!paddle.lost && collides(ball, paddle)) {
            let relativeImpact: number;
            if (index === 0 || index === 1) {
                const paddleCenter = paddle.x + paddle.width / 2;
                relativeImpact = (ball.x - paddleCenter) / (paddle.width / 2);
                const angle = relativeImpact * Math.PI / 4;
                const speed = Math.sqrt(ball.speedX ** 2 + ball.speedY ** 2);
                ball.speedX = speed * Math.sin(angle);
                ball.speedY = (index === 0 ? 1 : -1) * speed * Math.cos(angle);
            } else {
                const paddleCenter = paddle.y + paddle.height / 2;
                relativeImpact = (ball.y - paddleCenter) / (paddle.height / 2);
                const angle = relativeImpact * Math.PI / 4;
                const speed = Math.sqrt(ball.speedX ** 2 + ball.speedY ** 2);
                ball.speedY = speed * Math.sin(angle);
                ball.speedX = (index === 2 ? 1 : -1) * speed * Math.cos(angle);
            }
        }
    });

    paddles.forEach((paddle, index) => {
        if (paddle.score >= LOSE_SCORE && !paddle.lost) {
            paddle.lost = true;
            if(index < 2) { paddle.x = 0; paddle.width = CANVAS_WIDTH; }
            else { paddle.y = 0; paddle.height = CANVAS_HEIGHT; }
        }
    });

    const activePlayers = paddles.filter(p => !p.lost);
    if (activePlayers.length <= 1) {
        const winnerIndex = paddles.findIndex(p => !p.lost);
        const winnerId = winnerIndex !== -1 ? playerIds[winnerIndex] : null;
        const winnerClient = winnerId ? clients.get(winnerId) : null;
        
        const winnerData = winnerClient 
            ? { id: winnerClient.id, username: winnerClient.username, profilePic: winnerClient.profilePic }
            : null;

        playerClients.forEach((client) => {
            if(client) client.ws.send(JSON.stringify({ type: 'game_over', winner: winnerData }));
        });
        stopGame(gameId);
        return;
    }

    const updateMessage = JSON.stringify({ type: 'update', ...gameState });
    playerClients.forEach(client => {
        if (client && client.ws.readyState === WebSocket.OPEN) client.ws.send(updateMessage);
    });
}
function collides(b: Ball, p: Paddle): boolean {
    const p_top = p.y, p_bottom = p.y + p.height;
    const p_left = p.x, p_right = p.x + p.width;
    const b_top = b.y - b.radius, b_bottom = b.y + b.radius;
    const b_left = b.x - b.radius, b_right = b.x + b.radius;
    return p_left < b_right && p_right > b_left && p_top < b_bottom && p_bottom > b_top;
}

function stopGame(gameId: string) {
    const game = games.get(gameId);
    if (game) {
        if (game.gameLoopInterval) clearInterval(game.gameLoopInterval);
        if (game.speedUpInterval) clearInterval(game.speedUpInterval);
        game.gameLoopInterval = null;
        game.speedUpInterval = null;
        games.delete(gameId);
        console.log(`Jogo ${gameId} finalizado.`);
    }
}

async function main()
{
    const server = fastify();

    server.register(fastifyJwt, {
        secret: process.env.JWT_SECRET || 'transcendence'
    });

    const tournamentController = new TournamentController();
    const historyController = new HistoryController();
    const matchmakingController = new MatchmakingController();

    await TournamentRoutes(server, tournamentController);
    await HistoryRoutes(server, historyController);
    await MatchmakingRoutes(server, matchmakingController);

    server.setErrorHandler((async (error, request, reply) => {
        console.log("Error: ", error);
    }));

    const wss = new WebSocketServer({ noServer: true });

    server.server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    });
    
    wss.on('connection', (ws, req) => {
        const url = new URL(req.url!, `http://${req.headers.host}`);
        const userId = url.searchParams.get('userId');
        const username = url.searchParams.get('username') || 'Anônimo';
        const profilePic = url.searchParams.get('profilePic') || 'https://placehold.co/128x128/000000/FFFFFF?text=User';

        if (!userId || clients.has(userId)) {
            ws.send(JSON.stringify({ type: 'error', message: 'ID de usuário inválido ou já conectado.' }));
            ws.close();
            return;
        }

        console.log(`Jogador ${username} (${userId}) conectado.`);
        const clientData: ClientData = { ws, username, inputs: {}, id: userId, profilePic };
        clients.set(userId, clientData);
        lobby.push(clientData);
        
        broadcastLobbyUpdate();

        if (lobby.length >= 4) {
            const gamePlayers = lobby.splice(0, 4);
            const playerIds = gamePlayers.map(p => p.id);
            startGame(playerIds);
        }

        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message.toString());
                const clientData = clients.get(userId);
                if (!clientData) return;
                if (data.type === 'keys') clientData.inputs = data.keys;
            } catch (e) {
                console.error("Mensagem inválida recebida: ", message.toString());
            }
        });

        ws.on('close', () => {
            console.log(`Jogador ${clients.get(userId)?.username} (${userId}) desconectado.`);
            const lobbyIndex = lobby.findIndex(c => c.id === userId);
            if (lobbyIndex > -1) {
                lobby.splice(lobbyIndex, 1);
                broadcastLobbyUpdate();
            }
            
            for (const [gameId, game] of games.entries()) {
                if (game.playerIds.includes(userId)) {
                    stopGame(gameId);
                    const remainingPlayers = game.playerIds.filter(id => id !== userId && clients.has(id));
                    remainingPlayers.forEach(id => {
                        const client = clients.get(id);
                        client?.ws.send(JSON.stringify({ type: 'opponent_disconnected' }));
                    });
                }
            }
            clients.delete(userId);
        });
    });

    try
    {
        const address = await server.listen({ port: 3001, host: '0.0.0.0' });
        console.log(`HTTP and WebSocket Server listening on ${address}`);
    }
    catch (err)
    {
        console.log("Failed to start server: ", err, "");
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();