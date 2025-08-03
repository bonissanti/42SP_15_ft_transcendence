import { fetchWithAuth, fetchWithGame } from '../api/api';
import { logout } from '../auth/auth';
import { renderView } from '../core/view';
import { getCurrentLanguage, t, ErrorKeys } from '../i18n';
import { API_BASE_URL } from '../utils/constants';

function displayProfileError(errorKey: ErrorKeys) {
  const errorElement = document.getElementById('profile-error-message');
  console.log("Displaying profile error:", errorKey);
  if (errorElement) {
    errorElement.textContent = t().errors[errorKey] || t().errors['Default Error'];
  }
}

function renderMatchHistory(history: any[]): string {
  if (!history || history.length === 0) {
    return `<p class="text-center text-xl mt-4">🕹️ Você ainda não tem partidas jogadas.</p>`;
  }

  return history.reverse().map(match => {
    const isTournament = match.gameType === 'TOURNAMENT';
    let playersHtml = '';

    if (isTournament) {
      const players = [
        { name: match.player1Username, alias: match.player1Alias, points: match.player1Points },
        { name: match.player2Username, alias: match.player2Alias, points: match.player2Points },
        { name: match.player3Username, alias: match.player3Alias, points: match.player3Points },
        { name: match.player4Username, alias: match.player4Alias, points: match.player4Points },
      ].filter(p => p.name).sort((a, b) => a.points - b.points);

      const medals = ['🏆', '🥈', '🥉'];

      playersHtml = players.map((p, index) => {
          const medal = index < 3 ? `${medals[index]} ` : '';
          const position = index + 1;
          return `<div class="text-lg">${medal}${position}º lugar: ${p.name} (${p.alias})</div>`;
      }).join('');

      return `
        <div class="bg-slate-800 p-4 rounded-lg mb-4 shadow-retro">
          <h3 class="text-2xl text-indigo-400 font-bold mb-2">🏆 Torneio: ${match.tournamentName}</h3>
          ${playersHtml}
        </div>
      `;
    } else {
      const players = [
        { name: match.player1Username, points: match.player1Points },
        { name: match.player2Username, points: match.player2Points },
      ].filter(p => p.name);

      playersHtml = players.map(p => `<div class="text-lg">${p.name}: ${p.points} pts</div>`).join('');

      return `
        <div class="bg-slate-800 p-4 rounded-lg mb-4 shadow-retro">
          <h3 class="text-xl text-indigo-400 font-bold mb-2">🎮 Modo: ${match.tournamentName}</h3>
          ${playersHtml}
        </div>
      `;
    }
  }).join('');
}

async function showFriends(friendsContent: HTMLElement, currentUserUuid: string) {
    friendsContent.innerHTML = '<p>Carregando amigos...</p>';
    try {
        const response = await fetchWithAuth(`/friendsList?userUuid=${currentUserUuid}&status=ACCEPTED`);
        if (!response.ok) throw new Error('Failed to fetch friends');
        const friends = await response.json();

        if (friends.length === 0) {
            friendsContent.innerHTML = '<p>Você ainda não tem amigos.</p>';
            return;
        }

        friendsContent.innerHTML = friends.map((friend: any) => `
            <div class="flex justify-between items-center bg-slate-700 p-2 rounded mb-2">
                <span>${friend.friendUsername} - <span class="${friend.isOnline ? 'text-green-500' : 'text-red-500'}">${friend.isOnline ? 'Online' : 'Offline'}</span></span>
                <button class="delete-friend-button bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" data-friendship-uuid="${friend.uuid}">Deletar</button>
            </div>
        `).join('');

        document.querySelectorAll('.delete-friend-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const friendshipUuid = (e.target as HTMLElement).dataset.friendshipUuid;
                const deleteModal = document.getElementById('delete-friend-confirmation-modal')!;
                deleteModal.classList.remove('hidden');

                const confirmDeleteBtn = document.getElementById('confirm-delete-friend')!;
                const cancelDeleteBtn = document.getElementById('cancel-delete-friend')!;

                const confirmHandler = async () => {
                    await fetchWithAuth('/deleteFriend', {
                        method: 'DELETE',
                        body: JSON.stringify({ friendshipUuid }),
                    });
                    deleteModal.classList.add('hidden');
                    showFriends(friendsContent, currentUserUuid);
                };

                confirmDeleteBtn.onclick = confirmHandler;
                cancelDeleteBtn.onclick = () => deleteModal.classList.add('hidden');
            });
        });

    } catch (error) {
        console.error("Erro em showFriends:", error);
        friendsContent.innerHTML = '<p>Erro ao carregar amigos.</p>';
    }
}

