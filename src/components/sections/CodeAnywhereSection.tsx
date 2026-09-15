import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { GitBranch, Cloud, Globe, ArrowRight } from 'lucide-react';

const containerAnim: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemAnim: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const cards = [
  {
    icon: GitBranch,
    title: 'Built-in Source Control',
    desc: 'Empowers you with Git support out-of-the-box. Many other source control providers are available through extensions.',
    href: '#',
    color: 'text-dc-600',
    bg: 'bg-dc-50',
  },
  {
    icon: Cloud,
    title: 'GitHub Codespaces',
    desc: 'Provides cloud-powered development environments for any activity, whether it\'s a long-term project or reviewing a pull request.',
    href: '#',
    color: 'text-cyan-accent',
    bg: 'bg-cyan-50',
  },
  {
    icon: Globe,
    title: 'Dardcor Code for the Web',
    desc: 'Access your code from anywhere in the browser with zero installation required. Start coding instantly on any device.',
    href: '#',
    color: 'text-dc-600',
    bg: 'bg-dc-50',
  },
];

export default function CodeAnywhereSection() {
  return (
    <section
      id="code-anywhere"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <motion.div
        variants={containerAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="flex flex-col gap-12"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            variants={itemAnim}
            className="section-eyebrow mb-3"
          >
            Code anywhere
          </motion.span>
          <motion.h2
            variants={itemAnim}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight"
          >
            Code anywhere
          </motion.h2>
          <motion.p
            variants={itemAnim}
            className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed"
          >
            Code wherever you're most productive, whether you're connected to the cloud,
            a remote repository, or in the browser with Dardcor Code for the Web.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerAnim}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={itemAnim}
                className="group card-base p-6 sm:p-8 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-dc-500/10 transition-all duration-500"
              >
                <div className={`w-11 h-11 rounded-xl ${card.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className={card.color} />
                </div>
                <h3 className="font-display text-lg font-bold text-text-primary mb-3 group-hover:text-dc-600 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1">
                  {card.desc}
                </p>
                <a
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-dc-600 group/link"
                >
                  <span>Learn more</span>
                  <ArrowRight size={14} className="transition-all duration-300 group-hover/link:translate-x-1" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
