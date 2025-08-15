#!/usr/bin/env node

// Global declarations for Node.js
declare const process: {
    exit: (code?: number) => never;
};

import { runUserControllerTests } from './controllers/user-controller.test.js';
import { runFriendshipControllerTests } from './controllers/friendship-controller.test.js';
import { runUserServiceTests } from './services/user-service.test.js';
import { runFriendshipServiceTests } from './services/friendship-service.test.js';
import { runLeaderboardServiceTests } from './services/leaderboard-service.test.js';
import { runProfileServiceTests } from './services/profile-service.test.js';
import { runUserEntityTests } from './entities/user-entity.test.js';
import { runFriendshipEntityTests } from './entities/friendship-entity.test.js';
import { runUserUtilsTests } from './utils/user-utils.test.js';

async function runAllTests() {
    console.log('👤 Starting User Service Test Suite');
    console.log('===================================\n');

    const results = [];

    try {
        console.log('🎮 Testing User Controllers...');
        const userControllerResults = await runUserControllerTests();
        results.push({ name: 'User Controllers', ...userControllerResults });

        const friendshipControllerResults = await runFriendshipControllerTests();
        results.push({ name: 'Friendship Controllers', ...friendshipControllerResults });

        console.log('⚙️  Testing User Services...');
        const userServiceResults = await runUserServiceTests();
        results.push({ name: 'User Services', ...userServiceResults });

        const friendshipServiceResults = await runFriendshipServiceTests();
        results.push({ name: 'Friendship Services', ...friendshipServiceResults });

        const leaderboardServiceResults = await runLeaderboardServiceTests();
        results.push({ name: 'Leaderboard Services', ...leaderboardServiceResults });

        const profileServiceResults = await runProfileServiceTests();
        results.push({ name: 'Profile Services', ...profileServiceResults });

        console.log('📦 Testing User Entities...');
        const userEntityResults = await runUserEntityTests();
        results.push({ name: 'User Entities', ...userEntityResults });

        const friendshipEntityResults = await runFriendshipEntityTests();
        results.push({ name: 'Friendship Entities', ...friendshipEntityResults });

        console.log('🔧 Testing User Utils...');
        const userUtilsResults = await runUserUtilsTests();
        results.push({ name: 'User Utils', ...userUtilsResults });

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
        console.log(`${status} ${result.name.padEnd(25)} ${result.passed}/${result.total} (${percentage}%)`);
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
