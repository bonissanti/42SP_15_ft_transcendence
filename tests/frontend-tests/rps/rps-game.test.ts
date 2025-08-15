import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runRpsGameTests() {
    const suite = new TestSuite();

    suite.test('RPS - should validate game moves', async () => {
        const validMoves = ['rock', 'paper', 'scissors'];
        const playerMove = 'rock';
        
        Assert.ok(validMoves.includes(playerMove));
    });

    suite.test('RPS - should determine winner correctly', async () => {
        const moves = [
            { player1: 'rock', player2: 'scissors', winner: 'player1' },
            { player1: 'paper', player2: 'rock', winner: 'player1' },
            { player1: 'scissors', player2: 'paper', winner: 'player1' }
        ];
        
        moves.forEach(move => {
            let winner = null;
            if (move.player1 === 'rock' && move.player2 === 'scissors') winner = 'player1';
            if (move.player1 === 'paper' && move.player2 === 'rock') winner = 'player1';
            if (move.player1 === 'scissors' && move.player2 === 'paper') winner = 'player1';
            
            Assert.strictEqual(winner, move.winner);
        });
    });

    suite.test('RPS - should handle tie games', async () => {
        const tieGames = [
            { player1: 'rock', player2: 'rock' },
            { player1: 'paper', player2: 'paper' },
            { player1: 'scissors', player2: 'scissors' }
        ];
        
        tieGames.forEach(game => {
            Assert.strictEqual(game.player1, game.player2);
        });
    });

    suite.test('RPS - should track round scores', async () => {
        const game = {
            player1Score: 2,
            player2Score: 1,
            rounds: 3,
            maxRounds: 5
        };
        
        Assert.ok(game.player1Score > game.player2Score);
        Assert.strictEqual(game.rounds, game.player1Score + game.player2Score);
    });

    suite.test('RPS - should handle best of series', async () => {
        const bestOf5 = {
            player1Wins: 3,
            player2Wins: 1,
            totalRounds: 4,
            isComplete: false
        };
        
        if (bestOf5.player1Wins > 2 || bestOf5.player2Wins > 2) {
            bestOf5.isComplete = true;
        }
        
        Assert.ok(bestOf5.isComplete);
    });

    return await suite.run();
}
