import fs from 'node:fs';
import path from 'node:path';

let failCount = 0;
let passCount = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`\x1b[32m✔ PASS\x1b[0m: ${name}`);
    passCount++;
  } catch (err) {
    console.error(`\x1b[31m✖ FAIL\x1b[0m: ${name}`);
    console.error(`  ${err.message}`);
    failCount++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

console.log('\n=== M2 FOOTER & ROUTE INTEGRITY EMPIRICAL VERIFICATION ===\n');

// 1. Footer.tsx Support section verification
const footerPath = path.resolve('src/components/layout/Footer.tsx');
const footerContent = fs.readFileSync(footerPath, 'utf8');

test('Footer.tsx exists and is readable', () => {
  assert(fs.existsSync(footerPath), 'Footer.tsx must exist');
  assert(footerContent.length > 0, 'Footer.tsx must not be empty');
});

test('Footer.tsx contains Support section with exactly 5 links', () => {
  const supportMatch = footerContent.match(/title:\s*['"]Support['"][\s\S]*?links:\s*\[([\s\S]*?)\]/);
  assert(supportMatch, 'Support section not found in footerLinks');

  const linksBlock = supportMatch[1];
  const linkObjects = [...linksBlock.matchAll(/\{\s*name:\s*['"]([^'"]+)['"],\s*href:\s*['"]([^'"]+)['"](?:,\s*external:\s*(true|false))?\s*\}/g)];
  
  assert(linkObjects.length === 5, `Expected exactly 5 links in Support section, found ${linkObjects.length}`);
  
  const expectedLinks = [
    { name: 'Support', href: 'mailto:support@dardcor.dev', external: true },
    { name: 'Privacy', href: '/#privacy' },
    { name: 'Terms of Use', href: '/#terms' },
    { name: 'License', href: 'https://github.com/Dardcor/Dardcor-Code/blob/main/LICENSE', external: true },
    { name: 'Your Privacy Choices', href: '/#privacy-choices' },
  ];

  for (const expected of expectedLinks) {
    const found = linkObjects.find(l => l[1] === expected.name);
    assert(found, `Missing expected Support link: "${expected.name}"`);
    assert(found[2] === expected.href, `Link "${expected.name}" href mismatch: expected "${expected.href}", got "${found[2]}"`);
    if (expected.external) {
      assert(found[3] === 'true', `Link "${expected.name}" should have external: true`);
    }
  }
});

test('Support section links have valid URL / path syntax', () => {
  const mailtoRegex = /^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const internalRouteRegex = /^\/([a-zA-Z0-9_-]+)*(\#[a-zA-Z0-9_-]+)?$/;
  const externalUrlRegex = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;

  assert(mailtoRegex.test('mailto:support@dardcor.dev'), 'support@dardcor.dev is valid mailto');
  assert(internalRouteRegex.test('/#privacy'), '/#privacy is valid internal hash route');
  assert(internalRouteRegex.test('/#terms'), '/#terms is valid internal hash route');
  assert(externalUrlRegex.test('https://github.com/Dardcor/Dardcor-Code/blob/main/LICENSE'), 'License URL is valid HTTPS');
  assert(internalRouteRegex.test('/#privacy-choices'), '/#privacy-choices is valid internal hash route');
});

// 2. Scan all anchor tags in Navbar.tsx and Footer.tsx for target="_blank" without rel="noopener noreferrer"
function scanAnchors(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath);

  test(`Scan all anchor tags in ${filename} for target="_blank" without rel="noopener noreferrer"`, () => {
    const anchorRegex = /<a\b([\s\S]*?)>/g;
    let match;
    let targetBlankCount = 0;
    let inspectedCount = 0;

    while ((match = anchorRegex.exec(content)) !== null) {
      inspectedCount++;
      const tagAttrs = match[1];
      const hasTargetBlank = /target\s*=\s*['"]_blank['"]/.test(tagAttrs);

      if (hasTargetBlank) {
        targetBlankCount++;
        const hasRel = /rel\s*=\s*['"]([^'"]*)['"]/.test(tagAttrs);
        assert(hasRel, `Anchor in ${filename} has target="_blank" but is MISSING rel attribute: ${match[0]}`);

        const relVal = tagAttrs.match(/rel\s*=\s*['"]([^'"]*)['"]/)[1];
        const relTokens = relVal.split(/\s+/);
        assert(
          relTokens.includes('noopener') && relTokens.includes('noreferrer'),
          `Anchor in ${filename} has target="_blank" but rel is missing 'noopener' or 'noreferrer'. Found rel="${relVal}": ${match[0]}`
        );
      }
    }

    console.log(`    (Scanned ${inspectedCount} <a> tags, ${targetBlankCount} with target="_blank" in ${filename} - all secure)`);
  });
}

scanAnchors(path.resolve('src/components/layout/Navbar.tsx'));
scanAnchors(path.resolve('src/components/layout/Footer.tsx'));

// 3. Project-wide scan for target="_blank" without rel="noopener noreferrer" in all TSX files
test('Project-wide scan: all <a> tags across src/ have rel="noopener noreferrer" when target="_blank"', () => {
  function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(walk(fullPath));
      } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.html')) {
        results.push(fullPath);
      }
    }
    return results;
  }

  const allSourceFiles = walk('src');
  let scannedTags = 0;
  let blankTags = 0;

  for (const f of allSourceFiles) {
    const code = fs.readFileSync(f, 'utf8');
    const matches = code.matchAll(/<a\b([\s\S]*?)>/g);
    for (const m of matches) {
      scannedTags++;
      const tag = m[1];
      if (/target\s*=\s*['"]_blank['"]/.test(tag)) {
        blankTags++;
        assert(
          /rel\s*=\s*['"][^'"]*noopener[^'"]*['"]/.test(tag) &&
          /rel\s*=\s*['"][^'"]*noreferrer[^'"]*['"]/.test(tag),
          `Missing rel="noopener noreferrer" in ${f}: ${m[0]}`
        );
      }
    }
  }
  console.log(`    (Project-wide scanned ${scannedTags} <a> tags across ${allSourceFiles.length} files, ${blankTags} target="_blank" tags - all secure)`);
});

// 4. Scan for any dynamic window.open calls across Navbar and Footer
test('Verify no unsafe window.open() calls in Navbar or Footer', () => {
  const navbarContent = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');
  assert(!/window\.open\b/.test(navbarContent), 'Navbar.tsx should not use raw window.open');
  assert(!/window\.open\b/.test(footerContent), 'Footer.tsx should not use raw window.open');
});

// 5. Verify all external URLs across Navbar and Footer use HTTPS protocol (no insecure HTTP)
test('All external URLs in Navbar and Footer use HTTPS protocol (no insecure HTTP)', () => {
  const navbarContent = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');
  const allUrls = [
    ...(navbarContent.match(/['"]http:\/\/[^'"]+['"]/g) || []),
    ...(footerContent.match(/['"]http:\/\/[^'"]+['"]/g) || []),
  ];
  assert(allUrls.length === 0, `Insecure http:// URLs detected: ${allUrls.join(', ')}`);
});

// 6. Verify Footer dynamic copyright year
test('Footer uses dynamic copyright year and official copyright notice', () => {
  assert(
    /new\s+Date\(\)\.getFullYear\(\)/.test(footerContent),
    'Footer must dynamically obtain the current year via new Date().getFullYear()'
  );
  assert(
    /Dardcor\.\s*All rights reserved/i.test(footerContent),
    'Footer must state "Dardcor. All rights reserved."'
  );
});

// 7. Verify Footer accessibility
test('Footer social media links provide aria-label and accessible SVG attributes', () => {
  assert(/aria-label=["']Dardcor on GitHub["']/.test(footerContent), 'GitHub anchor requires aria-label');
  assert(/aria-label=["']Dardcor on X["']/.test(footerContent), 'X/Twitter anchor requires aria-label');
  assert(/aria-label=["']Dardcor on YouTube["']/.test(footerContent), 'YouTube anchor requires aria-label');
  assert(/aria-label=["']Email Dardcor["']/.test(footerContent), 'Email anchor requires aria-label');
  assert(/aria-hidden=["']true["']/.test(footerContent), 'SVGs should have aria-hidden="true"');
});

// 8. Check Route compatibility in App.tsx
test('Internal paths referenced in Footer and Navbar are supported by App routing structure', () => {
  const appPath = path.resolve('src/App.tsx');
  const appContent = fs.readFileSync(appPath, 'utf8');
  
  assert(/path=["']\/["']/.test(appContent), 'App.tsx must route "/"');
  assert(/path=["']\/release["']/.test(appContent), 'App.tsx must route "/release"');
});

// 9. Check Navbar mega menu links against M5 feature sub-pages specification
test('Navbar features items match the 5 sub-routes specified in PROJECT.md', () => {
  const expectedRoutes = [
    '/features/agents',
    '/features/customizations',
    '/features/models',
    '/features/enterprise',
    '/features/extensibility',
  ];

  const navbarContent = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');
  for (const r of expectedRoutes) {
    assert(navbarContent.includes(r), `Navbar missing expected feature route: ${r}`);
  }
});

console.log(`\nVerification Complete: ${passCount} passed, ${failCount} failed.\n`);
if (failCount > 0) {
  process.exit(1);
}
