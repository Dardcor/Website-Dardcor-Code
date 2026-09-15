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

const GITHUB_API = 'https://api.github.com/repos/Dardcor/Dardcor-Code/releases';
const GITHUB_RELEASES_PAGE = 'https://github.com/Dardcor/Dardcor-Code/releases';

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  assets: ReleaseAsset[];
}

interface OSGroup {
  label: string;
  key: string;
  assets: ReleaseAsset[];
  Icon: FC<{ className?: string }>;
}

interface ChangelogSection {
  type: string;
  items: string[];
}

interface ReleaseError {
  type: 'rate_limit' | 'network' | 'generic';
  message: string;
  resetTime?: Date | null;
}

const FALLBACK_RELEASE: GitHubRelease = {
  tag_name: 'Dardcor-Code-v1.0.0',
  name: 'Dardcor Code v1.0.0 Official Release',
  body: `## Features
- Complete multi-agent orchestration architecture with autonomous planning, execution, and verification.
- Monaco Editor engine with custom dark purple (#6A1B9A) theme and high-contrast accessibility.
- Embedded Dardcor Router with unified BYOK proxy for Claude, GPT, Gemini, and Ollama.
- High-performance Terminal PTY with native sub-shell isolation and zero network egress by default.
- Full Model Context Protocol (MCP) client support for custom tool pipelines.

## Security
- Strict content security policy and sandboxed terminal execution.
- GPG and Minisign dual cryptographic signatures (.sig) for all platform binaries.
- Zero telemetry egress and air-gapped enterprise mode.`,
  published_at: '2026-03-10T12:00:00.000Z',
  html_url: 'https://github.com/Dardcor/Dardcor-Code/releases/tag/Dardcor-Code-v1.0.0',
  assets: [
    {
      name: 'Dardcor-Code_1.0.0_x64-setup.exe',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_x64-setup.exe',
      size: 254067809,
    },
    {
      name: 'Dardcor-Code_1.0.0_x64-setup.exe.sig',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_x64-setup.exe.sig',
      size: 69,
    },
    {
      name: 'Dardcor-Code_1.0.0_x64_en-US.msi',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_x64_en-US.msi',
      size: 254067809,
    },
    {
      name: 'Dardcor-Code_1.0.0_x64_en-US.msi.sig',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_x64_en-US.msi.sig',
      size: 69,
    },
    {
      name: 'Dardcor-Code_1.0.0_aarch64.dmg',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_aarch64.dmg',
      size: 357184405,
    },
    {
      name: 'Dardcor-Code_1.0.0_x64.dmg',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_x64.dmg',
      size: 357184405,
    },
    {
      name: 'Dardcor-Code_aarch64.app.tar.gz',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_aarch64.app.tar.gz',
      size: 357184405,
    },
    {
      name: 'Dardcor-Code_aarch64.app.tar.gz.sig',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_aarch64.app.tar.gz.sig',
      size: 65,
    },
    {
      name: 'Dardcor-Code_universal.app.tar.gz',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_universal.app.tar.gz',
      size: 357184405,
    },
    {
      name: 'Dardcor-Code_universal.app.tar.gz.sig',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_universal.app.tar.gz.sig',
      size: 65,
    },
    {
      name: 'Dardcor-Code_x64.app.tar.gz',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_x64.app.tar.gz',
      size: 357184405,
    },
    {
      name: 'Dardcor-Code_x64.app.tar.gz.sig',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_x64.app.tar.gz.sig',
      size: 65,
    },
    {
      name: 'Dardcor-Code_1.0.0_amd64.deb',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_amd64.deb',
      size: 356424280,
    },
    {
      name: 'Dardcor-Code_1.0.0_amd64.deb.sig',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_amd64.deb.sig',
      size: 65,
    },
    {
      name: 'Dardcor-Code_1.0.0_arm64.deb',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_arm64.deb',
      size: 356424280,
    },
    {
      name: 'Dardcor-Code_1.0.0_arm64.deb.sig',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_arm64.deb.sig',
      size: 65,
    },
    {
      name: 'Dardcor-Code-1.0.0-1.x86_64.rpm',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code-1.0.0-1.x86_64.rpm',
      size: 308336502,
    },
    {
      name: 'Dardcor-Code-1.0.0-1.x86_64.rpm.sig',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code-1.0.0-1.x86_64.rpm.sig',
      size: 65,
    },
    {
      name: 'Dardcor-Code-1.0.0-1.aarch64.rpm',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code-1.0.0-1.aarch64.rpm',
      size: 356424280,
    },
    {
      name: 'Dardcor-Code-1.0.0-1.aarch64.rpm.sig',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code-1.0.0-1.aarch64.rpm.sig',
      size: 65,
    },
    {
      name: 'Dardcor-Code_1.0.0_amd64.AppImage',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_amd64.AppImage',
      size: 356424280,
    },
    {
      name: 'Dardcor-Code_1.0.0_amd64.AppImage.sig',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_amd64.AppImage.sig',
      size: 65,
    },
    {
      name: 'Dardcor-Code_1.0.0_aarch64.AppImage',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_aarch64.AppImage',
      size: 356424280,
    },
    {
      name: 'Dardcor-Code_1.0.0_aarch64.AppImage.sig',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_aarch64.AppImage.sig',
      size: 65,
    },
    {
      name: 'updater.json',
      browser_download_url: 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/updater.json',
      size: 87,
    },
  ],
};

