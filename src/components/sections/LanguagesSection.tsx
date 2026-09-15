import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Globe2,
  FileCode2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface LanguageItem {
  name: string;
  category: string;
  support: 'Built-in' | 'Marketplace' | 'Core';
  color: string;
  snippet: string;
  features: string[];
}

const languagesList: LanguageItem[] = [
  {
    name: 'JavaScript',
    category: 'Web / Node.js',
    support: 'Built-in',
    color: '#f7df1e',
    features: ['IntelliSense', 'Debugger', 'Refactoring', 'ESLint'],
    snippet: `// JavaScript ESNext
export const calculateVelocity = (points, time) => {
  return points.reduce((acc, p) => acc + p.weight, 0) / time;
};`,
  },
  {
    name: 'TypeScript',
    category: 'Typed JavaScript',
    support: 'Built-in',
    color: '#3178c6',
    features: ['Strict Type Checking', 'Symbol Navigation', 'Quick Fixes', 'JSDoc'],
    snippet: `// TypeScript 5+
interface AgentMessage<T = unknown> {
  readonly id: string;
  payload: T;
  timestamp: Date;
}`,
  },
  {
    name: 'Python',
    category: 'Data Science / Backend',
    support: 'Marketplace',
    color: '#3776ab',
    features: ['PyLance', 'Jupyter Kernels', 'Black Formatter', 'PyTest'],
    snippet: `# Python 3.12
async def run_pipeline(agents: list[Agent]) -> PipelineReport:
    results = await asyncio.gather(*[a.execute() for a in agents])
    return aggregate(results)`,
  },
  {
    name: 'C#',
    category: '.NET / Enterprise',
    support: 'Marketplace',
    color: '#9b4f96',
    features: ['Roslyn Analyzers', 'Unit Testing', 'Hot Reload', 'Solution View'],
    snippet: `// C# 12 Primary Constructor
public class WorkflowEngine(ITaskDispatcher dispatcher)
{
    public async Task<Report> RunAsync() => await dispatcher.DispatchAll();
}`,
  },
  {
    name: 'C++',
    category: 'Systems / Native',
    support: 'Marketplace',
    color: '#00599c',
    features: ['Clangd LSP', 'CMake Integration', 'GDB/LLDB Debugger', 'Call Hierarchy'],
    snippet: `// Modern C++20
template <typename T>
concept AgentRunnable = requires(T a) { { a.run() } -> std::same_as<void>; };`,
  },
  {
    name: 'HTML',
    category: 'Web Layout',
    support: 'Built-in',
    color: '#e34f26',
    features: ['Emmet Abbreviation', 'Auto-Closing Tags', 'ARIA Audits', 'Validation'],
    snippet: `<!-- Semantic Accessible HTML5 -->
<main id="content" class="container" role="main">
  <section aria-labelledby="heading">...</section>
</main>`,
  },
  {
    name: 'Java',
    category: 'Enterprise / Android',
    support: 'Marketplace',
    color: '#b07219',
    features: ['Maven/Gradle Support', 'JVM Debugger', 'Lombok Extension', 'Spring Tools'],
    snippet: `// Java 21 Record Pattern
public record AgentResult(String taskId, boolean success, Duration elapsed) {
    public boolean isFast() { return elapsed.toMillis() < 500; }
}`,
  },
  {
    name: 'JSON',
    category: 'Configuration',
    support: 'Built-in',
    color: '#292929',
    features: ['JSON Schema Validation', 'Auto-Formatting', 'Color Decorators', 'Folding'],
    snippet: `{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": { "strict": true, "verbatimModuleSyntax": true }
}`,
  },
  {
    name: 'PHP',
    category: 'Web Backend',
    support: 'Marketplace',
    color: '#4f5d95',
    features: ['PHP Intelephense', 'Xdebug Profiler', 'Composer Tools', 'Psalm'],
    snippet: `<?php
declare(strict_types=1);
final readonly class Session {
    public function __construct(public string $sessionId) {}
}`,
  },
  {
    name: 'Markdown',
    category: 'Documentation',
    support: 'Built-in',
    color: '#083fa1',
    features: ['Live Preview', 'Table Formatter', 'MathJax/KaTeX', 'TOC Generator'],
    snippet: `# Dardcor Code Architecture
- Modular React 19 Frontend
- Multi-Agent Orchestration Core
- Hardened Edge Security Standards`,
  },
  {
    name: 'PowerShell',
    category: 'Automation / DevOps',
    support: 'Marketplace',
    color: '#012456',
    features: ['PSScriptAnalyzer', 'PSReadLine Integration', 'Remote Debugging', 'Modules'],
    snippet: `# PowerShell Core
[CmdletBinding()]
param([string]$Environment = "Production")
Invoke-RestMethod -Uri "https://api.dardcor.com/health"`,
  },
  {
    name: 'YAML',
    category: 'DevOps / CI/CD',
    support: 'Marketplace',
    color: '#cb171e',
    features: ['Kubernetes Schemas', 'GitHub Actions Lint', 'Indentation Guides', 'Anchors'],
    snippet: `# GitHub Actions Workflow
name: Test Suite
on: [push, pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4`,
  },
];

