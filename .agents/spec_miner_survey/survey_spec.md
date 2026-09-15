# Comprehensive Requirements Survey & Specification

**Project**: Dardcor Code Website Rebuild  
**Target Architecture**: 1:1 structural, layout, and feature parity with Visual Studio Code official website (`code.visualstudio.com`), branded as **Dardcor Code**  
**Author**: `spec_miner_survey` (Specification Miner)  
**Date**: 2026-09-10  
**Status**: Authoritative Specification Baseline  

---

## 1. Executive Overview & Scope

The purpose of this project is to rebuild the official website for **Dardcor Code** (`https://dardcor-code.web.id/`), replacing the previous generic presentation with a developer-centric, download-focused, feature-rich web platform modeled directly on `code.visualstudio.com`.

### Core Mandates:
1. **1:1 Structural & Visual Parity with VSCode.com**:
   - Navigation with multi-column mega-menus, documentation links, resources, and download CTA.
   - Hero section featuring headline "Your home for multi-agent development", multi-OS download action, and animated cycling editor mockup.
   - 10 new homepage sections mirroring VS Code's modern AI & editor feature showcase.
   - Exact 12-section homepage order with legacy components (`HowItWorks`, `ProductCards`, `FeedbackForm`) removed from the homepage flow.
   - 5 dedicated feature sub-pages under `/features/*`.
   - Updated footer including a dedicated Support column and platform copyright.
2. **Strict Security Hardening**:
   - Comprehensive Content Security Policy (CSP), HSTS, Permissions-Policy, Referrer-Policy, and X-Content-Type-Options.
   - Edge headers for Netlify / Cloudflare Pages (`public/_headers`).
   - Server-level Apache configuration with SPA routing fallback (`public/.htaccess`).
   - Hardened `ReleasePage.tsx` with API schema validation and `rel="noopener noreferrer"`.
3. **Strict Technology Stack Preservation**:
   - React 19 (`react` ^19.2.4, `react-dom` ^19.2.4)
   - TypeScript (~6.0.2)
   - Vite (^8.0.4) with `@vitejs/plugin-react`
   - Tailwind CSS v4 (`tailwindcss` ^4.2.2, `@tailwindcss/vite` ^4.2.2)
   - Framer Motion (`framer-motion` ^12.38.0)
   - React Router DOM (`react-router-dom` ^7.18.1)
   - Lucide React (`lucide-react` ^1.8.0)
   - **Zero new npm package dependencies allowed**.

---

