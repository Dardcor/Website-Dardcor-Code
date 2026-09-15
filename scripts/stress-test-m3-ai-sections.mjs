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

function challenge(name, message, details = '') {
  console.log(`\x1b[33m⚠ CHALLENGE\x1b[0m: ${name} — ${message}`);
  warnCount++;
  findings.push({ severity: 'CHALLENGE', test: name, message, details });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

console.log('\n════════════════════════════════════════════════════════════════════════════════');
console.log('  M3 EMPIRICAL CHALLENGER 2: MULTISURFACE, SESSIONSVIEW & CUSTOMIZATIONSECTION  ');
console.log('════════════════════════════════════════════════════════════════════════════════\n');

const multiSurfacePath = path.resolve('src/components/sections/MultiSurface.tsx');
const sessionsViewPath = path.resolve('src/components/sections/SessionsView.tsx');
const customizationPath = path.resolve('src/components/sections/CustomizationSection.tsx');
const navbarPath = path.resolve('src/components/layout/Navbar.tsx');

const multiSurfaceContent = fs.readFileSync(multiSurfacePath, 'utf8');
const sessionsViewContent = fs.readFileSync(sessionsViewPath, 'utf8');
const customizationContent = fs.readFileSync(customizationPath, 'utf8');
const navbarContent = fs.readFileSync(navbarPath, 'utf8');

// =============================================================================
// SUITE 1: SESSIONSVIEW DATA INTEGRITY, FILTERS, SEARCH & STATUS BADGES
// =============================================================================
console.log('\n--- Suite 1: SessionsView Data, State Filters, Search & Status Badges ---');

// Parse sessionsData from file
const sessionBlocks = [...sessionsViewContent.matchAll(/\{\s*id:\s*['"]([^'"]+)['"],\s*task:\s*['"]([^'"]+)['"],\s*agent:\s*['"]([^'"]+)['"],[\s\S]*?status:\s*['"]([^'"]+)['"]/g)];
assert(sessionBlocks.length >= 4, 'Could not extract sessionsData blocks from SessionsView.tsx');

const sessionsData = sessionBlocks.map(m => ({
  id: m[1],
  task: m[2],
  agent: m[3],
  status: m[4],
}));

test('SessionsView: session dataset contains all required statuses', () => {
  assert(sessionsData && sessionsData.length >= 4, `Expected >= 4 sessions, found ${sessionsData.length}`);
  const statuses = sessionsData.map(s => s.status);
  assert(statuses.includes('running'), 'Dataset must include running sessions');
  assert(statuses.includes('completed'), 'Dataset must include completed sessions');
  assert(statuses.includes('failed'), 'Dataset must include failed sessions');
});

test('SessionsView: filter buttons support all 4 states (all, running, completed, failed)', () => {
  const filterKeysMatch = sessionsViewContent.includes("['all', 'running', 'completed', 'failed']");
  assert(filterKeysMatch, "Filter buttons must explicitly define ['all', 'running', 'completed', 'failed']");
});

test('SessionsView: empirical simulation of filter + search combinations', () => {
  // Oracle simulation matching useMemo in SessionsView.tsx:
  function simulateFilter(filter, searchQuery) {
    return sessionsData.filter((s) => {
      const matchesFilter = filter === 'all' || s.status === filter;
      const matchesSearch =
        s.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }

  // Filter 'all'
  const allRes = simulateFilter('all', '');
  assert(allRes.length === 4, `Expected 4 items for filter 'all', got ${allRes.length}`);

  // Filter 'running'
  const runningRes = simulateFilter('running', '');
  assert(runningRes.length === 1 && runningRes[0].status === 'running', 'Expected 1 running session');

  // Filter 'completed'
  const completedRes = simulateFilter('completed', '');
  assert(completedRes.length === 2 && completedRes.every(s => s.status === 'completed'), 'Expected 2 completed sessions');

  // Filter 'failed'
  const failedRes = simulateFilter('failed', '');
  assert(failedRes.length === 1 && failedRes[0].status === 'failed', 'Expected 1 failed session');

  // Search by agent name (e.g. "Claude")
  const claudeRes = simulateFilter('all', 'Claude');
  assert(claudeRes.length === 1 && claudeRes[0].id === 'sess-8941', 'Search by agent name "Claude" failed');

  // Search by session id (e.g. "8935")
  const idRes = simulateFilter('all', '8935');
  assert(idRes.length === 1 && idRes[0].id === 'sess-8935', 'Search by ID "8935" failed');

  // Search case insensitivity
  const lowerRes = simulateFilter('all', 'qa specialist');
  assert(lowerRes.length === 1 && lowerRes[0].id === 'sess-8938', 'Search case-insensitivity failed');

  // Empty search outcome
  const noRes = simulateFilter('all', 'nonexistent-session-query-xyz');
  assert(noRes.length === 0, 'Non-matching query should return 0 items');
});

test('SessionsView: status indicator badges use distinct visual styling & semantic icons', () => {
  // Running: pulse animation
  assert(sessionsViewContent.includes('animate-pulse'), 'Running badge must have pulsing dot indicator');
  assert(sessionsViewContent.includes('bg-dc-600/20') || sessionsViewContent.includes('bg-dc-400'), 'Running badge must use brand purple indicator');

  // Completed: CheckCircle2
  assert(sessionsViewContent.includes('CheckCircle2'), 'Completed badge must render CheckCircle2 icon');
  assert(sessionsViewContent.includes('text-emerald'), 'Completed badge must render emerald success coloring');

  // Failed: AlertTriangle
  assert(sessionsViewContent.includes('AlertTriangle'), 'Failed badge must render AlertTriangle icon');
  assert(sessionsViewContent.includes('text-rose'), 'Failed badge must render rose alert coloring');
});

test('SessionsView: live stdout console and active listener indicators', () => {
  assert(sessionsViewContent.includes('Session Output & Diagnostics'), 'Console header present');
  assert(sessionsViewContent.includes('animate-ping'), 'Running session must display pinging live listener indicator');
  assert(sessionsViewContent.includes('text-rose-300'), 'Failed session must highlight error line with warning color');
});

// Challenge: Master-detail state synchronization edge case
const activeSessionLogic = sessionsViewContent.match(/const activeSession = sessionsData\.find\(\(s\) => s\.id === selectedSessionId\) \?\? sessionsData\[0\];/);
if (activeSessionLogic) {
  challenge(
    'SessionsView: Filter vs Active Selection Desynchronization',
    'When filtering to "completed", if the previously selected session was "running" (sess-8941), the detail pane continues to show the running session while the left list displays only completed sessions. Neither item in the left list will appear selected.',
    'SessionsView.tsx line 111: const activeSession = sessionsData.find((s) => s.id === selectedSessionId) ?? sessionsData[0]; Recommended: fall back to filteredSessions[0] when activeSession is filtered out.'
  );
}

// Challenge: Search zero-results state in master-detail
challenge(
  'SessionsView: Search Empty State Master-Detail Decoupling',
  'When search query yields zero results (filteredSessions.length === 0), the left panel shows "No agent sessions match your filter", but the right panel still shows the full detail view and live console of the last selected session.',
  'UX behavior is resilient against crash, but ideally right pane should show an empty/cleared state when filteredSessions is empty.'
);

// Challenge: Keyboard accessibility of session list items
if (sessionsViewContent.includes('onClick={() => setSelectedSessionId(session.id)}') && !sessionsViewContent.includes('onKeyDown')) {
  challenge(
    'SessionsView: Keyboard Accessibility on Session List Items',
    'Session list items are rendered as <div> with onClick without role="button", tabIndex={0}, or keyboard onKeyDown handlers.',
    'Screen reader and keyboard users cannot tab to or activate session details without mouse click.'
  );
}


// =============================================================================
// SUITE 2: MULTISURFACE MODEL CARDS, SURFACES & MCP LINKS
// =============================================================================
console.log('\n--- Suite 2: MultiSurface Model Cards, Surfaces & MCP Links ---');

test('MultiSurface: contains all 4 required model harnesses with metadata', () => {
  const modelNames = [...multiSurfaceContent.matchAll(/name:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  assert(modelNames.includes('Claude 3.7 Sonnet'), 'Must include Claude 3.7 Sonnet');
  assert(modelNames.includes('GPT-4o'), 'Must include GPT-4o');
  assert(modelNames.includes('Gemini 2.5 Pro'), 'Must include Gemini 2.5 Pro');
  assert(modelNames.includes('Custom model'), 'Must include Custom model');

  // Verify provider chips & context badges
  assert(multiSurfaceContent.includes('200k context'), 'Claude must have 200k context badge');
  assert(multiSurfaceContent.includes('128k context'), 'GPT-4o must have 128k context badge');
  assert(multiSurfaceContent.includes('1M+ context'), 'Gemini must have 1M+ context badge');
  assert(multiSurfaceContent.includes('Self-hosted'), 'Custom model must have Self-hosted badge');
});

test('MultiSurface: multi-surface availability covers Desktop, CLI, Web, and Mobile', () => {
  const surfaceIds = [...multiSurfaceContent.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  assert(surfaceIds.includes('desktop'), 'Must support Desktop surface');
  assert(surfaceIds.includes('cli'), 'Must support CLI surface');
  assert(surfaceIds.includes('web'), 'Must support Web surface');
  assert(surfaceIds.includes('mobile'), 'Must support Mobile surface');
});

test('MultiSurface: surface cards use semantic accessible buttons with active state', () => {
  assert(multiSurfaceContent.includes('<button'), 'Surface items should use semantic <button> elements');
  assert(multiSurfaceContent.includes('type="button"'), 'Surface buttons must declare type="button"');
  assert(multiSurfaceContent.includes('activeSurface === surface.id'), 'Must highlight active surface');
});

test('MultiSurface: primary CTA links to /features/models', () => {
  assert(multiSurfaceContent.includes('to="/features/models"'), 'MultiSurface CTA must link to /features/models');
  assert(multiSurfaceContent.includes('See how agents work across surfaces'), 'CTA label must match requirements');
});

// Challenge: Model cards lack brand SVG icons (use text chips only)
if (!multiSurfaceContent.includes('AnthropicIcon') && !multiSurfaceContent.includes('OpenAIIcon')) {
  challenge(
    'MultiSurface: Model Cards Provider Representation',
    'Requirement R3.2 specifies "cards with logo-like icons". MultiSurface uses Cpu header icon and text provider badges (Anthropic, OpenAI, Google, Local & Cloud) rather than dedicated provider logos.',
    'Styling is clean and brand-consistent, but visual iconography for each model card is textual rather than graphical.'
  );
}


// =============================================================================
// SUITE 3: CUSTOMIZATIONSECTION & MCP INTEGRATION
// =============================================================================
console.log('\n--- Suite 3: CustomizationSection & MCP Integration ---');

test('CustomizationSection: features Custom Instructions, MCP Servers, and Plugins', () => {
  assert(customizationContent.includes('Custom instructions'), 'Must include Custom instructions card');
  assert(customizationContent.includes('MCP servers'), 'Must include MCP servers card');
  assert(customizationContent.includes('Agent plugins/extensions'), 'Must include Agent plugins/extensions card');
});

test('CustomizationSection: MCP code snippet contains valid MCP configuration', () => {
  assert(customizationContent.includes('.dardcor/mcp.json'), 'MCP card must reference .dardcor/mcp.json');
  assert(customizationContent.includes('@modelcontextprotocol/server-postgres'), 'Snippet must include valid MCP server package');
  assert(customizationContent.includes('@modelcontextprotocol/server-github'), 'Snippet must include github MCP server package');
});

test('CustomizationSection: CTA links to /features/customizations', () => {
  assert(customizationContent.includes('to="/features/customizations"'), 'Customization CTA must link to /features/customizations');
  assert(customizationContent.includes('Connect to external tools with MCP servers'), 'CTA copy must match requirements');
});

// Challenge: Navbar MCP anchor mismatch
const navbarMcpMatch = navbarContent.match(/path:\s*['"](\/#mcp)['"]/);
const customizationIdMatch = customizationContent.match(/id=['"]([^'"]+)['"]/);

if (navbarMcpMatch && customizationIdMatch) {
  const navAnchor = navbarMcpMatch[1]; // '/#mcp'
  const sectionId = customizationIdMatch[1]; // 'customization'
  if (navAnchor === '/#mcp' && sectionId !== 'mcp') {
    challenge(
      'MCP Link Anchor Inconsistency: Navbar /#mcp vs Section id="customization"',
      `Navbar.tsx links Resources -> MCP to "${navAnchor}", but CustomizationSection.tsx has section id="${sectionId}". Clicking MCP in Navbar fails to scroll to the MCP section.`,
      `Navbar line 98: path: '/#mcp'. CustomizationSection.tsx line 103: id="customization". Either section id should be "customization" with an anchor id="mcp", or id="mcp".`
    );
  }
}

// Challenge: Accessibility on Customization cards
if (customizationContent.includes('onClick={() => setSelectedId(card.id)}') && !customizationContent.includes('role="button"')) {
  challenge(
    'CustomizationSection: Keyboard Accessibility on Customization Cards',
    'Customization cards are rendered as <div> with onClick without role="button" or tabIndex={0}.',
    'Keyboard users cannot navigate or switch between instructions, mcp, and plugins previews using Tab / Enter / Space.'
  );
}


// =============================================================================
// SUITE 4: 375PX MOBILE VIEWPORT CONTAINMENT & HORIZONTAL OVERFLOW ANALYSIS
// =============================================================================
console.log('\n--- Suite 4: 375px Mobile Viewport Layout Containment ---');

test('MultiSurface: 375px viewport containment & grid collapse', () => {
  // Section container overflow-hidden
  assert(multiSurfaceContent.includes('overflow-hidden'), 'MultiSurface section must have overflow-hidden');
  
  // Responsive grid check
  assert(
    multiSurfaceContent.includes('grid-cols-1') && multiSurfaceContent.includes('sm:grid-cols-2') && multiSurfaceContent.includes('lg:grid-cols-4'),
    'Model cards grid must collapse to 1 column at mobile viewports (<640px)'
  );

  // Surface grid check
  const surfaceGrid = multiSurfaceContent.match(/grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4/g);
  assert(surfaceGrid && surfaceGrid.length >= 2, 'Surfaces showcase must also collapse to 1 column on mobile');

  // Bottom CTA flex-col on mobile
  assert(multiSurfaceContent.includes('flex flex-col sm:flex-row'), 'Bottom CTA banner must stack vertically on mobile');
});

test('SessionsView: 375px viewport containment & horizontal scrolling safeguards', () => {
  // Section container overflow-hidden
  assert(sessionsViewContent.includes('overflow-hidden'), 'SessionsView section must have overflow-hidden');

  // Top filter button bar has overflow-x-auto
  assert(sessionsViewContent.includes('overflow-x-auto'), 'Top filter bar must have overflow-x-auto to prevent button overflow on mobile');

  // Master-Detail collapses to 1 column on mobile
  assert(sessionsViewContent.includes('grid-cols-1 lg:grid-cols-12'), 'Master-detail layout must collapse to 1 column on mobile');

  // Terminal box has overflow-x-auto
  const consoleBox = sessionsViewContent.match(/bg-\[#0e0e16\][^>]*overflow-x-auto/);
  assert(consoleBox, 'Console stdout box must have overflow-x-auto for long command strings');

  // Attribute badges grid-cols-2 on mobile
  assert(sessionsViewContent.includes('grid-cols-2 sm:grid-cols-4'), 'Attributes grid must use 2 columns on mobile, not 4');
});

test('CustomizationSection: 375px viewport containment & pre tag scrolling', () => {
  // Section container overflow-hidden
  assert(customizationContent.includes('overflow-hidden'), 'CustomizationSection section must have overflow-hidden');

  // Cards grid collapses to 1 column
  assert(customizationContent.includes('grid-cols-1 md:grid-cols-3'), 'Customization cards grid must collapse to 1 column on mobile');

  // Code snippet viewer has overflow-x-auto
  const codeViewer = customizationContent.match(/bg-\[#12121a\][^>]*overflow-x-auto/);
  assert(codeViewer, 'Code viewer must have overflow-x-auto to prevent preformatted code overflow');

  // Bottom CTA stacks on mobile
  assert(customizationContent.includes('flex flex-col sm:flex-row'), 'Bottom CTA banner must stack vertically on mobile');
});

// Challenge: CustomizationSection inspector title bar text crowding at 375px
const customizationTitleBar = customizationContent.match(/flex items-center justify-between px-4 sm:px-6 py-3\.5 bg-\[#101018\]/);
if (customizationTitleBar) {
  challenge(
    'CustomizationSection: Inspector Title Bar Mobile Density at 375px',
    'The inspector title bar places filename (".dardcor/instructions.md" ~180px) + category title ("Custom instructions" ~120px) on the left, and "Loaded by agent runtime" (~140px) on the right in a flex justify-between container without flex-wrap.',
    'On a 375px screen (343px inner container - 32px padding = 311px available width), 180px + 120px + 140px = 440px total content width. Text will crowd, truncate, or cause inner flex item shrinkage unless responsive hiding (e.g. hidden sm:inline) is used.'
  );
}

// Challenge: CustomizationSection bottom CTA button whitespace-nowrap at 375px
const ctaWhitespace = customizationContent.includes('whitespace-nowrap') && customizationContent.includes('Connect to external tools with MCP servers');
if (ctaWhitespace) {
  challenge(
    'CustomizationSection: Long CTA Button with whitespace-nowrap on Mobile',
    'CTA button text "Connect to external tools with MCP servers" is 42 characters (~250px text + 40px padding + 22px icon = ~312px). With container padding p-6 (48px) on a 343px container (available 295px), whitespace-nowrap creates a tight constraint on <=360px viewports.',
    'Consider allowing whitespace-normal or text-center wrapping on very narrow mobile viewports.'
  );
}


// =============================================================================
// SUMMARY & VERDICT
// =============================================================================
console.log('\n════════════════════════════════════════════════════════════════════════════════');
console.log('                            CHALLENGE RESULTS SUMMARY                           ');
console.log('════════════════════════════════════════════════════════════════════════════════');
console.log(`Total Assertions Passed: ${passCount}`);
console.log(`Total Assertions Failed: ${failCount}`);
console.log(`Total Challenges/Warns:  ${warnCount}`);

if (findings.length > 0) {
  console.log('\nChallenges & Findings Detail:');
  findings.forEach((f, idx) => {
    console.log(`\n[${idx + 1}] [${f.severity}] ${f.test}`);
    console.log(`    Message: ${f.message}`);
    if (f.details) console.log(`    Details: ${f.details}`);
  });
}

console.log('\n════════════════════════════════════════════════════════════════════════════════');
if (failCount === 0) {
  console.log('\x1b[32m✔ EMPIRICAL CHALLENGER VERDICT: APPROVE (with documented edge-case challenges)\x1b[0m');
} else {
  console.log('\x1b[31m✖ EMPIRICAL CHALLENGER VERDICT: REJECT\x1b[0m');
}
console.log('════════════════════════════════════════════════════════════════════════════════\n');

process.exit(failCount > 0 ? 1 : 0);
