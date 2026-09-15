# Changes Summary — Milestone 3: Hero & Core AI Sections

## Modified Files

### `src/components/sections/Hero.tsx`
- **Purpose**: Converted to download-focused VSCode homepage style with multi-agent theme.
- **Headline**: "Your home for multi-agent development".
- **Subheadline**: "Dardcor Code is a free, open source AI code editor. Build with AI agents that plan, code, and debug for you. Manage multi-agent workflows across environments on Linux, macOS, and Windows."
- **CTAs & Secondary Links**:
  - Primary button: "Download Dardcor Code" linking to `/release` styled with `bg-dc-600 hover:bg-dc-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all px-8 py-3.5` and Lucide `Download` icon.
  - Secondary platform links: "Web", "Insiders edition", "other platforms" linked to `/release`.
  - Mandatory disclaimer: "By using Dardcor Code, you agree to its license and privacy statement."
- **Animated Tabbed Mockup**:
  - Tabbed interface cycling through realistic multi-agent snippets: `Agent.ts`, `Workflow.py`, `Config.json`.
  - Active tab state cycling on a 4-second timer with hover pause and bounds checking (`(prev + 1) % snippets.length`).
  - Brand color `#5a38d9` (`dc-600`) indicators, active tab indicator, syntax highlighting, and interactive clipboard copy.
- **Responsive Layout**:
  - Clean vertical stacking on mobile (`flex-col`) transitioning to row layout on desktop (`lg:flex-row`).
  - Top padding `pt-28` to clear fixed top-0 navbar.
  - Horizontal padding `px-4 sm:px-6` ensuring 375px mobile viewport containment.

---

## Created Files

### `src/components/sections/AgentsBuild.tsx`
- **Purpose**: Autonomous agent capabilities showcase section matching VSCode.com structure.
- **Headline & Description**:
  - "Agents that build for you"
  - "Hand off tasks to AI agents that autonomously plan, make code changes, run commands, and iterate until the job is done."
- **Feature Modes**:
  - CLI-based agent: Background bug fixes, refactoring, test generation, and maintenance.
  - Browser-integrated agent: Real-time feature implementation, UI debugging, live previews, and automated browser testing.
  - Cloud agent: PR reviews, multi-agent CI, security audits, and background build fixes.
- **Animated Task & Diff Mockup**:
  - Split master-detail view: Left side displays 4-step execution plan with completed/running/queued states; right side displays syntax-highlighted code diff for `src/agents/orchestrator.ts`.
- **CTA**: "Get started with agents" linking to `/features/agents`.

### `src/components/sections/MultiSurface.tsx`
- **Purpose**: Multi-model harness and cross-surface availability section.
- **Headline & Description**:
  - "Any agent, any model"
  - "Use the agent harness that fits your workflow. Run agents locally or in the cloud, with Copilot or third-party providers like Claude and OpenAI."
- **Model Grid**:
  - Responsive columns: 1 column on mobile, 2 columns on small screens, 4 columns on desktop (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`).
  - Supports Claude (Anthropic), GPT-4o (OpenAI), Gemini (Google), and Custom model (Local & Cloud via Ollama/vLLM).
- **Surface List**:
  - Interactive cards for Dardcor Code (desktop), CLI (headless harness), Web (in-browser cloud editor), and Mobile (companion monitor).
- **CTA**: "See how agents work across surfaces" linking to `/features/models`.

### `src/components/sections/SessionsView.tsx`
- **Purpose**: Multi-agent session management and parallel monitoring section.
- **Headline & Description**:
  - "All your sessions, one view"
  - "Stay productive while multiple agents work on tasks in parallel. Track all your agent sessions from a single view, regardless of where they run."
- **Interactive UI Mockup**:
  - Filter bar with status filters (`all`, `running`, `completed`, `failed`) and live search input.
  - Distinct animated status badges:
    - `running`: Pulsing dot badge with `bg-dc-600/20 text-dc-300 border-dc-500/30`.
    - `completed`: Green checkmark badge with `bg-emerald-500/15 text-emerald-300 border-emerald-500/30`.
    - `failed`: Red alert triangle badge with `bg-rose-500/15 text-rose-300 border-rose-500/30`.
  - Interactive selection showing session detail, agent specs, diff line counts, live stdout terminal stream, and trace inspector.

### `src/components/sections/CustomizationSection.tsx`
- **Purpose**: Custom instructions, MCP server integration, and agent extensions section.
- **Headline & Description**:
  - "Your rules, your agents"
  - "Ensure agents follow your practices and team workflows. Define custom instructions, add agent skills, or build custom agents tailored to your project."
- **Feature Cards**:
  - Custom instructions (`.dardcor/instructions.md`): Markdown standards and rules for agent reasoning.
  - MCP servers (`.dardcor/mcp.json`): Open Model Context Protocol integration for Postgres, GitHub, Linear, etc.
  - Agent plugins/extensions (`agent-extension.json`): Packaging reusable skills, tools, and custom archetypes.
- **Interactive Inspector**:
  - Allows previewing config snippets with runtime verification badge.
- **CTA**: "Connect to external tools with MCP servers" linking to `/features/customizations`.
