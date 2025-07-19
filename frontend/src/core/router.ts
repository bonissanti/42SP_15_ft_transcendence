import { routes } from '../config/routes';
import { renderView } from './view';
import { stopPongGame } from '../pong/game';
import { initializeGoogleButton, logout } from '../auth/auth';
import { fetchWithAuth } from '../api/api';

const appContainer = document.getElementById('app') as HTMLDivElement;
let statusListenersActive = false;

async function updateUserStatus(isOnline: boolean) {
    if (!localStorage.getItem('jwtToken')) return;
    try {
        await fetchWithAuth('/users/me/status', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isOnline }),
        });
    } catch (error) {
        console.error('Falha ao atualizar status:', error);
    }
}

const handleFocus = () => updateUserStatus(true);
const handleBlur = () => updateUserStatus(false);

const handleUnload = () => {
    if (localStorage.getItem('jwtToken')) {
        navigator.sendBeacon('/api/users/me/status', JSON.stringify({ isOnline: false }));
    }
};

function startStatusListeners() {
    if (statusListenersActive) return;
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('unload', handleUnload);
    statusListenersActive = true;
}

export function stopStatusListeners() {
    if (!statusListenersActive) return;
    window.removeEventListener('focus', handleFocus);
    window.removeEventListener('blur', handleBlur);
    window.removeEventListener('unload', handleUnload);
    statusListenersActive = false;
}

export async function router() {
  const path = window.location.pathname;

  stopPongGame();
  stopStatusListeners(); 

  appContainer.innerHTML = `<h1>Carregando...</h1>`;

  const token = localStorage.getItem('jwtToken');
  const isProtectedRoute = !['/login'].includes(path);

  if (!token && isProtectedRoute) {
    history.pushState({}, '', '/login');
    await router();
    return;
  }

  if (token && path === '/login') {
    history.pushState({}, '', '/');
    await router();
    return;
  }

  if (token && isProtectedRoute) {
    startStatusListeners();
    updateUserStatus(true);
  }

  const route = routes.find(r => r.path === path);

  if (route) {
    if (route.path === '/profile' && route.action) {
      appContainer.innerHTML = await (route.action as Function)();
    } else {
      appContainer.innerHTML = await renderView(route.view);
      if (route.action) {
        (route.action as Function)();
      }
    }

    if (route.view === 'login') {
      initializeGoogleButton();
    }
  } else {
    appContainer.innerHTML = await renderView('404');
  }
}

document.body.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const navLink = target.closest('[data-navigate]');
  if (navLink) {
    e.preventDefault();
    const path = navLink.getAttribute('data-navigate')!;
    history.pushState({}, '', path);
    router();
  }
});

window.addEventListener('popstate', router);
window.addEventListener('auth-error', logout);