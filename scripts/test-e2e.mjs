#!/usr/bin/env node
// @ts-check
import { registry, colors, symbols } from './test-utils.mjs';
import { registerTier1Tests } from './test-suites/tier1-feature-coverage.mjs';
import { registerTier2Tests } from './test-suites/tier2-boundary-cases.mjs';
import { registerTier3Tests } from './test-suites/tier3-cross-feature.mjs';
import { registerTier4Tests } from './test-suites/tier4-workload-scenarios.mjs';

// Parse command-line arguments
const args = process.argv.slice(2);
const filter = {
  tier: null,
  milestone: null,
  area: null,
  search: null,
  json: false,
  bail: false,
};

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--tier' && args[i + 1]) {
    filter.tier = parseInt(args[++i], 10);
  } else if (arg === '--milestone' && args[i + 1]) {
    filter.milestone = args[++i];
  } else if (arg === '--area' && args[i + 1]) {
    filter.area = args[++i];
  } else if ((arg === '--grep' || arg === '-g') && args[i + 1]) {
    filter.search = args[++i];
  } else if (arg === '--json') {
    filter.json = true;
  } else if (arg === '--bail' || arg === '-b') {
    filter.bail = true;
  } else if (arg === '--help' || arg === '-h') {
    printHelp();
    process.exit(0);
  }
}

function printHelp() {
  console.log(`
${colors.bold}${colors.cyan}Dardcor Code E2E Test Runner${colors.reset}

Usage:
  node scripts/test-e2e.mjs [options]

Options:
  --tier <1|2|3|4>        Run only tests in the specified tier
  --milestone <M1..M6>    Filter tests by project milestone (e.g. M1, M2, M3)
  --area <name>           Filter tests by feature area
  --grep, -g <pattern>    Filter tests by ID or name substring
  --bail, -b              Stop immediately after first failure
  --json                  Output test results as JSON
  --help, -h              Show this help message
`);
}

// Register all test suites
registerTier1Tests();
registerTier2Tests();
registerTier3Tests();
registerTier4Tests();

