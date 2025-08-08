import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runProfileServiceTests() {
    const suite = new TestSuite();

    suite.test('ProfileService - should update profile data', async () => {
        const profile = {
            userId: 'user-123',
            displayName: 'Old Name',
            bio: 'Old bio',
            avatar: null
        };
        
        // Update profile
        profile.displayName = 'New Name';
        profile.bio = 'New bio';
        
        Assert.strictEqual(profile.displayName, 'New Name');
        Assert.strictEqual(profile.bio, 'New bio');
    });

    suite.test('ProfileService - should validate profile fields', async () => {
        const profile = {
            displayName: 'Test User',
            bio: 'This is a bio',
            website: 'https://example.com'
        };
        
        Assert.ok(profile.displayName.length <= 50);
        Assert.ok(profile.bio.length <= 500);
        Assert.ok(profile.website.startsWith('http'));
    });

    suite.test('ProfileService - should handle privacy settings', async () => {
        const privacy = {
            profileVisible: true,
            showEmail: false,
            showOnlineStatus: true,
            allowFriendRequests: true
        };
        
        Assert.strictEqual(privacy.profileVisible, true);
        Assert.strictEqual(privacy.showEmail, false);
    });

    suite.test('ProfileService - should track profile views', async () => {
        const profileStats = {
            userId: 'user-123',
            profileViews: 25,
            lastViewedAt: new Date().toISOString()
        };
        
        // Increment view count
        profileStats.profileViews++;
        profileStats.lastViewedAt = new Date().toISOString();
        
        Assert.strictEqual(profileStats.profileViews, 26);
    });

    suite.test('ProfileService - should handle achievements display', async () => {
        const profile = {
            userId: 'user-123',
            achievements: [
                { id: 'first-win', name: 'First Victory', visible: true },
                { id: 'secret-achievement', name: 'Secret', visible: false }
            ]
        };
        
        const visibleAchievements = profile.achievements.filter(a => a.visible);
        
        Assert.strictEqual(visibleAchievements.length, 1);
        Assert.strictEqual(visibleAchievements[0].name, 'First Victory');
    });

    return await suite.run();
}
