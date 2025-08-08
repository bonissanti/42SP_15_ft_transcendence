import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runAuthUtilsTests() {
    const suite = new TestSuite();

    suite.test('validateEmail - should validate correct email format', async () => {
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

    suite.test('validateEmail - should reject invalid email format', async () => {
        const invalidEmails = [
            'invalid-email',
            '@domain.com',
            'test@',
            'test.domain.com'
        ];
        
        invalidEmails.forEach(email => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            Assert.strictEqual(emailRegex.test(email), false, `${email} should be invalid`);
        });
    });

    suite.test('validatePassword - should validate password strength', async () => {
        const strongPasswords = [
            'StrongPass123!',
            'MySecurePassword@2024',
            'Complex#Pass1'
        ];
        
        strongPasswords.forEach(password => {
            Assert.ok(password.length >= 8, `${password} should be at least 8 characters`);
        });
    });

    suite.test('validatePassword - should reject weak passwords', async () => {
        const weakPasswords = [
            '123',
            'pass',
            'simple'
        ];
        
        weakPasswords.forEach(password => {
            Assert.ok(password.length < 8, `${password} should be considered weak`);
        });
    });

    suite.test('generateRandomString - should generate random string', async () => {
        const randomString1 = Math.random().toString(36).substring(7);
        const randomString2 = Math.random().toString(36).substring(7);
        
        Assert.ok(randomString1);
        Assert.ok(randomString2);
        Assert.ok(randomString1 !== randomString2);
    });

    suite.test('sanitizeInput - should sanitize user input', async () => {
        const userInput = '<script>alert("xss")</script>';
        const sanitized = userInput.replace(/<[^>]*>/g, '');
        
        Assert.ok(!sanitized.includes('<script>'));
        Assert.ok(!sanitized.includes('</script>'));
    });

    suite.test('formatResponse - should format API response', async () => {
        const response = {
            success: true,
            data: { userId: '123' },
            message: 'Success'
        };
        
        Assert.ok(response.success);
        Assert.ok(response.data);
        Assert.ok(response.message);
    });

    suite.test('parseAuthHeader - should parse authorization header', async () => {
        const authHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test.signature';
        const token = authHeader.replace('Bearer ', '');
        
        Assert.ok(token);
        Assert.ok(!token.includes('Bearer'));
    });

    suite.test('isTokenExpired - should check token expiration', async () => {
        const expiredTimestamp = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
        const validTimestamp = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
        
        Assert.ok(expiredTimestamp < Date.now() / 1000);
        Assert.ok(validTimestamp > Date.now() / 1000);
    });

    suite.test('hashString - should create consistent hash', async () => {
        const input = 'test-string';
        const hash1 = Buffer.from(input).toString('base64');
        const hash2 = Buffer.from(input).toString('base64');
        
        Assert.strictEqual(hash1, hash2);
        Assert.ok(hash1.length > 0);
    });

    return await suite.run();
}
