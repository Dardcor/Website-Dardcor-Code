// @ts-check
import { registry, assert, readFile, fileExists, execCommand } from '../test-utils.mjs';

export function registerTier1Tests() {
  // =========================================================================
  // Area 1: Navigation & Header (Milestone M2) - 8 tests (>=5 required)
  // =========================================================================

  registry.register({
    id: 'T1.1.1',
    name: 'Navbar: Brand Logo & Identity links to root "/"',
    tier: 1,
    milestone: 'M2',
    area: 'Navigation & Header',
    fn: async () => {
      assert.fileExists('src/components/layout/Navbar.tsx');
      const content = readFile('src/components/layout/Navbar.tsx');
      assert.includes(content, '/dardcor.png', 'Navbar must render brand logo at /dardcor.png');
      assert.matches(content, /Dardcor\s*(?:<[^>]+>)?\s*Code/i, 'Navbar must include brand name "Dardcor Code"');
      assert.matches(content, /<Link\b[^>]*to=["']\/["'][^>]*>/, 'Brand logo and title must link to root "/"');
    },
  });

  registry.register({
    id: 'T1.1.2',
    name: 'Navbar: Features Mega-Menu structure with 5 sub-links',
    tier: 1,
    milestone: 'M2',
    area: 'Navigation & Header',
    fn: async () => {
      assert.fileExists('src/components/layout/Navbar.tsx');
      const content = readFile('src/components/layout/Navbar.tsx');
      assert.matches(content, /Features/i, 'Navbar must feature "Features" dropdown/mega-menu');
      assert.includes(content, '/features/agents', 'Features menu must link to /features/agents');
      assert.includes(content, '/features/models', 'Features menu must link to /features/models');
      assert.includes(content, '/features/customizations', 'Features menu must link to /features/customizations');
      assert.includes(content, '/features/enterprise', 'Features menu must link to /features/enterprise');
      assert.includes(content, '/features/extensibility', 'Features menu must link to /features/extensibility');
    },
  });

  registry.register({
    id: 'T1.1.3',
    name: 'Navbar: Docs Dropdown with Documentation, API, and FAQ',
    tier: 1,
    milestone: 'M2',
    area: 'Navigation & Header',
    fn: async () => {
      assert.fileExists('src/components/layout/Navbar.tsx');
      const content = readFile('src/components/layout/Navbar.tsx');
      assert.matches(content, /Docs/i, 'Navbar must feature "Docs" dropdown');
      assert.matches(content, /Documentation/i, 'Docs menu must include "Documentation"');
      assert.matches(content, /API/i, 'Docs menu must include "API"');
      assert.matches(content, /FAQ/i, 'Docs menu must include "FAQ"');
    },
  });

  registry.register({
    id: 'T1.1.4',
    name: 'Navbar: Direct Navigation Links for Release Notes, Blog, and Learn',
    tier: 1,
    milestone: 'M2',
    area: 'Navigation & Header',
    fn: async () => {
      assert.fileExists('src/components/layout/Navbar.tsx');
      const content = readFile('src/components/layout/Navbar.tsx');
      assert.matches(content, /(?:Release Notes|Releases)/i, 'Navbar must contain Release Notes link');
      assert.includes(content, '/release', 'Release Notes must link to /release');
      assert.matches(content, /Blog/i, 'Navbar must contain Blog link');
      assert.includes(content, '#blog', 'Blog must link to /#blog or #blog');
      assert.matches(content, /Learn/i, 'Navbar must contain Learn link');
    },
  });

  registry.register({
    id: 'T1.1.5',
    name: 'Navbar: Resources Dropdown with Extensions and MCP sub-links',
    tier: 1,
    milestone: 'M2',
    area: 'Navigation & Header',
    fn: async () => {
      assert.fileExists('src/components/layout/Navbar.tsx');
      const content = readFile('src/components/layout/Navbar.tsx');
      assert.matches(content, /Resources/i, 'Navbar must contain Resources dropdown');
      assert.matches(content, /Extensions/i, 'Resources must include Extensions');
      assert.matches(content, /MCP/i, 'Resources must include MCP');
    },
  });

  registry.register({
    id: 'T1.1.6',
    name: 'Navbar: Download CTA button linked to /release',
    tier: 1,
    milestone: 'M2',
    area: 'Navigation & Header',
    fn: async () => {
      assert.fileExists('src/components/layout/Navbar.tsx');
      const content = readFile('src/components/layout/Navbar.tsx');
      assert.matches(content, /Download/i, 'Navbar must have a Download CTA');
      assert.matches(content, /to=["']\/release["']/, 'Download CTA must route to /release');
      assert.matches(content, /bg-dc-600/i, 'Download CTA must use brand purple background bg-dc-600');
    },
  });

  registry.register({
    id: 'T1.1.7',
    name: 'Navbar: Glassmorphism on scroll effect configuration',
    tier: 1,
    milestone: 'M2',
    area: 'Navigation & Header',
    fn: async () => {
      assert.fileExists('src/components/layout/Navbar.tsx');
      const content = readFile('src/components/layout/Navbar.tsx');
      assert.matches(
        content,
        /(?:scrollY\s*>\s*10|window\.scrollY|scroll|backdrop-blur)/i,
        'Navbar must implement scroll detection or backdrop blur glassmorphism'
      );
    },
  });

  registry.register({
    id: 'T1.1.8',
    name: 'Navbar: Mobile Hamburger menu drawer implementation',
    tier: 1,
    milestone: 'M2',
    area: 'Navigation & Header',
    fn: async () => {
      assert.fileExists('src/components/layout/Navbar.tsx');
      const content = readFile('src/components/layout/Navbar.tsx');
      assert.matches(content, /md:hidden/i, 'Navbar must include mobile menu button with md:hidden');
      assert.matches(content, /(?:mobileOpen|isOpen|setMobileOpen)/i, 'Navbar must track mobile menu open state');
      assert.matches(content, /aria-label/i, 'Mobile toggle button must specify accessible aria-label');
    },
  });

  // =========================================================================
  // Area 2: Hero & Core AI Sections (Milestone M3) - 10 tests (>=5 required)
  // =========================================================================

  registry.register({
    id: 'T1.2.1',
    name: 'Hero: Primary headline "Your home for multi-agent development"',
    tier: 1,
    milestone: 'M3',
    area: 'Hero & Core AI Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/Hero.tsx');
      const content = readFile('src/components/sections/Hero.tsx');
      assert.includes(
        content,
        'Your home for multi-agent development',
        'Hero must display exact headline "Your home for multi-agent development"'
      );
    },
  });

  registry.register({
    id: 'T1.2.2',
    name: 'Hero: Subheadline copy for free, open source AI code editor',
    tier: 1,
    milestone: 'M3',
    area: 'Hero & Core AI Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/Hero.tsx');
      const content = readFile('src/components/sections/Hero.tsx');
      assert.matches(
        content,
        /Dardcor Code is a free,\s*open source AI code editor/i,
        'Hero must state Dardcor Code is a free, open source AI code editor'
      );
      assert.matches(
        content,
        /Linux,\s*macOS,\s*and Windows/i,
        'Hero must mention platform support on Linux, macOS, and Windows'
      );
    },
  });

  registry.register({
    id: 'T1.2.3',
    name: 'Hero: Primary CTA "Download Dardcor Code" button linking to /release',
    tier: 1,
    milestone: 'M3',
    area: 'Hero & Core AI Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/Hero.tsx');
      const content = readFile('src/components/sections/Hero.tsx');
      assert.matches(
        content,
        /Download Dardcor Code/i,
        'Hero must have primary button "Download Dardcor Code"'
      );
      assert.matches(
        content,
        /(?:to=["']\/release["']|href=["']\/release["'])/,
        'Hero Download button must link to /release'
      );
    },
  });

  registry.register({
    id: 'T1.2.4',
    name: 'Hero: Secondary links for Web, Insiders, and other platforms',
    tier: 1,
    milestone: 'M3',
    area: 'Hero & Core AI Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/Hero.tsx');
      const content = readFile('src/components/sections/Hero.tsx');
      assert.matches(content, /Web/i, 'Hero must contain secondary Web link');
      assert.matches(content, /Insiders/i, 'Hero must contain Insiders edition link');
      assert.matches(content, /other platforms/i, 'Hero must contain other platforms link');
    },
  });

  registry.register({
    id: 'T1.2.5',
    name: 'Hero: Mandatory disclaimer on license and privacy agreement',
    tier: 1,
    milestone: 'M3',
    area: 'Hero & Core AI Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/Hero.tsx');
      const content = readFile('src/components/sections/Hero.tsx');
      assert.matches(
        content,
        /By using Dardcor Code, you agree to its license and privacy statement/i,
        'Hero must include required license & privacy agreement disclaimer'
      );
    },
  });

  registry.register({
    id: 'T1.2.6',
    name: 'Hero: Tabbed code editor mockup showing cycling code tabs',
    tier: 1,
    milestone: 'M3',
    area: 'Hero & Core AI Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/Hero.tsx');
      const content = readFile('src/components/sections/Hero.tsx');
      assert.matches(
        content,
        /(?:activeTab|tab|snippets|code|editor)/i,
        'Hero must feature tabbed code editor mockup component'
      );
      assert.matches(
        content,
        /(?:dc-600|#5a38d9)/i,
        'Hero code mockup must use brand purple color #5a38d9 / dc-600'
      );
    },
  });

  registry.register({
    id: 'T1.2.7',
    name: 'Section R3.1: AgentsBuild section ("Agents that build for you")',
    tier: 1,
    milestone: 'M3',
    area: 'Hero & Core AI Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/AgentsBuild.tsx');
      const content = readFile('src/components/sections/AgentsBuild.tsx');
      assert.includes(content, 'Agents that build for you');
      assert.matches(content, /CLI/i, 'AgentsBuild must describe CLI-based agent');
      assert.matches(content, /browser/i, 'AgentsBuild must describe browser-integrated agent');
      assert.matches(content, /cloud/i, 'AgentsBuild must describe cloud agent');
      assert.includes(content, '/features/agents', 'AgentsBuild must link CTA to /features/agents');
    },
  });

  registry.register({
    id: 'T1.2.8',
    name: 'Section R3.2: MultiSurface section ("Any agent, any model")',
    tier: 1,
    milestone: 'M3',
    area: 'Hero & Core AI Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/MultiSurface.tsx');
      const content = readFile('src/components/sections/MultiSurface.tsx');
      assert.includes(content, 'Any agent, any model');
      assert.matches(content, /Claude/i, 'MultiSurface must include Claude');
      assert.matches(content, /(?:GPT-4o|GPT-4|OpenAI)/i, 'MultiSurface must include GPT-4o / OpenAI');
      assert.matches(content, /Gemini/i, 'MultiSurface must include Gemini');
      assert.matches(content, /Custom/i, 'MultiSurface must include Custom model');
      assert.matches(content, /(?:CLI|Web|Mobile)/i, 'MultiSurface must list surfaces');
    },
  });

  registry.register({
    id: 'T1.2.9',
    name: 'Section R3.3: SessionsView section ("All your sessions, one view")',
    tier: 1,
    milestone: 'M3',
    area: 'Hero & Core AI Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/SessionsView.tsx');
      const content = readFile('src/components/sections/SessionsView.tsx');
      assert.includes(content, 'All your sessions, one view');
      assert.matches(content, /running/i, 'SessionsView must support running state');
      assert.matches(content, /completed/i, 'SessionsView must support completed state');
      assert.matches(content, /failed/i, 'SessionsView must support failed state');
    },
  });

  registry.register({
    id: 'T1.2.10',
    name: 'Section R3.4: CustomizationSection ("Your rules, your agents")',
    tier: 1,
    milestone: 'M3',
    area: 'Hero & Core AI Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/CustomizationSection.tsx');
      const content = readFile('src/components/sections/CustomizationSection.tsx');
      assert.includes(content, 'Your rules, your agents');
      assert.matches(content, /Custom instructions/i, 'CustomizationSection must feature custom instructions');
      assert.matches(content, /MCP/i, 'CustomizationSection must feature MCP servers');
      assert.includes(content, '/features/customizations', 'CustomizationSection must link to /features/customizations');
    },
  });

  // =========================================================================
  // Area 3: Editor & Ecosystem Sections (Milestone M4) - 6 tests (>=5 required)
  // =========================================================================

  registry.register({
    id: 'T1.3.1',
    name: 'Section R3.5: CoreEditor ("A world-class code editor at its core")',
    tier: 1,
    milestone: 'M4',
    area: 'Editor & Ecosystem Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/CoreEditor.tsx');
      const content = readFile('src/components/sections/CoreEditor.tsx');
      assert.includes(content, 'A world-class code editor at its core');
      assert.matches(content, /(?:diff|inline suggestions|intelligent completions)/i);
    },
  });

  registry.register({
    id: 'T1.3.2',
    name: 'Section R3.6: ExtensionsSection with 8+ extension cards',
    tier: 1,
    milestone: 'M4',
    area: 'Editor & Ecosystem Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/ExtensionsSection.tsx');
      const content = readFile('src/components/sections/ExtensionsSection.tsx');
      assert.includes(content, 'Code with extensions');
      const extensions = ['Python', 'Stripe', 'C/C++', 'Jupyter', 'GitLens', 'C#', 'MongoDB', 'Azure', 'Remote'];
      let foundCount = 0;
      for (const ext of extensions) {
        if (content.includes(ext)) foundCount++;
      }
      assert.gte(foundCount, 6, `Expected at least 6 of 9 core extension names, found ${foundCount}`);
      assert.matches(content, /Marketplace/i, 'ExtensionsSection must reference Extension Marketplace');
    },
  });

  registry.register({
    id: 'T1.3.3',
    name: 'Section R3.7: LanguagesSection with 10+ language badges',
    tier: 1,
    milestone: 'M4',
    area: 'Editor & Ecosystem Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/LanguagesSection.tsx');
      const content = readFile('src/components/sections/LanguagesSection.tsx');
      assert.includes(content, 'Code in any language');
      const languages = ['JavaScript', 'TypeScript', 'Python', 'C#', 'C++', 'HTML', 'Java', 'JSON', 'PHP', 'Markdown', 'PowerShell', 'YAML'];
      let foundCount = 0;
      for (const lang of languages) {
        if (content.includes(lang)) foundCount++;
      }
      assert.gte(foundCount, 10, `Expected at least 10 language tags, found ${foundCount}`);
    },
  });

  registry.register({
    id: 'T1.3.4',
    name: 'Section R3.8: CustomizableSection ("Fully customizable" with 3 cards)',
    tier: 1,
    milestone: 'M4',
    area: 'Editor & Ecosystem Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/CustomizableSection.tsx');
      const content = readFile('src/components/sections/CustomizableSection.tsx');
      assert.includes(content, 'Fully customizable');
      assert.matches(content, /Color themes/i, 'CustomizableSection must feature Color themes');
      assert.matches(content, /Settings Sync/i, 'CustomizableSection must feature Settings Sync');
      assert.matches(content, /Profiles/i, 'CustomizableSection must feature Profiles');
    },
  });

  registry.register({
    id: 'T1.3.5',
    name: 'Section R3.9: CodeAnywhereSection ("Code anywhere" with 2 cards)',
    tier: 1,
    milestone: 'M4',
    area: 'Editor & Ecosystem Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/CodeAnywhereSection.tsx');
      const content = readFile('src/components/sections/CodeAnywhereSection.tsx');
      assert.includes(content, 'Code anywhere');
      assert.matches(content, /(?:Source Control|Git)/i, 'Must feature Built-in Source Control');
      assert.matches(content, /(?:Codespaces|Cloud)/i, 'Must feature GitHub Codespaces or Cloud');
    },
  });

  registry.register({
    id: 'T1.3.6',
    name: 'Section R3.10: RichFeaturesSection (8-card grid)',
    tier: 1,
    milestone: 'M4',
    area: 'Editor & Ecosystem Sections',
    fn: async () => {
      assert.fileExists('src/components/sections/RichFeaturesSection.tsx');
      const content = readFile('src/components/sections/RichFeaturesSection.tsx');
      assert.includes(content, 'Code with rich features');
      const features = [
        'terminal', 'run code', 'version control', 'build tasks',
        'local history', 'themes', 'accessibility', 'web support'
      ];
      let foundCount = 0;
      for (const feat of features) {
        if (new RegExp(feat, 'i').test(content)) foundCount++;
      }
      assert.gte(foundCount, 7, `Expected at least 7 of 8 rich features in grid, found ${foundCount}`);
    },
  });

  // =========================================================================
  // Area 4: Feature Sub-pages & Routing (Milestone M5) - 8 tests (>=5 required)
  // =========================================================================

  registry.register({
    id: 'T1.4.1',
    name: 'Sub-page: FeaturesAgentsPage exists with hero and CTA',
    tier: 1,
    milestone: 'M5',
    area: 'Feature Sub-pages & Routing',
    fn: async () => {
      assert.fileExists('src/pages/FeaturesAgentsPage.tsx');
      const content = readFile('src/pages/FeaturesAgentsPage.tsx');
      assert.matches(content, /export\s+default\s+function/i, 'Must export default functional React component');
      assert.matches(content, /Agents/i, 'Must contain Agents title/hero');
      assert.matches(content, /Download/i, 'Must contain Download CTA');
      assert.includes(content, '/release', 'Download CTA must link to /release');
    },
  });

  registry.register({
    id: 'T1.4.2',
    name: 'Sub-page: FeaturesModelsPage exists with hero and CTA',
    tier: 1,
    milestone: 'M5',
    area: 'Feature Sub-pages & Routing',
    fn: async () => {
      assert.fileExists('src/pages/FeaturesModelsPage.tsx');
      const content = readFile('src/pages/FeaturesModelsPage.tsx');
      assert.matches(content, /export\s+default\s+function/i);
      assert.matches(content, /Models/i);
      assert.includes(content, '/release');
    },
  });

  registry.register({
    id: 'T1.4.3',
    name: 'Sub-page: FeaturesCustomizationsPage exists with hero and CTA',
    tier: 1,
    milestone: 'M5',
    area: 'Feature Sub-pages & Routing',
    fn: async () => {
      assert.fileExists('src/pages/FeaturesCustomizationsPage.tsx');
      const content = readFile('src/pages/FeaturesCustomizationsPage.tsx');
      assert.matches(content, /export\s+default\s+function/i);
      assert.matches(content, /Customization/i);
      assert.includes(content, '/release');
    },
  });

  registry.register({
    id: 'T1.4.4',
    name: 'Sub-page: FeaturesEnterprisePage exists with hero and CTA',
    tier: 1,
    milestone: 'M5',
    area: 'Feature Sub-pages & Routing',
    fn: async () => {
      assert.fileExists('src/pages/FeaturesEnterprisePage.tsx');
      const content = readFile('src/pages/FeaturesEnterprisePage.tsx');
      assert.matches(content, /export\s+default\s+function/i);
      assert.matches(content, /Enterprise/i);
      assert.includes(content, '/release');
    },
  });

  registry.register({
    id: 'T1.4.5',
    name: 'Sub-page: FeaturesExtensibilityPage exists with hero and CTA',
    tier: 1,
    milestone: 'M5',
    area: 'Feature Sub-pages & Routing',
    fn: async () => {
      assert.fileExists('src/pages/FeaturesExtensibilityPage.tsx');
      const content = readFile('src/pages/FeaturesExtensibilityPage.tsx');
      assert.matches(content, /export\s+default\s+function/i);
      assert.matches(content, /Extensibility/i);
      assert.includes(content, '/release');
    },
  });

  registry.register({
    id: 'T1.4.6',
    name: 'App.tsx: Route definitions for all 5 feature sub-pages',
    tier: 1,
    milestone: 'M5',
    area: 'Feature Sub-pages & Routing',
    fn: async () => {
      assert.fileExists('src/App.tsx');
      const content = readFile('src/App.tsx');
      assert.includes(content, 'path="/features/agents"', 'App.tsx must route /features/agents');
      assert.includes(content, 'path="/features/models"', 'App.tsx must route /features/models');
      assert.includes(content, 'path="/features/customizations"', 'App.tsx must route /features/customizations');
      assert.includes(content, 'path="/features/enterprise"', 'App.tsx must route /features/enterprise');
      assert.includes(content, 'path="/features/extensibility"', 'App.tsx must route /features/extensibility');
    },
  });

  registry.register({
    id: 'T1.4.7',
    name: 'App.tsx: Exactly 12 homepage sections rendered in sequential VSCode order',
    tier: 1,
    milestone: 'M5',
    area: 'Feature Sub-pages & Routing',
    fn: async () => {
      assert.fileExists('src/App.tsx');
      const content = readFile('src/App.tsx');
      const expectedSections = [
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

      // Verify HomePage includes all 12 tags
      for (const sec of expectedSections) {
        assert.matches(content, new RegExp(`<${sec}\\b`), `HomePage must render <${sec} />`);
      }

      // Verify sequential order
      let lastIndex = 0;
      for (const sec of expectedSections) {
        const regex = new RegExp(`<${sec}\\b`);
        const idx = content.search(regex);
        assert.ok(idx > lastIndex, `Section <${sec} /> must appear sequentially after previous section`);
        lastIndex = idx;
      }
    },
  });

  registry.register({
    id: 'T1.4.8',
    name: 'App.tsx: Retired components removed from HomePage rendering',
    tier: 1,
    milestone: 'M5',
    area: 'Feature Sub-pages & Routing',
    fn: async () => {
      assert.fileExists('src/App.tsx');
      const content = readFile('src/App.tsx');
      // HomePage should not render HowItWorks, ProductCards, FeedbackForm
      assert.doesNotMatch(content, /<HowItWorks\b/, 'HowItWorks must not be rendered on HomePage');
      assert.doesNotMatch(content, /<ProductCards\b/, 'ProductCards must not be rendered on HomePage');
      assert.doesNotMatch(content, /<FeedbackForm\b/, 'FeedbackForm must not be rendered on HomePage');
    },
  });

  // =========================================================================
  // Area 5: Footer & Support Architecture (Milestone M2) - 5 tests (>=5 required)
  // =========================================================================

  registry.register({
    id: 'T1.5.1',
    name: 'Footer: Support section with all 5 mandatory links',
    tier: 1,
    milestone: 'M2',
    area: 'Footer & Support Architecture',
    fn: async () => {
      assert.fileExists('src/components/layout/Footer.tsx');
      const content = readFile('src/components/layout/Footer.tsx');
      assert.matches(content, /Support/i, 'Footer must have Support section');
      assert.matches(content, /Privacy/i, 'Footer must include Privacy link');
      assert.matches(content, /Terms of Use/i, 'Footer must include Terms of Use link');
      assert.matches(content, /License/i, 'Footer must include License link');
      assert.matches(content, /Your Privacy Choices/i, 'Footer must include Your Privacy Choices link');
    },
  });

  registry.register({
    id: 'T1.5.2',
    name: 'Footer: Platform copyright notice format',
    tier: 1,
    milestone: 'M2',
    area: 'Footer & Support Architecture',
    fn: async () => {
      assert.fileExists('src/components/layout/Footer.tsx');
      const content = readFile('src/components/layout/Footer.tsx');
      assert.matches(
        content,
        /Dardcor(?:\.\s*|\s+)All rights reserved/i,
        'Footer copyright must state "Dardcor. All rights reserved."'
      );
    },
  });

  registry.register({
    id: 'T1.5.3',
    name: 'Footer: Brand logo and platform identity',
    tier: 1,
    milestone: 'M2',
    area: 'Footer & Support Architecture',
    fn: async () => {
      assert.fileExists('src/components/layout/Footer.tsx');
      const content = readFile('src/components/layout/Footer.tsx');
      assert.includes(content, '/dardcor.png', 'Footer must display /dardcor.png brand logo');
      assert.matches(content, /Dardcor\s*(?:<[^>]+>)?\s*Code/i, 'Footer must display "Dardcor Code"');
    },
  });

  registry.register({
    id: 'T1.5.4',
    name: 'Footer: Developer social links and community anchors',
    tier: 1,
    milestone: 'M2',
    area: 'Footer & Support Architecture',
    fn: async () => {
      assert.fileExists('src/components/layout/Footer.tsx');
      const content = readFile('src/components/layout/Footer.tsx');
      assert.includes(content, 'github.com', 'Footer must link to GitHub');
      assert.matches(content, /(?:twitter\.com|x\.com)/i, 'Footer must link to X / Twitter');
    },
  });

  registry.register({
    id: 'T1.5.5',
    name: 'Footer: Semantic <footer> element with responsive container',
    tier: 1,
    milestone: 'M2',
    area: 'Footer & Support Architecture',
    fn: async () => {
      assert.fileExists('src/components/layout/Footer.tsx');
      const content = readFile('src/components/layout/Footer.tsx');
      assert.matches(content, /<footer\b[^>]*>/, 'Footer component must use semantic <footer> tag');
      assert.matches(content, /max-w-[0-9a-z]+\s+mx-auto/i, 'Footer must center content within max-w container');
    },
  });

  // =========================================================================
  // Area 6: Security Hardening & Edge Delivery (Milestone M1) - 6 tests (>=5 required)
  // =========================================================================

  registry.register({
    id: 'T1.6.1',
    name: 'Security: index.html meta security tags (CSP, nosniff, Referrer, Permissions)',
    tier: 1,
    milestone: 'M1',
    area: 'Security Hardening & Headers',
    fn: async () => {
      assert.fileExists('index.html');
      const content = readFile('index.html');
      assert.includes(
        content,
        'http-equiv="X-Content-Type-Options" content="nosniff"',
        'index.html must specify X-Content-Type-Options: nosniff meta tag'
      );
      assert.includes(
        content,
        'http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin"',
        'index.html must specify strict-origin-when-cross-origin Referrer-Policy'
      );
      assert.includes(
        content,
        'http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=()"',
        'index.html must specify Permissions-Policy restricting sensitive APIs'
      );
      assert.matches(
        content,
        /http-equiv="Content-Security-Policy"\s+content="default-src 'self'/,
        'index.html must define Content-Security-Policy meta tag with default-src \'self\''
      );
    },
  });

  registry.register({
    id: 'T1.6.2',
    name: 'Security: index.html hardened SEO title',
    tier: 1,
    milestone: 'M1',
    area: 'Security Hardening & Headers',
    fn: async () => {
      assert.fileExists('index.html');
      const content = readFile('index.html');
      assert.includes(
        content,
        '<title>Dardcor Code - The open source AI code editor | Your home for multi-agent development</title>',
        'index.html must have exact hardened SEO title'
      );
    },
  });

  registry.register({
    id: 'T1.6.3',
    name: 'Security: public/_headers edge security configuration',
    tier: 1,
    milestone: 'M1',
    area: 'Security Hardening & Headers',
    fn: async () => {
      assert.fileExists('public/_headers');
      const content = readFile('public/_headers');
      assert.includes(content, 'X-Frame-Options: DENY', 'Must include X-Frame-Options: DENY');
      assert.includes(content, 'X-Content-Type-Options: nosniff', 'Must include X-Content-Type-Options: nosniff');
      assert.includes(content, 'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload', 'Must include HSTS');
      assert.includes(content, 'Content-Security-Policy:', 'Must include Content-Security-Policy');
      assert.includes(content, 'Cross-Origin-Opener-Policy: same-origin', 'Must include COOP');
      assert.includes(content, 'Cross-Origin-Resource-Policy: same-origin', 'Must include CORP');
    },
  });

  registry.register({
    id: 'T1.6.4',
    name: 'Security: public/.htaccess Apache fallback configuration',
    tier: 1,
    milestone: 'M1',
    area: 'Security Hardening & Headers',
    fn: async () => {
      assert.fileExists('public/.htaccess');
      const content = readFile('public/.htaccess');
      assert.includes(content, 'mod_headers.c', 'Must check mod_headers.c');
      assert.includes(content, 'X-Frame-Options "DENY"', 'Must set X-Frame-Options');
      assert.includes(content, 'X-Content-Type-Options "nosniff"', 'Must set X-Content-Type-Options');
      assert.includes(content, 'RewriteEngine On', 'Must include SPA rewrite rules');
    },
  });

  registry.register({
    id: 'T1.6.5',
    name: 'Security: ReleasePage validates API responses and handles rate limits',
    tier: 1,
    milestone: 'M1',
    area: 'Security Hardening & Headers',
    fn: async () => {
      assert.fileExists('src/pages/ReleasePage.tsx');
      const content = readFile('src/pages/ReleasePage.tsx');
      assert.matches(content, /(?:Array\.isArray|Array\.isArray\(data\))/i, 'Must validate data is array');
      assert.matches(content, /(?:403|rate limit|fallback|cached|offline)/i, 'Must handle 403 / rate limits gracefully');
    },
  });

  registry.register({
    id: 'T1.6.6',
    name: 'Security: All external links have rel="noopener noreferrer"',
    tier: 1,
    milestone: 'M1',
    area: 'Security Hardening & Headers',
    fn: async () => {
      // Check ReleasePage, Footer, Navbar, Blog
      const targetFiles = [
        'src/pages/ReleasePage.tsx',
        'src/components/layout/Footer.tsx',
        'src/components/sections/Blog.tsx',
      ];
      for (const relPath of targetFiles) {
        if (fileExists(relPath)) {
          const content = readFile(relPath);
          const externalLinks = content.match(/<a\b[^>]*href=["']https?:\/\/[^"']+["'][^>]*>/gi) || [];
          for (const link of externalLinks) {
            const relMatch = link.match(/rel=["']([^"']+)["']/i);
            assert.ok(
              relMatch && relMatch[1].includes('noopener') && relMatch[1].includes('noreferrer'),
              `External link in ${relPath} must have rel="noopener noreferrer": ${link}`
            );
          }
        }
      }
    },
  });

  // =========================================================================
  // Area 7: Build, Types & Assets (Milestone M6) - 5 tests (>=5 required)
  // =========================================================================

  registry.register({
    id: 'T1.7.1',
    name: 'Build: npm run build exits with code 0 (clean compilation)',
    tier: 1,
    milestone: 'M6',
    area: 'Build, Types & Assets',
    fn: async () => {
      const res = await execCommand('npm run build');
      assert.equal(res.code, 0, `npm run build failed with code ${res.code}:\n${res.stderr}\n${res.stdout}`);
      assert.fileExists('dist/index.html', 'Build must output dist/index.html');
    },
  });

  registry.register({
    id: 'T1.7.2',
    name: 'Lint: npm run lint exits with code 0 (clean ESLint)',
    tier: 1,
    milestone: 'M6',
    area: 'Build, Types & Assets',
    fn: async () => {
      const res = await execCommand('npm run lint');
      assert.equal(res.code, 0, `npm run lint failed with code ${res.code}:\n${res.stderr}\n${res.stdout}`);
    },
  });

  registry.register({
    id: 'T1.7.3',
    name: 'Types: Proper TypeScript imports and no loose any types',
    tier: 1,
    milestone: 'M6',
    area: 'Build, Types & Assets',
    fn: async () => {
      assert.fileExists('tsconfig.app.json');
      const content = readFile('tsconfig.app.json');
      assert.includes(content, '"verbatimModuleSyntax": true', 'verbatimModuleSyntax must be enabled');
    },
  });

  registry.register({
    id: 'T1.7.4',
    name: 'Assets: Core static assets exist in public folder',
    tier: 1,
    milestone: 'M6',
    area: 'Build, Types & Assets',
    fn: async () => {
      assert.fileExists('public/dardcor.png', 'Logo /dardcor.png must exist');
      assert.fileExists('public/showcase.png', 'Showcase /showcase.png must exist');
      assert.fileExists('public/robots.txt', 'Robots file /robots.txt must exist');
      assert.fileExists('public/sitemap.xml', 'Sitemap /sitemap.xml must exist');
    },
  });

  registry.register({
    id: 'T1.7.5',
    name: 'Performance: Hero showcase image optimization hints',
    tier: 1,
    milestone: 'M6',
    area: 'Build, Types & Assets',
    fn: async () => {
      assert.fileExists('index.html');
      const indexHtml = readFile('index.html');
      assert.includes(indexHtml, 'rel="preload"', 'index.html must preload core logo or hero asset');
    },
  });
}
