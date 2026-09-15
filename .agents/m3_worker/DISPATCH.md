## 2026-09-10T04:40:56Z
You are the Hero & Core AI Sections Worker for Milestone 3.
Your identity: m3_worker
Your working directory: C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\.agents\m3_worker

MANDATORY: Read ORIGINAL_REQUEST.md at:
C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\.agents\ORIGINAL_REQUEST.md
And read PROJECT.md at:
C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\.agents\orchestrator\PROJECT.md
And read TEST_READY.md at:
C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\TEST_READY.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Scope and File Ownership:
You exclusively own and must modify/create:
1. `src/components/sections/Hero.tsx` (MODIFY):
   - Replace with download-focused VSCode homepage style:
     * Headline: "Your home for multi-agent development"
     * Subheadline: "Dardcor Code is a free, open source AI code editor. Build with AI agents that plan, code, and debug for you. Manage multi-agent workflows across environments on Linux, macOS, and Windows."
     * Primary CTA: "Download Dardcor Code" (links to `/release`) with Lucide `Download` icon, styled in brand purple `bg-dc-600 hover:bg-dc-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all`.
     * Secondary links: "Web", "Insiders edition", "other platforms" (all anchored/linked to `/release`).
     * Disclaimer: "By using Dardcor Code, you agree to its license and privacy statement."
     * Animated code editor mockup on the right: tabbed with multiple code files (`Agent.ts`, `Workflow.py`, `Config.json`), cycling automatically on a timer or interactive tab click, showing code lines, status indicators, and brand color `#5a38d9` (`dc-600`).
     * Clean responsive stacking: column on mobile (`< lg`), two-column on desktop (`lg:flex-row`). Full 375px viewport containment.
2. `src/components/sections/AgentsBuild.tsx` (NEW):
   - "Agents that build for you"
   - Description: "Hand off tasks to AI agents that autonomously plan, make code changes, run commands, and iterate until the job is done."
   - Features: CLI-based agent for background bug fixes, browser-integrated agent for feature implementation, cloud agent for PRs.
   - Animated code/task panel mockup (left: task steps & progress, right: code/diff view).
   - CTA: "Get started with agents" -> `/features/agents`.
3. `src/components/sections/MultiSurface.tsx` (NEW):
   - "Any agent, any model"
   - Description: "Use the agent harness that fits your workflow. Run agents locally or in the cloud, with Copilot or third-party providers like Claude and OpenAI."
   - Model grid: Claude, GPT-4o, Gemini, Custom model (cards with icons and descriptions).
   - Surface list: Dardcor Code, CLI, Web, Mobile.
   - CTA: "See how agents work across surfaces" -> `/features/models`.
4. `src/components/sections/SessionsView.tsx` (NEW):
   - "All your sessions, one view"
   - Description: "Stay productive while multiple agents work on tasks in parallel. Track all your agent sessions from a single view, regardless of where they run."
   - UI mockup: session list panel with filter/monitor controls, showing different task states (running with animated pulse, completed with checkmark, failed with alert).
5. `src/components/sections/CustomizationSection.tsx` (NEW):
   - "Your rules, your agents"
   - Description: "Ensure agents follow your practices and team workflows. Define custom instructions, add agent skills, or build custom agents tailored to your project."
   - Feature cards: Custom instructions, MCP servers, Agent plugins/extensions.
   - CTA: "Connect to external tools with MCP servers" -> `/features/customizations`.

Component rules:
- Every component must export default function.
- Semantic `<section id="...">` with responsive container (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24`).
- Strict TypeScript: no `any`, explicit `import type` for all type imports (`verbatimModuleSyntax`).
- Lucide React icons, Tailwind CSS v4 styling matching brand palette (`dc-600`, `surface-card`, `surface-base`, etc.).
- Ensure all external links include `rel="noopener noreferrer" target="_blank"`.

Verification:
- Run `node scripts/test-e2e.mjs --milestone M3` and ensure all 18 M3 tests pass.
- Run `npm run lint` and ensure exit code 0.
- Run `npm run build` and ensure exit code 0.

Write your changes to `changes.md` and `handoff.md` in your working directory and notify the orchestrator when finished.