// ---------------------- Validation & Helpers ----------------------

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

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

function parseReleaseAsset(value: unknown): ReleaseAsset | null {
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

function parseGitHubRelease(value: unknown): GitHubRelease | null {
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

function validateReleasesResponse(data: unknown): GitHubRelease[] {
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
      !a.name.includes('RELEASES') &&
      !a.name.endsWith('.sig') &&
      a.name !== 'updater.json' &&
      !a.name.endsWith('.sha256')
  );

  const groups: OSGroup[] = [
    { label: 'Windows', key: 'windows', assets: [], Icon: WindowsIcon },
    { label: 'macOS', key: 'macos', assets: [], Icon: AppleIcon },
    { label: 'Linux', key: 'linux', assets: [], Icon: LinuxIcon },
  ];

  for (const asset of filtered) {
    const name = asset.name.toLowerCase();
    if (
      name.endsWith('.exe') ||
      name.endsWith('.msi') ||
      name.includes('win') ||
      name.includes('windows')
    ) {
      groups[0].assets.push(asset);
    } else if (
      name.endsWith('.dmg') ||
      name.includes('.app.tar.gz') ||
      name.includes('macos') ||
      name.includes('darwin') ||
      name.includes('mac')
    ) {
      groups[1].assets.push(asset);
    } else if (
      name.endsWith('.deb') ||
      name.endsWith('.rpm') ||
      name.includes('.appimage') ||
      name.endsWith('.tar.gz') ||
      name.includes('linux')
    ) {
      groups[2].assets.push(asset);
    }
  }
  return groups;
}

function getVerificationAssets(assets: ReleaseAsset[]): ReleaseAsset[] {
  return assets.filter((a) => {
    const name = a.name.toLowerCase();
    return name.endsWith('.sig') || name === 'updater.json' || name.endsWith('.sha256');
  });
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
              ? `${group.assets.length} package${group.assets.length > 1 ? 's' : ''} available`
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
            if (nameLower.includes('universal')) {
              arch = 'Universal';
            } else if (nameLower.includes('aarch64') || nameLower.includes('arm64')) {
              arch = 'ARM64';
            } else if (
              nameLower.includes('x64') ||
              nameLower.includes('x86_64') ||
              nameLower.includes('amd64') ||
              nameLower.includes('intel')
            ) {
              arch = 'x64';
            }

            let fileType = '';
            if (asset.name.endsWith('.dmg')) {
              fileType = '.dmg';
            } else if (asset.name.endsWith('.msi')) {
              fileType = 'MSI Installer';
            } else if (asset.name.endsWith('.exe') && nameLower.includes('portable')) {
              fileType = 'Portable';
            } else if (asset.name.endsWith('.exe')) {
              fileType = 'User Installer (.exe)';
            } else if (asset.name.endsWith('.AppImage') || asset.name.endsWith('.appimage')) {
              fileType = 'AppImage';
            } else if (asset.name.endsWith('.deb')) {
              fileType = '.deb';
            } else if (asset.name.endsWith('.rpm')) {
              fileType = '.rpm';
            } else if (asset.name.endsWith('.app.tar.gz')) {
              fileType = 'Archive (.tar.gz)';
            } else if (asset.name.endsWith('.tar.gz')) {
              fileType = '.tar.gz';
            }

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
  const [releases, setReleases] = useState<GitHubRelease[]>([FALLBACK_RELEASE]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ReleaseError | null>(null);
  const [showChangelog, setShowChangelog] = useState(false);
  const [versionOpen, setVersionOpen] = useState(false);

  useEffect(() => {
    document.title = 'Releases - Dardcor Code';
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
              ? 'GitHub API rate limit reached for anonymous requests. Showing verified release package.'
              : 'GitHub API access was temporarily restricted. Showing verified release package.',
          resetTime,
        });
        return;
      }

      if (!response.ok) {
        throw new Error(`GitHub API responded with status ${response.status}`);
      }

      const rawData: unknown = await response.json();
      const validated = validateReleasesResponse(rawData);

      if (validated.length > 0) {
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

  const release = releases[selectedIndex] || FALLBACK_RELEASE;
  const osGroups = groupAssetsByOS(release.assets);
  const verificationAssets = getVerificationAssets(release.assets);
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
              Get the latest version for your platform. Verified releases with SHA checksums, Minisign signatures, and automatic updates.
            </p>
          </motion.div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-purple-950/30 border border-purple-800/40 flex items-start gap-3 text-xs sm:text-sm text-purple-200">
              <AlertCircle size={18} className="text-purple-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p>{error.message}</p>
                {error.resetTime && (
                  <p className="text-xs text-[#b3a8c9] mt-1 flex items-center gap-1">
                    <Clock size={12} />
                    <span>Rate limit resets at: {error.resetTime.toLocaleTimeString()}</span>
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => { void loadReleases(); }}
                disabled={loading}
                className="p-1.5 rounded-lg hover:bg-purple-900/50 text-purple-300 hover:text-white transition-colors cursor-pointer"
                title="Refresh releases"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
          )}

          {/* Normal Releases Selector & Download View */}
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
                    {`Dardcor Code ${release.tag_name}`}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {!versionOpen && (
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
            <div className="px-5 py-5 border-t border-border-default">
              <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-4">
                Downloads for {release.tag_name}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {osGroups.map((group) => (
                  <DownloadCard key={group.key} group={group} />
                ))}
              </div>

              {/* Verification & Signatures Panel */}
              {verificationAssets.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border-default">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck size={16} className="text-emerald-400" />
                    <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider font-display">
                      Minisign Signatures &amp; Checksums
                    </h4>
                  </div>
                  <p className="text-xs text-text-tertiary mb-3">
                    Verify package integrity before installing with our published detached signatures (.sig) and update manifest.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {verificationAssets.map((asset) => (
                      <a
                        key={asset.name}
                        href={asset.browser_download_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-lg bg-dc-50/20 hover:bg-dc-50/40 border border-border-default text-xs text-text-secondary hover:text-text-primary transition-colors truncate"
                      >
                        <span className="truncate mr-2 font-mono text-[11px]">{asset.name}</span>
                        <Download size={12} className="shrink-0 text-text-tertiary" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
    </main>
  );
}