async function showAllUsers(friendsContent: HTMLElement, currentUserUuid: string) {
    friendsContent.innerHTML = '<p>Carregando usuários...</p>';
    try {
        const [allUsersResponse, friendshipsResponse] = await Promise.all([
            fetchWithAuth('/users'),
            fetchWithAuth(`/friendsList?userUuid=${currentUserUuid}`)
        ]);

        if (!allUsersResponse.ok) throw new Error('Failed to fetch users');
        if (!friendshipsResponse.ok) throw new Error('Failed to fetch friendships');

        const allUsers = await allUsersResponse.json();
        const friendships = await friendshipsResponse.json();

        const relatedUserUuids = new Set(friendships.map((f: any) => f.friendUuid));
        relatedUserUuids.add(currentUserUuid);

        const availableUsers = allUsers.filter((user: any) => !relatedUserUuids.has(user.Uuid));
        
        const pendingRequests = friendships.filter((f: any) => f.status === 'PENDING' && f.senderUuid === currentUserUuid);

        let content = '<h3>Solicitações Enviadas</h3>';
        if (pendingRequests.length > 0) {
            content += pendingRequests.map((req: any) => `
                <div class="flex justify-between items-center bg-slate-700 p-2 rounded mb-2">
                    <span>${req.friendUsername} (Pendente)</span>
                </div>
            `).join('');
        } else {
            content += '<p>Nenhuma solicitação enviada.</p>';
        }

        content += '<h3 class="mt-4">Outros Usuários</h3>';
        if (availableUsers.length > 0) {
            content += availableUsers.map((user: any) => `
                <div class="flex justify-between items-center bg-slate-700 p-2 rounded mb-2">
                    <span>${user.Username} - <span class="${user.isOnline ? 'text-green-500' : 'text-red-500'}">${user.isOnline ? 'Online' : 'Offline'}</span></span>
                    <button class="add-friend-button bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded" data-receiver-uuid="${user.Uuid}">Adicionar</button>
                </div>
            `).join('');
        } else {
            content += '<p>Nenhum usuário novo para adicionar.</p>';
        }


        friendsContent.innerHTML = content;

        document.querySelectorAll('.add-friend-button').forEach(button => {
            button.addEventListener('click', async (e) => {
                const target = e.target as HTMLButtonElement;
                const receiverUuid = target.dataset.receiverUuid;
                await fetchWithAuth('/addFriend', {
                    method: 'POST',
                    body: JSON.stringify({ senderUuid: currentUserUuid, receiverUuid }),
                });
                target.textContent = 'Enviado';
                target.disabled = true;
            });
        });

    } catch (error) {
        console.error("Erro em showAllUsers:", error);
        friendsContent.innerHTML = '<p>Erro ao carregar usuários.</p>';
    }
}


