# E2E Test Infra: Dardcor Code Website Rebuild

## Test Philosophy
- Opaque-box, requirement-driven verification derived directly from `ORIGINAL_REQUEST.md` and user-facing specifications.
- Complete coverage: every feature listed in `PROJECT.md § Feature Inventory` must be tested.
- Zero reliance on implementation internal hacks — test using standard verification scripts, build tools, lint checks, and DOM/route validations.

## 4-Tier Test Case Design Methodology
1. **Tier 1 — Feature Coverage (>=5 per feature area)**:
   - Primary user paths, component existence, route resolution, basic interactions.
2. **Tier 2 — Boundary & Corner Cases (>=5 per feature area)**:
   - Extreme inputs, 375px viewport boundary tests, API error responses (403 rate limits), malformed data, reduced-motion preferences.
3. **Tier 3 — Cross-Feature Combinations (Pairwise coverage)**:
   - Navbar mega-menu navigation to feature sub-pages; sub-page CTA navigation to `/release`; scroll-driven glassmorphism interaction with hero animations.
4. **Tier 4 — Real-World Workload Scenarios**:
   - End-to-end developer download journey (landing -> feature discovery -> download platform selection -> release asset lookup).
   - Security auditing (inspecting headers, CSP compatibility, external link rel attributes, absence of inline handlers).

## Minimum Verification Commands
- Build verification: `npm run build`
- Lint verification: `npm run lint`
- Security configuration check: presence of `dist/_headers`, `dist/.htaccess`, and valid CSP directives.
- Link audit: verification that 100% of `target="_blank"` anchors have `rel="noopener noreferrer"`.
- Responsive layout check: ensuring zero horizontal overflow at 375px.

## Coordination
When the E2E test suite and test runner script are ready, create `TEST_READY.md`.
Implementation Track milestone M6 will run this full verification suite and achieve 100% pass rate before completion.
