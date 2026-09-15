import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Cpu,
  Monitor,
  HardDrive,
  Terminal,
} from 'lucide-react';

interface DownloadItem {
  title: string;
  filename: string;
  arch: string;
  type: string;
  size: string;
  url: string;
  sigUrl: string;
}

const GITHUB_BASE = 'https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0';

const windowsDownloads: DownloadItem[] = [
  {
    title: 'User Installer (Recommended)',
    filename: 'Dardcor-Code_1.0.0_x64-setup.exe',
    arch: 'x64 (64-bit)',
    type: 'Setup Executable (.exe)',
    size: '242 MB',
    url: `${GITHUB_BASE}/Dardcor-Code_1.0.0_x64-setup.exe`,
    sigUrl: `${GITHUB_BASE}/Dardcor-Code_1.0.0_x64-setup.exe.sig`,
  },
  {
    title: 'Windows System Installer',
    filename: 'Dardcor-Code_1.0.0_x64_en-US.msi',
    arch: 'x64 (64-bit)',
    type: 'Windows Installer Package (.msi)',
    size: '242 MB',
    url: `${GITHUB_BASE}/Dardcor-Code_1.0.0_x64_en-US.msi`,
    sigUrl: `${GITHUB_BASE}/Dardcor-Code_1.0.0_x64_en-US.msi.sig`,
  },
];

const macDownloads: DownloadItem[] = [
  {
    title: 'Apple Silicon (M1, M2, M3, M4)',
    filename: 'Dardcor-Code_1.0.0_aarch64.dmg',
    arch: 'ARM64 (aarch64)',
    type: 'Apple Disk Image (.dmg)',
    size: '340 MB',
    url: `${GITHUB_BASE}/Dardcor-Code_1.0.0_aarch64.dmg`,
    sigUrl: `${GITHUB_BASE}/Dardcor-Code_1.0.0_aarch64.dmg`,
  },
  {
    title: 'Intel Macs',
    filename: 'Dardcor-Code_1.0.0_x64.dmg',
    arch: 'x64 (Intel Core)',
    type: 'Apple Disk Image (.dmg)',
    size: '340 MB',
    url: `${GITHUB_BASE}/Dardcor-Code_1.0.0_x64.dmg`,
    sigUrl: `${GITHUB_BASE}/Dardcor-Code_1.0.0_x64.dmg`,
  },
  {
    title: 'Universal Bundle',
    filename: 'Dardcor-Code_universal.app.tar.gz',
    arch: 'Universal (ARM64 + x64)',
    type: 'Tarball Archive (.app.tar.gz)',
    size: '340 MB',
    url: `${GITHUB_BASE}/Dardcor-Code_universal.app.tar.gz`,
    sigUrl: `${GITHUB_BASE}/Dardcor-Code_universal.app.tar.gz.sig`,
  },
];

const linuxDownloads: DownloadItem[] = [
  {
    title: 'Debian, Ubuntu, Mint (x64)',
    filename: 'Dardcor-Code_1.0.0_amd64.deb',
    arch: 'x64 (amd64)',
    type: 'Debian Package (.deb)',
    size: '340 MB',
    url: `${GITHUB_BASE}/Dardcor-Code_1.0.0_amd64.deb`,
    sigUrl: `${GITHUB_BASE}/Dardcor-Code_1.0.0_amd64.deb.sig`,
  },
  {
    title: 'Debian, Ubuntu (ARM64)',
    filename: 'Dardcor-Code_1.0.0_arm64.deb',
    arch: 'ARM64 (arm64)',
    type: 'Debian Package (.deb)',
    size: '340 MB',
    url: `${GITHUB_BASE}/Dardcor-Code_1.0.0_arm64.deb`,
    sigUrl: `${GITHUB_BASE}/Dardcor-Code_1.0.0_arm64.deb.sig`,
  },
  {
    title: 'Red Hat, Fedora, openSUSE (x64)',
    filename: 'Dardcor-Code-1.0.0-1.x86_64.rpm',
    arch: 'x64 (x86_64)',
    type: 'RPM Package (.rpm)',
    size: '294 MB',
    url: `${GITHUB_BASE}/Dardcor-Code-1.0.0-1.x86_64.rpm`,
    sigUrl: `${GITHUB_BASE}/Dardcor-Code-1.0.0-1.x86_64.rpm.sig`,
  },
  {
    title: 'Red Hat, Fedora (ARM64)',
    filename: 'Dardcor-Code-1.0.0-1.aarch64.rpm',
    arch: 'ARM64 (aarch64)',
    type: 'RPM Package (.rpm)',
    size: '340 MB',
    url: `${GITHUB_BASE}/Dardcor-Code-1.0.0-1.aarch64.rpm`,
    sigUrl: `${GITHUB_BASE}/Dardcor-Code-1.0.0-1.aarch64.rpm.sig`,
  },
  {
    title: 'Universal Linux (AppImage x64)',
    filename: 'Dardcor-Code_1.0.0_amd64.AppImage',
    arch: 'x64',
    type: 'Standalone AppImage',
    size: '340 MB',
    url: `${GITHUB_BASE}/Dardcor-Code_1.0.0_amd64.AppImage`,
    sigUrl: `${GITHUB_BASE}/Dardcor-Code_1.0.0_amd64.AppImage.sig`,
  },
  {
    title: 'Universal Linux (AppImage ARM64)',
    filename: 'Dardcor-Code_1.0.0_aarch64.AppImage',
    arch: 'ARM64',
    type: 'Standalone AppImage',
    size: '340 MB',
    url: `${GITHUB_BASE}/Dardcor-Code_1.0.0_aarch64.AppImage`,
    sigUrl: `${GITHUB_BASE}/Dardcor-Code_1.0.0_aarch64.AppImage.sig`,
  },
];

