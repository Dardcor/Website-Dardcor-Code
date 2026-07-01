import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Code2, Bug, Sparkles } from 'lucide-react';

const slides = [
  {
    label: 'Agent-Powered Editor',
    desc: 'Plan, code, and ship with autonomous agents that understand your entire codebase.',
    icon: Code2,
  },
  {
    label: 'Intelligent Debugging',
    desc: 'Agents that diagnose, fix, and verify bugs automatically — no context switching.',
    icon: Bug,
  },
  {
    label: 'Smart Completions',
    desc: 'Context-aware code generation that learns your patterns and project architecture.',
    icon: Sparkles,
  },
];

export default function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const next = () => setActiveIndex((i) => (i + 1) % slides.length);
  const prev = () => setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
  const ActiveIcon = slides[activeIndex].icon;

  return (
    <section id="showcase" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-base via-dc-500/[0.02] to-surface-base pointer-events-none" />

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
            See it in{' '}
            <span className="text-gradient">action</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
            Watch Dardcor Code autonomously plan, build, and verify production-grade applications.
          </p>
        </motion.div>

        {/* Showcase Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group"
        >
          {/* Main Showcase Image */}
          <div className="glass-strong rounded-2xl overflow-hidden border border-border-default shadow-2xl shadow-black/20">
            {/* Window Header */}
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500/80" />
              <div className="terminal-dot bg-yellow-500/80" />
              <div className="terminal-dot bg-green-500/80" />
              <div className="ml-auto text-[11px] text-text-tertiary font-mono">
                showcase — Dardcor Code editor
              </div>
              <button
                onClick={() => setFullscreen(!fullscreen)}
                className="ml-2 p-1 rounded hover:bg-white/10 transition-colors"
              >
                <Maximize2 size={14} className="text-text-tertiary" />
              </button>
            </div>

            {/* Image Container */}
            <div className="relative bg-surface-elevated">
              <img
                src="/showcase.png"
                alt="Dardcor Code Editor Showcase"
                className={`w-full ${fullscreen ? 'object-contain max-h-[80vh]' : 'object-cover'} transition-all duration-500`}
                style={{ minHeight: '300px', background: 'linear-gradient(135deg, #0d0d24, #08081a)' }}
              />

              {/* Fallback overlay if image fails to load */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center opacity-10">
                  <Code2 size={80} className="mx-auto text-dc-400" />
                </div>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-border-subtle bg-surface-elevated/50">
              <div className="flex items-center gap-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <ActiveIcon size={16} className="text-dc-400" />
                    <span className="text-sm font-medium text-text-primary">
                      {slides[activeIndex].label}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-text-tertiary hover:text-text-primary"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex gap-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        i === activeIndex ? 'bg-dc-400 w-4' : 'bg-text-tertiary/30'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-text-tertiary hover:text-text-primary"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Slide Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-6 text-center text-text-secondary max-w-xl mx-auto text-sm"
            >
              {slides[activeIndex].desc}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
