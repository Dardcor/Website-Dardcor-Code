import { motion } from 'framer-motion';
import { Download, ChevronRight, Star, Package, Archive, Cpu } from 'lucide-react';

const BASE_URL = 'https://github.com/Dardcor/Dardcor-Code/releases/download/v1.0.0';

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

interface DownloadOption {
  label: string;
  url: string;
  desc: string;
  icon: typeof Package;
  recommended?: boolean;
}

interface Platform {
  name: string;
  icon: typeof AppleIcon;
  desc: string;
  minVersion: string;
  options: DownloadOption[];
  gradient: string;
  borderHover: string;
  iconColor: string;
}

const platforms: Platform[] = [
  {
    name: 'macOS',
    icon: AppleIcon,
    desc: 'Apple Silicon & Intel',
    minVersion: 'macOS 13 Ventura+',
    gradient: 'from-gray-500/20 to-gray-400/10',
    borderHover: 'hover:border-gray-500/30',
    iconColor: 'text-gray-300',
    options: [
      {
        label: 'Dardcor-Code-MacOS.dmg',
        url: `${BASE_URL}/Dardcor-Code-MacOS.dmg`,
        desc: 'Disk Image — drag to Applications',
        icon: Package,
        recommended: true,
      },
      {
        label: 'Dardcor-Code-MacOS.tar.gz',
        url: `${BASE_URL}/Dardcor-Code-MacOS.tar.gz`,
        desc: 'Archive — extract & run',
        icon: Archive,
      },
    ],
  },
  {
    name: 'Windows',
    icon: WindowsIcon,
    desc: 'x64 & ARM64',
    minVersion: 'Windows 10 / 11',
    gradient: 'from-blue-500/20 to-blue-400/10',
    borderHover: 'hover:border-blue-500/30',
    iconColor: 'text-blue-400',
    options: [
      {
        label: 'Dardcor-Code-Setup-Windows.exe',
        url: `${BASE_URL}/Dardcor-Code-Setup-Windows.exe`,
        desc: 'Installer — recommended for most users',
        icon: Package,
        recommended: true,
      },
      {
        label: 'Dardcor-Code-Windows-Portable.zip',
        url: `${BASE_URL}/Dardcor-Code-Windows-Portable.zip`,
        desc: 'Portable — no installation required',
        icon: Archive,
      },
    ],
  },
  {
    name: 'Linux',
    icon: LinuxIcon,
    desc: 'x86_64',
    minVersion: 'Ubuntu 22.04+ / Fedora 38+',
    gradient: 'from-amber-500/20 to-amber-400/10',
    borderHover: 'hover:border-amber-500/30',
    iconColor: 'text-amber-400',
    options: [
      {
        label: 'Dardcor-Code-Linux-x86_64.AppImage',
        url: `${BASE_URL}/Dardcor-Code-Linux-x86_64.AppImage`,
        desc: 'AppImage — universal Linux format',
        icon: Package,
        recommended: true,
      },
      {
        label: 'Dardcor-Code-Linux-x86_64.deb',
        url: `${BASE_URL}/Dardcor-Code-Linux-x86_64.deb`,
        desc: 'Debian / Ubuntu package',
        icon: Archive,
      },
      {
        label: 'Dardcor-Code-Linux-x86_64.rpm',
        url: `${BASE_URL}/Dardcor-Code-Linux-x86_64.rpm`,
        desc: 'Fedora / RHEL package',
        icon: Archive,
      },
      {
        label: 'Dardcor-Code-Linux-x86_64.tar.gz',
        url: `${BASE_URL}/Dardcor-Code-Linux-x86_64.tar.gz`,
        desc: 'Archive — extract & run',
        icon: Archive,
      },
    ],
  },
];

export default function Downloads() {
  return (
    <section id="download" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-dc-500/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-dc-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass text-sm text-dc-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            Available at no charge
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
            Download{' '}
            <span className="text-gradient">Dardcor Code</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto">
            Available for all major platforms. Start building with agents in minutes.
          </p>
        </motion.div>

        {/* OS Platform Cards */}
        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {platforms.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                <div className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${p.borderHover}`}>
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${p.gradient} opacity-40 group-hover:opacity-60 transition-opacity`} />

                  <div className="relative bg-surface-card/70 backdrop-blur-sm border border-border-subtle group-hover:border-border-default rounded-2xl transition-all duration-300">
                    {/* Card Header */}
                    <div className="p-5 sm:p-6 border-b border-border-subtle">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center ${p.iconColor}`}>
                          <Icon size={26} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-text-primary">{p.name}</h3>
                          <p className="text-xs text-text-tertiary flex items-center gap-1.5 mt-0.5">
                            <Cpu size={11} />
                            {p.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Download Options List */}
                    <div className="p-5 sm:p-6 space-y-3">
                      {p.options.map((opt) => {
                        const OptIcon = opt.icon;
                        return (
                          <a
                            key={opt.label}
                            href={opt.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`block relative rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${
                              opt.recommended
                                ? 'bg-dc-500/10 border border-dc-500/20 hover:bg-dc-500/15 hover:border-dc-500/30'
                                : 'bg-white/[0.03] border border-transparent hover:bg-white/[0.06]'
                            }`}
                          >
                            <div className="p-3.5 sm:p-4">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3 min-w-0">
                                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                                    opt.recommended ? 'bg-dc-500/15 text-dc-400' : 'bg-white/5 text-text-tertiary'
                                  }`}>
                                    <OptIcon size={16} />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className={`text-sm font-medium truncate ${
                                        opt.recommended ? 'text-text-primary' : 'text-text-secondary'
                                      }`}>
                                        {opt.label}
                                      </span>
                                      {opt.recommended && (
                                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-dc-400 bg-dc-500/10 px-2 py-0.5 rounded-full">
                                          <Star size={10} />
                                          Recommended
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-text-tertiary mt-0.5">{opt.desc}</p>
                                  </div>
                                </div>
                                <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                  opt.recommended
                                    ? 'bg-dc-600 text-white'
                                    : 'bg-white/5 text-text-tertiary group-hover:bg-white/10'
                                }`}>
                                  <Download size={14} />
                                </div>
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <div className="glass-strong rounded-2xl border border-border-default p-8 sm:p-10">
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">For individuals</h3>
                <p className="text-sm text-text-secondary mb-4">Free forever with generous rate limits on all models.</p>
                <a
                  href="https://github.com/Dardcor/Dardcor-Code/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-dc-600 hover:bg-dc-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all"
                >
                  <Download size={15} />
                  Download Free
                </a>
              </div>
              <div className="sm:border-l sm:border-border-subtle sm:pl-8">
                <h3 className="text-lg font-semibold text-text-primary mb-2">For organizations</h3>
                <p className="text-sm text-text-secondary mb-4">Team management, SSO, audit logs, and priority support.</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 glass hover:bg-white/10 text-text-primary px-6 py-2.5 rounded-xl text-sm font-medium transition-all"
                >
                  Contact Sales
                  <ChevronRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Release info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-xs text-text-tertiary mt-6"
        >
          v1.0.0 —{' '}
          <a
            href="https://github.com/Dardcor/Dardcor-Code/releases/tag/v1.0.0"
            target="_blank"
            rel="noreferrer"
            className="text-dc-400 hover:text-dc-300 underline underline-offset-2"
          >
            View all release assets on GitHub
          </a>
          <span className="mx-2 opacity-30">|</span>
          <span>{platforms.flatMap(p => p.options).length} download options available</span>
        </motion.p>
      </div>
    </section>
  );
}
