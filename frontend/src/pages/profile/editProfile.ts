import { fetchWithAuth } from '../../api/api';
import { t, ErrorKeys } from '../../i18n';
import { API_BASE_URL } from '../../utils/constants';

function displayProfileError(errorKey: ErrorKeys) {
  const errorElement = document.getElementById('profile-error-message');
  if (errorElement) {
    errorElement.textContent = t().errors[errorKey] || t().errors['Default Error'];
  }
}

export function initEditProfile(user: any, tempEmail: string) {
    const editProfileButton = document.getElementById('edit-profile-button');
    const editProfileModal = document.getElementById('edit-profile-modal');
    const editProfileForm = document.getElementById('edit-profile-form');
    const cancelEditButton = document.getElementById('cancel-edit-button');
    const usernameInput = document.getElementById('edit-username') as HTMLInputElement;
    const errorElement = document.getElementById('profile-error-message');
    const profilePicOverlay = document.getElementById('profile-pic-overlay');
    const profilePicInput = document.getElementById('profile-pic-input') as HTMLInputElement;

    profilePicOverlay?.addEventListener('click', () => {
        profilePicInput?.click();
    });

    profilePicInput?.addEventListener('change', async (e) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];

        if (!file) return;

        const formData = new FormData();
        formData.append('uuid', user.Uuid);
        formData.append('file', file);

        try {
            const response = await fetchWithAuth('/uploadPhoto', {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                const profileImg = document.querySelector('img[alt="Foto de Perfil"]') as HTMLImageElement;
                if (profileImg) {
                    profileImg.src = `${API_BASE_URL}/img/${result.profilePic}`;
                    window.location.reload();
                }
            } else {
                const errorData = await response.json();
                displayProfileError(errorData.message);
            }
        } catch (error) {
            displayProfileError('Network Error');
        }
    });

    editProfileButton?.addEventListener('click', () => {
        if (usernameInput) usernameInput.value = user.Username;
        if (errorElement) errorElement.textContent = '';
        editProfileModal?.classList.remove('hidden');
    });

    cancelEditButton?.addEventListener('click', () => {
        editProfileModal?.classList.add('hidden');
    });

    editProfileForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (errorElement) errorElement.textContent = '';

        const newUsername = (document.getElementById('edit-username') as HTMLInputElement).value;
        const newPassword = (document.getElementById('edit-password') as HTMLInputElement).value;

        const body: { [key: string]: any } = {
            uuid: user.Uuid,
            email: tempEmail,
            profilePic: user.ProfilePic,
        };

        if (newUsername && newUsername !== user.Username) body.username = newUsername;
        if (newPassword) body.password = newPassword;

        if (Object.keys(body).length <= 3) {
            displayProfileError('Default Error'); 
            return;
        }
        
        const token = localStorage.getItem('jwtToken');
        const headers = new Headers({ 'Content-Type': 'application/json' });
        if (token) headers.set('Authorization', `Bearer ${token}`);

        try {
            const updateResponse = await fetch(`${API_BASE_URL}/user`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(body)
            });

            if (updateResponse.ok) {
                window.location.reload();
            } else {
                const errorData = await updateResponse.json();
                const rawMessage = errorData.message || '';

                const firstError = rawMessage.split('\n')[0];
                const messageParts = firstError.split('Message:');
                const cleanMessage = (messageParts.length > 1 ? messageParts[1].trim() : firstError) as ErrorKeys;

                displayProfileError(cleanMessage);
            }
        } catch (error) {
            displayProfileError('Network Error');
        }
    });
}