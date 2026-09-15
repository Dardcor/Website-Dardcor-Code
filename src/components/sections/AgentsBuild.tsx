import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Terminal,
  Globe,
  Cloud,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  GitCommit,
  Bot,
} from 'lucide-react';

interface AgentTaskStep {
  id: number;
  title: string;
  detail: string;
  status: 'completed' | 'running' | 'queued';
  duration?: string;
}

const initialSteps: AgentTaskStep[] = [
  {
    id: 1,
    title: 'Analyze codebase AST & symbol graph',
    detail: 'Inspected 42 modules; identified type mismatch in orchestrator runtime',
    status: 'completed',
    duration: '1.2s',
  },
  {
    id: 2,
    title: 'Generate type-safe diff & patch',
    detail: 'Updated OrchestratorConfig and dispatched task executor',
    status: 'completed',
    duration: '2.8s',
  },
  {
    id: 3,
    title: 'Run automated verification test suite',
    detail: 'Executing test: node scripts/test-e2e.mjs --suite regression',
    status: 'running',
    duration: 'active',
  },
  {
    id: 4,
    title: 'Create pull request & generate changelog',
    detail: 'Awaiting test pass verification before pushing upstream',
    status: 'queued',
  },
];

const diffLines = [
  { type: 'header', text: '@@ -14,8 +14,10 @@ export class TaskOrchestrator {' },
  { type: 'context', text: '   private runtime: AgentRuntime;' },
  { type: 'context', text: '   private sessionRegistry: SessionRegistry;' },
  { type: 'remove', text: '-  public async dispatch(task: LegacyTask): Promise<void> {' },
  { type: 'remove', text: '-    return this.runtime.execute(task);' },
  { type: 'add', text: '+  public async dispatch(task: MultiAgentTask): Promise<TaskResult> {' },
  { type: 'add', text: '+    const plan = await this.planner.createExecutionPlan(task);' },
  { type: 'add', text: '+    return this.runtime.executeParallel(plan.steps);' },
  { type: 'context', text: '   }' },
  { type: 'context', text: ' }' },
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

export default function AgentsBuild() {
  const [selectedAgentType, setSelectedAgentType] = useState<'cli' | 'browser' | 'cloud'>('cli');

  return (
    <section
      id="agents-build"
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
          <motion.div
            variants={itemAnim}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dc-50 border border-dc-200 text-xs font-semibold text-dc-700 mb-4"
          >
            <Sparkles size={13} className="text-dc-600" />
            <span>Autonomous Intelligence</span>
          </motion.div>

          <motion.h2
            variants={itemAnim}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight"
          >
            Agents that build for you
          </motion.h2>

          <motion.p
            variants={itemAnim}
            className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed"
          >
            Hand off tasks to AI agents that autonomously plan, make code changes, run commands, and iterate until the job is done.
          </motion.p>
        </div>

        {/* 3 Core Agent Modes Cards */}
        <motion.div
          variants={itemAnim}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* CLI Agent */}
          <div
            onClick={() => setSelectedAgentType('cli')}
            className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
              selectedAgentType === 'cli'
                ? 'bg-surface-card border-dc-400 shadow-lg ring-1 ring-dc-400/20'
                : 'bg-surface-card/60 border-border-default hover:border-border-hover'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-dc-50 flex items-center justify-center text-dc-600 mb-4">
              <Terminal size={20} />
            </div>
            <h3 className="text-lg font-display font-semibold text-text-primary mb-2">
              CLI-based agent
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              CLI-based agent for background bug fixes, automated code refactoring, test generation, and repository maintenance straight from your terminal.
            </p>
          </div>

          {/* Browser Agent */}
          <div
            onClick={() => setSelectedAgentType('browser')}
            className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
              selectedAgentType === 'browser'
                ? 'bg-surface-card border-dc-400 shadow-lg ring-1 ring-dc-400/20'
                : 'bg-surface-card/60 border-border-default hover:border-border-hover'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-dc-50 flex items-center justify-center text-dc-600 mb-4">
              <Globe size={20} />
            </div>
            <h3 className="text-lg font-display font-semibold text-text-primary mb-2">
              Browser-integrated agent
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Browser-integrated agent for real-time feature implementation, interactive UI debugging, live previews, and automated browser testing.
            </p>
          </div>

          {/* Cloud Agent */}
          <div
            onClick={() => setSelectedAgentType('cloud')}
            className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
              selectedAgentType === 'cloud'
                ? 'bg-surface-card border-dc-400 shadow-lg ring-1 ring-dc-400/20'
                : 'bg-surface-card/60 border-border-default hover:border-border-hover'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-dc-50 flex items-center justify-center text-dc-600 mb-4">
              <Cloud size={20} />
            </div>
            <h3 className="text-lg font-display font-semibold text-text-primary mb-2">
              Cloud agent
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Cloud agent for automated PR reviews, multi-agent continuous integration, security vulnerability audits, and background build fixes.
            </p>
          </div>
        </motion.div>

        {/* Animated Task & Code Panel Mockup */}
        <motion.div
          variants={itemAnim}
          className="rounded-2xl border border-border-default bg-[#151520] shadow-xl overflow-hidden"
        >
          {/* Mockup Header */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#101018] border-b border-white/5 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-dc-500 animate-pulse" />
              <span className="font-semibold text-white">Agent Task Workflow</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">goal: Fix concurrency race condition in agent dispatcher</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Bot size={14} className="text-dc-400" />
              <span className="text-dc-300">Autonomous Runner</span>
            </div>
          </div>

          {/* Split View: Left (Task Steps), Right (Code Diff) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/5 text-sm">
            {/* Left Panel: Steps & Progress */}
            <div className="lg:col-span-5 p-6 bg-[#13131c]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Execution Plan
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  Step 3 of 4
                </span>
              </div>

              <div className="space-y-4">
                {initialSteps.map((step) => {
                  return (
                    <div
                      key={step.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        step.status === 'running'
                          ? 'bg-dc-950/40 border-dc-500/50 shadow-[0_0_12px_rgba(90,56,217,0.15)]'
                          : step.status === 'completed'
                          ? 'bg-white/[0.02] border-white/5'
                          : 'bg-transparent border-white/5 opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {step.status === 'completed' ? (
                            <CheckCircle2 size={16} className="text-emerald-400" />
                          ) : step.status === 'running' ? (
                            <span className="relative flex h-4 w-4">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dc-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-4 w-4 bg-dc-600" />
                            </span>
                          ) : (
                            <Clock size={16} className="text-slate-500" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs font-medium ${
                                step.status === 'running'
                                  ? 'text-dc-200 font-semibold'
                                  : step.status === 'completed'
                                  ? 'text-slate-200'
                                  : 'text-slate-400'
                              }`}
                            >
                              {step.title}
                            </span>
                            {step.duration && (
                              <span className="text-[11px] font-mono text-slate-500 ml-2">
                                {step.duration}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 leading-normal font-mono truncate">
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Panel: Code / Diff View */}
            <div className="lg:col-span-7 p-6 bg-[#161622]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <GitCommit size={14} className="text-dc-400" />
                  <span className="text-slate-200">src/agents/orchestrator.ts</span>
                  <span className="text-xs text-emerald-400 font-medium">+3</span>
                  <span className="text-xs text-rose-400 font-medium">-2</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                  Diff View
                </span>
              </div>

              <div className="bg-[#101018] rounded-xl p-4 font-mono text-xs overflow-x-auto leading-relaxed border border-white/5">
                {diffLines.map((line, idx) => {
                  const isAdd = line.type === 'add';
                  const isRemove = line.type === 'remove';
                  const isHeader = line.type === 'header';

                  return (
                    <div
                      key={idx}
                      className={`px-2 py-0.5 rounded ${
                        isAdd
                          ? 'bg-emerald-950/40 text-emerald-300 font-medium'
                          : isRemove
                          ? 'bg-rose-950/40 text-rose-300 line-through'
                          : isHeader
                          ? 'text-dc-300/80 bg-dc-950/30'
                          : 'text-slate-300'
                      }`}
                    >
                      <pre className="m-0 font-mono whitespace-pre">{line.text}</pre>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section CTA */}
        <motion.div variants={itemAnim} className="flex justify-start">
          <Link
            to="/features/agents"
            className="inline-flex items-center gap-2.5 bg-dc-600 hover:bg-dc-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all px-6 py-3.5 text-sm"
          >
            <span>Get started with agents</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
