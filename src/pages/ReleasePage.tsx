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
  ArrowLeft,
} from 'lucide-react';
import AnimatedBackground from '../components/ui/AnimatedBackground';
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

  const groups: { label: string; key: string; assets: ReleaseAsset[]; Icon: React.FC<{ className?: string }> }[] = [
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

function DownloadCard({ group }: { group: { label: string; key: string; assets: ReleaseAsset[]; Icon: React.FC<{ className?: string }> } }) {
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
                rel="noreferrer"
                className="flex items-center justify-between gap-3 w-full px-3.5 py-2.5 rounded-xl bg-dc-50/30 hover:bg-dc-50 border border-transparent hover:border-dc-200 transition-all group"
              >
                <div className="min-w-0">
                  <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors block truncate">
                    {label || asset.name}
                  </span>
                  <span className="text-xs text-text-tertiary">{formatBytes(asset.size)}</span>
                </div>
                <Download size={14} className="text-text-tertiary group-hover:text-dc-600 shrink-0 transition-colors" />
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
    return () => { cancelled = true; };
  }, []);

  const release = releases[selectedIndex] || null;
  const osGroups = release ? groupAssetsByOS(release.assets) : [];
  const changelogSections = release?.body ? parseChangelog(release.body) : [];

  return (
    <>
      <AnimatedBackground />
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
                Get the latest version for your platform. Auto-updates enabled by default.
              </p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-8 text-red-600 max-w-2xl mx-auto"
              >
                <AlertCircle size={18} />
                <span className="text-sm font-medium">Could not load release data: {error}</span>
              </motion.div>
            )}

            {loading ? (
              <div className="grid md:grid-cols-3 gap-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="card-base p-6">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border-default">
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
            ) : (
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
                        {new Date(release.published_at).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric',
                        })}
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
                              {new Date(r.published_at).toLocaleDateString('en-US', {
                                month: 'short', day: 'numeric', year: 'numeric',
                              })}
                            </span>
                          </button>
                        ))}
                      </div>

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
                        {release && (
                          <a
                            href={release.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs text-text-tertiary hover:text-text-primary transition-colors"
                          >
                            <ExternalLink size={12} />
                            View on GitHub
                          </a>
                        )}
                        <a
                          href="https://github.com/Dardcor/Dardcor-Code/releases"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs text-text-tertiary hover:text-text-primary transition-colors ml-auto"
                        >
                          All releases
                          <ExternalLink size={10} />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

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
      <Footer />
    </>
  );
}
