import {
  initSharedState, stopSharedState, draw, keys,
  setBall, setPlayer1, setPlayer2, setAnimationFrameId, setIsWaiting,
} from './common';

let ws: WebSocket | null = null;
let opponentId: string | null = null;
let animationFrameId: number | null = null;

function showInvitePopup(inviterId: string, inviterUsername: string) {
  const popup = document.createElement('div');
  popup.className = 'invite-popup';
  popup.innerHTML = `
    <div class="popup-content">
      <p>${inviterUsername} está te convidando para jogar!</p>
      <button id="accept-invite">Aceitar</button>
      <button id="reject-invite">Rejeitar</button>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById('accept-invite')?.addEventListener('click', () => {
    ws?.send(JSON.stringify({ type: 'accept_invite', inviterId }));
    document.body.removeChild(popup);
  });

  document.getElementById('reject-invite')?.addEventListener('click', () => {
    ws?.send(JSON.stringify({ type: 'reject_invite', inviterId }));
    document.body.removeChild(popup);
  });

  setTimeout(() => {
    if (document.body.contains(popup)) {
      document.body.removeChild(popup);
    }
  }, 10000);
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

export function initRemoteGame(_opponentId?: string) {
  if (!initSharedState()) return;

  opponentId = _opponentId || null;
  const token = localStorage.getItem('jwtToken');
  if (!token) return;
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.uuid;

  ws = new WebSocket(`ws://localhost:8081?userId=${userId}`);

  ws.onopen = () => {
    if (opponentId) {
      ws?.send(JSON.stringify({ type: 'invite', opponentId }));
      setIsWaiting(true);
    }
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case 'invite_received':
        showInvitePopup(message.inviterId, message.inviterUsername);
        break;
      case 'invite_rejected':
        alert(`${message.inviteeUsername} recusou o convite.`);
        stopRemoteGame();
        window.location.hash = '/pong/remote-multiplayer';
        break;
      case 'game_start':
        setIsWaiting(false);
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
      case 'error':
        alert(`Erro do servidor: ${message.message}`);
        stopRemoteGame();
        window.location.hash = '/';
        break;
    }
  };

  ws.onclose = () => {
    alert("A conexão com o servidor foi perdida.");
    stopRemoteGame();
    window.location.hash = '/';
  };
}

export function stopRemoteGame() {
  stopSharedState();
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  if (ws) {
    ws.onmessage = null;
    ws.onclose = null;
    ws.close();
    ws = null;
  }
}
