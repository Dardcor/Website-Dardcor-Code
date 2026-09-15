# Security & Robustness Recommendations for `src/pages/ReleasePage.tsx`

**Agent**: `m1_explorer_2` (ReleasePage Security Explorer)  
**Target File**: `src/pages/ReleasePage.tsx`  
**Milestone**: Milestone 1 (Security & Global Configuration)  
**Date**: 2026-09-10

---

## Executive Summary

`src/pages/ReleasePage.tsx` provides the primary software download portal for Dardcor Code, fetching dynamic release artifacts from the GitHub Releases API (`https://api.github.com/repos/Dardcor/Dardcor-Code/releases`).

An exhaustive security, robustness, and static type analysis of `ReleasePage.tsx` identified several critical vulnerabilities and robustness deficiencies:
1. **Unsafe API Data Ingestion**: The raw response from `fetch` is cast directly to `GitHubRelease[]` with no runtime structural validation. An invalid payload or non-array response leaves the component in an indefinite loading skeleton state, while missing fields (e.g. `undefined` assets or tags) trigger runtime `TypeError` crashes.
2. **Reverse Tabnabbing Risk**: All external `<a>` tags specify `rel="noreferrer"` but omit `noopener`.
3. **Script Injection / XSS via Asset URLs**: Asset `browser_download_url` and release `html_url` values are rendered directly into `<a href="...">` without validating the URL scheme (`https:`) or domain origin, exposing users to DOM-based XSS via `javascript:` URIs or MITM executable tampering over plain `http:`.
4. **Catastrophic Failure on HTTP 403 (Rate Limiting)**: Unauthenticated GitHub API requests are capped at 60 requests/hour per IP. When hit, the page displays a generic error message while rendering an empty version selector ("Select version / 0 releases") with no download buttons, leaving users unable to download the software.
5. **Type Safety & `verbatimModuleSyntax` Gaps**: `React.FC` is referenced without an explicit type import under `verbatimModuleSyntax`, and `r.json()` is unsafely asserted without `unknown` type guards.

Below are detailed findings, threat analyses, and actionable remediation blueprints for each area.

---

## 1. Runtime Schema Validation of GitHub Releases API Data

### 1.1 Threat Model & Observations
- **Observed Code** (`ReleasePage.tsx:211-227`):
  ```tsx
  fetch(GITHUB_API)
    .then((r) => {
      if (!r.ok) throw new Error(`GitHub API responded with ${r.status}`);
      return r.json();
    })
    .then((data: GitHubRelease[]) => {
      if (!cancelled && Array.isArray(data)) {
        setReleases(data.slice(0, 15));
        setLoading(false);
      }
    })
  ```
- **Vulnerabilities & Bugs**:
  - **Infinite Loading Hang**: If `Array.isArray(data)` evaluates to `false` (e.g., if GitHub returns an API error object like `{"message": "Not Found"}` with an unexpected HTTP status, or a proxy returns an HTML error page), the code enters neither `setReleases` nor `catch`. `setLoading(false)` is never called, trapping the user in an endless skeleton loader.
  - **Runtime Null-Pointer Exceptions**: If an item in `data` lacks `assets` or `assets` is `null`, `release.assets` is passed to `groupAssetsByOS(release.assets)` (`ReleasePage.tsx:232`), calling `assets.filter(...)` (`line 65`), which immediately throws `TypeError: Cannot read properties of undefined (reading 'filter')`.
  - **Missing Tag Name or Dates**: If `tag_name` is missing, `release.tag_name` fails, and `new Date(release.published_at)` produces `Invalid Date`.

### 1.2 Constraint Note
`package.json` does not include runtime schema validation libraries (e.g., Zod, Yup, Valibot). ORIGINAL_REQUEST § Stack states: *"Do NOT change the stack or install new packages."* Validation must be implemented using pure TypeScript type guards and defensive sanitization functions.

### 1.3 Recommended Validator Implementation
Implement pure type-checking and sanitization helpers:

