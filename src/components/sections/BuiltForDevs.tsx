import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Zap, CheckCircle, Code2, Users, Globe } from 'lucide-react';

const trustItems = [
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    desc: 'Your code never leaves your machine. Zero telemetry, full encryption, and local-first architecture.',
  },
  {
    icon: Code2,
    title: 'Production-Ready Artifacts',
    desc: 'Thoroughly designed code with comprehensive verification tests. Ship with confidence.',
  },
  {
    icon: Users,
    title: 'Built for Teams of All Sizes',
    desc: 'From solo developers to enterprise organizations — scales with your needs.',
  },
  {
    icon: Globe,
    title: 'Cross-Platform Native',
    desc: 'Fully compatible with macOS, Windows, and Linux. One seamless experience everywhere.',
  },
];

const metrics = [
  { value: '100K+', label: 'Active developers' },
  { value: '50K+', label: 'Projects shipped' },
  { value: '99.9%', label: 'Uptime guarantee' },
  { value: '4.9/5', label: 'Developer satisfaction' },
];

const features = [
  {
    icon: Zap,
    title: 'Autonomous Execution',
    desc: 'Agents plan, code, test, and debug without constant supervision. You focus on architecture.',
  },
  {
    icon: CheckCircle,
    title: 'Verification Built-In',
    desc: 'Every change is automatically tested. Agents run your test suite and fix failures on their own.',
  },
  {
    icon: Shield,
    title: 'Self-Healing System',
    desc: 'Broken config? Failed dependency? The agent diagnoses and repairs automatically.',
  },
];

export default function BuiltForDevs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-dc-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
            Built for developers{' '}
            <span className="text-gradient-blue">for the agent-first era</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
            Dardcor Code is designed for developer trust — whether you are a professional
            engineer in a large codebase or a hobbyist exploring the cutting edge.
          </p>
        </motion.div>

        {/* Trust / Reliability Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-24">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="glass rounded-xl p-5 border border-border-subtle"
            >
              <item.icon size={20} className="text-dc-400 mb-3" />
              <h3 className="text-sm font-semibold text-text-primary mb-1.5">{item.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-strong rounded-2xl border border-border-default p-8 sm:p-10 mb-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gradient">{m.value}</div>
                <div className="text-sm text-text-tertiary mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + 0.1 * i }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-dc-500/10 flex items-center justify-center shrink-0 mt-1">
                <f.icon size={20} className="text-dc-400" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">{f.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
