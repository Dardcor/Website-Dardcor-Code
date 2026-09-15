# Original User Request

## 2026-09-10T04:09:48Z

Rebuild the Dardcor Code website to match the Visual Studio Code official website (code.visualstudio.com) exactly in structure, features, and layout — with all names replaced by "Dardcor Code". Apply strict security hardening throughout.

Working directory: C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code

Stack: React 19 + TypeScript + Vite + Tailwind CSS v4 + framer-motion + react-router-dom + lucide-react. Do NOT change the stack or install new packages.

## Requirements

### R1. Navbar — VSCode-style mega menu
Replace the current Navbar with a VSCode.com-style navigation that includes:
- Logo: "Dardcor Code" (keep existing logo image at /dardcor.png)
- Mega-dropdown "Features" → sub-links: Agents, Agent Customization, Models & Agent Harnesses, Enterprise, Extensibility
- Mega-dropdown "Docs" → sub-links: Documentation, API, FAQ
- Nav links: Release Notes, Blog, Learn
- Dropdown "Resources" → sub-links: Extensions, MCP
- CTA button: "Download" (links to /release)
- Mobile hamburger menu with all links
- Glassmorphism backdrop blur on scroll
- File: src/components/layout/Navbar.tsx (MODIFY)

### R2. Hero — Download-focused, VSCode homepage style
Replace the current Hero section with:
- Headline: "Your home for multi-agent development"
- Subheadline: "Dardcor Code is a free, open source AI code editor. Build with AI agents that plan, code, and debug for you. Manage multi-agent workflows across environments on Linux, macOS, and Windows."
- Primary CTA: "Download Dardcor Code" (big blue button, links to /release)
- Secondary links: "Web", "Insiders edition", "other platforms" (anchor to /release)
- Disclaimer: "By using Dardcor Code, you agree to its license and privacy statement."
- Animated code editor mockup on the right (tabbed, showing different code snippets cycling through)
- Keep the brand color scheme (dc-600 = #5a38d9 purple)
- File: src/components/sections/Hero.tsx (MODIFY)

### R3. New homepage sections (all matching VSCode.com sections)
Create these new section components in src/components/sections/:

**AgentsBuild.tsx** — "Agents that build for you"
- Description: "Hand off tasks to AI agents that autonomously plan, make code changes, run commands, and iterate until the job is done."
- Features list: assign CLI-based agent for background bug fixes, browser-integrated agent for feature implementation, cloud agent for PRs
- Animated code/task panel mockup (left: task panel, right: code view)
- CTA: "Get started with agents" → /features/agents

**MultiSurface.tsx** — "Any agent, any model"
- Description: "Use the agent harness that fits your workflow. Run agents locally or in the cloud, with Copilot or third-party providers like Claude and OpenAI."
- Model grid: Claude, GPT-4o, Gemini, Custom model (cards with logo-like icons)
- Surface list: Dardcor Code, CLI, Web, Mobile
- CTA: "See how agents work across surfaces"

**SessionsView.tsx** — "All your sessions, one view"
- Description: "Stay productive while multiple agents work on tasks in parallel. Track all your agent sessions from a single view, regardless of where they run."
- UI mockup: session list panel with filter/monitor controls
- Animated session items showing different task states (running, completed, failed)

**CustomizationSection.tsx** — "Your rules, your agents"
- Description: "Ensure agents follow your practices and team workflows. Define custom instructions, add agent skills, or build custom agents tailored to your project."
- Feature cards: Custom instructions, MCP servers, Agent plugins/extensions
- CTA: "Connect to external tools with MCP servers"

**CoreEditor.tsx** — "A world-class code editor at its core"
- Description: "VS Code has been the editor of choice for millions of developers for over a decade. AI-powered inline suggestions, intelligent completions, and a rich editing experience."
- Animated code diff view (showing before/after code edit with inline suggestion)
- CTA: "Get started with Dardcor Code"

**ExtensionsSection.tsx** — "Code with extensions"
- Extension cards (similar to VSCode.com): Python, Stripe, C/C++, Jupyter, GitLens, C# Dev Kit, MongoDB, GitHub Copilot for Azure, Remote Development
- Each card: icon + name + short desc
- Footer link: "View 80k+ extensions in the Extension Marketplace"

**LanguagesSection.tsx** — "Code in any language"
- Language tags grid: JavaScript, TypeScript, Python, C#, C++, HTML, Java, JSON, PHP, Markdown, PowerShell, YAML
- Description: "Dardcor Code supports almost every major programming language. Several ship in the box, but extensions for others can be found in the Marketplace."

**CustomizableSection.tsx** — "Fully customizable"
- 3 feature cards: Color themes (with preview), Settings Sync (with cloud icon), Profiles (with switch animation)
- Description: "Customize your Dardcor Code UI and layout so that it fits your coding style."

**CodeAnywhereSection.tsx** — "Code anywhere"
- 2 feature cards: Built-in Source Control (Git out-of-the-box), GitHub Codespaces (cloud environments)
- Description: "Code wherever you're most productive, whether connected to the cloud, a remote repository, or in the browser."

**RichFeaturesSection.tsx** — "Code with rich features"
- 8-card grid:
  1. Integrated terminal — "Use your favorite shell: zsh, pwsh, git bash, all inside the editor."
  2. Run code — "Run and debug your code without leaving your editor."
  3. Version control — "Built-in support for git and many other source control providers."
  4. Build tasks — "Run tools and analyze their results from within Dardcor Code."
  5. Local history — "Never lose your changes with automatically tracked local history."
  6. Themes — "Your theme is an extension of your personality. Add some flair."
  7. Accessibility — "Optimized for screen readers, high contrast themes, and keyboard-only navigation."
  8. Web support — "Whether on phone, tablet, or desktop, access your code from anywhere."

### R4. Feature sub-pages
Create placeholder pages in src/pages/ for VSCode-style navigation:
- FeaturesAgentsPage.tsx — /features/agents
- FeaturesModelsPage.tsx — /features/models
- FeaturesCustomizationsPage.tsx — /features/customizations
- FeaturesEnterprisePage.tsx — /features/enterprise
- FeaturesExtensibilityPage.tsx — /features/extensibility

Each page: full navbar + footer, hero section with feature title, short description, and "Download Free" CTA. Use existing color scheme.

Add routes for all these pages in src/App.tsx.

### R5. Update App.tsx homepage section order
Replace the old HomePage component in src/App.tsx to use this section order (matching VSCode.com):
1. Hero
2. AgentsBuild
3. MultiSurface
4. SessionsView
5. CustomizationSection
6. CoreEditor
7. ExtensionsSection
8. LanguagesSection
9. CustomizableSection
10. CodeAnywhereSection
11. RichFeaturesSection
12. Blog

REMOVE: HowItWorks, ProductCards, FeedbackForm from homepage (deleted components or moved to separate files but not rendered on homepage).

### R6. Footer update
Modify src/components/layout/Footer.tsx to add:
- Section "Support" with links: Support, Privacy, Terms of Use, License, Your Privacy Choices
- Keep existing sections but update links where relevant
- Bottom bar: show platform copyright

### R7. Security hardening

**index.html** — add these meta security tags inside `<head>`:
```html
<meta http-equiv="X-Content-Type-Options" content="nosniff" />
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
<meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=()" />
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.github.com https://fonts.googleapis.com; frame-ancestors 'none';" />
```

Update SEO title: `"Dardcor Code - The open source AI code editor | Your home for multi-agent development"`

**public/_headers** (NEW file — Netlify/Cloudflare Pages):
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.github.com; frame-ancestors 'none';
  X-Permitted-Cross-Domain-Policies: none
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
```

**public/.htaccess** (NEW file — Apache hosting fallback):
Add equivalent Apache header directives.

**ReleasePage.tsx** — security: add `rel="noopener noreferrer"` to all external links, validate GitHub API response before rendering.

## Acceptance Criteria

### Build & Type Safety
- [ ] `npm run build` exits with code 0 (no TypeScript errors, no Vite build errors)
- [ ] `npm run lint` exits with code 0 (no ESLint errors)
- [ ] All new components import types correctly, no `any` types

### Visual Parity with VSCode.com
- [ ] Homepage has exactly 12 sections in the correct VSCode.com order (Hero + 10 new + Blog)
- [ ] Navbar has Features mega-dropdown, Docs dropdown, Resources dropdown, all links present
- [ ] Hero headline is "Your home for multi-agent development"
- [ ] Download buttons show OS options (macOS, Windows, Linux, Web)
- [ ] ExtensionsSection shows at least 8 extension cards
- [ ] LanguagesSection shows at least 10 language tags
- [ ] RichFeaturesSection shows 8 feature cards

### Sub-pages
- [ ] Routes /features/agents, /features/models, /features/customizations, /features/enterprise, /features/extensibility all return 200 (no 404)
- [ ] Each sub-page has navbar and footer

### Security
- [ ] public/_headers file exists with X-Frame-Options, CSP, HSTS, X-Content-Type-Options
- [ ] index.html has CSP meta tag
- [ ] All external links have rel="noopener noreferrer"
- [ ] No inline event handlers (onclick="...") in HTML

### Responsive
- [ ] All new sections render correctly at 375px width (mobile)
- [ ] Navbar mobile hamburger shows all links

### Performance
- [ ] Hero image/showcase.png uses `loading="lazy"` (non-hero) and `fetchpriority="high"` if it's LCP
- [ ] No console errors or warnings in browser devtools