## 2. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | R1: Navbar | Brand Identification | Display logo `/dardcor.png` and text "Dardcor Code" linking to `/` | User click | Navigate to `/` | None; fallback text | `ORIGINAL_REQUEST.md` R1 |
| 2 | R1: Navbar | Features Mega-Menu | Dropdown menu revealing 5 sub-links: Agents, Agent Customization, Models & Agent Harnesses, Enterprise, Extensibility | Mouse hover, focus, click | Animated mega-menu flyout with links and descriptions | Closed on escape / mouse leave | `ORIGINAL_REQUEST.md` R1 |
| 3 | R1: Navbar | Docs Dropdown | Menu revealing Documentation, API, and FAQ sub-links | Mouse hover, focus, click | Dropdown list with docs anchors/links | Closed on escape / mouse leave | `ORIGINAL_REQUEST.md` R1 |
| 4 | R1: Navbar | Direct Nav Links | Links for "Release Notes" (`/release`), "Blog" (`/#blog`), and "Learn" (`/#learn`) | User click | Navigation / smooth scroll | Safe fallback to `/` | `ORIGINAL_REQUEST.md` R1 |
| 5 | R1: Navbar | Resources Dropdown | Dropdown revealing "Extensions" and "MCP" links | Mouse hover, focus, click | Dropdown list with resource anchors | Closed on escape / mouse leave | `ORIGINAL_REQUEST.md` R1 |
| 6 | R1: Navbar | Primary Download CTA | Top-right persistent CTA button linking to `/release` | User click | Navigate to `/release` | Standard route navigation | `ORIGINAL_REQUEST.md` R1 |
| 7 | R1: Navbar | Glassmorphism on Scroll | Navbar dynamically transitions to blurred glass background upon page scroll | Window scroll position (`window.scrollY > 10`) | Class toggle to `bg-surface-card/85 backdrop-blur-md border-b` | Passive listener, fallback to transparent | `ORIGINAL_REQUEST.md` R1 |
| 8 | R1: Navbar | Mobile Hamburger Menu | Full-screen or sliding drawer containing all navigation groups and links | Mobile viewport, hamburger button toggle | Drawer displaying all links categorized with close-on-click | Toggle button aria-expanded state | `ORIGINAL_REQUEST.md` R1 |
| 9 | R2: Hero | Multi-Agent Headline | Display headline: "Your home for multi-agent development" | Viewport load | Render bold H1 with brand gradient accents | Display standard text fallback | `ORIGINAL_REQUEST.md` R2 |
| 10 | R2: Hero | AI Subheadline | Display copy explaining free, open source AI code editor with multi-agent workflows on Linux, macOS, and Windows | Viewport load | Render styled paragraph | None | `ORIGINAL_REQUEST.md` R2 |
| 11 | R2: Hero | Primary Download CTA | Big prominent download button linking to `/release` with OS badge/dropdown | User click | Navigates to `/release` or platform installer | None | `ORIGINAL_REQUEST.md` R2 |
| 12 | R2: Hero | Secondary Platform Links | Links for "Web", "Insiders edition", "other platforms" | User click | Anchored to `/release` | None | `ORIGINAL_REQUEST.md` R2 |
| 13 | R2: Hero | Legal Disclaimer | "By using Dardcor Code, you agree to its license and privacy statement." | Viewport load | Render subtle text with links | None | `ORIGINAL_REQUEST.md` R2 |
| 14 | R2: Hero | Tabbed Code Mockup | Animated IDE editor mockup on the right, cycling through tabbed code snippets | Timer interval (3-4s) or tab click | Code panel updates active tab and syntax-highlighted code | Graceful static tab fallback | `ORIGINAL_REQUEST.md` R2 |
| 15 | R3: Homepage | AgentsBuild Section | "Agents that build for you" with feature list (CLI agent, browser agent, cloud agent), split task/code mockup, and CTA | Viewport scroll | Render section with animated 2-pane task/code mockup | Standard layout fallback | `ORIGINAL_REQUEST.md` R3 |
| 16 | R3: Homepage | MultiSurface Section | "Any agent, any model" with model cards (Claude, GPT-4o, Gemini, Custom) and surface list (IDE, CLI, Web, Mobile) | Viewport scroll | Interactive cards showcasing LLM providers and platforms | Static grid fallback | `ORIGINAL_REQUEST.md` R3 |
| 17 | R3: Homepage | SessionsView Section | "All your sessions, one view" showing multi-agent session monitor UI mockup with running, completed, and failed states | Viewport scroll | Render mock session list with status filters and active pulses | Static session list fallback | `ORIGINAL_REQUEST.md` R3 |
| 18 | R3: Homepage | CustomizationSection | "Your rules, your agents" with 3 feature cards (Custom instructions, MCP servers, Agent plugins/extensions) and MCP CTA | Viewport scroll | Card grid with interactive hover effects and CTA | None | `ORIGINAL_REQUEST.md` R3 |
| 19 | R3: Homepage | CoreEditor Section | "A world-class code editor at its core" highlighting VS Code foundation and inline suggestions, with animated diff view | Viewport scroll | Split code diff view demonstrating AI autocomplete/diff | Static diff view fallback | `ORIGINAL_REQUEST.md` R3 |
| 20 | R3: Homepage | ExtensionsSection | "Code with extensions" featuring >= 8 cards (Python, Stripe, C/C++, Jupyter, GitLens, C#, MongoDB, Copilot Azure, Remote) | Viewport scroll | Grid of extension cards with icons, descriptions, and marketplace link | None | `ORIGINAL_REQUEST.md` R3 |
| 21 | R3: Homepage | LanguagesSection | "Code in any language" featuring interactive or visual tags for >= 10 languages (JS, TS, Python, C#, C++, HTML, Java, JSON, etc.) | Viewport scroll | Language tag pills with syntax highlights and marketplace note | None | `ORIGINAL_REQUEST.md` R3 |
| 22 | R3: Homepage | CustomizableSection | "Fully customizable" with 3 cards: Color themes (with preview), Settings Sync (cloud icon), Profiles (switch animation) | Viewport scroll | Feature cards with interactive theme toggle or preview | Default theme display | `ORIGINAL_REQUEST.md` R3 |
| 23 | R3: Homepage | CodeAnywhereSection | "Code anywhere" with 2 cards: Built-in Source Control (Git) and GitHub Codespaces (cloud environments) | Viewport scroll | 2-column feature highlight with graphics and copy | None | `ORIGINAL_REQUEST.md` R3 |
| 24 | R3: Homepage | RichFeaturesSection | "Code with rich features" 8-card grid: Terminal, Run code, Version control, Build tasks, Local history, Themes, Accessibility, Web | Viewport scroll | 8-card responsive feature matrix with icons and concise text | None | `ORIGINAL_REQUEST.md` R3 |
| 25 | R4: Sub-Pages | FeaturesAgentsPage | Dedicated page `/features/agents` with full navbar, footer, hero, and agent workflow deep dive | Route navigation | Render sub-page with HTTP 200 equivalent | 404 handled by Router | `ORIGINAL_REQUEST.md` R4 |
| 26 | R4: Sub-Pages | FeaturesModelsPage | Dedicated page `/features/models` with model harness explanations and BYOK documentation | Route navigation | Render sub-page with HTTP 200 equivalent | 404 handled by Router | `ORIGINAL_REQUEST.md` R4 |
| 27 | R4: Sub-Pages | FeaturesCustomizationsPage | Dedicated page `/features/customizations` covering instructions, MCP servers, and tool integrations | Route navigation | Render sub-page with HTTP 200 equivalent | 404 handled by Router | `ORIGINAL_REQUEST.md` R4 |
| 28 | R4: Sub-Pages | FeaturesEnterprisePage | Dedicated page `/features/enterprise` detailing security, air-gapped support, and compliance | Route navigation | Render sub-page with HTTP 200 equivalent | 404 handled by Router | `ORIGINAL_REQUEST.md` R4 |
| 29 | R4: Sub-Pages | FeaturesExtensibilityPage | Dedicated page `/features/extensibility` explaining extension APIs and plugin architectures | Route navigation | Render sub-page with HTTP 200 equivalent | 404 handled by Router | `ORIGINAL_REQUEST.md` R4 |
| 30 | R5: Routing | 12-Section Homepage Order | Homepage orchestrates exactly 12 sections: Hero -> AgentsBuild -> MultiSurface -> SessionsView -> CustomizationSection -> CoreEditor -> ExtensionsSection -> LanguagesSection -> CustomizableSection -> CodeAnywhereSection -> RichFeaturesSection -> Blog | Route `/` | Exact sequential layout matching VSCode.com | None | `ORIGINAL_REQUEST.md` R5 |
| 31 | R5: Routing | Legacy Component Removal | `HowItWorks`, `ProductCards`, and `FeedbackForm` removed from homepage rendering | Render `/` | None of the legacy 3 components rendered on `/` | None | `ORIGINAL_REQUEST.md` R5 |
| 32 | R6: Footer | Support Section | Footer includes new "Support" column with Support, Privacy, Terms of Use, License, and Your Privacy Choices links | Viewport scroll to bottom | Render links with appropriate hrefs and rel attributes | None | `ORIGINAL_REQUEST.md` R6 |
| 33 | R6: Footer | Copyright & Community Bar | Bottom footer bar displaying `© {currentYear} Dardcor. All rights reserved. Built for the developer community.` | Viewport render | Formatted year and copyright string | Static fallback year | `ORIGINAL_REQUEST.md` R6 |
| 34 | R7: Security | HTML Security Meta Tags | Meta tags in `index.html` for X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and Content-Security-Policy | HTML head evaluation | Security policies applied by browser | Gracefully ignored by older user-agents | `ORIGINAL_REQUEST.md` R7 |
| 35 | R7: Security | SEO Title Hardening | Update title to `"Dardcor Code - The open source AI code editor \| Your home for multi-agent development"` | Document title evaluation | Browser title bar and search snippet display | Fallback to default | `ORIGINAL_REQUEST.md` R7 |
| 36 | R7: Security | Netlify/Cloudflare `_headers` | `public/_headers` defining strict security headers across all routes (`/*`) | Edge proxy response | Edge injects HSTS, CSP, X-Frame-Options: DENY, etc. | Server fallback | `ORIGINAL_REQUEST.md` R7 |
| 37 | R7: Security | Apache `.htaccess` Fallback | `public/.htaccess` providing mod_headers security directives and SPA URL rewrite rules | Apache web server request | Server sends security headers and redirects deep links to `index.html` | Fallback if mod_headers missing | `ORIGINAL_REQUEST.md` R7 |
| 38 | R7: Security | ReleasePage API Validation | Sanitize and validate GitHub Releases API response structure before state commitment | JSON payload from GitHub API | Typed, verified release list; invalid items discarded | Display user-friendly error UI, no unhandled crashes | `ORIGINAL_REQUEST.md` R7 |
| 39 | R7: Security | External Link Hardening | All external hyperlinks configured with `rel="noopener noreferrer"` and `target="_blank"` | Link interaction | Secure browsing context without `window.opener` leakage | None | `ORIGINAL_REQUEST.md` R7 |
| 40 | Performance | Image Loading Strategy | Hero LCP image prioritized (`fetchpriority="high"`), all below-fold images use `loading="lazy"` | Browser resource loader | Optimal Core Web Vitals (LCP < 2.5s) | Default loading fallback | `ORIGINAL_REQUEST.md` Acceptance Criteria |

---

## 3. Edge Cases & Constraints

| # | Feature | Input / Condition | Expected / Observed Behavior |
|---|---------|-------------------|-------------------------------|
| 1 | Navbar Mega-Menu | Rapid hover over multiple dropdown items or quick mouse leave | Animated menu transitions smoothly without flickering, unmounting cleanly via Framer Motion `AnimatePresence`. |
| 2 | Navbar Mobile Menu | Window resized from mobile (< 768px) to desktop (>= 768px) while mobile menu is open | Mobile drawer automatically closes or hides, desktop navigation smoothly resumes without frozen overlay state. |
| 3 | Navbar Backdrop Blur | Page rendered at exact top (`scrollY === 0`) vs. scrolled down by 1px | Top state remains transparent to blend with Hero background; scrolled state applies subtle border and backdrop blur without layout shift. |
| 4 | Hero Code Mockup | User has `prefers-reduced-motion: reduce` enabled | Code cycling animation halts or transitions with instant cut; pulse indicators and gradient animations cease infinite loop. |
| 5 | Hero Download Button | User on Linux / Windows / macOS / Mobile device | Button defaults to primary download target while providing visible, accessible platform options for other operating systems. |
| 6 | SessionsView Mockup | High contrast or dark/light themes | Status tags (green for completed, amber/blue for running, red for failed) maintain WCAG AA contrast ratio (>= 4.5:1). |
| 7 | CoreEditor Diff View | Mobile viewport (375px) | Diff view stacks vertically or provides horizontal scrolling without causing parent page horizontal overflow (`overflow-x: hidden`). |
| 8 | Extensions Section | Displaying on tablet (768px) or mobile (375px) | Extension cards reflow gracefully into 1 column (mobile), 2 columns (tablet), and 3-4 columns (desktop). |
| 9 | Feature Sub-Pages | Direct browser navigation / refresh on `/features/agents` | SPA router serves `index.html` via `.htaccess` / `_headers` rewrite, React Router loads page with HTTP 200, matching navbar and footer. |
| 10 | ReleasePage GitHub API | GitHub API rate limit (HTTP 403), network failure, or malformed JSON | ReleasePage catches error gracefully, displays alert message (`Could not load release data`), and falls back to static release links. |
| 11 | ReleasePage Asset Parsing | Assets array contains non-standard binaries (e.g., `.blockmap`, `.yml`, `.zip`) | Filter safely isolates `.dmg`, `.exe`, `.AppImage`, `.deb`, `.rpm`, `.tar.gz` and groups them into macOS, Windows, Linux cards without throwing errors. |
| 12 | Content Security Policy | External font and API connections | Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`) and GitHub API (`api.github.com`) explicitly allowed; all unauthorized domains blocked. |
| 13 | Clickjacking Protection | Iframe embedding by third-party origins | `frame-ancestors 'none'` in CSP and `X-Frame-Options: DENY` prevent any frame embedding. |
| 14 | Responsive Viewport Width | Screen width down to 320px - 375px | All sections, cards, and code mockups scale down cleanly with padding adjustments (`px-4 sm:px-6`); zero horizontal scrollbars. |

---

## 4. Deep-Dive Component Specifications

### 4.1. R1: Navbar — VSCode-Style Mega Menu (`src/components/layout/Navbar.tsx`)

#### Functional Requirements:
- **Sticky / Fixed Container**: `fixed top-0 inset-x-0 z-50` with transition on scroll.
- **Scroll Detection**: A state hook `isScrolled` tracks `window.scrollY > 10`.
  - Scrolled: `bg-surface-card/85 backdrop-blur-md border-b border-border-default shadow-xs`
  - Unscrolled: `bg-transparent border-b border-transparent`
- **Logo**: `/dardcor.png` (height 28-32px), text `Dardcor Code` (Code highlighted in `text-dc-600`), linking to `/`.
- **Navigation Groups**:
  1. **Features** (Mega-dropdown):
     - `Agents` (`/features/agents`) — "Autonomous coding agents for bug fixes and features"
     - `Agent Customization` (`/features/customizations`) — "Define custom rules, instructions, and MCP tools"
     - `Models & Agent Harnesses` (`/features/models`) — "Claude, GPT-4o, Gemini, and local Ollama models"
     - `Enterprise` (`/features/enterprise`) — "Security, air-gapped readiness, and governance"
     - `Extensibility` (`/features/extensibility`) — "Build custom plugins, tools, and extensions"
  2. **Docs** (Dropdown):
     - `Documentation` (`https://github.com/Dardcor/Dardcor-Code#readme` or `/docs`)
     - `API` (`/release#api` or `/docs/api`)
     - `FAQ` (`/#faq`)
  3. **Direct Links**:
     - `Release Notes` (`/release`)
     - `Blog` (`/#blog`)
     - `Learn` (`/#learn`)
  4. **Resources** (Dropdown):
     - `Extensions` (`/#extensions` or marketplace anchor)
     - `MCP` (`/#mcp` or Model Context Protocol anchor)
  5. **CTA Button**:
     - Label: "Download"
     - Icon: `Download` (Lucide)
     - Target: `/release`
     - Styling: `bg-dc-600 hover:bg-dc-500 text-white px-4 py-2 rounded-lg font-semibold text-sm`
- **Mobile Hamburger**:
  - Visible on `< md` screens (`md:hidden`).
  - Toggles a full mobile navigation panel with smooth slide-down / fade animation.
  - Groups all 5 categories with clear typography and click-to-close behavior.

---

### 4.2. R2: Hero Section (`src/components/sections/Hero.tsx`)

#### Functional Requirements:
- **Headline**: `"Your home for multi-agent development"` (using `font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight`).
- **Subheadline**: `"Dardcor Code is a free, open source AI code editor. Build with AI agents that plan, code, and debug for you. Manage multi-agent workflows across environments on Linux, macOS, and Windows."`
- **Primary CTA**:
  - Label: `"Download Dardcor Code"`
  - Style: Big high-contrast button (`bg-dc-600 hover:bg-dc-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-dc-600/20`).
  - Target: `/release`.
  - Platform detection indicator: e.g., "for Windows x64" with small dropdown chevron or badges for macOS / Linux.
- **Secondary Links**:
  - Direct links: `"Web"`, `"Insiders edition"`, `"other platforms"` (all linking to `/release`).
- **Disclaimer**:
  - Copy: `"By using Dardcor Code, you agree to its license and privacy statement."` (links to license and privacy policies).
- **Animated Code Editor Mockup**:
  - Right-hand side container in a 2-column grid (`lg:w-[48%]`).
  - Window chrome with macOS-style control buttons (red, amber, green dots).
  - Tab bar cycling through multiple tabs: e.g. `agent-worker.ts`, `api-service.py`, `database.rs`.
  - Active editor pane displaying syntax-highlighted code with simulated typing, agent status indicators, and diff highlights.
  - Marquee or ticker at bottom showing supported tech stack ecosystem.

---

### 4.3. R3: 10 New Homepage Sections

#### 1. `AgentsBuild.tsx` — "Agents that build for you"
- **Purpose**: Highlight autonomous agent workflows from task assignment to completion.
- **Header**:
  - Eyebrow: "Autonomous Execution"
  - Headline: "Agents that build for you"
  - Description: "Hand off tasks to AI agents that autonomously plan, make code changes, run commands, and iterate until the job is done."
- **Key Features**:
  1. *CLI-based agent*: Background bug fixes and system diagnostics in terminal.
  2. *Browser-integrated agent*: Feature implementation and live DOM verification.
  3. *Cloud agent*: Automated PR generation and CI/CD test fixes.
- **Visual Mockup**:
  - Dual-panel interface: Left pane displays Agent Plan (tasks, step progress, terminal output); Right pane displays live code diff/editor.
- **CTA**: `"Get started with agents"` → `/features/agents`.

#### 2. `MultiSurface.tsx` — "Any agent, any model"
- **Purpose**: Showcase model flexibility and multi-platform presence.
- **Header**:
  - Eyebrow: "Model & Platform Freedom"
  - Headline: "Any agent, any model"
  - Description: "Use the agent harness that fits your workflow. Run agents locally or in the cloud, with Copilot or third-party providers like Claude and OpenAI."
- **Model Grid**:
  - 4 Cards:
    1. *Claude* (Anthropic) — Complex architectural reasoning and refactoring.
    2. *GPT-4o* (OpenAI) — High-speed multimodal analysis and code generation.
    3. *Gemini* (Google) — Massive 2M context window for full-repo indexing.
    4. *Custom Models* (Ollama / Local) — Private, air-gapped models running on local hardware.
- **Surface List**:
  - Dardcor Code Desktop IDE, CLI Terminal, Web Browser, Mobile Remote Manager.
- **CTA**: `"See how agents work across surfaces"` → `/features/models`.

#### 3. `SessionsView.tsx` — "All your sessions, one view"
- **Purpose**: Manage multiple concurrent agent workflows.
- **Header**:
  - Eyebrow: "Parallel Orchestration"
  - Headline: "All your sessions, one view"
  - Description: "Stay productive while multiple agents work on tasks in parallel. Track all your agent sessions from a single view, regardless of where they run."
- **UI Mockup**:
  - Agent Session Dashboard:
    - Status Filter Bar: "All (5)", "Running (2)", "Completed (2)", "Failed (1)".
    - Active Session Cards:
      - `auth-refactor` | Status: *Running* (78%) | "Migrating to JWT RS256..."
      - `unit-tests-v2` | Status: *Completed* | "Added 42 tests, 100% pass"
      - `e2e-cypress` | Status: *Failed* | "Timed out waiting for selector #submit"
      - `api-docs-gen` | Status: *Running* (34%) | "Extracting OpenAPI schemas..."
- **Visual Details**: Animated pulse indicators, status pills, and action controls (Pause, Inspect, Retry).

#### 4. `CustomizationSection.tsx` — "Your rules, your agents"
- **Purpose**: Governance, custom rules, and tool integration via MCP.
- **Header**:
  - Eyebrow: "Full Control"
  - Headline: "Your rules, your agents"
  - Description: "Ensure agents follow your practices and team workflows. Define custom instructions, add agent skills, or build custom agents tailored to your project."
- **Feature Cards**:
  1. *Custom Instructions*: `.dardcor/rules` and system prompts defining coding guidelines, lint rules, and architecture boundaries.
  2. *MCP Servers*: Connect agents directly to local tools, databases, APIs, and file systems using the Model Context Protocol.
  3. *Agent Plugins & Extensions*: Extend capabilities with domain skills, verification routines, and custom actions.
- **CTA**: `"Connect to external tools with MCP servers"` → `/features/customizations`.

#### 5. `CoreEditor.tsx` — "A world-class code editor at its core"
- **Purpose**: Emphasize speed, familiarity, and heritage built upon the battle-tested VS Code foundation.
- **Header**:
  - Eyebrow: "Editor Excellence"
  - Headline: "A world-class code editor at its core"
  - Description: "VS Code has been the editor of choice for millions of developers for over a decade. AI-powered inline suggestions, intelligent completions, and a rich editing experience."
- **Visual Mockup**:
  - Animated code diff view showing inline suggestions (ghost text) with Tab to accept / Esc to dismiss.
  - Interactive syntax highlighting and line numbers.
- **CTA**: `"Get started with Dardcor Code"` → `/release`.

#### 6. `ExtensionsSection.tsx` — "Code with extensions"
- **Purpose**: Showcase the massive ecosystem of extensions.
- **Header**:
  - Eyebrow: "Limitless Ecosystem"
  - Headline: "Code with extensions"
  - Subtitle: "Customize your setup with extensions for every language, framework, and cloud service."
- **Extension Cards (>= 8-9 items)**:
  1. *Python* (Microsoft) — IntelliSense, linting, debugging, code formatting.
  2. *Stripe* — Build, test, and trigger webhook events within the editor.
  3. *C/C++* — C/C++ language support, debugging, and code browsing.
  4. *Jupyter* — Interactive computing, notebook editing, and data exploration.
  5. *GitLens* — Supercharge Git with visual diffs, blame annotations, and revision history.
  6. *C# Dev Kit* — Official C# language support powered by Roslyn.
  7. *MongoDB* — Manage databases, run queries, and inspect collections.
  8. *GitHub Copilot for Azure* — Cloud deployment, resource management, and diagnostics.
  9. *Remote Development* — Work inside containers, WSL, or over SSH seamlessly.
- **Footer Link**: `"View 80k+ extensions in the Extension Marketplace"` (links to marketplace).

#### 7. `LanguagesSection.tsx` — "Code in any language"
- **Purpose**: Reassure developers that their language of choice is supported out of the box.
- **Header**:
  - Eyebrow: "Universal Support"
  - Headline: "Code in any language"
  - Description: "Dardcor Code supports almost every major programming language. Several ship in the box, but extensions for others can be found in the Marketplace."
- **Language Grid (>= 10 languages)**:
  - JavaScript, TypeScript, Python, C#, C++, HTML, Java, JSON, PHP, Markdown, PowerShell, YAML, Go, Rust.
  - Visual badges with language color dots and syntax snippets.

#### 8. `CustomizableSection.tsx` — "Fully customizable"
- **Purpose**: Highlighting themes, keybindings, and synchronizations.
- **Header**:
  - Eyebrow: "Tailored Experience"
  - Headline: "Fully customizable"
  - Description: "Customize your Dardcor Code UI and layout so that it fits your coding style."
- **3 Feature Cards**:
  1. *Color Themes*: Light, Dark, High Contrast, and community themes with live preview.
  2. *Settings Sync*: Cloud synchronization of keybindings, extensions, snippets, and preferences across devices.
  3. *Profiles*: Switch instantly between specialized configurations (e.g. Web Dev, Python Data Science, C++ Systems).

#### 9. `CodeAnywhereSection.tsx` — "Code anywhere"
- **Purpose**: Cloud and distributed development capabilities.
- **Header**:
  - Eyebrow: "Total Mobility"
  - Headline: "Code anywhere"
  - Description: "Code wherever you're most productive, whether connected to the cloud, a remote repository, or in the browser."
- **2 Feature Cards**:
  1. *Built-in Source Control*: Git out-of-the-box with staging, commits, branches, stashes, and conflict resolution.
  2. *GitHub Codespaces & Cloud Environments*: Instant development environments spinning up in seconds in the cloud or browser.

#### 10. `RichFeaturesSection.tsx` — "Code with rich features"
- **Purpose**: Matrix of core developer conveniences.
- **Header**:
  - Eyebrow: "Built-In Power"
  - Headline: "Code with rich features"
  - Subtitle: "Everything you need to build great software, out of the box."
- **8-Card Responsive Grid**:
  1. *Integrated terminal*: "Use your favorite shell: zsh, pwsh, git bash, all inside the editor."
  2. *Run code*: "Run and debug your code without leaving your editor."
  3. *Version control*: "Built-in support for git and many other source control providers."
  4. *Build tasks*: "Run tools and analyze their results from within Dardcor Code."
  5. *Local history*: "Never lose your changes with automatically tracked local history."
  6. *Themes*: "Your theme is an extension of your personality. Add some flair."
  7. *Accessibility*: "Optimized for screen readers, high contrast themes, and keyboard-only navigation."
  8. *Web support*: "Whether on phone, tablet, or desktop, access your code from anywhere."

---

### 4.4. R4: 5 Feature Sub-Pages

All sub-pages must be created in `src/pages/` and include:
- `Navbar` at top and `Footer` at bottom
- `AnimatedBackground` for visual continuity
- Hero section with feature title, eyebrow, and "Download Free" CTA
- Deep-dive feature cards and technical breakdowns
- Clean responsive layout matching the `#5a38d9` brand styling

1. **`FeaturesAgentsPage.tsx` (`/features/agents`)**:
   - Title: "Autonomous Agents — Dardcor Code"
   - Headline: "Autonomous agents that code with you"
   - Content: Deep-dive into Agent Planning, Step Execution, Test-Driven Verification, and Multi-Agent Collaboration.

2. **`FeaturesModelsPage.tsx` (`/features/models`)**:
   - Title: "Models & Harnesses — Dardcor Code"
   - Headline: "Any model. Any harness. Zero lock-in."
   - Content: Model providers (Anthropic Claude 3.7 / 3.5 Sonnet, OpenAI GPT-4o, Google Gemini 2.0 Flash / Pro, DeepSeek, Local Ollama), BYOK security, latency benchmarks.

3. **`FeaturesCustomizationsPage.tsx` (`/features/customizations`)**:
   - Title: "Agent Customization — Dardcor Code"
   - Headline: "Your rules, your agents, your workflows"
   - Content: `.dardcor/rules` system prompts, Model Context Protocol (MCP) servers, skill bundles, workspace configuration.

4. **`FeaturesEnterprisePage.tsx` (`/features/enterprise`)**:
   - Title: "Enterprise Ready — Dardcor Code"
   - Headline: "Enterprise-grade AI development with complete privacy"
   - Content: Air-gapped deployments, zero data retention agreements, SOC 2 compliance, audit logs, role-based access control.

5. **`FeaturesExtensibilityPage.tsx` (`/features/extensibility`)**:
   - Title: "Extensibility — Dardcor Code"
   - Headline: "Build the next generation of developer tools"
   - Content: Extension API, VS Code API backward compatibility, MCP custom server development, agent runtime hooks.

---

### 4.5. R5: Routing & Exact 12-Section Homepage Order

#### Exact Homepage Section Sequence in `src/App.tsx`:
```tsx
function HomePage() {
  return (
    <>
      <main className="relative z-10">
        <Hero />                  {/* 1 */}
        <AgentsBuild />           {/* 2 */}
        <MultiSurface />          {/* 3 */}
        <SessionsView />          {/* 4 */}
        <CustomizationSection />  {/* 5 */}
        <CoreEditor />            {/* 6 */}
        <ExtensionsSection />     {/* 7 */}
        <LanguagesSection />      {/* 8 */}
        <CustomizableSection />   {/* 9 */}
        <CodeAnywhereSection />   {/* 10 */}
        <RichFeaturesSection />   {/* 11 */}
        <Blog />                  {/* 12 */}
      </main>
      <Footer />
    </>
  );
}
```

#### Explicitly Removed from Homepage:
- `HowItWorks`
- `ProductCards`
- `FeedbackForm`
- `Showcase` (legacy image container replaced by inline editor mockups across sections)

#### Complete React Router Configuration in `src/App.tsx`:
```tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/release" element={<ReleasePage />} />
  <Route path="/features/agents" element={<FeaturesAgentsPage />} />
  <Route path="/features/models" element={<FeaturesModelsPage />} />
  <Route path="/features/customizations" element={<FeaturesCustomizationsPage />} />
  <Route path="/features/enterprise" element={<FeaturesEnterprisePage />} />
  <Route path="/features/extensibility" element={<FeaturesExtensibilityPage />} />
</Routes>
```

---

### 4.6. R6: Footer Updates (`src/components/layout/Footer.tsx`)

#### Footer Column Structure:
1. **Brand Column**: Logo, "Dardcor Code", mission statement, social links (GitHub, X, YouTube, Mail).
2. **Product**: Dardcor Code, CLI, SDK, Manager, API Reference.
3. **Resources**: Documentation, Changelog, Tutorials, FAQ.
4. **Company**: About, Blog, Contact.
5. **Support** (*NEW*):
   - Support (`mailto:support@dardcor.dev` or `#support`)
   - Privacy (`/privacy` or `#privacy`)
   - Terms of Use (`/terms` or `#terms`)
   - License (`https://github.com/Dardcor/Dardcor-Code/blob/main/LICENSE`)
   - Your Privacy Choices (`#privacy-choices`)
6. **Bottom Bar**:
   - Left: `© {new Date().getFullYear()} Dardcor. All rights reserved.`
   - Right: `Built for the developer community`

---

### 4.7. R7: Security Hardening

#### 1. `index.html` Meta Tags & Title
Inside `<head>`:
```html
<title>Dardcor Code - The open source AI code editor | Your home for multi-agent development</title>
<meta http-equiv="X-Content-Type-Options" content="nosniff" />
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
<meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=()" />
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.github.com https://fonts.googleapis.com; frame-ancestors 'none';" />
```
*Note*: Ensure no inline event handlers (`onclick="..."`) exist in `index.html`.

#### 2. `public/_headers` (Netlify / Cloudflare Pages)
File path: `public/_headers`
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

#### 3. `public/.htaccess` (Apache Web Server Fallback)
File path: `public/.htaccess`
```apache
<IfModule mod_headers.c>
  Header set X-Frame-Options "DENY"
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"
  Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
  Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.github.com https://fonts.googleapis.com; frame-ancestors 'none';"
  Header set X-Permitted-Cross-Domain-Policies "none"
  Header set Cross-Origin-Opener-Policy "same-origin"
  Header set Cross-Origin-Resource-Policy "same-origin"
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### 4. `ReleasePage.tsx` Security Hardening
- **API Response Validation**:
  ```ts
  function validateRelease(data: unknown): GitHubRelease[] {
    if (!Array.isArray(data)) return [];
    return data
      .filter((item): item is GitHubRelease => {
        return (
          typeof item === 'object' &&
          item !== null &&
          typeof (item as GitHubRelease).tag_name === 'string' &&
          typeof (item as GitHubRelease).name === 'string' &&
          Array.isArray((item as GitHubRelease).assets)
        );
      })
      .map((r) => ({
        tag_name: String(r.tag_name || ''),
        name: String(r.name || r.tag_name || ''),
        body: typeof r.body === 'string' ? r.body : '',
        published_at: String(r.published_at || new Date().toISOString()),
        html_url: typeof r.html_url === 'string' && r.html_url.startsWith('https://') ? r.html_url : '#',
        assets: Array.isArray(r.assets)
          ? r.assets
              .filter((a) => typeof a === 'object' && a !== null && typeof a.name === 'string' && typeof a.browser_download_url === 'string' && a.browser_download_url.startsWith('https://'))
              .map((a) => ({
                name: String(a.name),
                browser_download_url: String(a.browser_download_url),
                size: Number(a.size) || 0,
              }))
          : [],
      }));
  }
  ```
- **External Links**:
  Ensure every `<a>` tag with `target="_blank"` contains `rel="noopener noreferrer"`.

---

## 5. Acceptance Criteria & Verification Matrix

### 5.1. Build & Type Safety
- [ ] `npm run build` exits with code 0 (0 TypeScript errors, 0 Vite build errors).
- [ ] `npm run lint` exits with code 0 (0 ESLint warnings/errors).
- [ ] Strict typing on all components and data structures (zero `any` types).

### 5.2. Visual Parity with VSCode.com
- [ ] Homepage has exactly 12 sections in the exact order:
  1. `Hero`
  2. `AgentsBuild`
  3. `MultiSurface`
  4. `SessionsView`
  5. `CustomizationSection`
  6. `CoreEditor`
  7. `ExtensionsSection`
  8. `LanguagesSection`
  9. `CustomizableSection`
  10. `CodeAnywhereSection`
  11. `RichFeaturesSection`
  12. `Blog`
- [ ] Navbar contains:
  - Mega-dropdown "Features" with 5 sub-links.
  - Dropdown "Docs" with 3 sub-links.
  - Direct links: Release Notes, Blog, Learn.
  - Dropdown "Resources" with 2 sub-links.
  - Download CTA button.
- [ ] Hero contains:
  - Headline: "Your home for multi-agent development".
  - Multi-OS download CTA with platform options.
  - Animated cycling tabbed editor mockup.
- [ ] ExtensionsSection displays at least 8 extension cards with icons, names, and descriptions.
- [ ] LanguagesSection displays at least 10 language tags.
- [ ] RichFeaturesSection displays 8 distinct feature cards.

### 5.3. Sub-pages
- [ ] 5 sub-pages implemented in `src/pages/`:
  - `/features/agents` (`FeaturesAgentsPage.tsx`)
  - `/features/models` (`FeaturesModelsPage.tsx`)
  - `/features/customizations` (`FeaturesCustomizationsPage.tsx`)
  - `/features/enterprise` (`FeaturesEnterprisePage.tsx`)
  - `/features/extensibility` (`FeaturesExtensibilityPage.tsx`)
- [ ] Each sub-page renders full `Navbar` and `Footer`, feature title, description, and "Download Free" CTA.
- [ ] Routes return 200 without blank screens or console errors.

### 5.4. Security Hardening
- [ ] `public/_headers` exists with `X-Frame-Options: DENY`, CSP, HSTS, `X-Content-Type-Options: nosniff`.
- [ ] `public/.htaccess` exists with Apache headers and SPA rewrite fallback.
- [ ] `index.html` has `<meta http-equiv="Content-Security-Policy">` and hardened security meta tags.
- [ ] All external links have `rel="noopener noreferrer"`.
- [ ] `ReleasePage.tsx` validates GitHub API response before setting state.
- [ ] Zero inline event handlers in HTML.

### 5.5. Responsive Design
- [ ] Clean rendering at mobile viewport width of 375px (no horizontal scrolling).
- [ ] Navbar mobile hamburger menu displays all categories and links, closing upon selection.

### 5.6. Performance
- [ ] Hero image has `fetchpriority="high"` if LCP candidate.
- [ ] Non-hero images have `loading="lazy"` and `decoding="async"`.
- [ ] Zero uncaught errors or console warnings in browser devtools.
