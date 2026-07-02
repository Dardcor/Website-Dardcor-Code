import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Shield, Zap, CheckCircle, Code2, Users, Globe, ArrowRight } from 'lucide-react';

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

function AnimatedMetric({ value, label, isInView }: { value: string; label: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  const match = value.match(/([\d.]+)(.*)/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const isFloat = value.includes('.');

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const duration = 2000;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCount(target * easeOut);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };

      requestAnimationFrame(step);
    }
  }, [isInView, target]);

  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-serif font-bold text-gradient">
        {isFloat ? count.toFixed(1) : Math.floor(count)}{suffix}
      </div>
      <div className="text-sm text-text-tertiary mt-2">{label}</div>
    </div>
  );
}

export default function BuiltForDevs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-dc-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text-primary tracking-tight">
            Built for developers <span className="text-gradient-cyan">for the agent-first era</span>
          </h2>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Dardcor Code is designed for developer trust — whether you are a professional
            engineer in a large codebase or a hobbyist exploring the cutting edge.
          </p>
        </motion.div>

        {/* Trust / Reliability Section - 2x2 Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i, ease: "easeOut" }}
              className="glass rounded-2xl p-6 border border-border-subtle relative group hover:border-border-strong transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-dc-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <item.icon size={24} className="text-dc-400" />
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Metrics Row with Animated Counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-strong rounded-3xl border border-border-default p-10 sm:p-12 mb-32 shadow-2xl shadow-dc-900/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {metrics.map((m) => (
              <AnimatedMetric key={m.label} value={m.value} label={m.label} isInView={isInView} />
            ))}
          </div>
        </motion.div>

        {/* Features Timeline Layout */}
        <div className="max-w-3xl mx-auto relative">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
            className="absolute left-[27px] top-[40px] bottom-[40px] w-0.5 bg-gradient-to-b from-dc-500/50 via-dc-400/20 to-transparent origin-top hidden sm:block"
          />
          
          <div className="flex flex-col gap-12 sm:gap-16">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + 0.15 * i, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-6 sm:gap-10 relative z-10"
              >
                <div className="flex items-center sm:items-start shrink-0">
                  <div className="w-14 h-14 rounded-full bg-background border-2 border-border-default flex items-center justify-center shrink-0 shadow-lg shadow-dc-900/10">
                    <f.icon size={24} className="text-dc-400" />
                  </div>
                </div>
                <div className="pt-0 sm:pt-3">
                  <h3 className="text-xl font-bold text-text-primary mb-3 flex items-center gap-2">
                    {f.title}
                    {i === 0 && <ArrowRight size={16} className="text-dc-400/50" />}
                  </h3>
                  <p className="text-base text-text-secondary leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
