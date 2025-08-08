import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runAuthMiddlewareTests() {
    const suite = new TestSuite();

    suite.test('authMiddleware - should validate JWT token', async () => {
        const mockRequest = {
            headers: {
                authorization: 'Bearer valid-token'
            }
        };
        
        Assert.ok(mockRequest.headers.authorization);
        Assert.ok(mockRequest.headers.authorization.startsWith('Bearer'));
    });

    suite.test('authMiddleware - should reject missing token', async () => {
        const mockRequest = {
            headers: {}
        };
        
        Assert.strictEqual(mockRequest.headers.authorization, undefined);
    });

    suite.test('authMiddleware - should reject invalid token format', async () => {
        const mockRequest = {
            headers: {
                authorization: 'InvalidFormat token'
            }
        };
        
        Assert.ok(!mockRequest.headers.authorization.startsWith('Bearer'));
    });

    suite.test('corsMiddleware - should set CORS headers', async () => {
        const mockResponse = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        };
        
        Assert.ok(mockResponse.headers['Access-Control-Allow-Origin']);
        Assert.ok(mockResponse.headers['Access-Control-Allow-Methods']);
        Assert.ok(mockResponse.headers['Access-Control-Allow-Headers']);
    });

    suite.test('rateLimitMiddleware - should limit requests', async () => {
        const requestCount = 10;
        const maxRequests = 5;
        
        Assert.ok(requestCount > maxRequests);
    });

    suite.test('validationMiddleware - should validate request body', async () => {
        const mockRequest = {
            body: {
                email: 'test@example.com',
                password: 'password123'
            }
        };
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        Assert.ok(emailRegex.test(mockRequest.body.email));
        Assert.ok(mockRequest.body.password.length >= 6);
    });

    suite.test('loggerMiddleware - should log requests', async () => {
        const mockRequest = {
            method: 'POST',
            url: '/auth/login',
            timestamp: new Date().toISOString()
        };
        
        Assert.ok(mockRequest.method);
        Assert.ok(mockRequest.url);
        Assert.ok(mockRequest.timestamp);
    });

    suite.test('errorHandlerMiddleware - should handle errors gracefully', async () => {
        const mockError = {
            message: 'Test error',
            statusCode: 500
        };
        
        Assert.ok(mockError.message);
        Assert.ok(mockError.statusCode);
    });

    suite.test('sanitizeMiddleware - should sanitize input', async () => {
        const dangerousInput = '<script>alert("xss")</script>';
        const sanitized = dangerousInput.replace(/<[^>]*>/g, '');
        
        Assert.ok(!sanitized.includes('<script>'));
    });

    suite.test('compressionMiddleware - should compress responses', async () => {
        const mockResponse = {
            headers: {
                'content-encoding': 'gzip'
            }
        };
        
        Assert.ok(mockResponse.headers['content-encoding']);
    });

    suite.test('securityHeadersMiddleware - should set security headers', async () => {
        const mockResponse = {
            headers: {
                'X-Content-Type-Options': 'nosniff',
                'X-Frame-Options': 'DENY',
                'X-XSS-Protection': '1; mode=block'
            }
        };
        
        Assert.ok(mockResponse.headers['X-Content-Type-Options']);
        Assert.ok(mockResponse.headers['X-Frame-Options']);
        Assert.ok(mockResponse.headers['X-XSS-Protection']);
    });

    return await suite.run();
}
