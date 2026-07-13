import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Eye } from 'lucide-react';

export default function Showcase() {
  const [imgLoaded, setImgLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const windowY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <section ref={sectionRef} id="showcase" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-eyebrow mb-3">See it in action</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
            Agent-driven development
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Watch Dardcor Code autonomously plan, build, and deploy a production-grade
            REST API — from a single sentence description to a deployed endpoint.
          </p>
        </motion.div>

        <motion.div
          style={{ y: windowY, opacity, scale }}
          className="w-full rounded-2xl overflow-hidden border border-border-default bg-surface-card shadow-xl shadow-dc-500/5 hover:border-dc-300 transition-colors duration-500"
        >
          <div className="flex items-center px-4 py-3 bg-surface-elevated border-b border-border-default">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="mx-auto text-[11px] text-text-tertiary font-mono">
              showcase — agent-session.ts — Dardcor Code
            </div>
            <div className="flex gap-1.5 items-center text-text-tertiary/50">
              <Eye size={12} />
            </div>
          </div>

          <div className="relative text-[0]" style={{ background: '#f0eff6' }}>
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(255,255,255,0.5)] pointer-events-none z-10" />

            <img
              src="/showcase.png"
              alt="Dardcor Code Editor Showcase"
              className={`w-full h-auto align-middle transition-all duration-700 ${
                imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
              }`}
              onLoad={() => setImgLoaded(true)}
              loading="lazy"
              decoding="async"
            />

            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#f0eff6] min-h-[400px]">
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(90deg, transparent, rgba(108,74,226,0.03), transparent)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 3s ease-in-out infinite'
                }} />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <Code2 size={36} className="text-dc-300/40" />
                  <span className="text-xs text-text-tertiary/40 font-mono">Loading preview...</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
