import { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  summary: string;
  content: string[];
}

const blogPosts: BlogPost[] = [
  {
    slug: 'announcing-dardcor-code-v1',
    title: 'Announcing Dardcor Code v1.0.0: The Agent-First Desktop IDE',
    date: 'September 12, 2026',
    readTime: '6 min read',
    author: 'Dardcor Engineering Team',
    category: 'Release',
    summary:
      'We are thrilled to announce the general availability of Dardcor Code v1.0.0, a desktop code editor built on the Monaco Editor engine and Electron, equipped with autonomous multi-agent development capabilities.',
    content: [
      'Today marks a significant milestone in developer tooling. Dardcor Code v1.0.0 is officially available for Windows, macOS, and Linux. Built from the ground up to empower developers with autonomous multi-agent workflows, it bridges the world-class editing precision of Visual Studio Code with native agent execution.',
      'Unlike lightweight chat extensions, Dardcor Code treats agents as first-class citizens. The agent runtime has direct access to the integrated PTY terminal (with native PowerShell bypass on Windows), AST-aware plan builders, inline diff review sessions, and subagent orchestration.',
      'All 25 official platform binaries, including Windows x64 setup and MSI, macOS Apple Silicon and Intel DMGs, and Linux .deb, .rpm, and AppImage packages, are now available with cryptographic signatures and automatic updater support.',
    ],
  },
  {
    slug: 'dardcor-router-architecture',
    title: 'Dardcor Router: Modular Multi-Provider Architecture with Zero Egress',
    date: 'September 5, 2026',
    readTime: '8 min read',
    author: 'Dardcor Core Architecture',
    category: 'Architecture',
    summary:
      'A technical deep dive into how Dardcor Router isolates model providers into clean, modular directory structures under ~/.dardcor/provider/ while eliminating telemetry and vendor lock-in.',
    content: [
      'When designing Dardcor Router (running locally on port 25128), our core principle was developer sovereignty. Many modern coding tools tie users to proprietary cloud backends. Dardcor Router flips this paradigm by keeping all credentials, router configurations, and model definitions on your local disk.',
      'The storage architecture organizes each provider (Antigravity, Gemini, OpenAI, Claude, DeepSeek, Grok, Ollama) into its own subfolder under ~/.dardcor/provider/provider/. This modularity guarantees that adding, updating, or wiping a provider configuration never corrupts or leaks data to another.',
      'Combined with automatic schema migration backups, proxy pool routing, and token price overrides, developers gain complete control over their agent expenses and data privacy.',
    ],
  },
  {
    slug: 'terminal-pty-security',
    title: 'Terminal Safety & Sandboxed Tool Execution in Autonomous Development',
    date: 'August 28, 2026',
    readTime: '7 min read',
    author: 'Dardcor Security Team',
    category: 'Security',
    summary:
      'How our integrated terminal engine uses heuristic risk analysis, buffer compaction, and interactive confirmation cards to keep autonomous commands safe and predictable.',
    content: [
      'Autonomous coding agents are only as safe as their terminal execution environment. When an agent has the power to run commands, a hallucinated flag or misconfigured path can have catastrophic consequences.',
      'In Dardcor Code, every command request passes through the chatToolRiskAssessmentService before reaching the PTY layer. Commands evaluated as High Risk (such as destructive deletions, system configuration changes, or disk operations) automatically pause execution and present an interactive "Allow | Skip" card to the developer.',
      'Furthermore, the console compactor intelligently summarizes repetitive compiler warnings and voluminous log outputs, allowing the agent to diagnose test failures without wasting precious token window budget.',
    ],
  },
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    document.title = 'Blog - Dardcor Code';
  }, []);

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
          <div className="text-left mb-12 pb-6 border-b border-purple-900/30">
            <span className="section-eyebrow mb-2">Updates &amp; Engineering</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              The Dardcor Code Blog
            </h1>
            <p className="mt-2 text-[#b3a8c9] text-base">
              Latest releases, architectural insights, agent runtime design, and developer tutorials.
            </p>
          </div>

          {/* If a post is expanded */}
          {selectedPost ? (
            <div className="bg-[#08040e] border border-[#6a1b9a] rounded-2xl p-6 sm:p-12 mb-12">
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="text-xs font-semibold text-purple-300 hover:text-white mb-6 inline-flex items-center gap-1 cursor-pointer"
              >
                &larr; Back to all articles
              </button>

              <div className="flex flex-wrap items-center gap-3 text-xs text-purple-400 font-mono mb-4">
                <span className="px-2.5 py-0.5 rounded bg-purple-950/80 border border-purple-800/40 text-purple-300">
                  {selectedPost.category}
                </span>
                <span>{selectedPost.date}</span>
                <span>&bull;</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                {selectedPost.title}
              </h2>

              <div className="text-xs text-purple-300/80 mb-8 pb-4 border-b border-purple-900/30">
                By {selectedPost.author}
              </div>

              <div className="space-y-5 text-sm sm:text-base text-[#b3a8c9] leading-relaxed">
                {selectedPost.content.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          ) : (
            /* Post Cards List */
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-[#08040e] border border-[#6a1b9a] rounded-2xl p-6 sm:p-8 hover:border-[#8e24aa] transition-all"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs text-purple-400 font-mono mb-3">
                    <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/40 text-purple-300 font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 hover:text-purple-300 transition-colors">
                    <button
                      type="button"
                      onClick={() => setSelectedPost(post)}
                      className="text-left cursor-pointer"
                    >
                      {post.title}
                    </button>
                  </h2>

                  <p className="text-sm sm:text-base text-[#b3a8c9] leading-relaxed mb-6">
                    {post.summary}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-purple-900/30">
                    <span className="text-xs text-purple-300/70 font-mono">
                      By {post.author}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedPost(post)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <span>Read article</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
  );
}
