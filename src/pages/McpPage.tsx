import { useState, useEffect } from 'react';
import {
  Boxes,
  Database,
  GitBranch,
  HardDrive,
  Globe,
  Container,
  Copy,
  Check,
} from 'lucide-react';

interface McpServer {
  name: string;
  category: string;
  description: string;
  icon: typeof Database;
  command: string;
}

const servers: McpServer[] = [
  {
    name: 'PostgreSQL Server',
    category: 'Database',
    description: 'Inspect schemas, read tables, and safely execute queries against local or cloud Postgres instances.',
    icon: Database,
    command: 'npx -y @modelcontextprotocol/server-postgres postgresql://localhost/db',
  },
  {
    name: 'GitHub Server',
    category: 'Source Control',
    description: 'Query repository issues, review pull request diffs, and manage GitHub discussions.',
    icon: GitBranch,
    command: 'npx -y @modelcontextprotocol/server-github',
  },
  {
    name: 'SQLite Server',
    category: 'Database',
    description: 'Query and manipulate local SQLite databases without external network connectivity.',
    icon: Database,
    command: 'npx -y @modelcontextprotocol/server-sqlite /path/to/database.db',
  },
  {
    name: 'Puppeteer Browser',
    category: 'Automation',
    description: 'Control a headless Chromium instance to test web UI rendering and inspect live DOM structures.',
    icon: Globe,
    command: 'npx -y @modelcontextprotocol/server-puppeteer',
  },
  {
    name: 'Docker Engine',
    category: 'Infrastructure',
    description: 'Inspect running containers, inspect logs, and manage local Docker Compose stacks.',
    icon: Container,
    command: 'npx -y @modelcontextprotocol/server-docker',
  },
  {
    name: 'Filesystem Sandbox',
    category: 'System',
    description: 'Grant agents access to specific authorized local directories outside your repository workspace.',
    icon: HardDrive,
    command: 'npx -y @modelcontextprotocol/server-filesystem /authorized/path',
  },
];

const sampleConfig = `{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/dev_db"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "\${input:githubToken}"
      }
    }
  }
}`;

export default function McpPage() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = 'Model Context Protocol (MCP) - Dardcor Code';
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-eyebrow mb-2">Extensible Tool Ecosystem</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Model Context Protocol (MCP)
            </h1>
            <p className="text-base sm:text-lg text-[#b3a8c9] leading-relaxed">
              Connect autonomous agents in Dardcor Code to local databases, developer services, and internal APIs through standardized MCP servers.
            </p>
          </div>

          {/* Featured MCP Servers */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Boxes className="text-purple-400" size={22} />
              <span>Compatible MCP Tool Servers</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servers.map((server) => {
                const Icon = server.icon;
                return (
                  <div
                    key={server.name}
                    className="bg-[#08040e] border border-[#6a1b9a] rounded-2xl p-6 hover:border-[#8e24aa] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-300 mb-4">
                        <Icon size={20} />
                      </div>
                      <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider block mb-1">
                        {server.category}
                      </span>
                      <h3 className="text-lg font-bold text-white mb-2">{server.name}</h3>
                      <p className="text-xs sm:text-sm text-[#b3a8c9] leading-relaxed mb-4">
                        {server.description}
                      </p>
                    </div>

                    <div className="p-2 rounded bg-black/60 border border-purple-900/30 text-[11px] font-mono text-purple-300 truncate">
                      <code>{server.command}</code>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Setup Box */}
          <div className="bg-[#08040e] border border-[#6a1b9a] rounded-2xl p-6 sm:p-10 mb-16">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  How to Configure MCP in Your Repository
                </h2>
                <p className="text-xs sm:text-sm text-[#b3a8c9]">
                  Create a <code className="text-purple-300">.dardcor/mcp.json</code> file in your project root. Dardcor Code loads it automatically.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white transition-colors cursor-pointer px-3.5 py-1.5 rounded-lg bg-black border border-purple-800/50"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy configuration'}</span>
              </button>
            </div>

            <div className="rounded-xl bg-black border border-purple-900/40 overflow-hidden">
              <pre className="p-4 sm:p-5 text-xs font-mono text-purple-200 overflow-x-auto leading-relaxed">
                <code>{sampleConfig}</code>
              </pre>
            </div>
          </div>
        </main>
  );
}