```ts
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function parseReleaseAsset(value: unknown): ReleaseAsset | null {
  if (!isRecord(value)) return null;
  const { name, browser_download_url, size } = value;

  if (typeof name !== 'string' || !name.trim()) return null;
  if (typeof browser_download_url !== 'string' || !isValidHttpsUrl(browser_download_url)) {
    return null;
  }

  const validSize = typeof size === 'number' && Number.isFinite(size) && size >= 0 ? size : 0;

  return {
    name: name.trim(),
    browser_download_url,
    size: validSize,
  };
}

export function parseGitHubRelease(value: unknown): GitHubRelease | null {
  if (!isRecord(value)) return null;
  const { tag_name, name, body, published_at, html_url, assets } = value;

  if (typeof tag_name !== 'string' || !tag_name.trim()) return null;
  if (typeof html_url !== 'string' || !isValidHttpsUrl(html_url)) return null;

  const publishedDate = typeof published_at === 'string' ? Date.parse(published_at) : NaN;
  if (Number.isNaN(publishedDate)) return null;

  const validAssets: ReleaseAsset[] = Array.isArray(assets)
    ? assets.map(parseReleaseAsset).filter((a): a is ReleaseAsset => a !== null)
    : [];

  return {
    tag_name: tag_name.trim(),
    name: typeof name === 'string' && name.trim() ? name.trim() : tag_name.trim(),
    body: typeof body === 'string' ? body : '',
    published_at: new Date(publishedDate).toISOString(),
    html_url,
    assets: validAssets,
  };
}

export function validateReleasesResponse(data: unknown): GitHubRelease[] {
  if (!Array.isArray(data)) {
    throw new Error('API returned an invalid payload format (expected list of releases)');
  }
  return data
    .map(parseGitHubRelease)
    .filter((r): r is GitHubRelease => r !== null);
}
```

---

## 2. External Links Security Hardening (`rel="noopener noreferrer"`)

### 2.1 Threat Model & Observations
External links using `target="_blank"` without `rel="noopener noreferrer"` present a Reverse Tabnabbing risk: the target window can manipulate the opener window via `window.opener.location`. Furthermore, omitting `noreferrer` leaks referrer information.

Current locations in `ReleasePage.tsx`:
1. **Line 169** (Download button for each asset in `DownloadCard`):
   ```tsx
   // CURRENT:
   <a
     key={asset.name}
     href={asset.browser_download_url}
     target="_blank"
     rel="noreferrer"
     className="..."
   >
   ```
2. **Line 403** ("View on GitHub" button):
   ```tsx
   // CURRENT:
   <a
     href={release.html_url}
     target="_blank"
     rel="noreferrer"
     className="..."
   >
   ```
3. **Line 413** ("All releases" button):
   ```tsx
   // CURRENT:
   <a
     href="https://github.com/Dardcor/Dardcor-Code/releases"
     target="_blank"
     rel="noreferrer"
     className="..."
   >
   ```

### 2.2 Recommendation
Update all occurrences to strictly specify `rel="noopener noreferrer"`:
```tsx
rel="noopener noreferrer"
```
Ensure any new links introduced in the fallback UI (e.g. direct GitHub links) also strictly enforce `target="_blank"` and `rel="noopener noreferrer"`.

---

## 3. Asset URL Validation (HTTPS Scheme & Hostname Checks)

### 3.1 Threat Model
Asset download URLs originate from an external API. If the repository is tampered with or malicious data is injected:
- A URL such as `javascript:alert(document.cookie)` or `data:text/html,...` executed via `<a href="...">` leads to arbitrary client-side code execution (DOM-based XSS).
- An unencrypted `http://` URL exposes user binary downloads to active network sniffing and man-in-the-middle executable replacement.
- An arbitrary third-party domain (e.g., `https://malicious-phishing.com/installer.exe`) could deceive users into downloading malicious executables under the guise of an official release.

