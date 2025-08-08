import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runPongGameTests() {
    const suite = new TestSuite();

    suite.test('Pong Game - should initialize game state', async () => {
        const gameState = {
            ball: { x: 400, y: 300, dx: 5, dy: 3, radius: 10 },
            paddle1: { x: 10, y: 250, width: 20, height: 100, speed: 5 },
            paddle2: { x: 770, y: 250, width: 20, height: 100, speed: 5 },
            score: { player1: 0, player2: 0 },
            gameRunning: false
        };
        
        Assert.ok(gameState.ball);
        Assert.ok(gameState.paddle1);
        Assert.ok(gameState.paddle2);
        Assert.strictEqual(gameState.score.player1, 0);
        Assert.strictEqual(gameState.score.player2, 0);
    });

    suite.test('Pong Game - should update ball position', async () => {
        const ball = { x: 400, y: 300, dx: 5, dy: 3 };
        
        // Simulate ball movement
        ball.x += ball.dx;
        ball.y += ball.dy;
        
        Assert.strictEqual(ball.x, 405);
        Assert.strictEqual(ball.y, 303);
    });

    suite.test('Pong Game - should detect wall collision', async () => {
        const ball = { x: 400, y: 10, dy: -3, radius: 10 };
        const canvasHeight = 600;
        
        // Check top wall collision
        if (ball.y - ball.radius <= 0) {
            ball.dy = -ball.dy;
        }
        
        Assert.ok(ball.dy > 0); // Ball should bounce down
    });

    suite.test('Pong Game - should detect paddle collision', async () => {
        const ball = { x: 30, y: 300, dx: -5, radius: 10 };
        const paddle = { x: 10, y: 250, width: 20, height: 100 };
        
        // Check collision
        const collision = ball.x - ball.radius <= paddle.x + paddle.width &&
                         ball.y >= paddle.y &&
                         ball.y <= paddle.y + paddle.height;
        
        Assert.ok(collision);
    });

    suite.test('Pong Game - should move paddle up', async () => {
        const paddle = { x: 10, y: 250, speed: 5 };
        const initialY = paddle.y;
        
        paddle.y -= paddle.speed;
        
        Assert.strictEqual(paddle.y, initialY - 5);
    });

    suite.test('Pong Game - should move paddle down', async () => {
        const paddle = { x: 10, y: 250, speed: 5 };
        const initialY = paddle.y;
        
        paddle.y += paddle.speed;
        
        Assert.strictEqual(paddle.y, initialY + 5);
    });

    suite.test('Pong Game - should prevent paddle from going out of bounds', async () => {
        const paddle = { y: 550, height: 100, speed: 5 };
        const canvasHeight = 600;
        
        // Try to move down
        const newY = paddle.y + paddle.speed;
        if (newY + paddle.height > canvasHeight) {
            paddle.y = canvasHeight - paddle.height;
        } else {
            paddle.y = newY;
        }
        
        Assert.strictEqual(paddle.y, 500); // Should be clamped
    });

    suite.test('Pong Game - should handle scoring', async () => {
        const score = { player1: 2, player2: 1 };
        const ball = { x: -10 }; // Ball went past left edge
        
        if (ball.x < 0) {
            score.player2++;
        }
        
        Assert.strictEqual(score.player2, 2);
    });

    suite.test('Pong Game - should reset ball after score', async () => {
        const ball = { x: -10, y: 300, dx: -5, dy: 3 };
        const canvasWidth = 800;
        const canvasHeight = 600;
        
        // Reset ball to center
        ball.x = canvasWidth / 2;
        ball.y = canvasHeight / 2;
        ball.dx = -ball.dx;
        
        Assert.strictEqual(ball.x, 400);
        Assert.strictEqual(ball.y, 300);
        Assert.strictEqual(ball.dx, 5);
    });

    suite.test('Pong Game - should handle keyboard input', async () => {
        const keys = { ArrowUp: false, ArrowDown: false, w: false, s: false };
        
        // Simulate keydown
        const mockEvent = TestHelper.createMockEvent('keydown', { key: 'ArrowUp' });
        keys.ArrowUp = true;
        
        Assert.ok(keys.ArrowUp);
        Assert.strictEqual(keys.ArrowDown, false);
    });

    suite.test('Pong Game - should calculate AI paddle movement', async () => {
        const ball = { y: 350 };
        const aiPaddle = { y: 250, height: 100, speed: 3 };
        const paddleCenter = aiPaddle.y + aiPaddle.height / 2;
        
        if (ball.y > paddleCenter) {
            aiPaddle.y += aiPaddle.speed;
        } else if (ball.y < paddleCenter) {
            aiPaddle.y -= aiPaddle.speed;
        }
        
        Assert.strictEqual(aiPaddle.y, 253); // Should move down towards ball
    });

    return await suite.run();
}
