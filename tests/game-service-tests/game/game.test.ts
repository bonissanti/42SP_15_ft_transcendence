import { TestSuite, Assert, TestHelper } from '../test-helper.js';

// Mock das constantes do game
const GAME_CONFIG = {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 400,
    PADDLE_HEIGHT: 100,
    PADDLE_WIDTH: 10,
    BALL_SIZE: 10,
    BALL_SPEED: 5,
    PADDLE_SPEED: 7,
    WINNING_SCORE: 11
};

// Mock dos tipos do game
interface Ball {
    x: number;
    y: number;
    dx: number;
    dy: number;
    size: number;
}

interface Paddle {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
}

interface GameState {
    ball: Ball;
    leftPaddle: Paddle;
    rightPaddle: Paddle;
    leftScore: number;
    rightScore: number;
    isGameRunning: boolean;
    winner?: 'left' | 'right';
}

// Mock da classe Game
class PongGame {
    private gameState: GameState;

    constructor() {
        this.gameState = this.initializeGame();
    }

    private initializeGame(): GameState {
        return {
            ball: {
                x: GAME_CONFIG.CANVAS_WIDTH / 2,
                y: GAME_CONFIG.CANVAS_HEIGHT / 2,
                dx: GAME_CONFIG.BALL_SPEED,
                dy: GAME_CONFIG.BALL_SPEED,
                size: GAME_CONFIG.BALL_SIZE
            },
            leftPaddle: {
                x: 10,
                y: GAME_CONFIG.CANVAS_HEIGHT / 2 - GAME_CONFIG.PADDLE_HEIGHT / 2,
                width: GAME_CONFIG.PADDLE_WIDTH,
                height: GAME_CONFIG.PADDLE_HEIGHT,
                speed: GAME_CONFIG.PADDLE_SPEED
            },
            rightPaddle: {
                x: GAME_CONFIG.CANVAS_WIDTH - 20,
                y: GAME_CONFIG.CANVAS_HEIGHT / 2 - GAME_CONFIG.PADDLE_HEIGHT / 2,
                width: GAME_CONFIG.PADDLE_WIDTH,
                height: GAME_CONFIG.PADDLE_HEIGHT,
                speed: GAME_CONFIG.PADDLE_SPEED
            },
            leftScore: 0,
            rightScore: 0,
            isGameRunning: true
        };
    }

    public getGameState(): GameState {
        return this.gameState; // Return direct reference for testing
    }

    public movePaddle(player: 'left' | 'right', direction: 'up' | 'down'): void {
        if (!this.gameState.isGameRunning) return;

        const paddle = player === 'left' ? this.gameState.leftPaddle : this.gameState.rightPaddle;
        const moveAmount = direction === 'up' ? -paddle.speed : paddle.speed;
        
        paddle.y = Math.max(0, Math.min(GAME_CONFIG.CANVAS_HEIGHT - paddle.height, paddle.y + moveAmount));
    }

    public updateBall(): void {
        if (!this.gameState.isGameRunning) return;

        const ball = this.gameState.ball;
        
        // Move ball
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Top and bottom wall collision
        if (ball.y <= 0 || ball.y >= GAME_CONFIG.CANVAS_HEIGHT - ball.size) {
            ball.dy = -ball.dy;
        }

        // Paddle collision
        if (this.checkPaddleCollision(ball, this.gameState.leftPaddle) ||
            this.checkPaddleCollision(ball, this.gameState.rightPaddle)) {
            ball.dx = -ball.dx;
        }

        // Score points
        if (ball.x <= 0) {
            this.gameState.rightScore++;
            this.resetBall();
        } else if (ball.x >= GAME_CONFIG.CANVAS_WIDTH) {
            this.gameState.leftScore++;
            this.resetBall();
        }

        // Check for winner AFTER ball update and scoring
        if (this.gameState.leftScore >= GAME_CONFIG.WINNING_SCORE) {
            this.gameState.winner = 'left';
            this.gameState.isGameRunning = false;
        } else if (this.gameState.rightScore >= GAME_CONFIG.WINNING_SCORE) {
            this.gameState.winner = 'right';
            this.gameState.isGameRunning = false;
        }
    }

    private checkPaddleCollision(ball: Ball, paddle: Paddle): boolean {
        return ball.x < paddle.x + paddle.width &&
               ball.x + ball.size > paddle.x &&
               ball.y < paddle.y + paddle.height &&
               ball.y + ball.size > paddle.y;
    }

    private resetBall(): void {
        this.gameState.ball.x = GAME_CONFIG.CANVAS_WIDTH / 2;
        this.gameState.ball.y = GAME_CONFIG.CANVAS_HEIGHT / 2;
        this.gameState.ball.dx = this.gameState.ball.dx > 0 ? -GAME_CONFIG.BALL_SPEED : GAME_CONFIG.BALL_SPEED;
        this.gameState.ball.dy = Math.random() > 0.5 ? GAME_CONFIG.BALL_SPEED : -GAME_CONFIG.BALL_SPEED;
    }

    public resetGame(): void {
        this.gameState = this.initializeGame();
    }

    public checkWinner(): void {
        if (this.gameState.leftScore >= GAME_CONFIG.WINNING_SCORE) {
            this.gameState.winner = 'left';
            this.gameState.isGameRunning = false;
        } else if (this.gameState.rightScore >= GAME_CONFIG.WINNING_SCORE) {
            this.gameState.winner = 'right';
            this.gameState.isGameRunning = false;
        }
    }
}

