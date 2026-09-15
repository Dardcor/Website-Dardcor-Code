import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Sparkles } from 'lucide-react';

export default function Showcase() {
  const [imgLoaded, setImgLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const windowY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.97, 1, 1, 0.97]);

  return (
    <section ref={sectionRef} id="showcase" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="section-eyebrow mb-3">Native Workspace</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            A world-class code editor meets autonomous AI
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#b3a8c9] max-w-3xl mx-auto leading-relaxed">
            Dardcor Code pairs a familiar Monaco-powered explorer and keyboard workflows with deep-integrated autonomous agents, AST-aware planning, and direct model harnesses.
          </p>
        </motion.div>

        <motion.div
          style={{ y: windowY, opacity, scale }}
          className="w-full rounded-2xl overflow-hidden border border-[#6a1b9a] bg-[#08040e] shadow-2xl shadow-purple-950/60 hover:border-[#8e24aa] transition-colors duration-500"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d0720] border-b border-purple-900/40">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 text-xs font-mono text-purple-300/80 hidden sm:inline">
                Dardcor-Code [Explorer &amp; AI Agent Chat: Anthropic/claude Opus 4.6]
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-purple-950/80 text-purple-300 border border-purple-800/50">
                <Sparkles size={12} className="text-purple-400" />
                <span>v1.0.0 Active</span>
              </span>
            </div>
          </div>

          <div className="relative text-[0] bg-black">
            <img
              src="/showcase.png"
              alt="Dardcor Code Editor Application Interface"
              className={`w-full h-auto align-middle transition-all duration-700 ${
                imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.01]'
              }`}
              onLoad={() => setImgLoaded(true)}
              loading="lazy"
              decoding="async"
            />

            {!imgLoaded && (
              <div className="flex items-center justify-center bg-black min-h-[420px]">
                <div className="flex flex-col items-center gap-3">
                  <Code2 size={40} className="text-purple-400 animate-pulse" />
                  <span className="text-xs text-purple-300/60 font-mono">Loading Dardcor Code interface...</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
