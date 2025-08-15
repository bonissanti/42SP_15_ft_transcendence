#!/usr/bin/env node

// Global declarations for Node.js
declare const process: {
    exit: (code?: number) => never;
};

import { runRouterTests } from './core/router.test.js';
import { runViewTests } from './core/view.test.js';
import { runApiTests } from './api/api.test.js';
import { runAuthTests } from './auth/auth.test.js';
import { runPongGameTests } from './pong/pong-game.test.js';
import { runPongTournamentTests } from './pong/pong-tournament.test.js';
import { runRpsGameTests } from './rps/rps-game.test.js';
import { runLanguageSwitcherTests } from './components/lang-switcher.test.js';
import { runProfileLinkTests } from './components/profile-link.test.js';
import { runUtilsTests } from './utils/utils.test.js';

async function runAllTests() {
    console.log('🌐 Starting Frontend Test Suite');
    console.log('===============================\n');

    const results = [];

    try {
        console.log('🧭 Testing Core Components...');
        const routerResults = await runRouterTests();
        results.push({ name: 'Router', ...routerResults });

        const viewResults = await runViewTests();
        results.push({ name: 'View', ...viewResults });

        console.log('🔌 Testing API Layer...');
        const apiResults = await runApiTests();
        results.push({ name: 'API', ...apiResults });

        console.log('🔐 Testing Authentication...');
        const authResults = await runAuthTests();
        results.push({ name: 'Auth', ...authResults });

        console.log('🏓 Testing Pong Game...');
        const pongGameResults = await runPongGameTests();
        results.push({ name: 'Pong Game', ...pongGameResults });

        const pongTournamentResults = await runPongTournamentTests();
        results.push({ name: 'Pong Tournament', ...pongTournamentResults });

        console.log('🎯 Testing RPS Game...');
        const rpsGameResults = await runRpsGameTests();
        results.push({ name: 'RPS Game', ...rpsGameResults });

        console.log('🧩 Testing Components...');
        const langSwitcherResults = await runLanguageSwitcherTests();
        results.push({ name: 'Language Switcher', ...langSwitcherResults });

        const profileLinkResults = await runProfileLinkTests();
        results.push({ name: 'Profile Link', ...profileLinkResults });

        console.log('🛠️  Testing Utils...');
        const utilsResults = await runUtilsTests();
        results.push({ name: 'Utils', ...utilsResults });

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
