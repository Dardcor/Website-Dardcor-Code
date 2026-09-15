import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Keyboard,
  Compass,
  ArrowRight,
} from 'lucide-react';

interface Shortcut {
  action: string;
  winKey: string;
  macKey: string;
  category: string;
}

const shortcuts: Shortcut[] = [
  { action: 'Open Command Palette', winKey: 'Ctrl + Shift + P', macKey: 'Cmd + Shift + P', category: 'General' },
  { action: 'Quick Open (Go to File)', winKey: 'Ctrl + P', macKey: 'Cmd + P', category: 'General' },
  { action: 'Toggle Integrated Terminal', winKey: 'Ctrl + `', macKey: 'Cmd + `', category: 'Terminal' },
  { action: 'Open Agent Chat & Host', winKey: 'Ctrl + Alt + B', macKey: 'Cmd + Option + B', category: 'Agent' },
  { action: 'Inline Diff Review Accept', winKey: 'Ctrl + Enter', macKey: 'Cmd + Enter', category: 'Agent' },
  { action: 'Split Editor Window', winKey: 'Ctrl + \\', macKey: 'Cmd + \\', category: 'Editor' },
  { action: 'Multi-Cursor Add Next Match', winKey: 'Ctrl + D', macKey: 'Cmd + D', category: 'Editor' },
  { action: 'Toggle Sidebar', winKey: 'Ctrl + B', macKey: 'Cmd + B', category: 'General' },
];

const tutorials = [
  {
    title: 'First 5 Minutes in Dardcor Code',
    description: 'Install the native app, open your workspace, explore the dark purple UI, and run your first build command in the PTY terminal.',
    difficulty: 'Beginner',
    time: '5 mins',
    steps: [
      'Download and run the installer for your operating system.',
      'Open any directory or Git repository using File > Open Folder.',
      'Press Ctrl+` to test the integrated terminal.',
      'Press Ctrl+Shift+P and type "Welcome" to customize your theme.',
    ],
  },
  {
    title: 'Your First Autonomous Agent Session',
    description: 'Instruct the agent to analyze an issue, draft an AST-aware plan, review the code diff, and run verification tests.',
    difficulty: 'Intermediate',
    time: '10 mins',
    steps: [
      'Open the agent chat panel with Ctrl+Alt+B.',
      'Describe a task in natural language, such as "Add input validation to user registration form".',
      'Review the implementation plan steps proposed by the agent.',
      'Examine the inline diff in the editor and click "Accept" once tests pass.',
    ],
  },
  {
    title: 'Setting up Local Models with Dardcor Router',
    description: 'Configure zero-egress offline agent sessions using local Ollama or vLLM weights.',
    difficulty: 'Advanced',
    time: '15 mins',
    steps: [
      'Ensure Ollama or vLLM is running on your system (e.g. localhost:11434).',
      'Verify ~/.dardcor/provider/provider/Ollama/ contains your local endpoint configuration.',
      'Select your local model from the Dardcor Code Model Picker tab.',
      'Run agent tasks with 100% air-gapped privacy and zero API token costs.',
    ],
  },
];

const getInitialOsTab = (): 'windows' | 'mac' => {
  if (typeof window !== 'undefined' && navigator.userAgent.toLowerCase().includes('mac')) {
    return 'mac';
  }
  return 'windows';
};

export default function LearnPage() {
  const [osTab, setOsTab] = useState<'windows' | 'mac'>(getInitialOsTab);

  useEffect(() => {
    document.title = 'Learn - Dardcor Code Tutorials & Keybindings';
  }, []);

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-eyebrow mb-2">Tutorials &amp; Reference</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Learn Dardcor Code
            </h1>
            <p className="text-base sm:text-lg text-[#b3a8c9] leading-relaxed">
              Master autonomous multi-agent development, integrated terminal tools, and essential keyboard shortcuts.
            </p>
          </div>

          {/* Interactive Tutorials */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Compass className="text-purple-400" size={22} />
              <span>Step-by-Step Guides</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tutorials.map((tut) => (
                <div
                  key={tut.title}
                  className="bg-[#08040e] border border-[#6a1b9a] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#8e24aa] transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-4 text-purple-400">
                      <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/40 text-purple-300">
                        {tut.difficulty}
                      </span>
                      <span>{tut.time}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{tut.title}</h3>
                    <p className="text-sm text-[#b3a8c9] leading-relaxed mb-6">
                      {tut.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {tut.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-purple-200/90">
                          <span className="font-mono text-purple-400 font-bold shrink-0">{idx + 1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/docs"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white transition-colors pt-4 border-t border-purple-900/30"
                  >
                    <span>Read documentation</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Essential Keyboard Shortcuts Cheat Sheet */}
          <div className="bg-[#08040e] border border-[#6a1b9a] rounded-2xl p-6 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-purple-900/30">
              <div className="flex items-center gap-3">
                <Keyboard className="text-purple-400" size={22} />
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Essential Keyboard Shortcuts
                </h2>
              </div>

              <div className="flex items-center gap-1 bg-black/60 p-1 rounded-lg border border-purple-900/40">
                <button
                  type="button"
                  onClick={() => setOsTab('windows')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    osTab === 'windows' ? 'bg-[#6a1b9a] text-white' : 'text-[#b3a8c9] hover:text-white'
                  }`}
                >
                  Windows / Linux
                </button>
                <button
                  type="button"
                  onClick={() => setOsTab('mac')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    osTab === 'mac' ? 'bg-[#6a1b9a] text-white' : 'text-[#b3a8c9] hover:text-white'
                  }`}
                >
                  macOS
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shortcuts.map((sc) => (
                <div
                  key={sc.action}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-black/50 border border-purple-900/30 text-sm"
                >
                  <div>
                    <span className="text-white font-medium block">{sc.action}</span>
                    <span className="text-[11px] text-purple-400/70 font-mono">{sc.category}</span>
                  </div>
                  <kbd className="px-2.5 py-1 rounded bg-[#0e0719] border border-purple-800/50 text-xs font-mono text-purple-300 shadow-inner">
                    {osTab === 'windows' ? sc.winKey : sc.macKey}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </main>
  );
}
