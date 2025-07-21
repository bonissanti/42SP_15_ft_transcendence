import { API_BASE_URL, GOOGLE_CLIENT_ID } from '../utils/constants';
import { updateProfileLink } from '../components/profileLink';  
import { stopStatusListeners } from '../core/router';

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
            element: HTMLElement,
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
}


function navigateTo(path: string) {
  history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function logout() {
  if (localStorage.getItem('jwtToken')) {
    navigator.sendBeacon(`${API_BASE_URL}/users/me/status`, JSON.stringify({ isOnline: false }));
  }

  stopStatusListeners();
  localStorage.removeItem('jwtToken');
  updateProfileLink();
  navigateTo('/login');
}

async function handleGoogleCredentialResponse(response: any) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential }),
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('jwtToken', token);
      updateProfileLink();
      navigateTo('/');
    } else {
      const errorData = await res.json();
      alert(`Falha no login: ${errorData.message}`);
    }
  } catch (err) {
    console.error("Erro ao tentar fazer login:", err);
    alert("Erro de rede. Não foi possível conectar ao servidor.");
  }
}

export function initializeGoogleButton() {
  let attempts = 0;
  const maxAttempts = 100;

  const checkGoogleReady = setInterval(() => {
    const googleSignInElement = document.getElementById("g_id_signin");
    if (typeof window.google !== 'undefined' && window.google.accounts && googleSignInElement) {
      clearInterval(checkGoogleReady);
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCredentialResponse
        });
        window.google.accounts.id.renderButton(
          googleSignInElement,
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