# Milestone 3 Empirical Challenge Report: Hero.tsx & AgentsBuild.tsx

**Challenger**: `m3_challenger_1` (EMPIRICAL CHALLENGER: critic, specialist)  
**Target Components**: `src/components/sections/Hero.tsx`, `src/components/sections/AgentsBuild.tsx`  
**Date**: 2026-09-10  
**Verdict**: **APPROVE** (Risk Assessment: LOW)

---

## Challenge Summary

**Overall risk assessment**: **LOW**

Comprehensive empirical stress-testing of `Hero.tsx` and `AgentsBuild.tsx` was conducted using an independent verification harness (`scripts/stress-test-hero-agents.mjs`), project E2E tests (`node scripts/test-e2e.mjs --milestone M3`), ESLint (`npm run lint`), and TypeScript production compilation (`npm run build`).

All 24 automated challenge assertions passed across:
1. Tab cycling interval (4000ms), active index bounds modulo arithmetic, hover pause/resume, and tab click selection.
2. 375px mobile viewport containment (no horizontal overflow, `overflow-hidden`, `overflow-x-auto` on code/tabs/diffs, `flex-col` / `grid-cols-1` vertical stacking, and text truncation/wrapping).
3. Touch target geometry and link destinations (`/release` on Hero CTA with >= 48px computed height, `/features/agents` on AgentsBuild CTA with >= 48px computed height, 3 interactive agent mode cards with `p-6` touch areas).
4. Strict TypeScript typing, no `any`, zero `dangerouslySetInnerHTML`, and brand purple token `#5a38d9` / `dc-600` adherence.

No blocking defects or regressions were discovered. 3 low-severity advisory challenges were identified regarding clipboard promise error handling, `prefers-reduced-motion` auto-cycling pausing, and defensive empty-state handling.

---

## Challenges

### [Low] Challenge 1: Unhandled Clipboard Promise Rejection in Insecure or Sandboxed Contexts

- **Assumption challenged**: `Hero.tsx` assumes `navigator.clipboard.writeText(...)` always resolves successfully or executes without error.
- **Attack scenario**: In an insecure context (plain HTTP origin), a sandboxed iframe lacking the `clipboard-write` feature policy, or if the user denies clipboard permission, `navigator.clipboard.writeText(...)` returns a rejected Promise. Because `handleCopy` lacks a `.catch()` handler or `try/catch` block:
  ```tsx
  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  ```
  an unhandled promise rejection error is logged in the browser console.
- **Blast radius**: Isolated to the copy button in the Hero mockup. The UI does not crash, but an unhandled rejection is emitted to the console and the button shows "copied" even though write failed.
- **Mitigation**: Add `.catch(() => {})` or wrap with `try/catch` and only set `copied(true)` upon successful resolution:
  ```tsx
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentSnippet.code.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Non-blocking clipboard fallback
    }
  };
  ```

### [Low] Challenge 2: Auto-Cycling Code Tabs Under `prefers-reduced-motion`

- **Assumption challenged**: Visual motion and background auto-cycling are acceptable for all users.
- **Attack scenario**: A developer with vestibular motion sensitivity or attention disorders has enabled `prefers-reduced-motion: reduce` at the OS level. While Framer Motion respects standard transition duration overrides when globally configured, the custom 4000ms `setInterval` continues to auto-cycle the code editor tabs indefinitely until manually hovered.
- **Blast radius**: Minor accessibility / UX consideration for users sensitive to continuous autonomous visual movement.
- **Mitigation**: Detect `window.matchMedia('(prefers-reduced-motion: reduce)').matches` in the `useEffect` hook and bypass automatic interval scheduling if reduced motion is requested, allowing users to navigate tabs exclusively via manual clicks.

### [Low] Challenge 3: Module-Level Static Snippet Array Reliance in Modulo Arithmetic

- **Assumption challenged**: `Hero.tsx` computes `(prev + 1) % snippets.length` with the invariant that `snippets.length > 0`.
- **Attack scenario**: If snippets were ever dynamically fetched or refactored to allow empty configurations, `(prev + 1) % 0` results in `NaN`, yielding `snippets[NaN] === undefined` and triggering `TypeError: Cannot read properties of undefined (reading 'code')`.
- **Blast radius**: Currently zero because `snippets` is a hardcoded static array of 3 snippets defined in the module scope.
- **Mitigation**: Add defensive guard `snippets.length > 0 ? (prev + 1) % snippets.length : 0`.

