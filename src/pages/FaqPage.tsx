import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ExternalLink } from 'lucide-react';

interface FaqItem {
  question: string;
  category: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    category: 'General',
    question: 'What is Dardcor Code and how does it compare to Visual Studio Code?',
    answer:
      'Dardcor Code is an open source desktop AI code editor built on the Monaco Editor engine and Electron. It preserves the exact keyboard shortcuts, workspace layout, settings schema, and extension ecosystem of Visual Studio Code. What sets it apart is its built-in multi-agent orchestrator, native PTY terminal tools (powershell bypass, compaction, risk analysis), and the local Dardcor Router with zero vendor lock-in.',
  },
  {
    category: 'General',
    question: 'Is Dardcor Code completely free and open source?',
    answer:
      'Yes. Dardcor Code is released under the permissive MIT License. There are no paid tiers, subscription paywalls, or forced cloud accounts. You can inspect the source code, build your own fork, and deploy it across your organization freely.',
  },
  {
    category: 'Privacy & Security',
    question: 'Where is my source code sent during agent sessions?',
    answer:
      'Your source code stays strictly on your local machine. Dardcor Code collects zero telemetry. When running with local LLMs via Ollama or vLLM in Dardcor Router, agent execution is completely air-gapped with no external data transmission. When using cloud models (Claude, OpenAI, Gemini), requests are dispatched directly to the provider endpoint using your own credentials.',
  },
  {
    category: 'Models & Router',
    question: 'What AI models can I use with Dardcor Code?',
    answer:
      'Through Dardcor Router (running locally at http://127.0.0.1:25128), you have access to Claude 3.7 Sonnet (with Thinking mode), GPT-4o, Gemini 2.5 Pro, DeepSeek V3/R1, Grok, and local models hosted via Ollama or vLLM. You can switch models per-prompt, assign different models to different subagents, or configure fallback combos.',
  },
  {
    category: 'Extensions',
    question: 'Can I use my existing VS Code extensions and settings?',
    answer:
      'Yes. Dardcor Code queries the official open extension marketplace. All popular extensions, including Python, C/C++, Jupyter, GitLens, Docker, and Prettier, install with a single click. You can also import existing keybindings and snippets directly.',
  },
  {
    category: 'Platforms',
    question: 'What operating systems are supported?',
    answer:
      'Dardcor Code provides native verified binaries for Windows 10/11 (64-bit .exe setup and .msi installer), macOS 11.0+ (Apple Silicon aarch64 .dmg, Intel x64 .dmg, and Universal .app.tar.gz), and Linux (amd64/arm64 .deb for Debian/Ubuntu, x86_64/aarch64 .rpm for Fedora/RHEL, and standalone .AppImage packages).',
  },
  {
    category: 'Terminal',
    question: 'How does the terminal sandbox protect against accidental damage?',
    answer:
      'Every autonomous command evaluated by the agent passes through the chatToolRiskAssessmentService. Commands categorized as High Risk (such as destructive file removal, format operations, or credential tampering) trigger an interactive "Allow | Skip" confirmation card before execution. Additionally, network domain filtering can restrict outbound socket calls.',
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    document.title = 'Frequently Asked Questions (FAQ) - Dardcor Code';
  }, []);

  const categories = ['All', 'General', 'Privacy & Security', 'Models & Router', 'Extensions', 'Platforms', 'Terminal'];

  const filteredFaqs = filter === 'All' ? faqs : faqs.filter((f) => f.category === filter);

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="section-eyebrow mb-2">Help &amp; Answers</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#b3a8c9] max-w-2xl mx-auto">
              Everything you need to know about Dardcor Code architecture, licensing, local privacy, and extension compatibility.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  filter === cat
                    ? 'bg-[#6a1b9a] text-white'
                    : 'bg-[#08040e] text-[#b3a8c9] border border-purple-900/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="bg-[#08040e] border border-[#6a1b9a] rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-white pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-purple-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base text-[#b3a8c9] leading-relaxed border-t border-purple-900/30 pt-4">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still Have Questions CTA */}
          <div className="mt-14 p-8 rounded-2xl bg-[#08040e] border border-[#6a1b9a] text-center">
            <h3 className="text-xl font-bold text-white mb-2">Have a question not listed here?</h3>
            <p className="text-sm text-[#b3a8c9] max-w-md mx-auto mb-6">
              Check out the official GitHub repository issues or read the documentation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://github.com/Dardcor/Dardcor-Code/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#6a1b9a] hover:bg-[#7c4dff] text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                <span>GitHub Issues</span>
                <ExternalLink size={13} />
              </a>
              <Link
                to="/docs"
                className="inline-flex items-center gap-2 bg-black border border-purple-800/40 hover:border-purple-500 text-purple-200 text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                <span>Documentation</span>
              </Link>
            </div>
          </div>
        </main>
  );
}
