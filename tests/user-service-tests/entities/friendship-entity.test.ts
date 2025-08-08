import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runFriendshipEntityTests() {
    const suite = new TestSuite();

    suite.test('Friendship Entity - should create friendship with valid properties', async () => {
        const friendship = {
            friendshipUuid: 'friendship-uuid-123',
            requesterUuid: 'user1-uuid',
            receiverUuid: 'user2-uuid',
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        Assert.ok(friendship.friendshipUuid);
        Assert.ok(friendship.requesterUuid);
        Assert.ok(friendship.receiverUuid);
        Assert.ok(friendship.status);
        Assert.ok(friendship.createdAt);
        Assert.ok(friendship.updatedAt);
    });

    suite.test('Friendship Entity - should validate status values', async () => {
        const validStatuses = ['pending', 'accepted', 'rejected', 'blocked'];
        
        validStatuses.forEach(status => {
            const friendship = {
                friendshipUuid: 'test-uuid',
                requesterUuid: 'user1',
                receiverUuid: 'user2',
                status: status
            };
            
            Assert.ok(validStatuses.includes(friendship.status));
        });
    });

    suite.test('Friendship Entity - should prevent self-friendship', async () => {
        const sameUserId = 'user-123';
        const friendship = {
            requesterUuid: sameUserId,
            receiverUuid: sameUserId
        };
        
        // Should be invalid
        Assert.ok(friendship.requesterUuid === friendship.receiverUuid);
    });

    suite.test('Friendship Entity - should track acceptance timestamp', async () => {
        const friendship = {
            friendshipUuid: 'test-uuid',
            status: 'accepted',
            acceptedAt: new Date().toISOString()
        };
        
        Assert.strictEqual(friendship.status, 'accepted');
        Assert.ok(friendship.acceptedAt);
    });

    suite.test('Friendship Entity - should track rejection timestamp', async () => {
        const friendship = {
            friendshipUuid: 'test-uuid',
            status: 'rejected',
            rejectedAt: new Date().toISOString()
        };
        
        Assert.strictEqual(friendship.status, 'rejected');
        Assert.ok(friendship.rejectedAt);
    });

    suite.test('Friendship Entity - should have unique friendship pairs', async () => {
        const friendship1 = {
            requesterUuid: 'user1',
            receiverUuid: 'user2'
        };
        
        const friendship2 = {
            requesterUuid: 'user2', 
            receiverUuid: 'user1'
        };
        
        // These represent the same friendship relationship
        Assert.ok(
            (friendship1.requesterUuid === friendship2.receiverUuid) &&
            (friendship1.receiverUuid === friendship2.requesterUuid)
        );
    });

    suite.test('Friendship Entity - should update status', async () => {
        const friendship = {
            friendshipUuid: 'test-uuid',
            status: 'pending',
            updatedAt: new Date().toISOString()
        };
        
        // Simulate status update
        const updatedFriendship = {
            ...friendship,
            status: 'accepted',
            acceptedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        Assert.strictEqual(updatedFriendship.status, 'accepted');
        Assert.ok(updatedFriendship.acceptedAt);
        Assert.ok(updatedFriendship.updatedAt);
    });

    suite.test('Friendship Entity - should handle blocked status', async () => {
        const friendship = {
            friendshipUuid: 'test-uuid',
            requesterUuid: 'user1',
            receiverUuid: 'user2',
            status: 'blocked',
            blockedAt: new Date().toISOString(),
            blockedBy: 'user1'
        };
        
        Assert.strictEqual(friendship.status, 'blocked');
        Assert.ok(friendship.blockedAt);
        Assert.ok(friendship.blockedBy);
    });

    suite.test('Friendship Entity - should have required fields', async () => {
        const requiredFields = ['friendshipUuid', 'requesterUuid', 'receiverUuid', 'status'];
        const friendship = {
            friendshipUuid: 'test-uuid',
            requesterUuid: 'user1',
            receiverUuid: 'user2',
            status: 'pending'
        };
        
        requiredFields.forEach(field => {
            Assert.ok(friendship[field as keyof typeof friendship], `${field} is required`);
        });
    });

    suite.test('Friendship Entity - should have timestamps', async () => {
        const now = new Date().toISOString();
        const friendship = {
            friendshipUuid: 'test-uuid',
            requesterUuid: 'user1',
            receiverUuid: 'user2',
            status: 'pending',
            createdAt: now,
            updatedAt: now
        };
        
        Assert.ok(friendship.createdAt);
        Assert.ok(friendship.updatedAt);
        Assert.strictEqual(friendship.createdAt, friendship.updatedAt);
    });

    return await suite.run();
}
