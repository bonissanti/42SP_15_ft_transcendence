#!/usr/bin/env node

// Global declarations for Node.js
declare const process: {
    exit: (code?: number) => never;
};

import { runTournamentEntityTests } from './entities/tournament.entity.test.js';
import { runHistoryEntityTests } from './entities/history.entity.test.js';
import { runDTOTests } from './dto/dto.test.js';
import { runValidatorTests } from './validators/validator.test.js';
import { runServiceTests } from './services/service.test.js';
import { runControllerTests } from './controllers/controller.test.js';
import { runUtilsTests } from './utils/utils.test.js';
import { runGameTests } from './game/game.test.js';

async function runAllTests() {
    console.log('🚀 Starting Game Service Test Suite');
    console.log('=====================================\n');

    const results = [];

    try {
        console.log('📦 Testing Entities...');
        const tournamentEntityResults = await runTournamentEntityTests();
        results.push({ name: 'Tournament Entity', ...tournamentEntityResults });

        const historyEntityResults = await runHistoryEntityTests();
        results.push({ name: 'History Entity', ...historyEntityResults });

        console.log('📋 Testing DTOs...');
        const dtoResults = await runDTOTests();
        results.push({ name: 'DTOs', ...dtoResults });

        console.log('✅ Testing Validators...');
        const validatorResults = await runValidatorTests();
        results.push({ name: 'Validators', ...validatorResults });

        console.log('⚙️  Testing Services...');
        const serviceResults = await runServiceTests();
        results.push({ name: 'Services', ...serviceResults });

        console.log('🎮 Testing Controllers...');
        const controllerResults = await runControllerTests();
        results.push({ name: 'Controllers', ...controllerResults });

        console.log('🔧 Testing Utils...');
        const utilsResults = await runUtilsTests();
        results.push({ name: 'Utils', ...utilsResults });

        console.log('🎯 Testing Game Engine...');
        const gameResults = await runGameTests();
        results.push({ name: 'Game Engine', ...gameResults });

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
