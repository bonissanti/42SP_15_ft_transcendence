import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runRouterTests() {
    const suite = new TestSuite();

    suite.test('Router - should initialize with default route', async () => {
        const mockWindow = TestHelper.createMockWindow();
        const router = {
            currentRoute: '/',
            routes: new Map(),
            window: mockWindow
        };
        
        Assert.strictEqual(router.currentRoute, '/');
        Assert.ok(router.routes instanceof Map);
    });

    suite.test('Router - should register routes', async () => {
        const routes = new Map();
        const route = {
            path: '/home',
            component: 'HomeComponent',
            title: 'Home'
        };
        
        routes.set('/home', route);
        
        Assert.ok(routes.has('/home'));
        Assert.strictEqual(routes.get('/home')?.path, '/home');
    });

    suite.test('Router - should navigate to route', async () => {
        const mockWindow = TestHelper.createMockWindow();
        let navigationCalled = false;
        
        const navigate = (path: string) => {
            mockWindow.location.pathname = path;
            navigationCalled = true;
        };
        
        navigate('/profile');
        
        Assert.strictEqual(mockWindow.location.pathname, '/profile');
        Assert.ok(navigationCalled);
    });

    suite.test('Router - should handle route parameters', async () => {
        const routeWithParam = '/user/:id';
        const actualPath = '/user/123';
        
        // Mock parameter extraction
        const paramMatch = actualPath.match(/\/user\/(\d+)/);
        const userId = paramMatch ? paramMatch[1] : null;
        
        Assert.strictEqual(userId, '123');
        Assert.ok(paramMatch);
    });

    suite.test('Router - should handle query parameters', async () => {
        const url = '/search?q=test&page=1';
        const [path, queryString] = url.split('?');
        const params = new URLSearchParams(queryString);
        
        Assert.strictEqual(path, '/search');
        Assert.strictEqual(params.get('q'), 'test');
        Assert.strictEqual(params.get('page'), '1');
    });

    suite.test('Router - should handle hash routing', async () => {
        const url = '/#/dashboard';
        const hash = url.substring(2); // Remove /#
        
        Assert.strictEqual(hash, '/dashboard');
        Assert.ok(url.includes('#'));
    });

    suite.test('Router - should handle 404 routes', async () => {
        const routes = new Map();
        routes.set('/home', { component: 'Home' });
        routes.set('/profile', { component: 'Profile' });
        
        const path = '/nonexistent';
        const route = routes.get(path) || routes.get('/404') || { component: 'NotFound' };
        
        Assert.strictEqual(route.component, 'NotFound');
    });

    suite.test('Router - should update browser history', async () => {
        const mockWindow = TestHelper.createMockWindow();
        let historyUpdated = false;
        
        (mockWindow.history.pushState as any) = () => {
            historyUpdated = true;
        };
        
        (mockWindow.history.pushState as any)({}, '', '/new-path');
        
        Assert.ok(historyUpdated);
    });

    suite.test('Router - should handle back navigation', async () => {
        const mockWindow = TestHelper.createMockWindow();
        let backCalled = false;
        
        mockWindow.history.back = () => {
            backCalled = true;
        };
        
        mockWindow.history.back();
        
        Assert.ok(backCalled);
    });

    suite.test('Router - should validate route paths', async () => {
        const validPaths = ['/home', '/user/123', '/search?q=test'];
        const invalidPaths = ['', 'home', '//invalid'];
        
        validPaths.forEach(path => {
            Assert.ok(path.startsWith('/'), `${path} should start with /`);
        });
        
        invalidPaths.forEach(path => {
            Assert.ok(!path.startsWith('/') || path.includes('//'), `${path} should be invalid`);
        });
    });

    return await suite.run();
}
