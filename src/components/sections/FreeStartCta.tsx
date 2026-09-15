import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Download } from 'lucide-react';

export default function FreeStartCta() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-2xl bg-gradient-to-b from-[#180f38] to-[#120a2e] border border-purple-800/40 p-8 sm:p-12 text-center overflow-hidden shadow-2xl shadow-purple-950/40">
        <div className="absolute inset-0 bg-radial from-purple-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/50 text-xs text-purple-300 mb-5">
              <Sparkles size={13} className="text-purple-400" />
              <span>Free for developers</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Start building with AI agents for free
            </h2>

            <p className="text-base sm:text-lg text-[#a79fc2] max-w-xl mx-auto mb-8 leading-relaxed">
              No trial. No credit card required. Just open source freedom and your local developer setup.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/release"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-dc-600 hover:bg-dc-500 text-white font-semibold px-7 py-3.5 rounded-lg text-sm transition-colors shadow-lg shadow-dc-600/25"
              >
                <Download size={16} />
                <span>Try in Dardcor Code</span>
              </Link>
              <Link
                to="/release"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1b123d] hover:bg-[#23174f] text-purple-200 border border-purple-700/40 font-semibold px-7 py-3.5 rounded-lg text-sm transition-colors"
              >
                <span>Try in Dardcor Code Insiders</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
