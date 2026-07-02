import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import Footer from '../components/layout/Footer';

const GITHUB_API = 'https://api.github.com/repos/Dardcor/Dardcor-Code/releases';

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

// ─── OS Brand SVG Icons ───

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
    <svg viewBox="0 0 1024 1024" fill="currentColor" className={className} aria-hidden="true">
      <g transform="translate(0, 1024) scale(1, -1)">
        <path d="M539.392 615.083c-15.531-8.064-33.707-17.92-52.992-17.92s-34.56 8.917-45.483 17.621c-5.547 4.309-9.984 8.619-13.355 11.776-5.845 4.608-5.12 11.051-2.731 10.837 4.011-0.512 4.608-5.803 7.168-8.149 3.413-3.2 7.68-7.339 12.885-11.477 10.368-8.192 24.192-16.213 41.515-16.213s37.461 10.155 49.792 17.067c6.955 3.925 15.829 10.923 23.083 16.256 5.547 4.053 5.333 8.96 9.899 8.448 4.565-0.555 1.195-5.419-5.205-11.008-6.443-5.589-16.469-13.013-24.576-17.237zM838.357 201.813v0c-6.059 6.827-8.917 19.456-11.989 32.896s-6.528 27.904-17.536 37.291c-0.043 0-0.085 0.043-0.085 0.043-2.219 1.92-4.437 3.541-6.699 4.864-2.261 1.365-4.523 2.432-6.827 3.328 15.317 45.44 9.344 90.709-6.187 131.584-18.944 50.219-52.139 93.952-77.44 123.861-28.331 35.755-56.021 69.675-55.509 119.808 0.896 76.501 8.405 218.368-126.208 218.539-5.461 0-11.179-0.213-17.109-0.725-150.443-12.075-110.507-171.008-112.768-224.213-2.731-38.912-10.624-69.589-37.419-107.648-31.403-37.376-75.691-97.92-96.683-160.896-9.899-29.739-14.592-60.032-10.283-88.747-1.323-1.195-2.603-2.475-3.883-3.797-9.216-9.856-16.043-21.803-23.68-29.824-7.083-7.125-17.195-9.771-28.331-13.781s-23.339-9.856-30.763-24.107v0c0 0 0-0.043-0.043-0.085-3.499-6.485-4.608-13.525-4.608-20.651 0-6.571 0.981-13.269 1.963-19.669 2.048-13.355 4.139-25.984 1.365-34.56-8.789-24.064-9.899-40.704-3.712-52.779 6.229-12.117 18.944-17.451 33.408-20.437 28.843-6.016 67.925-4.523 98.731-20.864l2.645 4.992-2.603-5.035c32.981-17.237 66.432-23.339 93.099-17.28 19.371 4.437 35.029 15.957 43.136 33.664 20.864 0.085 43.733 8.917 80.427 10.923 24.875 2.005 55.979-8.832 91.691-6.827 0.939-3.883 2.304-7.637 4.181-11.179 0 0 0-0.043 0.043-0.085 13.824-27.691 39.595-40.363 67.029-38.229s56.704 18.347 80.341 46.464l-4.352 3.627 4.352-3.584c22.485 27.307 59.861 38.613 84.651 53.547 12.373 7.467 22.4 16.853 23.211 30.421 0.768 13.568-7.211 28.8-25.557 49.152zM505.984 701.355c-0.128 9.984 1.536 18.56 5.376 27.264s8.576 14.976 15.275 20.053 13.312 7.424 21.077 7.509h0.384c7.637 0 14.165-2.261 20.864-7.125 6.784-4.949 11.691-11.136 15.616-19.755 3.883-8.405 5.76-16.64 5.973-26.411 0-0.256 0-0.469 0.043-0.725 0.085-10.027-1.621-18.56-5.419-27.264-2.176-4.949-4.651-9.131-7.68-12.757-0.981 0.469-2.091 0.939-3.157 1.408-3.797 1.621-7.125 2.944-10.112 4.096s-5.291 1.877-7.723 2.731c1.749 2.091 5.205 4.608 6.443 7.723 1.963 4.693 2.901 9.344 3.072 14.805 0 0.213 0.085 0.427 0.085 0.683 0.128 5.291-0.597 9.771-2.133 14.379-1.621 4.821-3.669 8.32-6.613 11.221s-5.931 4.224-9.515 4.309c-0.171 0-0.299 0-0.469 0-3.371 0-6.229-1.152-9.259-3.669-3.157-2.645-5.504-6.016-7.424-10.667-1.963-4.693-2.901-9.344-3.072-14.848-0.043-0.213-0.043-0.427-0.043-0.64-0.085-3.029 0.128-5.845 0.597-8.533-6.827 3.413-15.573 5.888-21.632 7.296-0.341 2.645-0.555 5.333-0.597 8.107v0.811zM414.507 699.136c-0.512 8.619 0.384 16.043 2.731 23.723s5.547 13.269 10.155 17.835c4.608 4.565 9.259 6.869 14.891 7.168 0.427 0 0.853 0 1.28 0 5.035 0 9.6-1.707 14.293-5.419 5.077-4.053 8.917-9.259 12.117-16.597 3.243-7.296 4.949-14.635 5.419-23.253v-0.085c0.256-3.627 0.213-7.040-0.085-10.368-0.981-0.256-1.963-0.597-2.901-0.896-5.461-1.877-9.813-3.968-13.995-6.741 0.427 2.901 0.469 5.845 0.128 9.131 0 0.171 0 0.341 0 0.512-0.469 4.352-1.365 8.021-2.901 11.691-1.621 3.84-3.456 6.571-5.888 8.661-2.219 1.877-4.267 2.773-6.528 2.731-0.256 0-0.469 0-0.725-0.043-2.603-0.213-4.693-1.451-6.699-3.925-2.005-2.432-3.328-5.461-4.309-9.515-0.939-4.011-1.195-7.979-0.811-12.501 0-0.171 0.043-0.299 0.043-0.512 0.427-4.395 1.323-8.064 2.859-11.733 1.621-3.797 3.499-6.528 5.931-8.619 0.384-0.341 0.811-0.683 1.152-0.939-2.517-1.92-4.181-3.328-6.229-4.821-1.28-0.939-2.859-2.091-4.693-3.456-3.968 3.712-7.083 8.405-9.771 14.592-3.243 7.339-4.949 14.677-5.461 23.296v0.085zM421.12 646.741c7.979 5.973 13.44 9.984 17.152 12.715 3.669 2.688 5.163 3.669 6.315 4.779v0h0.043c5.973 5.632 15.445 15.957 29.824 20.907 4.907 1.707 10.453 2.773 16.64 2.816 11.733 0.043 25.941-3.797 43.093-14.848 10.539-6.827 18.731-7.424 37.632-15.488h0.043c9.088-3.712 14.421-8.619 17.024-13.696 2.603-5.12 2.688-10.667 0.512-16.512-4.395-11.648-18.304-23.979-37.845-30.080v0h-0.043c-9.557-3.072-17.835-9.941-27.605-15.531s-20.864-10.112-35.925-9.259c-6.4 0.384-11.563 1.664-15.957 3.541s-8.021 4.395-11.52 7.125c-6.869 5.589-12.928 12.587-21.76 17.749h-0.085c-14.208 8.107-21.973 17.408-24.448 25.515-2.432 8.064-0.128 14.976 6.912 20.267zM426.709 91.307v-0.043c-2.005-26.581-16.981-41.003-40.021-46.293-22.997-5.248-54.187 0-85.291 16.256h-0.043c-34.475 18.219-75.435 16.427-101.717 21.931-13.141 2.731-21.717 6.869-25.685 14.549-3.925 7.68-4.011 21.077 4.352 43.861l0.085 0.171c4.139 12.757 1.067 26.709-0.896 39.851-2.005 13.099-2.987 25.003 1.451 33.323l0.043 0.085c5.76 11.051 14.165 15.019 24.576 18.731 10.453 3.755 22.784 6.699 32.597 16.469l0.085 0.085c9.045 9.515 15.829 21.461 23.765 29.952 6.699 7.125 13.397 11.904 23.509 11.947 0.128 0 0.256 0 0.384 0 1.749 0 3.627-0.128 5.632-0.469 13.397-2.005 25.088-11.435 36.395-26.667l32.512-59.264h0.043c8.619-18.048 26.923-37.973 42.411-58.24 15.445-20.267 27.477-40.619 25.899-56.192l-0.085-0.043zM424.021 134.4c-4.267 6.741-9.173 13.397-14.208 20.011-3.2 4.224-6.485 8.405-9.771 12.501 6.443 0 11.947 1.024 16.384 3.072 5.547 2.517 9.429 6.528 11.349 11.691 3.84 10.325 0 24.875-12.288 41.515-12.373 16.64-33.195 35.413-63.744 54.144v0c-22.485 13.995-35.029 31.104-40.917 49.707s-5.077 38.699-0.555 58.581c8.704 38.144 31.104 75.179 45.355 98.475 3.84 2.816 1.365-5.248-14.464-34.603-14.165-26.837-40.661-88.789-4.395-137.131 0.939 34.432 9.173 69.504 22.955 102.315 20.139 45.525 62.123 124.544 65.451 187.52 1.749-1.237 7.68-5.248 10.283-6.741v0c7.765-4.523 13.483-11.179 20.992-17.195 7.552-6.059 16.896-11.264 31.104-12.075 1.323-0.085 2.688-0.128 3.968-0.128 14.635 0 26.027 4.779 35.541 10.197 10.325 5.888 18.603 12.459 26.368 14.976h0.043c16.512 5.205 29.611 14.293 37.077 24.96 12.885-50.603 42.709-123.605 61.867-159.275 10.197-18.901 30.507-59.093 39.253-107.52 5.547 0.171 11.648-0.64 18.219-2.304 22.912 59.435-19.413 123.392-38.784 141.227-7.851 7.595-8.192 11.008-4.352 10.837 20.992-18.603 48.597-55.936 58.624-98.133 4.565-19.243 5.547-39.467 0.683-59.435 2.389-0.981 4.821-2.048 7.296-3.243 36.779-17.92 50.389-33.493 43.819-54.741-2.133 0.085-4.267 0.043-6.315 0-0.171 0-0.384 0-0.597 0 5.333 16.853-6.443 29.312-37.931 43.52-32.597 14.336-58.581 12.928-62.976-16.171-0.299-1.536-0.555-3.072-0.725-4.651-2.432-0.853-4.864-1.92-7.339-3.243-15.275-8.405-23.68-23.595-28.331-42.24-4.608-18.645-5.973-41.131-7.253-66.475 0 0 0 0 0 0-0.811-12.715-6.016-29.952-11.349-48.171-53.291-38.272-127.403-54.741-190.336-11.776zM834.816 131.968c-22.357-13.525-62.123-25.301-87.467-56.021-22.059-26.24-48.896-40.619-72.533-42.496-23.68-1.877-44.075 7.936-56.107 32.085v0.043l-0.043 0.128c-7.467 14.208-4.352 36.608 1.92 60.245s15.317 47.915 16.555 67.627v0.043c1.28 25.259 2.688 47.36 6.955 64.384s10.923 28.544 22.741 35.029c0.597 0.299 1.109 0.597 1.664 0.853 1.323-21.888 12.16-44.203 31.317-49.024 20.949-5.504 51.157 12.459 63.915 27.136 2.56 0.085 5.035 0.256 7.467 0.299 11.179 0.256 20.523-0.384 30.165-8.747v-0.043h0.043c7.381-6.229 10.88-18.048 13.909-31.275s5.461-27.605 14.592-37.888v0h0.043c17.493-19.456 23.125-32.597 22.656-40.96-0.469-8.448-6.528-14.677-17.792-21.419z" />
      </g>
    </svg>
  );
}

