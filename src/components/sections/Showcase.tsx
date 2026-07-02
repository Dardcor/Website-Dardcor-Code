import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Code2 } from 'lucide-react';

export default function Showcase() {
  const [imgLoaded, setImgLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const windowY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80]);
  const windowScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.92]);
  const windowRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3]);

  // Subtle mouse-driven Y rotation
  const springConfig = { damping: 30, stiffness: 150 };
  const mouseRotateY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!windowRef.current) return;
      const rect = windowRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 1.5;
      mouseRotateY.set(rotateYValue);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseRotateY]);

  return (
    <section ref={sectionRef} id="showcase" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-base via-dc-500/[0.02] to-surface-base pointer-events-none" />

      {/* Glowing orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-dc-500/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text-primary tracking-tight">
            See it in{' '}
            <span className="text-gradient">action</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
            Watch Dardcor Code autonomously plan, build, and verify production-grade applications.
          </p>
        </motion.div>

        {/* Showcase Window */}
        <motion.div
          ref={windowRef}
          style={{
            y: windowY,
            scale: windowScale,
            rotateX: windowRotateX,
            rotateY: mouseRotateY,
            transformPerspective: 1200,
          }}
          className="w-full glass-strong rounded-2xl overflow-hidden border border-border-default shadow-2xl shadow-black/40"
        >
          {/* Window Header */}
          <div className="flex items-center px-4 py-3 bg-black/40 backdrop-blur-md border-b border-border-subtle">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto text-[11px] text-text-tertiary font-mono tracking-wider">
              showcase — Dardcor Code editor
            </div>
          </div>

          {/* Image — text-[0] kills ALL whitespace below inline img */}
          <div
            className="relative text-[0]"
            style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #06060e 100%)' }}
          >
            {/* Inner edge vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.55)] pointer-events-none z-10" />

            <img
              src="/showcase.png"
              alt="Dardcor Code Editor Showcase"
              className={`w-full h-auto align-middle transition-opacity duration-700 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImgLoaded(true)}
              loading="lazy"
              decoding="async"
            />

            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#08081a]">
                <div className="animate-shimmer w-full h-full absolute inset-0" />
                <Code2 size={40} className="text-dc-500/20 relative z-10" />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