export async function runGameTests() {
    const suite = new TestSuite();

    suite.test('PongGame should initialize with correct default state', () => {
        const game = new PongGame();
        const state = game.getGameState();

        Assert.strictEqual(state.ball.x, GAME_CONFIG.CANVAS_WIDTH / 2);
        Assert.strictEqual(state.ball.y, GAME_CONFIG.CANVAS_HEIGHT / 2);
        Assert.strictEqual(state.ball.size, GAME_CONFIG.BALL_SIZE);
        Assert.strictEqual(state.leftScore, 0);
        Assert.strictEqual(state.rightScore, 0);
        Assert.strictEqual(state.isGameRunning, true);
        Assert.strictEqual(state.winner, undefined);
    });

    suite.test('PongGame paddles should be positioned correctly', () => {
        const game = new PongGame();
        const state = game.getGameState();

        Assert.strictEqual(state.leftPaddle.x, 10);
        Assert.strictEqual(state.leftPaddle.width, GAME_CONFIG.PADDLE_WIDTH);
        Assert.strictEqual(state.leftPaddle.height, GAME_CONFIG.PADDLE_HEIGHT);
        
        Assert.strictEqual(state.rightPaddle.x, GAME_CONFIG.CANVAS_WIDTH - 20);
        Assert.strictEqual(state.rightPaddle.width, GAME_CONFIG.PADDLE_WIDTH);
        Assert.strictEqual(state.rightPaddle.height, GAME_CONFIG.PADDLE_HEIGHT);
    });

    suite.test('PongGame should move left paddle up', () => {
        const game = new PongGame();
        const initialState = game.getGameState();
        const initialY = initialState.leftPaddle.y;

        game.movePaddle('left', 'up');
        const newState = game.getGameState();

        Assert.ok(newState.leftPaddle.y < initialY);
    });

    suite.test('PongGame should move right paddle down', () => {
        const game = new PongGame();
        const initialState = game.getGameState();
        const initialY = initialState.rightPaddle.y;

        game.movePaddle('right', 'down');
        const newState = game.getGameState();

        Assert.ok(newState.rightPaddle.y > initialY);
    });

    suite.test('PongGame should not move paddle beyond canvas boundaries', () => {
        const game = new PongGame();
        
        // Move paddle to top boundary
        for (let i = 0; i < 100; i++) {
            game.movePaddle('left', 'up');
        }
        
        const topState = game.getGameState();
        Assert.strictEqual(topState.leftPaddle.y, 0);

        // Reset and move to bottom boundary
        game.resetGame();
        for (let i = 0; i < 100; i++) {
            game.movePaddle('left', 'down');
        }
        
        const bottomState = game.getGameState();
        Assert.strictEqual(bottomState.leftPaddle.y, GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.PADDLE_HEIGHT);
    });

    suite.test('PongGame should update ball position', () => {
        const game = new PongGame();
        const initialState = game.getGameState();
        const initialX = initialState.ball.x;
        const initialY = initialState.ball.y;

        game.updateBall();
        const newState = game.getGameState();

        // Ball should have moved
        Assert.ok(newState.ball.x !== initialX || newState.ball.y !== initialY);
    });

    suite.test('PongGame should bounce ball off top and bottom walls', () => {
        const game = new PongGame();
        const state = game.getGameState();
        
        // Move ball to top
        state.ball.y = 0;
        state.ball.dy = -5; // Moving up
        
        game.updateBall();
        const newState = game.getGameState();
        
        // Ball should bounce (dy should be positive now)
        Assert.ok(newState.ball.dy > 0);
    });

    suite.test('PongGame should reset ball after scoring', () => {
        const game = new PongGame();
        const state = game.getGameState();
        
        // Move ball to left edge (right player scores)
        state.ball.x = -10;
        
        const initialRightScore = state.rightScore;
        game.updateBall();
        const newState = game.getGameState();
        
        // Right player should have scored
        Assert.strictEqual(newState.rightScore, initialRightScore + 1);
        // Ball should be reset to center
        Assert.strictEqual(newState.ball.x, GAME_CONFIG.CANVAS_WIDTH / 2);
        Assert.strictEqual(newState.ball.y, GAME_CONFIG.CANVAS_HEIGHT / 2);
    });

    suite.test('PongGame should detect winner', () => {
        const game = new PongGame();
        const initialState = game.getGameState();
        
        // Manually set the score to winning score
        initialState.leftScore = GAME_CONFIG.WINNING_SCORE;
        
        // Check for winner
        game.checkWinner();
        
        const finalState = game.getGameState();
        
        // Debug: Check what we got
        Assert.strictEqual(finalState.leftScore, GAME_CONFIG.WINNING_SCORE);
        Assert.strictEqual(finalState.winner, 'left');
        Assert.strictEqual(finalState.isGameRunning, false);
    });

    suite.test('PongGame should reset game state', () => {
        const game = new PongGame();
        const state = game.getGameState();
        
        // Modify game state
        state.leftScore = 5;
        state.rightScore = 3;
        state.ball.x = 100;
        state.ball.y = 100;
        state.isGameRunning = false;
        state.winner = 'left';
        
        // Reset game
        game.resetGame();
        const resetState = game.getGameState();
        
        Assert.strictEqual(resetState.leftScore, 0);
        Assert.strictEqual(resetState.rightScore, 0);
        Assert.strictEqual(resetState.ball.x, GAME_CONFIG.CANVAS_WIDTH / 2);
        Assert.strictEqual(resetState.ball.y, GAME_CONFIG.CANVAS_HEIGHT / 2);
        Assert.strictEqual(resetState.isGameRunning, true);
        Assert.strictEqual(resetState.winner, undefined);
    });

    return await suite.run();
}
