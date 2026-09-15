// @ts-check
import { registry, assert, readFile, fileExists } from '../test-utils.mjs';

export function registerTier3Tests() {
  registry.register({
    id: 'T3.1',
    name: 'Cross-Feature: Navbar Mega-Menu -> Sub-Page Route -> CTA -> ReleasePage Journey',
    tier: 3,
    milestone: 'M5',
    area: 'Cross-Feature Combinations',
    fn: async () => {
      // 1. Verify Navbar has links to all 5 sub-pages
      const navbar = readFile('src/components/layout/Navbar.tsx');
      const subPaths = [
        '/features/agents',
        '/features/models',
        '/features/customizations',
        '/features/enterprise',
        '/features/extensibility',
      ];
      for (const p of subPaths) {
        assert.includes(navbar, p, `Navbar must link to sub-route ${p}`);
      }

      // 2. Verify App.tsx routes each sub-page
      const appContent = readFile('src/App.tsx');
      for (const p of subPaths) {
        assert.includes(appContent, `path="${p}"`, `App.tsx must define route for ${p}`);
      }

      // 3. Verify each sub-page has CTA leading to /release
      const pageFiles = [
        'src/pages/FeaturesAgentsPage.tsx',
        'src/pages/FeaturesModelsPage.tsx',
        'src/pages/FeaturesCustomizationsPage.tsx',
        'src/pages/FeaturesEnterprisePage.tsx',
        'src/pages/FeaturesExtensibilityPage.tsx',
      ];
      for (const pf of pageFiles) {
        assert.fileExists(pf);
        const pContent = readFile(pf);
        assert.matches(pContent, /(?:to=["']\/release["']|href=["']\/release["'])/, `${pf} must link CTA to /release`);
      }

      // 4. Verify ReleasePage exists and defines downloads
      assert.fileExists('src/pages/ReleasePage.tsx');
      const releaseContent = readFile('src/pages/ReleasePage.tsx');
      assert.matches(releaseContent, /Download/i);
    },
  });

  registry.register({
    id: 'T3.2',
    name: 'Cross-Feature: Mobile Hamburger Menu State -> Route Navigation Continuity',
    tier: 3,
    milestone: 'M2',
    area: 'Cross-Feature Combinations',
    fn: async () => {
      assert.fileExists('src/components/layout/Navbar.tsx');
      const navbar = readFile('src/components/layout/Navbar.tsx');
      // Verify clicking links triggers closeMobile / setMobileOpen(false)
      assert.matches(
        navbar,
        /(?:closeMobile|setMobileOpen\(false\))/i,
        'Mobile menu links must close drawer upon selection'
      );
    },
  });

  registry.register({
    id: 'T3.3',
    name: 'Cross-Feature: Scroll-driven Navbar Glassmorphism + Hero Layout Continuity',
    tier: 3,
    milestone: 'M3',
    area: 'Cross-Feature Combinations',
    fn: async () => {
      assert.fileExists('src/components/layout/Navbar.tsx');
      assert.fileExists('src/components/sections/Hero.tsx');
      const navbar = readFile('src/components/layout/Navbar.tsx');
      const hero = readFile('src/components/sections/Hero.tsx');

      // Navbar should be fixed top-0 with z-index >= 40
      assert.matches(navbar, /fixed\s+top-0.*z-(?:40|50)/i, 'Navbar must be fixed with elevated z-index');
      // Hero should have top padding (pt-24 or pt-28) to avoid overlap with fixed Navbar
      assert.matches(hero, /pt-(?:20|24|28|32)/i, 'Hero must include top padding to clear fixed Navbar');
    },
  });

  registry.register({
    id: 'T3.4',
    name: 'Cross-Feature: Homepage 12-Section Vertical Workflow Continuity',
    tier: 3,
    milestone: 'M5',
    area: 'Cross-Feature Combinations',
    fn: async () => {
      assert.fileExists('src/App.tsx');
      const appContent = readFile('src/App.tsx');

      const expectedSequence = [
        'Hero',
        'AgentsBuild',
        'MultiSurface',
        'SessionsView',
        'CustomizationSection',
        'CoreEditor',
        'ExtensionsSection',
        'LanguagesSection',
        'CustomizableSection',
        'CodeAnywhereSection',
        'RichFeaturesSection',
        'Blog',
      ];

      for (let i = 0; i < expectedSequence.length - 1; i++) {
        const current = expectedSequence[i];
        const next = expectedSequence[i + 1];
        const curIdx = appContent.indexOf(`<${current}`);
        const nextIdx = appContent.indexOf(`<${next}`);
        assert.ok(curIdx !== -1, `Section <${current} /> must be present in App.tsx`);
        assert.ok(nextIdx !== -1, `Section <${next} /> must be present in App.tsx`);
        assert.ok(curIdx < nextIdx, `Section <${current} /> must precede <${next} /> in App.tsx`);
      }
    },
  });

  registry.register({
    id: 'T3.5',
    name: 'Cross-Feature: Navbar Resources Dropdown -> Homepage Anchor Jump Target Integration',
    tier: 3,
    milestone: 'M4',
    area: 'Cross-Feature Combinations',
    fn: async () => {
      const navbar = readFile('src/components/layout/Navbar.tsx');
      // If Navbar links to #extensions, ExtensionsSection must have id="extensions"
      if (navbar.includes('#extensions')) {
        assert.fileExists('src/components/sections/ExtensionsSection.tsx');
        const extContent = readFile('src/components/sections/ExtensionsSection.tsx');
        assert.matches(extContent, /id=["']extensions["']/i, 'ExtensionsSection must define id="extensions"');
      }
      // If Navbar links to #blog, Blog must have id="blog"
      if (navbar.includes('#blog')) {
        assert.fileExists('src/components/sections/Blog.tsx');
        const blogContent = readFile('src/components/sections/Blog.tsx');
        assert.matches(blogContent, /id=["']blog["']/i, 'Blog must define id="blog"');
      }
    },
  });

  registry.register({
    id: 'T3.6',
    name: 'Cross-Feature: Footer Legal Links -> External Window Opener Isolation',
    tier: 3,
    milestone: 'M2',
    area: 'Cross-Feature Combinations',
    fn: async () => {
      assert.fileExists('src/components/layout/Footer.tsx');
      const footer = readFile('src/components/layout/Footer.tsx');
      const externalLinks = footer.match(/<a\b[^>]*href=["']https?:\/\/[^"']+["'][^>]*>/gi) || [];
      for (const link of externalLinks) {
        assert.includes(
          link.toLowerCase(),
          'rel="noopener noreferrer"',
          `External link in footer must have rel="noopener noreferrer": ${link}`
        );
      }
    },
  });

  registry.register({
    id: 'T3.7',
    name: 'Cross-Feature: ReleasePage API Rate Limit + Global Navigation & Footer Continuity',
    tier: 3,
    milestone: 'M1',
    area: 'Cross-Feature Combinations',
    fn: async () => {
      assert.fileExists('src/pages/ReleasePage.tsx');
      const releaseContent = readFile('src/pages/ReleasePage.tsx');
      // ReleasePage must render Footer and provide home navigation
      assert.matches(releaseContent, /<Footer\b/, 'ReleasePage must render global <Footer />');
      assert.matches(releaseContent, /to=["']\/["']/, 'ReleasePage must provide return link to home "/"');
    },
  });

  registry.register({
    id: 'T3.8',
    name: 'Cross-Feature: Security Header Parity between _headers, .htaccess, and index.html',
    tier: 3,
    milestone: 'M1',
    area: 'Cross-Feature Combinations',
    fn: async () => {
      assert.fileExists('index.html');
      assert.fileExists('public/_headers');
      assert.fileExists('public/.htaccess');

      const indexHtml = readFile('index.html');
      const headers = readFile('public/_headers');
      const htaccess = readFile('public/.htaccess');

      // Both _headers and .htaccess must restrict frame embedding
      assert.includes(headers, 'X-Frame-Options: DENY');
      assert.includes(headers, "frame-ancestors 'none'");
      assert.includes(htaccess, 'X-Frame-Options "DENY"');

      // nosniff check across all 3
      assert.includes(indexHtml, 'nosniff');
      assert.includes(headers, 'nosniff');
      assert.includes(htaccess, 'nosniff');
    },
  });

  registry.register({
    id: 'T3.9',
    name: 'Cross-Feature: Sub-page Architectural Uniformity Across All 5 Sub-pages',
    tier: 3,
    milestone: 'M5',
    area: 'Cross-Feature Combinations',
    fn: async () => {
      const subPages = [
        { file: 'src/pages/FeaturesAgentsPage.tsx', title: 'Agents' },
        { file: 'src/pages/FeaturesModelsPage.tsx', title: 'Models' },
        { file: 'src/pages/FeaturesCustomizationsPage.tsx', title: 'Customization' },
        { file: 'src/pages/FeaturesEnterprisePage.tsx', title: 'Enterprise' },
        { file: 'src/pages/FeaturesExtensibilityPage.tsx', title: 'Extensibility' },
      ];

      for (const sp of subPages) {
        assert.fileExists(sp.file);
        const content = readFile(sp.file);
        assert.matches(content, new RegExp(sp.title, 'i'), `${sp.file} must include feature title "${sp.title}"`);
        assert.matches(content, /Download/i, `${sp.file} must include Download CTA`);
        assert.matches(content, /(?:to=["']\/release["']|href=["']\/release["'])/, `${sp.file} CTA must link to /release`);
        assert.matches(content, /<Footer\b/, `${sp.file} must include <Footer />`);
      }
    },
  });

  registry.register({
    id: 'T3.10',
    name: 'Cross-Feature: Brand Token Consistency Across All 12 Homepage Sections',
    tier: 3,
    milestone: 'M4',
    area: 'Cross-Feature Combinations',
    fn: async () => {
      const sectionFiles = [
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
      ];

      for (const sf of sectionFiles) {
        assert.fileExists(sf);
        const content = readFile(sf);
        // Each section should utilize brand tokens: dc-600/dc-500, surface tokens, or font-display
        const hasBrandToken = /(?:dc-600|dc-500|text-gradient|font-display|card-base|surface-)/i.test(content);
        assert.ok(hasBrandToken, `Section ${sf} must utilize brand design system tokens`);
      }
    },
  });
}
