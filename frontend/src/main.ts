import './styles.css';
import { initPongGame, stopPongGame } from './pong/game';
import { initRpsGame } from './rps/game';

const appContainer = document.getElementById('app') as HTMLDivElement;

const mainMenuView = `
  <div class="w-full relative">
    <div class="absolute top-0 right-0 p-4">
      <a href="/profile" class="text-white hover:text-indigo-400 transition-colors" data-navigate="/profile">Perfil</a>
    </div>
    <h1 class="text-5xl mb-8 text-glow">TRANSCENDENCE</h1>
    <div class="flex flex-col items-center">
      <button class="menu-button" data-navigate="/pong">Jogar Pong</button>
      <button class="menu-button" data-navigate="/rps">Pedra, Papel, Tesoura</button>
      <a href="/creators" class="mt-8 text-gray-400 hover:text-white transition-colors" data-navigate="/creators">Conheça nossos criadores!</a>
    </div>
  </div>
`;

const pongModeSelectionView = `
  <div>
    <h1 class="text-4xl mb-8 text-glow">PONG</h1>
    <p class="mb-4">Selecione o modo de jogo:</p>
    <button class="menu-button" data-navigate="/pong/singleplayer">Single Player</button>
    <button class="menu-button" data-navigate="/pong/multiplayer">Multiplayer</button>
    <br>
    <button class="menu-button mt-8" data-navigate="/">Voltar ao Menu</button>
  </div>
`;

const pongGameView = `
  <div>
    <p class="mb-2">P1: W/S | P2: ↑/↓</p>
    <canvas id="pongCanvas" width="800" height="600" class="bg-black border-4 border-white rounded-lg shadow-retro"></canvas>
    <br>
    <button class="menu-button" data-navigate="/">Voltar ao Menu</button>
  </div>
`;

const rpsView = `
  <div class="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md text-center mx-auto">
    <h2 class="text-3xl font-bold mb-4 text-teal-400">Pedra, Papel & Tesoura</h2>
    <div class="flex justify-around items-center bg-slate-700 rounded-lg p-4 mb-6 text-lg">
      <div class="flex flex-col"><span class="font-bold text-2xl" id="player-score">0</span><span>Você</span></div>
      <div class="font-bold text-2xl">:</div>
      <div class="flex flex-col"><span class="font-bold text-2xl" id="computer-score">0</span><span>CPU</span></div>
    </div>
    <div class="h-24 flex flex-col justify-center items-center mb-6">
        <div id="choices-display" class="text-xl h-8"></div>
        <p id="result-text" class="text-2xl font-semibold h-8 mt-2"></p>
    </div>
    <p class="mb-4 text-gray-300">Faça sua jogada:</p>
    <div class="flex justify-center gap-4">
        <button data-choice="rock" class="choice-btn bg-cyan-500 hover:bg-cyan-600 p-4 rounded-full text-4xl transition-transform duration-200 hover:scale-110">🗿</button>
        <button data-choice="paper" class="choice-btn bg-pink-500 hover:bg-pink-600 p-4 rounded-full text-4xl transition-transform duration-200 hover:scale-110">📄</button>
        <button data-choice="scissors" class="choice-btn bg-yellow-500 hover:bg-yellow-600 p-4 rounded-full text-4xl transition-transform duration-200 hover:scale-110">✂️</button>
    </div>
    <div class="mt-8">
        <button class="menu-button" data-navigate="/">Voltar ao Menu</button>
    </div>
  </div>
`;

const profileView = `
  <div>
    <h1 class="text-4xl text-glow mb-8">Perfil</h1>
    <p>Informações básicas do usuário.</p>
    <button class="menu-button mt-8" data-navigate="/">Voltar ao Menu</button>
  </div>
`;

const creatorsView = `
  <div>
    <h1 class="text-4xl text-glow mb-8">Criadores</h1>
    <p>Este projeto foi criado por...</p>
    <button class="menu-button mt-8" data-navigate="/">Voltar ao Menu</button>
  </div>
`;

const routes: { [key: string]: string } = {
  '/': mainMenuView,
  '/pong': pongModeSelectionView,
  '/pong/singleplayer': pongGameView,
  '/pong/multiplayer': pongGameView,
  '/rps': rpsView,
  '/profile': profileView,
  '/creators': creatorsView,
};

function router(path: string) {
  stopPongGame();
  appContainer.innerHTML = routes[path] || `<h1>404 Not Found</h1><button class="menu-button" data-navigate="/">Voltar</button>`;
  if (path === '/pong/singleplayer') {
    initPongGame('singleplayer');
  } else if (path === '/pong/multiplayer') {
    initPongGame('multiplayer');
  } else if (path === '/rps') {
    initRpsGame();
  }
}

document.body.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const navLink = target.closest('[data-navigate]');
  if (navLink) {
    e.preventDefault();
    const path = navLink.getAttribute('data-navigate')!;
    history.pushState({}, '', path);
    router(path);
  }
});

window.addEventListener('popstate', () => {
  router(window.location.pathname);
});

router(window.location.pathname);
