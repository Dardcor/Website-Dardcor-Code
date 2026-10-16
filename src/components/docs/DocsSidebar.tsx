import { useDeferredValue, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { docsArticles } from '../../data/docsContent';

interface DocsSidebarProps {
  activePath?: string;
}

export default function DocsSidebar({ activePath }: DocsSidebarProps) {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const visibleArticles = docsArticles.filter((article) =>
    !deferredQuery
    || `${article.title} ${article.summary} ${article.category}`.toLowerCase().includes(deferredQuery),
  );
  const groupedArticles = visibleArticles.reduce<Record<string, typeof visibleArticles>>((groups, article) => {
    (groups[article.category] ??= []).push(article);
    return groups;
  }, {});

  return (
    <aside aria-label="Documentation navigation" className="max-h-[40vh] overflow-y-auto rounded-2xl border border-border-subtle bg-surface-elevated p-4 sm:p-5 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)]">
      <Link to="/docs" className="mb-4 flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-white">
        Dardcor Code docs
      </Link>
      <label className="flex items-center gap-2 rounded-xl border border-border-subtle bg-black/60 px-3 py-2.5 text-text-tertiary focus-within:border-border-focus">
        <Search size={16} aria-hidden="true" />
        <span className="sr-only">Search documentation</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search docs"
          className="min-w-0 w-full bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none"
        />
      </label>
      <nav className="mt-5 space-y-5" aria-label="Documentation topics">
        {Object.entries(groupedArticles).map(([category, articles]) => (
          <section key={category}>
            <h2 className="mb-2 px-2 text-[11px] font-bold uppercase tracking-[0.14em] text-purple-300">{category}</h2>
            <ul className="space-y-1">
              {articles.map((article) => {
                const active = activePath?.toLowerCase() === article.path.toLowerCase();
                return (
                  <li key={article.path}>
                    <Link
                      to={article.path}
                      aria-current={active ? 'page' : undefined}
                      className={`block rounded-lg px-2.5 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400 ${active ? 'bg-purple-500/15 text-white' : 'text-text-secondary hover:bg-white/5 hover:text-white'}`}
                    >
                      {article.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>
      {visibleArticles.length === 0 && (
        <p role="status" className="mt-5 rounded-lg border border-border-subtle p-3 text-sm text-text-secondary">
          No matching pages. Try a shorter search or browse all topics.
        </p>
      )}
      <p className="mt-6 border-t border-border-subtle pt-4 text-xs leading-relaxed text-text-tertiary">
        Guides describe Dardcor Code behavior. Settings and provider features can vary by version and organization policy.
      </p>
    </aside>
  );
}