// ─── Helpers ───

function formatBytes(bytes: number): string {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

function groupAssetsByOS(assets: ReleaseAsset[]) {
  const filtered = assets.filter(
    (a) =>
      !a.name.endsWith('.blockmap') &&
      !a.name.endsWith('.yml') &&
      !a.name.endsWith('-latest.yml') &&
      !a.name.includes('RELEASES')
  );

  const groups: { label: string; key: string; assets: ReleaseAsset[] }[] = [
    { label: 'macOS', key: 'macos', assets: [] },
    { label: 'Windows', key: 'windows', assets: [] },
    { label: 'Linux', key: 'linux', assets: [] },
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

function parseChangelog(body: string): { type: string; items: string[] }[] {
  const sections: { type: string; items: string[] }[] = [];
  let current: { type: string; items: string[] } | null = null;

  const lines = body.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      if (current) sections.push(current);
      current = { type: trimmed.replace(/^##\s+/, ''), items: [] };
    } else if ((trimmed.startsWith('- ') || trimmed.startsWith('* ')) && current) {
      current.items.push(trimmed.replace(/^[\s*\-]+\s*/, ''));
    }
  }
  if (current) sections.push(current);

  if (sections.length === 0) {
    const items = lines
      .filter((l) => l.trim().startsWith('- ') || l.trim().startsWith('* '))
      .map((l) => l.replace(/^[\s*\-]+/, '').trim())
      .filter(Boolean);
    if (items.length > 0) sections.push({ type: "What's New", items });
  }

  return sections;
}

function OsIcon({ os }: { os: string }) {
  switch (os) {
    case 'macos':
      return <AppleIcon className="w-8 h-8" />;
    case 'windows':
      return <WindowsIcon className="w-7 h-7" />;
    case 'linux':
      return <LinuxIcon className="w-8 h-8" />;
    default:
      return null;
  }
}

function DownloadCard({ group }: { group: { label: string; key: string; assets: ReleaseAsset[] } }) {
  return (
    <div className="glass-strong rounded-2xl border border-border-default p-5 flex flex-col">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border-subtle">
        <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-text-secondary shrink-0">
          <OsIcon os={group.key} />
        </div>
        <div>
          <h3 className="text-base font-semibold text-text-primary">{group.label}</h3>
          <p className="text-xs text-text-tertiary">
            {group.assets.length > 0
              ? `${group.assets.length} download${group.assets.length > 1 ? 's' : ''}`
              : 'Not available'}
          </p>
        </div>
      </div>

      <div className="space-y-2 flex-1">
        {group.assets.length > 0 ? (
          group.assets.map((asset) => {
            const nameLower = asset.name.toLowerCase();
            let arch = '';
            if (nameLower.includes('arm64') || nameLower.includes('arm'))
              arch = 'ARM64';
            else if (
              nameLower.includes('x64') ||
              nameLower.includes('x86_64') ||
              nameLower.includes('intel') ||
              nameLower.includes('amd64')
            )
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

            const label = [arch, fileType].filter(Boolean).join(' · ');

            return (
              <a
                key={asset.name}
                href={asset.browser_download_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] hover:bg-dc-500/10 border border-transparent hover:border-dc-500/20 transition-all group"
              >
                <div className="min-w-0">
                  <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors block truncate">
                    {label || asset.name}
                  </span>
                  <span className="text-xs text-text-tertiary">{formatBytes(asset.size)}</span>
                </div>
                <Download
                  size={15}
                  className="text-text-tertiary group-hover:text-dc-400 shrink-0 transition-colors"
                />
              </a>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xs text-text-tertiary/50 text-center py-6">
              No downloads for this platform
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReleasePage() {
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showChangelog, setShowChangelog] = useState(false);
  const [versionOpen, setVersionOpen] = useState(false);

  useEffect(() => {
    document.title = 'Releases — Dardcor Code';
    return () => {
      document.title = 'Dardcor Code — Agent-First IDE for Autonomous Development';
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

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
      .catch((e: Error) => {
        if (!cancelled) {
          setError(e.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const release = releases[selectedIndex] || null;
  const osGroups = release ? groupAssetsByOS(release.assets) : [];
  const changelogSections = release?.body ? parseChangelog(release.body) : [];

  return (
    <>
      <main>
        <section className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 gradient-bg pointer-events-none" />
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-dc-500/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-dc-600/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto">
            {/* ───── HEADER ───── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-10"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
                Download <span className="text-gradient">Dardcor Code</span>
              </h1>
              <p className="mt-3 text-text-secondary max-w-xl mx-auto">
                Download the latest version for your platform. Auto-updates are enabled by default.
              </p>
            </motion.div>

            {/* ───── ERROR ───── */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-4 mb-10 text-red-400 max-w-2xl mx-auto"
              >
                <AlertCircle size={18} />
                <span className="text-sm font-medium">Failed to fetch release data: {error}</span>
              </motion.div>
            )}

            {/* ───── LOADING ───── */}
            {loading ? (
              <div className="grid md:grid-cols-3 gap-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="glass-strong rounded-2xl border border-border-default p-6">
                    <div className="h-6 w-56 bg-white/5 rounded animate-shimmer mb-4" />
                    <div className="space-y-3">
                      <div className="h-12 bg-white/5 rounded-lg animate-shimmer" />
                      <div className="h-12 bg-white/5 rounded-lg animate-shimmer" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-strong rounded-2xl border border-border-default overflow-hidden">
                {/* ───── ACCORDION HEADER ───── */}
                <button
                  onClick={() => setVersionOpen(!versionOpen)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <ChevronDown
                      size={16}
                      className={`text-text-tertiary shrink-0 transition-transform ${
                        versionOpen ? 'rotate-0' : '-rotate-90'
                      }`}
                    />
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Hash size={16} className="text-dc-400 shrink-0" />
                      <span className="font-semibold text-text-primary">
                        {release ? `Dardcor Code ${release.tag_name}` : 'Select version'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {!versionOpen && release && (
                      <span className="text-xs text-text-tertiary">
                        {new Date(release.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                    <span className="text-xs text-text-tertiary">
                      {releases.length} release{releases.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </button>

                {/* ───── ACCORDION BODY ───── */}
                <AnimatePresence initial={false}>
                  {versionOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border-subtle">
                        {/* Version list */}
                        <div className="divide-y divide-border-subtle">
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
                                  ? 'bg-dc-500/8 text-dc-300'
                                  : 'text-text-secondary hover:bg-white/[0.02] hover:text-text-primary'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {i === selectedIndex ? (
                                  <CheckCircle size={14} className="text-dc-400 shrink-0" />
                                ) : (
                                  <span className="w-3.5 shrink-0" />
                                )}
                                <span className="font-medium">{r.tag_name}</span>
                                {i === 0 && (
                                  <span className="text-[10px] font-semibold uppercase tracking-wider text-dc-400 bg-dc-500/10 px-1.5 py-0.5 rounded">
                                    Latest
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-text-tertiary shrink-0 ml-4">
                                {new Date(r.published_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </span>
                            </button>
                          ))}
                        </div>

                        {/* ───── DOWNLOAD CARDS ───── */}
                        {release && (
                          <div className="px-5 py-5 border-t border-border-subtle">
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

                        {/* Footer links */}
                        <div className="flex items-center gap-4 px-5 py-3 border-t border-border-subtle bg-white/[0.01]">
                          {release?.body && (
                            <button
                              onClick={() => {
                                setShowChangelog(!showChangelog);
                              }}
                              className={`flex items-center gap-1.5 text-xs transition-colors ${
                                showChangelog
                                  ? 'text-dc-300'
                                  : 'text-text-tertiary hover:text-text-secondary'
                              }`}
                            >
                              <FileCode size={12} />
                              {showChangelog ? 'Hide changelog' : 'View changelog'}
                            </button>
                          )}

                          {release && (
                            <a
                              href={release.html_url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1.5 text-xs text-text-tertiary hover:text-text-secondary transition-colors"
                            >
                              <ExternalLink size={12} />
                              View on GitHub
                            </a>
                          )}

                          <a
                            href="https://github.com/Dardcor/Dardcor-Code/releases"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs text-text-tertiary hover:text-text-secondary transition-colors ml-auto"
                          >
                            All releases
                            <ExternalLink size={10} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* ───── CHANGELOG (outside accordion) ───── */}
            {showChangelog && release?.body && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-strong rounded-2xl border border-border-default p-5 md:p-6 mt-5"
              >
                <h2 className="text-base font-semibold text-text-primary mb-4">
                  Dardcor Code {release.tag_name} Changelog
                </h2>
                {changelogSections.length > 0 ? (
                  <div className="space-y-4">
                    {changelogSections.map((section, si) => (
                      <div key={si}>
                        <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-dc-400 shrink-0" />
                          {section.type}
                        </h3>
                        <ul className="space-y-1.5">
                          {section.items.map((item, ii) => (
                            <li
                              key={ii}
                              className="flex items-start gap-2 text-sm text-text-secondary ml-4"
                            >
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

            {/* ───── BACK TO HOME ───── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-12"
            >
              <Link
                to="/"
                className="text-sm text-text-tertiary hover:text-dc-400 transition-colors"
              >
                &larr; Back to home
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
