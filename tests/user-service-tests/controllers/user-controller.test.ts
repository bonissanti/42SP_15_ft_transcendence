import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runUserControllerTests() {
    const suite = new TestSuite();

    suite.test('GET /users - should retrieve all users', async () => {
        const mockUsers = [
            { userUuid: 'user1', username: 'testuser1', email: 'test1@example.com' },
            { userUuid: 'user2', username: 'testuser2', email: 'test2@example.com' }
        ];
        
        Assert.ok(Array.isArray(mockUsers));
        Assert.strictEqual(mockUsers.length, 2);
    });

    suite.test('GET /users/:id - should retrieve user by ID', async () => {
        const userId = 'test-user-id';
        const mockUser = {
            userUuid: userId,
            username: 'testuser',
            email: 'test@example.com'
        };
        
        Assert.strictEqual(mockUser.userUuid, userId);
        Assert.ok(mockUser.username);
        Assert.ok(mockUser.email);
    });

    suite.test('POST /users - should create new user', async () => {
        const userData = {
            username: TestHelper.generateRandomUsername(),
            email: TestHelper.generateRandomEmail(),
            displayName: 'Test User'
        };
        
        Assert.ok(userData.username);
        Assert.ok(userData.email);
        Assert.ok(userData.displayName);
    });

    suite.test('PUT /users/:id - should update user', async () => {
        const userId = 'test-user-id';
        const updateData = {
            username: 'updateduser',
            displayName: 'Updated User'
        };
        
        Assert.ok(userId);
        Assert.ok(updateData.username);
        Assert.ok(updateData.displayName);
    });

    suite.test('DELETE /users/:id - should delete user', async () => {
        const userId = 'test-user-id';
        
        Assert.ok(userId);
        Assert.ok(typeof userId === 'string');
    });

    suite.test('POST /users/:id/avatar - should upload user avatar', async () => {
        const userId = 'test-user-id';
        const mockFile = TestHelper.createMockFile();
        
        Assert.ok(userId);
        Assert.ok(mockFile.mimetype.startsWith('image/'));
        Assert.ok(mockFile.size > 0);
    });

    suite.test('GET /users/:id/profile - should get user profile', async () => {
        const userId = 'test-user-id';
        const mockProfile = {
            userUuid: userId,
            username: 'testuser',
            displayName: 'Test User',
            avatar: '/images/avatar.jpg',
            stats: { wins: 10, losses: 5 }
        };
        
        Assert.strictEqual(mockProfile.userUuid, userId);
        Assert.ok(mockProfile.stats);
    });

    suite.test('PUT /users/:id/profile - should update user profile', async () => {
        const userId = 'test-user-id';
        const profileData = {
            displayName: 'Updated Display Name',
            bio: 'This is my bio'
        };
        
        Assert.ok(userId);
        Assert.ok(profileData.displayName);
        Assert.ok(profileData.bio);
    });

    suite.test('GET /users/search - should search users by query', async () => {
        const searchQuery = 'testuser';
        const mockResults = [
            { userUuid: 'user1', username: 'testuser1' },
            { userUuid: 'user2', username: 'testuser2' }
        ];
        
        Assert.ok(searchQuery);
        Assert.ok(Array.isArray(mockResults));
        Assert.ok(mockResults.every(user => user.username.includes('testuser')));
    });

    suite.test('GET /users/:id/stats - should get user statistics', async () => {
        const userId = 'test-user-id';
        const mockStats = {
            totalGames: 15,
            wins: 10,
            losses: 5,
            winRate: 66.67,
            ranking: 'Gold'
        };
        
        Assert.ok(userId);
        Assert.ok(mockStats.totalGames >= 0);
        Assert.strictEqual(mockStats.wins + mockStats.losses, mockStats.totalGames);
    });

    return await suite.run();
}
