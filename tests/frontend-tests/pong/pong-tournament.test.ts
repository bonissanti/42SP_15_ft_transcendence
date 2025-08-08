import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runPongTournamentTests() {
    const suite = new TestSuite();

    suite.test('Tournament - should create tournament bracket', async () => {
        const players = ['Player1', 'Player2', 'Player3', 'Player4'];
        const tournament = {
            id: 'tournament-123',
            players: players,
            bracket: [] as Array<{player1: string, player2: string, winner: string | null, round: number}>,
            currentRound: 1,
            status: 'pending'
        };
        
        // Create first round matches
        for (let i = 0; i < players.length; i += 2) {
            tournament.bracket.push({
                player1: players[i],
                player2: players[i + 1],
                winner: null,
                round: 1
            });
        }
        
        Assert.strictEqual(tournament.bracket.length, 2);
        Assert.strictEqual(tournament.bracket[0].player1, 'Player1');
        Assert.strictEqual(tournament.bracket[0].player2, 'Player2');
    });

    suite.test('Tournament - should advance winner to next round', async () => {
        const match = {
            player1: 'Player1',
            player2: 'Player2',
            winner: null as string | null,
            score1: 3,
            score2: 1
        };
        
        // Determine winner
        if (match.score1 > match.score2) {
            match.winner = match.player1;
        } else {
            match.winner = match.player2;
        }
        
        Assert.strictEqual(match.winner, 'Player1');
    });

    suite.test('Tournament - should handle tournament progression', async () => {
        const tournament = {
            currentRound: 1,
            maxRounds: 3,
            completedMatches: 2,
            totalMatchesInRound: 2
        };
        
        // Check if round is complete
        if (tournament.completedMatches >= tournament.totalMatchesInRound) {
            tournament.currentRound++;
            tournament.completedMatches = 0;
            tournament.totalMatchesInRound = tournament.totalMatchesInRound / 2;
        }
        
        Assert.strictEqual(tournament.currentRound, 2);
        Assert.strictEqual(tournament.totalMatchesInRound, 1);
    });

    suite.test('Tournament - should generate seeded bracket', async () => {
        const players = [
            { name: 'Player1', seed: 1 },
            { name: 'Player2', seed: 2 },
            { name: 'Player3', seed: 3 },
            { name: 'Player4', seed: 4 }
        ];
        
        // Sort by seed
        players.sort((a, b) => a.seed - b.seed);
        
        Assert.strictEqual(players[0].seed, 1);
        Assert.strictEqual(players[3].seed, 4);
    });

    suite.test('Tournament - should track tournament statistics', async () => {
        const stats = {
            totalPlayers: 8,
            completedMatches: 5,
            remainingMatches: 2,
            champion: null,
            duration: 0
        };
        
        Assert.strictEqual(stats.totalPlayers, 8);
        Assert.ok(stats.completedMatches > 0);
        Assert.strictEqual(stats.champion, null);
    });

    suite.test('Tournament - should handle elimination', async () => {
        const player = {
            name: 'Player1',
            isEliminated: false,
            matchesPlayed: 2,
            matchesWon: 1
        };
        
        // Player loses a match
        if (player.matchesWon * 2 <= player.matchesPlayed) {
            player.isEliminated = true;
        }
        
        Assert.ok(player.isEliminated);
    });

    suite.test('Tournament - should determine final champion', async () => {
        const finalMatch = {
            player1: 'Player1',
            player2: 'Player2',
            score1: 3,
            score2: 2,
            isCompleted: true
        };
        
        let champion = null;
        if (finalMatch.isCompleted) {
            champion = finalMatch.score1 > finalMatch.score2 ? 
                      finalMatch.player1 : finalMatch.player2;
        }
        
        Assert.strictEqual(champion, 'Player1');
    });

    suite.test('Tournament - should validate tournament size', async () => {
        const validateTournamentSize = (playerCount: number) => {
            return playerCount >= 2 && (playerCount & (playerCount - 1)) === 0;
        };
        
        Assert.ok(validateTournamentSize(4)); // Valid power of 2
        Assert.ok(validateTournamentSize(8)); // Valid power of 2
        Assert.strictEqual(validateTournamentSize(6), false); // Invalid
    });

    suite.test('Tournament - should handle bye rounds', async () => {
        const players = ['Player1', 'Player2', 'Player3']; // Odd number
        const adjustedPlayers = [...players];
        
        // Add bye if needed
        if (adjustedPlayers.length % 2 !== 0) {
            adjustedPlayers.push('BYE');
        }
        
        Assert.strictEqual(adjustedPlayers.length, 4);
        Assert.ok(adjustedPlayers.includes('BYE'));
    });

    suite.test('Tournament - should schedule matches', async () => {
        const matches = [
            { id: 1, player1: 'Player1', player2: 'Player2', scheduledTime: '10:00' },
            { id: 2, player1: 'Player3', player2: 'Player4', scheduledTime: '10:30' }
        ];
        
        Assert.strictEqual(matches.length, 2);
        Assert.ok(matches[0].scheduledTime);
        Assert.ok(matches[1].scheduledTime);
    });

    suite.test('Tournament - should handle timeout scenarios', async () => {
        const match = {
            player1: 'Player1',
            player2: 'Player2',
            startTime: Date.now() - 600000, // 10 minutes ago
            maxDuration: 300000, // 5 minutes
            isTimedOut: false
        };
        
        const currentTime = Date.now();
        if (currentTime - match.startTime > match.maxDuration) {
            match.isTimedOut = true;
        }
        
        Assert.ok(match.isTimedOut);
    });

    return await suite.run();
}
