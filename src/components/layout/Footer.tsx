import { Link } from 'react-router-dom';
import { Mail, ChevronRight } from 'lucide-react';

const GitHubIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const TwitterIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

const footerLinks: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Product',
    links: [
      { name: 'Dardcor Code', href: '/' },
      { name: 'Dardcor CLI', href: '/' },
      { name: 'Dardcor SDK', href: '/' },
      { name: 'Dardcor Manager', href: '/' },
      { name: 'Changelog', href: 'https://github.com/Dardcor/Dardcor-Code/releases', external: true },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '/', external: false },
      { name: 'API Reference', href: '/', external: false },
      { name: 'Tutorials', href: '/', external: false },
      { name: 'FAQ', href: '/', external: false },
      { name: 'Status', href: '/', external: false },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/', external: false },
      { name: 'Blog', href: '/#blog', external: false },
      { name: 'Careers', href: '/', external: false },
      { name: 'Press Kit', href: '/', external: false },
      { name: 'Contact', href: 'mailto:hello@dardcor.dev', external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/', external: false },
      { name: 'Terms of Service', href: '/', external: false },
      { name: 'Cookie Policy', href: '/', external: false },
      { name: 'Security', href: '/', external: false },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border-subtle bg-surface-elevated/30 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img
                src="/dardcor.png"
                alt="Dardcor"
                className="h-7 w-auto rounded"
              />
              <span className="font-serif font-semibold text-text-primary text-base">
                Dardcor <span className="text-dc-400">Code</span>
              </span>
            </Link>
            <p className="text-sm text-text-tertiary leading-relaxed max-w-xs">
              The agent-first development platform. Build the new way.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://github.com/Dardcor"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-tertiary hover:text-dc-400 hover:scale-110 transition-all duration-300"
                aria-label="Dardcor on GitHub"
              >
                <GitHubIcon size={16} />
              </a>
              <a
                href="https://twitter.com/dardcor"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-tertiary hover:text-dc-400 hover:scale-110 transition-all duration-300"
                aria-label="Dardcor on X (Twitter)"
              >
                <TwitterIcon size={16} />
              </a>
              <a
                href="https://youtube.com/@dardcor"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-tertiary hover:text-dc-400 hover:scale-110 transition-all duration-300"
                aria-label="Dardcor on YouTube"
              >
                <YoutubeIcon size={16} />
              </a>
              <a
                href="mailto:hello@dardcor.dev"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-tertiary hover:text-dc-400 hover:scale-110 transition-all duration-300"
                aria-label="Email Dardcor"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links Columns Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="font-serif font-semibold text-text-primary mb-4">{group.title}</h4>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center text-sm text-text-tertiary hover:text-text-secondary transition-all"
                        >
                          <ChevronRight className="w-3.5 h-3.5 mr-1 opacity-0 -ml-4.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                          <span className="transform transition-transform duration-300 group-hover:translate-x-0.5">{link.name}</span>
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="group inline-flex items-center text-sm text-text-tertiary hover:text-text-secondary transition-all"
                        >
                          <ChevronRight className="w-3.5 h-3.5 mr-1 opacity-0 -ml-4.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                          <span className="transform transition-transform duration-300 group-hover:translate-x-0.5">{link.name}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} Dardcor. All rights reserved.
          </p>
          <p className="text-xs text-text-tertiary flex items-center gap-1">
            Made with <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" className="text-red-400 -mt-0.5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> for the developer community
          </p>
        </div>
      </div>
    </footer>
  );
}
