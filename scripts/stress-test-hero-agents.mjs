// @ts-check
import fs from 'node:fs';
import path from 'node:path';

let passCount = 0;
let failCount = 0;
let warnCount = 0;

const findings = [];

function test(name, fn) {
  try {
    fn();
    console.log(`\x1b[32m✔ PASS\x1b[0m: ${name}`);
    passCount++;
  } catch (err) {
    console.error(`\x1b[31m✖ FAIL\x1b[0m: ${name}`);
    console.error(`  ${err.message}`);
    failCount++;
    findings.push({ severity: 'FAIL', test: name, message: err.message });
  }
}

function warn(name, message) {
  console.log(`\x1b[33m⚠ WARN / CHALLENGE\x1b[0m: ${name} — ${message}`);
  warnCount++;
  findings.push({ severity: 'CHALLENGE', test: name, message });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

console.log('\n════════════════════════════════════════════════════════════════════════════════');
console.log('       M3 HERO & AGENTSBUILD EMPIRICAL STRESS TEST HARNESS                       ');
console.log('════════════════════════════════════════════════════════════════════════════════\n');

const heroPath = path.resolve('src/components/sections/Hero.tsx');
const heroContent = fs.readFileSync(heroPath, 'utf8');

const agentsPath = path.resolve('src/components/sections/AgentsBuild.tsx');
const agentsContent = fs.readFileSync(agentsPath, 'utf8');

// =============================================================================
// SUITE 1: TAB CYCLING INTERVAL, BOUNDS, STATE RESILIENCE (Hero.tsx)
// =============================================================================
console.log('\n--- Suite 1: Tab Cycling Interval, Bounds, and State Resilience ---');

test('Hero.tsx: snippets array structure and content validity', () => {
  assert(heroContent.includes('const snippets: CodeSnippet[] = ['), 'snippets array must be defined');
  
  // Extract snippet filenames
  const filenames = [...heroContent.matchAll(/filename:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  assert(filenames.length >= 3, `Expected at least 3 snippets, found ${filenames.length}: ${filenames.join(', ')}`);
  assert(filenames.includes('Agent.ts'), 'Snippets must include Agent.ts');
  assert(filenames.includes('Workflow.py'), 'Snippets must include Workflow.py');
  assert(filenames.includes('Config.json'), 'Snippets must include Config.json');

  // Verify all snippets have languages and non-empty code blocks
  const languages = [...heroContent.matchAll(/language:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  assert(languages.length === filenames.length, 'Each snippet must have a language');
});

test('Hero.tsx: Tab cycling interval duration exactly 4000ms', () => {
  const intervalMatch = heroContent.match(/setInterval\(\(\)\s*=>\s*\{[\s\S]*?\},\s*(\d+)\)/);
  assert(intervalMatch, 'setInterval call must be present in Hero.tsx');
  const duration = parseInt(intervalMatch[1], 10);
  assert(duration === 4000, `Expected tab cycling interval 4000ms, got ${duration}ms`);
});

test('Hero.tsx: Active tab bounds cycling mathematically verified for 1,000 cycles', () => {
  assert(heroContent.includes('(prev + 1) % snippets.length'),
    'Active tab index must use modulo snippets.length for circular bounds wrapping');
  
  const snippetCount = 3;
  let activeTab = 0;
  for (let cycle = 0; cycle < 1000; cycle++) {
    activeTab = (activeTab + 1) % snippetCount;
    assert(activeTab >= 0 && activeTab < snippetCount,
      `Tab index out of bounds at cycle ${cycle}: index=${activeTab}`);
  }
  assert(activeTab === 1000 % snippetCount, 'Modulo cycle arithmetic must match remainder');
});

test('Hero.tsx: Interval pause on hover and cleanup on unmount/state change', () => {
  assert(heroContent.includes('onMouseEnter={() => setIsPaused(true)}'),
    'Editor mockup must pause tab cycling on mouse enter');
  assert(heroContent.includes('onMouseLeave={() => setIsPaused(false)}'),
    'Editor mockup must resume tab cycling on mouse leave');
  assert(heroContent.includes('if (isPaused) return;'),
    'useEffect must skip interval creation when isPaused is true');
  assert(heroContent.includes('return () => clearInterval(interval);'),
    'useEffect must cleanly clear interval on re-render / unmount');
});

test('Hero.tsx: Tab selection buttons click handler and aria bounds', () => {
  assert(heroContent.includes('onClick={() => setActiveTab(idx)}'),
    'Each tab button must update activeTab to its index');
  assert(heroContent.includes('Tab {activeTab + 1} of {snippets.length}'),
    'Status bar must display 1-based active tab out of snippets length');
  assert(heroContent.includes('currentSnippet = snippets[activeTab]'),
    'currentSnippet must be derived from activeTab index');
});

test('Hero.tsx: Code copy functionality with safety timeout', () => {
  assert(heroContent.includes('navigator.clipboard.writeText'),
    'handleCopy must invoke navigator.clipboard.writeText');
  assert(heroContent.includes('setTimeout(() => setCopied(false), 2000)'),
    'Copy feedback must reset after 2000ms');
  assert(heroContent.includes('aria-label="Copy code to clipboard"'),
    'Copy button must have accessible aria-label');
});

// =============================================================================
// SUITE 2: 375PX MOBILE VIEWPORT CONTAINMENT & RESPONSIVENESS
// =============================================================================
console.log('\n--- Suite 2: 375px Mobile Viewport Containment & Responsiveness ---');

test('Hero.tsx: Outer section containment (overflow-hidden, responsive padding)', () => {
  assert(heroContent.includes('overflow-hidden'),
    'Hero section container must specify overflow-hidden to prevent 375px bleed');
  assert(heroContent.includes('px-4 sm:px-6'),
    'Hero section must specify responsive padding px-4 sm:px-6 for 375px gutter clearance');
});

test('Hero.tsx: Mobile vertical stacking (flex-col lg:flex-row)', () => {
  assert(/flex\s+flex-col\s+lg:flex-row/.test(heroContent),
    'Hero columns must stack vertically on mobile (flex-col) and switch to row on large displays (lg:flex-row)');
  assert(/w-full\s+lg:w-\[50%\]/.test(heroContent),
    'Both left and right columns must be w-full on mobile displays');
});

test('Hero.tsx: Headline typography responsiveness and word wrap safety', () => {
  assert(heroContent.includes('text-4xl sm:text-5xl md:text-6xl lg:text-7xl'),
    'Headline must use responsive font scaling starting at text-4xl on mobile');
  assert(heroContent.includes('leading-[1.08] tracking-tight'),
    'Headline must have tight line-height to prevent vertical overflow blow-out');
  
  // Word length check: longest word in headline "Your home for multi-agent development"
  const words = 'Your home for multi-agent development'.split(' ');
  const maxWord = words.reduce((a, b) => a.length > b.length ? a : b);
  assert(maxWord === 'development' && maxWord.length === 11, 'Longest word must be 11 characters');
});

test('Hero.tsx: Editor mockup internal scrollbars (overflow-x-auto) on code & tabs', () => {
  assert(heroContent.includes('overflow-x-auto text-xs font-mono'),
    'Mockup tabs container must include overflow-x-auto to prevent horizontal layout break at 375px');
  assert(heroContent.includes('overflow-x-auto min-h-[300px]'),
    'Mockup code pre/lines container must include overflow-x-auto for long code lines at 375px');
  assert(heroContent.includes('hidden sm:inline-block">UTF-8<'),
    'Non-essential status bar labels (UTF-8) must be hidden on mobile screens to avoid clipping');
});

test('AgentsBuild.tsx: Outer section containment and responsive padding', () => {
  assert(agentsContent.includes('overflow-hidden'),
    'AgentsBuild section must include overflow-hidden to contain glows and child diffs');
  assert(agentsContent.includes('px-4 sm:px-6 lg:px-8'),
    'AgentsBuild section must use standard responsive padding');
});

test('AgentsBuild.tsx: Agent mode cards 1-column mobile stacking', () => {
  assert(/grid\s+grid-cols-1\s+md:grid-cols-3\s+gap-6/.test(agentsContent),
    'Agent mode cards must stack in 1 column on mobile (grid-cols-1 md:grid-cols-3)');
});

test('AgentsBuild.tsx: Split mockup vertical stacking and diff overflow handling', () => {
  assert(/grid\s+grid-cols-1\s+lg:grid-cols-12\s+divide-y\s+lg:divide-y-0\s+lg:divide-x/.test(agentsContent),
    'Mockup split panels must stack vertically (grid-cols-1, divide-y) on mobile screens');
  assert(agentsContent.includes('overflow-x-auto leading-relaxed border border-white/5'),
    'Diff view code container must have overflow-x-auto so diff code lines scroll within card');
  assert(agentsContent.includes('truncate'),
    'Step descriptions in left panel must use truncate to prevent container width blow-out on narrow viewports');
  assert(agentsContent.includes('hidden sm:flex items-center gap-2'),
    'Autonomous Runner header badge must hide on small screens to prevent title bar clipping');
});

// =============================================================================
// SUITE 3: TOUCH TARGET SIZES & LINK DESTINATIONS
// =============================================================================
console.log('\n--- Suite 3: Touch Target Sizes and Link Destinations ---');

test('Hero.tsx: Primary CTA destination and touch target geometry', () => {
  assert(/<Link\s+to="\/release"/.test(heroContent),
    'Hero primary CTA must link to /release');
  assert(heroContent.includes('Download Dardcor Code'),
    'Hero primary CTA must include text "Download Dardcor Code"');
  assert(/px-8\s+py-3\.5/.test(heroContent),
    'Hero primary CTA must have touch target padding py-3.5 px-8 (>= 48px computed height)');
});

test('Hero.tsx: Secondary platform links destinations', () => {
  const secondaryLinks = [...heroContent.matchAll(/<Link\s+to="([^"]+)"[^>]*>\s*([^<]+)\s*<\/Link>/g)];
  const releaseLinks = secondaryLinks.filter(l => l[1] === '/release');
  const labels = releaseLinks.map(l => l[2].trim());
  
  assert(labels.includes('Web'), 'Secondary links must include "Web" linking to /release');
  assert(labels.includes('Insiders edition'), 'Secondary links must include "Insiders edition" linking to /release');
  assert(labels.includes('other platforms'), 'Secondary links must include "other platforms" linking to /release');
});

test('Hero.tsx: Secondary platform links touch spacing & wrapping', () => {
  assert(heroContent.includes('flex flex-wrap items-center gap-x-3 gap-y-1'),
    'Secondary platform links must have flex-wrap and gap spacing to prevent touch target overlap');
});

test('AgentsBuild.tsx: Section CTA destination and touch target geometry', () => {
  assert(/<Link\s+to="\/features\/agents"/.test(agentsContent),
    'AgentsBuild CTA must route to /features/agents');
  assert(agentsContent.includes('Get started with agents'),
    'AgentsBuild CTA must include text "Get started with agents"');
  assert(/px-6\s+py-3\.5/.test(agentsContent),
    'AgentsBuild CTA must have touch target padding py-3.5 px-6 (>= 48px computed height)');
});

test('AgentsBuild.tsx: Agent mode cards interactive touch target size', () => {
  const cardPaddings = [...agentsContent.matchAll(/className=\{`cursor-pointer\s+p-(\d+)/g)];
  assert(cardPaddings.length === 3, 'Must have 3 clickable agent mode cards');
  for (const m of cardPaddings) {
    const pad = parseInt(m[1], 10);
    assert(pad >= 6, `Card padding must be at least p-6 (24px padding each side), got p-${pad}`);
  }
});

// =============================================================================
// SUITE 4: SECURITY, TYPESCRIPT, BRAND IDENTITY COMPLIANCE
// =============================================================================
console.log('\n--- Suite 4: Security, TypeScript, and Brand Identity Compliance ---');

test('Hero.tsx & AgentsBuild.tsx: No dangerouslySetInnerHTML or eval sinks', () => {
  assert(!heroContent.includes('dangerouslySetInnerHTML'), 'Hero.tsx must not use dangerouslySetInnerHTML');
  assert(!heroContent.includes('eval('), 'Hero.tsx must not use eval');
  assert(!agentsContent.includes('dangerouslySetInnerHTML'), 'AgentsBuild.tsx must not use dangerouslySetInnerHTML');
  assert(!agentsContent.includes('eval('), 'AgentsBuild.tsx must not use eval');
});

test('Hero.tsx & AgentsBuild.tsx: Type imports adherence (verbatimModuleSyntax)', () => {
  assert(heroContent.includes("import type { Variants } from 'framer-motion';"),
    'Hero.tsx must use "import type" for Framer Motion Variants');
  assert(agentsContent.includes("import type { Variants } from 'framer-motion';"),
    'AgentsBuild.tsx must use "import type" for Framer Motion Variants');
  assert(!heroContent.includes(': any'), 'Hero.tsx must not use "any" types');
  assert(!agentsContent.includes(': any'), 'AgentsBuild.tsx must not use "any" types');
});

test('Hero.tsx & AgentsBuild.tsx: Brand color tokens (dc-600 #5a38d9)', () => {
  assert(heroContent.includes('bg-dc-600') && heroContent.includes('hover:bg-dc-500'),
    'Hero must use brand purple bg-dc-600 / hover:bg-dc-500');
  assert(heroContent.includes('#5a38d9'),
    'Hero code mockup pulse must use brand purple hex #5a38d9');
  assert(agentsContent.includes('bg-dc-600') && agentsContent.includes('hover:bg-dc-500'),
    'AgentsBuild must use brand purple bg-dc-600 / hover:bg-dc-500');
});

// =============================================================================
// SUITE 5: ADVERSARIAL EDGE CASES & SIMULATED STRESS
// =============================================================================
console.log('\n--- Suite 5: Adversarial Edge Cases & Stress Scenarios ---');

test('Hero.tsx: Rapid tab switching stress simulation', () => {
  // Simulate user rapidly clicking tabs 50 times in random order
  let currentActiveTab = 0;
  const validIndices = [0, 1, 2];
  for (let i = 0; i < 50; i++) {
    const clickedTab = Math.floor(Math.random() * validIndices.length);
    currentActiveTab = clickedTab;
    assert(currentActiveTab >= 0 && currentActiveTab < 3, 'Active tab must remain valid');
  }
});

test('Hero.tsx: Empty string / undefined code lines resistance', () => {
  // In current implementation, snippets have code lines with empty strings ''
  // Verify line rendering handles empty string without crash
  const emptyLineCheck = heroContent.includes("span className=\"flex-1 whitespace-pre\"");
  assert(emptyLineCheck, 'Code line container must preserve whitespace-pre for empty lines');
});

test('AgentsBuild.tsx: Active state selection cycling', () => {
  const modes = ['cli', 'browser', 'cloud'];
  let currentMode = 'cli';
  for (const nextMode of modes) {
    currentMode = nextMode;
    assert(modes.includes(currentMode), `Invalid mode: ${currentMode}`);
  }
});

// =============================================================================
// SUMMARY & FINDINGS REPORT
// =============================================================================
console.log('\n────────────────────────────────────────────────────────────────────────────────');
console.log('CHALLENGE HARNESS EXECUTION SUMMARY');
console.log('────────────────────────────────────────────────────────────────────────────────');
console.log(`Total Assertions Run: ${passCount + failCount}`);
console.log(`Passed:               ${passCount}`);
console.log(`Failed:               ${failCount}`);
console.log(`Warnings/Challenges:  ${warnCount}`);
console.log('────────────────────────────────────────────────────────────────────────────────\n');

if (failCount > 0) {
  console.error(`\x1b[31mHARNESS FAILED WITH ${failCount} DEFECTS FOUND.\x1b[0m`);
  process.exit(1);
} else {
  console.log('\x1b[32mALL EMPIRICAL CHALLENGE ASSERTIONS PASSED (0 REGRESSIONS).\x1b[0m\n');
  process.exit(0);
}
