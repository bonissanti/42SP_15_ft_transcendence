import { fetchWithAuth } from '../../api/api';
import { logout } from '../../auth/auth';
import { t } from '../../i18n';

export function initDeleteAccount(userUuid: string) {
    const deleteAccountButton = document.getElementById('delete-account-button');
    const deleteAccountModal = document.getElementById('delete-account-modal');
    const cancelDeleteButton = document.getElementById('cancel-delete-button');
    const confirmDeleteButton = document.getElementById('confirm-delete-button');

    deleteAccountButton?.addEventListener('click', () => {
        deleteAccountModal?.classList.remove('hidden');
    });

    cancelDeleteButton?.addEventListener('click', () => {
        deleteAccountModal?.classList.add('hidden');
    });

    confirmDeleteButton?.addEventListener('click', async () => {
        try {
            const response = await fetchWithAuth('/user', {
                method: 'DELETE',
                body: JSON.stringify({ Uuid: userUuid }),
            });

            if (response.ok) {
                logout();
            } else {
                alert(t().errorDeletingAccount);
            }
        } catch (error) {
            console.error('Falha ao deletar a conta:', error);
            alert(t().errorDeletingAccount);
        } finally {
            deleteAccountModal?.classList.add('hidden');
        }
    });
}