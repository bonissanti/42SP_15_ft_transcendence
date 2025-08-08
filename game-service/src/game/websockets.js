"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.agent = exports.gameTokens = exports.games = exports.clients = void 0;
exports.stopGame = stopGame;
exports.setupWebSocket = setupWebSocket;
const ws_1 = require("ws");
const url_1 = require("url");
const game_1 = require("./game");
const https = __importStar(require("https"));
exports.clients = new Map();
exports.games = new Map();
exports.gameTokens = new Map();
exports.agent = new https.Agent({
    rejectUnauthorized: false,
});
const remoteLobby = [];
const tournamentLobby = [];
const tournaments = new Map();
function broadcastLobbyUpdate(mode) {
    const lobby = mode === 'remote' ? remoteLobby : tournamentLobby;
    const lobbyInfo = lobby.map(c => ({ id: c.id, username: c.username, profilePic: c.profilePic }));
    const message = JSON.stringify({ type: 'lobby_update', players: lobbyInfo });
    lobby.forEach(client => {
        if (client.ws.readyState === ws_1.WebSocket.OPEN) {
            client.ws.send(message);
        }
    });
}
function cleanupClient(userId) {
    const client = exports.clients.get(userId);
    if (!client)
        return;
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
    }
    else {
        const lobbyIndex = remoteLobby.findIndex(c => c.id === userId);
        if (lobbyIndex > -1) {
            remoteLobby.splice(lobbyIndex, 1);
            broadcastLobbyUpdate('remote');
        }
    }
    exports.clients.delete(userId);
}
function stopGame(gameId) {
    const game = exports.games.get(gameId);
    if (!game)
        return;
    if (game.gameLoopInterval)
        clearInterval(game.gameLoopInterval);
    if (game.speedUpInterval)
        clearInterval(game.speedUpInterval);
    const { tournamentId, isFinal, playerIds, gameState } = game;
    if (tournamentId) {
        const tournament = tournaments.get(tournamentId);
        if (!tournament) {
            exports.games.delete(gameId);
            return;
        }
        const [p1, p2] = gameState.paddles;
        const WIN_SCORE = 5;
        let winnerId, loserId;
        if (p1.score >= WIN_SCORE) {
            winnerId = playerIds[0];
            loserId = playerIds[1];
        }
        else {
            winnerId = playerIds[1];
            loserId = playerIds[0];
        }
        const winnerClient = exports.clients.get(winnerId);
        const loserClient = exports.clients.get(loserId);
        if (isFinal) {
            const winnerData = winnerClient ? { id: winnerClient.id, username: winnerClient.username, profilePic: winnerClient.profilePic } : null;
            const finalOverMessage = JSON.stringify({ type: 'game_over', winner: winnerData, tournamentName: tournament.tournamentName });
            sendTournamentHistory(tournamentId, winnerId, loserId);
            playerIds.forEach(id => {
                const client = exports.clients.get(id);
                if (client && client.ws.readyState === ws_1.WebSocket.OPEN) {
                    client.ws.send(finalOverMessage);
                }
            });
            tournaments.delete(tournamentId);
        }
        else {
            if (loserClient) {
                const loser = exports.clients.get(loserId);
                if (loser) {
                    tournament.eliminatedPlayers.push({
                        id: loserId,
                        realUsername: loser.realUsername || loser.username,
                        username: loser.username
                    });
                }
            }
            if (loserClient && loserClient.ws.readyState === ws_1.WebSocket.OPEN) {
                loserClient.ws.send(JSON.stringify({ type: 'semifinal_loss' }));
            }
            if (winnerClient) {
                tournament.winners.push(winnerClient);
                const winMessage = {
                    type: 'semifinal_win',
                    winners: tournament.winners.map(w => ({ username: w.username, profilePic: w.profilePic }))
                };
                if (winnerClient.ws.readyState === ws_1.WebSocket.OPEN) {
                    winnerClient.ws.send(JSON.stringify(winMessage));
                }
                if (tournament.winners.length === 2) {
                    const readyMessage = {
                        type: 'final_ready',
                        finalists: tournament.winners.map(f => ({ username: f.username, profilePic: f.profilePic }))
                    };
                    tournament.winners.forEach(finalist => {
                        if (finalist.ws.readyState === ws_1.WebSocket.OPEN) {
                            finalist.ws.send(JSON.stringify(readyMessage));
                        }
                    });
                }
            }
        }
    }
    exports.games.delete(gameId);
    exports.gameTokens.delete(gameId);
    console.log(`Jogo ${gameId} finalizado e removido.`);
}
async function createTournamentInService(players, tournamentName, jwtToken) {
    try {
        const body = {
            gameType: 'TOURNAMENT',
            tournamentName: tournamentName,
            player1Username: players[0]?.realUsername || players[0]?.username || '',
            player2Username: players[1]?.realUsername || players[1]?.username || '',
            player3Username: players[2]?.realUsername || players[2]?.username || '',
            player4Username: players[3]?.realUsername || players[3]?.username || '',
            aliasPlayer1: players[0]?.username || '',
            aliasPlayer2: players[1]?.username || '',
            aliasPlayer3: players[2]?.username || '',
            aliasPlayer4: players[3]?.username || '',
        };
        console.log("Creating tournament with data:", body);
        const response = await fetch('https://game-service:3001/tournament', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            agent: exports.agent,
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to create tournament:', response.status, errorText);
        }
        else {
            console.log('Tournament created successfully!');
        }
    }
    catch (error) {
        console.error('Error creating tournament:', error);
    }
}
async function sendTournamentHistory(tournamentId, finalWinnerId, finalLoserId) {
    const tournament = tournaments.get(tournamentId);
    if (!tournament)
        return;
    const winner = exports.clients.get(finalWinnerId);
    const runnerUp = exports.clients.get(finalLoserId);
    const eliminatedPlayers = tournament.eliminatedPlayers;
    const thirdPlace = eliminatedPlayers.length >= 2 ? eliminatedPlayers[1] : null;
    const fourthPlace = eliminatedPlayers.length >= 1 ? eliminatedPlayers[0] : null;
    const historyData = {
        gameType: 'TOURNAMENT',
        tournamentId: tournamentId,
        tournamentName: "tournament",
        player1Username: winner?.realUsername || winner?.username || '',
        player1Alias: winner?.username || '',
        player1Points: 1,
        player2Username: runnerUp?.realUsername || runnerUp?.username || '',
        player2Alias: runnerUp?.username || '',
        player2Points: 2,
        player3Username: thirdPlace?.realUsername || '',
        player3Alias: thirdPlace?.username || '',
        player3Points: 3,
        player4Username: fourthPlace?.realUsername || '',
        player4Alias: fourthPlace?.username || '',
        player4Points: 4
    };
    let jwtToken = null;
    const finalPlayers = [winner, runnerUp];
    for (const player of finalPlayers) {
        if (player && player.jwtToken) {
            jwtToken = player.jwtToken;
            break;
        }
    }
    if (!jwtToken) {
        console.error('Nenhum token JWT disponível para salvar o histórico do torneio');
        return;
    }
    try {
        const response = await fetch('https://game-service:3001/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify(historyData),
            agent: exports.agent,
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Falha ao salvar o histórico do torneio:', response.status, errorText);
        }
        else {
            console.log('Histórico do torneio salvo com sucesso:', historyData);
        }
    }
    catch (error) {
        console.error('Erro ao salvar o histórico do torneio:', error);
    }
}
function setupWebSocket(server) {
    const wss = new ws_1.WebSocketServer({ noServer: true });
    server.server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    });
    wss.on('connection', (ws, req) => {
        const url = new url_1.URL(req.url, `http://${req.headers.host}`);
        const userId = url.searchParams.get('userId');
        const username = url.searchParams.get('username') || 'Anônimo';
        const realUsername = url.searchParams.get('realUsername') || username;
        const profilePic = url.searchParams.get('profilePic') || 'https://placehold.co/128x128/000000/FFFFFF?text=User';
        const gameModeParam = url.searchParams.get('mode') || 'remote';
        const gameMode = (gameModeParam === 'tournament') ? 'tournament' : 'remote';
        const jwtToken = url.searchParams.get('token') || '';
        const tournamentName = url.searchParams.get('tournamentName') || `Tournament-${Date.now()}`;
        if (!userId) {
            ws.send(JSON.stringify({ type: 'error', message: 'ID de usuário inválido.' }));
            ws.close();
            return;
        }
        const targetLobby = gameMode === 'tournament' ? tournamentLobby : remoteLobby;
        const duplicateNickname = targetLobby.find(client => client.username === username && client.id !== userId);
        if (duplicateNickname) {
            ws.send(JSON.stringify({
                type: 'error',
                message: `O apelido "${username}" já está sendo usado na sala ${gameMode}. Escolha outro apelido.`
            }));
            return;
        }
        if (exports.clients.has(userId)) {
            const existingClient = exports.clients.get(userId);
            if (existingClient && existingClient.ws.readyState === ws_1.WebSocket.OPEN) {
                existingClient.ws.close();
            }
            cleanupClient(userId);
        }
        console.log(`Jogador ${username} (${userId}) conectado no modo ${gameMode}.`);
        const clientData = {
            ws,
            username,
            realUsername,
            inputs: {},
            id: userId,
            profilePic,
            isReady: false,
            gameMode,
            jwtToken
        };
        exports.clients.set(userId, clientData);
        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message.toString());
                const client = exports.clients.get(userId);
                if (!client)
                    return;
                switch (data.type) {
                    case 'keys':
                        client.inputs = data.keys;
                        break;
                    case 'final_ready_click':
                        let tournamentId;
                        let tournamentData;
                        for (const [id, data] of tournaments.entries()) {
                            if (data.winners.some(winner => winner.id === userId)) {
                                tournamentId = id;
                                tournamentData = data;
                                break;
                            }
                        }
                        if (tournamentData && tournamentId) {
                            const finalist = tournamentData.winners.find((w) => w.id === userId);
                            if (finalist && !finalist.isReady) {
                                finalist.isReady = true;
                                tournamentData.finalistsReady++;
                            }
                            const otherFinalist = tournamentData.winners.find((w) => w.id !== userId);
                            if (otherFinalist) {
                                const otherClient = exports.clients.get(otherFinalist.id);
                                if (otherClient && otherClient.ws.readyState === ws_1.WebSocket.OPEN) {
                                    otherClient.ws.send(JSON.stringify({ type: 'opponent_ready' }));
                                }
                            }
                            if (tournamentData.finalistsReady === 2) {
                                const finalGameId = (0, game_1.startOneVsOneGame)(tournamentData.winners.map((w) => w.id), tournamentId, true);
                                if (finalGameId) {
                                    const tourney = tournaments.get(tournamentId);
                                    if (tourney) {
                                        tourney.gameIds.push(finalGameId);
                                    }
                                }
                            }
                        }
                        break;
                }
            }
            catch (error) {
                console.error('Erro ao processar mensagem:', error);
            }
        });
        if (gameMode === 'tournament') {
            tournamentLobby.push(clientData);
            broadcastLobbyUpdate('tournament');
            if (tournamentLobby.length >= 4) {
                const tournamentId = `tourney-${Date.now()}`;
                const gamePlayers = tournamentLobby.splice(0, 4);
                tournaments.set(tournamentId, {
                    gameIds: [],
                    winners: [],
                    finalistsReady: 0,
                    tournamentName: tournamentName,
                    eliminatedPlayers: []
                });
                createTournamentInService(gamePlayers, tournamentName, jwtToken);
                const group1 = [gamePlayers[0], gamePlayers[1]];
                const group2 = [gamePlayers[2], gamePlayers[3]];
                const gameId1 = (0, game_1.startOneVsOneGame)(group1.map(p => p.id), tournamentId);
                const gameId2 = (0, game_1.startOneVsOneGame)(group2.map(p => p.id), tournamentId);
                if (gameId1)
                    tournaments.get(tournamentId)?.gameIds.push(gameId1);
                if (gameId2)
                    tournaments.get(tournamentId)?.gameIds.push(gameId2);
                broadcastLobbyUpdate('tournament');
            }
        }
        else {
            remoteLobby.push(clientData);
            broadcastLobbyUpdate('remote');
            if (remoteLobby.length >= 4) {
                const gamePlayers = remoteLobby.splice(0, 4);
                (0, game_1.startGame)(gamePlayers.map(p => p.id));
                broadcastLobbyUpdate('remote');
            }
        }
        ws.on('close', () => {
            console.log(`Jogador ${exports.clients.get(userId)?.username} (${userId}) desconectado.`);
            const client = exports.clients.get(userId);
            if (!client)
                return;
            let wasInGame = false;
            for (const [gameId, game] of exports.games.entries()) {
                if (game.playerIds.includes(userId)) {
                    wasInGame = true;
                    const playerIndex = game.playerIds.indexOf(userId);
                    if (game.playerIds.length === 4 && !game.tournamentId) {
                        if (game.gameState.paddles[playerIndex]) {
                            game.gameState.paddles[playerIndex].lost = true;
                        }
                        console.log(`Jogador ${userId} marcado como perdedor no jogo ${gameId}, jogo continua.`);
                        const remainingPlayers = game.playerIds.filter(id => id !== userId && exports.clients.has(id));
                        remainingPlayers.forEach(id => {
                            const remainingClient = exports.clients.get(id);
                            if (remainingClient && remainingClient.ws.readyState === ws_1.WebSocket.OPEN) {
                                remainingClient.ws.send(JSON.stringify({
                                    type: 'player_disconnected',
                                    disconnectedPlayer: client?.username || 'Jogador desconhecido',
                                    playerIndex: playerIndex
                                }));
                            }
                        });
                    }
                    else {
                        stopGame(gameId);
                        const remainingPlayers = game.playerIds.filter(id => id !== userId && exports.clients.has(id));
                        remainingPlayers.forEach(id => {
                            const remainingClient = exports.clients.get(id);
                            if (remainingClient && remainingClient.ws.readyState === ws_1.WebSocket.OPEN) {
                                remainingClient.ws.send(JSON.stringify({ type: 'opponent_disconnected' }));
                            }
                        });
                        break;
                    }
                }
            }
            cleanupClient(userId);
        });
        ws.on('error', (error) => {
            console.error(`Erro no WebSocket do jogador ${userId}:`, error);
            cleanupClient(userId);
        });
    });
}
