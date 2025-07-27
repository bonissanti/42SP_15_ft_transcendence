import { fetchWithAuth } from '../api/api';
import { logout } from '../auth/auth';
import { renderView } from '../core/view';
import { getCurrentLanguage } from '../i18n';

export async function showProfile(): Promise<string> {
  try {
    const response = await fetchWithAuth('/users/me');
    const user = await response.json();

    user.ProfilePic = user.ProfilePic || 'https://placehold.co/128x128/000000/FFFFFF?text=User';
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

    setTimeout(() => {
      document.getElementById('logout-button')?.addEventListener('click', logout);
    }, 0);

    return viewHtml;
  } catch (error: any) {
    console.error("Erro detalhado ao carregar perfil:", error);
    return await renderView('error', { message: error.message });
  }
}