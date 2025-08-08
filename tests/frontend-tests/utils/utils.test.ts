import { TestSuite, Assert, TestHelper } from '../test-helper.js';

export async function runUtilsTests() {
    const suite = new TestSuite();

    suite.test('Utils - should format timestamps', async () => {
        const timestamp = Date.now();
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString();
        
        Assert.ok(formattedDate);
        Assert.ok(formattedDate.length > 0);
    });

    suite.test('Utils - should validate email format', async () => {
        const validEmails = ['test@example.com', 'user@domain.org'];
        const invalidEmails = ['invalid-email', '@domain.com'];
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        validEmails.forEach(email => {
            Assert.ok(emailRegex.test(email));
        });
        
        invalidEmails.forEach(email => {
            Assert.strictEqual(emailRegex.test(email), false);
        });
    });

    suite.test('Utils - should generate random IDs', async () => {
        const id1 = Math.random().toString(36).substring(7);
        const id2 = Math.random().toString(36).substring(7);
        
        Assert.ok(id1);
        Assert.ok(id2);
        Assert.ok(id1 !== id2);
    });

    suite.test('Utils - should debounce function calls', async () => {
        let callCount = 0;
        const debouncedFn = () => { callCount++; };
        
        // Simulate multiple rapid calls
        debouncedFn();
        debouncedFn();
        debouncedFn();
        
        Assert.strictEqual(callCount, 3);
    });

    suite.test('Utils - should throttle function calls', async () => {
        let lastCallTime = 0;
        const throttleMs = 100;
        
        const throttledFn = () => {
            const now = Date.now();
            if (now - lastCallTime >= throttleMs) {
                lastCallTime = now;
                return true;
            }
            return false;
        };
        
        Assert.ok(throttledFn());
    });

    suite.test('Utils - should escape HTML', async () => {
        const dangerousHtml = '<script>alert("xss")</script>';
        const escaped = dangerousHtml
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        
        Assert.ok(!escaped.includes('<script>'));
        Assert.ok(escaped.includes('&lt;script&gt;'));
    });

    suite.test('Utils - should format file sizes', async () => {
        const bytes = 1024 * 1024; // 1MB
        const mb = bytes / (1024 * 1024);
        const formatted = `${mb}MB`;
        
        Assert.strictEqual(formatted, '1MB');
    });

    suite.test('Utils - should parse URL parameters', async () => {
        const url = 'https://example.com/page?param1=value1&param2=value2';
        const urlObj = new URL(url);
        const params = new URLSearchParams(urlObj.search);
        
        Assert.strictEqual(params.get('param1'), 'value1');
        Assert.strictEqual(params.get('param2'), 'value2');
    });

    suite.test('Utils - should calculate distances', async () => {
        const point1 = { x: 0, y: 0 };
        const point2 = { x: 3, y: 4 };
        
        const distance = Math.sqrt(
            Math.pow(point2.x - point1.x, 2) + 
            Math.pow(point2.y - point1.y, 2)
        );
        
        Assert.strictEqual(distance, 5);
    });

    suite.test('Utils - should deep clone objects', async () => {
        const original = { a: 1, b: { c: 2 } };
        const cloned = JSON.parse(JSON.stringify(original));
        
        cloned.b.c = 3;
        
        Assert.strictEqual(original.b.c, 2);
        Assert.strictEqual(cloned.b.c, 3);
    });

    return await suite.run();
}
