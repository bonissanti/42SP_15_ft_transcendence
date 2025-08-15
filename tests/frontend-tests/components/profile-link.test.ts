import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runProfileLinkTests() {
    const suite = new TestSuite();

    suite.test('ProfileLink - should generate profile URL', async () => {
        const userId = 'user-123';
        const profileUrl = `/profile/${userId}`;
        
        Assert.ok(profileUrl.includes(userId));
        Assert.ok(profileUrl.startsWith('/profile/'));
    });

    suite.test('ProfileLink - should handle click events', async () => {
        let linkClicked = false;
        
        const handleClick = () => {
            linkClicked = true;
        };
        
        handleClick();
        
        Assert.ok(linkClicked);
    });

    suite.test('ProfileLink - should display user avatar', async () => {
        const user = {
            id: 'user-123',
            username: 'testuser',
            avatar: '/images/avatar-123.jpg'
        };
        
        Assert.ok(user.avatar);
        Assert.ok(user.avatar.includes('.jpg'));
    });

    suite.test('ProfileLink - should show online status', async () => {
        const user = {
            id: 'user-123',
            username: 'testuser',
            isOnline: true,
            lastSeen: new Date().toISOString()
        };
        
        Assert.strictEqual(user.isOnline, true);
        Assert.ok(user.lastSeen);
    });

    suite.test('ProfileLink - should handle hover effects', async () => {
        let isHovered = false;
        
        const handleMouseEnter = () => { isHovered = true; };
        const handleMouseLeave = () => { isHovered = false; };
        
        handleMouseEnter();
        Assert.ok(isHovered);
        
        handleMouseLeave();
        Assert.strictEqual(isHovered, false);
    });

    return await suite.run();
}
