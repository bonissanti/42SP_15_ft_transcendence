import { WebSocketServer, WebSocket } from 'ws';
import { URL } from 'url';
import { ClientData, Game } from './types';
import { startGame } from './game';

export const clients = new Map<string, ClientData>();
export const games = new Map<string, Game>();
const lobby: ClientData[] = [];

function broadcastLobbyUpdate() {
  const lobbyInfo = lobby.map(c => ({ id: c.id, username: c.username, profilePic: c.profilePic }));
  const message = JSON.stringify({ type: 'lobby_update', players: lobbyInfo });
  lobby.forEach(client => client.ws.send(message));
}

export function stopGame(gameId: string) {
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

export function setupWebSocket(server: any) {
    const wss = new WebSocketServer({ noServer: true });

    server.server.on('upgrade', (request: any, socket: any, head: any) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    });
    
    wss.on('connection', (ws: WebSocket, req: any) => {
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

        ws.on('message', (message: any) => {
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
                        if (client) {
                            client.ws.send(JSON.stringify({ type: 'opponent_disconnected' }));
                        }
                    });
                }
            }
            clients.delete(userId);
        });
    });
}