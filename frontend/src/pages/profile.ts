import { fetchWithAuth } from '../api/api';
import { logout } from '../auth/auth';
import { renderView } from '../core/view';

export async function showProfile(): Promise<string> {
    try {
        const response = await fetchWithAuth('/users/me');

        if (!response.ok) {
            throw new Error('Falha ao buscar dados do usuário.');
        }

        const user = await response.json();
        user.ProfilePic = user.ProfilePic || 'https://placehold.co/128x128/000000/FFFFFF?text=User';

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