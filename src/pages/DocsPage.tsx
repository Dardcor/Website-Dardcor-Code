import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Terminal,
  Cpu,
  Settings,
  ShieldCheck,
  FileCode,
  Network,
  ChevronRight,
  Download,
  Copy,
  Check,
} from 'lucide-react';

interface DocSection {
  id: string;
  title: string;
  icon: typeof BookOpen;
  content: {
    heading: string;
    description: string;
    image?: {
      src: string;
      alt: string;
      caption: string;
    };
    codeSnippet?: string;
    bullets: string[];
  };
}

const docSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: BookOpen,
    content: {
      heading: 'Introduction to Dardcor Code',
      description:
        'Dardcor Code is an open source desktop AI code editor built on the Monaco Editor engine and Electron. It pairs standard IDE workflows with autonomous agents that plan, write code, run commands in your terminal, and verify changes.',
      image: {
        src: '/showcase.png',
        alt: 'Dardcor Code Native IDE and AI Chat Interface',
        caption: 'Dardcor Code - Editor Explorer & Integrated AI Chat',
      },
      codeSnippet: `# Launch Dardcor Code from terminal in current directory\ndardcor-code .\n\n# Or launch with a specific workspace\ndardcor-code /path/to/project`,
      bullets: [
        'Open Command Palette with Ctrl+Shift+P (or Cmd+Shift+P on macOS).',
        'Open Integrated Terminal with Ctrl+` to access native PTY shell.',
        'Access Chat and Agent Host panel with Ctrl+Alt+B.',
        'Compatible with all extensions from the open VS Marketplace.',
      ],
    },
  },
  {
    id: 'autonomous-agents',
    title: 'Autonomous Agents',
    icon: Cpu,
    content: {
      heading: 'Agent Host and Execution Engine',
      description:
        'Dardcor Code features an integrated agent runtime that operates directly in your repository. When given a task or issue, the agent creates an AST-aware plan, drafts code changes, runs tests in a sandbox terminal, and iterates until the solution is verified.',
      codeSnippet: `# Agent Instruction Protocol (.dardcor/instructions.md)\n# Coding Conventions\n- Use strict TypeScript typing; avoid 'any'.\n- Run unit test suite before proposing git commit.\n- Keep components modular and single-responsibility.`,
      bullets: [
        'Interactive review plan: Approve or adjust agent tasks before file writes.',
        'Inline diff review session: Side-by-side visual diff with Accept or Discard controls.',
        'Confirmation controls: "Allow | Skip" on sensitive commands with risk assessment badges.',
        'Subagent branching: Break large refactorings into parallel child tasks.',
      ],
    },
  },
  {
    id: 'terminal-pty',
    title: 'Integrated PTY Terminal',
    icon: Terminal,
    content: {
      heading: 'Terminal Architecture and Security',
      description:
        'The integrated terminal runs xterm.js powered by node-pty. On Windows, it executes PowerShell with execution policy bypass to prevent cmd.exe exit code failures. On macOS and Linux, it uses your default interactive login shell.',
      codeSnippet: `// Terminal tool execution configuration\n{\n  "terminal.integrated.defaultProfile.windows": "PowerShell",\n  "terminal.integrated.fontSize": 14,\n  "terminal.integrated.cursorBlinking": true,\n  "dardcor.terminal.riskAssessment": true\n}`,
      bullets: [
        'Feature terminals execute background tasks without annoying user popups.',
        'Buffer compaction: Compresses extensive build logs to preserve LLM token context.',
        'Command-line auto-approval for safe read-only queries (ls, dir, git status).',
        'Network domain filter restricts external web access during autonomous tasks.',
      ],
    },
  },
  {
    id: 'dardcor-router',
    title: 'Dardcor Router & Models',
    icon: Network,
    content: {
      heading: 'Modular Multi-Provider AI Routing',
      description:
        'Dardcor Router (http://127.0.0.1:25128) provides modular zero-egress connectivity. Each AI provider (Antigravity, Gemini, OpenAI, Claude, DeepSeek, Grok, Ollama) has its own isolated folder under ~/.dardcor/provider/provider/.',
      image: {
        src: '/router.png',
        alt: 'Dardcor Router Multi-Provider Mesh and Analytics Dashboard',
        caption: 'Dardcor Router v1.0.0 - Unified Multi-Provider Mesh & Live Analytics',
      },
      codeSnippet: `~/.dardcor/provider/\n├── backups/       # Automatic schema migration snapshots\n├── auth/          # Machine ID & local signing secrets\n├── catalog/       # Model specifications cache\n└── provider/      # Modular isolated provider data\n    ├── Antigravity/\n    ├── Gemini/\n    ├── OpenAI/\n    ├── Claude/\n    ├── DeepSeek/\n    └── Grok/`,
      bullets: [
        'Zero-login setup: Connect local models or bring your own API key directly.',
        'Model picker with context window size, latency badges, and reasoning effort.',
        'Thinking visualization accordion showing model reasoning steps and duration.',
        'Fallback combos: Automatically reroutes failed calls to secondary models.',
      ],
    },
  },
  {
    id: 'mcp-integration',
    title: 'Model Context Protocol (MCP)',
    icon: Settings,
    content: {
      heading: 'Connecting External Tools via MCP',
      description:
        'Dardcor Code natively supports the open Model Context Protocol. You can grant your agents access to databases, cloud infrastructure, browser automation, and internal microservices through standardized tool servers.',
      codeSnippet: `// .dardcor/mcp.json\n{\n  "mcpServers": {\n    "postgresql": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/dev"]\n    },\n    "github": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"]\n    }\n  }\n}`,
      bullets: [
        'Auto-discovery: Scans local repository for .dardcor/mcp.json on project open.',
        'JSON Schema validation: Inspect tool parameters, descriptions, and return types.',
        'Per-tool authorization: Require explicit approval before writing database mutations.',
        'Compatible with standard MCP community registries and npm packages.',
      ],
    },
  },
  {
    id: 'security-compliance',
    title: 'Security & Air-Gapped',
    icon: ShieldCheck,
    content: {
      heading: 'Enterprise Security Model',
      description:
        'Dardcor Code is engineered with defense-in-depth principles. All telemetry is disabled by default. Source code, credentials, and conversation histories remain strictly inside your environment.',
      codeSnippet: `# Verification of download authenticity\ngpg --verify Dardcor-Code_1.0.0_x64-setup.exe.sig Dardcor-Code_1.0.0_x64-setup.exe`,
      bullets: [
        'Air-gapped deployment: Operates without internet when coupled with local Ollama or vLLM.',
        'Content Security Policy (CSP): Enforces strict script-src and frame-ancestors restrictions.',
        'All binary releases are signed with PGP keys and published with SHA-256 digests.',
        'MIT license grants full auditability and deployment freedom for enterprises.',
      ],
    },
  },
];

