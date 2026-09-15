import { Link } from 'react-router-dom';
import {
  Code2,
  Blocks,
  Download,
  ArrowRight,
  Wrench,
  Package,
} from 'lucide-react';

const extensibilityFeatures = [
  {
    icon: Package,
    title: 'Open Extension Marketplace Compatibility',
    desc: 'Install any of the 80k+ extensions available on the open marketplace. Themes, debuggers, language packs, and linters work with zero modifications.',
  },
  {
    icon: Code2,
    title: 'Rich Extension APIs',
    desc: 'Build custom extensions using the comprehensive VS Code extension API. Interact with active text editors, language servers, and status bars.',
  },
  {
    icon: Blocks,
    title: 'Agent Tool & Skill Authoring',
    desc: 'Create bespoke tools for your autonomous agents. Define JSON Schema parameter specs, descriptions, and handlers that agents invoke automatically.',
  },
  {
    icon: Wrench,
    title: 'Model Context Protocol Integrations',
    desc: 'Connect internal microservices and databases through MCP servers. Distribute tools to your team via npm, Docker, or native binaries.',
  },
];

export default function FeaturesExtensibilityPage() {
  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <section className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-eyebrow mb-2">Infinite Possibilities</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Extensibility &amp; Marketplace
            </h1>
            <p className="text-base sm:text-lg text-[#b3a8c9] leading-relaxed">
              Extend Dardcor Code with thousands of extensions, custom language servers, Model Context Protocol servers, and proprietary agent tools.
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
                to="/api"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-purple-200 border border-purple-800/50 hover:border-purple-500 transition-colors"
              >
                <span>Read Extension API</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {extensibilityFeatures.map((f) => {
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
