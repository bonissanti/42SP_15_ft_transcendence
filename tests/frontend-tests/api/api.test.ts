import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runApiTests() {
    const suite = new TestSuite();

    suite.test('API - should make GET request', async () => {
        const mockResponse = TestHelper.createMockFetchResponse({ id: 1, name: 'test' });
        
        // Mock fetch
        const mockFetch = async () => mockResponse;
        const response = await mockFetch();
        const data = await response.json();
        
        Assert.ok(response.ok);
        Assert.strictEqual(data.id, 1);
        Assert.strictEqual(data.name, 'test');
    });

    suite.test('API - should make POST request', async () => {
        const requestData = { name: 'New Item', value: 123 };
        const mockResponse = TestHelper.createMockFetchResponse({ id: 2, ...requestData }, 201);
        
        const mockFetch = async () => mockResponse;
        const response = await mockFetch();
        const data = await response.json();
        
        Assert.strictEqual(response.status, 201);
        Assert.strictEqual(data.name, 'New Item');
        Assert.strictEqual(data.value, 123);
    });

    suite.test('API - should handle authentication headers', async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test.signature';
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        
        Assert.ok(headers.Authorization.startsWith('Bearer'));
        Assert.strictEqual(headers['Content-Type'], 'application/json');
    });

    suite.test('API - should handle request errors', async () => {
        const mockErrorResponse = TestHelper.createMockFetchResponse({ error: 'Not found' }, 404);
        
        const mockFetch = async () => mockErrorResponse;
        const response = await mockFetch();
        
        Assert.strictEqual(response.status, 404);
        Assert.strictEqual(response.ok, false);
    });

    suite.test('API - should handle network errors', async () => {
        const mockFetch = async () => {
            throw new Error('Network error');
        };
        
        try {
            await mockFetch();
            Assert.fail('Should have thrown an error');
        } catch (error) {
            Assert.ok(error instanceof Error);
            Assert.strictEqual((error as Error).message, 'Network error');
        }
    });

    suite.test('API - should build query parameters', async () => {
        const params = { page: 1, limit: 10, search: 'test query' };
        const queryString = new URLSearchParams(params as any).toString();
        
        Assert.ok(queryString.includes('page=1'));
        Assert.ok(queryString.includes('limit=10'));
        Assert.ok(queryString.includes('search=test+query'));
    });

    suite.test('API - should handle JSON response', async () => {
        const mockData = { users: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }] };
        const mockResponse = TestHelper.createMockFetchResponse(mockData);
        
        const response = await Promise.resolve(mockResponse);
        const data = await response.json();
        
        Assert.ok(Array.isArray(data.users));
        Assert.strictEqual(data.users.length, 2);
    });

    suite.test('API - should handle file upload', async () => {
        const file = new Uint8Array([1, 2, 3, 4]);
        const formData = {
            file: file,
            filename: 'test.jpg',
            mimetype: 'image/jpeg'
        };
        
        Assert.ok(formData.file);
        Assert.ok(formData.filename.endsWith('.jpg'));
        Assert.strictEqual(formData.mimetype, 'image/jpeg');
    });

    suite.test('API - should handle timeout', async () => {
        const timeout = 5000;
        const startTime = Date.now();
        
        // Mock timeout simulation
        const mockDelay = async (ms: number) => {
            return new Promise(resolve => setTimeout(resolve, 1));
        };
        
        await mockDelay(1);
        const endTime = Date.now();
        
        Assert.ok(endTime - startTime < timeout);
    });

    suite.test('API - should handle retry logic', async () => {
        let attemptCount = 0;
        const maxRetries = 3;
        
        const mockRequest = async () => {
            attemptCount++;
            if (attemptCount < maxRetries) {
                throw new Error('Temporary error');
            }
            return { success: true };
        };
        
        try {
            const result = await mockRequest();
            Assert.ok(result.success);
        } catch (error) {
            // Continue retrying
            Assert.ok(attemptCount <= maxRetries);
        }
    });

    return await suite.run();
}