const containerAnim: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const itemAnim: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function LanguagesSection() {
  const [activeLanguage, setActiveLanguage] = useState<LanguageItem>(languagesList[0]);

  return (
    <section
      id="languages"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
    >
      <motion.div
        variants={containerAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="flex flex-col gap-12"
      >
        {/* Section Header */}
        <div className="max-w-3xl">
          <motion.div variants={itemAnim} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dc-500/10 border border-dc-500/20 text-dc-600 text-xs font-medium mb-4">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Polyglot Support</span>
          </motion.div>
          <motion.h2
            variants={itemAnim}
            className="text-3xl sm:text-4xl font-display font-bold text-text-primary tracking-tight"
          >
            Code in any language
          </motion.h2>
          <motion.p
            variants={itemAnim}
            className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed"
          >
            Dardcor Code supports almost every major programming language. Several ship in the box, but extensions for others can be found in the Marketplace.
          </motion.p>
        </div>

        {/* 12 Language Badges / Pills with Flex-Wrap and Responsive Grid */}
        <motion.div
          variants={itemAnim}
          className="flex flex-wrap gap-2.5 sm:gap-3"
        >
          {languagesList.map((lang) => {
            const isSelected = activeLanguage.name === lang.name;
            return (
              <button
                key={lang.name}
                type="button"
                onClick={() => setActiveLanguage(lang)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-dc-600 text-white shadow-md shadow-dc-600/25 ring-2 ring-dc-400/40 scale-105'
                    : 'bg-surface-card hover:bg-surface-base text-text-primary border border-border-default hover:border-border-hover'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: lang.color }}
                />
                <span>{lang.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-sans ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-surface-base text-text-muted border border-border-default'
                  }`}
                >
                  {lang.support}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Interactive Language Detail & Syntax Preview Card */}
        <motion.div
          variants={itemAnim}
          className="rounded-xl border border-border-default bg-surface-card overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Language Overview */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border-default bg-surface-base/50">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-white shadow-sm text-sm"
                    style={{ backgroundColor: activeLanguage.color }}
                  >
                    {activeLanguage.name.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary text-base sm:text-lg">
                      {activeLanguage.name}
                    </h3>
                    <p className="text-xs text-text-muted">{activeLanguage.category}</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-dc-500/10 text-dc-600 border border-dc-500/20 font-medium">
                  {activeLanguage.support}
                </span>
              </div>

              <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3 mt-6">
                Key Tooling Capabilities
              </h4>
              <ul className="space-y-2">
                {activeLanguage.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-xs text-text-secondary">
                    <CheckCircle2 className="w-3.5 h-3.5 text-dc-500 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-border-default text-xs text-text-muted flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-dc-500" />
              <span>Full AI agent completions enabled for {activeLanguage.name}</span>
            </div>
          </div>

          {/* Syntax Highlighted Snippet */}
          <div className="lg:col-span-8 p-6 sm:p-8 bg-surface-base flex flex-col justify-center">
            <div className="flex items-center justify-between mb-3 text-xs text-text-muted font-mono">
              <span className="inline-flex items-center gap-1.5">
                <FileCode2 className="w-4 h-4 text-dc-600" />
                <span>example.{activeLanguage.name.toLowerCase()}</span>
              </span>
              <span>UTF-8 • Tab Size: 2</span>
            </div>
            <div className="p-4 rounded-lg bg-surface-card border border-border-default font-mono text-xs sm:text-sm text-text-primary overflow-x-auto">
              <pre className="whitespace-pre-wrap break-words leading-relaxed text-dc-300">
                {activeLanguage.snippet}
              </pre>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