export default function DocsPage() {
  const [activeSectionId, setActiveSectionId] = useState(docSections[0].id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = 'Documentation - Dardcor Code';
  }, []);

  const activeSection = docSections.find((s) => s.id === activeSectionId) || docSections[0];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <div className="text-left mb-10 pb-6 border-b border-purple-900/30">
            <span className="section-eyebrow mb-2">Documentation</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Dardcor Code Documentation
            </h1>
            <p className="mt-2 text-[#b3a8c9] max-w-2xl text-sm sm:text-base">
              Comprehensive setup guides, agent runtime protocols, PTY terminal configuration, and router architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 space-y-2 sticky top-28 bg-[#08040e] border border-[#6a1b9a] rounded-2xl p-4">
              <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-purple-300">
                Topics
              </div>
              {docSections.map((section) => {
                const Icon = section.icon;
                const isActive = section.id === activeSectionId;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSectionId(section.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors text-left cursor-pointer ${
                      isActive
                        ? 'bg-purple-900/40 text-white border border-[#7c4dff]'
                        : 'text-[#b3a8c9] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={isActive ? 'text-purple-300' : 'text-purple-400/60'} />
                      <span>{section.title}</span>
                    </div>
                    <ChevronRight size={14} className={isActive ? 'text-purple-300' : 'opacity-0'} />
                  </button>
                );
              })}

              <div className="pt-4 mt-4 border-t border-purple-900/30 px-3">
                <Link
                  to="/download"
                  className="flex items-center justify-center gap-2 bg-[#6a1b9a] hover:bg-[#7c4dff] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors w-full"
                >
                  <Download size={13} />
                  <span>Download Dardcor Code</span>
                </Link>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-8 bg-[#08040e] border border-[#6a1b9a] rounded-2xl p-6 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {activeSection.content.heading}
              </h2>
              <p className="text-sm sm:text-base text-[#b3a8c9] leading-relaxed mb-6">
                {activeSection.content.description}
              </p>

              {/* Visual Screenshot Reference */}
              {activeSection.content.image && (
                <div className="mb-8 rounded-2xl overflow-hidden border border-[#6a1b9a] bg-black shadow-2xl">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d0720] border-b border-purple-900/40 text-xs font-mono text-purple-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      <span className="ml-2 text-purple-300/80">{activeSection.content.image.caption}</span>
                    </div>
                  </div>
                  <img
                    src={activeSection.content.image.src}
                    alt={activeSection.content.image.alt}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Code Snippet Box */}
              {activeSection.content.codeSnippet && (
                <div className="mb-8 rounded-xl bg-black border border-purple-900/40 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e0719] border-b border-purple-900/30 text-xs font-mono text-purple-300">
                    <span className="flex items-center gap-2">
                      <FileCode size={13} /> Configuration &amp; Commands
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(activeSection.content.codeSnippet || '')}
                      className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                    >
                      {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-purple-200 overflow-x-auto leading-relaxed">
                    <code>{activeSection.content.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Bullets & Highlights */}
              <h3 className="text-base font-bold text-white mb-3">Key Features &amp; Best Practices</h3>
              <ul className="space-y-2.5">
                {activeSection.content.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#b3a8c9]">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
  );
}