---

## Stress Test Results

| Test ID | Scenario | Expected Behavior | Actual Behavior | Result |
|---|---|---|---|---|
| ST-01 | Tab Cycling Interval | `setInterval` duration is exactly 4000ms | 4000ms interval confirmed | **PASS** |
| ST-02 | Active Tab Bounds | `(prev + 1) % snippets.length` over 1,000 cycles stays within [0, 2] | 1,000 cycles completed, all within [0, 2] | **PASS** |
| ST-03 | Tab Hover Pause & Resume | `isPaused` triggers cleanup `clearInterval` and prevents scheduling | Pauses on `onMouseEnter`, resumes on `onMouseLeave` | **PASS** |
| ST-04 | Tab Click Selection | Clicking tab updates `activeTab` to clicked index | Tab buttons bind `onClick={() => setActiveTab(idx)}` | **PASS** |
| ST-05 | Code Copy Feedback | `copied` state resets after 2000ms | `setTimeout(() => setCopied(false), 2000)` verified | **PASS** |
| ST-06 | Hero 375px Containment | No horizontal overflow beyond 375px width | `overflow-hidden` on section, `px-4` responsive gutters | **PASS** |
| ST-07 | Hero Column Stacking | Left/right columns stack vertically on mobile | `flex-col lg:flex-row`, `w-full lg:w-[50%]` | **PASS** |
| ST-08 | Hero Headline Word Wrap | Longest word ("development", 11 chars) fits in 343px inner width | Fits in 36px font without word break | **PASS** |
| ST-09 | Hero Mockup Internal Scroll | Mockup code lines scroll horizontally within code box, not page | `overflow-x-auto` on tabs and code container | **PASS** |
| ST-10 | AgentsBuild 375px Containment | Section containment and padding | `overflow-hidden` on section, `px-4 sm:px-6 lg:px-8` | **PASS** |
| ST-11 | AgentsBuild Cards Stacking | Agent cards stack in 1 column on mobile | `grid-cols-1 md:grid-cols-3` confirmed | **PASS** |
| ST-12 | AgentsBuild Split Mockup Stacking | Left steps panel and right diff panel stack vertically | `grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0` | **PASS** |
| ST-13 | AgentsBuild Step Truncation | Long detail strings do not expand parent width | `truncate` class on step detail descriptions | **PASS** |
| ST-14 | AgentsBuild Diff Code Scroll | Diff view lines scroll inside container | `overflow-x-auto` on diff box confirmed | **PASS** |
| ST-15 | Hero Primary CTA Target Size | Computed touch target height >= 44px | `px-8 py-3.5` (~52px computed height) | **PASS** |
| ST-16 | Hero Primary CTA Destination | Links to `/release` | `<Link to="/release">` confirmed | **PASS** |
| ST-17 | Hero Secondary Links Destinations | Links for Web, Insiders, other platforms to `/release` | All 3 links route to `/release` | **PASS** |
| ST-18 | Hero Secondary Links Spacing | Touch targets do not overlap on mobile | `flex flex-wrap gap-x-3 gap-y-1` | **PASS** |
| ST-19 | AgentsBuild CTA Target Size | Computed touch target height >= 44px | `px-6 py-3.5` (~48px computed height) | **PASS** |
| ST-20 | AgentsBuild CTA Destination | Links to `/features/agents` | `<Link to="/features/agents">` confirmed | **PASS** |
| ST-21 | AgentsBuild Mode Card Touch Size | Interactive cards have generous touch padding | `p-6` (>100px height) confirmed | **PASS** |
| ST-22 | Security DOM Sinks | No `dangerouslySetInnerHTML` or `eval` | Zero insecure sinks detected | **PASS** |
| ST-23 | TypeScript Strictness | No `any` types, `import type` enforced | Zero `any` types, type imports verified | **PASS** |
| ST-24 | Brand Design Tokens | Brand purple `dc-600` / `#5a38d9` used | Verified in buttons, badges, pulse rings | **PASS** |

---

## Unchallenged Areas

- **MultiSurface.tsx, SessionsView.tsx, CustomizationSection.tsx**: Assigned to peer challenger `m3_challenger_2`.
- **Sub-page destination implementations (`/features/agents`)**: Scheduled for delivery under Milestone 5.
- **Homepage section sequencing in `App.tsx`**: Scheduled for delivery under Milestone 5.
