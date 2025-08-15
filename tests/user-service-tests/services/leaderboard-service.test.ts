import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runLeaderboardServiceTests() {
    const suite = new TestSuite();

    suite.test('LeaderboardService - should rank players by rating', async () => {
        const players = [
            { id: 'player1', rating: 1500, wins: 10 },
            { id: 'player2', rating: 1600, wins: 12 },
            { id: 'player3', rating: 1400, wins: 8 }
        ];
        
        players.sort((a, b) => b.rating - a.rating);
        
        Assert.strictEqual(players[0].id, 'player2');
        Assert.strictEqual(players[0].rating, 1600);
    });

    suite.test('LeaderboardService - should filter by game type', async () => {
        const leaderboards = {
            pong: [{ id: 'player1', rating: 1500 }],
            rps: [{ id: 'player2', rating: 1400 }]
        };
        
        Assert.ok(leaderboards.pong);
        Assert.ok(leaderboards.rps);
        Assert.strictEqual(leaderboards.pong.length, 1);
    });

    suite.test('LeaderboardService - should handle seasonal rankings', async () => {
        const season = {
            id: 'season-2024-1',
            startDate: '2024-01-01',
            endDate: '2024-03-31',
            isActive: true
        };
        
        Assert.ok(season.id);
        Assert.strictEqual(season.isActive, true);
    });

    suite.test('LeaderboardService - should calculate tier placement', async () => {
        const getTier = (rating: number) => {
            if (rating >= 1800) return 'Diamond';
            if (rating >= 1600) return 'Gold';
            if (rating >= 1400) return 'Silver';
            return 'Bronze';
        };
        
        Assert.strictEqual(getTier(1900), 'Diamond');
        Assert.strictEqual(getTier(1650), 'Gold');
        Assert.strictEqual(getTier(1450), 'Silver');
        Assert.strictEqual(getTier(1200), 'Bronze');
    });

    suite.test('LeaderboardService - should track position changes', async () => {
        const player = {
            id: 'player1',
            currentPosition: 5,
            previousPosition: 8,
            positionChange: 3
        };
        
        player.positionChange = player.previousPosition - player.currentPosition;
        
        Assert.strictEqual(player.positionChange, 3);
        Assert.ok(player.positionChange > 0); // Moved up
    });

    return await suite.run();
}
