import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Palette,
  Cloud,
  UserCheck,
  Check,
  RefreshCw,
  SlidersHorizontal,
  Laptop,
  CheckCircle2,
} from 'lucide-react';

interface ThemeSwatch {
  name: string;
  bg: string;
  accent: string;
  highlight: string;
}

const themeSwatches: ThemeSwatch[] = [
  { name: 'Dardcor Dark', bg: '#0b0c10', accent: '#5a38d9', highlight: '#7c5ce9' },
  { name: 'Dracula Pro', bg: '#282a36', accent: '#bd93f9', highlight: '#ff79c6' },
  { name: 'Monokai Pro', bg: '#2d2a2e', accent: '#ffd866', highlight: '#a9dc76' },
  { name: 'Solarized', bg: '#002b36', accent: '#268bd2', highlight: '#b58900' },
];

const profileOptions = [
  { id: 'web', name: 'Web Fullstack', active: true, extensionsCount: 24 },
  { id: 'python', name: 'Python & AI', active: false, extensionsCount: 18 },
  { id: 'systems', name: 'Rust & C++', active: false, extensionsCount: 12 },
];

const containerAnim: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemAnim: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CustomizableSection() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeSwatch>(themeSwatches[0]);
  const [activeProfile, setActiveProfile] = useState<string>('web');
  const [syncEnabled, setSyncEnabled] = useState(true);

  return (
    <section
      id="customizable"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
    >
      <motion.div
        variants={containerAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="flex flex-col gap-12"
      >
        {/* Section Header */}
        <div className="max-w-3xl">
          <motion.div variants={itemAnim} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dc-500/10 border border-dc-500/20 text-dc-600 text-xs font-medium mb-4">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Tailored Workspace</span>
          </motion.div>
          <motion.h2
            variants={itemAnim}
            className="text-3xl sm:text-4xl font-display font-bold text-text-primary tracking-tight"
          >
            Fully customizable
          </motion.h2>
          <motion.p
            variants={itemAnim}
            className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed"
          >
            Customize your Dardcor Code UI and layout so that it fits your coding style.
          </motion.p>
        </div>

        {/* 3 Feature Cards in Responsive Grid */}
        <motion.div
          variants={containerAnim}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Card 1: Color Themes */}
          <motion.div
            variants={itemAnim}
            className="p-6 sm:p-8 rounded-2xl border border-border-default bg-surface-card hover:border-border-hover transition-all flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-dc-500/10 border border-dc-500/20 flex items-center justify-center text-dc-600 mb-6">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                Color themes
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Choose from thousands of vibrant color themes in the marketplace or craft your own personalized palette to match your workspace.
              </p>

              {/* Interactive Theme Swatches */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Interactive preview swatches
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {themeSwatches.map((t) => {
                    const isSelected = selectedTheme.name === t.name;
                    return (
                      <button
                        key={t.name}
                        type="button"
                        onClick={() => setSelectedTheme(t)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-dc-600 bg-surface-base ring-2 ring-dc-500/30'
                            : 'border-border-default bg-surface-base/50 hover:bg-surface-base'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: t.bg }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full"
                            style={{ backgroundColor: t.accent }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full"
                            style={{ backgroundColor: t.highlight }}
                          />
                        </div>
                        <span className="text-xs font-medium text-text-primary block truncate">
                          {t.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-default flex items-center justify-between text-xs text-text-muted">
              <span>Active theme:</span>
              <span className="font-medium text-dc-600">{selectedTheme.name}</span>
            </div>
          </motion.div>

          {/* Card 2: Settings Sync */}
          <motion.div
            variants={itemAnim}
            className="p-6 sm:p-8 rounded-2xl border border-border-default bg-surface-card hover:border-border-hover transition-all flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-dc-500/10 border border-dc-500/20 flex items-center justify-center text-dc-600 mb-6">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                Settings Sync
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Keep your settings, keyboard shortcuts, snippets, extensions, and UI preferences synchronized across all your machines securely.
              </p>

              {/* Sync Dashboard Mockup */}
              <div className="p-4 rounded-xl bg-surface-base border border-border-default space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className={`w-4 h-4 text-dc-600 ${syncEnabled ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                    <span className="text-xs font-medium text-text-primary">Cloud Sync Status</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSyncEnabled(!syncEnabled)}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors flex items-center ${
                      syncEnabled ? 'bg-dc-600 justify-end' : 'bg-surface-card justify-start border border-border-default'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white shadow-sm inline-block" />
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-text-secondary pt-1">
                  <div className="flex items-center justify-between">
                    <span>Keybindings & Shortcuts</span>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Extension configurations</span>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>UI layouts & snippets</span>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-default flex items-center gap-2 text-xs text-text-muted">
              <Laptop className="w-3.5 h-3.5 text-dc-600" />
              <span>Synced across macOS, Linux, and Windows</span>
            </div>
          </motion.div>

          {/* Card 3: Profiles */}
          <motion.div
            variants={itemAnim}
            className="p-6 sm:p-8 rounded-2xl border border-border-default bg-surface-card hover:border-border-hover transition-all flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-dc-500/10 border border-dc-500/20 flex items-center justify-center text-dc-600 mb-6">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                Profiles
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Create customized profiles for work, personal projects, or specific languages, complete with separate extensions, UI layout, and keybindings.
              </p>

              {/* Profiles Switch Indicator */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Switch active profile
                </span>
                <div className="space-y-2">
                  {profileOptions.map((prof) => {
                    const isActive = activeProfile === prof.id;
                    return (
                      <button
                        key={prof.id}
                        type="button"
                        onClick={() => setActiveProfile(prof.id)}
                        className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-dc-600 text-white border-dc-600 shadow-sm'
                            : 'bg-surface-base text-text-secondary hover:text-text-primary border-border-default hover:bg-surface-base/80'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isActive ? 'bg-white animate-pulse' : 'bg-text-muted'
                            }`}
                          />
                          <span>{prof.name}</span>
                        </div>
                        <span className={`text-[10px] ${isActive ? 'text-white/80' : 'text-text-muted'}`}>
                          {prof.extensionsCount} extensions
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-default flex items-center gap-2 text-xs text-text-muted">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>One-click workspace context switching</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
