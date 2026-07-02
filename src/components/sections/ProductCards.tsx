import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Code2, Terminal, Package, Columns3, ArrowRight } from 'lucide-react';

const products = [
  {
    title: 'Dardcor Code',
    desc: 'AI-powered IDE with autonomous agent integration. Tab completions, inline commands, and a side panel agent that ships features for you.',
    icon: Code2,
    gradient: 'from-dc-500/20 to-purple-500/10',
    iconBg: 'bg-dc-500/15',
    iconColor: 'text-dc-400',
    glowClass: 'glow-violet',
    span: 'md:col-span-8 md:row-span-2',
    height: 'min-h-[380px]',
  },
  {
    title: 'Dardcor CLI',
    desc: 'Terminal-native agent for rapid coding sessions. Zero overhead, perfect for automation pipelines, scripting, and remote workspaces.',
    icon: Terminal,
    gradient: 'from-blue-500/20 to-cyan-500/10',
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-400',
    glowClass: 'glow-cyan',
    span: 'md:col-span-4',
    height: 'min-h-[240px]',
  },
  {
    title: 'Dardcor SDK',
    desc: 'Extend and build custom agents with our TypeScript SDK. Plug into any LLM, add custom tools, and deploy your own agentic workflows.',
    icon: Package,
    gradient: 'from-emerald-500/20 to-teal-500/10',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    glowClass: 'glow-cyan',
    span: 'md:col-span-5',
    height: 'min-h-[280px]',
  },
  {
    title: 'Dardcor Manager',
    desc: 'Mission control for orchestrating multiple agents across workspaces. Monitor, delegate, and observe parallel agent execution in real-time.',
    icon: Columns3,
    gradient: 'from-amber-500/20 to-orange-500/10',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    glowClass: 'glow-amber',
    span: 'md:col-span-7',
    height: 'min-h-[280px]',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function ProductCards() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 gradient-bg">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center md:text-left mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
              Everything you need to{' '}
              <span className="text-gradient block mt-2">build the new way</span>
            </h2>
          </div>
          <p className="text-lg text-text-secondary max-w-md">
            From IDE to CLI to SDK — Dardcor Code is a complete platform for the agent-first era.
          </p>
        </motion.div>

        {/* Product Cards Grid - Asymmetric Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8"
        >
          {products.map((p) => (
            <motion.div
              key={p.title}
              variants={cardVariants}
              className={`relative ${p.span} w-full`}
              style={{ perspective: 1000 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, rotateX: 3, rotateY: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`group relative h-full rounded-2xl overflow-hidden card-hover ${p.glowClass}`}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Card content */}
                <div className={`relative h-full flex flex-col bg-surface-card/80 backdrop-blur-sm border border-border-subtle group-hover:border-border-default rounded-2xl p-6 sm:p-7 transition-all duration-500 z-10 ${p.height}`}>
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${p.iconBg} flex items-center justify-center mb-8`}>
                    <p.icon size={24} className={p.iconColor} />
                  </div>

                  <div className="mt-auto">
                    {/* Title */}
                    <h3 className="font-serif text-2xl font-semibold text-text-primary mb-3">{p.title}</h3>

                    {/* Description */}
                    <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-md">
                      {p.desc}
                    </p>

                    {/* CTA */}
                    <Link
                      to="/release"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-dc-400 group/link"
                    >
                      Learn more
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
