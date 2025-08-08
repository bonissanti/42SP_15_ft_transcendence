export class TestSuite {
    private tests: { name: string; fn: () => Promise<void> | void }[] = [];
    private passed = 0;
    private failed = 0;

    test(name: string, fn: () => Promise<void> | void) {
        this.tests.push({ name, fn });
    }

    async run() {
        console.log(`\n=== Running ${this.tests.length} tests ===\n`);
        
        for (const test of this.tests) {
            try {
                await test.fn();
                console.log(`✅ ${test.name}`);
                this.passed++;
            } catch (error) {
                console.log(`❌ ${test.name}`);
                console.log(`   Error: ${(error as Error).message}\n`);
                this.failed++;
            }
        }

        console.log(`\n=== Test Results ===`);
        console.log(`Passed: ${this.passed}`);
        console.log(`Failed: ${this.failed}`);
        console.log(`Total: ${this.tests.length}\n`);

        return { passed: this.passed, failed: this.failed, total: this.tests.length };
    }
}

export class Assert {
    static strictEqual(actual: any, expected: any, message?: string) {
        if (actual !== expected) {
            throw new Error(message || `Expected ${expected}, but got ${actual}`);
        }
    }

    static ok(value: any, message?: string) {
        if (!value) {
            throw new Error(message || `Expected truthy value, but got ${value}`);
        }
    }

    static fail(message?: string) {
        throw new Error(message || 'Test failed');
    }

    static throws(fn: () => any, message?: string) {
        try {
            fn();
            throw new Error(message || 'Expected function to throw');
        } catch (error) {
            // Expected to throw
        }
    }

    static async rejects(fn: () => Promise<any>, message?: string) {
        try {
            await fn();
            throw new Error(message || 'Expected function to reject');
        } catch (error) {
            // Expected to reject
        }
    }
}

export class TestHelper {
    static createMockElement(tagName: string, attributes: Record<string, string> = {}) {
        const element = {
            tagName: tagName.toUpperCase(),
            attributes: attributes,
            innerHTML: '',
            textContent: '',
            addEventListener: () => {},
            removeEventListener: () => {},
            appendChild: () => {},
            removeChild: () => {},
            querySelector: () => null,
            querySelectorAll: () => [],
            classList: {
                add: () => {},
                remove: () => {},
                contains: () => false,
                toggle: () => false
            }
        };
        return element;
    }

    static createMockWindow() {
        return {
            location: {
                href: 'http://localhost:3000',
                pathname: '/',
                search: '',
                hash: ''
            },
            history: {
                pushState: () => {},
                replaceState: () => {},
                back: () => {},
                forward: () => {}
            },
            localStorage: {
                getItem: () => null,
                setItem: () => {},
                removeItem: () => {},
                clear: () => {}
            },
            sessionStorage: {
                getItem: () => null,
                setItem: () => {},
                removeItem: () => {},
                clear: () => {}
            }
        };
    }

    static createMockEvent(type: string, properties: Record<string, any> = {}) {
        return {
            type,
            preventDefault: () => {},
            stopPropagation: () => {},
            target: null,
            currentTarget: null,
            ...properties
        };
    }

    static createMockFetchResponse(data: any, status = 200) {
        return {
            ok: status >= 200 && status < 300,
            status,
            json: async () => data,
            text: async () => JSON.stringify(data),
            headers: new Map()
        };
    }
}
