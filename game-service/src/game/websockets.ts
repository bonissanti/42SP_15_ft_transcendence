import { WebSocketServer, WebSocket } from 'ws';
import { URL } from 'url';
import { ClientData, Game } from './types';
import { startGame, startOneVsOneGame } from './game';

export const clients = new Map<string, ClientData>();
export const games = new Map<string, Game>();

const remoteLobby: ClientData[] = [];
const tournamentLobby: ClientData[] = [];

const tournaments = new Map<string, {
    gameIds: string[];
    winners: ClientData[];
    finalistsReady: number;
}>();

function broadcastLobbyUpdate(mode: 'remote' | 'tournament') {
    const lobby = mode === 'remote' ? remoteLobby : tournamentLobby;
    const lobbyInfo = lobby.map(c => ({ id: c.id, username: c.username, profilePic: c.profilePic }));
    const message = JSON.stringify({ type: 'lobby_update', players: lobbyInfo });
    lobby.forEach(client => {
        if (client.ws.readyState === WebSocket.OPEN) {
            client.ws.send(message);
        }
    });
}

function cleanupClient(userId: string) {
    const client = clients.get(userId);
    if (!client) return;

    if (client.gameMode === 'tournament') {
        const lobbyIndex = tournamentLobby.findIndex(c => c.id === userId);
        if (lobbyIndex > -1) {
            tournamentLobby.splice(lobbyIndex, 1);
            broadcastLobbyUpdate('tournament');
        }
        
        for (const [tournamentId, tournament] of tournaments.entries()) {
            const winnerIndex = tournament.winners.findIndex(w => w.id === userId);
            if (winnerIndex > -1) {
                tournament.winners.splice(winnerIndex, 1);
                if (tournament.winners.length === 0 && tournament.gameIds.length === 0) {
                    tournaments.delete(tournamentId);
                }
            }
        }
    } else {
        const lobbyIndex = remoteLobby.findIndex(c => c.id === userId);
        if (lobbyIndex > -1) {
            remoteLobby.splice(lobbyIndex, 1);
            broadcastLobbyUpdate('remote');
        }
    }

    clients.delete(userId);
}

