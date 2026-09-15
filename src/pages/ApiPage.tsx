import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

interface ApiEndpoint {
  name: string;
  type: string;
  signature: string;
  description: string;
  example: string;
}

interface ApiCategory {
  id: string;
  title: string;
  description: string;
  endpoints: ApiEndpoint[];
}

const apiCategories: ApiCategory[] = [
  {
    id: 'terminal-tools',
    title: 'Terminal & PTY Tool APIs',
    description: 'Built-in agent tools for interactive shell commands and background task execution.',
    endpoints: [
      {
        name: 'run_in_terminal',
        type: 'Agent Tool',
        signature: 'run_in_terminal(command: string, cwd?: string, isBackground?: boolean): Promise<{ exitCode: number, output: string }>',
        description: 'Spawns a sandboxed PTY process. Automatically applies PowerShell bypass on Windows or standard login shell on macOS/Linux.',
        example: `await agent.callTool('run_in_terminal', {\n  command: 'npm run build',\n  cwd: '/workspace/project',\n  isBackground: false\n});`,
      },
      {
        name: 'send_to_terminal',
        type: 'Agent Tool',
        signature: 'send_to_terminal(text: string, addNewLine?: boolean): Promise<void>',
        description: 'Sends keystrokes or interactive response strings directly into the active terminal stdin buffer.',
        example: `await agent.callTool('send_to_terminal', {\n  text: 'y',\n  addNewLine: true\n});`,
      },
      {
        name: 'get_terminal_output',
        type: 'Agent Tool',
        signature: 'get_terminal_output(terminalId?: string, maxLines?: number): Promise<string>',
        description: 'Retrieves compacted terminal scrollback text. Long outputs are intelligently compressed to conserve model token limits.',
        example: `const logs = await agent.callTool('get_terminal_output', {\n  maxLines: 150\n});`,
      },
      {
        name: 'kill_terminal',
        type: 'Agent Tool',
        signature: 'kill_terminal(terminalId: string): Promise<boolean>',
        description: 'Terminates an active terminal session and cleans up its background process tree.',
        example: `await agent.callTool('kill_terminal', { terminalId: 'term-build-watcher' });`,
      },
    ],
  },
  {
    id: 'agent-protocol',
    title: 'Agent Orchestration Protocol',
    description: 'Built-in tools for user interaction, plan review, and subagent delegation.',
    endpoints: [
      {
        name: 'askQuestions',
        type: 'Interaction Tool',
        signature: 'askQuestions(questions: Array<{ question: string, options?: string[], isMultiSelect?: boolean }>): Promise<Record<string, string>>',
        description: 'Presents an interactive modal to the developer to clarify ambiguous requirements before writing code.',
        example: `const answers = await agent.callTool('askQuestions', {\n  questions: [{\n    question: 'Select database adapter',\n    options: ['PostgreSQL', 'SQLite', 'MongoDB']\n  }]\n});`,
      },
      {
        name: 'reviewPlan',
        type: 'Planning Tool',
        signature: 'reviewPlan(plan: { title: string, steps: string[], affectedFiles: string[] }): Promise<{ approved: boolean, feedback?: string }>',
        description: 'Displays a structured plan card in the agent chat allowing the user to approve or request adjustments.',
        example: `const decision = await agent.callTool('reviewPlan', {\n  plan: {\n    title: 'Refactor Auth Pipeline',\n    steps: ['Update JWT schema', 'Add rate limiting', 'Run tests'],\n    affectedFiles: ['src/auth/jwt.ts', 'src/auth/guard.ts']\n  }\n});`,
      },
      {
        name: 'runSubagent',
        type: 'Delegation Tool',
        signature: 'runSubagent(subagentType: string, prompt: string, workspace?: string): Promise<{ result: string }>',
        description: 'Launches an autonomous isolated child agent with its own context window and returns the final verified result.',
        example: `const audit = await agent.callTool('runSubagent', {\n  subagentType: 'security-auditor',\n  prompt: 'Analyze src/api for unescaped SQL injections'\n});`,
      },
    ],
  },
  {
    id: 'router-api',
    title: 'Dardcor Router REST API',
    description: 'OpenAI-compatible local endpoint running on port 25128 with zero telemetry.',
    endpoints: [
      {
        name: 'POST /v1/chat/completions',
        type: 'REST Endpoint',
        signature: 'POST http://127.0.0.1:25128/v1/chat/completions',
        description: 'Standard chat completion endpoint routing dynamically across configured providers (Claude, OpenAI, Gemini, Ollama, DeepSeek).',
        example: `curl http://127.0.0.1:25128/v1/chat/completions \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "model": "claude-3-7-sonnet",\n    "messages": [{"role": "user", "content": "Explain async generator"}],\n    "stream": true\n  }'`,
      },
      {
        name: 'GET /v1/models',
        type: 'REST Endpoint',
        signature: 'GET http://127.0.0.1:25128/v1/models',
        description: 'Lists all available models loaded from ~/.dardcor/provider/provider/ along with context window limits and capabilities.',
        example: `curl http://127.0.0.1:25128/v1/models`,
      },
    ],
  },
];

export default function ApiPage() {
  const [selectedCat, setSelectedCat] = useState(apiCategories[0].id);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'API Reference - Dardcor Code';
  }, []);

  const currentCategory = apiCategories.find((c) => c.id === selectedCat) || apiCategories[0];

  const handleCopy = (code: string, name: string) => {
    navigator.clipboard.writeText(code);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <div className="text-left mb-10 pb-6 border-b border-purple-900/30">
            <span className="section-eyebrow mb-2">Developer Interfaces</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Dardcor Code API Reference
            </h1>
            <p className="mt-2 text-[#b3a8c9] max-w-2xl text-sm sm:text-base">
              Specifications for integrated terminal tools, agent orchestration protocols, and the local Dardcor Router service.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {apiCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  selectedCat === cat.id
                    ? 'bg-[#6a1b9a] text-white shadow-lg shadow-purple-950/50'
                    : 'bg-[#08040e] text-[#b3a8c9] border border-purple-900/40 hover:text-white hover:border-purple-600'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Endpoints List */}
          <div className="space-y-6">
            <p className="text-sm text-purple-300/80 mb-2">
              {currentCategory.description}
            </p>

            {currentCategory.endpoints.map((ep) => (
              <div
                key={ep.name}
                className="bg-[#08040e] border border-[#6a1b9a] rounded-2xl p-6 hover:border-[#8e24aa] transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold font-mono text-white">{ep.name}</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-purple-950 text-purple-300 border border-purple-800/40">
                      {ep.type}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(ep.example, ep.name)}
                    className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-white transition-colors cursor-pointer px-3 py-1 rounded bg-black/50 border border-purple-900/30"
                  >
                    {copiedName === ep.name ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    <span>{copiedName === ep.name ? 'Copied' : 'Copy Example'}</span>
                  </button>
                </div>

                <div className="p-2.5 rounded-lg bg-black/60 border border-purple-900/30 font-mono text-xs text-purple-300 mb-3 overflow-x-auto">
                  <code>{ep.signature}</code>
                </div>

                <p className="text-sm text-[#b3a8c9] mb-4">
                  {ep.description}
                </p>

                <div className="rounded-xl bg-black border border-purple-900/40 overflow-hidden">
                  <div className="px-4 py-1.5 bg-[#0e0719] border-b border-purple-900/30 text-[11px] font-mono text-purple-400/80">
                    Usage Example
                  </div>
                  <pre className="p-4 text-xs font-mono text-purple-200 overflow-x-auto leading-relaxed">
                    <code>{ep.example}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </main>
  );
}
