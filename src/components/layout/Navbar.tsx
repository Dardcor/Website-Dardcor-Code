import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Download,
  Bot,
  Sliders,
  Cpu,
  ShieldCheck,
  Puzzle,
  BookOpen,
  Layers,
  HelpCircle,
  Package,
  Boxes,
  ExternalLink,
} from 'lucide-react';

interface NavDropdownItem {
  name: string;
  desc: string;
  path: string;
  icon: typeof Bot;
  external?: boolean;
}

const featureItems: NavDropdownItem[] = [
  {
    name: 'Agents',
    desc: 'Autonomous coding agents for bug fixes and features',
    path: '/features/agents',
    icon: Bot,
  },
  {
    name: 'Agent Customization',
    desc: 'Define custom rules, instructions, and MCP tools',
    path: '/features/customizations',
    icon: Sliders,
  },
  {
    name: 'Models & Agent Harnesses',
    desc: 'Claude, GPT-4o, Gemini, and local Ollama models',
    path: '/features/models',
    icon: Cpu,
  },
  {
    name: 'Enterprise',
    desc: 'Security, air-gapped readiness, and governance',
    path: '/features/enterprise',
    icon: ShieldCheck,
  },
  {
    name: 'Extensibility',
    desc: 'Build custom plugins, tools, and extensions',
    path: '/features/extensibility',
    icon: Puzzle,
  },
];

const docsItems: NavDropdownItem[] = [
  {
    name: 'Documentation',
    desc: 'Setup guides, configuration, and agent architecture',
    path: '/docs',
    icon: BookOpen,
    external: false,
  },
  {
    name: 'API Reference',
    desc: 'REST API, SDK interfaces, and tool schemas',
    path: '/api',
    icon: Layers,
    external: false,
  },
  {
    name: 'FAQ',
    desc: 'Frequently asked questions and troubleshooting',
    path: '/faq',
    icon: HelpCircle,
    external: false,
  },
];

const resourceItems: NavDropdownItem[] = [
  {
    name: 'Extensions',
    desc: 'Language packs, tools, and themes',
    path: '/features/extensibility',
    icon: Package,
    external: false,
  },
  {
    name: 'MCP Catalog',
    desc: 'Model Context Protocol servers and integrations',
    path: '/mcp',
    icon: Boxes,
    external: false,
  },
];

