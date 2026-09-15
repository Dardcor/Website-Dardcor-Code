# Project Orchestration Plan: Dardcor Code Website Rebuild

## Objective
Rebuild the Dardcor Code website to match code.visualstudio.com structure, features, and layout with strict security hardening, zero lint/build errors, clean TypeScript types, full mobile responsiveness, and visual parity.

## Target Stack
React 19 + TypeScript + Vite + Tailwind CSS v4 + framer-motion + react-router-dom + lucide-react. (No stack changes or external package installations).

## Phased Strategy

### Phase 0: Survey & Codebase Mapping
- Spawn 3 parallel survey explorers / spec miners to inspect:
  1. Existing codebase structure (App.tsx, components, sections, pages, routes, public assets, styles, package.json).
  2. Requirements mapping & feature inventory against ORIGINAL_REQUEST.md.
  3. Security & configuration requirements (index.html, public/_headers, public/.htaccess, ReleasePage.tsx).
- Synthesize findings into `PROJECT.md` and `TEST_INFRA.md`.

### Phase 1: Milestone Decomposition & Architecture (PROJECT.md)
Decompose work into clear, modular milestones:
- **Milestone 1: Security & Global Configuration**
  - index.html security meta tags & title
  - public/_headers & public/.htaccess
  - ReleasePage security fixes (rel="noopener noreferrer", GitHub API response validation)
- **Milestone 2: Navigation & Footer**
  - Navbar with VSCode-style mega menu (Features, Docs, Resources dropdowns, mobile menu, glassmorphism)
  - Footer with Support section and platform copyright
- **Milestone 3: Hero & Core Homepage Sections (Part 1)**
  - Hero section redesign with cycling tabbed editor mockup, download CTA, brand styling
  - AgentsBuild, MultiSurface, SessionsView, CustomizationSection
- **Milestone 4: Editor & Ecosystem Homepage Sections (Part 2)**
  - CoreEditor, ExtensionsSection, LanguagesSection, CustomizableSection, CodeAnywhereSection, RichFeaturesSection
- **Milestone 5: Feature Sub-pages & Routing Integration**
  - FeaturesAgentsPage, FeaturesModelsPage, FeaturesCustomizationsPage, FeaturesEnterprisePage, FeaturesExtensibilityPage
  - App.tsx route integration, homepage section ordering (12 sections), removal of retired sections
- **Milestone 6: Verification & Hardening (E2E & Build Assurance)**
  - Full TypeScript build (`npm run build`)
  - ESLint verification (`npm run lint`)
  - Mobile responsiveness (375px) check
  - Security audit and adversarial validation
  - Pass 100% acceptance criteria

### Phase 2: Execution & Verification Loop
For each milestone:
1. Dispatch Worker with strict boundaries & integrity warning.
2. Dispatch Reviewers to inspect quality, types, and logic.
3. Dispatch Challengers to empirically verify functionality and responsiveness.
4. Dispatch Forensic Auditor for integrity and anti-cheat verification.
5. Check gate criteria in GATE_STATUS.md before advancing.

### Phase 3: Final Synthesis & Reporting
- Generate final delivery summary.
- Verify zero regressions across build, lint, and runtime.
- Report completion to Sentinel.
