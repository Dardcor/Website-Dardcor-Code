import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Particles from '../ui/Particles';

const codeLines = [
  "const agent = new Dardcor.Agent({",
  "  model: 'claude-4',",
  "  skills: ['plan', 'code', 'test']",
  "});",
  "const result = await agent.ship('feature');"
];

const containerAnim = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03
    }
  }
};

const wordAnim: any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function Hero() {
  const [typedCode, setTypedCode] = useState<string>('');
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let currentText = '';
    let isMounted = true;

    const typeCode = () => {
      if (!isMounted) return;

      if (currentLine < codeLines.length) {
        if (currentChar < codeLines[currentLine].length) {
          currentText += codeLines[currentLine][currentChar];
          setTypedCode(currentText);
          currentChar++;
          setTimeout(typeCode, Math.random() * 30 + 20);
        } else {
          currentText += '\n';
          setTypedCode(currentText);
          currentLine++;
          currentChar = 0;
          setTimeout(typeCode, 300); // Pause at end of line
        }
      }
    };

    setTimeout(typeCode, 1500); // Initial delay

    return () => {
      isMounted = false;
    };
  }, []);

  const headingWords = [
    "Experience", "liftoff", "with", "the",
    "next-gen",
    "agent", "platform"
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-bg-hero pointer-events-none" />
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-50" />
      <Particles count={60} />

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-[120px] pointer-events-none glow-violet" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px] pointer-events-none glow-amber" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Left Side - 55% */}
        <div className="w-full lg:w-[55%] flex flex-col items-start text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass text-sm text-text-secondary mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-dc-400 animate-pulse-glow" />
            <span>Now Available — Free for individual developers</span>
            <span className="w-px h-4 bg-border-subtle" />
            <a
              href="https://github.com/Dardcor/Dardcor-Code"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-text-tertiary hover:text-text-primary transition-colors"
              aria-label="View on GitHub"
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://discord.gg/dardcor"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-text-tertiary hover:text-text-primary transition-colors"
              aria-label="Join Discord"
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Discord
            </a>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={containerAnim}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.05] tracking-tight text-text-primary flex flex-wrap gap-x-3 gap-y-2"
          >
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordAnim}
                className={`inline-block ${
                  word === 'next-gen'
                    ? `cursor-default text-gradient-cyan ${isGlitching ? 'animate-glitch' : ''}`
                    : ''
                }`}
                onMouseEnter={word === 'next-gen' ? () => setIsGlitching(true) : undefined}
                onMouseLeave={word === 'next-gen' ? () => setIsGlitching(false) : undefined}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-lg sm:text-xl text-text-secondary max-w-xl leading-relaxed"
          >
            Dardcor Code is the first agent-first development platform. Deploy autonomous
            agents that plan, code, test, and ship — all from your editor.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/release"
                className="inline-flex items-center gap-2.5 bg-dc-600 hover:bg-dc-500 text-white px-8 py-4 rounded-xl text-base font-medium transition-colors shadow-xl shadow-dc-600/25 hover:shadow-dc-500/40"
                aria-label="Download Free"
              >
                Download Free
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href="#showcase"
                className="inline-flex items-center gap-2.5 glass hover:bg-white/10 text-text-primary px-8 py-4 rounded-xl text-base font-medium transition-colors"
                aria-label="Watch Demo"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Play size={18} className="text-dc-400" fill="currentColor" />
                Watch Demo
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Floating Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full lg:w-[45%] relative mt-16 lg:mt-0"
        >
          <div className="animate-float glow-violet absolute -inset-1 rounded-3xl blur-md opacity-50 bg-gradient-to-tr from-dc-500/30 to-dc-300/30" />
          <div className="glass-strong rounded-2xl border border-white/10 overflow-hidden relative z-10 animate-float shadow-2xl bg-[#0F0F13]/80 backdrop-blur-xl">
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex gap-2 terminal-dot">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto text-xs font-mono text-text-tertiary">agent.ts</div>
            </div>
            
            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto min-h-[200px]">
              <pre className="text-gray-300 m-0">
                <code className="text-amber-200/90 whitespace-pre">
                  {typedCode}
                  <span className="inline-block w-2 h-4 ml-1 bg-dc-400 animate-blink align-middle" />
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
