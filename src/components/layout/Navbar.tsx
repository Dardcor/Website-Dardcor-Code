import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Download, Code2, Terminal, Package, Columns3 } from 'lucide-react';

const products = [
  { name: 'Dardcor Code', desc: 'AI-powered editor with autonomous agents', icon: Code2 },
  { name: 'Dardcor CLI', desc: 'Terminal-native agent', icon: Terminal },
  { name: 'Dardcor SDK', desc: 'Build custom agents', icon: Package },
  { name: 'Dardcor Manager', desc: 'Multi-agent orchestration', icon: Columns3 },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const location = useLocation();

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link to="/" onClick={closeMobile} className="flex items-center gap-3 group">
            <img
              src="/dardcor.png"
              alt="Dardcor"
              className="h-7 w-auto md:h-8 rounded-md transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display font-semibold text-base text-text-primary tracking-tight">
              Dardcor <span className="text-dc-600">Code</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-dc-50/50">
                Products
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.12 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-surface-card border border-border-default rounded-xl shadow-xl overflow-hidden"
                  >
                    <div className="p-1.5">
                      {products.map((p) => (
                        <Link
                          key={p.name}
                          to="/"
                          onClick={closeMobile}
                          className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-dc-50/50 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-dc-50 flex items-center justify-center shrink-0">
                            <p.icon size={16} className="text-dc-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-text-primary">{p.name}</div>
                            <div className="text-xs text-text-tertiary mt-0.5">{p.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {[
              { label: 'Releases', path: '/release' },
              { label: 'Blog', path: '/#blog' },
              { label: 'Feedback', path: '/#feedback' },
            ].map((link) => (
              link.path.startsWith('/#') ? (
                <a
                  key={link.label}
                  href={link.path}
                  onClick={closeMobile}
                  className={`px-3.5 py-2 text-sm transition-colors rounded-lg hover:bg-dc-50/50 ${
                    location.hash === link.path.slice(1)
                      ? 'text-dc-600'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={closeMobile}
                  className={`px-3.5 py-2 text-sm transition-colors rounded-lg hover:bg-dc-50/50 ${
                    location.pathname === link.path
                      ? 'text-dc-600'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}

            <div className="ml-3 pl-3">
              <Link
                to="/release"
                onClick={closeMobile}
                className="inline-flex items-center gap-2 bg-dc-600 hover:bg-dc-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-dc-600/15 hover:shadow-dc-500/25 active:scale-[0.97]"
              >
                <Download size={14} />
                Download
              </Link>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-dc-50/50 transition-colors"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-surface-card/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-3 space-y-0.5">
              {products.map((p) => (
                <Link
                  key={p.name}
                  to="/"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-dc-50/50 transition-colors"
                >
                  <p.icon size={16} className="text-dc-600" />
                  {p.name}
                </Link>
              ))}
              <hr className="border-border-default my-2" />
              <Link
                to="/release"
                onClick={closeMobile}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-dc-50/50 transition-colors"
              >
                <Download size={16} /> Releases
              </Link>
              <a
                href="/#blog"
                onClick={closeMobile}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-dc-50/50 transition-colors"
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg> Blog
              </a>
              <a
                href="/#feedback"
                onClick={closeMobile}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-dc-50/50 transition-colors"
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Feedback
              </a>
              <div className="pt-3">
                <Link
                  to="/release"
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-2 bg-dc-600 hover:bg-dc-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all w-full"
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
  );
}
