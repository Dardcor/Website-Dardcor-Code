import { motion, type Variants } from 'framer-motion';
import { Bot, GitBranch, Shield, Workflow, TestTube, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Bot,
    title: 'Describe what you need',
    desc: 'Write a sentence in natural language or link an issue. The agent parses the request and produces a plan — architecture, dependencies, and test strategy — before writing a single line of code.',
    detail: 'Works with GitHub issues, Jira tickets, or plain text.',
  },
  {
    icon: GitBranch,
    title: 'Review the plan',
    desc: 'The agent presents a detailed implementation plan as a diff preview. You approve, request changes, or iterate before any code is committed.',
    detail: 'Every agent action is reviewed before it reaches your codebase.',
  },
  {
    icon: TestTube,
    title: 'Build and verify',
    desc: 'The agent writes production code, generates tests, runs your existing suite, and fixes failures autonomously. It iterates until all checks pass.',
    detail: 'Supports Jest, Vitest, pytest, Go test, and any custom test runner.',
  },
  {
    icon: Rocket,
    title: 'Ship with confidence',
    desc: 'The agent opens a PR with a full description, test results, and deployment instructions — or deploys directly if configured. You get the final say.',
    detail: 'One-click rollback if something goes wrong in production.',
  },
];

const capabilities = [
  {
    icon: Workflow,
    title: 'Context-aware',
    desc: 'Agents read your entire project — codebase, configs, docs — before making decisions. No hallucinations from missing context.',
  },
  {
    icon: Shield,
    title: 'Runs locally',
    desc: 'All agent computation happens on your machine. Your code, secrets, and API keys never leave your environment.',
  },
  {
    icon: TestTube,
    title: 'Framework-agnostic',
    desc: 'Works with any language, framework, or stack. No proprietary DSL to learn. Agents adapt to your conventions.',
  },
];

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-eyebrow mb-3">How it works</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
            From idea to pull request
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            The agent handles the implementation cycle. You stay in control at every decision point.
          </p>
        </motion.div>

        <div className="space-y-3 mb-24">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              custom={i}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="group relative flex items-start gap-5 p-5 sm:p-6 rounded-2xl hover:bg-dc-50/30 transition-colors"
            >
              <div className="hidden sm:flex absolute left-8 top-20 bottom-0 w-px bg-border-default group-last:hidden" />
              <div className="w-12 h-12 rounded-xl bg-dc-50 border border-dc-100 flex items-center justify-center shrink-0 group-hover:bg-dc-100 group-hover:border-dc-300 transition-all duration-300">
                <step.icon size={20} className="text-dc-600" />
              </div>
              <div className="pt-1 min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-xs font-mono text-dc-400">0{i + 1}</span>
                  <h3 className="text-lg font-semibold text-text-primary font-display">{step.title}</h3>
                </div>
                <p className="text-base text-text-secondary leading-relaxed max-w-2xl">{step.desc}</p>
                <p className="mt-2 text-sm text-text-tertiary">{step.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-eyebrow mb-3">Why it&apos;s different</span>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-text-primary">
            Designed for professional teams
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              className="card-base p-6 hover:-translate-y-1 hover:shadow-lg hover:shadow-dc-500/5 transition-all duration-400"
            >
              <div className="w-10 h-10 rounded-lg bg-dc-50 flex items-center justify-center mb-4">
                <cap.icon size={18} className="text-dc-600" />
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-2 font-display">{cap.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
