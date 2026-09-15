# Milestone 2: Navigation & Footer Architecture — Changes Log

**Agent Identity**: `m2_worker`  
**Milestone**: M2 (Navigation & Footer Architecture)  
**Date**: 2026-09-10  

---

## 1. Files Modified

### `src/components/layout/Navbar.tsx`
- **Replaced**: Legacy navbar with complete VSCode.com-style responsive navigation architecture.
- **Brand Identification**:
  - Logo rendered at `/dardcor.png` with text `Dardcor <span className="text-dc-600">Code</span>` linking to root `/`.
  - Non-wrapping whitespace formatting with `whitespace-nowrap tracking-tight flex items-center`.
- **Navigation Dropdowns & Menus**:
  - **Mega-dropdown "Features"**: 5 sub-routes (`/features/agents`, `/features/customizations`, `/features/models`, `/features/enterprise`, `/features/extensibility`) featuring icon badges, titles, and descriptions.
  - **Dropdown "Docs"**: Sub-links for Documentation (`https://github.com/Dardcor/Dardcor-Code#readme`, external with secure opener), API (`/release#api`), and FAQ (`/#faq`).
  - **Direct Nav Links**: Release Notes (`/release`), Blog (`/#blog`), and Learn (`/#learn`).
  - **Dropdown "Resources"**: Sub-links for Extensions (`/#extensions`) and MCP (`/#mcp`).
  - **Download CTA**: Top-right button linking to `/release` styled with brand purple `bg-dc-600 hover:bg-dc-500` and Lucide `Download` icon.
- **Scroll Detection & Glassmorphism**:
  - Passive event listener detecting `window.scrollY > 10` toggling `bg-surface-card/85 backdrop-blur-md border-b border-border-default shadow-xs`.
- **Mobile Responsive Drawer**:
  - Accessible hamburger button with `p-2` touch target sizing and ARIA label.
  - Animated sliding drawer via Framer Motion with `overflow-hidden`.
  - Full categorization of all Features, Docs, Resources, and direct links with click-to-close handler `closeMobile`.
  - Auto-close on viewport resize to desktop (`>= 768px`).

### `src/components/layout/Footer.tsx`
- **Support Section**:
  - Added 4th link group "Support" containing all 5 mandatory links:
    * Support (`mailto:support@dardcor.dev`, external)
    * Privacy (`/#privacy`)
    * Terms of Use (`/#terms`)
    * License (`https://github.com/Dardcor/Dardcor-Code/blob/main/LICENSE`, external)
    * Your Privacy Choices (`/#privacy-choices`)
- **Security & Accessibility Hardening**:
  - Updated X/Twitter social icon link `aria-label` to `"Dardcor on X"` to satisfy accessibility pattern requirements.
  - Ensured all external links across social and navigation columns strictly define `target="_blank" rel="noopener noreferrer"`.
- **Bottom Bar Platform Copyright**:
  - Rendered `&copy; {new Date().getFullYear()} Dardcor. All rights reserved. Built for the developer community.`

### `src/pages/ReleasePage.tsx`
- **Component Refresh Audit**:
  - Verified non-component helper functions (`isValidHttpsUrl`, `parseReleaseAsset`, `parseGitHubRelease`, `validateReleasesResponse`) are unexported private functions, satisfying `react-refresh/only-export-components`.

---

## 2. Verification Summary

| Target / Suite | Command | Result |
|---|---|---|
| **M2 Test Suite** | `node scripts/test-e2e.mjs --milestone M2` | **26 / 26 PASSED (100%)** |
| **ESLint** | `npm run lint` | **Exit code 0 (0 errors, 0 warnings)** |
| **TypeScript & Vite Build** | `npm run build` | **Exit code 0 (`tsc -b && vite build` clean)** |
| **M1 Regression Check** | `node scripts/test-e2e.mjs --milestone M1` | **16 / 16 PASSED (100%)** |
| **M6 Regression Check** | `node scripts/test-e2e.mjs --milestone M6` | **10 / 10 PASSED (100%)** |
| **Global Suite Progress** | `node scripts/test-e2e.mjs` | **60 / 102 PASSED (up from 48)** |
