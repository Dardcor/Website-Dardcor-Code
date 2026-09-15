# Empirical Challenge Report — Milestone 3: AI Sections Data & Status

**Target Components**:
- `src/components/sections/MultiSurface.tsx`
- `src/components/sections/SessionsView.tsx`
- `src/components/sections/CustomizationSection.tsx`

**Test Harness**: `scripts/stress-test-m3-ai-sections.mjs`  
**Execution Command**: `node scripts/stress-test-m3-ai-sections.mjs`

---

## Challenge Summary

**Overall risk assessment**: LOW (All core specifications, layout containment down to 375px, state filters, and build/lint commands pass without failure; 5 non-blocking edge-case challenges and UX/a11y improvements surfaced).

**Final Verdict**: **APPROVE**

---

## Challenges

### [Medium] Challenge 1: SessionsView Filter vs Active Selection Desynchronization
- **Assumption challenged**: The master-detail view assumes the active selection is always valid and visible within the filtered list.
- **Attack scenario**: The user selects `sess-8941` (which has `status: 'running'`), then clicks the filter button `completed`. The list on the left displays only completed sessions (`sess-8938` and `sess-8935`), but the right pane continues to display `sess-8941` ("Active Session", status: running). None of the items in the left list have the active selection ring.
- **Blast radius**: Low/Medium visual confusion. The detail pane shows a session that was explicitly filtered out from the list view. No application crash occurs because `sessionsData.find((s) => s.id === selectedSessionId) ?? sessionsData[0]` safely resolves the item.
- **Mitigation**: When `filter` or `searchQuery` changes, if `filteredSessions.find(s => s.id === selectedSessionId)` is undefined and `filteredSessions.length > 0`, default `selectedSessionId` to `filteredSessions[0].id`.

### [Low] Challenge 2: SessionsView Master-Detail Decoupling on Empty Search
- **Assumption challenged**: Filtering/search will always return at least one session.
- **Attack scenario**: User enters a search query matching zero sessions (e.g. `xyz123`). The left column renders `"No agent sessions match your filter."`, but the right detail pane remains fully rendered showing the previously selected session, its live stdout stream, and metrics.
- **Blast radius**: Visual mismatch where a user might think the displayed detail belongs to the search result.
- **Mitigation**: When `filteredSessions.length === 0`, render an empty state placeholder in the detail pane as well (e.g., `"No matching session selected"`).

### [Medium] Challenge 3: MCP Link Anchor Inconsistency (`Navbar.tsx` vs `CustomizationSection.tsx`)
- **Assumption challenged**: `Navbar.tsx` Resources dropdown link `path: '/#mcp'` will smoothly scroll to the MCP section on the homepage.
- **Attack scenario**: A user clicks `Resources` -> `MCP` in the Navbar. The browser navigates to `/#mcp`. Because `CustomizationSection.tsx` declares `id="customization"`, no element on the page matches the `#mcp` hash fragment, causing the scroll navigation to fail silently.
- **Blast radius**: Navigation link fails to anchor to the intended section on the homepage.
- **Mitigation**: Add `id="mcp"` as an anchor target inside `CustomizationSection.tsx` (e.g., `<div id="mcp" className="-top-24 relative" />` or update `Navbar.tsx` to link to `/#customization`).

### [Low] Challenge 4: Keyboard Accessibility on Interactive Customization and Session Cards
- **Assumption challenged**: Interactive list items and cards are accessible via standard keyboard navigation.
- **Attack scenario**: A keyboard-only or assistive-technology user attempts to tab through session items in `SessionsView.tsx` or feature preview cards in `CustomizationSection.tsx`. Because both components use `<div>` elements with `onClick` without `tabIndex={0}`, `role="button"`, or `onKeyDown` handlers, keyboard focus cannot reach them. (In contrast, `MultiSurface.tsx` correctly uses semantic `<button type="button">`).
- **Blast radius**: A11y regression for keyboard navigation.
- **Mitigation**: Convert the cards to semantic `<button type="button">` or add `tabIndex={0}`, `role="button"`, and `onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') ... }}`.

### [Low] Challenge 5: CustomizationSection Inspector Title Bar and CTA Mobile Density at 375px
- **Assumption challenged**: Dense text headers and non-wrapping buttons fit comfortably on narrow mobile screens (375px).
- **Attack scenario**:
  1. In `CustomizationSection.tsx` line 196, the inspector title bar places the filename (`.dardcor/instructions.md`), bullet separator, title (`Custom instructions`), and status tag (`Loaded by agent runtime`) in a `flex items-center justify-between` container without `flex-wrap`. On 375px viewports (311px available inside container), combined intrinsic content width (~440px) causes extreme crowding and text compression.
  2. The bottom CTA button copy `"Connect to external tools with MCP servers"` is 42 characters with `whitespace-nowrap`. On viewports ≤360px, combined with padding, this leaves less than 10px margin.
