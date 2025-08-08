#!/usr/bin/env node

// Global declarations for Node.js
declare const process: {
    exit: (code?: number) => never;
};

import { runAuthRoutesTests } from './routes/auth-routes.test.js';
import { runAuthServiceTests } from './services/auth-service.test.js';
import { runPasswordServiceTests } from './services/password-service.test.js';
import { runTokenServiceTests } from './services/token-service.test.js';
import { runAuthUtilsTests } from './utils/auth-utils.test.js';
import { runAuthMiddlewareTests } from './middleware/auth-middleware.test.js';

async function runAllTests() {
    console.log('🔐 Starting Auth Service Test Suite');
    console.log('===================================\n');

    const results = [];

    try {
        console.log('🛣️  Testing Auth Routes...');
        const routesResults = await runAuthRoutesTests();
        results.push({ name: 'Auth Routes', ...routesResults });

        console.log('⚙️  Testing Auth Services...');
        const serviceResults = await runAuthServiceTests();
        results.push({ name: 'Auth Services', ...serviceResults });

        const passwordServiceResults = await runPasswordServiceTests();
        results.push({ name: 'Password Services', ...passwordServiceResults });

        const tokenServiceResults = await runTokenServiceTests();
        results.push({ name: 'Token Services', ...tokenServiceResults });

        console.log('🔧 Testing Auth Utils...');
        const utilsResults = await runAuthUtilsTests();
        results.push({ name: 'Auth Utils', ...utilsResults });

        console.log('🛡️  Testing Auth Middleware...');
        const middlewareResults = await runAuthMiddlewareTests();
        results.push({ name: 'Auth Middleware', ...middlewareResults });

    } catch (error) {
        console.error('❌ Error running tests:', error);
        process.exit(1);
    }

    // Calculate totals
    const totals = results.reduce(
        (acc, result) => ({
            passed: acc.passed + result.passed,
            failed: acc.failed + result.failed,
            total: acc.total + result.total
        }),
        { passed: 0, failed: 0, total: 0 }
    );

    // Print detailed results
    console.log('\n🏆 FINAL TEST RESULTS');
    console.log('=====================\n');

    results.forEach(result => {
        const status = result.failed === 0 ? '✅' : '❌';
        const percentage = result.total > 0 ? ((result.passed / result.total) * 100).toFixed(1) : '0.0';
        console.log(`${status} ${result.name.padEnd(20)} ${result.passed}/${result.total} (${percentage}%)`);
    });

    console.log('\n' + '='.repeat(50));
    const overallPercentage = totals.total > 0 ? ((totals.passed / totals.total) * 100).toFixed(1) : '0.0';
    const overallStatus = totals.failed === 0 ? '🎉' : '⚠️';
    
    console.log(`${overallStatus} OVERALL: ${totals.passed}/${totals.total} tests passed (${overallPercentage}%)`);
    
    if (totals.failed > 0) {
        console.log(`❌ ${totals.failed} tests failed`);
    } else {
        console.log('🎉 All tests passed!');
    }

    console.log('='.repeat(50));

    // Exit with appropriate code
    process.exit(totals.failed > 0 ? 1 : 0);
}

// Run tests
runAllTests().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