### 3.2 Recommendation
Implement strict HTTPS and hostname validation:
```ts
export function isValidHttpsUrl(urlString: string): boolean {
  if (typeof urlString !== 'string' || !urlString.trim()) {
    return false;
  }
  try {
    const parsed = new URL(urlString);
    if (parsed.protocol !== 'https:') {
      return false;
    }
    const host = parsed.hostname.toLowerCase();
    // Must originate from trusted GitHub domains
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

Apply this validation:
1. **At Ingestion**: Inside `parseReleaseAsset` and `parseGitHubRelease`. Any asset or release with an invalid URL is excluded from state.
2. **At Render Time (Defense in Depth)**: Inside `DownloadCard`, verify `isValidHttpsUrl(asset.browser_download_url)`. If validation fails, render a disabled notice rather than an active link.

---

## 4. HTTP 403 Rate Limiting & Network Error Fallback UI

### 4.1 Threat Model & UX Analysis
- Unauthenticated GitHub API requests are strictly rate-limited to **60 requests per hour per IP**.
- When rate-limited, GitHub returns:
  - Status: `HTTP 403 Forbidden`
  - Headers: `x-ratelimit-remaining: 0`, `x-ratelimit-reset: <epoch-seconds>`
  - Body: `{"message": "API rate limit exceeded for ...", "documentation_url": "..."}`
- **Current Behavior**:
  - `ReleasePage.tsx` sets `error` to `"GitHub API responded with 403"`.
  - A small red error banner is rendered.
  - The rest of the page displays an accordion with `"Select version"` and `"0 releases"`.
  - **No downloads are possible!** The primary user goal is completely blocked.

### 4.2 Recommendation: Structured Error Handling & Fallback UI

1. **Classify Errors**:
   Create a structured error state:
   ```ts
   export interface ReleaseError {
     type: 'rate_limit' | 'network' | 'generic';
     message: string;
     resetTime?: Date | null;
   }
   ```

2. **Inspect Response Headers**:
   ```ts
   if (response.status === 403) {
     const remaining = response.headers.get('x-ratelimit-remaining');
     const resetHeader = response.headers.get('x-ratelimit-reset');
     const resetTime = resetHeader ? new Date(parseInt(resetHeader, 10) * 1000) : null;

     setError({
       type: 'rate_limit',
       message:
         remaining === '0'
           ? 'GitHub API rate limit reached for anonymous requests.'
           : 'GitHub API access was temporarily restricted.',
       resetTime,
     });
     setLoading(false);
     return;
   }
   ```

3. **Fallback UI Component**:
   When `releases.length === 0` and `error` exists:
   - Do **NOT** render the empty version accordion ("0 releases").
   - Instead, render a dedicated **Fallback Download Card**:
     - **Direct GitHub Releases Link**: Prominent primary button: `"Download on GitHub Releases"` linking to `https://github.com/Dardcor/Dardcor-Code/releases/latest` (`target="_blank" rel="noopener noreferrer"`).
     - **Clear Messaging**: Explaining that GitHub limits anonymous requests and providing the reset time if known.
     - **Retry Action**: A `"Retry Connection"` button allowing the user to re-attempt the API call without a full page reload.
     - **Security Assurance**: Note that all binaries are signed and securely hosted on GitHub.

4. **Network Error Resilience**:
   Support `AbortController` cleanup in `useEffect`, avoiding state updates on unmounted components and aborting pending HTTP sockets cleanly.

---

## 5. Preserving Exact TypeScript Type Safety under `verbatimModuleSyntax`

### 5.1 Observations in `tsconfig.app.json`
- `"verbatimModuleSyntax": true`
- `"erasableSyntaxOnly": true`
- `"noUnusedLocals": true`
- `"noUnusedParameters": true`

### 5.2 Required Changes in `ReleasePage.tsx`
1. **Type Imports**:
   - `ReleasePage.tsx:73` and `line 123` use `React.FC<{ className?: string }>`.
   - `React` is not explicitly imported. Under `verbatimModuleSyntax`, import types explicitly:
     ```tsx
     import type { FC } from 'react';
     ```
2. **No `any` Types**:
   - In `fetch` response handler, treat `r.json()` output as `unknown`.
   - Validate with `validateReleasesResponse(data: unknown): GitHubRelease[]`.
   - In `catch`, treat parameter as `unknown`:
     ```tsx
     .catch((err: unknown) => {
       const message = err instanceof Error ? err.message : 'Failed to load releases';
       // ...
     });
     ```
3. **Declare Clean Interfaces**:
   ```ts
   export interface ReleaseAsset {
     name: string;
     browser_download_url: string;
     size: number;
   }

   export interface GitHubRelease {
     tag_name: string;
     name: string;
     body: string;
     published_at: string;
     html_url: string;
     assets: ReleaseAsset[];
   }

   export interface OSGroup {
     label: string;
     key: string;
     assets: ReleaseAsset[];
     Icon: FC<{ className?: string }>;
   }

   export interface ChangelogSection {
     type: string;
     items: string[];
   }
   ```

---

## 6. Additional Quality & Robustness Improvements

1. **Title Cleanup on Unmount**:
   - Line 205 currently resets title to `'Dardcor Code — Agent-First IDE for Autonomous Development'`.
   - In ORIGINAL_REQUEST § R7, the default title is:
     `'Dardcor Code - The open source AI code editor | Your home for multi-agent development'`.
   - Update unmount cleanup to restore this exact title.
