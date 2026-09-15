# Project: Dardcor Code Website Rebuild

## Architecture
- **Framework & Runtime**: React 19 (`react` ^19.2.4, `react-dom` ^19.2.4) + Vite 8 (`vite` ^8.0.4) + TypeScript 6 (`typescript` ~6.0.2).
- **Styling**: Tailwind CSS v4 (`tailwindcss` ^4.2.2, `@tailwindcss/vite` ^4.2.2). Brand theme declared via `@theme` in `src/index.css`.
- **Motion & Icons**: Framer Motion (`framer-motion` ^12.38.0) + Lucide React (`lucide-react` ^1.8.0).
- **Routing**: React Router DOM (`react-router-dom` ^7.18.1) with BrowserRouter in `src/main.tsx` and top-level layout in `src/App.tsx`.
- **Global Layout**: `Navbar` (top fixed sticky with scroll glassmorphism) + `<Routes>` + `Footer` (bottom with Support links & copyright).
- **Homepage Structure**: Exactly 12 sequential sections matching `code.visualstudio.com`:
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
- **Sub-pages**: 5 dedicated pages under `src/pages/` (`FeaturesAgentsPage`, `FeaturesModelsPage`, `FeaturesCustomizationsPage`, `FeaturesEnterprisePage`, `FeaturesExtensibilityPage`), plus existing `ReleasePage`.