const directNavLinks = [
  { name: 'Docs', path: '/docs' },
  { name: 'Updates', path: '/updates' },
  { name: 'Blog', path: '/blog' },
  { name: 'Learn', path: '/learn' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'features' | 'docs' | 'resources' | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Top announcement bar */}
      <div className="fixed top-0 inset-x-0 z-50 bg-[#120a2e]/95 border-b border-purple-900/30 text-xs py-2 px-4 text-center text-[#c4b5fd] backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="font-semibold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border border-purple-500/30">
            v1.132
          </span>
          <span className="hidden sm:inline text-purple-200">
            Dardcor Code is now available with autonomous multi-agent orchestration, Monaco engine, and native PTY terminal.
          </span>
          <span className="sm:hidden text-purple-200">
            Dardcor Code v1.132 is live.
          </span>
          <Link
            to="/release"
            className="text-white hover:text-purple-300 underline font-medium inline-flex items-center gap-1"
          >
            Release Notes &rarr;
          </Link>
        </div>
      </div>

      <nav
        className={`fixed top-8 inset-x-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#090514]/90 backdrop-blur-md border-b border-purple-900/30 shadow-lg shadow-purple-950/20'
            : 'bg-[#090514]/60 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
          {/* Brand Logo & Name */}
          <Link
            to="/"
            onClick={closeMobile}
            className="flex items-center gap-2.5 group"
          >
            <img
              src="/dardcor.png"
              alt="Dardcor Code"
              className="h-7 w-auto md:h-8 rounded-md transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display font-semibold text-base text-text-primary tracking-tight whitespace-nowrap">
              Dardcor <span className="text-dc-600">Code</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* Features Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('features')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'features' ? null : 'features')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-colors hover:bg-dc-50/50 ${
                  location.pathname.startsWith('/features') || activeDropdown === 'features'
                    ? 'text-dc-600 font-medium'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                aria-expanded={activeDropdown === 'features'}
              >
                Features
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${activeDropdown === 'features' ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === 'features' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.12 }}
                    className="absolute top-full left-0 mt-2 w-96 bg-surface-card border border-border-default rounded-xl shadow-xl overflow-hidden p-2 z-50"
                  >
                    <div className="space-y-1">
                      {featureItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => {
                            setActiveDropdown(null);
                            closeMobile();
                          }}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-dc-50/50 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-dc-50 flex items-center justify-center shrink-0 text-dc-600 group-hover:bg-dc-600 group-hover:text-white transition-colors">
                            <item.icon size={16} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-text-primary group-hover:text-dc-600 transition-colors">
                              {item.name}
                            </div>
                            <div className="text-xs text-text-tertiary mt-0.5 line-clamp-1">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Docs Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('docs')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'docs' ? null : 'docs')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-colors hover:bg-dc-50/50 ${
                  activeDropdown === 'docs'
                    ? 'text-dc-600 font-medium'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                aria-expanded={activeDropdown === 'docs'}
              >
                Docs
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${activeDropdown === 'docs' ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === 'docs' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.12 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-surface-card border border-border-default rounded-xl shadow-xl overflow-hidden p-2 z-50"
                  >
                    <div className="space-y-1">
                      {docsItems.map((item) => (
                        item.external ? (
                          <a
                            key={item.name}
                            href={item.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              setActiveDropdown(null);
                              closeMobile();
                            }}
                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-dc-50/50 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-dc-50 flex items-center justify-center shrink-0 text-dc-600 group-hover:bg-dc-600 group-hover:text-white transition-colors">
                              <item.icon size={16} />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-text-primary group-hover:text-dc-600 transition-colors flex items-center justify-between">
                                <span>{item.name}</span>
                                <ExternalLink size={12} className="text-text-tertiary" />
                              </div>
                              <div className="text-xs text-text-tertiary mt-0.5 line-clamp-1">
                                {item.desc}
                              </div>
                            </div>
                          </a>
                        ) : (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => {
                              setActiveDropdown(null);
                              closeMobile();
                            }}
                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-dc-50/50 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-dc-50 flex items-center justify-center shrink-0 text-dc-600 group-hover:bg-dc-600 group-hover:text-white transition-colors">
                              <item.icon size={16} />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-text-primary group-hover:text-dc-600 transition-colors">
                                {item.name}
                              </div>
                              <div className="text-xs text-text-tertiary mt-0.5 line-clamp-1">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        )
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct Links: Release Notes, Blog, Learn */}
            {directNavLinks.map((link) => (
              link.path.startsWith('/#') ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={closeMobile}
                  className={`px-3 py-2 text-sm transition-colors rounded-lg hover:bg-dc-50/50 ${
                    location.hash === link.path.slice(1)
                      ? 'text-dc-600 font-medium'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMobile}
                  className={`px-3 py-2 text-sm transition-colors rounded-lg hover:bg-dc-50/50 ${
                    location.pathname === link.path
                      ? 'text-dc-600 font-medium'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-colors hover:bg-dc-50/50 ${
                  activeDropdown === 'resources'
                    ? 'text-dc-600 font-medium'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                aria-expanded={activeDropdown === 'resources'}
              >
                Resources
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === 'resources' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.12 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-surface-card border border-border-default rounded-xl shadow-xl overflow-hidden p-2 z-50"
                  >
                    <div className="space-y-1">
                      {resourceItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => {
                            setActiveDropdown(null);
                            closeMobile();
                          }}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-dc-50/50 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-dc-50 flex items-center justify-center shrink-0 text-dc-600 group-hover:bg-dc-600 group-hover:text-white transition-colors">
                            <item.icon size={16} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-text-primary group-hover:text-dc-600 transition-colors">
                              {item.name}
                            </div>
                            <div className="text-xs text-text-tertiary mt-0.5 line-clamp-1">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Download CTA Button */}
            <div className="ml-3 pl-2">
              <Link
                to="/download"
                onClick={closeMobile}
                className="inline-flex items-center gap-2 bg-dc-600 hover:bg-dc-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md shadow-dc-600/20 hover:shadow-dc-500/30 active:scale-[0.97]"
              >
                <Download size={14} />
                Download
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-dc-50/50 transition-colors"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-surface-card/95 backdrop-blur-xl border-b border-border-default overflow-hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="px-4 py-3 space-y-4">
              {/* Mobile: Features */}
              <div>
                <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                  Features
                </div>
                <div className="mt-1 space-y-0.5">
                  {featureItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={closeMobile}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-dc-50/50 transition-colors"
                    >
                      <item.icon size={16} className="text-dc-600 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile: Docs */}
              <div>
                <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                  Docs
                </div>
                <div className="mt-1 space-y-0.5">
                  {docsItems.map((item) => (
                    item.external ? (
                      <a
                        key={item.name}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMobile}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-dc-50/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon size={16} className="text-dc-600 shrink-0" />
                          <span>{item.name}</span>
                        </div>
                        <ExternalLink size={12} className="text-text-tertiary" />
                      </a>
                    ) : (
                      <a
                        key={item.name}
                        href={item.path}
                        onClick={closeMobile}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-dc-50/50 transition-colors"
                      >
                        <item.icon size={16} className="text-dc-600 shrink-0" />
                        <span>{item.name}</span>
                      </a>
                    )
                  ))}
                </div>
              </div>

              {/* Mobile: Resources */}
              <div>
                <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                  Resources
                </div>
                <div className="mt-1 space-y-0.5">
                  {resourceItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={closeMobile}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-dc-50/50 transition-colors"
                    >
                      <item.icon size={16} className="text-dc-600 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile: Direct Links */}
              <div>
                <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                  Navigation
                </div>
                <div className="mt-1 space-y-0.5">
                  {directNavLinks.map((link) => (
                    link.path.startsWith('/#') ? (
                      <a
                        key={link.name}
                        href={link.path}
                        onClick={closeMobile}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-dc-50/50 transition-colors"
                      >
                        <span>{link.name}</span>
                      </a>
                    ) : (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={closeMobile}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-dc-50/50 transition-colors"
                      >
                        <span>{link.name}</span>
                      </Link>
                    )
                  ))}
                </div>
              </div>

              {/* Mobile: Download CTA */}
              <div className="pt-2 pb-1">
                <Link
                  to="/download"
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-2 bg-dc-600 hover:bg-dc-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all w-full shadow-md shadow-dc-600/20"
                >
                  <Download size={14} />
                  Download
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </>
  );
}
