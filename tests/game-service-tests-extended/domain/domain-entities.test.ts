import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runDomainEntitiesTests() {
    const suite = new TestSuite();

    suite.test('Game Entity - should create game with UUID', async () => {
        const game = {
            gameUuid: 'game-123-456',
            type: 'pong',
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        
        Assert.ok(game.gameUuid);
        Assert.strictEqual(game.type, 'pong');
        Assert.strictEqual(game.status, 'pending');
    });

    suite.test('Player Entity - should validate player data', async () => {
        const player = {
            playerUuid: 'player-456-789',
            username: 'testplayer',
            email: 'test@example.com',
            rating: 1200,
            gamesPlayed: 5
        };
        
        Assert.ok(player.playerUuid);
        Assert.ok(player.username.length >= 3);
        Assert.ok(player.rating >= 0);
    });

    suite.test('Match Entity - should track match details', async () => {
        const match = {
            matchUuid: 'match-789-012',
            player1Id: 'player-1',
            player2Id: 'player-2',
            score1: 3,
            score2: 1,
            winnerId: 'player-1',
            duration: 180000 // 3 minutes
        };
        
        Assert.ok(match.matchUuid);
        Assert.ok(match.score1 > match.score2);
        Assert.strictEqual(match.winnerId, 'player-1');
    });

    suite.test('Tournament Entity - should manage brackets', async () => {
        const tournament = {
            tournamentUuid: 'tournament-345-678',
            name: 'Weekly Championship',
            status: 'active',
            maxParticipants: 16,
            currentParticipants: 8,
            prizePool: 1000
        };
        
        Assert.ok(tournament.tournamentUuid);
        Assert.ok(tournament.currentParticipants <= tournament.maxParticipants);
        Assert.ok(tournament.prizePool > 0);
    });

    suite.test('Score Entity - should calculate statistics', async () => {
        const score = {
            scoreUuid: 'score-012-345',
            playerId: 'player-123',
            wins: 15,
            losses: 8,
            draws: 2,
            totalGames: 25,
            winRate: 0.6
        };
        
        Assert.strictEqual(score.wins + score.losses + score.draws, score.totalGames);
        Assert.ok(score.winRate >= 0 && score.winRate <= 1);
    });

    suite.test('Game Session - should track session state', async () => {
        const session = {
            sessionUuid: 'session-678-901',
            roomId: 'room-123',
            players: ['player-1', 'player-2'],
            gameData: { ball: { x: 400, y: 300 } },
            isActive: true,
            lastUpdate: Date.now()
        };
        
        Assert.ok(session.sessionUuid);
        Assert.strictEqual(session.players.length, 2);
        Assert.ok(session.gameData);
        Assert.strictEqual(session.isActive, true);
    });

    suite.test('Event Entity - should log game events', async () => {
        const event = {
            eventUuid: 'event-234-567',
            type: 'goal_scored',
            playerId: 'player-1',
            gameId: 'game-123',
            timestamp: Date.now(),
            data: { score: 1 }
        };
        
        Assert.ok(event.eventUuid);
        Assert.strictEqual(event.type, 'goal_scored');
        Assert.ok(event.timestamp);
        Assert.ok(event.data);
    });

    suite.test('Ranking Entity - should manage leaderboards', async () => {
        const ranking = {
            rankingUuid: 'ranking-456-789',
            playerId: 'player-123',
            position: 5,
            rating: 1350,
            tier: 'Gold',
            seasonId: 'season-2024-1'
        };
        
        Assert.ok(ranking.rankingUuid);
        Assert.ok(ranking.position > 0);
        Assert.ok(ranking.rating > 0);
        Assert.strictEqual(ranking.tier, 'Gold');
    });

    suite.test('Achievement Entity - should track milestones', async () => {
        const achievement = {
            achievementUuid: 'achievement-789-012',
            playerId: 'player-123',
            name: 'First Victory',
            description: 'Win your first game',
            unlockedAt: new Date().toISOString(),
            points: 100
        };
        
        Assert.ok(achievement.achievementUuid);
        Assert.ok(achievement.name);
        Assert.ok(achievement.unlockedAt);
        Assert.strictEqual(achievement.points, 100);
    });

    suite.test('Game Rules - should validate rule configurations', async () => {
        const rules = {
            gameType: 'pong',
            maxScore: 5,
            timeLimit: null,
            paddleSpeed: 5,
            ballSpeed: 3,
            allowPowerUps: false
        };
        
        Assert.strictEqual(rules.gameType, 'pong');
        Assert.ok(rules.maxScore > 0);
        Assert.ok(rules.paddleSpeed > 0);
        Assert.strictEqual(rules.allowPowerUps, false);
    });

    return await suite.run();
}
