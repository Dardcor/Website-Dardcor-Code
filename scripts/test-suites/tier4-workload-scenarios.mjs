// @ts-check
import { registry, assert, readFile, fileExists, listSourceFiles, analysis } from '../test-utils.mjs';

export function registerTier4Tests() {
  // =========================================================================
  // Scenario 1: Full Developer Download Journey
  // =========================================================================

  registry.register({
    id: 'T4.1',
    name: 'Workload Scenario: Complete Developer Download Journey (Landing -> Discovery -> Platform Asset -> Release)',
    tier: 4,
    milestone: 'M3',
    area: 'Real-World Workload Scenarios',
    fn: async () => {
      // Step 1: User arrives at Homepage /
      assert.fileExists('src/App.tsx');
      const app = readFile('src/App.tsx');
      assert.matches(app, /<Route\s+path="\/"\s+element={<HomePage\s*\/>}\s*\/>/);

      // Step 2: Hero introduces multi-agent value and offers Download CTA
      assert.fileExists('src/components/sections/Hero.tsx');
      const hero = readFile('src/components/sections/Hero.tsx');
      assert.includes(hero, 'Your home for multi-agent development');
      assert.matches(hero, /Download Dardcor Code/i);
      assert.matches(hero, /(?:to=["']\/release["']|href=["']\/release["'])/);

      // Step 3: User navigates to /release
      assert.fileExists('src/pages/ReleasePage.tsx');
      const release = readFile('src/pages/ReleasePage.tsx');

      // Step 4: ReleasePage fetches from GitHub API and processes platforms
      assert.includes(release, 'https://api.github.com/repos/Dardcor/Dardcor-Code/releases');
      assert.matches(release, /(?:macos|mac|dmg)/i);
      assert.matches(release, /(?:windows|win|exe)/i);
      assert.matches(release, /(?:linux|deb|appimage|tar\.gz)/i);

      // Step 5: ReleasePage groups by architecture and file types
      assert.matches(release, /(?:ARM64|x64|Apple Silicon)/i);
      assert.matches(release, /(?:formatBytes|\.toFixed\(1\)\s*MB)/i);

      // Step 6: User has clear back-to-home return path
      assert.matches(release, /to=["']\/["']/);
    },
  });

  // =========================================================================
  // Scenario 2: Comprehensive Security Audit (Opaque-Box)
  // =========================================================================

  registry.register({
    id: 'T4.2',
    name: 'Workload Scenario: Comprehensive Security Audit (Headers, CSP, External Links, Sink Analysis)',
    tier: 4,
    milestone: 'M1',
    area: 'Real-World Workload Scenarios',
    fn: async () => {
      // Audit 1: public/_headers check
      assert.fileExists('public/_headers');
      const headersContent = readFile('public/_headers');
      const headers = analysis.parseHeadersFile(headersContent);

      const requiredHeaders = [
        'x-frame-options',
        'x-content-type-options',
        'referrer-policy',
        'permissions-policy',
        'strict-transport-security',
        'content-security-policy',
        'x-permitted-cross-domain-policies',
        'cross-origin-opener-policy',
        'cross-origin-resource-policy',
      ];

      for (const req of requiredHeaders) {
        assert.ok(headers[req], `public/_headers must declare ${req}`);
      }

      // Verify specific strict values
      assert.equal(headers['x-frame-options'], 'DENY');
      assert.equal(headers['x-content-type-options'], 'nosniff');
      assert.equal(headers['referrer-policy'], 'strict-origin-when-cross-origin');
      assert.equal(headers['permissions-policy'], 'camera=(), microphone=(), geolocation=(), payment=()');
      assert.includes(headers['content-security-policy'], "default-src 'self'");
      assert.includes(headers['content-security-policy'], "frame-ancestors 'none'");

      // Audit 2: public/.htaccess check
      assert.fileExists('public/.htaccess');
      const htaccessContent = readFile('public/.htaccess');
      assert.includes(htaccessContent, 'X-Frame-Options "DENY"');
      assert.includes(htaccessContent, 'X-Content-Type-Options "nosniff"');
      assert.includes(htaccessContent, 'RewriteEngine On');

      // Audit 3: index.html meta tags check
      assert.fileExists('index.html');
      const indexHtml = readFile('index.html');
      assert.includes(indexHtml, 'http-equiv="X-Content-Type-Options" content="nosniff"');
      assert.includes(indexHtml, 'http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin"');
      assert.includes(indexHtml, 'http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=()"');
      assert.includes(indexHtml, 'http-equiv="Content-Security-Policy"');

      // Audit 4: 100% External Link audit across ALL source files
      const srcFiles = listSourceFiles('src', ['.tsx', '.ts', '.html']);
      const violations = [];
      for (const sf of srcFiles) {
        const fileContent = readFile(sf);
        const linkViolations = analysis.auditExternalLinks(fileContent, sf);
        if (linkViolations.length > 0) {
          violations.push(...linkViolations.map((v) => `${sf}: ${v.url} (${v.reason})`));
        }
      }
      assert.equal(
        violations.length,
        0,
        `Found ${violations.length} external link security violation(s):\n${violations.slice(0, 10).join('\n')}`
      );

      // Audit 5: Dangerous sink analysis (no dangerouslySetInnerHTML, no eval, no inline handlers)
      const sinkViolations = [];
      for (const sf of srcFiles) {
        const fileContent = readFile(sf);
        if (fileContent.includes('dangerouslySetInnerHTML')) {
          sinkViolations.push(`${sf}: contains dangerouslySetInnerHTML`);
        }
        if (/\beval\s*\(/.test(fileContent)) {
          sinkViolations.push(`${sf}: contains eval()`);
        }
        const inlineMatches = analysis.auditInlineHandlers(fileContent);
        if (inlineMatches.length > 0) {
          sinkViolations.push(`${sf}: contains inline handlers ${inlineMatches.join(', ')}`);
        }
      }
      assert.equal(
        sinkViolations.length,
        0,
        `Found dangerous sinks:\n${sinkViolations.join('\n')}`
      );
    },
  });

  // =========================================================================
  // Scenario 3: Responsive Mobile Viewport Audit (375px)
  // =========================================================================

  registry.register({
    id: 'T4.3',
    name: 'Workload Scenario: 375px Viewport Audit across all Sections and Sub-pages',
    tier: 4,
    milestone: 'M4',
    area: 'Real-World Workload Scenarios',
    fn: async () => {
      const allComponents = [
        'src/components/layout/Navbar.tsx',
        'src/components/layout/Footer.tsx',
        'src/components/sections/Hero.tsx',
        'src/components/sections/AgentsBuild.tsx',
        'src/components/sections/MultiSurface.tsx',
        'src/components/sections/SessionsView.tsx',
        'src/components/sections/CustomizationSection.tsx',
        'src/components/sections/CoreEditor.tsx',
        'src/components/sections/ExtensionsSection.tsx',
        'src/components/sections/LanguagesSection.tsx',
        'src/components/sections/CustomizableSection.tsx',
        'src/components/sections/CodeAnywhereSection.tsx',
        'src/components/sections/RichFeaturesSection.tsx',
        'src/components/sections/Blog.tsx',
        'src/pages/FeaturesAgentsPage.tsx',
        'src/pages/FeaturesModelsPage.tsx',
        'src/pages/FeaturesCustomizationsPage.tsx',
        'src/pages/FeaturesEnterprisePage.tsx',
        'src/pages/FeaturesExtensibilityPage.tsx',
      ];

      const failures = [];
      for (const comp of allComponents) {
        assert.fileExists(comp);
        const content = readFile(comp);
        const audit = analysis.auditResponsiveLayout(content);

        // Sub-pages and sections must have responsive padding or container
        if (!audit.hasResponsivePadding && !audit.hasResponsiveGridOrFlex) {
          failures.push(`${comp}: missing responsive padding or grid/flex wrap`);
        }
        if (audit.hasUnconstrainedFixedWideWidth) {
          failures.push(`${comp}: contains fixed width > 400px without max-w constraint`);
        }
      }

      assert.equal(
        failures.length,
        0,
        `Responsive mobile viewport violations:\n${failures.join('\n')}`
      );
    },
  });

  // =========================================================================
  // Scenario 4: SEO, Metadata & Web Accessibility Audit
  // =========================================================================

  registry.register({
    id: 'T4.4',
    name: 'Workload Scenario: SEO, Metadata & Web Accessibility Standards Audit',
    tier: 4,
    milestone: 'M1',
    area: 'Real-World Workload Scenarios',
    fn: async () => {
      assert.fileExists('index.html');
      const indexHtml = readFile('index.html');

      // Title audit
      assert.includes(
        indexHtml,
        '<title>Dardcor Code - The open source AI code editor | Your home for multi-agent development</title>'
      );

      // Meta description audit
      assert.matches(indexHtml, /<meta\s+name="description"\s+content="[^"]{20,}"/i);

      // Open Graph audit
      assert.matches(indexHtml, /<meta\s+property="og:title"/i);
      assert.matches(indexHtml, /<meta\s+property="og:description"/i);
      assert.matches(indexHtml, /<meta\s+property="og:image"/i);

      // Favicon audit
      assert.matches(indexHtml, /<link\s+rel="icon"/i);

      // Image alt attributes audit across source
      const tsxFiles = listSourceFiles('src', ['.tsx']);
      const missingAlts = [];
      for (const tf of tsxFiles) {
        const content = readFile(tf);
        const imgTags = content.match(/<img\b[^>]*>/gi) || [];
        for (const img of imgTags) {
          if (!img.includes('alt=')) {
            missingAlts.push(`${tf}: ${img}`);
          }
        }
      }
      assert.equal(
        missingAlts.length,
        0,
        `Found <img> tags missing alt attribute:\n${missingAlts.join('\n')}`
      );
    },
  });
}