async function showPendingRequests(friendsContent: HTMLElement, currentUserUuid: string) {
    friendsContent.innerHTML = '<p>Carregando solicitações...</p>';
    try {
        const response = await fetchWithAuth(`/friendsList?userUuid=${currentUserUuid}&status=PENDING`);
        if (!response.ok) throw new Error('Failed to fetch requests');
        
        const requests = (await response.json()).filter((req: any) => req.receiverUuid === currentUserUuid);

        if (requests.length === 0) {
            friendsContent.innerHTML = '<p>Nenhuma solicitação de amizade recebida.</p>';
            return;
        }

        friendsContent.innerHTML = requests.map((req: any) => `
            <div class="flex justify-between items-center bg-slate-700 p-2 rounded mb-2">
                <span>${req.friendUsername} - <span class="${req.isOnline ? 'text-green-500' : 'text-red-500'}">${req.isOnline ? 'Online' : 'Offline'}</span></span> 
                <div>
                    <button class="accept-request-button bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2" data-friendship-uuid="${req.uuid}">Aceitar</button>
                    <button class="reject-request-button bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" data-friendship-uuid="${req.uuid}">Rejeitar</button>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.accept-request-button, .reject-request-button').forEach(button => {
            button.addEventListener('click', async (e) => {
                const target = e.target as HTMLElement;
                const friendshipUuid = target.dataset.friendshipUuid;
                const status = target.classList.contains('accept-request-button') ? 'ACCEPTED' : 'REJECTED';
                
                await fetchWithAuth('/changeRequestStatus', {
                    method: 'PUT',
                    body: JSON.stringify({ friendshipUuid, status }),
                });
                showPendingRequests(friendsContent, currentUserUuid); 
            });
        });

    } catch (error) {
        console.error("Erro em showPendingRequests:", error);
        friendsContent.innerHTML = '<p>Erro ao carregar solicitações.</p>';
    }
}

export async function showProfile(): Promise<string> {
  try {
    const response = await fetchWithAuth('/users/me');
    const user = await response.json();
    const tempEmail = user.Email;

    if (!tempEmail.includes('@')) {
      user.Email = '00110100 00110010';
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

      const editProfileButton = document.getElementById('edit-profile-button');
      const editProfileModal = document.getElementById('edit-profile-modal');
      const editProfileForm = document.getElementById('edit-profile-form');
      const cancelEditButton = document.getElementById('cancel-edit-button');
      const usernameInput = document.getElementById('edit-username') as HTMLInputElement;
      const errorElement = document.getElementById('profile-error-message');
      
      editProfileButton?.addEventListener('click', () => {
        if (usernameInput) {
            usernameInput.value = user.Username;
        }
        if (errorElement) {
            errorElement.textContent = '';
        }
        editProfileModal?.classList.remove('hidden');
      });

      cancelEditButton?.addEventListener('click', () => {
        editProfileModal?.classList.add('hidden');
      });

      editProfileForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (errorElement) {
            errorElement.textContent = '';
        }

        const newUsername = (document.getElementById('edit-username') as HTMLInputElement).value;
        const newPassword = (document.getElementById('edit-password') as HTMLInputElement).value;

        const body: { [key: string]: any } = {
            uuid: user.Uuid,
            email: tempEmail,
            profilePic: user.ProfilePic,
        };

        if (newUsername && newUsername !== user.Username) {
            body.username = newUsername;
        }

        if (newPassword) {
            body.password = newPassword;
        }

        if (Object.keys(body).length <= 3) {
            displayProfileError('Default Error'); 
            return;
        }
        
        const token = localStorage.getItem('jwtToken');
        const headers = new Headers({
            'Content-Type': 'application/json',
        });
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

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
            body: JSON.stringify({ Uuid: user.Uuid }),
          });

          if (response.ok) {
            logout();
          } else {
            alert('Erro ao deletar a conta.');
          }
        } catch (error) {
          console.error('Falha ao deletar a conta:', error);
          alert('Erro ao deletar a conta.');
        } finally {
          deleteAccountModal?.classList.add('hidden');
        }
      });

      const manageFriendsButton = document.getElementById('manage-friends-button');
      const friendsModal = document.getElementById('friends-modal');
      const closeFriendsModal = document.getElementById('close-friends-modal');
      const friendsContent = document.getElementById('friends-content')!;
      
      const acceptedTab = document.getElementById('friends-tab-accepted')!;
      const allTab = document.getElementById('friends-tab-all')!;
      const requestsTab = document.getElementById('friends-tab-requests')!;

      manageFriendsButton?.addEventListener('click', () => {
        friendsModal?.classList.remove('hidden');
        acceptedTab.click();
      });

      closeFriendsModal?.addEventListener('click', () => {
        friendsModal?.classList.add('hidden');
      });

      acceptedTab.addEventListener('click', () => {
        document.querySelectorAll('.friends-tab').forEach(t => t.classList.remove('active'));
        acceptedTab.classList.add('active');
        showFriends(friendsContent, user.Uuid);
      });

      allTab.addEventListener('click', () => {
        document.querySelectorAll('.friends-tab').forEach(t => t.classList.remove('active'));
        allTab.classList.add('active');
        showAllUsers(friendsContent, user.Uuid);
      });

      requestsTab.addEventListener('click', () => {
        document.querySelectorAll('.friends-tab').forEach(t => t.classList.remove('active'));
        requestsTab.classList.add('active');
        showPendingRequests(friendsContent, user.Uuid);
      });


      try {
        const historyResponse = await fetchWithGame(`/history?username=${user.Username}`);
        const history = await historyResponse.json();
        const historyContainer = document.getElementById('match-history-container');
        if (historyContainer) {
          historyContainer.innerHTML = renderMatchHistory(history);
        }
      } catch (error) {
        console.error('Failed to load match history:', error);
        const historyContainer = document.getElementById('match-history-container');
        if (historyContainer) {
          historyContainer.innerHTML = `<p class="text-center text-red-500">Erro ao carregar o histórico de partidas.</p>`;
        }
      }

    }, 0);

    return viewHtml;
  } catch (error: any) {
    return await renderView('error', { message: error.message });
  }
}