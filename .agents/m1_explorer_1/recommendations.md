# Security Meta Tags & Headers: Implementation Recommendations (Milestone 1)

**Investigator**: `m1_explorer_1` (Security Meta & Headers Explorer)  
**Target Milestone**: Milestone 1 — Security & Global Configuration  
**Target Files**:
1. `index.html` (Existing file — Modify)
2. `public/_headers` (New file — Create)
3. `public/.htaccess` (New file — Create)

---

## 1. Executive Summary & Architectural Rationale

This document defines the exact, production-ready configurations for `index.html`, `public/_headers`, and `public/.htaccess`.

### Core Requirements Addressed:
1. **R7.1 & R7.2 (index.html)**:
   - Update SEO document `<title>` to: `"Dardcor Code - The open source AI code editor | Your home for multi-agent development"`.
   - Inject security meta tags: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and `Content-Security-Policy`.
   - **DevTools Warning Prevention**: Omit `frame-ancestors 'none'` from the `<meta>` tag. Per W3C CSP Level 2/3 specifications, `frame-ancestors` is strictly ignored in `<meta>` elements and causes modern browsers (Chromium, Firefox, Safari) to print a console warning:
     `The Content-Security-Policy directive 'frame-ancestors' is ignored when delivered via a <meta> element.`
     Removing it from `<meta>` satisfies the acceptance criterion: `No console errors or warnings in browser devtools`. Frame ancestry and clickjacking protection are instead authoritatively enforced at the server/edge layer via HTTP response headers (`public/_headers` and `public/.htaccess`).
   - **Vite HMR (Hot Module Replacement) Support**: Include `ws:` and `wss:` in `connect-src`. Without WebSocket schemes allowed, Vite dev server connections (`ws://localhost:5173/`) are blocked by the browser with CSP violation errors, breaking live development.
2. **R7.3 (public/_headers)**:
   - Provide strict HTTP headers for edge platforms (Netlify and Cloudflare Pages) using correct indentation syntax under `/*`.
   - Includes full CSP with `frame-ancestors 'none'`, HSTS, clickjacking prevention (`X-Frame-Options: DENY`), and cross-origin isolation.
3. **R7.4 (public/.htaccess)**:
   - Provide robust Apache configuration wrapping directives in `<IfModule>` tags to prevent 500 errors on minimal Apache installations.
   - Includes SPA routing rewrites to `/index.html` for client-side navigation (React Router) and equivalent `mod_headers` directives.

---

## 2. File 1: `index.html`

### 2.1 File Location
`C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\index.html`

### 2.2 Current State (Lines 8–10)
```html
    <!-- Primary Meta Tags -->
    <title>Dardcor Code — Agent-First IDE for Autonomous Development</title>
    <meta name="description" content="Dardcor Code is the first IDE powered by autonomous agents. Deploy agents that plan, code, test, and ship — without leaving your editor. Free for individual developers." />
```

### 2.3 Exact Proposed Changes
Insert the security meta tags directly before `<title>`, and update `<title>` to the required SEO string.

#### Replacement Block:
```html
    <!-- Security Meta Tags -->
    <meta http-equiv="X-Content-Type-Options" content="nosniff" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
    <meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=()" />
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.github.com https://fonts.googleapis.com ws: wss:;" />

    <!-- Primary Meta Tags -->
    <title>Dardcor Code - The open source AI code editor | Your home for multi-agent development</title>
    <meta name="description" content="Dardcor Code is the first IDE powered by autonomous agents. Deploy agents that plan, code, test, and ship — without leaving your editor. Free for individual developers." />
```

### 2.4 Detailed Directives Rationale for `index.html`
| Directive / Tag | Value | Rationale & Browser Safety |
|---|---|---|
| `<meta http-equiv="X-Content-Type-Options">` | `nosniff` | Re-asserts MIME sniffing prevention at document level. |
| `<meta name="referrer">` & `<meta http-equiv="Referrer-Policy">` | `strict-origin-when-cross-origin` | Standard HTML5 `name="referrer"` alongside `http-equiv` ensures universal browser support across Chrome, Safari, and Firefox. |
| `<meta http-equiv="Permissions-Policy">` | `camera=(), microphone=(), geolocation=(), payment=()` | Disables device hardware APIs from executing within the application context. |
| `CSP: default-src` | `'self'` | Fallback for any resource type not explicitly specified. |
| `CSP: script-src` | `'self' 'unsafe-inline'` | Permits Vite client scripts, React 19 entry bundle, and embedded JSON-LD schemas. |
| `CSP: style-src` | `'self' 'unsafe-inline' https://fonts.googleapis.com` | Permits Tailwind CSS stylesheet, Framer Motion inline styles, and Google Fonts CSS. |
| `CSP: font-src` | `'self' https://fonts.gstatic.com` | Permits font binary files (.woff2) loaded from Google Fonts CDN. |
| `CSP: img-src` | `'self' data: https:` | Permits local assets (`/dardcor.png`, `/showcase.png`), inline SVG/data URIs, and external icons. |
| `CSP: connect-src` | `'self' https://api.github.com https://fonts.googleapis.com ws: wss:` | Permits GitHub Releases API (`ReleasePage.tsx`), Google Fonts preconnect, and **crucially** `ws:` / `wss:` for Vite HMR WebSocket dev server connection. |
| **Omission**: `frame-ancestors` | *Omitted from `<meta>`* | **Critical DevTools Warning Prevention**: W3C CSP spec mandates user agents ignore `frame-ancestors` in `<meta>` and log a warning. Frame protection is instead enforced in HTTP response headers via `X-Frame-Options: DENY` and `frame-ancestors 'none'`. |

