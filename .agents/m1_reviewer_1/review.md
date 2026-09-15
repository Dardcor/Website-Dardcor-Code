# Security Config Review Report — Milestone 1

**Reviewer**: `m1_reviewer_1` (Security Config Reviewer & Adversarial Critic)  
**Milestone**: Milestone 1 — Security & Global Configuration  
**Target Files**: `index.html`, `public/_headers`, `public/.htaccess`, `src/pages/ReleasePage.tsx`, external link call sites  
**Timestamp**: 2026-09-10T04:27:45Z  

---

## 1. Review Summary

**Verdict**: **APPROVE**

Milestone 1 work product fully satisfies all functional, architectural, security, and adversarial requirements. The implementation delivers defense-in-depth across HTML document metadata, edge hosting headers (`_headers`), and web server directives (`.htaccess`). DevTools warning prevention (`frame-ancestors` omitted from `<meta>`) and local development ergonomics (Vite HMR `ws:`/`wss:` support in `connect-src`) are flawlessly calibrated. Zero integrity violations or facades were detected.

---

## 2. Verified Claims

| Claim by `m1_worker` | Verification Method | Result | Notes |
|---|---|---|---|
| Exact syntax for all security headers | Direct code inspection of `public/_headers`, `public/.htaccess`, `index.html` | **PASS** | `X-Frame-Options`, `Content-Security-Policy`, `Strict-Transport-Security`, `Permissions-Policy`, `Referrer-Policy`, `COOP`, `CORP`, `X-Content-Type-Options`, `X-Permitted-Cross-Domain-Policies` syntax verified against RFCs and W3C specs. |
| DevTools warning prevention | Analyzed CSP directive delivery mechanisms | **PASS** | `frame-ancestors 'none'` is omitted from `index.html` `<meta>` (preventing W3C CSP meta warning) and strictly enforced in `_headers` and `.htaccess`. |
| Vite HMR WebSocket support | Inspected `connect-src` in `index.html` | **PASS** | `ws:` and `wss:` are present in `index.html` `<meta>`, ensuring local dev WebSocket HMR functions without CSP violations. |
| Edge header configuration | Inspected `public/_headers` and `dist/_headers` | **PASS** | Path wildcard `/*` with 2-space indented directives matching Cloudflare/Netlify specifications. |
| Apache server fallback configuration | Inspected `public/.htaccess` and `dist/.htaccess` | **PASS** | `mod_rewrite` SPA fallback, `mod_headers` with `always set` and `env=HTTPS` for HSTS, `Options -Indexes`, and `AddDefaultCharset UTF-8`. |
| Zero-dependency runtime schema validation | Code inspection of `src/pages/ReleasePage.tsx` | **PASS** | Robust `isRecord`, `isValidHttpsUrl`, `parseReleaseAsset`, `parseGitHubRelease`, `validateReleasesResponse` without third-party dependencies. |
| Domain allowlisting for asset downloads | Regex and string inspection in `ReleasePage.tsx` | **PASS** | Restricts downloads strictly to HTTPS and trusted GitHub hosts (`github.com`, `*.github.com`, `objects.githubusercontent.com`, `*.githubusercontent.com`). |
| Reverse-tabnabbing mitigation across site | Ripgrep search for `target="_blank"` and `rel` attributes | **PASS** | Exactly 11 `target="_blank"` anchors found across `src/`; all 11 have `rel="noopener noreferrer"`. Zero instances of legacy `rel="noreferrer"` remain. |
| `npm run lint` exits code 0 | Terminal command execution via powershell | **PASS** | 0 errors, 0 warnings. |
| `npm run build` exits code 0 | Terminal command execution via powershell | **PASS** | TypeScript compilation (`tsc -b`) and Vite production bundling succeeded in 2.90s; verified `dist/.htaccess` and `dist/_headers` generated. |

---

## 3. Adversarial Stress-Testing & Challenge Report

