import { fetchWithAuth } from '../api/api';
import { logout } from '../auth/auth';
import { renderView } from '../core/view';
import { getCurrentLanguage, t } from '../i18n';
import { initFriendsManagement } from './profile/friends';
import { loadMatchHistory } from './profile/matchHistory';
import { initEditProfile } from './profile/editProfile';
import { initDeleteAccount } from './profile/deleteAccount';
import { init2FA } from './profile/twoFactorAuth';

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
        user.statusText = user.isOnline ? t().online : t().offline;
        user.statusColor = user.isOnline ? 'text-green-500' : 'text-red-500';

        user.twoFactorEnabledStatus = user.twoFactorEnabled ? t().enabled : t().disabled;

        if (user.lastLogin) {
            const lang = getCurrentLanguage();
            const date = new Date(user.lastLogin);
            user.formattedLastLogin = date.toLocaleString(lang, {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });
        } else {
            user.formattedLastLogin = t().never;
        }

        const viewHtml = await renderView('profile', { 
            user,
            email: t().email,
            status: t().status,
            matchesPlayed: t().matchesPlayed,
            wins: t().wins,
            loses: t().loses,
            lastLogin: t().lastLogin,
            editProfile: t().editProfile,
            manageFriends: t().manageFriends,
            manage2FA: t().manage2FA,
            backToMenu: t().backToMenu,
            logout: t().logout,
            deleteAccount: t().deleteAccount,
            manage2FATitle: t().manage2FATitle,
            scanQRCode: t().scanQRCode,
            enterAuthCode: t().enterAuthCode,
            authCode: t().authCode,
            enable: t().enable,
            toDisable2FA: t().toDisable2FA,
            disable2FA: t().disable2FA,
            cancel: t().cancel,
            manageFriendsTitle: t().manageFriendsTitle,
            friends: t().friends,
            addFriends: t().addFriends,
            requests: t().requests,
            close: t().close,
            confirmDeletion: t().confirmDeletion,
            confirmDeleteFriend: t().confirmDeleteFriend,
            confirm: t().confirm,
            editProfileTitle: t().editProfileTitle,
            newUsername: t().newUsername,
            newPassword: t().newPassword,
            saveChanges: t().saveChanges,
            confirmDeleteAccount: t().confirmDeleteAccount,
            profilePictureAlt: t().profilePictureAlt,
            qrCodeAlt: t().qrCodeAlt
        });

        setTimeout(async () => {
            document.getElementById('logout-button')?.addEventListener('click', logout);

            initEditProfile(user, tempEmail);
            initDeleteAccount(user.Uuid);
            initFriendsManagement(user.Uuid);
            init2FA(user);
            await loadMatchHistory(user.Uuid);
        }, 0);

        return viewHtml;
    } catch (error: any) {
        return await renderView('error', { message: error.message });
    }
}