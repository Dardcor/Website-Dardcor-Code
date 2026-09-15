# Forensic Audit Report — Milestone 1

**Work Product**: Milestone 1 Deliverables (`index.html`, `public/_headers`, `public/.htaccess`, `src/pages/ReleasePage.tsx`, external link hardening across `Footer.tsx`, `Blog.tsx`, `Hero.tsx`)  
**Profile**: General Project  
**Integrity Enforcement Level**: Development Mode (with strict no-new-packages and from-scratch authenticity)  
**Auditor**: `m1_auditor`  
**Timestamp**: 2026-09-10T04:30:00Z  
**Verdict**: **CLEAN**

---

## 1. Executive Summary

A forensic integrity audit was conducted on all Milestone 1 deliverables. The investigation empirically verified source code authenticity, checked for facades, mock interceptors, and hardcoded values, inspected edge and server security headers, audited external link reverse-tabnabbing mitigations, and independently executed the project's build and lint pipelines.

No integrity violations, facades, cheating, or build/lint errors were detected. All implementations are authentic, robust, and adhere strictly to `ORIGINAL_REQUEST.md`.

---

## 2. Phase Results

| # | Forensic Check | Result | Details |
|---|---|---|---|
| 1 | **Hardcoded Output Detection** | **PASS** | No hardcoded release datasets, dummy arrays, or simulated test responses found in `src/pages/ReleasePage.tsx` or other files. |
| 2 | **Facade & Stub Detection** | **PASS** | `ReleasePage.tsx` contains genuine network fetch logic, zero-dependency runtime schema validation (`isRecord`, `isValidHttpsUrl`, `parseReleaseAsset`, `parseGitHubRelease`, `validateReleasesResponse`), asset classification, changelog parsing, and state transitions. |
| 3 | **Pre-Populated Artifact Detection** | **PASS** | No pre-populated build or test artifacts existed prior to build execution; `dist/` was produced cleanly via independent build execution. |
| 4 | **GitHub API Authenticity & Parsing** | **PASS** | Live GitHub API endpoint `https://api.github.com/repos/Dardcor/Dardcor-Code/releases` is fetched directly with `Accept: application/vnd.github.v3+json`. Pure TypeScript type guards validate and sanitize data; Rate limiting (403) and network failures are handled gracefully with fallback UI and direct download links. |
| 5 | **Security Headers Compliance** | **PASS** | `public/_headers` (Netlify/Cloudflare) and `public/.htaccess` (Apache) declare strict CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP, and CORP. `index.html` includes document-level meta security tags and updated SEO title. |
| 6 | **Reverse-Tabnabbing Mitigation** | **PASS** | 100% of `target="_blank"` anchors across all modified source files (`ReleasePage.tsx`, `Footer.tsx`, `Blog.tsx`, `Hero.tsx`) enforce `rel="noopener noreferrer"`. 0 instances of unhardened `rel="noreferrer"` remain. |
| 7 | **Lint Verification (`npm run lint`)** | **PASS** | ESLint executed with exit code 0 and 0 errors/warnings. |
| 8 | **Build Verification (`npm run build`)** | **PASS** | `tsc -b && vite build` completed in 1.47s with exit code 0. Assets emitted into `dist/` including `dist/_headers`, `dist/.htaccess`, and `dist/index.html`. |
| 9 | **Dependency & Stack Compliance** | **PASS** | No new npm packages installed. Zero-dependency runtime schema validation implemented purely in TypeScript. |

---

## 3. Detailed Forensic Observations

### 3.1 GitHub API Response Parsing (`src/pages/ReleasePage.tsx`)
- **Genuine API Interaction**: The component initiates an unauthenticated `fetch` to `https://api.github.com/repos/Dardcor/Dardcor-Code/releases`. Tested against live GitHub API endpoints, confirming that the real repository releases match the expected data structure.
- **Runtime Validation**:
  - `isRecord(value)`: Guarantees object shape without `null` or arrays.
  - `isValidHttpsUrl(url)`: Enforces `https:` protocol and restricts hostnames strictly to `github.com`, `*.github.com`, `objects.githubusercontent.com`, and `*.githubusercontent.com`.
  - `parseReleaseAsset(value)`: Validates `name`, sanitized URL, and non-negative finite `size`.
  - `parseGitHubRelease(value)`: Validates `tag_name`, sanitized `html_url`, ISO publication timestamp, and handles `body: null` gracefully (`body: typeof body === 'string' ? body : ''`).
  - `validateReleasesResponse(data)`: Throws if top-level payload is not an Array.
- **Rate Limit & Error Handling**:
  - Detects `response.status === 403` and reads `x-ratelimit-remaining` and `x-ratelimit-reset`.
  - Renders a dedicated fallback card with direct link to `https://github.com/Dardcor/Dardcor-Code/releases/latest` and a "Retry Connection" button when releases are empty or rate-limited.
- **Asset Filtering & Classification**:
  - Excludes metadata files (`.blockmap`, `.yml`, `-latest.yml`, `RELEASES`).
  - Groups binaries dynamically into macOS (`.dmg`, `universal`, `mac`), Windows (`.exe`, `portable`, `win`), and Linux (`.appimage`, `.deb`, `.rpm`, `.tar.gz`, `snap`).

