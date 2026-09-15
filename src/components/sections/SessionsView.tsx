import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  ListFilter,
  CheckCircle2,
  AlertTriangle,
  Search,
  Terminal,
  Activity,
  ChevronRight,
  Server,
} from 'lucide-react';

type SessionStatus = 'running' | 'completed' | 'failed';

interface AgentSession {
  id: string;
  task: string;
  agent: string;
  environment: string;
  surface: 'Desktop' | 'CLI' | 'Cloud' | 'Web';
  status: SessionStatus;
  startedAt: string;
  duration: string;
  logSnippet: string;
  changesCount: { added: number; deleted: number };
}

const sessionsData: AgentSession[] = [
  {
    id: 'sess-8941',
    task: 'Fix concurrency race condition in agent dispatcher',
    agent: 'Architect Agent (Claude 3.7)',
    environment: 'Desktop (local)',
    surface: 'Desktop',
    status: 'running',
    startedAt: '2 mins ago',
    duration: '02:14',
    logSnippet: 'Compiling AST symbol graph... verifying channel lock synchronization in src/runtime/dispatcher.ts:88',
    changesCount: { added: 14, deleted: 6 },
  },
  {
    id: 'sess-8938',
    task: 'Generate E2E regression tests for authentication flows',
    agent: 'QA Specialist (GPT-4o)',
    environment: 'CLI (headless harness)',
    surface: 'CLI',
    status: 'completed',
    startedAt: '14 mins ago',
    duration: '01:48',
    logSnippet: '✓ 18 unit tests generated. 100% pass rate achieved across Chromium & WebKit runners.',
    changesCount: { added: 128, deleted: 0 },
  },
  {
    id: 'sess-8935',
    task: 'Optimize bundle chunking & CSS purge configuration',
    agent: 'Performance Agent (Gemini 2.5)',
    environment: 'Cloud (GitHub PR #214)',
    surface: 'Cloud',
    status: 'completed',
    startedAt: '45 mins ago',
    duration: '04:12',
    logSnippet: 'Bundle size reduced by 34.2 KB (-18%). Initial load LCP improved by 280ms.',
    changesCount: { added: 9, deleted: 31 },
  },
  {
    id: 'sess-8930',
    task: 'Deploy microservice container to staging cluster',
    agent: 'DevOps Agent (Custom vLLM)',
    environment: 'Cloud (Kubernetes runner)',
    surface: 'Cloud',
    status: 'failed',
    startedAt: '1 hour ago',
    duration: '00:45',
    logSnippet: 'Alert: Image pull error: Staging container registry credential expired during handshake.',
    changesCount: { added: 2, deleted: 1 },
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
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SessionsView() {
  const [filter, setFilter] = useState<'all' | SessionStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSessionId, setSelectedSessionId] = useState<string>(sessionsData[0].id);

  const filteredSessions = useMemo(() => {
    return sessionsData.filter((s) => {
      const matchesFilter = filter === 'all' || s.status === filter;
      const matchesSearch =
        s.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const activeSession = sessionsData.find((s) => s.id === selectedSessionId) ?? sessionsData[0];

  return (
    <section
      id="sessions-view"
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
            <Activity size={13} className="text-dc-600" />
            <span>Parallel Orchestration</span>
          </motion.div>

          <motion.h2
            variants={itemAnim}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight"
          >
            All your sessions, one view
          </motion.h2>

          <motion.p
            variants={itemAnim}
            className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed"
          >
            Stay productive while multiple agents work on tasks in parallel. Track all your agent sessions from a single view, regardless of where they run.
          </motion.p>
        </div>

        {/* Sessions Monitor UI Mockup */}
        <motion.div
          variants={itemAnim}
          className="rounded-2xl border border-border-default bg-[#151520] shadow-2xl overflow-hidden"
        >
          {/* Top Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 bg-[#101018] border-b border-white/5">
            {/* Status Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
                <ListFilter size={14} /> Filter:
              </span>
              {(['all', 'running', 'completed', 'failed'] as const).map((statusKey) => {
                const isActive = filter === statusKey;
                return (
                  <button
                    key={statusKey}
                    type="button"
                    onClick={() => setFilter(statusKey)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer capitalize ${
                      isActive
                        ? 'bg-dc-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {statusKey}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sessions..."
                className="w-full pl-9 pr-3 py-1.5 text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-dc-500 transition-colors"
              />
            </div>
          </div>

          {/* Master-Detail Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
            {/* Session List Column */}
            <div className="lg:col-span-5 p-3 sm:p-4 space-y-2 bg-[#12121c] max-h-[480px] overflow-y-auto">
              {filteredSessions.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs font-mono">
                  No agent sessions match your filter.
                </div>
              ) : (
                filteredSessions.map((session) => {
                  const isSelected = session.id === selectedSessionId;
                  const isRunning = session.status === 'running';
                  const isCompleted = session.status === 'completed';
                  const isFailed = session.status === 'failed';

                  return (
                    <div
                      key={session.id}
                      onClick={() => setSelectedSessionId(session.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'bg-dc-950/40 border-dc-500/60 shadow-md ring-1 ring-dc-500/20'
                          : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          {/* Distinct Status Badges */}
                          {isRunning && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-dc-600/20 text-dc-300 border border-dc-500/30">
                              <span className="w-2 h-2 rounded-full bg-dc-400 animate-pulse" />
                              running
                            </span>
                          )}
                          {isCompleted && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                              <CheckCircle2 size={12} className="text-emerald-400" />
                              completed
                            </span>
                          )}
                          {isFailed && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-rose-500/15 text-rose-300 border border-rose-500/30">
                              <AlertTriangle size={12} className="text-rose-400" />
                              failed
                            </span>
                          )}
                          <span className="text-[11px] font-mono text-slate-500">
                            {session.id}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">
                          {session.duration}
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-medium text-slate-200 line-clamp-1">
                        {session.task}
                      </h4>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mt-2">
                        <span>{session.agent}</span>
                        <span className="text-slate-500">{session.surface}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Session Detail & Terminal Stream Column */}
            <div className="lg:col-span-7 p-5 sm:p-6 bg-[#161622] flex flex-col justify-between">
              <div>
                {/* Detail Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-dc-400 font-semibold">
                        {activeSession.id}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs font-mono text-slate-400">
                        {activeSession.environment}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      {activeSession.task}
                    </h3>
                  </div>

                  <div className="shrink-0">
                    {activeSession.status === 'running' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-dc-600/30 text-dc-200 border border-dc-500/40">
                        <span className="w-2 h-2 rounded-full bg-dc-400 animate-pulse" />
                        Active Session
                      </span>
                    )}
                    {activeSession.status === 'completed' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        <CheckCircle2 size={13} className="text-emerald-400" />
                        Finished
                      </span>
                    )}
                    {activeSession.status === 'failed' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        <AlertTriangle size={13} className="text-rose-400" />
                        Execution Alert
                      </span>
                    )}
                  </div>
                </div>

                {/* Session Attributes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 py-3 bg-[#11111a] rounded-xl px-4 border border-white/5 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block text-[10px]">AGENT</span>
                    <span className="text-slate-200 truncate block">{activeSession.agent}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">STARTED</span>
                    <span className="text-slate-200">{activeSession.startedAt}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">RUNTIME</span>
                    <span className="text-slate-200">{activeSession.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">DIFF</span>
                    <span className="text-emerald-400">+{activeSession.changesCount.added}</span>{' '}
                    <span className="text-rose-400">-{activeSession.changesCount.deleted}</span>
                  </div>
                </div>

                {/* Live Console Output Mockup */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <Terminal size={13} className="text-dc-400" />
                      Session Output & Diagnostics
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">Live stdout</span>
                  </div>

                  <div className="bg-[#0e0e16] rounded-xl p-4 font-mono text-xs text-slate-300 border border-white/5 leading-relaxed overflow-x-auto min-h-[140px]">
                    <p className="text-slate-500 mb-1">$ dardcor agent-run --session {activeSession.id}</p>
                    <p className="text-slate-400 mb-2">[INFO] Harness initialized on {activeSession.environment}</p>
                    <p className={activeSession.status === 'failed' ? 'text-rose-300 font-semibold' : 'text-slate-200'}>
                      {activeSession.logSnippet}
                    </p>
                    {activeSession.status === 'running' && (
                      <p className="mt-2 text-dc-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-dc-400 animate-ping" />
                        Listening for next agent message or tool response...
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom detail footer */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Server size={13} className="text-dc-400" />
                  Harness State: Connected
                </span>
                <span className="flex items-center gap-1 text-dc-400 hover:text-dc-300 cursor-pointer">
                  Inspect session trace <ChevronRight size={13} />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
