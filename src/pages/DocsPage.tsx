import { useEffect, useDeferredValue, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Bot, Code2, Globe2, Search, ShieldCheck, Terminal, Workflow } from 'lucide-react';
import { docsArticles, docsCategories } from '../data/docsContent';
import DocsSidebar from '../components/docs/DocsSidebar';

const categoryIcons: Record<string, typeof BookOpen> = {
  'Getting started': BookOpen,
  'Agents & automation': Bot,
  'Dardcor Router': Workflow,
  'Editor & workspace': Code2,
  'Build & debug': Terminal,
  Languages: Code2,
  'Remote development': Globe2,
  'Extensions & APIs': Code2,
  Configuration: Workflow,
  Administration: ShieldCheck,
  Platforms: Globe2,
  Integrations: Workflow,
};

export default function DocsPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  useEffect(() => {
    document.title = 'Documentation - Dardcor Code';
  }, []);

  const results = deferredQuery
    ? docsArticles.filter((article) => `${article.title} ${article.summary} ${article.category}`.toLowerCase().includes(deferredQuery))
    : [];

  return (
    <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="grid items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <DocsSidebar />
        </div>

        <div className="min-w-0 lg:col-span-8">
          <header className="mb-10 border-b border-border-subtle pb-8">
            <span className="section-eyebrow mb-3">Documentation</span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Build with Dardcor Code</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
              Practical guides for the editor, agent permissions, Dardcor Router, extensions, and remote workspaces.
            </p>
            <label className="mt-6 flex max-w-2xl items-center gap-3 rounded-xl border border-border-default bg-surface-elevated px-4 py-3.5 text-text-tertiary focus-within:border-border-focus">
              <Search size={19} aria-hidden="true" />
              <span className="sr-only">Search all documentation</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search permissions, terminal, Router…"
                className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none"
              />
            </label>
          </header>

          {deferredQuery ? (
            <section aria-live="polite" aria-label="Search results">
              <div className="mb-5 flex items-baseline justify-between gap-3">
                <h2 className="text-xl font-semibold text-white">Search results</h2>
                <span className="text-sm text-text-tertiary">{results.length} {results.length === 1 ? 'page' : 'pages'}</span>
              </div>
              {results.length > 0 ? (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {results.map((article) => (
                    <li key={article.path}>
                      <Link to={article.path} className="card-base group flex h-full flex-col p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400">
                        <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">{article.category}</span>
                        <span className="mt-2 text-lg font-semibold text-white">{article.title}</span>
                        <span className="mt-2 flex-1 text-sm leading-6 text-text-secondary">{article.summary}</span>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-purple-300 group-hover:text-white">Read guide <ArrowRight size={15} /></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="rounded-xl border border-border-subtle bg-surface-elevated p-5 text-sm text-text-secondary">
                  No pages match that search. Try a feature name such as “agent”, “terminal”, or “remote”.
                </p>
              )}
            </section>
          ) : (
            <>
              <section className="mb-10 rounded-2xl border border-purple-500/40 bg-gradient-to-br from-purple-950/70 to-surface-elevated p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="max-w-xl">
                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-purple-300">Start here</span>
                    <h2 className="mt-2 text-2xl font-bold text-white">Choose how agents can act</h2>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">Learn what each session access level allows and how to review commands, edits, and browser actions.</p>
                  </div>
                  <Link to="/docs/permissions" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-dc-accent px-4 py-3 text-sm font-semibold text-white hover:bg-dc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                    Read permissions guide <ArrowRight size={16} />
                  </Link>
                </div>
              </section>

              <section aria-labelledby="popular-guides-heading" className="mb-11">
                <h2 id="popular-guides-heading" className="mb-4 text-xl font-semibold text-white">Popular guides</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {['/docs/permissions', '/docs/agent-customization/overview', '/docs/agent-customization/mcp-servers', '/docs/editor/integrated-terminal'].map((path) => {
                    const article = docsArticles.find((item) => item.path === path)!;
                    return (
                      <Link key={article.path} to={article.path} className="card-base group p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400">
                        <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">{article.category}</span>
                        <span className="mt-2 block text-lg font-semibold text-white">{article.title}</span>
                        <span className="mt-2 block text-sm leading-6 text-text-secondary">{article.summary}</span>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-purple-300 group-hover:text-white">Read guide <ArrowRight size={15} /></span>
                      </Link>
                    );
                  })}
                </div>
              </section>

              <section aria-labelledby="topics-heading">
                <h2 id="topics-heading" className="mb-4 text-xl font-semibold text-white">Browse by topic</h2>
                <div className="space-y-7">
                  {docsCategories.map((category) => {
                    const Icon = categoryIcons[category] ?? BookOpen;
                    const articles = docsArticles.filter((article) => article.category === category);
                    return (
                      <section key={category}>
                        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white"><Icon size={16} className="text-purple-300" />{category}</h3>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {articles.map((article) => (
                            <li key={article.path}>
                              <Link to={article.path} className="group flex min-h-12 items-center justify-between gap-3 rounded-lg border border-transparent px-3 py-2 text-sm text-text-secondary hover:border-border-subtle hover:bg-surface-elevated hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400">
                                <span>{article.title}</span><ArrowRight size={15} className="shrink-0 text-text-tertiary group-hover:text-purple-300" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </section>
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
