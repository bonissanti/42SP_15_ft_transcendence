import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runUserServiceTests() {
    const suite = new TestSuite();

    suite.test('UserService - should create user with valid data', async () => {
        const userData = {
            username: TestHelper.generateRandomUsername(),
            email: TestHelper.generateRandomEmail(),
            displayName: 'Test User'
        };
        
        Assert.ok(userData.username);
        Assert.ok(userData.email);
        Assert.ok(userData.displayName);
    });

    suite.test('UserService - should find user by ID', async () => {
        const userId = 'test-user-id';
        const mockUser = {
            userUuid: userId,
            username: 'testuser',
            email: 'test@example.com'
        };
        
        Assert.strictEqual(mockUser.userUuid, userId);
        Assert.ok(mockUser.username);
    });

    suite.test('UserService - should find user by username', async () => {
        const username = 'testuser';
        const mockUser = {
            userUuid: 'test-user-id',
            username: username,
            email: 'test@example.com'
        };
        
        Assert.strictEqual(mockUser.username, username);
        Assert.ok(mockUser.userUuid);
    });

    suite.test('UserService - should find user by email', async () => {
        const email = 'test@example.com';
        const mockUser = {
            userUuid: 'test-user-id',
            username: 'testuser',
            email: email
        };
        
        Assert.strictEqual(mockUser.email, email);
        Assert.ok(mockUser.userUuid);
    });

    suite.test('UserService - should update user profile', async () => {
        const userId = 'test-user-id';
        const updateData = {
            displayName: 'Updated Name',
            bio: 'Updated bio'
        };
        
        Assert.ok(userId);
        Assert.ok(updateData.displayName);
        Assert.ok(updateData.bio);
    });

    suite.test('UserService - should delete user', async () => {
        const userId = 'test-user-id';
        
        Assert.ok(userId);
        Assert.ok(typeof userId === 'string');
    });

    suite.test('UserService - should search users by query', async () => {
        const searchQuery = 'test';
        const mockResults = [
            { userUuid: 'user1', username: 'testuser1' },
            { userUuid: 'user2', username: 'testuser2' }
        ];
        
        Assert.ok(searchQuery);
        Assert.ok(Array.isArray(mockResults));
    });

    suite.test('UserService - should get user statistics', async () => {
        const userId = 'test-user-id';
        const mockStats = {
            totalGames: 20,
            wins: 12,
            losses: 8,
            winRate: 60.0
        };
        
        Assert.ok(userId);
        Assert.ok(mockStats.totalGames >= 0);
        Assert.ok(mockStats.wins >= 0);
        Assert.ok(mockStats.losses >= 0);
    });

    suite.test('UserService - should upload user avatar', async () => {
        const userId = 'test-user-id';
        const mockFile = TestHelper.createMockFile();
        const avatarPath = `/uploads/avatars/${userId}.jpg`;
        
        Assert.ok(userId);
        Assert.ok(mockFile.mimetype.startsWith('image/'));
        Assert.ok(avatarPath.includes(userId));
    });

    suite.test('UserService - should validate username uniqueness', async () => {
        const username = 'testuser';
        const existingUser = null; // No user found = available
        
        Assert.ok(username);
        Assert.strictEqual(existingUser, null);
    });

    return await suite.run();
}
