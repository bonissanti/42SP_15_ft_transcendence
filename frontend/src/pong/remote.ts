import {
  initSharedState, stopSharedState, draw, keys,
  setBall, setPlayer1, setPlayer2, setAnimationFrameId, setIsWaiting
} from './common';

let ws: WebSocket | null = null;
let playerNumber: 1 | 2;

function updateRemote() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    const playerKeys = (playerNumber === 1)
      ? { 'w': keys['w'], 's': keys['s'] }
      : { 'ArrowUp': keys['ArrowUp'], 'ArrowDown': keys['ArrowDown'] };
    ws.send(JSON.stringify({ type: 'keys', keys: playerKeys }));
  }
}

function gameLoop() {
  updateRemote();
  draw();
  setAnimationFrameId(requestAnimationFrame(gameLoop));
}

export function initRemoteGame() {
  if (!initSharedState()) return;

  ws = new WebSocket('ws://localhost:8081');

  ws.onopen = () => console.log("Conectado ao game-service.");

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case 'assign_player':
        playerNumber = message.player;
        console.log(`Você é o jogador ${playerNumber}`);
        break;
      case 'update':
        setIsWaiting(false);
        setBall(message.ball);
        setPlayer1(message.player1);
        setPlayer2(message.player2);
        break;
      case 'waiting':
        setIsWaiting(true);
        break;
      case 'game_over':
        alert(message.winner === playerNumber ? 'Você ganhou!' : 'Você perdeu!');
        stopRemoteGame();
        window.location.href = '/';
        break;
    }
  };

  ws.onclose = () => {
    console.log("Desconectado do game-service.");
    if (ws) {
        alert("A conexão com o servidor foi perdida.");
        stopRemoteGame();
        window.location.href = '/';
    }
  };

  gameLoop();
}

export function stopRemoteGame() {
    stopSharedState();
    if (ws) {
        ws.onmessage = null;
        ws.onclose = null;
        ws.close();
        ws = null;
    }
}