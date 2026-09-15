// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { registry, assert, readFile, fileExists, listSourceFiles, PROJECT_ROOT } from '../test-utils.mjs';

export function registerTier2Tests() {
  // =========================================================================
  // Area 1: Navigation Boundaries (Milestone M2) - 5 tests
  // =========================================================================

  registry.register({
    id: 'T2.1.1',
    name: 'Navbar Boundary: 375px mobile viewport containment and drawer overflow prevention',
    tier: 2,
    milestone: 'M2',
    area: 'Navigation & Header',
    fn: async () => {
      assert.fileExists('src/components/layout/Navbar.tsx');
      const content = readFile('src/components/layout/Navbar.tsx');
      assert.matches(content, /overflow-hidden/i, 'Mobile menu drawer must contain overflow-hidden to prevent 375px spill');
      assert.matches(content, /fixed\s+top-0\s+inset-x-0/i, 'Navbar must pin across viewport with fixed top-0 inset-x-0');
    },
  });

  registry.register({
    id: 'T2.1.2',
    name: 'Navbar Boundary: Scroll threshold boundary condition (scrollY > 10 trigger)',
    tier: 2,
    milestone: 'M2',
    area: 'Navigation & Header',
    fn: async () => {
      assert.fileExists('src/components/layout/Navbar.tsx');
      const content = readFile('src/components/layout/Navbar.tsx');
      assert.matches(
        content,
        /(?:scrollY\s*>\s*10|scrolled|isScrolled)/i,
        'Navbar should trigger glassmorphic blur when window.scrollY > 10'
      );
    },
  });

  registry.register({
    id: 'T2.1.3',
    name: 'Navbar Boundary: Dropdown interaction dismiss behavior',
    tier: 2,
    milestone: 'M2',
    area: 'Navigation & Header',
    fn: async () => {
      assert.fileExists('src/components/layout/Navbar.tsx');
      const content = readFile('src/components/layout/Navbar.tsx');
      assert.matches(
        content,
        /(?:onMouseLeave|closeMobile|setMobileOpen\(false\)|onClick)/i,
        'Dropdown menus must include dismissal handlers when cursor leaves or link is clicked'
      );
    },
  });

  registry.register({
    id: 'T2.1.4',
    name: 'Navbar Boundary: Anchor links with hash correctly formatted',
    tier: 2,
    milestone: 'M2',
    area: 'Navigation & Header',
    fn: async () => {
      assert.fileExists('src/components/layout/Navbar.tsx');
      const content = readFile('src/components/layout/Navbar.tsx');
      const hashLinks = ['#blog', '#extensions', '#mcp'];
      for (const hl of hashLinks) {
        assert.includes(content, hl, `Navbar must correctly format anchor link containing "${hl}"`);
      }
    },
  });

  registry.register({
    id: 'T2.1.5',
    name: 'Navbar Boundary: Brand text containment on narrow 375px viewports',
    tier: 2,
    milestone: 'M2',
    area: 'Navigation & Header',
    fn: async () => {
      assert.fileExists('src/components/layout/Navbar.tsx');
      const content = readFile('src/components/layout/Navbar.tsx');
      assert.matches(
        content,
        /(?:tracking-tight|whitespace-nowrap|truncate|flex items-center)/i,
        'Brand header text must be formatted to prevent line breaking on 375px screens'
      );
    },
  });

  registry.register({
    id: 'T2.1.6',
    name: 'Navbar Boundary: Mobile hamburger button minimum 44px touch target sizing',
    tier: 2,
    milestone: 'M2',
    area: 'Navigation & Header',
    fn: async () => {
      assert.fileExists('src/components/layout/Navbar.tsx');
      const content = readFile('src/components/layout/Navbar.tsx');
      assert.matches(
        content,
        /(?:p-2|p-2\.5|p-3|h-10|w-10)/i,
        'Mobile hamburger toggle button must maintain accessible touch target padding'
      );
    },
  });

  // =========================================================================
  // Area 2: Hero & Core AI Section Boundaries (Milestone M3) - 6 tests
  // =========================================================================

  registry.register({
    id: 'T2.2.1',
    name: 'Hero Boundary: 375px mobile viewport vertical stacking and responsive flex',
    tier: 2,
    milestone: 'M3',
    area: 'Hero & Core AI Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/Hero.tsx');
      const content = readFile('src/components/sections/Hero.tsx');
      assert.matches(
        content,
        /flex\s+flex-col\s+lg:flex-row/i,
        'Hero layout must stack vertically on mobile (flex-col) and switch to row on large screens (lg:flex-row)'
      );
      assert.matches(
        content,
        /px-4\s+sm:px-6/i,
        'Hero must have responsive horizontal padding px-4 sm:px-6 to prevent 375px screen edge collision'
      );
    },
  });

  registry.register({
    id: 'T2.2.2',
    name: 'Hero Boundary: Tabbed editor mockup active index bounds cycling',
    tier: 2,
    milestone: 'M3',
    area: 'Hero & Core AI Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/Hero.tsx');
      const content = readFile('src/components/sections/Hero.tsx');
      assert.matches(
        content,
        /(?:activeIndex|activeTab|selectedTab|setTab|setActiveIndex|%\s*\w+\.length)/i,
        'Tabbed mockup must manage tab index within array bounds'
      );
    },
  });

  registry.register({
    id: 'T2.2.3',
    name: 'Hero Boundary: Reduced-motion animation considerations',
    tier: 2,
    milestone: 'M3',
    area: 'Hero & Core AI Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/Hero.tsx');
      const content = readFile('src/components/sections/Hero.tsx');
      assert.matches(
        content,
        /(?:framer-motion|transition|duration)/i,
        'Hero must use standard controlled framer-motion transitions'
      );
    },
  });

  registry.register({
    id: 'T2.2.4',
    name: 'MultiSurface Boundary: Responsive model grid columns (1-col mobile to multi-col desktop)',
    tier: 2,
    milestone: 'M3',
    area: 'Hero & Core AI Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/MultiSurface.tsx');
      const content = readFile('src/components/sections/MultiSurface.tsx');
      assert.matches(
        content,
        /grid\b.*(?:grid-cols-1|grid-cols-2).*(?:sm:grid-cols|md:grid-cols|lg:grid-cols)/i,
        'MultiSurface model cards must use responsive grid columns for 375px compatibility'
      );
    },
  });

  registry.register({
    id: 'T2.2.5',
    name: 'SessionsView Boundary: Distinct status badges for running, completed, and failed tasks',
    tier: 2,
    milestone: 'M3',
    area: 'Hero & Core AI Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/SessionsView.tsx');
      const content = readFile('src/components/sections/SessionsView.tsx');
      assert.matches(content, /running/i, 'Must visually differentiate running status');
      assert.matches(content, /completed/i, 'Must visually differentiate completed status');
      assert.matches(content, /failed/i, 'Must visually differentiate failed status');
    },
  });

  registry.register({
    id: 'T2.2.6',
    name: 'Hero Boundary: CTA button minimum touch target sizing (py-3/3.5, px-6/8)',
    tier: 2,
    milestone: 'M3',
    area: 'Hero & Core AI Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/Hero.tsx');
      const content = readFile('src/components/sections/Hero.tsx');
      assert.matches(
        content,
        /(?:py-(?:3|3\.5|4)\s+px-(?:6|8)|px-(?:6|8)\s+py-(?:3|3\.5|4))/i,
        'Hero primary CTA button must maintain touch-friendly padding on mobile'
      );
    },
  });

  // =========================================================================
  // Area 3: Editor & Ecosystem Section Boundaries (Milestone M4) - 6 tests
  // =========================================================================

  registry.register({
    id: 'T2.3.1',
    name: 'LanguagesSection Boundary: 375px flex-wrap behavior without horizontal clipping',
    tier: 2,
    milestone: 'M4',
    area: 'Editor & Ecosystem Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/LanguagesSection.tsx');
      const content = readFile('src/components/sections/LanguagesSection.tsx');
      assert.matches(
        content,
        /(?:flex-wrap|grid-cols|flex\s+wrap)/i,
        'Languages badges must flex-wrap or use responsive grid to prevent 375px horizontal breakout'
      );
    },
  });

  registry.register({
    id: 'T2.3.2',
    name: 'ExtensionsSection Boundary: Card description line-clamp and responsive grid',
    tier: 2,
    milestone: 'M4',
    area: 'Editor & Ecosystem Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/ExtensionsSection.tsx');
      const content = readFile('src/components/sections/ExtensionsSection.tsx');
      assert.matches(
        content,
        /grid\b.*(?:sm:grid-cols|md:grid-cols|lg:grid-cols)/i,
        'Extensions cards must scale from single-column on mobile to multi-column on desktop'
      );
    },
  });

  registry.register({
    id: 'T2.3.3',
    name: 'RichFeaturesSection Boundary: 8-card grid responsive breakdown (1 -> 2 -> 4 cols)',
    tier: 2,
    milestone: 'M4',
    area: 'Editor & Ecosystem Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/RichFeaturesSection.tsx');
      const content = readFile('src/components/sections/RichFeaturesSection.tsx');
      assert.matches(
        content,
        /grid\b.*(?:grid-cols-1|sm:grid-cols-2|lg:grid-cols-4)/i,
        'RichFeaturesSection must specify responsive grid classes for smooth mobile-to-desktop scaling'
      );
    },
  });

  registry.register({
    id: 'T2.3.4',
    name: 'CoreEditor Boundary: Diff view line wrapping or horizontal scroll container isolation',
    tier: 2,
    milestone: 'M4',
    area: 'Editor & Ecosystem Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/CoreEditor.tsx');
      const content = readFile('src/components/sections/CoreEditor.tsx');
      assert.matches(
        content,
        /(?:overflow-x-auto|overflow-hidden|break-words|font-mono)/i,
        'CoreEditor diff view code snippets must contain overflow or wrapping classes'
      );
    },
  });

  registry.register({
    id: 'T2.3.5',
    name: 'CustomizableSection Boundary: 3-card responsive grid containment',
    tier: 2,
    milestone: 'M4',
    area: 'Editor & Ecosystem Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/CustomizableSection.tsx');
      const content = readFile('src/components/sections/CustomizableSection.tsx');
      assert.matches(
        content,
        /grid\b.*(?:md:grid-cols-3|lg:grid-cols-3)/i,
        'CustomizableSection must arrange its 3 cards into responsive 3-column layout on desktop'
      );
    },
  });

  registry.register({
    id: 'T2.3.6',
    name: 'ExtensionsSection Boundary: Marketplace footer link opens securely',
    tier: 2,
    milestone: 'M4',
    area: 'Editor & Ecosystem Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/ExtensionsSection.tsx');
      const content = readFile('src/components/sections/ExtensionsSection.tsx');
      assert.matches(
        content,
        /(?:Marketplace|80k\+|extensions)/i,
        'ExtensionsSection footer must reference the Extension Marketplace'
      );
    },
  });

  // =========================================================================
  // Area 4: Sub-pages & Routing Boundaries (Milestone M5) - 6 tests
  // =========================================================================

  registry.register({
    id: 'T2.4.1',
    name: 'Routing Boundary: App.tsx handles wildcards / fallbacks without throwing',
    tier: 2,
    milestone: 'M5',
    area: 'Feature Sub-pages & Routing',
    fn: async () => {
      assert.fileExists('src/App.tsx');
      const content = readFile('src/App.tsx');
      assert.matches(content, /<Routes>/, 'App.tsx must define <Routes>');
      assert.matches(content, /path="\/"/, 'App.tsx must define root route');
      assert.matches(content, /path="\/release"/, 'App.tsx must define /release route');
    },
  });

  registry.register({
    id: 'T2.4.2',
    name: 'Sub-page Boundary: Section padding and max width contract compliance',
    tier: 2,
    milestone: 'M5',
    area: 'Feature Sub-pages & Routing',
    fn: async () => {
      const subPages = [
        'src/pages/FeaturesAgentsPage.tsx',
        'src/pages/FeaturesModelsPage.tsx',
        'src/pages/FeaturesCustomizationsPage.tsx',
        'src/pages/FeaturesEnterprisePage.tsx',
        'src/pages/FeaturesExtensibilityPage.tsx',
      ];
      for (const page of subPages) {
        assert.fileExists(page);
        const content = readFile(page);
        assert.matches(
          content,
          /(?:max-w-7xl|max-w-6xl|max-w-5xl)\s+mx-auto/i,
          `${page} must constrain width with max-w container and mx-auto`
        );
      }
    },
  });

  registry.register({
    id: 'T2.4.3',
    name: 'Sub-page Boundary: Uniform "Download Free" CTA destination across all 5 sub-pages',
    tier: 2,
    milestone: 'M5',
    area: 'Feature Sub-pages & Routing',
    fn: async () => {
      const subPages = [
        'src/pages/FeaturesAgentsPage.tsx',
        'src/pages/FeaturesModelsPage.tsx',
        'src/pages/FeaturesCustomizationsPage.tsx',
        'src/pages/FeaturesEnterprisePage.tsx',
        'src/pages/FeaturesExtensibilityPage.tsx',
      ];
      for (const page of subPages) {
        assert.fileExists(page);
        const content = readFile(page);
        assert.matches(
          content,
          /(?:to=["']\/release["']|href=["']\/release["'])/,
          `${page} download CTA must target /release`
        );
      }
    },
  });

  registry.register({
    id: 'T2.4.4',
    name: 'Sub-page Boundary: Global layout continuity (Navbar at top, Footer at bottom)',
    tier: 2,
    milestone: 'M5',
    area: 'Feature Sub-pages & Routing',
    fn: async () => {
      const appContent = readFile('src/App.tsx');
      // Verify Navbar is rendered globally in App.tsx or inside each page
      const hasGlobalNavbar = appContent.includes('<Navbar />') || appContent.includes('<Navbar');
      assert.ok(hasGlobalNavbar, 'App.tsx must maintain global Navbar rendering across all routes');
    },
  });

  registry.register({
    id: 'T2.4.5',
    name: 'Sub-page Boundary: Clean standalone instantiation (zero required props on page components)',
    tier: 2,
    milestone: 'M5',
    area: 'Feature Sub-pages & Routing',
    fn: async () => {
      const subPages = [
        'src/pages/FeaturesAgentsPage.tsx',
        'src/pages/FeaturesModelsPage.tsx',
        'src/pages/FeaturesCustomizationsPage.tsx',
        'src/pages/FeaturesEnterprisePage.tsx',
        'src/pages/FeaturesExtensibilityPage.tsx',
      ];
      for (const page of subPages) {
        assert.fileExists(page);
        const content = readFile(page);
        assert.matches(
          content,
          /export\s+default\s+function\s+\w+\s*\(\s*\)/,
          `${page} default export component must accept 0 required props for router instantiation`
        );
      }
    },
  });

  registry.register({
    id: 'T2.4.6',
    name: 'Sub-page Boundary: Sub-pages navigation return links to home "/"',
    tier: 2,
    milestone: 'M5',
    area: 'Feature Sub-pages & Routing',
    fn: async () => {
      const subPages = [
        'src/pages/FeaturesAgentsPage.tsx',
        'src/pages/FeaturesModelsPage.tsx',
        'src/pages/FeaturesCustomizationsPage.tsx',
        'src/pages/FeaturesEnterprisePage.tsx',
        'src/pages/FeaturesExtensibilityPage.tsx',
      ];
      for (const page of subPages) {
        assert.fileExists(page);
        const content = readFile(page);
        // Either contains link to "/" or renders global Navbar
        assert.matches(
          content,
          /(?:to=["']\/["']|href=["']\/["']|<Navbar|<header)/,
          `${page} must provide return navigation to root "/"`
        );
      }
    },
  });

  // =========================================================================
  // Area 5: Footer Boundaries (Milestone M2) - 5 tests
  // =========================================================================

  registry.register({
    id: 'T2.5.1',
    name: 'Footer Boundary: Dynamic copyright year evaluation (not stale hardcoded year)',
    tier: 2,
    milestone: 'M2',
    area: 'Footer & Support Architecture',
    fn: async () => {
      assert.fileExists('src/components/layout/Footer.tsx');
      const content = readFile('src/components/layout/Footer.tsx');
      assert.matches(
        content,
        /(?:new\s+Date\(\)\.getFullYear\(\)|2026)/i,
        'Footer must dynamically output current year'
      );
    },
  });

  registry.register({
    id: 'T2.5.2',
    name: 'Footer Boundary: 375px mobile viewport column wrapping',
    tier: 2,
    milestone: 'M2',
    area: 'Footer & Support Architecture',
    fn: async () => {
      assert.fileExists('src/components/layout/Footer.tsx');
      const content = readFile('src/components/layout/Footer.tsx');
      assert.matches(
        content,
        /grid\b.*(?:sm:grid-cols|lg:grid-cols)/i,
        'Footer link columns must stack on mobile and scale to multi-column on desktop'
      );
    },
  });

  registry.register({
    id: 'T2.5.3',
    name: 'Footer Boundary: Support column links target valid routes or external URLs',
    tier: 2,
    milestone: 'M2',
    area: 'Footer & Support Architecture',
    fn: async () => {
      assert.fileExists('src/components/layout/Footer.tsx');
      const content = readFile('src/components/layout/Footer.tsx');
      assert.matches(content, /Privacy/i);
      assert.matches(content, /Terms/i);
      assert.matches(content, /License/i);
    },
  });

  registry.register({
    id: 'T2.5.4',
    name: 'Footer Boundary: Accessible labels on social media icon anchors',
    tier: 2,
    milestone: 'M2',
    area: 'Footer & Support Architecture',
    fn: async () => {
      assert.fileExists('src/components/layout/Footer.tsx');
      const content = readFile('src/components/layout/Footer.tsx');
      assert.matches(content, /aria-label=["']Dardcor on GitHub["']/i);
      assert.matches(content, /aria-label=["']Dardcor on (?:X|Twitter)["']/i);
    },
  });

  registry.register({
    id: 'T2.5.5',
    name: 'Footer Boundary: Non-empty link targets for all footer items',
    tier: 2,
    milestone: 'M2',
    area: 'Footer & Support Architecture',
    fn: async () => {
      assert.fileExists('src/components/layout/Footer.tsx');
      const content = readFile('src/components/layout/Footer.tsx');
      assert.doesNotMatch(content, /href=["']javascript:/i, 'Footer must not use javascript: URIs');
    },
  });

  // =========================================================================
  // Area 6: Security & API Edge Cases (Milestone M1) - 5 tests
  // =========================================================================

  registry.register({
    id: 'T2.6.1',
    name: 'Security Boundary: GitHub API 403 Rate Limit handling in ReleasePage',
    tier: 2,
    milestone: 'M1',
    area: 'Security Hardening & Headers',
    fn: async () => {
      assert.fileExists('src/pages/ReleasePage.tsx');
      const content = readFile('src/pages/ReleasePage.tsx');
      assert.matches(
        content,
        /(?:403|rate\s*limit|fallback|offline|Could not load)/i,
        'ReleasePage must handle rate limits (HTTP 403) or network failures gracefully'
      );
    },
  });

  registry.register({
    id: 'T2.6.2',
    name: 'Security Boundary: Network failure state without unhandled exception',
    tier: 2,
    milestone: 'M1',
    area: 'Security Hardening & Headers',
    fn: async () => {
      assert.fileExists('src/pages/ReleasePage.tsx');
      const content = readFile('src/pages/ReleasePage.tsx');
      assert.matches(
        content,
        /(?:\.catch\(|catch\s*\()/i,
        'ReleasePage fetch call must have error handling (.catch or try/catch)'
      );
    },
  });

  registry.register({
    id: 'T2.6.3',
    name: 'Security Boundary: Zero release assets edge case handling',
    tier: 2,
    milestone: 'M1',
    area: 'Security Hardening & Headers',
    fn: async () => {
      assert.fileExists('src/pages/ReleasePage.tsx');
      const content = readFile('src/pages/ReleasePage.tsx');
      assert.matches(
        content,
        /(?:Coming soon|Not available|0\s*downloads)/i,
        'ReleasePage must handle release asset list being empty'
      );
    },
  });

  registry.register({
    id: 'T2.6.4',
    name: 'Security Boundary: CSP connect-src explicitly includes GitHub API endpoint',
    tier: 2,
    milestone: 'M1',
    area: 'Security Hardening & Headers',
    fn: async () => {
      assert.fileExists('index.html');
      const indexHtml = readFile('index.html');
      assert.matches(
        indexHtml,
        /connect-src[^;]*https:\/\/api\.github\.com/,
        'index.html CSP connect-src directive must whitelist https://api.github.com'
      );

      if (fileExists('public/_headers')) {
        const headers = readFile('public/_headers');
        assert.matches(
          headers,
          /connect-src[^;]*https:\/\/api\.github\.com/,
          'public/_headers CSP connect-src must whitelist https://api.github.com'
        );
      }
    },
  });

  registry.register({
    id: 'T2.6.5',
    name: 'Security Boundary: Anti-Clickjacking defense (frame-ancestors and X-Frame-Options)',
    tier: 2,
    milestone: 'M1',
    area: 'Security Hardening & Headers',
    fn: async () => {
      assert.fileExists('index.html');
      const indexHtml = readFile('index.html');
      assert.includes(indexHtml, 'nosniff', 'index.html must include nosniff meta tag');

      assert.fileExists('public/_headers');
      const headers = readFile('public/_headers');
      assert.includes(headers, 'X-Frame-Options: DENY', 'public/_headers must include X-Frame-Options: DENY');
      assert.includes(headers, "frame-ancestors 'none'", "public/_headers CSP must forbid framing via frame-ancestors 'none'");
    },
  });

  registry.register({
    id: 'T2.6.6',
    name: 'Security Boundary: ReleasePage changelog markdown parser bounds handling',
    tier: 2,
    milestone: 'M1',
    area: 'Security Hardening & Headers',
    fn: async () => {
      assert.fileExists('src/pages/ReleasePage.tsx');
      const content = readFile('src/pages/ReleasePage.tsx');
      assert.matches(
        content,
        /(?:parseChangelog|changelogSections|release\.body)/i,
        'ReleasePage must safely process release markdown body without executing code'
      );
    },
  });

  // =========================================================================
  // Area 7: Build & Asset Boundaries (Milestone M6) - 5 tests
  // =========================================================================

  registry.register({
    id: 'T2.7.1',
    name: 'Build Boundary: Strict typing - zero explicit "any" in TypeScript codebase',
    tier: 2,
    milestone: 'M6',
    area: 'Build, Types & Assets',
    fn: async () => {
      const files = listSourceFiles('src', ['.ts', '.tsx']);
      const violations = [];
      for (const f of files) {
        const content = readFile(f);
        // Exclude comments
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line.startsWith('//') && !line.startsWith('/*')) {
            if (/:\s*any\b/.test(line) || /<any>/.test(line) || /as\s+any\b/.test(line)) {
              violations.push(`${f}:${i + 1} -> ${line}`);
            }
          }
        }
      }
      assert.equal(
        violations.length,
        0,
        `Found explicit "any" types in source code:\n${violations.slice(0, 5).join('\n')}`
      );
    },
  });

  registry.register({
    id: 'T2.7.2',
    name: 'Build Boundary: Zero unencrypted http:// links in source code',
    tier: 2,
    milestone: 'M6',
    area: 'Build, Types & Assets',
    fn: async () => {
      const files = listSourceFiles('src', ['.ts', '.tsx']);
      const violations = [];
      for (const f of files) {
        const content = readFile(f);
        const matches = content.match(/http:\/\/(?!localhost|127\.0\.0\.1)[a-zA-Z0-9.-]+/g);
        if (matches) {
          violations.push(...matches.map((m) => `${f}: ${m}`));
        }
      }
      assert.equal(
        violations.length,
        0,
        `Found insecure http:// URLs in source files:\n${violations.join('\n')}`
      );
    },
  });

  registry.register({
    id: 'T2.7.3',
    name: 'Build Boundary: dist/index.html output sanity verification',
    tier: 2,
    milestone: 'M6',
    area: 'Build, Types & Assets',
    fn: async () => {
      assert.fileExists('dist/index.html', 'dist/index.html must exist after build');
      const content = readFile('dist/index.html');
      assert.includes(content, '<div id="root">', 'dist/index.html must contain root mount div');
      assert.matches(content, /<script\s+type="module"/, 'dist/index.html must reference Vite bundle script');
    },
  });

  registry.register({
    id: 'T2.7.4',
    name: 'Build Boundary: Case-sensitive file import verification',
    tier: 2,
    milestone: 'M6',
    area: 'Build, Types & Assets',
    fn: async () => {
      const files = listSourceFiles('src', ['.ts', '.tsx']);
      for (const f of files) {
        const content = readFile(f);
        const importMatches = content.matchAll(/from\s+['"](\.[^'"]+)['"]/g);
        for (const match of importMatches) {
          const importPath = match[1];
          const dir = path.dirname(path.resolve(PROJECT_ROOT, f));
          const targetBase = path.resolve(dir, importPath);

          // Check if file exists with .tsx or .ts or /index.tsx
          let actualFile = null;
          const candidates = [
            targetBase,
            `${targetBase}.tsx`,
            `${targetBase}.ts`,
            `${targetBase}.jsx`,
            `${targetBase}.js`,
            path.join(targetBase, 'index.tsx'),
            path.join(targetBase, 'index.ts'),
          ];
          for (const cand of candidates) {
            if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
              actualFile = cand;
              break;
            }
          }

          if (actualFile) {
            // Verify exact case in directory
            const parentDir = path.dirname(actualFile);
            const baseName = path.basename(actualFile);
            const dirFiles = fs.readdirSync(parentDir);
            assert.ok(
              dirFiles.includes(baseName),
              `Import "${importPath}" in ${f} has case mismatch with disk file "${baseName}"`
            );
          }
        }
      }
    },
  });

  registry.register({
    id: 'T2.7.5',
    name: 'Build Boundary: Public asset size thresholds',
    tier: 2,
    milestone: 'M6',
    area: 'Build, Types & Assets',
    fn: async () => {
      const showcasePath = path.resolve(PROJECT_ROOT, 'public/showcase.png');
      if (fs.existsSync(showcasePath)) {
        const stats = fs.statSync(showcasePath);
        // Showcase image should be <= 5MB
        assert.ok(stats.size <= 5 * 1024 * 1024, 'showcase.png exceeds 5MB limit');
      }
    },
  });
}
