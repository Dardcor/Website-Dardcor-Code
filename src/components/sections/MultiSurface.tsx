import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Layers,
  Cpu,
  Terminal,
  Globe,
  Smartphone,
  Monitor,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface ModelInfo {
  name: string;
  provider: string;
  badge: string;
  description: string;
  capabilities: string[];
}

const models: ModelInfo[] = [
  {
    name: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    badge: '200k context',
    description: 'Deep reasoning, architectural planning, and complex multi-file refactoring with extended thinking.',
    capabilities: ['Architectural planning', 'Complex refactoring', 'Extended thinking'],
  },
  {
    name: 'GPT-4o',
    provider: 'OpenAI',
    badge: '128k context',
    description: 'High-speed multi-modal intelligence for rapid inline code suggestions, test generation, and debugging.',
    capabilities: ['Fast completions', 'Test generation', 'Multi-modal analysis'],
  },
  {
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    badge: '1M+ context',
    description: 'Ultra-large context window capable of ingesting entire repositories, documentation sets, and log streams.',
    capabilities: ['Repo-scale reasoning', 'Log analysis', 'Massive context'],
  },
  {
    name: 'Custom model',
    provider: 'Local & Cloud',
    badge: 'Self-hosted',
    description: 'Bring your own local weights via Ollama, vLLM, DeepSeek, or any OpenAI-compatible API endpoint.',
    capabilities: ['Ollama & vLLM', 'Zero data egress', 'Custom endpoints'],
  },
];

interface SurfaceItem {
  id: string;
  name: string;
  icon: typeof Monitor;
  tagline: string;
  description: string;
}

const surfaces: SurfaceItem[] = [
  {
    id: 'desktop',
    name: 'Dardcor Code',
    icon: Monitor,
    tagline: 'Native Desktop Editor',
    description: 'Full native desktop experience across Linux, macOS, and Windows with multi-agent panels, terminal integration, and deep language servers.',
  },
  {
    id: 'cli',
    name: 'CLI',
    icon: Terminal,
    tagline: 'Headless Agent Runner',
    description: 'Autonomous terminal harness for CI/CD pipelines, automated PR fixes, background cron tasks, and repository-wide audits.',
  },
  {
    id: 'web',
    name: 'Web',
    icon: Globe,
    tagline: 'In-Browser Cloud Editor',
    description: 'Instant zero-install web editor running in modern browsers with shared workspaces, live previews, and cloud harness sync.',
  },
  {
    id: 'mobile',
    name: 'Mobile',
    icon: Smartphone,
    tagline: 'Companion Monitor App',
    description: 'Review agent progress, inspect proposed code diffs, approve critical commands, and receive push alerts right from your phone.',
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

export default function MultiSurface() {
  const [activeSurface, setActiveSurface] = useState('desktop');

  return (
    <section
      id="multi-surface"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
    >
      <motion.div
        variants={containerAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="flex flex-col gap-14"
      >
        {/* Section Header */}
        <div className="max-w-3xl">
          <motion.div
            variants={itemAnim}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dc-50 border border-dc-200 text-xs font-semibold text-dc-700 mb-4"
          >
            <Layers size={13} className="text-dc-600" />
            <span>Universal Flexibility</span>
          </motion.div>

          <motion.h2
            variants={itemAnim}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight"
          >
            Any agent, any model
          </motion.h2>

          <motion.p
            variants={itemAnim}
            className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed"
          >
            Use the agent harness that fits your workflow. Run agents locally or in the cloud, with Copilot or third-party providers like Claude and OpenAI.
          </motion.p>
        </div>

        {/* Model Grid: 1-col mobile, 2-col sm, 4-col lg */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display font-semibold text-text-primary flex items-center gap-2">
              <Cpu size={18} className="text-dc-600" />
              <span>Supported Model Harnesses</span>
            </h3>
            <span className="text-xs font-mono text-text-tertiary">Zero vendor lock-in</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {models.map((model) => (
              <motion.div
                key={model.name}
                variants={itemAnim}
                className="flex flex-col justify-between p-6 rounded-2xl bg-surface-card border border-border-default hover:border-dc-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-medium text-dc-600 bg-dc-50 px-2 py-0.5 rounded border border-dc-100">
                      {model.provider}
                    </span>
                    <span className="text-[11px] font-mono text-text-tertiary">
                      {model.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-display font-bold text-text-primary group-hover:text-dc-600 transition-colors">
                    {model.name}
                  </h4>

                  <p className="mt-2.5 text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {model.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-border-default">
                  <div className="flex flex-wrap gap-1.5">
                    {model.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="text-[10px] font-mono text-text-tertiary bg-surface-base px-2 py-0.5 rounded"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Router Mesh Showcase Card */}
        <motion.div
          variants={itemAnim}
          className="rounded-2xl border border-[#6a1b9a] bg-[#08040e] overflow-hidden shadow-2xl shadow-purple-950/50 hover:border-[#8e24aa] transition-colors"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d0720] border-b border-purple-900/40">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 text-xs font-mono text-purple-300/80 hidden sm:inline">
                Dardcor Router v1.0.0 - Usage &amp; Analytics
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/40">
                9 Providers Connected
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-black/60">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-lg font-bold text-white">Unified Multi-Provider Routing &amp; Analytics</h4>
                <p className="text-xs sm:text-sm text-[#b3a8c9]">
                  Live monitoring of requests, token consumption, context caching, and costs across all connected harnesses.
                </p>
              </div>
              <Link
                to="/features/models"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white transition-colors shrink-0"
              >
                <span>Router Architecture</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="rounded-xl overflow-hidden border border-purple-900/30 bg-black">
              <img
                src="/router.png"
                alt="Dardcor Router Multi-Provider Mesh and Token Analytics"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Surfaces Showcase */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-display font-semibold text-text-primary flex items-center gap-2">
              <Layers size={18} className="text-dc-600" />
              <span>Multi-Surface Availability</span>
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              Operate across environments seamlessly without losing context or agent history.
            </p>
          </div>

          {/* Interactive Surface Tabs / Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {surfaces.map((surface) => {
              const Icon = surface.icon;
              const isActive = activeSurface === surface.id;

              return (
                <button
                  key={surface.id}
                  type="button"
                  onClick={() => setActiveSurface(surface.id)}
                  className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-dc-50/70 border-dc-400 shadow-md ring-1 ring-dc-400/20'
                      : 'bg-surface-card border-border-default hover:border-border-hover'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded-lg ${
                        isActive ? 'bg-dc-600 text-white' : 'bg-dc-50 text-dc-600'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-display font-semibold text-text-primary">
                        {surface.name}
                      </h4>
                      <span className="text-[11px] text-text-tertiary block font-mono">
                        {surface.tagline}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed mt-2">
                    {surface.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Bottom CTA */}
        <motion.div
          variants={itemAnim}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-surface-card border border-border-default"
        >
          <div className="flex items-center gap-3">
            <ShieldCheck size={24} className="text-dc-600 shrink-0" />
            <div>
              <span className="text-sm font-semibold text-text-primary block">
                Cross-environment state synchronizer
              </span>
              <span className="text-xs text-text-secondary">
                Sessions, checkpoints, and permissions stay synchronized across Desktop, CLI, Web, and Mobile.
              </span>
            </div>
          </div>

          <Link
            to="/features/models"
            className="inline-flex items-center gap-2 bg-dc-600 hover:bg-dc-500 text-white font-semibold rounded-lg shadow hover:shadow-md transition-all px-5 py-2.5 text-xs sm:text-sm whitespace-nowrap"
          >
            <span>See how agents work across surfaces</span>
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
