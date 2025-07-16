import { fetchWithAuth } from '../api/api';
import { renderView } from '../core/view';
import { initRemoteGame } from '../pong/remote';

async function fetchUsers() {
  const response = await fetchWithAuth('/users');
  if (!response.ok) {
    throw new Error('Falha ao buscar usuários.');
  }
  return response.json();
}

function handleInviteClick(event: Event) {
  const button = event.currentTarget as HTMLButtonElement;
  const opponentUuid = button.dataset.uuid;
  if (opponentUuid) {
    alert(`Convite enviado para o usuário ${opponentUuid}! (Funcionalidade em desenvolvimento)`);
    window.history.pushState({}, '', '/pong/remote-multiplayer');
    initRemoteGame(opponentUuid);
  }
}

export async function showPlayerSelection(): Promise<string> {
  try {
    const users = await fetchUsers();
    const currentUserResponse = await fetchWithAuth('/users/me');
    if (!currentUserResponse.ok) throw new Error('Falha ao buscar dados do usuário atual.');
    const currentUser = await currentUserResponse.json();

    let playerListHtml = '';
    for (const user of users) {
      if (user.Uuid !== currentUser.Uuid) {
        playerListHtml += `
          <div class="bg-slate-800 p-4 rounded-lg flex items-center justify-between">
            <div class="flex items-center">
              <img src="${user.ProfilePic || 'https://placehold.co/64x64/000000/FFFFFF?text=User'}" alt="Foto de Perfil" class="w-16 h-16 rounded-full mr-4">
              <span class="text-white">${user.Username}</span>
            </div>
            <button class="menu-button invite-button" data-uuid="${user.Uuid}">Convidar</button>
          </div>
        `;
      }
    }

    const viewHtml = await renderView('playerSelection', {});
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = viewHtml;

    const playerListContainer = tempDiv.querySelector('#player-list');
    if (playerListContainer) {
      playerListContainer.innerHTML = playerListHtml;
    }

    setTimeout(() => {
      document.querySelectorAll('.invite-button').forEach(button => {
        button.addEventListener('click', handleInviteClick as EventListener);
      });
    }, 0);

    return tempDiv.innerHTML;
  } catch (error: any) {
    console.error("Erro ao carregar a seleção de jogadores:", error);
    return await renderView('error', { message: error.message });
  }
}
