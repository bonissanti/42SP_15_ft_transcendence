import './styles.css';
import { initPongGame, stopPongGame } from './pong/game';
import { initRpsGame } from './rps/game';
import { t, toggleLanguage, getCurrentLanguage } from './i18n';

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: any) => void;
          }) => void;
          renderButton: (
            element: HTMLElement | null,
            options: {
              theme: string;
              size: string;
              type: string;
            }
          ) => void;
        };
      };
    };
  }
  const google: Window['google'];
}

const appContainer = document.getElementById('app') as HTMLDivElement;
const langContainer = document.getElementById('lang-switcher-container') as HTMLDivElement;
const profileContainer = document.getElementById('profile-link-container') as HTMLDivElement;

function simpleTemplate(html: string, data: object): string {
  const context = { ...t(), ...data };
  return html.replace(/{{(.*?)}}/g, (match, key) => {
    const prop = key.trim();
    const value = prop.split('.').reduce((acc: any, part: string) => acc && acc[part], context);
    return value !== undefined ? String(value) : match;
  });
}

async function renderView(viewName: string, data: object = {}): Promise<void> {
  try {
    const response = await fetch(`/pages/${viewName}.html`);
    if (!response.ok) throw new Error(`View not found: ${viewName}`);
    const htmlTemplate = await response.text();
    appContainer.innerHTML = simpleTemplate(htmlTemplate, data);
  } catch (error) {
    console.error('Failed to render view:', error);
    appContainer.innerHTML = `
      <h1>Erro ao carregar a página</h1>
      <p>Não foi possível encontrar o conteúdo solicitado.</p>
      <button class="menu-button" data-navigate="/">Voltar ao Menu</button>
    `;
  }
}

const routes = [
  { path: '/login', view: 'login' },
  { path: '/', view: 'mainMenu' },
  { path: '/pong', view: 'pongModeSelection' },
  { path: '/pong/singleplayer', view: 'pongGame', action: () => initPongGame('singleplayer') },
  { path: '/pong/multiplayer', view: 'pongGame', action: () => initPongGame('multiplayer') },
  { path: '/rps', view: 'rps', action: initRpsGame },
  { path: '/creators', view: 'creators' },
];

function initializeGoogleButton() {
  let attempts = 0;
  const maxAttempts = 100;

  const checkGoogleReady = setInterval(() => {
    if (typeof window.google !== 'undefined' && window.google.accounts && document.getElementById("g_id_signin")) {
      clearInterval(checkGoogleReady);
      try {
        window.google.accounts.id.initialize({
          client_id: '298539346397-imm2ctlgievdlfb7vff3pdsh2291itjk.apps.googleusercontent.com',
          callback: handleGoogleCredentialResponse
        });
        window.google.accounts.id.renderButton(
          document.getElementById("g_id_signin"),
          { theme: "outline", size: "large", type: 'standard' }
        );
      } catch (error) {
        console.error("Erro ao inicializar o Google Sign-In:", error);
      }
    } else {
      attempts++;
      if (attempts > maxAttempts) {
        clearInterval(checkGoogleReady);
        console.error("A API do Google não carregou a tempo ou o elemento 'g_id_signin' não foi encontrado.");
      }
    }
  }, 100);
}

async function router(path: string) {
  stopPongGame();
  appContainer.innerHTML = `<h1>Carregando...</h1>`;

  const token = localStorage.getItem('jwtToken');
  const isProtectedRoute = !['/login'].includes(path);
  if (!token && isProtectedRoute) {
    history.pushState({}, '', '/login');
    router('/login');
    return;
  }

  if (token && path === '/login') {
    history.pushState({}, '', '/');
    router('/');
    return;
  }

  if (path === '/profile') {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      history.pushState({}, '', '/');
      router('/');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok) throw new Error('Falha ao buscar dados do usuário.');

      const user = await response.json();
      user.ProfilePic = user.ProfilePic || 'https://placehold.co/128x128/000000/FFFFFF?text=User';

      await renderView('profile', { user });
      document.getElementById('logout-button')?.addEventListener('click', logout);
    } catch (error: any) {
      console.error("Erro ao carregar perfil:", error);
      await renderView('error', { message: error.message });
    }
    return;
  }

  for (const route of routes) {
    if (route.path === path) {
      await renderView(route.view);
      if (route.view === 'login') {
        initializeGoogleButton();
      } else if (route.action) {
        route.action();
      }
      return;
    }
  }

  await renderView('404');
}

async function handleGoogleCredentialResponse(response: any) {
  try {
    const res = await fetch(`http://localhost:8080/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential }),
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('jwtToken', token);
      history.pushState({}, '', '/');
      router('/');
    } else {
      const errorData = await res.json();
      alert(`Falha no login: ${errorData.message}`);
    }
  } catch (err) {
    console.error("Erro ao tentar fazer login:", err);
    alert("Erro de rede. Não foi possível conectar ao servidor.");
  }
}

function logout() {
  localStorage.removeItem('jwtToken');
  history.pushState({}, '', '/login');
  router('/login');
}

function updateUiText() {
  const lang = getCurrentLanguage();
  langContainer.innerHTML = `<button class="bg-gray-700 p-2 rounded-md border-2 border-white text-sm hover:bg-indigo-600 transition-colors">${lang === 'pt-BR' ? 'PT-BR' : 'EN'}</button>`;

  const texts = t();
  profileContainer.innerHTML = `<a href="/profile" class="text-white hover:text-indigo-400 transition-colors text-sm" data-navigate="/profile">${texts.profileLink}</a>`;
}

langContainer.addEventListener('click', () => {
  toggleLanguage();
  updateUiText();
  router(window.location.pathname);
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

function initializeApp() {
  updateUiText();
  router(window.location.pathname);
}

initializeApp();
