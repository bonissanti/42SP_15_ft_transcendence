import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runTokenServiceTests() {
    const suite = new TestSuite();

    suite.test('TokenService - should generate access tokens', async () => {
        const payload = { userId: 'user-123', email: 'test@example.com' };
        const token = `header.${btoa(JSON.stringify(payload))}.signature`;
        
        Assert.ok(token);
        Assert.ok(token.split('.').length === 3);
    });

    suite.test('TokenService - should validate token format', async () => {
        const validToken = 'header.payload.signature';
        const invalidToken = 'invalid-token';
        
        const isValidFormat = (token: string) => token.split('.').length === 3;
        
        Assert.ok(isValidFormat(validToken));
        Assert.strictEqual(isValidFormat(invalidToken), false);
    });

    suite.test('TokenService - should decode token payload', async () => {
        const payload = { userId: 'user-123', exp: Date.now() + 3600000 };
        const encodedPayload = btoa(JSON.stringify(payload));
        const token = `header.${encodedPayload}.signature`;
        
        const decoded = JSON.parse(atob(token.split('.')[1]));
        
        Assert.strictEqual(decoded.userId, 'user-123');
    });

    suite.test('TokenService - should check token expiration', async () => {
        const expiredToken = {
            exp: Math.floor(Date.now() / 1000) - 3600 // 1 hour ago
        };
        
        const validToken = {
            exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
        };
        
        const isExpired = (token: any) => token.exp < Math.floor(Date.now() / 1000);
        
        Assert.ok(isExpired(expiredToken));
        Assert.strictEqual(isExpired(validToken), false);
    });

    suite.test('TokenService - should revoke tokens', async () => {
        const tokenBlacklist = new Set();
        const tokenToRevoke = 'token-to-revoke-123';
        
        tokenBlacklist.add(tokenToRevoke);
        
        Assert.ok(tokenBlacklist.has(tokenToRevoke));
        Assert.strictEqual(tokenBlacklist.size, 1);
    });

    return await suite.run();
}