### Challenge 1: Cross-Origin Isolation vs Third-Party Asset Loading
- **Assumption Challenged**: Setting `Cross-Origin-Resource-Policy: same-origin` or `Cross-Origin-Opener-Policy: same-origin` might block external assets (Google Fonts, GitHub release assets).
- **Stress-Test Analysis**:
  - `Cross-Origin-Resource-Policy: same-origin` set on the site's server responses dictates that *other* websites cannot embed our resources. It does *not* restrict what *our* site fetches from external origins (which is governed by CSP).
  - `Cross-Origin-Embedder-Policy` (COEP: `require-corp`), which would block cross-origin third-party assets lacking CORP headers, was deliberately **not** set. Therefore, Google Fonts and GitHub assets load without cross-origin blocking.
  - `Cross-Origin-Opener-Policy: same-origin` successfully isolates top-level window contexts from cross-origin popups, neutralizing window-level side-channel attacks.
- **Result**: **PASS (Robust)**

### Challenge 2: Host Spoofing / Malicious Domain Bypass in Release URL Validation
- **Assumption Challenged**: Does `isValidHttpsUrl` in `ReleasePage.tsx` permit lookalike domains (e.g. `fake-github.com`, `attacker-github.com`)?
- **Stress-Test Analysis**:
  - `isValidHttpsUrl` checks:
    ```ts
    const host = parsed.hostname.toLowerCase();
    return (
      host === 'github.com' ||
      host.endsWith('.github.com') ||
      host === 'objects.githubusercontent.com' ||
      host.endsWith('.githubusercontent.com')
    );
    ```
  - Because `endsWith` includes the leading dot (`.github.com` and `.githubusercontent.com`), an attacker host like `fake-github.com` evaluates to `false`. Only official subdomains and apex domains match.
  - Furthermore, `parsed.protocol === 'https:'` rejects `http:`, `javascript:`, `data:`, or `blob:` pseudo-schemes.
- **Result**: **PASS (Secure)**

### Challenge 3: Insecure Transport HSTS Delivery on Apache
- **Assumption Challenged**: Serving HSTS headers over plaintext HTTP violates RFC 6797 § 7.2.
- **Stress-Test Analysis**:
  - In `public/.htaccess`, line 30 sets HSTS conditionally:
    ```apache
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" env=HTTPS
    ```
  - The `env=HTTPS` condition guarantees that Apache suppresses HSTS on plaintext HTTP connections and only injects it over TLS/SSL sessions, strictly conforming to RFC 6797.
- **Result**: **PASS (Conformant)**

### Challenge 4: GitHub API 403 Rate Limiting & Denial of Service
- **Assumption Challenged**: An unauthenticated user hitting GitHub API limits could experience a blank or broken release page.
- **Stress-Test Analysis**:
  - `ReleasePage.tsx` explicitly inspects `response.status === 403`, reads `x-ratelimit-remaining` and `x-ratelimit-reset`, and provides a dedicated fallback card with direct links to `https://github.com/Dardcor/Dardcor-Code/releases/latest`, reset time display, and connection retry capability.
- **Result**: **PASS (Resilient)**

---

## 4. Integrity Check Assessment

In accordance with anti-fabrication and integrity audit standards:
- **Hardcoded test results**: None. All logic, validation functions, and network requests are genuinely implemented.
- **Facade implementations**: None.
- **Shortcuts / Task bypasses**: None. All requirements from § R7 of `ORIGINAL_REQUEST.md` and Milestone 1 of `PROJECT.md` have been fulfilled.
- **Fabricated verification outputs**: None. Both `npm run lint` and `npm run build` were executed independently and confirmed clean.
- **Integrity Verdict**: **INTEGRITY VERIFIED — NO VIOLATIONS**.

---

## 5. Minor Observations & Recommendations (Non-Blocking)

1. **`index.html` Permissions-Policy Meta Tag**: While Permissions-Policy is predominantly parsed by browsers from HTTP headers (and present in `_headers` and `.htaccess`), its presence in `<meta>` is benign and acts as defense-in-depth for environments where headers might be stripped.
2. **Title Consistency**: `ReleasePage.tsx` dynamically sets `document.title = 'Releases — Dardcor Code'` on mount and restores the updated canonical SEO title `"Dardcor Code - The open source AI code editor | Your home for multi-agent development"` on unmount.

---

## 6. Final Verdict

**APPROVE** — Ready for orchestrator merge and downstream milestones.