- **Blast radius**: Visual tightness on sub-375px viewports. The section is protected from horizontal page blowout by `overflow-hidden` on the section container, but text may clip or squeeze internally.
- **Mitigation**: In the title bar, hide secondary text on mobile (e.g., `<span className="hidden sm:inline">•</span><span className="hidden sm:inline">{activeCard.title}</span>`). On the CTA button, use `whitespace-normal` or responsive sizing.

---

## Stress Test Results

| # | Test Scenario | Expected Behavior | Actual Behavior | Result |
|---|---------------|-------------------|-----------------|:------:|
| 1 | `SessionsView` dataset status coverage | Contains `running`, `completed`, and `failed` sessions | Found all 3 statuses across 4 sessions | **PASS** |
| 2 | `SessionsView` filter button state definitions | Explicit array `['all', 'running', 'completed', 'failed']` | Array matches exact specification | **PASS** |
| 3 | Filter `'all'` simulation | Returns all 4 sessions | Returns 4 items (1 running, 2 completed, 1 failed) | **PASS** |
| 4 | Filter `'running'` simulation | Returns only running sessions | Returns 1 item (`sess-8941`) | **PASS** |
| 5 | Filter `'completed'` simulation | Returns only completed sessions | Returns 2 items (`sess-8938`, `sess-8935`) | **PASS** |
| 6 | Filter `'failed'` simulation | Returns only failed sessions | Returns 1 item (`sess-8930`) | **PASS** |
| 7 | Search query simulation (case-insensitive) | Matches task, agent, or id substring | Correctly matched `"Claude"`, `"8935"`, `"qa specialist"` | **PASS** |
| 8 | Search query zero-results | Gracefully returns empty list without error | Returns empty array; left column renders fallback | **PASS** |
| 9 | Status indicator visual differentiation | Distinct pulse, checkmark, and alert styles per status | `animate-pulse` (running), `CheckCircle2` (completed), `AlertTriangle` (failed) | **PASS** |
| 10 | Console stdout and active listener | Live output displays command, diagnostics, and animated ping for running | Ping dot present, error lines styled with `text-rose-300` | **PASS** |
| 11 | `MultiSurface` 4-model harness grid | Claude 3.7, GPT-4o, Gemini 2.5, Custom model with context badges | All 4 models verified with context and provider chips | **PASS** |
| 12 | `MultiSurface` surfaces showcase | Desktop, CLI, Web, Mobile with active selection toggle | All 4 surfaces verified with semantic `<button type="button">` | **PASS** |
| 13 | `MultiSurface` CTA link | Points to `/features/models` with "See how agents work across surfaces" | Verified `to="/features/models"` | **PASS** |
| 14 | `CustomizationSection` 3 core cards | Custom instructions, MCP servers, plugins | All 3 cards present with metadata and file associations | **PASS** |
| 15 | `CustomizationSection` MCP snippet | Valid MCP configuration referencing `.dardcor/mcp.json` | Contains postgres and github MCP server configs | **PASS** |
| 16 | `CustomizationSection` CTA link | Points to `/features/customizations` | Verified `to="/features/customizations"` | **PASS** |
| 17 | 375px mobile viewport containment (all 3) | `overflow-hidden` on sections, single-column responsive collapse | `grid-cols-1` on mobile, `overflow-hidden` on all 3 sections | **PASS** |
| 18 | Horizontal scrolling safeguards | Code and terminal boxes allow internal scrolling without page blowout | `overflow-x-auto` verified on filter bar, console box, and code viewer | **PASS** |
| 19 | Milestone 3 Test Suite (`test-e2e.mjs --milestone M3`) | 18/18 tests pass | 18/18 passed in 16ms | **PASS** |
| 20 | Project Lint Validation (`npm run lint`) | Zero ESLint errors or warnings | Exited code 0 | **PASS** |
| 21 | TypeScript & Production Build (`npm run build`) | Zero TypeScript errors, clean bundle generation | Exited code 0 (`tsc -b && vite build`) in 4.21s | **PASS** |

---

## Unchallenged Areas

- **`Hero.tsx` & `AgentsBuild.tsx`**: Covered by companion challenger `m3_challenger_1`. Spot-checked for milestone test suite execution.
- **Dynamic Session WebSocket streaming**: Mocked client-side dataset used per static architecture requirements; live backend streaming was out of scope.
- **Feature sub-pages navigation execution**: Routes `/features/models` and `/features/customizations` are scheduled for milestone M5 (`m5_worker`). Links in M3 components correctly target these interface contracts.
