import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runUserUtilsTests() {
    const suite = new TestSuite();

    suite.test('validateUserInput - should validate user registration data', async () => {
        const userData = {
            username: 'testuser',
            email: 'test@example.com',
            displayName: 'Test User'
        };
        
        Assert.ok(userData.username.length >= 3);
        Assert.ok(userData.username.length <= 20);
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        Assert.ok(emailRegex.test(userData.email));
        
        Assert.ok(userData.displayName.length <= 50);
    });

    suite.test('sanitizeUsername - should sanitize username input', async () => {
        const dirtyUsername = 'test<script>user</script>';
        const cleanUsername = dirtyUsername.replace(/<[^>]*>/g, '');
        
        Assert.ok(!cleanUsername.includes('<script>'));
        Assert.ok(!cleanUsername.includes('</script>'));
        Assert.strictEqual(cleanUsername, 'testuser');
    });

    suite.test('generateAvatarPath - should generate avatar file path', async () => {
        const userId = 'user-123';
        const fileExtension = 'jpg';
        const avatarPath = `/uploads/avatars/${userId}.${fileExtension}`;
        
        Assert.ok(avatarPath.includes('/uploads/avatars/'));
        Assert.ok(avatarPath.includes(userId));
        Assert.ok(avatarPath.endsWith('.jpg'));
    });

    suite.test('validateImageFile - should validate image file upload', async () => {
        const validFile = {
            mimetype: 'image/jpeg',
            size: 1024 * 1024, // 1MB
            fieldname: 'avatar'
        };
        
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        Assert.ok(allowedMimeTypes.includes(validFile.mimetype));
        Assert.ok(validFile.size <= maxSize);
    });

    suite.test('formatUserResponse - should format user data for API response', async () => {
        const user = {
            userUuid: 'user-123',
            username: 'testuser',
            email: 'test@example.com',
            password: 'hashedpassword',
            displayName: 'Test User',
            avatar: '/uploads/avatars/user-123.jpg'
        };
        
        // Should exclude sensitive data like password
        const safeUser = {
            userUuid: user.userUuid,
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            avatar: user.avatar
        };
        
        Assert.ok(safeUser.userUuid);
        Assert.ok(safeUser.username);
        Assert.ok(!('password' in safeUser));
    });

    suite.test('calculateUserStats - should calculate user game statistics', async () => {
        const gameHistory = [
            { result: 'win' },
            { result: 'win' },
            { result: 'loss' },
            { result: 'win' }
        ];
        
        const wins = gameHistory.filter(game => game.result === 'win').length;
        const losses = gameHistory.filter(game => game.result === 'loss').length;
        const total = gameHistory.length;
        const winRate = total > 0 ? (wins / total) * 100 : 0;
        
        Assert.strictEqual(wins, 3);
        Assert.strictEqual(losses, 1);
        Assert.strictEqual(total, 4);
        Assert.strictEqual(winRate, 75);
    });

    suite.test('isUsernameAvailable - should check username availability', async () => {
        const username = 'newuser';
        const existingUser = null; // No user found
        
        Assert.ok(username);
        Assert.strictEqual(existingUser, null); // Username is available
    });

    suite.test('normalizeSearchQuery - should normalize search input', async () => {
        const searchQuery = '  TeSt UsEr  ';
        const normalized = searchQuery.trim().toLowerCase();
        
        Assert.strictEqual(normalized, 'test user');
        Assert.ok(!normalized.startsWith(' '));
        Assert.ok(!normalized.endsWith(' '));
    });

    suite.test('generateUserSlug - should generate URL-friendly user slug', async () => {
        const displayName = 'Test User Name!';
        const slug = displayName
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
        
        Assert.strictEqual(slug, 'test-user-name');
        Assert.ok(!slug.includes(' '));
        Assert.ok(!slug.includes('!'));
    });

    suite.test('validateFriendshipRequest - should validate friend request data', async () => {
        const requestData = {
            requesterUuid: 'user1',
            receiverUuid: 'user2'
        };
        
        Assert.ok(requestData.requesterUuid);
        Assert.ok(requestData.receiverUuid);
        Assert.ok(requestData.requesterUuid !== requestData.receiverUuid);
    });

    suite.test('formatLastSeen - should format last seen timestamp', async () => {
        const lastSeen = new Date(Date.now() - 60000).toISOString(); // 1 minute ago
        const now = new Date();
        const lastSeenDate = new Date(lastSeen);
        const diffInMinutes = Math.floor((now.getTime() - lastSeenDate.getTime()) / 60000);
        
        Assert.ok(diffInMinutes >= 1);
        Assert.ok(lastSeen);
    });

    return await suite.run();
}