## Feature Inventory
Every feature from the Survey phase is enumerated here with its assigned milestone.
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | R1.1 Brand Logo & Identity | Logo `/dardcor.png` + "Dardcor Code" text linking to `/` | M2 | ORIGINAL_REQUEST § R1 |
| 2 | R1.2 Features Mega-Menu | Dropdown with 5 sub-links: Agents, Customization, Models, Enterprise, Extensibility | M2 | ORIGINAL_REQUEST § R1 |
| 3 | R1.3 Docs Dropdown | Dropdown with Documentation, API, FAQ | M2 | ORIGINAL_REQUEST § R1 |
| 4 | R1.4 Nav Links | Release Notes (`/release`), Blog (`/#blog`), Learn (`/#learn`) | M2 | ORIGINAL_REQUEST § R1 |
| 5 | R1.5 Resources Dropdown | Dropdown with Extensions (`/#extensions`), MCP (`/#mcp`) | M2 | ORIGINAL_REQUEST § R1 |
| 6 | R1.6 Download CTA | Top-right primary CTA button linking to `/release` | M2 | ORIGINAL_REQUEST § R1 |
| 7 | R1.7 Glassmorphism on Scroll | Navbar toggles backdrop blur and border when `window.scrollY > 10` | M2 | ORIGINAL_REQUEST § R1 |
| 8 | R1.8 Mobile Hamburger Menu | Responsive drawer navigation with all mega-menu and direct links | M2 | ORIGINAL_REQUEST § R1 |
| 9 | R2.1 Hero Headline | "Your home for multi-agent development" | M3 | ORIGINAL_REQUEST § R2 |
| 10 | R2.2 Hero Subheadline | Descriptive copy for free, open source AI code editor across OSes | M3 | ORIGINAL_REQUEST § R2 |
| 11 | R2.3 Hero Primary CTA | "Download Dardcor Code" button linking to `/release` with OS badge | M3 | ORIGINAL_REQUEST § R2 |
| 12 | R2.4 Hero Secondary Links | Links for Web, Insiders edition, other platforms | M3 | ORIGINAL_REQUEST § R2 |
| 13 | R2.5 Hero Disclaimer | "By using Dardcor Code, you agree to its license and privacy statement." | M3 | ORIGINAL_REQUEST § R2 |
| 14 | R2.6 Tabbed Code Mockup | Animated cycling editor mockup on the right with code tabs | M3 | ORIGINAL_REQUEST § R2 |
| 15 | R3.1 AgentsBuild Section | "Agents that build for you", CLI/browser/cloud agent tasks, split mockup, CTA `/features/agents` | M3 | ORIGINAL_REQUEST § R3 |
| 16 | R3.2 MultiSurface Section | "Any agent, any model", model cards (Claude, GPT-4o, Gemini, Custom), surfaces, CTA `/features/models` | M3 | ORIGINAL_REQUEST § R3 |
| 17 | R3.3 SessionsView Section | "All your sessions, one view", session monitor mockup with states (running, completed, failed) | M3 | ORIGINAL_REQUEST § R3 |
| 18 | R3.4 CustomizationSection | "Your rules, your agents", instructions, MCP servers, plugins, CTA `/features/customizations` | M3 | ORIGINAL_REQUEST § R3 |
| 19 | R3.5 CoreEditor Section | "A world-class code editor at its core", animated before/after diff view with inline suggestions | M4 | ORIGINAL_REQUEST § R3 |
| 20 | R3.6 ExtensionsSection | "Code with extensions", 8+ cards (Python, Stripe, C/C++, Jupyter, GitLens, C#, MongoDB, Azure, Remote) | M4 | ORIGINAL_REQUEST § R3 |
| 21 | R3.7 LanguagesSection | "Code in any language", 12 language badges (JS, TS, Python, C#, C++, HTML, Java, JSON, PHP, Markdown, pwsh, YAML) | M4 | ORIGINAL_REQUEST § R3 |
| 22 | R3.8 CustomizableSection | "Fully customizable", 3 cards: Color themes, Settings Sync, Profiles | M4 | ORIGINAL_REQUEST § R3 |
| 23 | R3.9 CodeAnywhereSection | "Code anywhere", 2 cards: Source Control (Git) and GitHub Codespaces | M4 | ORIGINAL_REQUEST § R3 |
| 24 | R3.10 RichFeaturesSection | "Code with rich features", 8-card grid: Terminal, Run code, Version control, Build tasks, Local history, Themes, Accessibility, Web | M4 | ORIGINAL_REQUEST § R3 |
| 25 | R4.1 FeaturesAgentsPage | Dedicated sub-page `/features/agents` with navbar, footer, hero, and agent features | M5 | ORIGINAL_REQUEST § R4 |
| 26 | R4.2 FeaturesModelsPage | Dedicated sub-page `/features/models` with navbar, footer, hero, and model harness info | M5 | ORIGINAL_REQUEST § R4 |
| 27 | R4.3 FeaturesCustomizationsPage | Dedicated sub-page `/features/customizations` with navbar, footer, hero, rules & MCP | M5 | ORIGINAL_REQUEST § R4 |
| 28 | R4.4 FeaturesEnterprisePage | Dedicated sub-page `/features/enterprise` with navbar, footer, hero, compliance & security | M5 | ORIGINAL_REQUEST § R4 |
| 29 | R4.5 FeaturesExtensibilityPage | Dedicated sub-page `/features/extensibility` with navbar, footer, hero, APIs & extensions | M5 | ORIGINAL_REQUEST § R4 |
| 30 | R5.1 Homepage Section Order | Exactly 12 sections in VSCode.com order in `src/App.tsx` | M5 | ORIGINAL_REQUEST § R5 |
| 31 | R5.2 Retired Sections Removed | Remove HowItWorks, ProductCards, FeedbackForm from homepage | M5 | ORIGINAL_REQUEST § R5 |
| 32 | R5.3 Route Integration | Wire all 5 `/features/*` routes in `src/App.tsx` | M5 | ORIGINAL_REQUEST § R5 |
| 33 | R6.1 Footer Support Section | Support column with Support, Privacy, Terms of Use, License, Your Privacy Choices | M2 | ORIGINAL_REQUEST § R6 |
| 34 | R6.2 Footer Copyright | Platform copyright: `© {year} Dardcor. All rights reserved.` | M2 | ORIGINAL_REQUEST § R6 |
| 35 | R7.1 HTML Security Meta Tags | CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy in `index.html` | M1 | ORIGINAL_REQUEST § R7 |
| 36 | R7.2 SEO Title Hardening | Update title to `"Dardcor Code - The open source AI code editor \| Your home for multi-agent development"` | M1 | ORIGINAL_REQUEST § R7 |
| 37 | R7.3 Edge Headers Config | Create `public/_headers` with strict security headers for Netlify/Cloudflare | M1 | ORIGINAL_REQUEST § R7 |
| 38 | R7.4 Apache Config Fallback | Create `public/.htaccess` with mod_headers and SPA rewrite fallback | M1 | ORIGINAL_REQUEST § R7 |
| 39 | R7.5 ReleasePage Hardening | Validate GitHub API response, enforce `rel="noopener noreferrer"`, handle 403 rate limits | M1 | ORIGINAL_REQUEST § R7 |
| 40 | R7.6 Site-wide Link Hardening | Enforce `rel="noopener noreferrer"` across all external links | M1 | ORIGINAL_REQUEST § R7 |
| 41 | E2E.1 Full Build & Lint Pass | `npm run build` exits with code 0; `npm run lint` exits with code 0 | M6 | ORIGINAL_REQUEST Acceptance |
| 42 | E2E.2 Type Safety & Clean Code | No `any` types, explicit `import type` for verbatimModuleSyntax | M6 | ORIGINAL_REQUEST Acceptance |
| 43 | E2E.3 Mobile Responsiveness | Clean rendering at 375px viewport with no horizontal overflow | M6 | ORIGINAL_REQUEST Acceptance |
| 44 | E2E.4 Performance & LCP | `fetchpriority="high"` for hero assets, `loading="lazy"` for below-fold | M6 | ORIGINAL_REQUEST Acceptance |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Security & Global Configuration | R7 (index.html, public/_headers, public/.htaccess, ReleasePage.tsx, external links) | none | DONE |
| M2 | Navigation & Footer Architecture | R1 (Navbar mega-menu, mobile hamburger, glassmorphism) & R6 (Footer Support, copyright) | none | DONE |
| M3 | Hero & Core AI Sections | R2 (Hero rewrite, mockup) & R3.1-R3.4 (AgentsBuild, MultiSurface, SessionsView, CustomizationSection) | none | DONE |
| M4 | Editor & Ecosystem Sections | R3.5-R3.10 (CoreEditor, ExtensionsSection, LanguagesSection, CustomizableSection, CodeAnywhereSection, RichFeaturesSection) | none | IN_PROGRESS |
| M5 | Feature Sub-pages & App Integration | R4 (5 sub-pages), R5 (App.tsx homepage 12-section order, route integration, legacy removal) | M2, M3, M4 | PLANNED |
| M6 | E2E Verification & Hardening | Acceptance verification (build, lint, types, responsive, opaque-box tests, adversarial review) | M1, M2, M3, M4, M5 | PLANNED |

## Interface Contracts

### Navigation & Routing Contract
- All internal routes must use `react-router-dom` `Link` or `useNavigate`.
- Feature routes:
  - `/features/agents`
  - `/features/models`
  - `/features/customizations`
  - `/features/enterprise`
  - `/features/extensibility`
- Anchor routes on homepage:
  - `/#features`, `/#extensions`, `/#languages`, `/#blog`, `/#mcp`
- External links:
  - Every external anchor must include `target="_blank"` and `rel="noopener noreferrer"`.

### Section Component Contract
Every section component in `src/components/sections/` must:
1. Export a default functional React component (`export default function ComponentName()`).
2. Be wrapped in a semantic `<section id="...">` container with responsive padding (`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto`).
3. Follow the brand design tokens:
   - Surface: `bg-surface-base`, cards: `bg-surface-card border border-border-default hover:border-border-hover`
   - Primary Accent: `text-dc-600`, `bg-dc-600 hover:bg-dc-500 text-white`
   - Typography: `font-display` for headings, `font-sans` for body, `font-mono` for code snippets
4. Be fully responsive down to 375px without triggering horizontal scroll (`overflow-hidden` or responsive grids).
5. Use `import type` for all TypeScript type-only imports (enforced by `verbatimModuleSyntax`).

### Sub-Page Component Contract
Every sub-page in `src/pages/` must:
1. Export a default functional React component.
2. Render page-specific content with consistent header/hero, feature details, and a prominent "Download Free" CTA leading to `/release`.
3. Provide seamless visual continuity with the global Navbar and Footer.

## Code Layout
```
Website-Dardcor-Code/
├── public/
│   ├── _headers                    # [M1: DONE] Netlify / Cloudflare Pages security headers
│   ├── .htaccess                   # [M1: DONE] Apache mod_headers and SPA rewrite rules
│   ├── dardcor.png                 # Existing logo asset
│   ├── showcase.png                # Existing showcase asset
│   ├── robots.txt                  # Existing robots.txt
│   └── sitemap.xml                 # Sitemap
├── index.html                      # [M1: DONE] Root HTML with security meta tags & updated title
├── src/
│   ├── main.tsx                    # React entry point with BrowserRouter
│   ├── App.tsx                     # [M5] Route definitions & 12-section homepage sequencer
│   ├── index.css                   # Tailwind v4 theme definitions and utilities
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # [M2: DONE] VSCode mega-menu navigation
│   │   │   └── Footer.tsx          # [M2: DONE] Footer with Support column and copyright
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # [M3: DONE] VSCode download-focused hero with tabbed code mockup
│   │   │   ├── AgentsBuild.tsx     # [M3: DONE] "Agents that build for you"
│   │   │   ├── MultiSurface.tsx    # [M3: DONE] "Any agent, any model"
│   │   │   ├── SessionsView.tsx    # [M3: DONE] "All your sessions, one view"
│   │   │   ├── CustomizationSection.tsx # [M3: DONE] "Your rules, your agents"
│   │   │   ├── CoreEditor.tsx      # [M4: IN_PROGRESS] "A world-class code editor at its core"
│   │   │   ├── ExtensionsSection.tsx    # [M4: IN_PROGRESS] "Code with extensions"
│   │   │   ├── LanguagesSection.tsx     # [M4: IN_PROGRESS] "Code in any language"
│   │   │   ├── CustomizableSection.tsx  # [M4: IN_PROGRESS] "Fully customizable"
│   │   │   ├── CodeAnywhereSection.tsx  # [M4: IN_PROGRESS] "Code anywhere"
│   │   │   ├── RichFeaturesSection.tsx  # [M4: IN_PROGRESS] "Code with rich features"
│   │   │   ├── Blog.tsx            # [Retained] Section 12 blog cards
│   │   │   ├── HowItWorks.tsx      # [Retired from homepage]
│   │   │   └── ProductCards.tsx    # [Retired from homepage]
│   │   ├── forms/
│   │   │   └── FeedbackForm.tsx    # [Retired from homepage]
│   │   └── ui/
│   │       └── AnimatedBackground.tsx # Existing ambient canvas layer
│   └── pages/
│       ├── ReleasePage.tsx         # [M1: DONE] Hardened release notes & download page
│       ├── FeaturesAgentsPage.tsx  # [M5] /features/agents
│       ├── FeaturesModelsPage.tsx  # [M5] /features/models
│       ├── FeaturesCustomizationsPage.tsx # [M5] /features/customizations
│       ├── FeaturesEnterprisePage.tsx     # [M5] /features/enterprise
│       └── FeaturesExtensibilityPage.tsx  # [M5] /features/extensibility
```
