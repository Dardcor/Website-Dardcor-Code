# Handoff Report — Milestone 1: ReleasePage & External Link Hardening

**Agent**: `m1_challenger_2`  
**Identity**: ReleasePage Adversarial Challenger  
**Milestone**: Milestone 1  
**Timestamp**: 2026-09-10T04:30:00Z  
**Type**: Hard Handoff (Task Complete)

---

## 1. Observation

1. **Schema & URL Validation Implementation (`src/pages/ReleasePage.tsx`)**:
   - Lines 59–78: `isRecord` and `isValidHttpsUrl`:
     ```typescript
     function isValidHttpsUrl(urlString: unknown): urlString is string {
       if (typeof urlString !== 'string' || !urlString.trim()) return false;
       try {
         const parsed = new URL(urlString);
         if (parsed.protocol !== 'https:') return false;
         const host = parsed.hostname.toLowerCase();
         return (
           host === 'github.com' ||
           host.endsWith('.github.com') ||
           host === 'objects.githubusercontent.com' ||
           host.endsWith('.githubusercontent.com')
         );
       } catch {
         return false;
       }
     }
     ```
   - Lines 80–96: `parseReleaseAsset` enforces string names, valid HTTPS URLs matching the GitHub domain allowlist, and sanitizes sizes (`Number.isFinite(size) && size >= 0 ? size : 0`).
   - Lines 98–120: `parseGitHubRelease` validates `tag_name`, HTTPS `html_url`, parses `published_at` with `Date.parse`, filters corrupt assets, and safely defaults missing assets to `[]`.
   - Lines 122–129: `validateReleasesResponse` throws an explicit Error on non-array payloads and filters invalid releases.

2. **Empirical Adversarial Test Execution**:
   - A dynamic execution harness running 58 adversarial test cases against `isValidHttpsUrl`, `isRecord`, `parseReleaseAsset`, `parseGitHubRelease`, and `validateReleasesResponse` produced:
     ```
     === TEST SUITE: isValidHttpsUrl ===
     PASS: Standard https github.com
     PASS: Subdomain api.github.com
     PASS: Standard objects.githubusercontent.com
     PASS: Subdomain of githubusercontent.com
     PASS: Uppercase GITHUB.COM
     PASS: Port 443 with github.com
     PASS: HTTP plain scheme blocked
     PASS: javascript: scheme blocked
     PASS: javascript with fake host blocked
     PASS: data: URI blocked
     PASS: vbscript: URI blocked
     PASS: file:/// URI blocked
     PASS: blob: URI blocked
     PASS: Domain suffix evilgithub.com blocked
     PASS: Domain prefix github.com.evil.com blocked
     PASS: Prefix of githubusercontent.com.evil.com blocked
     PASS: fake-githubusercontent.com blocked
     PASS: Userinfo spoof blocked
     PASS: Hash spoof blocked
     PASS: Query spoof blocked
     PASS: IP address blocked
     PASS: Empty string blocked
     PASS: Whitespace blocked
     PASS: null blocked
     PASS: undefined blocked
     PASS: number blocked
     PASS: object blocked
     ...
     TOTAL RESULTS: Passed: 58, Failed: 0
     ```

3. **External Link Scanning Across Codebase**:
   - Ripgrep query `target="_blank"` returned exactly 11 matches:
     - `src/pages/ReleasePage.tsx`: lines 278, 465, 609, 619
     - `src/components/sections/Hero.tsx`: line 147
     - `src/components/sections/Blog.tsx`: lines 43, 139
     - `src/components/layout/Footer.tsx`: lines 78, 87, 96, 123
   - Ripgrep query `rel="noopener noreferrer"` returned identical 11 matches corresponding exactly to each `target="_blank"` anchor.
   - Searches for lone `rel="noopener"` or lone `rel="noreferrer"` returned 0 results.

