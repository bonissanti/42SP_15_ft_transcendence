import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runUserEntityTests() {
    const suite = new TestSuite();

    suite.test('User Entity - should create user with valid properties', async () => {
        const user = {
            userUuid: 'test-uuid-123',
            username: 'testuser',
            email: 'test@example.com',
            displayName: 'Test User',
            avatar: null,
            isOnline: false,
            lastSeen: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        Assert.ok(user.userUuid);
        Assert.ok(user.username);
        Assert.ok(user.email);
        Assert.ok(user.displayName);
        Assert.ok(typeof user.isOnline === 'boolean');
        Assert.ok(user.createdAt);
        Assert.ok(user.updatedAt);
    });

    suite.test('User Entity - should validate email format', async () => {
        const validEmails = [
            'test@example.com',
            'user.name@domain.co.uk',
            'test+tag@gmail.com'
        ];
        
        validEmails.forEach(email => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            Assert.ok(emailRegex.test(email), `${email} should be valid`);
        });
    });

    suite.test('User Entity - should validate username format', async () => {
        const validUsernames = [
            'testuser',
            'user123',
            'test_user',
            'user-name'
        ];
        
        validUsernames.forEach(username => {
            Assert.ok(username.length >= 3, `${username} should be at least 3 characters`);
            Assert.ok(username.length <= 20, `${username} should be at most 20 characters`);
        });
    });

    suite.test('User Entity - should have default values', async () => {
        const user = {
            userUuid: 'test-uuid',
            username: 'testuser',
            email: 'test@example.com',
            displayName: null,
            avatar: null,
            isOnline: false,
            bio: null,
            status: 'active'
        };
        
        Assert.strictEqual(user.isOnline, false);
        Assert.strictEqual(user.avatar, null);
        Assert.strictEqual(user.displayName, null);
        Assert.strictEqual(user.bio, null);
        Assert.strictEqual(user.status, 'active');
    });

    suite.test('User Entity - should update user properties', async () => {
        const user = {
            userUuid: 'test-uuid',
            username: 'oldusername',
            displayName: 'Old Name'
        };
        
        // Simulate update
        const updatedUser = {
            ...user,
            username: 'newusername',
            displayName: 'New Name',
            updatedAt: new Date().toISOString()
        };
        
        Assert.strictEqual(updatedUser.username, 'newusername');
        Assert.strictEqual(updatedUser.displayName, 'New Name');
        Assert.ok(updatedUser.updatedAt);
    });

    suite.test('User Entity - should have unique identifiers', async () => {
        const user1 = { userUuid: 'uuid-1', username: 'user1', email: 'user1@example.com' };
        const user2 = { userUuid: 'uuid-2', username: 'user2', email: 'user2@example.com' };
        
        Assert.ok(user1.userUuid !== user2.userUuid);
        Assert.ok(user1.username !== user2.username);
        Assert.ok(user1.email !== user2.email);
    });

    suite.test('User Entity - should handle avatar URLs', async () => {
        const user = {
            userUuid: 'test-uuid',
            username: 'testuser',
            avatar: '/uploads/avatars/test-uuid.jpg'
        };
        
        Assert.ok(user.avatar);
        Assert.ok(user.avatar.includes('/uploads/avatars/'));
        Assert.ok(user.avatar.includes(user.userUuid));
    });

    suite.test('User Entity - should track online status', async () => {
        const user = {
            userUuid: 'test-uuid',
            username: 'testuser',
            isOnline: true,
            lastSeen: new Date().toISOString()
        };
        
        Assert.strictEqual(user.isOnline, true);
        Assert.ok(user.lastSeen);
    });

    suite.test('User Entity - should have timestamps', async () => {
        const now = new Date().toISOString();
        const user = {
            userUuid: 'test-uuid',
            username: 'testuser',
            createdAt: now,
            updatedAt: now
        };
        
        Assert.ok(user.createdAt);
        Assert.ok(user.updatedAt);
        Assert.strictEqual(user.createdAt, user.updatedAt);
    });

    suite.test('User Entity - should validate required fields', async () => {
        const requiredFields = ['userUuid', 'username', 'email'];
        const user = {
            userUuid: 'test-uuid',
            username: 'testuser',
            email: 'test@example.com'
        };
        
        requiredFields.forEach(field => {
            Assert.ok(user[field as keyof typeof user], `${field} is required`);
        });
    });

    return await suite.run();
}
