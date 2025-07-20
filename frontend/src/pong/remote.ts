import { fetchWithAuth } from '../api/api';
import {
  initSharedState, stopSharedState, draw, keys,
  setBall, setPaddles, setAnimationFrameId, setIsWaiting,
  setPlayerNames,
} from './common';

let ws: WebSocket | null = null;
let animationFrameId: number | null = null;

async function getUserProfile(): Promise<{ username: string }> {
  try {
    const response = await fetchWithAuth('/users/me');
    if (!response.ok) {
      return { username: 'Anônimo' };
    }
    const user = await response.json();
    return { username: user.Username || 'Anônimo' };
  } catch (error) {
    return { username: 'Anônimo' };
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

export async function initRemoteGame() {
  if (!initSharedState()) return;

  const { username } = await getUserProfile();
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    window.location.hash = '/login';
    return;
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.uuid;

  ws = new WebSocket(`ws://localhost:8081?userId=${userId}&username=${encodeURIComponent(username)}`);

  ws.onopen = () => console.log(`WebSocket conectado como ${username}. Aguardando oponentes...`);

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case 'waiting_for_opponent':
        setIsWaiting(true);
        draw();
        break;
      case 'game_start':
        setIsWaiting(false);
        const playerNames = [message.opponents[0], message.opponents[1], message.opponents[2], username];
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
        alert(message.winner === message.playerNumber ? 'Você ganhou!' : `Jogador ${message.winner} ganhou!`);
        stopRemoteGame();
        window.location.hash = '/';
        break;
      case 'opponent_disconnected':
        alert("Um oponente desconectou. O jogo terminou.");
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