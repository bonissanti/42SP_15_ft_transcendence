import { API_BASE_URL, GOOGLE_CLIENT_ID } from '../utils/constants';
import { updateProfileLink } from '../components/profileLink';  
import { stopStatusListeners } from '../core/router';
import { isUserAuthenticated } from '../api/api';

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
  if (isUserAuthenticated()) {
    navigator.sendBeacon(`${API_BASE_URL}/users/me/status`, JSON.stringify({ isOnline: false }));
  }

  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

  stopStatusListeners();
  updateProfileLink();
  navigateTo('/login');
}

export async function handleGoogleCredentialResponse(response: any) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/google`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Resposta do servidor:', data);
      
      if (data.token) {
        document.cookie = `token=${data.token}; path=/; max-age=3600; samesite=lax`;
        console.log('Token salvo no cookie:', data.token);
        localStorage.setItem('jwtToken', data.token);
        console.log('Token salvo no localStorage:', data.token);
      }
      
      console.log('Headers da resposta:', res.headers);
      console.log('Set-Cookie header:', res.headers.get('set-cookie'));
      
      setTimeout(() => {
        console.log('Verificando autenticação após login...');
        console.log('Cookies após login:', document.cookie);
        console.log('localStorage token:', localStorage.getItem('jwtToken'));
        console.log('isUserAuthenticated:', isUserAuthenticated());
        
        updateProfileLink();
        navigateTo('/');
      }, 100);
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

