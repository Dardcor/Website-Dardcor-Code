import { Link } from 'react-router-dom';
import {
  FileCode,
  Boxes,
  ShieldCheck,
  Puzzle,
  Download,
  ArrowRight,
} from 'lucide-react';

const customizationFeatures = [
  {
    icon: FileCode,
    title: 'Custom Instructions (.dardcor/instructions.md)',
    desc: 'Define coding conventions, forbidden patterns, preferred frameworks, and architectural rules that agents follow strictly on every prompt.',
  },
  {
    icon: Boxes,
    title: 'Model Context Protocol (.dardcor/mcp.json)',
    desc: 'Equip agents with external databases, cloud services, and headless browsers by configuring standardized MCP tool servers.',
  },
  {
    icon: Puzzle,
    title: 'Domain Agent Skills',
    desc: 'Package reusable workflows and domain expertise into markdown skill files that agents load automatically when relevant.',
  },
  {
    icon: ShieldCheck,
    title: 'Approval & Security Policies',
    desc: 'Set per-command auto-approval rules or force interactive confirmation cards on sensitive file modifications and terminal commands.',
  },
];

export default function FeaturesCustomizationsPage() {
  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <section className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-eyebrow mb-2">Tailored Workflows</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Agent Customization
            </h1>
            <p className="text-base sm:text-lg text-[#b3a8c9] leading-relaxed">
              Ensure autonomous agents respect your team guidelines, architecture standards, and security mandates. Define custom rules, configure MCP tool servers, and extend agent abilities.
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
                to="/mcp"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-purple-200 border border-purple-800/50 hover:border-purple-500 transition-colors"
              >
                <span>Explore MCP Servers</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {customizationFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-[#08040e] border border-[#6a1b9a] rounded-2xl p-6 sm:p-8 hover:border-[#8e24aa] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-300 mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-[#b3a8c9] leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </main>
  );
}
