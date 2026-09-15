# Changes Report — Milestone 1: Security & Global Configuration

**Author**: `m1_worker`  
**Identity**: Security & Global Configuration Worker  
**Milestone**: Milestone 1  
**Timestamp**: 2026-09-10T04:24:00Z  

---

## 1. Overview of Changes

Milestone 1 implemented security configurations, edge/server response headers, strict zero-dependency runtime validation and rate limit resilience for the GitHub releases portal, and global reverse-tabnabbing link hardening across all external anchors in the codebase.

---

## 2. Modified & Created Files Summary

### 2.1 `index.html` (Modified)
- **SEO Title**: Updated title to `"Dardcor Code - The open source AI code editor | Your home for multi-agent development"`.
- **Security Meta Tags**: Injected document-level security headers:
  - `<meta http-equiv="X-Content-Type-Options" content="nosniff" />`
  - `<meta name="referrer" content="strict-origin-when-cross-origin" />`
  - `<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />`
  - `<meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=()" />`
  - `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.github.com https://fonts.googleapis.com ws: wss:;" />`
- **DevTools Console Cleanliness**: Omitted `frame-ancestors 'none'` in `<meta>` to avoid browser devtools warning (`The Content-Security-Policy directive 'frame-ancestors' is ignored when delivered via a <meta> element.`). Frame ancestry protection is strictly enforced at HTTP response level in `public/_headers` and `public/.htaccess`.
- **Vite HMR Compatibility**: Included `ws:` and `wss:` in `connect-src` so Vite dev WebSocket connections are permitted without CSP errors.

### 2.2 `public/_headers` (Created)
- Configured edge HTTP response headers for Netlify and Cloudflare Pages under wildcard path `/*`:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  - `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.github.com https://fonts.googleapis.com; frame-ancestors 'none';`
  - `X-Permitted-Cross-Domain-Policies: none`
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Cross-Origin-Resource-Policy: same-origin`

### 2.3 `public/.htaccess` (Created)
- Configured Apache server directives with `<IfModule>` encapsulation for graceful degradation:
  - `mod_rewrite`: Single Page Application (SPA) routing fallback directing non-file/non-directory requests to `/index.html`.
  - `mod_headers`: Equivalent HTTP headers (`Header always set`) for clickjacking prevention, MIME sniffing prevention, Referrer-Policy, Permissions-Policy, HSTS (guarded with `env=HTTPS`), CSP with `frame-ancestors 'none'`, cross-domain policy restriction, and cross-origin isolation (COOP & CORP).
  - `mod_autoindex`: Disabled directory listing (`Options -Indexes`).
  - Enforced `AddDefaultCharset UTF-8`.

### 2.4 `src/pages/ReleasePage.tsx` (Modified)
- **Zero-Dependency Runtime Schema Validation**:
  - Implemented `isRecord`, `isValidHttpsUrl`, `parseReleaseAsset`, `parseGitHubRelease`, and `validateReleasesResponse` pure TypeScript validation routines without any external dependencies.
  - Safely handles unexpected payloads, non-array responses, missing/null asset arrays, and corrupted date formats.
- **Asset URL Sanitization & Domain Allowlisting**:
  - Enforced `https:` protocol and trusted GitHub domains (`github.com`, `*.github.com`, `objects.githubusercontent.com`, `*.githubusercontent.com`).
  - Defense-in-depth: Re-validates URLs before rendering download links; untrusted URLs are discarded.
- **Graceful HTTP 403 Rate Limit Handling & Network Fallback UI**:
  - Detects HTTP 403 rate limits and extracts `x-ratelimit-remaining` and `x-ratelimit-reset` headers.
  - When rate limited or when releases fail to load, renders a fallback card with:
    - Direct download button linking to GitHub Releases (`https://github.com/Dardcor/Dardcor-Code/releases/latest`) with `target="_blank" rel="noopener noreferrer"`.
    - "Retry Connection" button invoking `loadReleases()`.
    - Clear explanatory text and estimated reset time.
    - Security certification note.
- **Reverse Tabnabbing Mitigation**:
  - Updated all external links (`<a>`) to include `rel="noopener noreferrer"`.
- **Type Safety & Fast Refresh Compliance**:
  - Scoped helper functions internally so that Vite React Refresh satisfies `react-refresh/only-export-components`.
  - Maintained clean TypeScript types with explicit type imports (`import type { FC } from 'react'`).
- **Clean Unmount**:
  - Restores the new canonical title `"Dardcor Code - The open source AI code editor | Your home for multi-agent development"` on unmount.
  - Removed duplicate `<AnimatedBackground />` which was already present globally in `src/App.tsx`.

### 2.5 Site-Wide External Link Hardening (Modified)
- `src/components/layout/Footer.tsx`:
  - Lines 79, 88, 97 (Social links: GitHub, Twitter/X, YouTube): Changed `rel="noreferrer"` to `rel="noopener noreferrer"`.
  - Line 124 (External footer column links): Changed `rel="noreferrer"` to `rel="noopener noreferrer"`.
- `src/components/sections/Blog.tsx`:
  - Line 44 (Blog article cards): Changed `rel="noreferrer"` to `rel="noopener noreferrer"`.
  - Line 140 ("Read all articles" GitHub button): Changed `rel="noreferrer"` to `rel="noopener noreferrer"`.
- `src/components/sections/Hero.tsx`:
  - Line 148 (Announcement badge GitHub link): Changed `rel="noreferrer"` to `rel="noopener noreferrer"`.

---

## 3. Verification Commands and Results

1. **`npm run lint`**:
   - Exit code: 0
   - 0 errors, 0 warnings in application source code.
2. **`npm run build`**:
   - Exit code: 0
   - TypeScript compilation (`tsc -b`) passed with 0 errors.
   - Vite bundled production assets in 1.29s.
   - Verified presence of `dist/_headers`, `dist/.htaccess`, and updated `dist/index.html`.
3. **Ripgrep Audits**:
   - `rg 'rel="noreferrer"' src/`: 0 results found.
   - `rg 'rel="noopener noreferrer"' src/`: 11 matches across all external link elements.
   - Every single `target="_blank"` anchor in the codebase is accompanied by `rel="noopener noreferrer"`.
