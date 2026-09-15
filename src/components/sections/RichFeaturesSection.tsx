import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Terminal,
  Play,
  GitBranch,
  Wrench,
  History,
  Palette,
  Accessibility,
  Globe,
} from 'lucide-react';

const containerAnim: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemAnim: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const features = [
  {
    icon: Terminal,
    title: 'Integrated terminal',
    desc: 'Use your favorite shell whether it\'s zsh, pwsh, or git bash, all inside the editor.',
    href: '#',
  },
  {
    icon: Play,
    title: 'Run code',
    desc: 'Run and debug your code without leaving your editor.',
    href: '#',
  },
  {
    icon: GitBranch,
    title: 'Version control',
    desc: 'Built-in support for git and many other source control providers.',
    href: '#',
  },
  {
    icon: Wrench,
    title: 'Build tasks',
    desc: 'Run tools and analyze their results from within Dardcor Code.',
    href: '#',
  },
  {
    icon: History,
    title: 'Local history',
    desc: 'Never lose your changes with automatically tracked local history.',
    href: '#',
  },
  {
    icon: Palette,
    title: 'Themes',
    desc: 'Your theme is an extension of your personality. Add some flair to your editor and add your touch.',
    href: '#',
  },
  {
    icon: Accessibility,
    title: 'Accessibility',
    desc: 'Optimized experience for screen readers, high contrast themes, and keyboard-only navigation.',
    href: '#',
  },
  {
    icon: Globe,
    title: 'Web support',
    desc: 'Whether you are on your phone, tablet, or desktop, you can access your code from anywhere.',
    href: '#',
  },
];

export default function RichFeaturesSection() {
  return (
    <section
      id="rich-features"
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
          <motion.span variants={itemAnim} className="section-eyebrow mb-3">
            Rich features
          </motion.span>
          <motion.h2
            variants={itemAnim}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight"
          >
            Code with rich features
          </motion.h2>
          <motion.p
            variants={itemAnim}
            className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed"
          >
            There's a lot more to an editor. Whether it's using built-in features or rich
            extensions, there's something for everyone.
          </motion.p>
        </div>

        {/* 8-card grid */}
        <motion.div
          variants={containerAnim}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.a
                key={feat.title}
                href={feat.href}
                variants={itemAnim}
                className="group card-base p-6 hover:-translate-y-1 hover:shadow-lg hover:shadow-dc-500/5 transition-all duration-400 block"
              >
                <div className="w-10 h-10 rounded-lg bg-dc-50 flex items-center justify-center mb-4 group-hover:bg-dc-100 transition-colors duration-300">
                  <Icon size={18} className="text-dc-600" />
                </div>
                <h3 className="text-sm font-display font-semibold text-text-primary mb-2 group-hover:text-dc-600 transition-colors duration-300">
                  {feat.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">{feat.desc}</p>
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
