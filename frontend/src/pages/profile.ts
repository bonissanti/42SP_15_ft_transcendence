import { fetchWithAuth } from '../api/api';
import { logout } from '../auth/auth';
import { renderView } from '../core/view';
import { getCurrentLanguage } from '../i18n';
import { initFriendsManagement } from './profile/friends';
import { loadMatchHistory } from './profile/matchHistory';
import { initEditProfile } from './profile/editProfile';
import { initDeleteAccount } from './profile/deleteAccount';

export async function showProfile(): Promise<string> {
    try {
        const response = await fetchWithAuth('/users/me');
        const user = await response.json();
        const tempEmail = user.Email;

        if (!tempEmail.includes('@')) {
            user.Email = '00110100 00110010';
        }
        if (user.ProfilePic && user.ProfilePic.startsWith('/app')) {
            user.ProfilePic = user.ProfilePic.replace('/app', '');
        }
        user.ProfilePic = user.ProfilePic || '/img/cachorrao_user.png';
        user.statusText = user.isOnline ? 'Online' : 'Offline';
        user.statusColor = user.isOnline ? 'text-green-500' : 'text-red-500';

        if (user.lastLogin) {
            const lang = getCurrentLanguage();
            const date = new Date(user.lastLogin);
            user.formattedLastLogin = date.toLocaleString(lang, {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });
        } else {
            user.formattedLastLogin = 'Nunca';
        }

        const viewHtml = await renderView('profile', { user });

        setTimeout(async () => {
            document.getElementById('logout-button')?.addEventListener('click', logout);

            // Inicializa os módulos refatorados
            initEditProfile(user, tempEmail);
            initDeleteAccount(user.Uuid);
            initFriendsManagement(user.Uuid);
            await loadMatchHistory(user.Username);
        }, 0);

        return viewHtml;
    } catch (error: any) {
        return await renderView('error', { message: error.message });
    }
}