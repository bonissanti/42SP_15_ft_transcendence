import { fetchWithAuth } from '../../api/api';
import { t } from '../../i18n';

async function showFriends(friendsContent: HTMLElement, currentUserUuid: string) {
    friendsContent.innerHTML = `<p>${t().loadingFriends}</p>`;
    try {
        const response = await fetchWithAuth(`/friendsList?userUuid=${currentUserUuid}&status=ACCEPTED`);
        if (!response.ok) throw new Error('Failed to fetch friends');
        const friends = await response.json();

        if (friends.length === 0) {
            friendsContent.innerHTML = `<p>${t().noFriends}</p>`;
            return;
        }

        friendsContent.innerHTML = friends.map((friend: any) => `
            <div class="flex justify-between items-center bg-slate-700 p-2 rounded mb-2">
                <span>${friend.friendUsername} - <span class="${friend.isOnline ? 'text-green-500' : 'text-red-500'}">${friend.isOnline ? t().online : t().offline}</span></span>
                <button class="delete-friend-button bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" data-friendship-uuid="${friend.uuid}">${t().delete}</button>
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
        friendsContent.innerHTML = `<p>${t().errorLoadingFriends}</p>`;
    }
}

async function showAllUsers(friendsContent: HTMLElement, currentUserUuid: string) {
    friendsContent.innerHTML = `<p>${t().loadingUsers}</p>`;
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

        let content = `<h3>${t().sentRequests}</h3>`;
        if (pendingRequests.length > 0) {
            content += pendingRequests.map((req: any) => `
                <div class="flex justify-between items-center bg-slate-700 p-2 rounded mb-2">
                    <span>${req.friendUsername} (${t().pending})</span>
                </div>
            `).join('');
        } else {
            content += `<p>${t().noSentRequests}</p>`;
        }

        content += `<h3 class="mt-4">${t().otherUsers}</h3>`;
        if (availableUsers.length > 0) {
            content += availableUsers.map((user: any) => `
                <div class="flex justify-between items-center bg-slate-700 p-2 rounded mb-2">
                    <span>${user.Username} - <span class="${user.isOnline ? 'text-green-500' : 'text-red-500'}">${user.isOnline ? t().online : t().offline}</span></span>
                    <button class="add-friend-button bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded" data-receiver-uuid="${user.Uuid}">${t().add}</button>
                </div>
            `).join('');
        } else {
            content += `<p>${t().noNewUsers}</p>`;
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
                target.textContent = t().sent;
                target.disabled = true;
            });
        });

    } catch (error) {
        console.error("Erro em showAllUsers:", error);
        friendsContent.innerHTML = `<p>${t().errorLoadingUsers}</p>`;
    }
}

async function showPendingRequests(friendsContent: HTMLElement, currentUserUuid: string) {
    friendsContent.innerHTML = `<p>${t().loadingRequests}</p>`;
    try {
        const response = await fetchWithAuth(`/friendsList?userUuid=${currentUserUuid}&status=PENDING`);
        if (!response.ok) throw new Error('Failed to fetch requests');
        
        const requests = (await response.json()).filter((req: any) => req.receiverUuid === currentUserUuid);

        if (requests.length === 0) {
            friendsContent.innerHTML = `<p>${t().noRequests}</p>`;
            return;
        }

        friendsContent.innerHTML = requests.map((req: any) => `
            <div class="flex justify-between items-center bg-slate-700 p-2 rounded mb-2">
                <span>${req.friendUsername} - <span class="${req.isOnline ? 'text-green-500' : 'text-red-500'}">${req.isOnline ? t().online : t().offline}</span></span> 
                <div>
                    <button class="accept-request-button bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2" data-friendship-uuid="${req.uuid}">${t().accept}</button>
                    <button class="reject-request-button bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" data-friendship-uuid="${req.uuid}">${t().reject}</button>
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
        friendsContent.innerHTML = `<p>${t().errorLoadingRequests}</p>`;
    }
}

export function initFriendsManagement(currentUserUuid: string) {
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
        showFriends(friendsContent, currentUserUuid);
    });

    allTab.addEventListener('click', () => {
        document.querySelectorAll('.friends-tab').forEach(t => t.classList.remove('active'));
        allTab.classList.add('active');
        showAllUsers(friendsContent, currentUserUuid);
    });

    requestsTab.addEventListener('click', () => {
        document.querySelectorAll('.friends-tab').forEach(t => t.classList.remove('active'));
        requestsTab.classList.add('active');
        showPendingRequests(friendsContent, currentUserUuid);
    });
}