2. **Duplicate `AnimatedBackground`**:
   - `ReleasePage.tsx:237` renders `<AnimatedBackground />`.
   - `src/App.tsx:32` already renders `<AnimatedBackground />` globally for all routes.
   - Rendering two canvas loops doubles client GPU workload. `AnimatedBackground` in `ReleasePage.tsx` should be removed.
3. **Safe Byte & Date Formatting**:
   - Sanitize `formatBytes(bytes: number)` to guard against negative numbers or `NaN`.
   - Implement `formatDate(dateStr: string)` with `isNaN(date.getTime())` check to avoid `"Invalid Date"` rendering.
4. **Accessibility (a11y)**:
   - Add explicit `aria-label` attributes to external links and download items:
     `aria-label={`Download ${label || asset.name} (${formatBytes(asset.size)})`}`.
   - Mark decorative icons with `aria-hidden="true"`.

---

## 7. Concrete Implementation Blueprint

Below is the complete proposed code for `src/pages/ReleasePage.tsx`:

```tsx
import { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  ExternalLink,
  AlertCircle,
  Hash,
  ChevronDown,
  FileCode,
  CheckCircle,
  ArrowLeft,
  RefreshCw,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import Footer from '../components/layout/Footer';

const GITHUB_API = 'https://api.github.com/repos/Dardcor/Dardcor-Code/releases';
const GITHUB_RELEASES_PAGE = 'https://github.com/Dardcor/Dardcor-Code/releases';
const GITHUB_LATEST_RELEASE = 'https://github.com/Dardcor/Dardcor-Code/releases/latest';

export interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

export interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  assets: ReleaseAsset[];
}

export interface OSGroup {
  label: string;
  key: string;
  assets: ReleaseAsset[];
  Icon: FC<{ className?: string }>;
}

export interface ChangelogSection {
  type: string;
  items: string[];
}

export interface ReleaseError {
  type: 'rate_limit' | 'network' | 'generic';
  message: string;
  resetTime?: Date | null;
}

// ---------------------- Validation & Helpers ----------------------

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isValidHttpsUrl(urlString: unknown): urlString is string {
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

export function parseReleaseAsset(value: unknown): ReleaseAsset | null {
  if (!isRecord(value)) return null;
  const { name, browser_download_url, size } = value;

  if (typeof name !== 'string' || !name.trim()) return null;
  if (typeof browser_download_url !== 'string' || !isValidHttpsUrl(browser_download_url)) {
    return null;
  }

  const validSize = typeof size === 'number' && Number.isFinite(size) && size >= 0 ? size : 0;

  return {
    name: name.trim(),
    browser_download_url,
    size: validSize,
  };
}

export function parseGitHubRelease(value: unknown): GitHubRelease | null {
  if (!isRecord(value)) return null;
  const { tag_name, name, body, published_at, html_url, assets } = value;

  if (typeof tag_name !== 'string' || !tag_name.trim()) return null;
  if (typeof html_url !== 'string' || !isValidHttpsUrl(html_url)) return null;

  const publishedDate = typeof published_at === 'string' ? Date.parse(published_at) : NaN;
  if (Number.isNaN(publishedDate)) return null;

  const validAssets: ReleaseAsset[] = Array.isArray(assets)
    ? assets.map(parseReleaseAsset).filter((a): a is ReleaseAsset => a !== null)
    : [];

  return {
    tag_name: tag_name.trim(),
    name: typeof name === 'string' && name.trim() ? name.trim() : tag_name.trim(),
    body: typeof body === 'string' ? body : '',
    published_at: new Date(publishedDate).toISOString(),
    html_url,
    assets: validAssets,
  };
}

export function validateReleasesResponse(data: unknown): GitHubRelease[] {
  if (!Array.isArray(data)) {
    throw new Error('API returned an invalid payload format (expected list of releases)');
  }
  return data
    .map(parseGitHubRelease)
    .filter((r): r is GitHubRelease => r !== null);
}

function formatBytes(bytes: number): string {
  if (typeof bytes !== 'number' || !Number.isFinite(bytes) || bytes <= 0) return '';
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.801" />
    </svg>
  );
}

function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}

function groupAssetsByOS(assets: ReleaseAsset[]): OSGroup[] {
  const filtered = assets.filter(
    (a) =>
      !a.name.endsWith('.blockmap') &&
      !a.name.endsWith('.yml') &&
      !a.name.endsWith('-latest.yml') &&
      !a.name.includes('RELEASES')
  );

  const groups: OSGroup[] = [
    { label: 'macOS', key: 'macos', assets: [], Icon: AppleIcon },
    { label: 'Windows', key: 'windows', assets: [], Icon: WindowsIcon },
    { label: 'Linux', key: 'linux', assets: [], Icon: LinuxIcon },
  ];

  for (const asset of filtered) {
    const name = asset.name.toLowerCase();
    if (name.includes('macos') || name.includes('mac') || name.endsWith('.dmg')) {
      groups[0].assets.push(asset);
    } else if (name.includes('windows') || name.includes('win') || name.endsWith('.exe')) {
      groups[1].assets.push(asset);
    } else if (
      name.includes('linux') ||
      name.includes('.appimage') ||
      name.endsWith('.deb') ||
      name.endsWith('.rpm') ||
      name.endsWith('.tar.gz') ||
      name.includes('snap')
    ) {
      groups[2].assets.push(asset);
    }
  }
  return groups;
}

function parseChangelog(body: string): ChangelogSection[] {
  if (typeof body !== 'string' || !body.trim()) return [];
  const sections: ChangelogSection[] = [];
  let current: ChangelogSection | null = null;
  const lines = body.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      if (current) sections.push(current);
      current = { type: trimmed.replace(/^##\s+/, ''), items: [] };
    } else if ((trimmed.startsWith('- ') || trimmed.startsWith('* ')) && current) {
      current.items.push(trimmed.replace(/^[\s*-]+\s*/, ''));
    }
  }
  if (current) sections.push(current);
  if (sections.length === 0) {
    const items = lines
      .filter((l) => l.trim().startsWith('- ') || l.trim().startsWith('* '))
      .map((l) => l.replace(/^[\s*-]+/, '').trim())
      .filter(Boolean);
    if (items.length > 0) sections.push({ type: "What's New", items });
  }
  return sections;
}

function DownloadCard({ group }: { group: OSGroup }) {
  const { Icon } = group;
  return (
    <div className="card-base p-5 flex flex-col">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border-default">
        <div className="w-9 h-9 rounded-xl bg-dc-50 flex items-center justify-center text-dc-600 shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text-primary font-display">{group.label}</h3>
          <p className="text-xs text-text-tertiary">
            {group.assets.length > 0
              ? `${group.assets.length} download${group.assets.length > 1 ? 's' : ''} available`
              : 'Not available for this platform'}
          </p>
        </div>
      </div>
      <div className="space-y-2 flex-1">
        {group.assets.length > 0 ? (
          group.assets.map((asset) => {
            if (!isValidHttpsUrl(asset.browser_download_url)) return null;

            const nameLower = asset.name.toLowerCase();
            let arch = '';
            if (nameLower.includes('arm64') || nameLower.includes('arm'))
              arch = 'ARM64';
            else if (nameLower.includes('x64') || nameLower.includes('x86_64') || nameLower.includes('intel') || nameLower.includes('amd64'))
              arch = 'x64';
            else if (nameLower.includes('apple') || nameLower.includes('silicon'))
              arch = 'Apple Silicon';

            let fileType = '';
            if (asset.name.endsWith('.dmg')) fileType = '.dmg';
            else if (asset.name.endsWith('.exe') && nameLower.includes('portable'))
              fileType = 'Portable';
            else if (asset.name.endsWith('.exe')) fileType = 'Installer';
            else if (asset.name.endsWith('.AppImage')) fileType = 'AppImage';
            else if (asset.name.endsWith('.deb')) fileType = '.deb';
            else if (asset.name.endsWith('.rpm')) fileType = '.rpm';
            else if (asset.name.endsWith('.tar.gz')) fileType = '.tar.gz';

            const label = [arch, fileType].filter(Boolean).join(' \u00b7 ');

            return (
              <a
                key={asset.name}
                href={asset.browser_download_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Download ${label || asset.name} (${formatBytes(asset.size)})`}
                className="flex items-center justify-between gap-3 w-full px-3.5 py-2.5 rounded-xl bg-dc-50/30 hover:bg-dc-50 border border-transparent hover:border-dc-200 transition-all group"
              >
                <div className="min-w-0">
                  <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors block truncate">
                    {label || asset.name}
                  </span>
                  <span className="text-xs text-text-tertiary">{formatBytes(asset.size)}</span>
                </div>
                <Download size={14} className="text-text-tertiary group-hover:text-dc-600 shrink-0 transition-colors" aria-hidden="true" />
              </a>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xs text-text-tertiary/60 text-center py-6">
              Coming soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------- Main Component ----------------------

