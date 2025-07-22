import { fetchWithAuth, fetchWithGame } from '../api/api';
import {
  initSharedState, stopSharedState, draw, keys,
  setBall, setPaddles, setAnimationFrameId, setIsWaiting,
  setPlayerNames,
} from './common';

let ws: WebSocket | null = null;
let animationFrameId: number | null = null;
const tournamentName = 'Torneio Padrão';

async function getUserProfile(): Promise<{ username: string, profilePic: string }> {
  try {
    const response = await fetchWithAuth('/users/me');
    if (!response.ok) {
      return { username: 'Anônimo', profilePic: 'https://placehold.co/128x128/000000/FFFFFF?text=User' };
    }
    const user = await response.json();
    return {
        username: user.Username || 'Anônimo',
        profilePic: user.ProfilePic || 'https://placehold.co/128x128/000000/FFFFFF?text=User'
    };
  } catch (error) {
    return { username: 'Anônimo', profilePic: 'https://placehold.co/128x128/000000/FFFFFF?text=User' };
  }
}

function getPlayerHTML(player: any | null) {
    if (player) {
        return `
            <div class="flex flex-col items-center">
                <img src="${player.profilePic}" alt="${player.username}" class="w-24 h-24 rounded-full border-4 border-white mb-2">
                <span class="text-lg">${player.username}</span>
            </div>
        `;
    }
    return `
        <div class="flex flex-col items-center">
            <div class="w-24 h-24 rounded-full border-4 border-dashed border-gray-500 flex items-center justify-center">
                <span class="text-gray-500 text-4xl">?</span>
            </div>
            <span class="text-lg text-gray-500">Aguardando...</span>
        </div>
    `;
}


function renderWaitingRoom(players: any[]) {
    const waitingRoomDiv = document.getElementById('waiting-room');
    const gameContainerDiv = document.getElementById('game-container');
    const slotsDiv = document.getElementById('player-slots');
    const waitingMessage = document.getElementById('waiting-message');

    if (!waitingRoomDiv || !gameContainerDiv || !slotsDiv || !waitingMessage) return;

    // Garante que a sala de espera está visível e o jogo escondido
    waitingRoomDiv.classList.remove('hidden');
    gameContainerDiv.classList.add('hidden');
    document.getElementById('tournament-modal')?.classList.add('hidden');

    slotsDiv.innerHTML = `
        <div class="flex justify-around items-center w-full">
            ${getPlayerHTML(players[0])}
            <span class="text-4xl text-glow mx-4">VS</span>
            ${getPlayerHTML(players[1])}
        </div>
        <div class="flex justify-around items-center w-full mt-8">
            ${getPlayerHTML(players[2])}
            <span class="text-4xl text-glow mx-4">VS</span>
            ${getPlayerHTML(players[3])}
        </div>
    `;

    const remaining = 4 - players.length;
    waitingMessage.textContent = remaining > 0 ? `Aguardando mais ${remaining} jogador(es)...` : 'O torneio vai começar!';
}


async function createTournament(players: any[]) {
    try {
        const playerUsernames = players.map(p => p.username);
        const body = {
            tournamentName: tournamentName,
            player1Username: playerUsernames[0],
            player2Username: playerUsernames[1],
            player3Username: playerUsernames[2],
            player4Username: playerUsernames[3],
        };

        console.log("Criando torneio com os seguintes dados:", body);
        const response = await fetchWithGame('/tournament', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Erro ao criar torneio: ${errorData.message || response.statusText}`);
        }
        console.log("Torneio criado com sucesso!");

    } catch (error: any) {
        console.error("Falha ao criar torneio:", error);
        alert(error.message);
    }
}


function updateRemote() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({
      type: 'keys',
      keys: {
        'w': keys['w'], 's': keys['s'],
        'a': keys['a'], 'd': keys['d'],
        'ArrowUp': keys['ArrowUp'], 'ArrowDown': keys['ArrowDown'],
        'ArrowLeft': keys['ArrowLeft'], 'ArrowRight': keys['ArrowRight']
      }
    }));
  }
}

function gameLoop() {
  updateRemote();
  draw();
  animationFrameId = requestAnimationFrame(gameLoop);
  setAnimationFrameId(animationFrameId);
}

// Lógica de inicialização simplificada para corrigir a "tela azul"
export async function initTournamentGame() {
    stopTournamentGame(); // Garante que qualquer estado anterior seja limpo
    if (!initSharedState()) return;

    // Esconde o modal e mostra a sala de espera imediatamente
    document.getElementById('tournament-modal')?.classList.add('hidden');
    document.getElementById('waiting-room')?.classList.remove('hidden');


    const { username, profilePic } = await getUserProfile();
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        window.location.hash = '/login';
        return;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.uuid;

    ws = new WebSocket(`ws://localhost:3001?userId=${userId}&username=${encodeURIComponent(username)}&profilePic=${encodeURIComponent(profilePic)}`);

    ws.onopen = () => {
        console.log(`WebSocket conectado como ${username}. Aguardando jogadores...`);
    };

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        switch (message.type) {
        case 'lobby_update':
            renderWaitingRoom(message.players);
            // A criação do torneio agora é disparada por todos os clientes,
            // mas o backend deve ser robusto para lidar com isso (ex: criar apenas uma vez).
            if (message.players.length === 4) {
                createTournament(message.players);
            }
            break;
        case 'game_start':
            document.getElementById('waiting-room')?.classList.add('hidden');
            document.getElementById('game-container')?.classList.remove('hidden');
            setIsWaiting(false);
            const playerNames = message.opponents;
            setPlayerNames(playerNames);
            if(message.paddles && message.ball){
              setPaddles(message.paddles);
              setBall(message.ball);
            }
            gameLoop();
            break;
        case 'update':
            setBall(message.ball);
            setPaddles(message.paddles);
            break;
        case 'game_over':
            stopTournamentGame();
            if (message.winner) {
              const { username, profilePic } = message.winner;
              const path = `/winner?username=${encodeURIComponent(username)}&profilePic=${encodeURIComponent(profilePic)}`;
              history.pushState({}, '', path);
              window.dispatchEvent(new PopStateEvent('popstate'));
            } else {
                alert('O jogo terminou sem um vencedor claro.');
                window.location.hash = '/';
            }
            break;
        case 'opponent_disconnected':
            alert("Um oponente desconectou. O jogo terminou.");
            stopTournamentGame();
            window.location.hash = '/';
            break;
        case 'error':
            alert(`Erro do servidor: ${message.message}`);
            stopTournamentGame();
            window.location.hash = '/';
            break;
        }
    };

    ws.onclose = () => {
        // Evita múltiplos alertas se o jogo já terminou normalmente
        if (document.getElementById('game-container')?.classList.contains('hidden')) {
            console.log("Conexão WebSocket fechada.");
        } else {
             alert("A conexão com o servidor foi perdida.");
        }
        stopTournamentGame();
        window.location.hash = '/';
    };

    ws.onerror = (err) => {
        console.error("Erro no WebSocket: ", err);
        alert("Ocorreu um erro na conexão com o servidor.");
        stopTournamentGame();
        window.location.hash = '/';
    }
}

export function stopTournamentGame() {
  stopSharedState();
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    setAnimationFrameId(null);
    animationFrameId = null;
  }
  if (ws) {
    ws.onmessage = null;
    ws.onclose = null;
    ws.onerror = null;
    if (ws.readyState === WebSocket.OPEN) {
        ws.close();
    }
    ws = null;
  }
}