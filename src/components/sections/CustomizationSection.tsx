import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Settings2,
  FileCode2,
  Network,
  Puzzle,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Terminal,
} from 'lucide-react';

interface CustomizationCard {
  id: 'instructions' | 'mcp' | 'plugins';
  title: string;
  category: string;
  icon: typeof FileCode2;
  description: string;
  codeSnippet: string;
  filename: string;
}

const cards: CustomizationCard[] = [
  {
    id: 'instructions',
    title: 'Custom instructions',
    category: 'Context & Rules',
    icon: Sliders,
    description:
      'Ensure agents adhere strictly to your team conventions, security mandates, and architectural patterns via markdown instruction files.',
    filename: '.dardcor/instructions.md',
    codeSnippet: `# Team Coding Standards
- All new components must use TypeScript strict mode.
- Avoid using loose 'any'; declare explicit 'import type'.
- Unit tests must be co-located in __tests__ directory.
- Verify zero security vulnerabilities before submitting PR.`,
  },
  {
    id: 'mcp',
    title: 'MCP servers',
    category: 'Tool Integration',
    icon: Network,
    description:
      'Connect agents securely to your external tools and databases using Model Context Protocol (MCP) servers including GitHub, PostgreSQL, Linear, and AWS.',
    filename: '.dardcor/mcp.json',
    codeSnippet: `{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/dev"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}`,
  },
  {
    id: 'plugins',
    title: 'Agent plugins/extensions',
    category: 'Ecosystem',
    icon: Puzzle,
    description:
      'Build or install specialized agent skills, domain tools, custom slash commands, and multi-agent workflow extensions from the marketplace.',
    filename: 'agent-extension.json',
    codeSnippet: `{
  "name": "security-auditor-agent",
  "version": "1.2.0",
  "skills": ["secret-scanning", "ast-taint-analysis", "sast-checks"],
  "triggers": ["pre-commit", "pull-request"]
}`,
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

export default function CustomizationSection() {
  const [selectedId, setSelectedId] = useState<'instructions' | 'mcp' | 'plugins'>('instructions');

  const activeCard = cards.find((c) => c.id === selectedId) ?? cards[0];

  return (
    <section
      id="customization"
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
            <Settings2 size={13} className="text-dc-600" />
            <span>Developer Control</span>
          </motion.div>

          <motion.h2
            variants={itemAnim}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight"
          >
            Your rules, your agents
          </motion.h2>

          <motion.p
            variants={itemAnim}
            className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed"
          >
            Ensure agents follow your practices and team workflows. Define custom instructions, add agent skills, or build custom agents tailored to your project.
          </motion.p>
        </div>

        {/* 3 Core Customization Cards */}
        <motion.div
          variants={itemAnim}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            const isSelected = card.id === selectedId;

            return (
              <div
                key={card.id}
                onClick={() => setSelectedId(card.id)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-surface-card border-dc-400 shadow-lg ring-1 ring-dc-400/20'
                    : 'bg-surface-card/60 border-border-default hover:border-border-hover'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-dc-600 text-white'
                          : 'bg-dc-50 text-dc-600'
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <span className="text-[11px] font-mono text-dc-600 bg-dc-50/70 px-2 py-0.5 rounded border border-dc-100">
                      {card.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-semibold text-text-primary mb-2">
                    {card.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border-default flex items-center justify-between text-xs font-mono text-dc-600">
                  <span>{isSelected ? 'Viewing preview' : 'Click to inspect'}</span>
                  <ArrowRight size={13} className={isSelected ? 'translate-x-1 transition-transform' : ''} />
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Interactive Configuration Inspector Preview */}
        <motion.div
          variants={itemAnim}
          className="rounded-2xl border border-border-default bg-[#151520] shadow-2xl overflow-hidden"
        >
          {/* Mockup Title bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#101018] border-b border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Terminal size={14} className="text-dc-400" />
              <span className="font-semibold text-white">{activeCard.filename}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{activeCard.title}</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <CheckCircle2 size={12} />
              <span>Loaded by agent runtime</span>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm bg-[#12121a] overflow-x-auto leading-relaxed text-slate-200">
            <pre className="whitespace-pre m-0">{activeCard.codeSnippet}</pre>
          </div>
        </motion.div>

        {/* Section Bottom CTA */}
        <motion.div
          variants={itemAnim}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-surface-card border border-border-default"
        >
          <div>
            <span className="text-sm font-semibold text-text-primary block">
              Supercharge workflows with Model Context Protocol
            </span>
            <span className="text-xs text-text-secondary">
              Connect external databases, APIs, git providers, and enterprise systems directly to agent reasoning loops.
            </span>
          </div>

          <Link
            to="/features/customizations"
            className="inline-flex items-center gap-2 bg-dc-600 hover:bg-dc-500 text-white font-semibold rounded-lg shadow hover:shadow-md transition-all px-5 py-2.5 text-xs sm:text-sm whitespace-nowrap"
          >
            <span>Connect to external tools with MCP servers</span>
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
