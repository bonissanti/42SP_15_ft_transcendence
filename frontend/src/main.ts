import './styles.css';
import { initPongGame, stopPongGame } from './pong/game';
import { initRpsGame } from './rps/game';
import { t, toggleLanguage, getCurrentLanguage } from './i18n';

const appContainer = document.getElementById('app') as HTMLDivElement;
const langContainer = document.getElementById('lang-switcher-container') as HTMLDivElement;

function getViews() {
  const texts = t();
  return {
    mainMenuView: `
      <div class="w-full relative">
        <h1 class="text-5xl mb-8 text-glow">${texts.mainMenuTitle}</h1>
        <div class="flex flex-col items-center">
          <button class="menu-button" data-navigate="/pong">${texts.playPongButton}</button>
          <button class="menu-button" data-navigate="/rps">${texts.playRpsButton}</button>
          <a href="/creators" class="mt-8 text-gray-400 hover:text-white transition-colors" data-navigate="/creators">${texts.creatorsLink}</a>
        </div>
      </div>`,
    pongModeSelectionView: `
      <div>
        <h1 class="text-4xl mb-8 text-glow">${texts.pongTitle}</h1>
        <p class="mb-4">${texts.selectMode}</p>
        <button class="menu-button" data-navigate="/pong/singleplayer">${texts.singlePlayer}</button>
        <button class="menu-button" data-navigate="/pong/multiplayer">${texts.multiplayer}</button>
        <br>
        <button class="menu-button mt-8" data-navigate="/">${texts.backToMenu}</button>
      </div>`,
    pongGameView: `
      <div>
        <p class="mb-2">${texts.pongInstructions}</p>
        <canvas id="pongCanvas" width="800" height="600" class="bg-black border-4 border-white rounded-lg shadow-retro"></canvas>
        <br>
        <button class="menu-button" data-navigate="/">${texts.backToMenu}</button>
      </div>`,
    rpsView: `
      <div class="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md text-center mx-auto">
        <h2 class="text-3xl font-bold mb-4 text-teal-400">${texts.rpsTitle}</h2>
        <div class="flex justify-around items-center bg-slate-700 rounded-lg p-4 mb-6 text-lg">
          <div class="flex flex-col"><span class="font-bold text-2xl" id="player-score">0</span><span>${texts.player}</span></div>
          <div class="font-bold text-2xl">:</div>
          <div class="flex flex-col"><span class="font-bold text-2xl" id="computer-score">0</span><span>${texts.cpu}</span></div>
        </div>
        <div class="h-24 flex flex-col justify-center items-center mb-6">
            <div id="choices-display" class="text-xl h-8"></div>
            <p id="result-text" class="text-2xl font-semibold h-8 mt-2"></p>
        </div>
        <p class="mb-4 text-gray-300">${texts.yourTurn}</p>
        <div class="flex justify-center gap-4">
            <button data-choice="rock" class="choice-btn bg-cyan-500 hover:bg-cyan-600 p-4 rounded-full text-4xl transition-transform duration-200 hover:scale-110">🗿</button>
            <button data-choice="paper" class="choice-btn bg-pink-500 hover:bg-pink-600 p-4 rounded-full text-4xl transition-transform duration-200 hover:scale-110">📄</button>
            <button data-choice="scissors" class="choice-btn bg-yellow-500 hover:bg-yellow-600 p-4 rounded-full text-4xl transition-transform duration-200 hover:scale-110">✂️</button>
        </div>
        <div class="mt-8">
            <button class="menu-button" data-navigate="/">${texts.backToMenu}</button>
        </div>
      </div>`,
    profileView: `
      <div>
        <h1 class="text-4xl text-glow mb-8">${texts.profileTitle}</h1>
        <p>${texts.profileText}</p>
        <button class="menu-button mt-8" data-navigate="/">${texts.backToMenu}</button>
      </div>`,
    creatorsView: `
      <div>
        <h1 class="text-4xl text-glow mb-8">${texts.creatorsTitle}</h1>
        <p>${texts.creatorsText}</p>
        <button class="menu-button mt-8" data-navigate="/">${texts.backToMenu}</button>
      </div>`,
  };
}

async function router(path: string) {
  stopPongGame();

  const views = getViews();
  const routes: { [key: string]: string } = {
    '/': views.mainMenuView,
    '/pong': views.pongModeSelectionView,
    '/pong/singleplayer': views.pongGameView,
    '/pong/multiplayer': views.pongGameView,
    '/rps': views.rpsView,
    '/creators': views.creatorsView,
  };

  if (path === '/profile') {
    appContainer.innerHTML = `<h1>Carregando Perfil...</h1>`;

    try {
      const userId = '2470fddb-9e2e-479e-9775-2462d3ce8661';
      const response = await fetch(`http://localhost:8080/api/users/${userId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao buscar dados do usuário.');
      }

      const user = await response.json();
      const texts = t();

      appContainer.innerHTML = `
        <div>
          <h1 class="text-4xl text-glow mb-8">${texts.profileTitle}: ${user.Username}</h1>
          <img src="${user.ProfilePic || 'caminho/para/imagem/default.png'}" alt="Foto de Perfil" class="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-retro mb-4">
          <div class="text-left max-w-sm mx-auto bg-slate-800 p-4 rounded-lg">
            <p class="mb-2"><strong class="text-indigo-400">Email:</strong> ${user.Email}</p>
            <p class="mb-2"><strong class="text-indigo-400">Status:</strong> ${user.isOnline ? 'Online' : 'Offline'}</p>
            <p class="mb-2"><strong class="text-indigo-400">Partidas Jogadas:</strong> ${user.matchesPlayed}</p>
            <p class="mb-2"><strong class="text-indigo-400">Vitórias:</strong> ${user.wins}</p>
            <p class="mb-2"><strong class="text-indigo-400">Derrotas:</strong> ${user.loses}</p>
          </div>
          <button class="menu-button mt-8" data-navigate="/">${texts.backToMenu}</button>
        </div>
      `;
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      let errorMessage = 'An unexpected error occurred.';
      if (error instanceof Error) errorMessage = error.message;
      else if (typeof error === 'string') errorMessage = error;
      appContainer.innerHTML = `
        <h1>Erro ao carregar perfil</h1>
        <p>${errorMessage}</p>
        <button class="menu-button" data-navigate="/">Voltar</button>
      `;
    }

  } else {
    appContainer.innerHTML = routes[path] || `<h1>404 Not Found</h1><button class="menu-button" data-navigate="/">Voltar</button>`;

    if (path === '/pong/singleplayer') initPongGame('singleplayer');
    else if (path === '/pong/multiplayer') initPongGame('multiplayer');
    else if (path === '/rps') initRpsGame();
  }
}

function updateLangButton() {
  const lang = getCurrentLanguage();
  langContainer.innerHTML = `<button class="bg-gray-700 p-2 rounded-md border-2 border-white text-sm hover:bg-indigo-600 transition-colors">${lang === 'pt-BR' ? 'PT-BR' : 'EN'}</button>`;
}

function updateProfileLink() {
  const texts = t();
  const profileContainer = document.getElementById('profile-link-container') as HTMLDivElement;
  profileContainer.innerHTML = `<a href="/profile" class="text-white hover:text-indigo-400 transition-colors text-sm" data-navigate="/profile">${texts.profileLink}</a>`;
}

langContainer.addEventListener('click', () => {
  toggleLanguage();
  router(window.location.pathname);
  updateLangButton();
  updateProfileLink();
});

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

window.addEventListener('popstate', () => router(window.location.pathname));

router(window.location.pathname);
updateLangButton();
updateProfileLink();
