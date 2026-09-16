import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Download, ChevronDown, Copy, Check, FileCode, CheckCircle2, Play } from 'lucide-react';

interface CodeSnippet {
  filename: string;
  language: string;
  status: string;
  code: string[];
}

const snippets: CodeSnippet[] = [
  {
    filename: 'MailList.tsx',
    language: 'Solid / TS',
    status: 'Agent inline refactor',
    code: [
      'import { For, Show, createMemo, createSignal, onMount } from "solid-js";',
      'import { useMail } from "./mail";',
      'import { Item } from "./Item";',
      '',
      'export function MailList() {',
      '  const { items, query, load } = useMail();',
      '  const [focus, setFocus] = createSignal(0);',
      '  const [top, setTop] = createSignal(0);',
      '',
      '  const visible = createMemo(() => {',
      '    const q = query().toLowerCase();',
      '    return items()',
      '      .filter((m) => m.subject.toLowerCase().includes(q))',
      '      .slice(top(), top() + 24);',
      '  });',
      '',
      '  onMount(() => load());',
      '',
      '  return (',
      '    <Show when={visible().length} fallback={<Empty />}>',
      '      <For each={visible()}>',
      '        {(m, i) => <Item mail={m} active={i() === focus()} />}',
      '      </For>',
      '    </Show>',
      '  );',
      '}',
    ],
  },
  {
    filename: 'batch.go',
    language: 'Go',
    status: 'Parallel task fan-out',
    code: [
      'package http',
      '',
      'import (',
      '    "context"',
      '    "net/http"',
      '    "time"',
      '    "golang.org/x/sync/errgroup"',
      '    "golang.org/x/sync/semaphore"',
      ')',
      '',
      'func (s *Server) handleBatch(w http.ResponseWriter, r *http.Request) {',
      '    ctx, cancel := context.WithTimeout(r.Context(), 30*time.Second)',
      '    defer cancel()',
      '',
      '    sem := semaphore.NewWeighted(8)',
      '    g, gctx := errgroup.WithContext(ctx)',
      '',
      '    for _, fh := range files {',
      '        g.Go(func() error {',
      '            if err := sem.Acquire(gctx, 1); err != nil { return err }',
      '            defer sem.Release(1)',
      '            return process(gctx, s, fh)',
      '        })',
      '    }',
      '    _ = g.Wait()',
      '}',
    ],
  },
  {
    filename: 'agent_graph.py',
    language: 'Python',
    status: 'Autonomous supervisor',
    code: [
      'import asyncio',
      'from dardcor.runtime import AgentSupervisor, TaskPlan',
      '',
      'async def run_autonomous_pipeline(repo_path: str):',
      '    supervisor = AgentSupervisor(root=repo_path)',
      '    plan = await supervisor.create_plan(',
      '        goal="Implement strict CSP headers and verify build suite"',
      '    )',
      '',
      '    # Run planner, coder, and test runner agents in parallel',
      '    results = await supervisor.execute_parallel(plan.steps)',
      '    assert results.all_passed(), "Build verification failed"',
      '    return supervisor.commit_and_create_pr(title="feat: Security hardening")',
      '',
      'if __name__ == "__main__":',
      '    asyncio.run(run_autonomous_pipeline("."))',
    ],
  },
];

