import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';

const stages = [
  { label: 'Plan', desc: 'Architecture' },
  { label: 'Code', desc: 'Implementation' },
  { label: 'Test', desc: 'Verification' },
  { label: 'Ship', desc: 'Deployment' },
];

function AgentFlow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
    const interval = 2400;
    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const cycle = elapsed % interval;
      const pct = cycle / interval;
      setProgress(pct);
      setActiveIndex(pct < 0.25 ? 0 : pct < 0.5 ? 1 : pct < 0.75 ? 2 : 3);
    };
    const id = setInterval(tick, 32);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative flex items-center justify-between">
        {stages.map((stage, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;
          return (
            <div key={stage.label} className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-700 ${
                  isActive
                    ? 'bg-dc-500 text-white shadow-[0_0_16px_rgba(108,74,226,0.25)] scale-110'
                    : isPast
                    ? 'bg-dc-100 text-dc-600'
                    : 'bg-black/[0.04] text-text-tertiary'
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`mt-3 text-sm font-semibold font-display transition-all duration-500 ${
                  isActive ? 'text-text-primary' : 'text-text-tertiary'
                }`}
              >
                {stage.label}
              </span>
              <span
                className={`text-[11px] font-sans transition-all duration-500 ${
                  isActive ? 'text-text-secondary' : 'text-text-tertiary/50'
                }`}
              >
                {stage.desc}
              </span>
            </div>
          );
        })}
        <div className="absolute top-5 left-[calc(10px)] right-[calc(10px)] h-px -translate-y-1/2 bg-black/[0.06]">
          <div
            className="h-full bg-gradient-to-r from-dc-500 via-dc-400 to-dc-500 transition-all duration-300"
            style={{ width: `${(activeIndex + progress * 0.25) * 33.33}%` }}
          />
        </div>
      </div>
      <div className="mt-8 text-center">
        <span className="inline-flex items-center gap-2 text-xs text-text-secondary font-mono bg-dc-50/50 px-4 py-2 rounded-full border border-dc-100">
          <span className="w-1.5 h-1.5 rounded-full bg-dc-500 animate-pulse-dot" />
          Agent cycle: <span className="text-dc-600 font-semibold">{stages[activeIndex].label}</span>
          <span className="text-text-tertiary">autonomous</span>
        </span>
      </div>
    </div>
  );
}

const containerAnim = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const itemAnim: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function MarqueeText() {
  const items = [
    'React', 'TypeScript', 'Node.js', 'Python', 'Go', 'Rust',
    'Next.js', 'Vite', 'Tailwind', 'PostgreSQL', 'Docker', 'Kubernetes',
    'React', 'TypeScript', 'Node.js', 'Python', 'Go', 'Rust',
    'Next.js', 'Vite', 'Tailwind', 'PostgreSQL', 'Docker', 'Kubernetes',
  ];

  return (
    <div className="w-full overflow-hidden py-3 border-y border-border-default">
      <div className="animate-marquee flex gap-12 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-xs text-text-tertiary/30 font-mono">
            <span className="w-1 h-1 rounded-full bg-dc-300" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-8 px-4 sm:px-6 overflow-hidden">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[70%] bg-gradient-radial from-dc-300/10 via-dc-400/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-surface-base via-surface-base/80 to-transparent pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          variants={containerAnim}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20"
        >
          <div className="w-full lg:w-[52%] flex flex-col items-start text-left">
            <motion.div
              variants={itemAnim}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-dc-50/40 border border-dc-100 text-xs text-text-secondary mb-8 hover:border-dc-300 transition-all duration-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-dc-500 animate-pulse-dot" />
              v1.0 now available — free for individual developers
              <span className="w-px h-3 bg-dc-200 mx-1" />
              <a
                href="https://github.com/Dardcor/Dardcor-Code"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-text-tertiary hover:text-text-primary transition-colors"
              >
                <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                GitHub
              </a>
            </motion.div>

            <motion.h1 variants={itemAnim} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.05] tracking-tight">
              <span className="text-text-primary">Engineering at </span>
              <span className="animated-gradient-text">agent velocity</span>
            </motion.h1>

            <motion.p
              variants={itemAnim}
              className="mt-6 text-lg sm:text-xl text-text-secondary max-w-xl leading-relaxed"
            >
              Dardcor Code embeds autonomous agents directly into your editor.
              Describe what you need — the agent plans, writes, tests, and deploys.
              You stay in control, review every change, and ship faster.
            </motion.p>

            <motion.div variants={itemAnim} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/release"
                className="group relative inline-flex items-center gap-2.5 bg-dc-600 hover:bg-dc-500 text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-dc-600/20 hover:shadow-dc-500/30 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Download Free</span>
                <ArrowRight size={16} className="relative group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#showcase"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-semibold text-text-secondary hover:text-text-primary border border-border-default hover:border-dc-300 transition-all duration-300"
              >
                <Terminal size={16} className="text-dc-500 group-hover:scale-110 transition-transform" />
                See how it works
              </a>
            </motion.div>
          </div>

          <motion.div variants={itemAnim} className="w-full lg:w-[48%]">
            <div className="relative">
              <div className="absolute -inset-16 bg-gradient-radial from-dc-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="relative bg-surface-card backdrop-blur-xl border border-border-default rounded-2xl p-8 sm:p-10 shadow-xl hover:border-dc-300 transition-all duration-500">
                <div className="flex items-center gap-3 mb-8 pb-5 border-b border-border-default">
                  <div className="w-8 h-8 rounded-lg bg-dc-50 flex items-center justify-center">
                    <Terminal size={16} className="text-dc-600" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-text-primary font-display">Agent Execution Flow</span>
                    <span className="text-[11px] text-text-tertiary block">Autonomous deployment cycle</span>
                  </div>
                </div>
                <AgentFlow />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <MarqueeText />
      </div>
    </section>
  );
}
