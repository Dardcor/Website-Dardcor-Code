import { Link } from 'react-router-dom';
import {
  Download,
  ArrowRight,
  Activity,
  Database,
  ShieldCheck,
} from 'lucide-react';

const modelList = [
  {
    name: 'Claude 3.7 Sonnet (Thinking)',
    provider: 'Anthropic',
    context: '200k tokens',
    description: 'Deep architectural planning, reasoning effort toggle (Low, Medium, High), and complex multi-file refactoring.',
  },
  {
    name: 'GPT-4o & o1 / o3',
    provider: 'OpenAI',
    context: '128k tokens',
    description: 'High-speed code completions, unit test generation, and multi-modal file and image understanding.',
  },
  {
    name: 'Gemini 2.5 Pro & 2.0 Flash',
    provider: 'Google',
    context: '1M+ tokens',
    description: 'Massive context window capable of analyzing entire mono-repositories, dependencies, and documentation sets simultaneously.',
  },
  {
    name: 'DeepSeek V3 & R1',
    provider: 'DeepSeek',
    context: '64k tokens',
    description: 'State-of-the-art open reasoning weights for algorithmic problems and math-heavy codebases.',
  },
  {
    name: 'Local Models (Ollama & vLLM)',
    provider: 'Self-Hosted',
    context: 'Configurable',
    description: '100% private, zero-egress offline computation. Run Llama 3, Qwen 2.5 Coder, or Mistral on your own hardware.',
  },
  {
    name: 'Bring Your Own Key (BYOK)',
    provider: 'Direct API',
    context: 'Direct',
    description: 'Connect any OpenAI-compatible endpoint with zero markup and zero subscription lock-in.',
  },
];

export default function FeaturesModelsPage() {
  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <section className="text-center max-w-3xl mx-auto mb-16">
        <span className="section-eyebrow mb-2">Model Flexibility</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
          Models &amp; Agent Harnesses
        </h1>
        <p className="text-base sm:text-lg text-[#b3a8c9] leading-relaxed">
          Use the AI model that fits your engineering task. Switch effortlessly between Claude, OpenAI, Gemini, DeepSeek, and local self-hosted models through the modular Dardcor Router.
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
            <span>Router Documentation</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {modelList.map((m) => (
          <div
            key={m.name}
            className="bg-[#08040e] border border-[#6a1b9a] rounded-2xl p-6 sm:p-8 hover:border-[#8e24aa] transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-medium text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/40">
                  {m.provider}
                </span>
                <span className="text-[11px] font-mono text-[#7d7296]">
                  {m.context}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{m.name}</h3>
              <p className="text-xs sm:text-sm text-[#b3a8c9] leading-relaxed">
                {m.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dardcor Router Full Showcase Section */}
      <section className="bg-[#08040e] border border-[#6a1b9a] rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl shadow-purple-950/50">
        <div className="max-w-3xl mb-8">
          <span className="section-eyebrow mb-2">Unified Router Mesh</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Dardcor Router: Live Usage &amp; Analytics
          </h2>
          <p className="text-sm sm:text-base text-[#b3a8c9] leading-relaxed">
            Monitor real-time token consumption, cache hit savings, request costs, and provider connections across Antigravity, Cline, CodeBuddy, Gemini CLI, Grok, OpenAI Codex, Qoder, and local offline models.
          </p>
        </div>

        {/* Window Mockup Frame */}
        <div className="rounded-2xl overflow-hidden border border-[#6a1b9a] bg-black shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d0720] border-b border-purple-900/40">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 text-xs font-mono text-purple-300/80 hidden sm:inline">
                Dardcor Router v1.0.0 - Usage &amp; Analytics [9 Active Providers]
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-purple-300 bg-purple-950/80 px-2.5 py-0.5 rounded border border-purple-800/40">
                Live Mesh Connected
              </span>
            </div>
          </div>

          <div className="relative bg-black">
            <img
              src="/router.png"
              alt="Dardcor Router v1.0.0 Multi-Provider Mesh and Token Analytics Dashboard"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>

        {/* 3 Pillar Cards below router screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-purple-900/30">
          <div className="p-5 rounded-xl bg-black/50 border border-purple-900/30">
            <div className="w-9 h-9 rounded-lg bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-300 mb-3">
              <Activity size={18} />
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">Universal Provider Mesh</h4>
            <p className="text-xs text-[#b3a8c9] leading-relaxed">
              Connect to Antigravity, Cline, Gemini CLI, Grok, and local endpoints without vendor lock-in or separate subscription walls.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-black/50 border border-purple-900/30">
            <div className="w-9 h-9 rounded-lg bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-300 mb-3">
              <Database size={18} />
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">Context Cache Acceleration</h4>
            <p className="text-xs text-[#b3a8c9] leading-relaxed">
              99M+ cached tokens recorded with automated prompt prefix caching, reducing API latency and slashing bills.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-black/50 border border-purple-900/30">
            <div className="w-9 h-9 rounded-lg bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-300 mb-3">
              <ShieldCheck size={18} />
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">Air-Gapped &amp; Local Storage</h4>
            <p className="text-xs text-[#b3a8c9] leading-relaxed">
              Tokens, credentials, and logs are stored locally under ~/.dardcor/ with zero telemetry exfiltration.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
