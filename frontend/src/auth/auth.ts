import { API_BASE_URL, GOOGLE_CLIENT_ID } from '../utils/constants';
import { updateProfileLink } from '../components/profileLink';
import { stopStatusListeners } from '../core/router';
import { isUserAuthenticated } from '../api/api';
import { t, ErrorKeys } from '../i18n';

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

export async function logout() {
  if (isUserAuthenticated()) {
    try {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        await fetch(`${API_BASE_URL}/users/me/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ isOnline: false }),
          credentials: 'include'
        });
      }
    } catch (error) {
      console.warn('Falha ao atualizar status do usuário durante logout:', error);
    }
  }

  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  localStorage.removeItem('jwtToken');

  stopStatusListeners();
  updateProfileLink();
  navigateTo('/login');
}

async function handleAuthSuccess(data: any) {
  if (data.token) {
    document.cookie = `token=${data.token}; path=/; max-age=3600; samesite=lax`;
    localStorage.setItem('jwtToken', data.token);
    
    setTimeout(() => {
      updateProfileLink();
      navigateTo('/');
    }, 100);
  } else if (data.uuid && !data.token) {
    show2FAVerification(data.uuid);
  }
}

function show2FAVerification(uuid: string) {
  const loginView = document.getElementById('login-view');
  const registerView = document.getElementById('register-view');
  const initialView = document.getElementById('initial-view');
  
  loginView?.classList.add('hidden');
  registerView?.classList.add('hidden');
  initialView?.classList.add('hidden');
  
  let twoFAView = document.getElementById('two-fa-view');
  if (!twoFAView) {
    twoFAView = document.createElement('div');
    twoFAView.id = 'two-fa-view';
    twoFAView.className = 'hidden';
    twoFAView.innerHTML = `
      <h2 class="text-3xl mb-6 text-glow">${t().twoFactorVerification}</h2>
      <p class="text-lg mb-6">${t().enterCode}</p>
      <form id="two-fa-form">
        <input 
          type="text" 
          id="two-fa-code" 
          placeholder="000000" 
          maxlength="6" 
          pattern="[0-9]{6}"
          class="input-field mb-6"
          required
        />
        <button type="submit" class="menu-button w-full">${t().verify}</button>
      </form>
      <button id="back-to-login" class="back-button">${t().backToLogin}</button>
      <p id="two-fa-error" class="text-red-500 mt-4 h-6 text-center" style="display: none;"></p>
    `;
    
    const authContainer = document.querySelector('.text-center.p-10');
    if (authContainer) {
      authContainer.appendChild(twoFAView);
    }
  }
  
  twoFAView.classList.remove('hidden');
  
  const twoFAForm = document.getElementById('two-fa-form');
  const backToLoginBtn = document.getElementById('back-to-login');
  
  twoFAForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await handle2FAVerification(uuid);
  });
  
  backToLoginBtn?.addEventListener('click', () => {
    twoFAView?.classList.add('hidden');
    loginView?.classList.remove('hidden');
    clearAuthError();
  });
}

function display2FAAuthError(backendMessage?: string) {
  const errorElement = document.getElementById('two-fa-error');
  if (errorElement) {
    if (backendMessage) {
      const firstError = backendMessage.split('\n')[0];

      const cleanMessage = firstError.split('Message:')[1]?.trim() || firstError;
      
      const errorTranslations = t().errors;
      const displayMessage = errorTranslations[cleanMessage as ErrorKeys] || errorTranslations["Default Error"];
      
      errorElement.textContent = displayMessage;
      errorElement.style.display = 'block';
    } else {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  }
}

async function handle2FAVerification(uuid: string) {
    clearAuthError();
    const codeInput = document.getElementById('two-fa-code') as HTMLInputElement;
    const code = codeInput.value;

    if (!code || code.length !== 6) {
        display2FAAuthError('Invalid token for 2FA');
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/verify2fa?uuid=${uuid}&code=${code}`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();

        const token = data?.data?.token || data?.token;

        if (res.ok && token) {
            document.cookie = `token=${token}; path=/; max-age=3600; samesite=lax`;
            localStorage.setItem('jwtToken', token);

            setTimeout(() => {
                updateProfileLink();
                navigateTo('/');
            }, 100);
        } else {
            display2FAAuthError(data.message || 'Invalid token for 2FA');
        }
    } catch (err) {
        console.error("Erro na verificação 2FA:", err);
        display2FAAuthError("Network Error");
    }
}

function clearAuthError() {
  const errorElement = document.getElementById('auth-error');
  const twoFAErrorElement = document.getElementById('two-fa-error');
  
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
  
  if (twoFAErrorElement) {
    twoFAErrorElement.textContent = '';
    twoFAErrorElement.style.display = 'none';
  }
}

function displayAuthError(backendMessage?: string) {
  const errorElement = document.getElementById('auth-error');
  if (errorElement) {
    if (backendMessage) {
      const firstError = backendMessage.split('\n')[0];

      const cleanMessage = firstError.split('Message:')[1]?.trim() || firstError;
      
      const errorTranslations = t().errors;
      const displayMessage = errorTranslations[cleanMessage as ErrorKeys] || errorTranslations["Default Error"];
      
      errorElement.textContent = displayMessage;
      errorElement.style.display = 'block';
    } else {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  }
}

async function handleEmailLogin(event: Event) {
    event.preventDefault();
    clearAuthError();
    const email = (document.getElementById('login-email') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement).value;

    try {
        const res = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email, 
                password, 
                isOnline: true, 
                lastLogin: new Date().toISOString() 
            }),
        });

        const data = await res.json();
        if (res.ok) {
            await handleAuthSuccess(data.data || data);
        } else {
            displayAuthError(data.message || 'Falha no login.');
        }
    } catch (err) {
        console.error("Erro ao tentar fazer login:", err);
        displayAuthError("Erro de rede. Tente novamente.");
    }
}

