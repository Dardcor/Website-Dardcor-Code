import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import DocsSidebar from '../components/docs/DocsSidebar';
import { createFallbackArticle, docsArticles, findDocsArticle } from '../data/docsContent';

function anchorId(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const legacyAnchorTargets: Record<string, string> = {
  'security-risks-to-be-aware-of': 'review-the-action-before-approving',
  'lm.tools': 'target-the-shipped-api',
  'manual-installation-install': 'manual-setup',
  'terminal-accessibility': 'terminal-accessibility',
  'screen-readers': 'screen-readers',
  'add-an-mcp-server': 'add-a-server',
  'defining-a-problem-matcher': 'match-diagnostics',
  'snippet-syntax': 'write-snippet-bodies',
  'use-a-githubdardcorinstructionsmd-file': 'project-instruction-files',
  'architecture-and-extension-kinds': 'select-an-extension-host',
  'handling-dependencies-with-remote-extensions': 'handle-missing-dependencies',
  'find-and-replace': 'search-and-replace',
  'multicursor-modifier': 'multiple-cursors',
  'save-auto-save': 'save-behavior',
  'advanced-search-options': 'search-and-replace',
  'code-action': 'apply-code-actions',
  'complex-bash-promptcommand': 'diagnose-launch-problems',
  'syncing-stable-versus-insiders': 'sign-in-and-privacy',
  'extension-pricing-label': 'release-deliberately',
  'when-clause': 'describe-task-types',
};

export default function DocsArticlePage() {
  const location = useLocation();
  const article = findDocsArticle(location.pathname) ?? createFallbackArticle(location.pathname);
  const relatedArticles = docsArticles
    .filter((candidate) => candidate.category === article.category && candidate.path !== article.path)
    .slice(0, 4);

  useEffect(() => {
    document.title = `${article.title} - Dardcor Code Documentation`;
    if (location.hash) {
      let fragment = location.hash.slice(1);
      try {
        fragment = decodeURIComponent(fragment);
      } catch {
        // Keep the fragment as provided when a copied URL contains an invalid escape sequence.
      }
      fragment = fragment.replace(/^_/, '');
      requestAnimationFrame(() => {
        const target = document.getElementById(fragment) ?? document.getElementById(legacyAnchorTargets[fragment.toLowerCase()] ?? '');
        target?.scrollIntoView({ block: 'start' });
      });
    }
  }, [article.title, location.hash]);

  return (
    <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="grid items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <DocsSidebar activePath={article.path} />
        </div>

        <article className="min-w-0 lg:col-span-8">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-text-tertiary">
            <Link to="/docs" className="inline-flex items-center gap-1.5 hover:text-white"><BookOpen size={15} /> Documentation</Link>
            <span aria-hidden="true">/</span>
            <span className="text-purple-300">{article.category}</span>
          </nav>

          <header className="mb-8 border-b border-border-subtle pb-8">
            <p className="section-eyebrow mb-3">{article.category}</p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{article.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">{article.summary}</p>
          </header>

          <div className="space-y-5">
            {article.sections.map((content, index) => (
              <section id={anchorId(content.heading)} key={`${content.heading}-${index}`} className="scroll-mt-28 rounded-2xl border border-border-subtle bg-surface-elevated p-5 sm:p-7">
                <h2 className="text-xl font-semibold text-white">{content.heading}</h2>
                <p className="mt-3 text-sm leading-7 text-text-secondary sm:text-base">{content.body}</p>
                {content.bullets && (
                  <ul className="mt-4 space-y-2.5">
                    {content.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-6 text-text-secondary sm:text-base">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {content.code && (
                  <pre className="mt-5 overflow-x-auto rounded-xl border border-border-subtle bg-black p-4 text-sm leading-6 text-purple-200"><code>{content.code}</code></pre>
                )}
              </section>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/docs" className="inline-flex items-center gap-2 text-sm font-medium text-purple-300 hover:text-white"><ArrowLeft size={16} /> All documentation</Link>
            <Link to="/download" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-white">Get Dardcor Code <ArrowRight size={16} /></Link>
          </div>

          {relatedArticles.length > 0 && (
            <section aria-labelledby="related-guides" className="mt-10">
              <h2 id="related-guides" className="mb-4 text-lg font-semibold text-white">Related guides</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {relatedArticles.map((related) => (
                  <li key={related.path}>
                    <Link to={related.path} className="card-base group block p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400">
                      <span className="font-medium text-white">{related.title}</span>
                      <span className="mt-1 block text-sm leading-5 text-text-secondary">{related.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </div>
    </main>
  );
}
