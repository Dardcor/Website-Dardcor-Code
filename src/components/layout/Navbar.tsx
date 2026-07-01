import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Download, MessageSquare, Newspaper, Code2, Terminal, Package, Columns3 } from 'lucide-react';

const products = [
  { name: 'Dardcor Code', desc: 'AI-powered code editor', icon: Code2 },
  { name: 'Dardcor CLI', desc: 'Terminal-native agent', icon: Terminal },
  { name: 'Dardcor SDK', desc: 'Build your own agents', icon: Package },
  { name: 'Dardcor Manager', desc: 'Multi-agent orchestration', icon: Columns3 },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-strong shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/dardcor.png"
              alt="Dardcor"
              className="h-8 w-auto md:h-9 rounded-md transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display font-semibold text-lg text-text-primary tracking-tight">
              Dardcor <span className="text-dc-400">Code</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5">
                Products
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-2 w-64 glass-strong rounded-xl shadow-2xl border border-border-default overflow-hidden"
                  >
                    <div className="p-2">
                      {products.map((p) => (
                        <a
                          key={p.name}
                          href="#"
                          className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <div className="w-9 h-9 rounded-lg bg-dc-500/10 flex items-center justify-center shrink-0">
                            <p.icon size={18} className="text-dc-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-text-primary">{p.name}</div>
                            <div className="text-xs text-text-tertiary mt-0.5">{p.desc}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/download" className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5">
              Download
            </Link>
            <a href="#blog" className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5">
              Blog
            </a>
            <a href="#feedback" className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5">
              Feedback
            </a>

            <div className="ml-4 pl-4 border-l border-border-subtle">
              <Link
                to="/download"
                className="inline-flex items-center gap-2 bg-dc-600 hover:bg-dc-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg shadow-dc-600/20 hover:shadow-dc-500/30"
              >
                <Download size={15} />
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-strong border-t border-border-subtle overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {products.map((p) => (
                <a
                  key={p.name}
                  href="#"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                >
                  <p.icon size={16} className="text-dc-400" />
                  {p.name}
                </a>
              ))}
              <hr className="border-border-subtle my-2" />
              <Link to="/download" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors">
                <Download size={16} /> Download
              </Link>
              <a href="#blog" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors">
                <Newspaper size={16} /> Blog
              </a>
              <a href="#feedback" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors">
                <MessageSquare size={16} /> Feedback
              </a>
              <div className="pt-3">
                <Link
                  to="/download"
                  className="flex items-center justify-center gap-2 bg-dc-600 hover:bg-dc-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all w-full"
                >
                  <Download size={15} />
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