const containerAnim: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemAnim: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadDropdown, setDownloadDropdown] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % snippets.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSnippet = snippets[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle deep purple atmospheric glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-gradient-radial from-purple-900/25 via-purple-950/10 to-transparent pointer-events-none rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          variants={containerAnim}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-14"
        >
          {/* Left Column: Headlines, CTAs, Secondary links */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Version badge */}
            <motion.div
              variants={itemAnim}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-800/40 text-xs text-purple-200 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="font-semibold text-purple-300">v1.0.0</span>
              <span className="text-purple-400/60">•</span>
              <span>Open Source Multi-Agent IDE</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemAnim}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]"
            >
              Your home for multi-agent development
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemAnim}
              className="mt-6 text-base sm:text-lg text-[#a79fc2] max-w-xl leading-relaxed"
            >
              Dardcor Code is a free, open source AI code editor. Build with AI agents that plan, code, and debug for you. Manage multi-agent workflows across environments on Linux, macOS, and Windows.
            </motion.p>

            {/* Primary Download CTA with Dropdown */}
            <motion.div
              variants={itemAnim}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto relative"
            >
              <div className="inline-flex rounded-lg shadow-xl shadow-purple-950/50">
                <Link
                  to="/download"
                  className="inline-flex items-center justify-center gap-2.5 bg-dc-600 hover:bg-dc-500 text-white font-semibold px-6 py-3.5 rounded-l-lg text-base transition-colors"
                >
                  <Download size={18} />
                  <span>Download Dardcor Code</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setDownloadDropdown(!downloadDropdown)}
                  className="bg-dc-700 hover:bg-dc-600 text-white px-3 rounded-r-lg border-l border-purple-800/50 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Select Operating System"
                  aria-expanded={downloadDropdown}
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* OS Dropdown Menu */}
              {downloadDropdown && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-[#160f33] border border-purple-800/50 rounded-xl shadow-2xl p-2 z-50">
                  <div className="text-[11px] font-semibold text-purple-300 uppercase px-3 py-1.5 tracking-wider">
                    Direct Downloads (v1.0.0)
                  </div>
                  <a
                    href="https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_x64-setup.exe"
                    onClick={() => setDownloadDropdown(false)}
                    className="flex items-center justify-between px-3 py-2 text-sm text-purple-100 hover:bg-purple-900/40 rounded-lg transition-colors"
                  >
                    <span>Windows (x64)</span>
                    <span className="text-xs text-purple-400 font-mono">.exe</span>
                  </a>
                  <a
                    href="https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_aarch64.dmg"
                    onClick={() => setDownloadDropdown(false)}
                    className="flex items-center justify-between px-3 py-2 text-sm text-purple-100 hover:bg-purple-900/40 rounded-lg transition-colors"
                  >
                    <span>macOS (Apple Silicon)</span>
                    <span className="text-xs text-purple-400 font-mono">.dmg</span>
                  </a>
                  <a
                    href="https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_x64.dmg"
                    onClick={() => setDownloadDropdown(false)}
                    className="flex items-center justify-between px-3 py-2 text-sm text-purple-100 hover:bg-purple-900/40 rounded-lg transition-colors"
                  >
                    <span>macOS (Intel)</span>
                    <span className="text-xs text-purple-400 font-mono">.dmg</span>
                  </a>
                  <a
                    href="https://github.com/Dardcor/Dardcor-Code/releases/download/Dardcor-Code-v1.0.0/Dardcor-Code_1.0.0_amd64.deb"
                    onClick={() => setDownloadDropdown(false)}
                    className="flex items-center justify-between px-3 py-2 text-sm text-purple-100 hover:bg-purple-900/40 rounded-lg transition-colors"
                  >
                    <span>Linux (Debian, Ubuntu)</span>
                    <span className="text-xs text-purple-400 font-mono">.deb</span>
                  </a>
                  <div className="pt-1.5 mt-1.5 border-t border-purple-800/40">
                    <Link
                      to="/download"
                      onClick={() => setDownloadDropdown(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-medium text-purple-300 hover:text-white hover:bg-purple-900/40 rounded-lg transition-colors"
                    >
                      <span>All 25 Packages &amp; Checksums</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Secondary links */}
            <motion.div
              variants={itemAnim}
              className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#756d94]"
            >
              <Link
                to="/download"
                className="text-purple-300 hover:text-white font-medium underline underline-offset-2 transition-colors"
              >
                Web
              </Link>
              <span>,</span>
              <Link
                to="/updates"
                className="text-purple-300 hover:text-white font-medium underline underline-offset-2 transition-colors"
              >
                Updates &amp; Notes
              </Link>
              <span>, or</span>
              <Link
                to="/download"
                className="text-purple-300 hover:text-white font-medium underline underline-offset-2 transition-colors"
              >
                other platforms
              </Link>
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              variants={itemAnim}
              className="mt-3 text-xs text-[#756d94] leading-normal"
            >
              By using Dardcor Code, you agree to its{' '}
              <a href="https://github.com/Dardcor/Dardcor-Code/blob/main/LICENSE.txt" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-300">license</a>{' '}
              and{' '}
              <a href="/#privacy" className="underline hover:text-purple-300">privacy statement</a>.
            </motion.p>
          </div>

          {/* Right Column: Code Editor Mockup */}
          <motion.div
            variants={itemAnim}
            className="lg:col-span-6 w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative">
              {/* Outer soft glow */}
              <div className="absolute -inset-4 bg-purple-600/10 rounded-2xl blur-xl pointer-events-none" />

              {/* Editor Mockup Window */}
              <div className="relative bg-[#110a26] text-purple-100 border border-purple-800/40 rounded-xl shadow-2xl overflow-hidden">
                {/* Window title bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#0d0720] border-b border-purple-900/40">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    <span className="ml-3 text-xs font-mono text-purple-300/80">
                      dardcor-workspace [multi-agent]
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-purple-950/80 text-purple-300 border border-purple-800/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                      {currentSnippet.status}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="text-purple-400 hover:text-white transition-colors p-1 rounded hover:bg-purple-900/30 cursor-pointer"
                      title="Copy snippet"
                      aria-label="Copy snippet"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center border-b border-purple-900/40 bg-[#0e0822] overflow-x-auto text-xs font-mono">
                  {snippets.map((snippet, idx) => {
                    const isActive = idx === activeTab;
                    return (
                      <button
                        key={snippet.filename}
                        type="button"
                        onClick={() => setActiveTab(idx)}
                        className={`flex items-center gap-2 px-4 py-2.5 border-r border-purple-900/30 transition-colors text-left whitespace-nowrap cursor-pointer ${
                          isActive
                            ? 'bg-[#110a26] text-white border-t-2 border-t-purple-500 font-semibold'
                            : 'text-purple-300/60 hover:text-purple-200 hover:bg-purple-950/30'
                        }`}
                      >
                        <FileCode size={13} className={isActive ? 'text-purple-400' : 'text-purple-400/50'} />
                        <span>{snippet.filename}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Code Content Area */}
                <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto min-h-[320px] bg-[#110a26]">
                  {currentSnippet.code.map((line, lineIdx) => (
                    <div key={lineIdx} className="flex gap-4 group">
                      <span className="select-none text-purple-400/30 text-right w-6 text-xs group-hover:text-purple-400/60">
                        {lineIdx + 1}
                      </span>
                      <span className="flex-1 whitespace-pre">
                        {line.startsWith('//') || line.startsWith('#') ? (
                          <span className="text-purple-300/40 italic">{line}</span>
                        ) : line.includes('import ') || line.includes('from ') || line.includes('export ') || line.includes('package ') ? (
                          <span className="text-purple-400 font-medium">{line}</span>
                        ) : line.includes('const ') || line.includes('func ') || line.includes('async ') || line.includes('def ') ? (
                          <span className="text-cyan-400">{line}</span>
                        ) : line.includes('"') || line.includes("'") ? (
                          <span className="text-emerald-300">{line}</span>
                        ) : (
                          <span className="text-purple-100">{line}</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Editor status bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#0d0720] border-t border-purple-900/40 text-[11px] font-mono text-purple-300/70">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-purple-300">
                      <Play size={10} className="text-purple-400" /> Language: {currentSnippet.language}
                    </span>
                    <span className="hidden sm:inline-block">UTF-8</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 size={11} /> Ready
                    </span>
                    <span>Tab {activeTab + 1} of {snippets.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
