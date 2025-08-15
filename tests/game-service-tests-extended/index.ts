#!/usr/bin/env node

// Global declarations for Node.js
declare const process: {
    exit: (code?: number) => never;
};

import { runWebSocketConnectionTests } from './websocket/websocket-connection.test.js';
import { runGameRoomTests } from './websocket/game-room.test.js';
import { runDomainEntitiesTests } from './domain/domain-entities.test.js';
import { runDomainServicesTests } from './domain/domain-services.test.js';

async function runAllTests() {
    console.log('🎮 Starting Extended Game Service Test Suite');
    console.log('===========================================\n');

    const results = [];

    try {
        console.log('🌐 Testing WebSocket Components...');
        const wsConnectionResults = await runWebSocketConnectionTests();
        results.push({ name: 'WebSocket Connection', ...wsConnectionResults });

        const gameRoomResults = await runGameRoomTests();
        results.push({ name: 'Game Room', ...gameRoomResults });

        console.log('📦 Testing Domain Layer...');
        const domainEntitiesResults = await runDomainEntitiesTests();
        results.push({ name: 'Domain Entities', ...domainEntitiesResults });

        const domainServicesResults = await runDomainServicesTests();
        results.push({ name: 'Domain Services', ...domainServicesResults });

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
