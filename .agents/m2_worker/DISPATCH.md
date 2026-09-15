## 2026-09-10T04:30:55Z
You are the Navigation & Footer Architecture Worker for Milestone 2.
Your identity: m2_worker
Your working directory: C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\.agents\m2_worker

MANDATORY: Read ORIGINAL_REQUEST.md at:
C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\.agents\ORIGINAL_REQUEST.md
And read PROJECT.md at:
C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\.agents\orchestrator\PROJECT.md
And read survey specifications:
- C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\.agents\spec_miner_survey\survey_spec.md
- C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\TEST_READY.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Scope and File Ownership:
You exclusively own and must modify:
1. `src/components/layout/Navbar.tsx`:
   - Overhaul into full VSCode-style navigation (R1):
     * Logo: `/dardcor.png` + "Dardcor Code" text linking to `/`.
     * Mega-dropdown "Features" with 5 sub-links:
       - Agents (`/features/agents`)
       - Agent Customization (`/features/customizations`)
       - Models & Agent Harnesses (`/features/models`)
       - Enterprise (`/features/enterprise`)
       - Extensibility (`/features/extensibility`)
     * Dropdown "Docs" with sub-links:
       - Documentation (`https://github.com/Dardcor/Dardcor-Code#readme`)
       - API (`/release#api`)
       - FAQ (`/#faq`)
     * Nav links:
       - Release Notes (`/release`)
       - Blog (`/#blog`)
       - Learn (`/#learn`)
     * Dropdown "Resources" with sub-links:
       - Extensions (`/#extensions`)
       - MCP (`/#mcp`)
     * CTA button: "Download" (links to `/release`) with Lucide `Download` icon.
     * Mobile hamburger menu with all links in a responsive drawer (< md screens).
     * Glassmorphism backdrop blur on scroll (`window.scrollY > 10` toggles `bg-surface-card/85 backdrop-blur-md border-b border-border-default shadow-xs`).
2. `src/components/layout/Footer.tsx`:
   - Update according to R6:
     * Add "Support" section with links: Support, Privacy, Terms of Use, License, Your Privacy Choices.
     * Keep existing columns updated and ensure all external links have `rel="noopener noreferrer" target="_blank"`.
     * Bottom bar: platform copyright `© {new Date().getFullYear()} Dardcor. All rights reserved. Built for the developer community.`
3. Minor Polish in `src/pages/ReleasePage.tsx`:
   - Remove `export` keyword from local helper functions (`isValidHttpsUrl`, `parseReleaseAsset`, `parseGitHubRelease`, `validateReleasesResponse`) so `react-refresh/only-export-components` lint rule passes cleanly.

Verification:
- Run `node scripts/test-e2e.mjs --milestone M2` and ensure all 26 M2 tests pass.
- Run `npm run lint` and ensure exit code 0.
- Run `npm run build` and ensure exit code 0.

Write your changes to `changes.md` and `handoff.md` in your working directory and notify the orchestrator when finished.
