import { Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  Building2,
  Key,
  Users,
  Download,
  ArrowRight,
  FileCheck,
} from 'lucide-react';

const enterprisePillars = [
  {
    icon: Lock,
    title: 'Zero-Egress & Air-Gapped Readiness',
    desc: 'Deploy Dardcor Code within isolated internal networks without internet connectivity. Pair with local Ollama or vLLM inference clusters to keep proprietary code completely within your security perimeter.',
  },
  {
    icon: Shield,
    title: 'Sandboxed Terminal & Domain Filter',
    desc: 'Restrict autonomous agent terminal execution with policy engines. Enforce network domain allowlists to prevent unauthorized socket connections and data exfiltration.',
  },
  {
    icon: Key,
    title: 'Enterprise Identity & Machine Fingerprinting',
    desc: 'Bind sessions to machine identity tokens and manage API keys locally under ~/.dardcor/provider/auth/ without external vendor telemetry.',
  },
  {
    icon: FileCheck,
    title: 'Comprehensive Audit Logs',
    desc: 'Detailed request inspection logs and tool call histories are saved locally under ~/.dardcor/provider/system/usage/ for regulatory compliance and security reviews.',
  },
  {
    icon: Building2,
    title: 'Private Cloud & Container Deployment',
    desc: 'Run headless Dardcor CLI runners in your existing Kubernetes or Docker CI/CD pipelines to triage bugs and perform automated repo-wide refactorings.',
  },
  {
    icon: Users,
    title: 'Centralized Team Rules',
    desc: 'Standardize coding policies, security rules, and architectural mandates across development teams using repository-level instructions files.',
  },
];

export default function FeaturesEnterprisePage() {
  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <section className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-eyebrow mb-2">Security &amp; Compliance</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Dardcor Code for Enterprise
            </h1>
            <p className="text-base sm:text-lg text-[#b3a8c9] leading-relaxed">
              Equip your engineering teams with autonomous AI development while preserving rigorous data confidentiality, air-gapped readiness, and terminal execution controls.
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
                <span>Security Documentation</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {enterprisePillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="bg-[#08040e] border border-[#6a1b9a] rounded-2xl p-6 sm:p-8 hover:border-[#8e24aa] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-300 mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-[#b3a8c9] leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </main>
  );
}