async function main() {
  const tests = registry.getTests(filter);

  if (tests.length === 0) {
    console.log(`${colors.yellow}No tests matched the specified filter criteria.${colors.reset}`);
    process.exit(0);
  }

  if (!filter.json) {
    console.log(`\n${colors.bold}${colors.cyan}════════════════════════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bold}${colors.cyan}         DARDCOR CODE E2E AUTOMATED VERIFICATION SUITE                          ${colors.reset}`);
    console.log(`${colors.bold}${colors.cyan}════════════════════════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.dim}Total Registered Tests: ${registry.tests.length} | Selected: ${tests.length}${colors.reset}`);
    if (filter.tier) console.log(`${colors.dim}Filter Tier: ${filter.tier}${colors.reset}`);
    if (filter.milestone) console.log(`${colors.dim}Filter Milestone: ${filter.milestone.toUpperCase()}${colors.reset}`);
    console.log(`${colors.dim}Timestamp: ${new Date().toISOString()}${colors.reset}\n`);
  }

  const results = [];
  let passedCount = 0;
  let failedCount = 0;
  const startTime = Date.now();

  let currentTier = null;
  for (const test of tests) {
    if (!filter.json && test.tier !== currentTier) {
      currentTier = test.tier;
      const tierTitles = {
        1: 'Tier 1: Feature Coverage (>=5 tests per feature area)',
        2: 'Tier 2: Boundary & Corner Cases (>=5 tests per area, 375px, API errors)',
        3: 'Tier 3: Cross-Feature Combinations (Pairwise navigation & layout)',
        4: 'Tier 4: Real-World Workload Scenarios (Download journey & security audit)',
      };
      console.log(`\n${colors.bold}${colors.magenta}━━━ ${tierTitles[currentTier] || `Tier ${currentTier}`} ━━━${colors.reset}`);
    }

    const testStart = Date.now();
    let status = 'pass';
    let error = null;

    try {
      await test.fn();
      passedCount++;
      const duration = Date.now() - testStart;
      if (!filter.json) {
        console.log(`  ${colors.green}${symbols.pass}${colors.reset} [${test.milestone}] ${test.id} ${test.name} ${colors.dim}(${duration}ms)${colors.reset}`);
      }
    } catch (err) {
      status = 'fail';
      failedCount++;
      error = {
        message: err.message,
        stack: err.stack,
        details: err.details || null,
      };
      const duration = Date.now() - testStart;
      if (!filter.json) {
        console.log(`  ${colors.red}${symbols.fail}${colors.reset} [${test.milestone}] ${test.id} ${test.name} ${colors.dim}(${duration}ms)${colors.reset}`);
        console.log(`     ${colors.red}Error: ${err.message}${colors.reset}`);
      }

      if (filter.bail) {
        break;
      }
    }

    results.push({
      id: test.id,
      name: test.name,
      tier: test.tier,
      milestone: test.milestone,
      area: test.area,
      status,
      durationMs: Date.now() - testStart,
      error,
    });
  }

  const totalDuration = Date.now() - startTime;

  if (filter.json) {
    const output = {
      summary: {
        total: tests.length,
        passed: passedCount,
        failed: failedCount,
        durationMs: totalDuration,
        timestamp: new Date().toISOString(),
      },
      results,
    };
    console.log(JSON.stringify(output, null, 2));
    process.exit(failedCount > 0 ? 1 : 0);
  }

  // Summary Table Output
  console.log(`\n${colors.bold}────────────────────────────────────────────────────────────────────────────────${colors.reset}`);
  console.log(`${colors.bold}TEST SUITE SUMMARY${colors.reset}`);
  console.log(`────────────────────────────────────────────────────────────────────────────────`);
  console.log(`Total Executed: ${tests.length}`);
  console.log(`Passed:         ${colors.green}${passedCount}${colors.reset}`);
  console.log(`Failed:         ${failedCount > 0 ? colors.red : colors.dim}${failedCount}${colors.reset}`);
  console.log(`Duration:       ${totalDuration}ms`);

  // Tier Breakdown
  console.log(`\n${colors.bold}Breakdown by Tier:${colors.reset}`);
  for (let t = 1; t <= 4; t++) {
    const tierTests = results.filter((r) => r.tier === t);
    if (tierTests.length > 0) {
      const p = tierTests.filter((r) => r.status === 'pass').length;
      const f = tierTests.filter((r) => r.status === 'fail').length;
      const color = f === 0 ? colors.green : colors.yellow;
      console.log(`  Tier ${t}: ${p}/${tierTests.length} passed ${color}(${f} failing)${colors.reset}`);
    }
  }

  // Milestone Breakdown
  console.log(`\n${colors.bold}Breakdown by Project Milestone:${colors.reset}`);
  const milestones = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'];
  for (const m of milestones) {
    const mTests = results.filter((r) => r.milestone === m);
    if (mTests.length > 0) {
      const p = mTests.filter((r) => r.status === 'pass').length;
      const f = mTests.filter((r) => r.status === 'fail').length;
      const color = f === 0 ? colors.green : colors.yellow;
      console.log(`  ${m}: ${p}/${mTests.length} passed ${color}(${f} failing)${colors.reset}`);
    }
  }

  if (failedCount > 0) {
    console.log(`\n${colors.yellow}ℹ Note: Tests for unimplemented milestone features are expected to fail until those milestones are implemented.${colors.reset}`);
    console.log(`${colors.yellow}  Implementing agents can verify their milestones with: node scripts/test-e2e.mjs --milestone <M1..M6>${colors.reset}\n`);
  }

  process.exit(failedCount > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(`${colors.red}Fatal test runner error:${colors.reset}`, err);
  process.exit(2);
});
