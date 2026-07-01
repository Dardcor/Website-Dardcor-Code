import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  CheckCircle,
  Star,
  Package,
  Archive,
  Cpu,
  ChevronRight,
  ExternalLink,
  Loader2,
  AlertCircle,
  FileDown,
  Hash,
  Calendar,
} from 'lucide-react';
import Footer from '../components/layout/Footer';

const GITHUB_API = 'https://api.github.com/repos/Dardcor/Dardcor-Code/releases/latest';

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

// ─── SVG Icons ───
const AppleIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);
const WindowsIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.801" />
  </svg>
);
const LinuxIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M14.5 17.5a1 1 0 101 1 1 1 0 00-1-1m-5 0a1 1 0 101 1 1 1 0 00-1-1m.5-14c-1.5 0-2.14.79-2.5 1.5-.36.71-.5 1.5-.5 1.5l-1.5 1s.5 3.17.5 4.5c0 .5.21 1 .5 1.5.29.5.71 1 1.29 1h5c.57 0 1-.5 1.29-1 .29-.5.5-1 .5-1.5 0-1.33.5-4.5.5-4.5l-1.5-1s-.14-.79-.5-1.5c-.36-.71-1-1.5-2.5-1.5M14 3c.42 0 .86.11 1.29.32.43.21.78.53 1 .89.22.36.33.75.33 1.14 0 .39-.11.78-.33 1.14-.22.36-.57.68-1 .89-.43.21-.87.32-1.29.32-.42 0-.86-.11-1.29-.32-.43-.21-.78-.53-1-.89-.22-.36-.33-.75-.33-1.14 0-.39.11-.78.33-1.14.22-.36.57-.68 1-.89C13.14 3.11 13.58 3 14 3m0 1c-.28 0-.53.08-.75.23-.22.15-.37.35-.44.58-.07.23-.07.47 0 .7.07.23.22.43.44.58.22.15.47.23.75.23s.53-.08.75-.23c.22-.15.37-.35.44-.58.07-.23.07-.47 0-.7-.07-.23-.22-.43-.44-.58C14.53 4.08 14.28 4 14 4z" />
  </svg>
);

// ─── Tabs ───
type OSTab = 'macOS' | 'Windows' | 'Linux';

const tabs: { id: OSTab; icon: typeof AppleIcon; label: string; desc: string; gradient: string; iconColor: string; minVersion: string; arch: string }[] = [
  { id: 'macOS', icon: AppleIcon, label: 'macOS', desc: 'Apple Silicon & Intel', gradient: 'from-gray-500/20 to-gray-400/10', iconColor: 'text-gray-300', minVersion: 'macOS 13 Ventura or later', arch: 'arm64, x86_64' },
  { id: 'Windows', icon: WindowsIcon, label: 'Windows', desc: 'x64 & ARM64', gradient: 'from-blue-500/20 to-blue-400/10', iconColor: 'text-blue-400', minVersion: 'Windows 10 / 11 (64-bit)', arch: 'x64, arm64' },
  { id: 'Linux', icon: LinuxIcon, label: 'Linux', desc: 'x86_64', gradient: 'from-amber-500/20 to-amber-400/10', iconColor: 'text-amber-400', minVersion: 'Ubuntu 22.04+ / Fedora 38+', arch: 'x86_64' },
];