4. **Lint and Build Commands**:
   - `npm run lint` exited with code 0:
     ```
     > dardcor-code@1.0.0 lint
     > eslint .
     ```
   - `npm run build` exited with code 0:
     ```
     > dardcor-code@1.0.0 build
     > tsc -b && vite build

     vite v8.0.8 building client environment for production...
     transforming...✓ 2139 modules transformed.
     rendering chunks...
     computing gzip size...
     dist/index.html                   5.29 kB │ gzip:   1.58 kB
     dist/assets/index-DNHifWsl.css   51.01 kB │ gzip:   8.84 kB
     dist/assets/index-BZUynKje.js   438.43 kB │ gzip: 137.63 kB

     ✓ built in 946ms
     ```

---

## 2. Logic Chain

1. From Observation 1, the URL validation utilizes the standard browser/Node `URL` parser (`new URL(urlString)`), extracting `parsed.protocol` and `parsed.hostname.toLowerCase()`.
2. Because `parsed.protocol !== 'https:'` rejects non-HTTPS schemes, dangerous schemes such as `javascript:`, `data:`, `vbscript:`, `file:`, `blob:`, and unencrypted `http:` cannot reach the DOM anchor tags (Observation 2).
3. Because the domain check strictly requires `host === 'github.com' || host.endsWith('.github.com') || host === 'objects.githubusercontent.com' || host.endsWith('.githubusercontent.com')`, attacker attempts to register sibling domains like `evilgithub.com` or subdomain prefix tricks like `github.com.attacker.com` fail the `endsWith('.github.com')` test.
4. From Observation 1 and 2, payload corruption (missing fields, negative or non-finite asset sizes, invalid dates, non-array responses) is neutralized without uncaught exceptions, triggering component graceful fallback to GitHub's web releases UI on unrecoverable response errors.
5. From Observation 3, every `target="_blank"` anchor in the codebase is paired with `rel="noopener noreferrer"`, mitigating reverse tabnabbing and unintended referrer leakage across all modern and legacy browsers.
6. From Observation 4, all TypeScript type definitions and Vite build targets compile cleanly without errors or warnings.

---

## 3. Caveats

- Rate limiting on GitHub's anonymous REST API endpoint (`5000` req/hr authenticated vs `60` req/hr unauthenticated IP-based) was verified via static code inspection and fallback UI logic, but live simulated 403 HTTP response from GitHub was not triggered against live remote servers to avoid exhausting the user's IP quota.

---

## 4. Conclusion

**Verdict: APPROVE**

The implementation of `ReleasePage.tsx` and the site-wide external link hardening in Milestone 1 satisfy all security requirements and pass empirical stress-testing. No vulnerabilities, unhandled edge-case crashes, reverse-tabnabbing gaps, or build regressions were detected.

---

## 5. Verification Method

To independently verify these findings, execute the following commands in powershell at the repository root:

1. **Lint Check**:
   ```powershell
   npm run lint
   ```
   *Expected: Exit code 0, no errors or warnings.*

2. **Build Check**:
   ```powershell
   npm run build
   ```
   *Expected: Exit code 0, successful bundling into `dist/`.*

3. **External Link Reverse Tabnabbing Audit**:
   ```powershell
   # Count target="_blank" instances
   (rg -c 'target="_blank"' src/).Values | Measure-Object -Sum | Select-Object -ExpandProperty Sum
   # Count rel="noopener noreferrer" instances
   (rg -c 'rel="noopener noreferrer"' src/).Values | Measure-Object -Sum | Select-Object -ExpandProperty Sum
   ```
   *Expected: Both commands return 11 matches with 0 discrepancies.*

4. **Invalidation Conditions**:
   - Any new `target="_blank"` link introduced without `rel="noopener noreferrer"`.
   - Any modification to `isValidHttpsUrl` that relaxes domain checking or protocol enforcement.
   - Any non-zero exit code from `npm run lint` or `npm run build`.
