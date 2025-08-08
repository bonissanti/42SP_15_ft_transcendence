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
    static createMockFastifyReply() {
        const reply = {
            code: (statusCode: number) => reply,
            send: (payload: any) => payload,
            status: 200,
            payload: null as any
        };
        return reply;
    }

    static createMockPrismaClient() {
        return {
            user: {
                create: async (data: any) => ({ 
                    userUuid: 'test-uuid',
                    ...data.data 
                }),
                findUnique: async (query: any) => null,
                findMany: async (query: any) => [],
                update: async (data: any) => ({ 
                    userUuid: 'test-uuid',
                    ...data.data 
                }),
                delete: async (query: any) => ({ 
                    userUuid: 'test-uuid' 
                })
            },
            $disconnect: async () => {}
        };
    }

    static async expectError(fn: () => Promise<any>, expectedMessage?: string) {
        try {
            await fn();
            Assert.fail('Expected function to throw an error');
        } catch (error) {
            if (expectedMessage) {
                Assert.strictEqual((error as Error).message, expectedMessage);
            }
        }
    }

    static expectSuccess(result: any) {
        Assert.strictEqual(result.IsSuccess, true);
    }

    static expectFailure(result: any, expectedMessage?: string) {
        Assert.strictEqual(result.IsSuccess, false);
        if (expectedMessage) {
            Assert.ok(result.Message.includes(expectedMessage));
        }
    }

    static generateRandomEmail() {
        return `test${Math.random().toString(36).substring(7)}@example.com`;
    }

    static generateRandomPassword() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
