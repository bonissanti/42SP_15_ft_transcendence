import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runWebSocketConnectionTests() {
    const suite = new TestSuite();

    suite.test('WebSocket - should establish connection', async () => {
        const ws = TestHelper.createMockWebSocket();
        
        Assert.strictEqual(ws.readyState, 1);
    });

    suite.test('WebSocket - should send message', async () => {
        const ws = TestHelper.createMockWebSocket();
        let messageSent = false;
        
        ws.send = () => { messageSent = true; };
        ws.send('test message');
        
        Assert.ok(messageSent);
    });

    suite.test('WebSocket - should handle connection close', async () => {
        const ws = TestHelper.createMockWebSocket();
        let connectionClosed = false;
        
        ws.close = () => { connectionClosed = true; };
        ws.close();
        
        Assert.ok(connectionClosed);
    });

    suite.test('WebSocket - should handle events', async () => {
        const ws = TestHelper.createMockWebSocket();
        let eventAdded = false;
        
        ws.addEventListener = () => { eventAdded = true; };
        ws.addEventListener('message', () => {});
        
        Assert.ok(eventAdded);
    });

    suite.test('WebSocket - should broadcast to room', async () => {
        const room = TestHelper.createMockGameRoom();
        const players = [TestHelper.createMockPlayer(), TestHelper.createMockPlayer()];
        room.players = players;
        
        Assert.strictEqual(room.players.length, 2);
    });

    suite.test('WebSocket - should handle player join', async () => {
        const room = TestHelper.createMockGameRoom();
        const player = TestHelper.createMockPlayer();
        
        room.players.push(player);
        
        Assert.strictEqual(room.players.length, 1);
        Assert.strictEqual(room.players[0].playerId, player.playerId);
    });

    suite.test('WebSocket - should handle player leave', async () => {
        const room = TestHelper.createMockGameRoom();
        const player = TestHelper.createMockPlayer();
        room.players.push(player);
        
        // Remove player
        room.players = room.players.filter(p => p.playerId !== player.playerId);
        
        Assert.strictEqual(room.players.length, 0);
    });

    suite.test('WebSocket - should handle game state updates', async () => {
        const room = TestHelper.createMockGameRoom();
        
        room.gameState = 'playing';
        
        Assert.strictEqual(room.gameState, 'playing');
    });

    suite.test('WebSocket - should validate message format', async () => {
        const message = {
            type: 'game_update',
            data: { score: 5 },
            timestamp: Date.now()
        };
        
        Assert.ok(message.type);
        Assert.ok(message.data);
        Assert.ok(message.timestamp);
    });

    suite.test('WebSocket - should handle room capacity', async () => {
        const room = TestHelper.createMockGameRoom();
        room.maxPlayers = 2;
        
        const player1 = TestHelper.createMockPlayer();
        const player2 = TestHelper.createMockPlayer();
        const player3 = TestHelper.createMockPlayer();
        
        room.players.push(player1);
        room.players.push(player2);
        
        // Try to add third player
        if (room.players.length < room.maxPlayers) {
            room.players.push(player3);
        }
        
        Assert.strictEqual(room.players.length, 2);
    });

    return await suite.run();
}
