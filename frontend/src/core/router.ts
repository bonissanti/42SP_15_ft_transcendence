import { routes } from '../config/routes';
import { renderView } from './view';
import { stopPongGame } from '../pong/game';
import { initializeGoogleButton } from '../auth/auth';
import { logout } from '../auth/auth';

const appContainer = document.getElementById('app') as HTMLDivElement;

export async function router() {
  const path = window.location.pathname;

  stopPongGame();
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