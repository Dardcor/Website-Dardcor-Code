import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Code2,
  Sparkles,
  ArrowRight,
  Check,
  Split,
  FileCode,
  Layers,
  Zap,
} from 'lucide-react';

interface DiffLine {
  numOriginal?: number;
  numModified?: number;
  type: 'unchanged' | 'removed' | 'added' | 'suggestion';
  content: string;
}

const diffLines: DiffLine[] = [
  {
    numOriginal: 28,
    numModified: 28,
    type: 'unchanged',
    content: 'async function optimizePipeline(config: PipelineConfig): Promise<PipelineReport> {',
  },
  {
    numOriginal: 29,
    numModified: 29,
    type: 'unchanged',
    content: '  const telemetry = await TelemetryService.startSession(config.id);',
  },
  {
    numOriginal: 30,
    type: 'removed',
    content: '-  const result = await legacySynchronousExecute(config.stages);',
  },
  {
    numModified: 30,
    type: 'added',
    content: '+  const planner = new AutonomousExecutionPlanner(config.concurrency);',
  },
  {
    numModified: 31,
    type: 'added',
    content: '+  const result = await planner.executeParallelStreams(config.stages);',
  },
  {
    numModified: 32,
    type: 'suggestion',
    content: '   // AI Suggestion: automatically caches intermediate stage outputs for 3.4x faster reruns',
  },
  {
    numOriginal: 31,
    numModified: 33,
    type: 'unchanged',
    content: '  await telemetry.recordMetrics({ durationMs: result.elapsed, status: "success" });',
  },
  {
    numOriginal: 32,
    numModified: 34,
    type: 'unchanged',
    content: '  return result.generateSummary();',
  },
  {
    numOriginal: 33,
    numModified: 35,
    type: 'unchanged',
    content: '}',
  },
];

const containerAnim: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemAnim: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CoreEditor() {
  const [diffMode, setDiffMode] = useState<'unified' | 'split'>('unified');
  const [acceptedSuggestion, setAcceptedSuggestion] = useState(false);

  return (
    <section
      id="core-editor"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
    >
      <motion.div
        variants={containerAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="flex flex-col gap-12"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <motion.div variants={itemAnim} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dc-500/10 border border-dc-500/20 text-dc-600 text-xs font-medium mb-4">
              <Code2 className="w-3.5 h-3.5" />
              <span>World-Class Core</span>
            </motion.div>
            <motion.h2
              variants={itemAnim}
              className="text-3xl sm:text-4xl font-display font-bold text-text-primary tracking-tight"
            >
              A world-class code editor at its core
            </motion.h2>
            <motion.p
              variants={itemAnim}
              className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed"
            >
              VS Code has been the editor of choice for millions of developers for over a decade.
              AI-powered inline suggestions, intelligent completions, and a rich editing experience.
            </motion.p>
          </div>

          <motion.div variants={itemAnim} className="flex-shrink-0">
            <Link
              to="/release"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-dc-600 hover:bg-dc-500 text-white font-medium shadow-md shadow-dc-600/20 transition-colors"
            >
              <span>Get started with Dardcor Code</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Editor & Diff Showcase */}
        <motion.div
          variants={itemAnim}
          className="rounded-xl border border-border-default bg-surface-card overflow-hidden shadow-2xl"
        >
          {/* Editor Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-default bg-surface-base/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-text-muted px-2 py-1 rounded bg-surface-card border border-border-default">
                <FileCode className="w-3.5 h-3.5 text-dc-600" />
                <span>pipelineOptimizer.ts (Working Tree Diff)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="inline-flex p-0.5 rounded-lg bg-surface-base border border-border-default text-xs">
                <button
                  type="button"
                  onClick={() => setDiffMode('unified')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    diffMode === 'unified'
                      ? 'bg-dc-600 text-white shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Unified Diff
                </button>
                <button
                  type="button"
                  onClick={() => setDiffMode('split')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 ${
                    diffMode === 'split'
                      ? 'bg-dc-600 text-white shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Split className="w-3 h-3" />
                  <span>Split</span>
                </button>
              </div>
            </div>
          </div>

          {/* Code Diff Body */}
          <div className="p-4 sm:p-6 overflow-x-auto bg-surface-base/90 font-mono text-xs sm:text-sm leading-relaxed">
            <div className="min-w-[580px] flex flex-col divide-y divide-border-default/40">
              {diffLines.map((line, idx) => {
                const isRemoved = line.type === 'removed';
                const isAdded = line.type === 'added';
                const isSuggestion = line.type === 'suggestion';

                return (
                  <div
                    key={idx}
                    className={`flex items-start py-1 px-2 rounded font-mono transition-colors ${
                      isRemoved
                        ? 'bg-red-500/10 text-red-400 border-l-2 border-red-500'
                        : isAdded
                        ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500'
                        : isSuggestion
                        ? 'bg-dc-500/10 text-dc-400 border-l-2 border-dc-500'
                        : 'text-text-secondary hover:bg-surface-card/40'
                    }`}
                  >
                    <span className="w-10 flex-shrink-0 text-right pr-4 text-text-muted select-none text-[11px]">
                      {line.numOriginal ?? ' '}
                    </span>
                    <span className="w-10 flex-shrink-0 text-right pr-4 text-text-muted select-none text-[11px]">
                      {line.numModified ?? ' '}
                    </span>
                    <span className="flex-1 break-words whitespace-pre-wrap">
                      {isSuggestion ? (
                        <span className="inline-flex items-center gap-2 py-0.5">
                          <Sparkles className="w-3.5 h-3.5 text-dc-500 animate-pulse flex-shrink-0" />
                          <span className="text-dc-300 italic">{line.content}</span>
                          {!acceptedSuggestion ? (
                            <button
                              type="button"
                              onClick={() => setAcceptedSuggestion(true)}
                              className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded bg-dc-600 text-white font-sans font-medium hover:bg-dc-500 transition-colors"
                            >
                              <span>Tab to accept</span>
                            </button>
                          ) : (
                            <span className="ml-2 inline-flex items-center gap-1 text-[10px] text-emerald-400 font-sans font-medium">
                              <Check className="w-3 h-3" />
                              <span>Accepted</span>
                            </span>
                          )}
                        </span>
                      ) : (
                        line.content
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feature Highlights Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border-default border-t border-border-default bg-surface-card text-xs">
            <div className="p-4 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-dc-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-text-primary">AI-powered inline suggestions</h4>
                <p className="text-text-muted mt-1">Multi-line completions, smart refactorings, and auto-generated docstrings as you type.</p>
              </div>
            </div>
            <div className="p-4 flex items-start gap-3">
              <Zap className="w-5 h-5 text-dc-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-text-primary">Intelligent completions</h4>
                <p className="text-text-muted mt-1">LSP-backed semantic analysis across your entire project hierarchy and imports.</p>
              </div>
            </div>
            <div className="p-4 flex items-start gap-3">
              <Layers className="w-5 h-5 text-dc-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-text-primary">Fast side-by-side diff</h4>
                <p className="text-text-muted mt-1">Instantly spot changes, stage selective hunks, and review incoming PR edits.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