---

## 3. File 2: `public/_headers`

### 3.1 File Location
`C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\public\_headers`  
*(New file; copied directly to `dist/_headers` by Vite during build)*

### 3.2 Exact File Content
```text
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

### 3.3 Formatting Rules
1. First line must be `/*` (wildcard matching all site paths).
2. Each header directive line MUST start with exactly two spaces (`  `). This is required by Netlify and Cloudflare Pages header specifications.
3. In HTTP headers, `frame-ancestors 'none'` is 100% valid and supported without any console warnings.
4. `Strict-Transport-Security` enforces 1 year (`31536000` seconds) HSTS with subdomains and preload eligibility.

---

## 4. File 3: `public/.htaccess`

### 4.1 File Location
`C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\public\.htaccess`  
*(New file; copied directly to `dist/.htaccess` by Vite during build)*

### 4.2 Exact File Content
```apache
# ----------------------------------------------------------------------
# | Single Page Application (SPA) Routing Fallback                     |
# ----------------------------------------------------------------------
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# ----------------------------------------------------------------------
# | Security Headers                                                   |
# ----------------------------------------------------------------------
<IfModule mod_headers.c>
  # Clickjacking protection (legacy browsers)
  Header always set X-Frame-Options "DENY"

  # Prevent MIME-type sniffing
  Header always set X-Content-Type-Options "nosniff"

  # Referrer policy
  Header always set Referrer-Policy "strict-origin-when-cross-origin"

  # Permissions policy (camera, microphone, geolocation, payment disabled)
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"

  # HTTP Strict Transport Security (HSTS) - HTTPS only (1 year, subdomains, preload)
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" env=HTTPS

  # Content Security Policy (CSP)
  Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.github.com https://fonts.googleapis.com; frame-ancestors 'none';"

  # Restrict cross-domain policy files (Flash / PDF)
  Header always set X-Permitted-Cross-Domain-Policies "none"

  # Cross-Origin Isolation
  Header always set Cross-Origin-Opener-Policy "same-origin"
  Header always set Cross-Origin-Resource-Policy "same-origin"
</IfModule>

# ----------------------------------------------------------------------
# | Prevent Directory Browsing                                         |
# ----------------------------------------------------------------------
<IfModule mod_autoindex.c>
  Options -Indexes
</IfModule>

# ----------------------------------------------------------------------
# | Default Character Encoding                                         |
# ----------------------------------------------------------------------
AddDefaultCharset UTF-8
```

### 4.3 Directives Breakdown
1. **SPA Routing Fallback (`mod_rewrite`)**:
   - Ensures deep link URLs (e.g. `/features/agents`, `/features/models`, `/release`) correctly resolve to `/index.html` so React Router can handle routing on Apache servers, instead of producing an Apache 404 error.
   - `RewriteCond %{REQUEST_FILENAME} !-f` and `RewriteCond %{REQUEST_FILENAME} !-d` ensure static files (images, JS bundles, CSS, sitemap) continue to be served directly.
2. **Module Encapsulation (`<IfModule mod_headers.c>`)**:
   - Using `<IfModule>` guarantees that if an Apache installation does not have `mod_headers` or `mod_rewrite` enabled, it will not crash with an unhandled `500 Internal Server Error`.
3. **`Header always set`**:
   - Using `always` ensures headers are sent on all HTTP response codes, including 4xx and 5xx error pages, rather than only on 200 OK.
4. **`env=HTTPS` on HSTS**:
   - RFC 6797 §7.2 states HSTS must only be emitted over HTTPS. Adding `env=HTTPS` prevents Apache from erroneously emitting HSTS over unencrypted HTTP.
5. **Directory Listing & Encoding**:
   - `Options -Indexes` disables Apache directory listing if an asset directory lacks an index file.
   - `AddDefaultCharset UTF-8` ensures UTF-8 encoding across all text payloads.

---

## 5. Instructions for the Implementer (Worker)

1. **Step 1 — Modify `index.html`**:
   - Open `index.html`.
   - Locate lines 8–10:
     ```html
         <!-- Primary Meta Tags -->
         <title>Dardcor Code — Agent-First IDE for Autonomous Development</title>
     ```
   - Replace with the snippet in Section 2.3 above.
2. **Step 2 — Create `public/_headers`**:
   - Create a new text file at `public/_headers`.
   - Paste the exact contents from Section 3.2.
   - Verify that there are two leading spaces on each header directive.
3. **Step 3 — Create `public/.htaccess`**:
   - Create a new text file at `public/.htaccess`.
   - Paste the exact contents from Section 4.2.
4. **Step 4 — Build & Verify**:
   - Run `npm run lint` -> ensure 0 errors, 0 warnings.
   - Run `npm run build` -> ensure exit code 0.
   - Verify `dist/_headers` and `dist/.htaccess` exist in `dist/`.
   - Launch dev server (`npm run dev`) -> verify no CSP errors in DevTools Console and Vite HMR connects cleanly.
