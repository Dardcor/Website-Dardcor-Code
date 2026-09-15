## 2026-09-10T04:20:35Z

<USER_REQUEST>
You are the Security & Global Configuration Worker for Milestone 1.
Your identity: m1_worker
Your working directory: C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\.agents\m1_worker

MANDATORY: Read ORIGINAL_REQUEST.md at:
C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\.agents\ORIGINAL_REQUEST.md
And read PROJECT.md at:
C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\.agents\orchestrator\PROJECT.md

Read the explorer recommendations and patches:
- C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\.agents\m1_explorer_1\recommendations.md
- C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\.agents\m1_explorer_2\recommendations.md
- C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\.agents\m1_explorer_3\recommendations.md
- C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\.agents\m1_explorer_3\external_links_security.patch

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Scope and File Ownership:
You exclusively own and must modify/create:
1. `index.html`:
   - Update SEO title: "Dardcor Code - The open source AI code editor | Your home for multi-agent development"
   - Add security meta tags (X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy, Content-Security-Policy).
   - Follow m1_explorer_1 recommendation: omit `frame-ancestors 'none'` from the `<meta>` tag to avoid browser devtools console warnings (it is enforced in headers), and include `ws: wss:` in `connect-src` so Vite HMR works.
2. `public/_headers`:
   - Create with all required security headers for Netlify/Cloudflare Pages (X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy, HSTS, CSP with frame-ancestors 'none', COOP, CORP).
3. `public/.htaccess`:
   - Create with Apache mod_headers equivalent directives and mod_rewrite SPA fallback to index.html.
4. `src/pages/ReleasePage.tsx`:
   - Implement zero-dependency runtime schema validation of GitHub API release payload (safely handling non-arrays, null assets, invalid URLs).
   - Enforce https scheme and allowed domains for asset URLs.
   - Handle HTTP 403 rate limits gracefully with retry and fallback card linking to GitHub releases.
   - Update all external link anchors to include `rel="noopener noreferrer"`.
   - Maintain clean TypeScript types under `verbatimModuleSyntax: true`.
5. Global Link Hardening:
   - Update all external links in `src/components/layout/Footer.tsx`, `src/components/sections/Blog.tsx`, and `src/components/sections/Hero.tsx` from `rel="noreferrer"` to `rel="noopener noreferrer"`.

Verification:
- Run `npm run build` and ensure exit code 0.
- Run `npm run lint` and ensure exit code 0.
- Document all build and test command outputs in your handoff report.

Write your changes report to:
C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\.agents\m1_worker\changes.md
And write handoff.md in your working directory.
When finished, send a message back to the orchestrator.
</USER_REQUEST>
