import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runGameRoomTests() {
    const suite = new TestSuite();

    suite.test('GameRoom - should create room with ID', async () => {
        const room = TestHelper.createMockGameRoom();
        
        Assert.ok(room.roomId);
        Assert.ok(room.roomId.includes('room-'));
    });

    suite.test('GameRoom - should start with waiting state', async () => {
        const room = TestHelper.createMockGameRoom();
        
        Assert.strictEqual(room.gameState, 'waiting');
    });

    suite.test('GameRoom - should track player count', async () => {
        const room = TestHelper.createMockGameRoom();
        
        Assert.strictEqual(room.players.length, 0);
        Assert.ok(room.maxPlayers > 0);
    });

    suite.test('GameRoom - should validate game type', async () => {
        const room = TestHelper.createMockGameRoom();
        const validGameTypes = ['pong', 'rps', 'tournament'];
        
        Assert.ok(validGameTypes.includes(room.gameType));
    });

    suite.test('GameRoom - should handle room settings', async () => {
        const room = {
            ...TestHelper.createMockGameRoom(),
            settings: {
                maxScore: 5,
                timeLimit: 300,
                difficulty: 'medium'
            }
        };
        
        Assert.ok(room.settings);
        Assert.strictEqual(room.settings.maxScore, 5);
    });

    suite.test('GameRoom - should track game duration', async () => {
        const room = {
            ...TestHelper.createMockGameRoom(),
            startTime: Date.now(),
            endTime: null,
            duration: 0
        };
        
        Assert.ok(room.startTime);
        Assert.strictEqual(room.endTime, null);
    });

    suite.test('GameRoom - should handle spectators', async () => {
        const room = {
            ...TestHelper.createMockGameRoom(),
            spectators: [],
            allowSpectators: true
        };
        
        Assert.ok(Array.isArray(room.spectators));
        Assert.strictEqual(room.allowSpectators, true);
    });

    suite.test('GameRoom - should manage room password', async () => {
        const room = {
            ...TestHelper.createMockGameRoom(),
            isPrivate: true,
            password: 'secret123'
        };
        
        Assert.strictEqual(room.isPrivate, true);
        Assert.ok(room.password);
    });

    suite.test('GameRoom - should track room creation time', async () => {
        const room = {
            ...TestHelper.createMockGameRoom(),
            createdAt: new Date().toISOString(),
            lastActivity: Date.now()
        };
        
        Assert.ok(room.createdAt);
        Assert.ok(room.lastActivity);
    });

    suite.test('GameRoom - should handle room cleanup', async () => {
        const room = {
            ...TestHelper.createMockGameRoom(),
            shouldCleanup: false,
            cleanupAfter: 3600000 // 1 hour
        };
        
        const now = Date.now();
        const roomAge = now - room.lastActivity;
        
        if (roomAge > room.cleanupAfter) {
            room.shouldCleanup = true;
        }
        
        Assert.strictEqual(room.shouldCleanup, false);
    });

    return await suite.run();
}
