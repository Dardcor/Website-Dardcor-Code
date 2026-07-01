import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Terminal, Package, Columns3, ArrowRight } from 'lucide-react';

const products = [
  {
    title: 'Dardcor Code',
    desc: 'AI-powered IDE with autonomous agent integration. Tab completions, inline commands, and a side panel agent that ships features for you.',
    icon: Code2,
    gradient: 'from-dc-500/20 to-purple-500/10',
    iconBg: 'bg-dc-500/15',
    iconColor: 'text-dc-400',
  },
  {
    title: 'Dardcor CLI',
    desc: 'Terminal-native agent for rapid coding sessions. Zero overhead, perfect for automation pipelines, scripting, and remote workspaces.',
    icon: Terminal,
    gradient: 'from-blue-500/20 to-cyan-500/10',
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-400',
  },
  {
    title: 'Dardcor SDK',
    desc: 'Extend and build custom agents with our TypeScript SDK. Plug into any LLM, add custom tools, and deploy your own agentic workflows.',
    icon: Package,
    gradient: 'from-emerald-500/20 to-teal-500/10',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
  },
  {
    title: 'Dardcor Manager',
    desc: 'Mission control for orchestrating multiple agents across workspaces. Monitor, delegate, and observe parallel agent execution in real-time.',
    icon: Columns3,
    gradient: 'from-amber-500/20 to-orange-500/10',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function ProductCards() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dc-500/[0.02] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
            Everything you need to{' '}
            <span className="text-gradient">build the new way</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
            From IDE to CLI to SDK — Dardcor Code is a complete platform for the agent-first era.
          </p>
        </motion.div>

        {/* Product Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {products.map((p) => (
            <motion.div
              key={p.title}
              variants={cardVariants}
              className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-b ${p.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Card border */}
              <div className="relative h-full bg-surface-card/80 backdrop-blur-sm border border-border-subtle group-hover:border-border-default rounded-2xl p-6 transition-all duration-300">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${p.iconBg} flex items-center justify-center mb-5`}>
                  <p.icon size={24} className={p.iconColor} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-text-primary mb-3">{p.title}</h3>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  {p.desc}
                </p>

                {/* CTA */}
                <Link
                  to="/release"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-dc-400 hover:text-dc-300 transition-colors group/link"
                >
                  Learn more
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
