import { t, ErrorKeys } from '../../i18n';
import { API_BASE_URL } from '../../utils/constants';

function display2FAError(errorKey: ErrorKeys) {
    const errorElement = document.getElementById('2fa-error-message');
    if (errorElement) {
        errorElement.textContent = t().errors[errorKey] || t().errors['Default Error'];
    }
}

async function fetchAPI(url: string, options: RequestInit = {}): Promise<Response> {
    const token = localStorage.getItem('jwtToken');
    const headers = new Headers(options.headers || {});

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    if (!(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }

    return fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
        credentials: 'include',
    });
}


export function init2FA(user: any) {
    const manage2faButton = document.getElementById('2fa-button');
    const twoFaModal = document.getElementById('2fa-modal');
    const cancel2faButton = document.getElementById('cancel-2fa-button');
    const enable2faButton = document.getElementById('enable-2fa-button');
    const disable2faButton = document.getElementById('disable-2fa-button');
    const qrCodeImage = document.getElementById('qr-code') as HTMLImageElement;
    const enableCodeInput = document.getElementById('2fa-code-input') as HTMLInputElement;
    const disableCodeInput = document.getElementById('2fa-disable-code-input') as HTMLInputElement;

    const setupContent = document.getElementById('2fa-setup-content');
    const disableContent = document.getElementById('2fa-disable-content');

    manage2faButton?.addEventListener('click', async () => {
        const errorElement = document.getElementById('2fa-error-message');
        if (errorElement) errorElement.textContent = ''; 
        
        if (user.twoFactorEnabled) {
            setupContent?.classList.add('hidden');
            disableContent?.classList.remove('hidden');
        } else {
            disableContent?.classList.add('hidden');
            setupContent?.classList.remove('hidden');
            try {
                const response = await fetchAPI(`/generateQrcode?uuid=${user.Uuid}`);
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    const rawMessage = errorData.message || 'Default Error';
                    const messageKey = rawMessage.split('Message:').pop()?.trim() as ErrorKeys || 'Default Error';
                    throw new Error(messageKey);
                }
                const data = await response.json();
                qrCodeImage.src = data.qrcode;
            } catch (error: any) {
                display2FAError(error.message as ErrorKeys);
            }
        }
        twoFaModal?.classList.remove('hidden');
    });

    cancel2faButton?.addEventListener('click', () => {
        twoFaModal?.classList.add('hidden');
    });

    enable2faButton?.addEventListener('click', async () => {
        const code = enableCodeInput.value;
        if (!/^\d{6}$/.test(code)) {
            display2FAError('Invalid token for 2FA');
            return;
        }

        try {
            const response = await fetchAPI('/enable2fa', {
                method: 'POST',
                body: JSON.stringify({ uuid: user.Uuid, code: code }),
            });

            if (response.ok) {
                window.location.reload();
            } else {
                const errorData = await response.json();
                const rawMessage = errorData.message || '';
                const messageKey = rawMessage.split('Message:').pop()?.trim() as ErrorKeys || 'Default Error';
                display2FAError(messageKey);
            }
        } catch (error) {
            display2FAError('Network Error');
        }
    });

    disable2faButton?.addEventListener('click', async () => {
        const code = disableCodeInput.value;
        if (!/^\d{6}$/.test(code)) {
            display2FAError('Invalid token for 2FA');
            return;
        }

        try {
            const response = await fetchAPI('/disable2fa', {
                method: 'PUT',
                body: JSON.stringify({ uuid: user.Uuid, code: code }),
            });

            if (response.ok) {
                window.location.reload();
            } else {
                const errorData = await response.json();
                const rawMessage = errorData.message || '';
                const messageKey = rawMessage.split('Message:').pop()?.trim() as ErrorKeys || 'Default Error';
                display2FAError(messageKey);
            }
        } catch (error) {
            display2FAError('Network Error');
        }
    });
}