export default function ReleasePage() {
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ReleaseError | null>(null);
  const [showChangelog, setShowChangelog] = useState(false);
  const [versionOpen, setVersionOpen] = useState(false);

  useEffect(() => {
    document.title = 'Releases — Dardcor Code';
    return () => {
      document.title = 'Dardcor Code - The open source AI code editor | Your home for multi-agent development';
    };
  }, []);

  const loadReleases = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(GITHUB_API, {
        signal,
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (response.status === 403) {
        const remaining = response.headers.get('x-ratelimit-remaining');
        const resetHeader = response.headers.get('x-ratelimit-reset');
        const resetTime = resetHeader ? new Date(parseInt(resetHeader, 10) * 1000) : null;

        setError({
          type: 'rate_limit',
          message:
            remaining === '0'
              ? 'GitHub API rate limit reached for anonymous requests.'
              : 'GitHub API access was temporarily restricted.',
          resetTime,
        });
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`GitHub API responded with status ${response.status}`);
      }

      const rawData: unknown = await response.json();
      const validated = validateReleasesResponse(rawData);

      if (validated.length === 0) {
        setError({
          type: 'generic',
          message: 'No published releases currently available.',
        });
      } else {
        setReleases(validated.slice(0, 15));
        setSelectedIndex(0);
      }
    } catch (err: unknown) {
      if (signal?.aborted) return;

      const isNetwork = err instanceof TypeError && err.message.toLowerCase().includes('fetch');
      setError({
        type: isNetwork ? 'network' : 'generic',
        message: err instanceof Error ? err.message : 'Unable to connect to GitHub releases.',
      });
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadReleases(controller.signal);
    return () => controller.abort();
  }, [loadReleases]);

  const release = releases[selectedIndex] || null;
  const osGroups = release ? groupAssetsByOS(release.assets) : [];
  const changelogSections = release?.body ? parseChangelog(release.body) : [];

  return (
    <main className="relative z-10">
      <section className="relative min-h-screen pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <span className="section-eyebrow mb-3">Downloads</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
              Download <span className="text-gradient">Dardcor Code</span>
            </h1>
            <p className="mt-2 text-text-secondary max-w-xl mx-auto">
              Get the latest version for your platform. Verified releases with SHA checksums and automatic updates.
            </p>
          </motion.div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid md:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card-base p-6">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-border-default">
                    <div className="w-9 h-9 rounded-xl bg-dc-50" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3 w-20 bg-dc-50 rounded" />
                      <div className="h-2.5 w-24 bg-dc-50 rounded" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-10 bg-dc-50/50 rounded-xl" />
                    <div className="h-10 bg-dc-50/50 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Fallback Card on Error / Rate-Limit with 0 releases */}
          {!loading && error && releases.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-base p-6 md:p-8 max-w-2xl mx-auto text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
                {error.type === 'rate_limit' ? <Clock size={24} /> : <AlertCircle size={24} />}
              </div>

              <h2 className="text-xl font-display font-semibold text-text-primary mb-2">
                {error.type === 'rate_limit'
                  ? 'GitHub API Rate Limit Reached'
                  : error.type === 'network'
                  ? 'Unable to Connect to GitHub'
                  : 'Releases Temporarily Unavailable'}
              </h2>

              <p className="text-sm text-text-secondary mb-6 max-w-md mx-auto">
                {error.type === 'rate_limit'
                  ? 'GitHub limits unauthenticated API requests per hour. You can still download all official Dardcor Code builds directly from GitHub Releases.'
                  : error.message}
                {error.resetTime && (
                  <span className="block mt-2 text-xs text-text-tertiary">
                    Rate limit resets around {error.resetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.
                  </span>
                )}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <a
                  href={GITHUB_LATEST_RELEASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-dc-600 hover:bg-dc-500 text-white font-medium text-sm transition-colors shadow-sm"
                >
                  <Download size={16} />
                  Download on GitHub Releases
                  <ExternalLink size={14} className="opacity-70" />
                </a>

                <button
                  onClick={() => loadReleases()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border-default hover:border-dc-300 text-text-primary text-sm font-medium transition-colors"
                >
                  <RefreshCw size={14} />
                  Retry Connection
                </button>
              </div>

              <div className="pt-6 border-t border-border-default flex items-center justify-center gap-2 text-xs text-text-tertiary">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>All binaries are digitally signed and hosted securely on GitHub.</span>
              </div>
            </motion.div>
          )}

          {/* Normal Releases Selector & Download View */}
          {!loading && releases.length > 0 && (
            <div className="card-base overflow-hidden">
              <button
                onClick={() => setVersionOpen(!versionOpen)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-dc-50/30 transition-colors text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <ChevronDown
                    size={16}
                    className={`text-text-tertiary shrink-0 transition-transform ${
                      versionOpen ? 'rotate-0' : '-rotate-90'
                    }`}
                  />
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Hash size={15} className="text-dc-500 shrink-0" />
                    <span className="font-semibold text-text-primary font-display">
                      {release ? `Dardcor Code ${release.tag_name}` : 'Select version'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {!versionOpen && release && (
                    <span className="text-xs text-text-tertiary">
                      {formatDate(release.published_at)}
                    </span>
                  )}
                  <span className="text-xs text-text-tertiary">
                    {releases.length} release{releases.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {versionOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden border-t border-border-default"
                  >
                    <div className="divide-y divide-border-default">
                      {releases.map((r, i) => (
                        <button
                          key={r.tag_name}
                          onClick={() => {
                            setSelectedIndex(i);
                            setVersionOpen(false);
                            setShowChangelog(false);
                          }}
                          className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-colors text-left ${
                            i === selectedIndex
                              ? 'bg-dc-50 text-dc-700'
                              : 'text-text-secondary hover:bg-dc-50/30 hover:text-text-primary'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {i === selectedIndex ? (
                              <CheckCircle size={14} className="text-dc-600 shrink-0" />
                            ) : (
                              <span className="w-3.5 shrink-0" />
                            )}
                            <span className="font-medium">{r.tag_name}</span>
                            {i === 0 && (
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-dc-600 bg-dc-100 px-1.5 py-0.5 rounded">
                                Latest
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-text-tertiary shrink-0 ml-4">
                            {formatDate(r.published_at)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main OS Downloads Grid */}
              {release && (
                <div className="px-5 py-5 border-t border-border-default">
                  <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-4">
                    Downloads for {release.tag_name}
                  </h3>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={release.tag_name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {osGroups.map((group) => (
                        <DownloadCard key={group.key} group={group} />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* Card Footer Links */}
              <div className="flex items-center gap-4 px-5 py-3 border-t border-border-default bg-dc-50/20">
                {release?.body && (
                  <button
                    onClick={() => setShowChangelog(!showChangelog)}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${
                      showChangelog ? 'text-dc-700' : 'text-text-tertiary hover:text-text-primary'
                    }`}
                  >
                    <FileCode size={12} />
                    {showChangelog ? 'Hide changelog' : 'View changelog'}
                  </button>
                )}
                {release && isValidHttpsUrl(release.html_url) && (
                  <a
                    href={release.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-text-tertiary hover:text-text-primary transition-colors"
                  >
                    <ExternalLink size={12} aria-hidden="true" />
                    View on GitHub
                  </a>
                )}
                <a
                  href={GITHUB_RELEASES_PAGE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-text-tertiary hover:text-text-primary transition-colors ml-auto"
                >
                  All releases
                  <ExternalLink size={10} aria-hidden="true" />
                </a>
              </div>
            </div>
          )}

          {/* Changelog Section */}
          {showChangelog && release?.body && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-base p-5 md:p-6 mt-5"
            >
              <h2 className="text-sm font-semibold text-text-primary font-display mb-4">
                {release.tag_name} Changelog
              </h2>
              {changelogSections.length > 0 ? (
                <div className="space-y-4">
                  {changelogSections.map((section, si) => (
                    <div key={si}>
                      <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-dc-500 shrink-0" />
                        {section.type}
                      </h3>
                      <ul className="space-y-1.5">
                        {section.items.map((item, ii) => (
                          <li key={ii} className="flex items-start gap-2 text-sm text-text-secondary ml-4">
                            <span className="w-1 h-1 rounded-full bg-dc-400/60 mt-2 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-text-secondary whitespace-pre-line leading-relaxed">
                  {release.body}
                </div>
              )}
            </motion.div>
          )}

          {/* Return Home link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-10"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-dc-600 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to home
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