### 3.2 Security Header Configurations
- **`public/_headers`**:
  ```http
  /*
    X-Frame-Options: DENY
    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
    Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
    Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
    Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.github.com https://fonts.googleapis.com; frame-ancestors 'none';
    X-Permitted-Cross-Domain-Policies: none
    Cross-Origin-Opener-Policy: same-origin
    Cross-Origin-Resource-Policy: same-origin
  ```
- **`public/.htaccess`**:
  - Encapsulated with `<IfModule mod_rewrite.c>`, `<IfModule mod_headers.c>`, and `<IfModule mod_autoindex.c>` for resilient Apache hosting.
  - Configures SPA rewrite fallback to `/index.html`.
  - Sets `Header always set` for clickjacking prevention, MIME sniffing prevention, Referrer-Policy, Permissions-Policy, HSTS (conditional on `env=HTTPS`), CSP, cross-domain policy restriction, COOP, and CORP.
  - Disables directory browsing (`Options -Indexes`).
- **`index.html`**:
  - Security meta tags for `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and `Content-Security-Policy`.
  - Note on deliberate engineering decision: `frame-ancestors 'none'` was omitted from `<meta>` CSP because W3C specifications dictate that `frame-ancestors` is ignored in `<meta>` tags and triggers a browser devtools warning. Clickjacking protection is enforced via `X-Frame-Options: DENY` and HTTP-level headers in `_headers` and `.htaccess`.
  - SEO Title verified: `<title>Dardcor Code - The open source AI code editor | Your home for multi-agent development</title>`.

### 3.3 External Link Hardening
- Ripgrep scan across entire `src/` codebase confirmed:
  - `rel="noreferrer"` (without noopener): **0 occurrences**.
  - `target="_blank"` anchors: **11 occurrences**.
  - `rel="noopener noreferrer"` attributes: **11 occurrences**.
  - Every external anchor is protected against reverse-tabnabbing (`window.opener` attacks).

---

## 4. Empirical Evidence

### 4.1 Lint Execution
```
> dardcor-code@1.0.0 lint
> eslint .

Exit code: 0
```

### 4.2 Build Execution
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

✓ built in 1.47s
Exit code: 0
```

### 4.3 Automated Verification Suite
```
node scripts/test-e2e.mjs --milestone M1

════════════════════════════════════════════════════════════════════════════════
         DARDCOR CODE E2E AUTOMATED VERIFICATION SUITE                          
════════════════════════════════════════════════════════════════════════════════
Total Registered Tests: 102 | Selected: 16
Filter Milestone: M1

━━━ Tier 1: Feature Coverage (>=5 tests per feature area) ━━━
  ✔ [M1] T1.6.1 Security: index.html meta security tags (CSP, nosniff, Referrer, Permissions) (1ms)
  ✔ [M1] T1.6.2 Security: index.html hardened SEO title (1ms)
  ✔ [M1] T1.6.3 Security: public/_headers edge security configuration (1ms)
  ✔ [M1] T1.6.4 Security: public/.htaccess Apache fallback configuration (0ms)
  ✔ [M1] T1.6.5 Security: ReleasePage validates API responses and handles rate limits (1ms)
  ✔ [M1] T1.6.6 Security: All external links have rel="noopener noreferrer" (2ms)

━━━ Tier 2: Boundary & Corner Cases (>=5 tests per area, 375px, API errors) ━━━
  ✔ [M1] T2.6.1 Security Boundary: GitHub API 403 Rate Limit handling in ReleasePage (1ms)
  ✔ [M1] T2.6.2 Security Boundary: Network failure state without unhandled exception (0ms)
  ✔ [M1] T2.6.3 Security Boundary: Zero release assets edge case handling (1ms)
  ✔ [M1] T2.6.4 Security Boundary: CSP connect-src explicitly includes GitHub API endpoint (1ms)
  ✔ [M1] T2.6.5 Security Boundary: Anti-Clickjacking defense (frame-ancestors and X-Frame-Options) (0ms)
  ✔ [M1] T2.6.6 Security Boundary: ReleasePage changelog markdown parser bounds handling (0ms)

━━━ Tier 3: Cross-Feature Combinations (Pairwise navigation & layout) ━━━
  ✔ [M1] T3.7 Cross-Feature: ReleasePage API Rate Limit + Global Navigation & Footer Continuity (2ms)
  ✔ [M1] T3.8 Cross-Feature: Security Header Parity between _headers, .htaccess, and index.html (1ms)

━━━ Tier 4: Real-World Workload Scenarios (Download journey & security audit) ━━━
  ✔ [M1] T4.2 Workload Scenario: Comprehensive Security Audit (Headers, CSP, External Links, Sink Analysis) (10ms)
  ✔ [M1] T4.4 Workload Scenario: SEO, Metadata & Web Accessibility Standards Audit (6ms)

TEST SUITE SUMMARY:
Total Executed: 16
Passed:         16
Failed:         0
Exit code: 0
```

### 4.4 Live API Connectivity Verification
```
curl.exe -s -I "https://api.github.com/repos/Dardcor/Dardcor-Code/releases"

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
...
```

---

## 5. Audit Conclusion

Milestone 1 is certified **CLEAN**. All security configurations, edge response headers, Apache rules, external link attributes, and GitHub release parsing routines are genuine, secure, and compliant with all project requirements.
