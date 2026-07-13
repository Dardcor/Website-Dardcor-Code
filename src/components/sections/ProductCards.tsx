import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Code2, Terminal, Package, Columns3, ArrowRight } from 'lucide-react';

const products = [
  {
    title: 'Dardcor Code',
    desc: 'The agent-first IDE. Autonomous agents plan, implement, test, and deploy from within your editor. Features tab completions, inline commands, and a side panel agent.',
    icon: Code2,
    accent: 'from-dc-50 to-dc-100/30',
    iconBg: 'bg-dc-50',
    iconColor: 'text-dc-600',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    title: 'Dardcor CLI',
    desc: 'Terminal-native agent for scripting, automation, and rapid prototyping. Zero overhead — runs in any shell, on any machine.',
    icon: Terminal,
    accent: 'from-cyan-50 to-cyan-100/30',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-accent',
    span: 'md:col-span-1',
  },
  {
    title: 'Dardcor SDK',
    desc: 'Build custom agents with the TypeScript SDK. Connect any LLM, add custom tools, define workflows, and integrate into your existing pipeline.',
    icon: Package,
    accent: 'from-dc-50 to-dc-100/30',
    iconBg: 'bg-dc-50',
    iconColor: 'text-dc-600',
    span: 'md:col-span-1',
  },
  {
    title: 'Dardcor Manager',
    desc: 'Orchestrate multiple agents across workspaces and repositories. Monitor execution, delegate tasks, and observe parallel agent workflows in real time.',
    icon: Columns3,
    accent: 'from-cyan-50 to-cyan-100/30',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-accent',
    span: 'md:col-span-2',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ProductCards() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left mb-16 md:mb-20"
        >
          <span className="section-eyebrow mb-3">Product ecosystem</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight max-w-3xl">
              A complete agent platform
            </h2>
            <p className="text-text-secondary max-w-md leading-relaxed">
              IDE, CLI, SDK, orchestrator — the tools you need to adopt agentic development on your terms.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {products.map((p) => (
            <motion.div
              key={p.title}
              variants={cardVariants}
              className={`relative ${p.span} w-full`}
            >
              <div className="group relative h-full card-base p-6 sm:p-8 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-dc-500/10 transition-all duration-500">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-11 h-11 rounded-xl ${p.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <p.icon size={22} className={p.iconColor} />
                  </div>

                  <div className="flex flex-col flex-1">
                    <h3 className="font-display text-xl font-bold text-text-primary mb-3 group-hover:text-dc-600 transition-colors duration-300">
                      {p.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                      {p.desc}
                    </p>
                    <Link
                      to="/release"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-dc-600 group/link"
                    >
                      <span>Learn more</span>
                      <ArrowRight size={14} className="transition-all duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