export function stopGame(gameId: string) {
    const game = games.get(gameId);
    if (!game) return;

    if (game.gameLoopInterval) clearInterval(game.gameLoopInterval);
    if (game.speedUpInterval) clearInterval(game.speedUpInterval);

    const { tournamentId, isFinal, playerIds, gameState } = game;

    if (tournamentId) {
        const tournament = tournaments.get(tournamentId);
        if (!tournament) {
            games.delete(gameId);
            return;
        }

        const [p1, p2] = gameState.paddles;
        const WIN_SCORE = 5;
        let winnerId: string, loserId: string;

        if (p1.score >= WIN_SCORE) {
            winnerId = playerIds[1];
            loserId = playerIds[0];
        } else {
            winnerId = playerIds[0];
            loserId = playerIds[1];
        }

        const winnerClient = clients.get(winnerId);
        const loserClient = clients.get(loserId);

        if (isFinal) {
            const winnerData = winnerClient ? { id: winnerClient.id, username: winnerClient.username, profilePic: winnerClient.profilePic } : null;
            const finalOverMessage = JSON.stringify({ type: 'game_over', winner: winnerData });
            playerIds.forEach(id => {
                const client = clients.get(id);
                if (client && client.ws.readyState === WebSocket.OPEN) {
                    client.ws.send(finalOverMessage);
                }
            });
            tournaments.delete(tournamentId);
        } else {
            if (loserClient && loserClient.ws.readyState === WebSocket.OPEN) {
                loserClient.ws.send(JSON.stringify({ type: 'semifinal_loss' }));
                setTimeout(() => {
                    if (loserClient.ws.readyState === WebSocket.OPEN) {
                        loserClient.ws.close();
                    }
                }, 100);
            }
            if (winnerClient) {
                tournament.winners.push(winnerClient);
                const winMessage = {
                    type: 'semifinal_win',
                    winners: tournament.winners.map(w => ({ username: w.username, profilePic: w.profilePic }))
                };
                if (winnerClient.ws.readyState === WebSocket.OPEN) {
                    winnerClient.ws.send(JSON.stringify(winMessage));
                }

                if (tournament.winners.length === 2) {
                    const readyMessage = {
                        type: 'final_ready',
                        finalists: tournament.winners.map(f => ({ username: f.username, profilePic: f.profilePic }))
                    };
                    tournament.winners.forEach(finalist => {
                        if (finalist.ws.readyState === WebSocket.OPEN) {
                            finalist.ws.send(JSON.stringify(readyMessage));
                        }
                    });
                }
            }
        }
    }

    games.delete(gameId);
    console.log(`Jogo ${gameId} finalizado e removido.`);
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
        const gameModeParam = url.searchParams.get('mode') || 'remote';
        const gameMode: 'remote' | 'tournament' = (gameModeParam === 'tournament') ? 'tournament' : 'remote';

        if (!userId) {
            ws.send(JSON.stringify({ type: 'error', message: 'ID de usuário inválido.' }));
            ws.close();
            return;
        }

        if (clients.has(userId)) {
            const existingClient = clients.get(userId);
            if (existingClient) {
                if (existingClient.ws.readyState === WebSocket.OPEN) {
                    existingClient.ws.close();
                }
                cleanupClient(userId);
            }
        }

        console.log(`Jogador ${username} (${userId}) conectado no modo ${gameMode}.`);
        const clientData: ClientData = { 
            ws, 
            username, 
            inputs: {}, 
            id: userId, 
            profilePic, 
            isReady: false,
            gameMode
        };
        clients.set(userId, clientData);
        
        if (gameMode === 'tournament') {
            tournamentLobby.push(clientData);
            broadcastLobbyUpdate('tournament');
            
            if (tournamentLobby.length >= 4) {
                const tournamentId = `tourney-${Date.now()}`;
                const gamePlayers = tournamentLobby.splice(0, 4);
                tournaments.set(tournamentId, { gameIds: [], winners: [], finalistsReady: 0 });

                const group1 = [gamePlayers[0], gamePlayers[1]];
                const group2 = [gamePlayers[2], gamePlayers[3]];

                const gameId1 = startOneVsOneGame(group1.map(p => p.id), tournamentId);
                const gameId2 = startOneVsOneGame(group2.map(p => p.id), tournamentId);

                if (gameId1) tournaments.get(tournamentId)?.gameIds.push(gameId1);
                if (gameId2) tournaments.get(tournamentId)?.gameIds.push(gameId2);
                
                broadcastLobbyUpdate('tournament');
            }
        } else {
            remoteLobby.push(clientData);
            broadcastLobbyUpdate('remote');
            
            if (remoteLobby.length >= 4) {
                const gamePlayers = remoteLobby.splice(0, 4);
                startGame(gamePlayers.map(p => p.id));
                broadcastLobbyUpdate('remote');
            }
        }

        ws.on('message', (message: any) => {
            try {
                const data = JSON.parse(message.toString());
                const clientData = clients.get(userId);
                if (!clientData) return;

                if (data.type === 'keys') {
                    clientData.inputs = data.keys;
                }
                
                if (data.type === 'final_ready_click') {
                    clientData.isReady = true;

                    let tournamentId: string | null = null;
                    let tournament: any = null;

                    for (const [id, t] of tournaments.entries()) {
                        if (t.winners.some((w: ClientData) => w.id === userId)) {
                            tournamentId = id;
                            tournament = t;
                            break;
                        }
                    }

                    if (tournament && tournamentId) {
                        const otherPlayer = tournament.winners.find((w: ClientData) => w.id !== userId);
                        if (otherPlayer && otherPlayer.ws.readyState === WebSocket.OPEN) {
                            otherPlayer.ws.send(JSON.stringify({ type: 'opponent_ready' }));
                        }
                        
                        const readyPlayers = tournament.winners.filter((w: ClientData) => w.isReady);
                        if (readyPlayers.length === 2) {
                            console.log(`Iniciando final do torneio ${tournamentId} com: ${readyPlayers.map((p: ClientData) => p.username).join(' vs ')}`);
                            
                            const finalGameId = startOneVsOneGame(readyPlayers.map((p: ClientData) => p.id), tournamentId, true);
                            if (finalGameId) {
                                const game = games.get(finalGameId);
                                if (game) game.isFinal = true;
                            }
                        }
                    }
                }
            } catch (e) {
                console.error("Mensagem inválida recebida: ", message.toString());
            }
        });

        ws.on('close', () => {
            console.log(`Jogador ${clients.get(userId)?.username} (${userId}) desconectado.`);
            
            for (const [gameId, game] of games.entries()) {
                if (game.playerIds.includes(userId)) {
                    const playerIndex = game.playerIds.indexOf(userId);
                    
                    if (game.playerIds.length === 4 && !game.tournamentId) {
                        if (game.gameState.paddles[playerIndex]) {
                            game.gameState.paddles[playerIndex].lost = true;
                            game.gameState.paddles[playerIndex].score = 5;
                            
                            if (playerIndex < 2) { 
                                game.gameState.paddles[playerIndex].x = 0;
                                game.gameState.paddles[playerIndex].width = 800;
                            } else { 
                                game.gameState.paddles[playerIndex].y = 0;
                                game.gameState.paddles[playerIndex].height = 600;
                            }
                            
                            const dummyWs = { 
                                readyState: WebSocket.CLOSED,
                                send: () => {},
                                close: () => {}
                            } as any;
                            
                            const disconnectedClient: ClientData = {
                                ws: dummyWs,
                                username: username + ' (Desconectado)',
                                inputs: {},
                                id: userId,
                                profilePic: profilePic,
                                isReady: false,
                                gameMode: 'remote'
                            };  
                            clients.set(userId, disconnectedClient);
                            console.log(`Jogador ${userId} marcado como perdedor no jogo ${gameId}, jogo continua`);
                        }
                    } else {
                        stopGame(gameId);
                        const remainingPlayers = game.playerIds.filter(id => id !== userId && clients.has(id));
                        remainingPlayers.forEach(id => {
                            const remainingClient = clients.get(id);
                            if (remainingClient && remainingClient.ws.readyState === WebSocket.OPEN) {
                                remainingClient.ws.send(JSON.stringify({ type: 'opponent_disconnected' }));
                            }
                        });
                        
                        cleanupClient(userId);
                    }
                } else {
                    cleanupClient(userId);
                }
            }
        });

        ws.on('error', (error) => {
            console.error(`Erro no WebSocket do jogador ${userId}:`, error);
            cleanupClient(userId);
        });
    });
}