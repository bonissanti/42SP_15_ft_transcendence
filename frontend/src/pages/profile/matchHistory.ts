import { fetchWithGame } from '../../api/api';

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


export async function loadMatchHistory(username: string) {
    try {
        const historyResponse = await fetchWithGame(`/history?username=${username}`);
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
}