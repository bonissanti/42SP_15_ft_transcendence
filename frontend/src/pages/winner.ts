import { renderView } from '../core/view';

export async function showWinner(): Promise<string> {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username') || 'Jogador';
    const profilePic = params.get('profilePic') || 'https://placehold.co/128x128/000000/FFFFFF?text=User';

    const viewData = {
        winnerUsername: username,
        winnerProfilePic: profilePic
    };

    const viewHtml = await renderView('winner', viewData);
    return viewHtml;
}