const getInitialOS = (): 'windows' | 'macos' | 'linux' => {
  if (typeof window === 'undefined') return 'windows';
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('mac')) return 'macos';
  if (ua.includes('linux')) return 'linux';
  return 'windows';
};

export default function DownloadPage() {
  const [selectedOS, setSelectedOS] = useState<'windows' | 'macos' | 'linux'>(getInitialOS);

  useEffect(() => {
    document.title = 'Download Dardcor Code - Mac, Linux, Windows';
  }, []);

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-eyebrow mb-3">Release v1.0.0</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
              Download Dardcor Code
            </h1>
            <p className="text-lg text-[#b3a8c9] leading-relaxed">
              Free, open source, and built for multi-agent software development. Integrated Git, Monaco editor, PTY terminal, and native language servers.
            </p>
          </div>

          {/* Three Primary OS Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Windows Card */}
            <div
              onClick={() => setSelectedOS('windows')}
              className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                selectedOS === 'windows'
                  ? 'bg-[#0e0719] border-[#7c4dff] shadow-2xl shadow-purple-950/50 ring-1 ring-[#7c4dff]'
                  : 'bg-[#08040e] border-[#6a1b9a] hover:border-[#8e24aa]'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-300 mb-6">
                  <Monitor size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Windows</h2>
                <p className="text-xs text-purple-300/80 mb-6 font-mono">Windows 10, 11 (64-bit)</p>
                <div className="space-y-3">
                  {windowsDownloads.map((item) => (
                    <a
                      key={item.filename}
                      href={item.url}
                      className="block p-3 rounded-lg bg-black/60 border border-purple-900/40 hover:border-purple-500/60 transition-colors group"
                    >
                      <div className="flex items-center justify-between text-sm font-semibold text-purple-100 group-hover:text-purple-300">
                        <span>{item.title}</span>
                        <Download size={14} className="text-purple-400 group-hover:text-purple-200" />
                      </div>
                      <div className="text-xs text-purple-300/60 mt-1 flex items-center justify-between font-mono">
                        <span>{item.type}</span>
                        <span>{item.size}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-purple-900/30 text-xs text-purple-300/70 flex items-center justify-between">
                <span>SHA-256 verified</span>
                <Link to="/release" className="text-purple-300 hover:text-white underline">
                  All binaries &rarr;
                </Link>
              </div>
            </div>

            {/* macOS Card */}
            <div
              onClick={() => setSelectedOS('macos')}
              className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                selectedOS === 'macos'
                  ? 'bg-[#0e0719] border-[#7c4dff] shadow-2xl shadow-purple-950/50 ring-1 ring-[#7c4dff]'
                  : 'bg-[#08040e] border-[#6a1b9a] hover:border-[#8e24aa]'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-300 mb-6">
                  <HardDrive size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">macOS</h2>
                <p className="text-xs text-purple-300/80 mb-6 font-mono">macOS 11.0 Big Sur or later</p>
                <div className="space-y-3">
                  {macDownloads.map((item) => (
                    <a
                      key={item.filename}
                      href={item.url}
                      className="block p-3 rounded-lg bg-black/60 border border-purple-900/40 hover:border-purple-500/60 transition-colors group"
                    >
                      <div className="flex items-center justify-between text-sm font-semibold text-purple-100 group-hover:text-purple-300">
                        <span>{item.title}</span>
                        <Download size={14} className="text-purple-400 group-hover:text-purple-200" />
                      </div>
                      <div className="text-xs text-purple-300/60 mt-1 flex items-center justify-between font-mono">
                        <span>{item.type}</span>
                        <span>{item.size}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-purple-900/30 text-xs text-purple-300/70 flex items-center justify-between">
                <span>Apple Notarized</span>
                <Link to="/release" className="text-purple-300 hover:text-white underline">
                  All binaries &rarr;
                </Link>
              </div>
            </div>

            {/* Linux Card */}
            <div
              onClick={() => setSelectedOS('linux')}
              className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                selectedOS === 'linux'
                  ? 'bg-[#0e0719] border-[#7c4dff] shadow-2xl shadow-purple-950/50 ring-1 ring-[#7c4dff]'
                  : 'bg-[#08040e] border-[#6a1b9a] hover:border-[#8e24aa]'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-300 mb-6">
                  <Terminal size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Linux</h2>
                <p className="text-xs text-purple-300/80 mb-6 font-mono">glibc 2.28+ (Debian, Ubuntu, Fedora, Arch)</p>
                <div className="space-y-3">
                  {linuxDownloads.slice(0, 3).map((item) => (
                    <a
                      key={item.filename}
                      href={item.url}
                      className="block p-3 rounded-lg bg-black/60 border border-purple-900/40 hover:border-purple-500/60 transition-colors group"
                    >
                      <div className="flex items-center justify-between text-sm font-semibold text-purple-100 group-hover:text-purple-300">
                        <span>{item.title}</span>
                        <Download size={14} className="text-purple-400 group-hover:text-purple-200" />
                      </div>
                      <div className="text-xs text-purple-300/60 mt-1 flex items-center justify-between font-mono">
                        <span>{item.type}</span>
                        <span>{item.size}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-purple-900/30 text-xs text-purple-300/70 flex items-center justify-between">
                <span>GPG signed (.sig)</span>
                <Link to="/release" className="text-purple-300 hover:text-white underline">
                  View all 6 Linux packages &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Application Interface Live Preview */}
          <div className="rounded-2xl overflow-hidden border border-[#6a1b9a] bg-[#08040e] mb-16 shadow-2xl shadow-purple-950/40">
            <div className="flex items-center justify-between px-4 py-3 bg-[#0d0720] border-b border-purple-900/40">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="ml-3 text-xs font-mono text-purple-300/80 hidden sm:inline">
                  Dardcor Code - Native Editor &amp; AI Chat Interface
                </span>
              </div>
              <span className="text-[11px] font-mono text-purple-300 bg-purple-950/80 px-2.5 py-0.5 rounded border border-purple-800/40">
                Official Release v1.0.0
              </span>
            </div>
            <div className="relative bg-black">
              <img
                src="/showcase.png"
                alt="Dardcor Code Native Editor Application Interface"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>

          {/* System Requirements Section */}
          <div className="bg-[#08040e] border border-[#6a1b9a] rounded-2xl p-6 sm:p-10 mb-16">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Cpu className="text-purple-400" size={20} />
              <span>System Requirements</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="p-4 rounded-xl bg-black/50 border border-purple-900/30">
                <h4 className="font-semibold text-white mb-2">Hardware</h4>
                <ul className="space-y-1.5 text-xs text-[#b3a8c9]">
                  <li>1.8 GHz or faster processor (Dual-core or higher)</li>
                  <li>4 GB RAM (8 GB recommended for multi-agent workflows)</li>
                  <li>1.5 GB disk space for installation</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-purple-900/30">
                <h4 className="font-semibold text-white mb-2">Operating System</h4>
                <ul className="space-y-1.5 text-xs text-[#b3a8c9]">
                  <li>Windows 10, 11 (64-bit x64 or ARM64)</li>
                  <li>macOS 11.0 Big Sur or later (Apple Silicon or Intel)</li>
                  <li>Linux Ubuntu 20.04+, Debian 10+, Fedora 36+</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-purple-900/30">
                <h4 className="font-semibold text-white mb-2">Agent &amp; LLM Prerequisites</h4>
                <ul className="space-y-1.5 text-xs text-[#b3a8c9]">
                  <li>Dardcor Router running locally or direct API key</li>
                  <li>Git 2.25+ installed for autonomous source control</li>
                  <li>Node.js 18+ for local MCP tool server execution</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
  );
}
