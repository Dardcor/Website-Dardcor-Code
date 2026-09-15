import { Link } from 'react-router-dom';
import {
  Bot,
  ArrowRight,
  Terminal,
  GitBranch,
  TestTube,
  ShieldCheck,
  Download,
  Workflow,
} from 'lucide-react';

const agentCapabilities = [
  {
    icon: Workflow,
    title: 'Autonomous AST-Aware Planning',
    desc: 'Agents parse repository symbol graphs and dependency manifests before touching a line of code, proposing structured review plans for your approval.',
  },
  {
    icon: Terminal,
    title: 'Native PTY Terminal Execution',
    desc: 'Agents run build scripts, linters, and commands inside an isolated PTY terminal session with PowerShell bypass on Windows and bash on Unix.',
  },
  {
    icon: ShieldCheck,
    title: 'Interactive Risk Assessment',
    desc: 'Heuristic risk analysis warns of dangerous commands with an interactive "Allow | Skip" confirmation card and network filtering.',
  },
  {
    icon: GitBranch,
    title: 'Autonomous Subagent Delegation',
    desc: 'Divide complex refactoring tasks into isolated subagents that plan, code, and test concurrently across distinct modules.',
  },
  {
    icon: TestTube,
    title: 'Self-Healing Verification Loop',
    desc: 'Agents execute your test suite, capture stack traces via compacted buffers, and iterate on fixes until all checks pass.',
  },
  {
    icon: Bot,
    title: 'Inline Diff Review Sessions',
    desc: 'Review agent modifications directly inside the Monaco editor with side-by-side color-coded diffs and keyboard-driven Accept or Discard controls.',
  },
];

export default function FeaturesAgentsPage() {
  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          {/* Hero */}
          <section className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-eyebrow mb-2">Autonomous Development</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Agents That Build For You
            </h1>
            <p className="text-base sm:text-lg text-[#b3a8c9] leading-relaxed">
              Hand off complex engineering tasks to AI agents that autonomously plan, write code, run terminal commands, and verify changes directly inside your repository.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/download"
                className="inline-flex items-center justify-center gap-2 bg-[#6a1b9a] hover:bg-[#7c4dff] text-white px-7 py-3 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-purple-950/50"
              >
                <Download size={16} />
                <span>Download Dardcor Code</span>
              </Link>
              <Link
                to="/docs"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-purple-200 border border-purple-800/50 hover:border-purple-500 transition-colors"
              >
                <span>Read Agent Docs</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </section>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {agentCapabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="bg-[#08040e] border border-[#6a1b9a] rounded-2xl p-6 hover:border-[#8e24aa] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-300 mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{cap.title}</h3>
                  <p className="text-xs sm:text-sm text-[#b3a8c9] leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Architecture Callout */}
          <div className="bg-[#08040e] border border-[#6a1b9a] rounded-2xl p-6 sm:p-10 text-left">
            <h2 className="text-2xl font-bold text-white mb-3">How the Agent Lifecycle Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-black/60 border border-purple-900/30">
                <span className="text-xs font-mono text-purple-400 font-bold block mb-1">01. INGEST</span>
                <p className="text-xs text-[#b3a8c9]">Reads workspace files, AST symbols, configs, and your .dardcor/instructions.md.</p>
              </div>
              <div className="p-4 rounded-xl bg-black/60 border border-purple-900/30">
                <span className="text-xs font-mono text-purple-400 font-bold block mb-1">02. PLAN</span>
                <p className="text-xs text-[#b3a8c9]">Generates a step-by-step review plan for developer confirmation.</p>
              </div>
              <div className="p-4 rounded-xl bg-black/60 border border-purple-900/30">
                <span className="text-xs font-mono text-purple-400 font-bold block mb-1">03. EXECUTE</span>
                <p className="text-xs text-[#b3a8c9]">Applies file edits and executes verification tests in the sandboxed terminal.</p>
              </div>
              <div className="p-4 rounded-xl bg-black/60 border border-purple-900/30">
                <span className="text-xs font-mono text-purple-400 font-bold block mb-1">04. DIFF &amp; SHIP</span>
                <p className="text-xs text-[#b3a8c9]">Presents side-by-side diff review session with one-click Accept and Git commit.</p>
              </div>
            </div>
          </div>
        </main>
  );
}