async function handleRegister(event: Event) {
    event.preventDefault();
    clearAuthError();
    const username = (document.getElementById('register-username') as HTMLInputElement).value;
    const email = (document.getElementById('register-email') as HTMLInputElement).value;
    const password = (document.getElementById('register-password') as HTMLInputElement).value;
    const anonymous = (document.getElementById('share-email-checkbox') as HTMLInputElement).checked;

    try {
        const res = await fetch(`${API_BASE_URL}/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username, 
                email, 
                password,
                anonymous: anonymous,
                profilePic: '/img/cachorrao_user.png',
                lastLogin: null
            }),
        });
        console.log("Resposta do servidor:", res);
        const data = await res.json();
        if (res.ok) {
          console.log("Dados recebidos:", data);
            await handleAuthSuccess(data);
        } else {
            console.log("Erro na resposta do servidor:", data);
            displayAuthError(data.message || 'Falha no cadastro.');
        }
    } catch (err) {
        console.error("Erro ao tentar se cadastrar:", err);
        displayAuthError("Erro de rede. Tente novamente.");
    }
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
      await handleAuthSuccess(data);
    } else {
      const errorData = await res.json();
      displayAuthError(`Falha no login com Google: ${errorData.message}`);
    }
  } catch (err) {
    console.error("Erro ao tentar fazer login com Google:", err);
    displayAuthError("Erro de rede. Não foi possível conectar ao servidor.");
  }
}

function setupViews() {
    const initialView = document.getElementById('initial-view');
    const loginView = document.getElementById('login-view');
    const registerView = document.getElementById('register-view');

    const showLoginBtn = document.getElementById('show-login-view');
    const showRegisterBtn = document.getElementById('show-register-view');

    const backFromLoginBtn = document.getElementById('back-to-initial-from-login');
    const backFromRegisterBtn = document.getElementById('back-to-initial-from-register');

    const showView = (viewToShow: HTMLElement | null) => {
        initialView?.classList.add('hidden');
        loginView?.classList.add('hidden');
        registerView?.classList.add('hidden');
        const twoFAView = document.getElementById('two-fa-view');
        twoFAView?.classList.add('hidden');
        
        viewToShow?.classList.remove('hidden');
        clearAuthError();
    };

    showLoginBtn?.addEventListener('click', () => showView(loginView));
    showRegisterBtn?.addEventListener('click', () => showView(registerView));

    backFromLoginBtn?.addEventListener('click', () => showView(initialView));
    backFromRegisterBtn?.addEventListener('click', () => showView(initialView));
}

export function initializeAuth() {
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

        setupViews();

        document.getElementById('email-login-form')?.addEventListener('submit', handleEmailLogin);
        document.getElementById('register-account-form')?.addEventListener('submit', handleRegister);

      } catch (error) {
        console.error("Erro ao inicializar autenticação:", error);
      }
    } else {
      attempts++;
      if (attempts > maxAttempts) {
        clearInterval(checkGoogleReady);
        console.error("A API do Google não carregou a tempo ou o elemento 'g_id_signin' não foi encontrado");
      }
    }
  }, 100);
}