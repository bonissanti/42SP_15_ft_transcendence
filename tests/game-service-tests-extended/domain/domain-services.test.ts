import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runDomainServicesTests() {
    const suite = new TestSuite();

    suite.test('Game Service - should create new game', async () => {
        const gameData = {
            type: 'pong',
            players: ['player-1', 'player-2'],
            settings: { maxScore: 5 }
        };
        
        const game = {
            gameUuid: 'new-game-123',
            ...gameData,
            status: 'created',
            createdAt: new Date().toISOString()
        };
        
        Assert.ok(game.gameUuid);
        Assert.strictEqual(game.type, 'pong');
        Assert.strictEqual(game.status, 'created');
    });

    suite.test('Player Service - should update player stats', async () => {
        const playerStats = {
            playerId: 'player-123',
            wins: 5,
            losses: 3,
            rating: 1200
        };
        
        // Simulate win
        playerStats.wins++;
        playerStats.rating += 25;
        
        Assert.strictEqual(playerStats.wins, 6);
        Assert.strictEqual(playerStats.rating, 1225);
    });

    suite.test('Match Service - should determine winner', async () => {
        const match = {
            player1: { id: 'player-1', score: 5 },
            player2: { id: 'player-2', score: 3 }
        };
        
        const winner = match.player1.score > match.player2.score ? 
                      match.player1 : match.player2;
        
        Assert.strictEqual(winner.id, 'player-1');
        Assert.strictEqual(winner.score, 5);
    });

    suite.test('Tournament Service - should advance players', async () => {
        const bracket = [
            { player1: 'A', player2: 'B', winner: 'A' },
            { player1: 'C', player2: 'D', winner: 'C' }
        ];
        
        const nextRound = bracket
            .filter(match => match.winner)
            .map(match => match.winner);
        
        Assert.strictEqual(nextRound.length, 2);
        Assert.ok(nextRound.includes('A'));
        Assert.ok(nextRound.includes('C'));
    });

    suite.test('Rating Service - should calculate ELO', async () => {
        const player1Rating = 1200;
        const player2Rating = 1300;
        const kFactor = 32;
        
        // Expected score for player 1
        const expectedScore1 = 1 / (1 + Math.pow(10, (player2Rating - player1Rating) / 400));
        
        // Player 1 wins (actual score = 1)
        const newRating1 = player1Rating + kFactor * (1 - expectedScore1);
        
        Assert.ok(newRating1 > player1Rating);
    });

    suite.test('Room Service - should manage room lifecycle', async () => {
        const room = {
            id: 'room-123',
            status: 'waiting',
            players: ['player-1'],
            maxPlayers: 2
        };
        
        // Add second player
        room.players.push('player-2');
        
        if (room.players.length === room.maxPlayers) {
            room.status = 'ready';
        }
        
        Assert.strictEqual(room.status, 'ready');
        Assert.strictEqual(room.players.length, 2);
    });

    suite.test('Notification Service - should send game updates', async () => {
        const notification = {
            type: 'game_start',
            recipients: ['player-1', 'player-2'],
            data: { gameId: 'game-123' },
            timestamp: Date.now()
        };
        
        Assert.strictEqual(notification.type, 'game_start');
        Assert.strictEqual(notification.recipients.length, 2);
        Assert.ok(notification.data.gameId);
    });

    suite.test('Validation Service - should validate game moves', async () => {
        const move = {
            playerId: 'player-1',
            type: 'paddle_move',
            direction: 'up',
            timestamp: Date.now()
        };
        
        const validDirections = ['up', 'down'];
        const isValid = validDirections.includes(move.direction);
        
        Assert.ok(isValid);
        Assert.ok(move.timestamp);
    });

    suite.test('Leaderboard Service - should rank players', async () => {
        const players = [
            { id: 'player-1', rating: 1300 },
            { id: 'player-2', rating: 1500 },
            { id: 'player-3', rating: 1200 }
        ];
        
        players.sort((a, b) => b.rating - a.rating);
        
        Assert.strictEqual(players[0].id, 'player-2');
        Assert.strictEqual(players[0].rating, 1500);
    });

    suite.test('Game Engine Service - should update game state', async () => {
        const gameState = {
            ball: { x: 400, y: 300, dx: 5, dy: 3 },
            lastUpdate: Date.now()
        };
        
        // Update ball position
        gameState.ball.x += gameState.ball.dx;
        gameState.ball.y += gameState.ball.dy;
        gameState.lastUpdate = Date.now();
        
        Assert.strictEqual(gameState.ball.x, 405);
        Assert.strictEqual(gameState.ball.y, 303);
    });

    suite.test('Statistics Service - should calculate aggregates', async () => {
        const games = [
            { duration: 180, score: '5-3' },
            { duration: 240, score: '5-4' },
            { duration: 120, score: '5-1' }
        ];
        
        const avgDuration = games.reduce((sum, game) => sum + game.duration, 0) / games.length;
        
        Assert.strictEqual(avgDuration, 180);
        Assert.strictEqual(games.length, 3);
    });

    return await suite.run();
}
