import { fetchWithAuth } from '../api/api';
import {
  initSharedState, stopSharedState, draw, keys,
  setBall, setPlayer1, setPlayer2, setAnimationFrameId, setIsWaiting,
  setPlayerNames
} from './common';

let ws: WebSocket | null = null;
let animationFrameId: number | null = null;

async function getUserProfile(): Promise<{ username: string }> {
  try {
    const response = await fetchWithAuth('/users/me');
    if (!response.ok) {
      console.error('Falha ao buscar dados do usuário, usando "Anônimo".');
      return { username: 'Anônimo' };
    }
    const user = await response.json();
    return { username: user.Username || 'Anônimo' };
  } catch (error) {
    console.error("Erro ao carregar perfil para o jogo:", error);
    return { username: 'Anônimo' };
  }
}

function updateRemote() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({
      type: 'keys',
      keys: {
        'w': keys['w'],
        's': keys['s'],
        'ArrowUp': keys['ArrowUp'],
        'ArrowDown': keys['ArrowDown']
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

export async function initRemoteGame() {
  if (!initSharedState()) return;

  const { username } = await getUserProfile();

  const token = localStorage.getItem('jwtToken');
  if (!token) {
    console.error("Token JWT não encontrado.");
    window.location.hash = '/login';
    return;
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.uuid;

  ws = new WebSocket(`ws://localhost:8081?userId=${userId}&username=${encodeURIComponent(username)}`);

  ws.onopen = () => {
    console.log(`WebSocket conectado como ${username}. Aguardando oponente...`);
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case 'waiting_for_opponent':
        setIsWaiting(true);
        draw();
        break;
      case 'game_start':
        setIsWaiting(false);
        if (message.playerNumber === 1) {
          setPlayerNames(username, message.opponentUsername);
        } else {
          setPlayerNames(message.opponentUsername, username);
        }
        gameLoop();
        break;
      case 'update':
        setBall(message.ball);
        setPlayer1(message.player1);
        setPlayer2(message.player2);
        break;
      case 'game_over':
        alert(message.winner === message.playerNumber ? 'Você ganhou!' : 'Você perdeu!');
        stopRemoteGame();
        window.location.hash = '/';
        break;
      case 'opponent_disconnected':
        alert("Seu oponente desconectou. Você venceu por W.O.!");
        stopRemoteGame();
        window.location.hash = '/';
        break;
      case 'error':
        alert(`Erro do servidor: ${message.message}`);
        stopRemoteGame();
        window.location.hash = '/';
        break;
    }
  };

  ws.onclose = () => {
    if (animationFrameId) {
      alert("A conexão com o servidor foi perdida.");
      stopRemoteGame();
      window.location.hash = '/';
    }
  };
}

export function stopRemoteGame() {
  stopSharedState();
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    setAnimationFrameId(null);
    animationFrameId = null;
  }
  if (ws) {
    ws.onmessage = null;
    ws.onclose = null;
    ws.close();
    ws = null;
  }
  setIsWaiting(false);
}