function formatBytes(bytes: number): string {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

function filterAssets(assets: ReleaseAsset[], os: OSTab): ReleaseAsset[] {
  const osKey = os === 'macOS' ? 'MacOS' : os === 'Windows' ? 'Windows' : 'Linux';
  return assets.filter((a) => a.name.includes(osKey) && !a.name.endsWith('.blockmap') && !a.name.endsWith('.yml'));
}

function parseReleaseBody(body: string): string[] {
  const lines = body.split('\n').filter((l) => l.trim().startsWith('-') || l.trim().startsWith('*'));
  return lines.map((l) => l.replace(/^[\s*\-]+/, '').trim()).filter(Boolean).slice(0, 15);
}

export default function DownloadPage() {
  const [activeTab, setActiveTab] = useState<OSTab>('macOS');
  const [release, setRelease] = useState<GitHubRelease | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    fetch(GITHUB_API)
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub API responded with ${r.status}`);
        return r.json();
      })
      .then((data: GitHubRelease) => {
        if (!cancelled) {
          setRelease(data);
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

  const ActiveTabIcon = tabs.find((t) => t.id === activeTab)?.icon || AppleIcon;

  // Release features
  const features = release ? parseReleaseBody(release.body) : [];

  return (
    <>
    <section className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-dc-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-dc-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          {/* Version badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass text-sm text-dc-300 mb-5">
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-green-400" />
            )}
            {loading ? 'Checking latest version...' : release ? `${release.tag_name} — Latest Release` : 'Available at no charge'}
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-bold text-text-primary tracking-tight">
            Download <span className="text-gradient">Dardcor Code</span>
          </h1>
          <p className="mt-3 text-lg text-text-secondary max-w-xl mx-auto">
            Pick your platform and start building with autonomous agents.
          </p>

          {/* Version info from GitHub */}
          {release && (
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-text-tertiary">
              <span className="flex items-center gap-1">
                <Hash size={11} />
                {release.tag_name}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                {new Date(release.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <a href={release.html_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-dc-400 hover:text-dc-300 transition-colors">
                <svg width={11} height={11} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                View on GitHub
                <ExternalLink size={10} />
              </a>
            </div>
          )}
        </motion.div>

        {/* Error banner */}
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-3 mb-8 text-sm text-red-400">
            <AlertCircle size={16} />
            Failed to fetch release data: {error}
          </motion.div>
        )}

        {/* ─── Tabs ─── */}
        <div className="mb-8">
          <div className="flex gap-1 p-1 glass-strong rounded-2xl border border-border-subtle w-fit mx-auto">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-dc-600 text-white shadow-lg shadow-dc-600/20'
                      : 'text-text-tertiary hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  <TabIcon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Tab Content ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Left: Download Options */}
              <div className="lg:col-span-3 space-y-5">
                {loading ? (
                  /* Loading skeleton */
                  <div className="glass-strong rounded-2xl border border-border-default p-8 text-center">
                    <Loader2 size={32} className="mx-auto animate-spin text-dc-400 mb-4" />
                    <p className="text-text-secondary text-sm">Fetching latest release from GitHub...</p>
                  </div>
                ) : (
                  <>
                    {/* OS Header */}
                    <div className="glass-strong rounded-2xl border border-border-default p-5 sm:p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${tabs.find(t => t.id === activeTab)?.iconColor}`}>
                          <ActiveTabIcon size={28} />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-text-primary">{activeTab}</h2>
                          <p className="text-xs text-text-tertiary flex items-center gap-1.5 mt-0.5">
                            <Cpu size={11} />
                            {tabs.find(t => t.id === activeTab)?.arch} &middot; {tabs.find(t => t.id === activeTab)?.minVersion}
                          </p>
                        </div>
                      </div>

                      {/* Download Items */}
                      <div className="space-y-3">
                        {(release
                          ? filterAssets(release.assets, activeTab)
                          : []
                        ).map((asset) => {
                          const isDmg = asset.name.endsWith('.dmg');
                          const isExe = asset.name.endsWith('.exe') && !asset.name.includes('Portable');
                          const isAppImage = asset.name.endsWith('.AppImage');
                          const isRecommended = isDmg || isExe || isAppImage;

                          return (
                            <a
                              key={asset.name}
                              href={asset.browser_download_url}
                              target="_blank"
                              rel="noreferrer"
                              className={`block relative rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${
                                isRecommended
                                  ? 'bg-dc-500/10 border border-dc-500/20 hover:bg-dc-500/15 hover:border-dc-500/30'
                                  : 'bg-white/[0.03] border border-transparent hover:bg-white/[0.06]'
                              }`}
                            >
                              <div className="p-4">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-3 min-w-0">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                                      isRecommended ? 'bg-dc-500/15 text-dc-400' : 'bg-white/5 text-text-tertiary'
                                    }`}>
                                      {isRecommended ? <Package size={18} /> : <Archive size={18} />}
                                    </div>
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`text-sm font-medium truncate ${
                                          isRecommended ? 'text-text-primary' : 'text-text-secondary'
                                        }`}>
                                          {asset.name}
                                        </span>
                                        {isRecommended && (
                                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-dc-400 bg-dc-500/10 px-2 py-0.5 rounded-full">
                                            <Star size={9} />
                                            Recommended
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs text-text-tertiary mt-0.5">
                                        {formatBytes(asset.size)}
                                        {isDmg && ' — Drag to Applications folder'}
                                        {isExe && ' — Windows Installer'}
                                        {asset.name.includes('Portable') && ' — No installation required'}
                                        {isAppImage && ' — Universal Linux format (chmod +x)'}
                                        {asset.name.endsWith('.deb') && ' — Debian/Ubuntu package'}
                                        {asset.name.endsWith('.rpm') && ' — Fedora/RHEL package'}
                                        {asset.name.endsWith('.tar.gz') && ' — Extract & run'}
                                      </p>
                                    </div>
                                  </div>
                                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                                    isRecommended
                                      ? 'bg-dc-600 text-white'
                                      : 'bg-white/5 text-text-tertiary hover:bg-white/10'
                                  }`}>
                                    <Download size={15} />
                                  </div>
                                </div>
                              </div>
                            </a>
                          );
                        })}

                        {/* Fallback if no assets loaded */}
                        {(!release || filterAssets(release.assets, activeTab).length === 0) && !loading && (
                          <div className="text-center py-8">
                            <FileDown size={40} className="mx-auto text-text-tertiary/30 mb-3" />
                            <p className="text-text-tertiary text-sm">No download assets found for {activeTab}.</p>
                            <a
                              href="https://github.com/Dardcor/Dardcor-Code/releases"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-dc-400 hover:text-dc-300 text-sm mt-2 transition-colors"
                            >
                              View all releases on GitHub <ExternalLink size={12} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* All Releases Link */}
                    <a
                      href="https://github.com/Dardcor/Dardcor-Code/releases"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 glass hover:bg-white/10 text-text-secondary hover:text-text-primary px-5 py-3 rounded-xl text-sm transition-all border border-border-subtle"
                    >
                      <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                      View all releases on GitHub
                      <ChevronRight size={14} />
                    </a>
                  </>
                )}
              </div>

              {/* Right: Release Features */}
              <div className="lg:col-span-2">
                <div className="glass-strong rounded-2xl border border-border-default p-5 sm:p-6 sticky top-24">
                  <h3 className="text-sm font-semibold text-text-primary mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-dc-400" />
                    {release ? `${release.tag_name} Features` : 'Release Features'}
                  </h3>
                  <p className="text-xs text-text-tertiary mb-4">What is new in this release.</p>

                  {loading ? (
                    <div className="space-y-2">
                      {[1,2,3,4,5].map((i) => (
                        <div key={i} className="h-4 bg-white/5 rounded animate-shimmer" />
                      ))}
                    </div>
                  ) : features.length > 0 ? (
                    <ul className="space-y-2.5">
                      {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                          <CheckCircle size={14} className="text-dc-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-text-tertiary">No feature details available for this release.</p>
                  )}

                  {/* System Requirements */}
                  <div className="mt-6 pt-5 border-t border-border-subtle">
                    <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">System Requirements</h4>
                    <ul className="space-y-1.5 text-xs text-text-tertiary">
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-dc-400/50 mt-1.5 shrink-0" />
                        {tabs.find(t => t.id === activeTab)?.minVersion}
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-dc-400/50 mt-1.5 shrink-0" />
                        Architecture: {tabs.find(t => t.id === activeTab)?.arch}
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-dc-400/50 mt-1.5 shrink-0" />
                        4 GB RAM minimum (8 GB recommended)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-dc-400/50 mt-1.5 shrink-0" />
                        500 MB available disk space
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link to="/" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
            &larr; Back to home
          </Link>
        </motion.div>
      </div>
    </section>
      <Footer />
    </>
  );
}
