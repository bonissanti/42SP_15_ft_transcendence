import { API_BASE_URL, GAME_API_BASE_URL } from '../utils/constants';

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const token = localStorage.getItem('jwtToken');
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  const response = await fetch(`${API_BASE_URL}${url}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...Object.fromEntries(headers),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Falha ao buscar dados do usuário. Status: ${response.status}`);
  }

  return response;
}

export async function fetchWithGame(url: string, options: RequestInit = {}): Promise<Response> {
  const token = localStorage.getItem('jwtToken');
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${GAME_API_BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (response.status === 401) {
    window.dispatchEvent(new Event('auth-error'));
  }

  return response;
}

export function isUserAuthenticated(): boolean {
  
  const hasCookie = document.cookie.split('; ').some((row) => row.startsWith('token='));
  const hasLocalStorage = !!localStorage.getItem('jwtToken');
  
  return hasCookie || hasLocalStorage;
}