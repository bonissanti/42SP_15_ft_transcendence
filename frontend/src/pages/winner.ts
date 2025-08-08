import { renderView } from '../core/view';
import { t } from '../i18n';

export async function showWinner(): Promise<string> {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username') || t().defaultPlayer;
    const profilePic = params.get('profilePic') || 'https://placehold.co/128x128/000000/FFFFFF?text=User';

    const viewData = {
        winnerUsername: username,
        winnerProfilePic: profilePic,
        congratulations: t().congratulations,
        youWon: t().youWon,
        backToMenu: t().backToMenu,
        winnerProfilePictureAlt: t().winnerProfilePictureAlt,
        congratulationsGifAlt: t().congratulationsGifAlt
    };

    const viewHtml = await renderView('winner', viewData);
    return viewHtml;
}