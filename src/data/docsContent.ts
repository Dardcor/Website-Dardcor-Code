export interface DocsSection {
  heading: string;
  body: string;
  bullets?: string[];
  code?: string;
}

export interface DocsArticle {
  path: string;
  title: string;
  category: string;
  summary: string;
  sections: DocsSection[];
  aliases?: string[];
}

const section = (heading: string, body: string, bullets?: string[], code?: string): DocsSection => ({
  heading,
  body,
  ...(bullets ? { bullets } : {}),
  ...(code ? { code } : {}),
});

export const docsArticles: DocsArticle[] = [
  {
    path: '/docs/permissions', title: 'Agent permissions', category: 'Agents & automation',
    summary: 'Choose how Dardcor Code asks before an agent changes files, runs commands, or interacts with external services.',
    sections: [
      section('Choose an access level', 'The access control next to the model picker applies to the current chat session. It controls approval prompts; it does not decide whether an agent should continue working or whether its result is complete.', [
        'Ask for approval pauses before actions that need your permission. Review the command or change and approve or reject it in context.',
        'Approve for me allows actions classified as routine by the configured policy and asks before risky, unclear, or unfamiliar actions.',
        'Full access allows the session to use the available tools without per-action prompts. Organization policy can disable or limit this choice.',
      ]),
      section('Review the action before approving', 'An approval is scoped to the action shown in the prompt. Read the command, target files, network destination, and expected effect. If the action is broader than the task requires, reject it and ask the agent to narrow the operation.', [
        'Commands that delete data, change security settings, install software, or publish changes deserve close review.',
        'A browser action can submit forms or change remote data. Confirm that the page and account are the intended ones.',
        'Do not paste secrets into chat or terminal commands unless the task requires it and you trust the destination.',
      ]),
      section('Understand the boundary', 'Permissions are a user control, not a guarantee that a model will behave correctly. Workspace trust, operating-system permissions, available tools, and organization policies continue to apply. A model response saying that work is complete is not proof that it succeeded; inspect the diff and requested verification results.'),
    ],
    aliases: ['/docs/agents/run/approvals', '/docs/agents/run/permissions', '/docs/permissions/approval-modes', '/docs/permissions/sandboxing'],
  },
  {
    path: '/docs/agents/run/security', title: 'Agent safety and security', category: 'Agents & automation',
    summary: 'Understand the controls around agent tools, untrusted content, shell commands, and external websites.',
    sections: [
      section('Treat tool input as a proposed action', 'Agents can read project content and may propose commands or edits based on it. Review actions that can modify your system, expose private data, or contact a network service.', ['Keep credentials out of source files and prompts.', 'Review untrusted repository instructions before running commands.', 'Use the least powerful access level that lets the task proceed.']),
      section('Use workspace boundaries', 'Open only repositories you trust. The editor’s workspace trust controls and operating-system permissions provide additional boundaries; access mode does not replace them.'),
      section('Inspect results', 'Review changed files, command output, and verification evidence before accepting generated changes. Revert or edit changes that do not match the requested scope.'),
    ],
  },
  {
    path: '/docs/agent-customization/overview', title: 'Customize agents', category: 'Agents & automation',
    summary: 'Shape agent behavior with workspace instructions, custom agents, reusable prompts, skills, and tools.',
    sections: [
      section('Keep instructions focused', 'Put stable project conventions in instruction files. Use a custom agent for a distinct role, a prompt file for a repeatable task, and a skill for expertise that should load only when relevant.'),
      section('Start with a small configuration', 'Add one customization, try it on a representative task, and inspect the resulting behavior. Remove conflicting or duplicated instructions so the model has a clear source of guidance.'),
      section('Workspace and user scope', 'Workspace configuration belongs with the repository and can be shared with teammates. User-level configuration follows your profile. Avoid committing machine-specific paths or credentials.'),
    ],
    aliases: ['/docs/agent-customization', '/docs/dardcor/customization', '/docs/dardcor/customization/overview'],
  },
  {
    path: '/docs/agent-customization/custom-agents', title: 'Custom agents', category: 'Agents & automation',
    summary: 'Define a focused agent profile with a clear role, instructions, and an intentionally limited set of tools.',
    sections: [
      section('Create an agent profile', 'Create a Markdown profile in the agent configuration location supported by your installation. Give it a descriptive name, a short purpose, and instructions that explain the expected output.'),
      section('Limit the tool set', 'Enable only the tools needed for the role. A review agent may need read and search tools; a release agent may need additional command access that should be approved separately.'),
      section('Check the result', 'Select the profile in chat and try a small task. Confirm that the agent follows its role and that its available tools match the intended boundary.'),
    ],
    aliases: ['/docs/dardcor/customization/custom-agents'],
  },
  {
    path: '/docs/agent-customization/agent-skills', title: 'Agent skills', category: 'Agents & automation',
    summary: 'Package reusable task guidance and supporting files so an agent can load them when relevant.',
    sections: [
      section('Organize a skill', 'A skill is a directory containing a `SKILL.md` file and, optionally, scripts or reference material. Keep its description specific so the agent can recognize when it applies.'),
      section('Write actionable steps', 'Explain the task trigger, required inputs, safe workflow, and expected deliverable. Link to supporting references instead of placing a large unrelated guide in the main instructions.'),
      section('Keep the skill portable', 'Use relative paths inside the skill directory. Review scripts before running them and avoid storing secrets in skill files.'),
    ],
    aliases: ['/docs/dardcor/customization/agent-skills'],
  },
  {
    path: '/docs/agent-customization/custom-instructions', title: 'Custom instructions', category: 'Agents & automation',
    summary: 'Tell the agent about project conventions that should apply across relevant coding tasks.',
    sections: [
      section('Project instruction files', 'Keep repository-wide guidance near the project, using the instruction file locations recognized by Dardcor Code. Instructions should describe conventions and workflow rather than repeat the user’s current task.'),
      section('File-specific guidance', 'Use path-scoped instruction files when rules apply only to a part of the repository. Keep the scope patterns narrow and check that they match the intended files.'),
      section('Resolve conflicts', 'Remove outdated or contradictory directions. Prefer concise, testable rules and identify which guidance is authoritative when multiple files apply.'),
    ],
    aliases: ['/docs/dardcor/customization/custom-instructions', '/docs/agent-customization/instructions', '/docs/dardcor/dardcor-customization'],
  },
  {
    path: '/docs/agent-customization/hooks', title: 'Agent hooks', category: 'Agents & automation',
    summary: 'Run configured automation at supported points in an agent workflow.',
    sections: [
      section('Use hooks carefully', 'Hooks can run commands when an agent reaches a supported lifecycle event. Treat hook configuration as executable code and review every command before enabling it.'),
      section('Make hooks predictable', 'Prefer short, local checks with explicit inputs and exit codes. Make scripts safe to run more than once and avoid destructive side effects.'),
      section('Troubleshoot a hook', 'Check the hook event name, configuration syntax, executable path, working directory, and captured output. Disable the hook temporarily to determine whether it is blocking the agent workflow.'),
    ],
    aliases: ['/docs/dardcor/customization/hooks'],
  },
  {
    path: '/docs/agent-customization/prompt-files', title: 'Prompt files', category: 'Agents & automation',
    summary: 'Save a repeatable prompt with optional context files for a task you run more than once.',
    sections: [
      section('Write a reusable prompt', 'Describe the goal, inputs, constraints, and output format. Use placeholders or linked workspace files for values that vary between runs.'),
      section('Keep context relevant', 'Attach only the files needed for the task. Large or unrelated context can distract the model and consume the available context window.'),
      section('Review before running', 'A prompt file is an instruction source. Read its contents and referenced files before using it in a repository you did not create.'),
    ],
    aliases: ['/docs/dardcor/customization/prompt-files'],
  },
  {
    path: '/docs/agent-customization/tools', title: 'Agent tools', category: 'Agents & automation',
    summary: 'Understand how built-in, extension, and MCP tools expose actions to an agent.',
    sections: [
      section('Tool lifecycle', 'A tool describes an operation and its input schema. The model can request a tool call; Dardcor Code validates the request, applies the current approval policy, runs the action, and returns its result to the conversation.'),
      section('Choose least privilege', 'Expose only the operations needed for a task. Read-only tools are easier to review than tools that write files, execute commands, or access remote services.'),
      section('Handle failures clearly', 'Tool errors should remain visible to the agent and user. Inspect the reported failure before retrying, especially if the first attempt may have partially changed data.'),
    ],
  },
  {
    path: '/docs/agent-customization/language-models', title: 'Models and providers', category: 'Dardcor Router',
    summary: 'Choose a configured model and understand the provider, context, and capability tradeoffs.',
    sections: [
      section('Select a model for the task', 'Different models vary in latency, context size, tool support, and cost. Check the model’s capabilities in Dardcor Router and choose one that supports the tools required by the task.'),
      section('Configure providers in Router', 'Dardcor Router stores provider configuration in its JSON-backed settings. Use Router’s model and credential controls, then select an available model in the editor.'),
      section('Protect credentials', 'Keep provider tokens in the supported credential store. Do not place API keys in workspace settings, prompt files, screenshots, or source control.'),
    ],
    aliases: ['/docs/dardcor/customization/language-models', '/docs/agent-customization/models'],
  },
  {
    path: '/docs/agent-customization/agent-plugins', title: 'Agent plugins', category: 'Agents & automation',
    summary: 'Extend agent workflows with reviewed plugin capabilities.',
    sections: [
      section('Review a plugin before enabling it', 'A plugin may contribute tools, instructions, or other executable behavior. Check its source, permissions, and update history before making it available in a workspace.'),
      section('Manage plugin sources', 'Use the application’s plugin and marketplace settings to select trusted sources. Keep workspace plugin configuration explicit and avoid adding unknown registries.'),
      section('Troubleshoot loading', 'Check the plugin identifier, source availability, compatibility, and editor logs. Disable one plugin at a time to isolate a conflict.'),
    ],
    aliases: ['/docs/dardcor/customization/agent-plugins'],
  },
  {
    path: '/docs/agent-customization/mcp-servers', title: 'MCP servers', category: 'Integrations',
    summary: 'Connect Model Context Protocol servers and control which tools they make available.',
    sections: [
      section('Add a server', 'Configure the server command or endpoint in the MCP settings supported by your workspace. Confirm the executable, arguments, environment, and transport before starting it.'),
      section('Review exposed tools', 'Inspect each server’s tool names, descriptions, and input schema. Disable tools that are unnecessary for the task and require approval for actions that modify external systems.'),
      section('Troubleshoot connection issues', 'Check that the server process starts, the transport is reachable, and required environment variables are present. Review Dardcor Code output logs for initialization and protocol errors.'),
    ],
    aliases: ['/docs/dardcor/customization/mcp-servers', '/docs/dardcor/chat/mcp-servers', '/docs/agent-customization/mcp-servers/install/dotnet', '/docs/agent-customization/mcp-servers/install/npx', '/docs/agent-customization/mcp-servers/install/uvx', '/docs/agent-customization/mcp-servers/install/debugpy', '/docs/agent-customization/mcp-servers/install/dnx'],
  },
  {
    path: '/docs/editor/workspace-trust', title: 'Workspace trust', category: 'Editor & workspace',
    summary: 'Decide whether a project can use features that may execute code or load workspace configuration.',
    sections: [
      section('Open unfamiliar projects cautiously', 'A repository can contain tasks, scripts, extensions, and agent instructions. Start in restricted mode when you do not know or trust its source.'),
      section('Grant trust deliberately', 'Trust only a project whose contents and maintainers you have reviewed. Trust can enable additional workspace behavior, so it should be treated as a security decision.'),
      section('Review agent instructions', 'Workspace instructions and skills can influence agent behavior. Inspect new instruction files before asking an agent to make changes.'),
    ],
  },
  {
    path: '/docs/editor/integrated-terminal', title: 'Integrated terminal', category: 'Editor & workspace',
    summary: 'Run your shell inside the editor and understand how agent command execution relates to it.',
    sections: [
      section('Open and configure a terminal', 'Create a terminal from the Terminal menu or use the configured keyboard shortcut. Select a shell profile that is installed on your system and appropriate for the workspace.'),
      section('Interactive and agent commands', 'A visible terminal is useful for commands you control directly. Agent-run commands may use a separate execution path and approval policy; inspect the command and output in the chat.'),
      section('Diagnose launch problems', 'Check the selected profile path, shell arguments, environment variables, and system permissions. Review terminal output logs when the process exits during startup.'),
    ],
  },
  {
    path: '/docs/terminal/profiles', title: 'Terminal profiles', category: 'Editor & workspace',
    summary: 'Configure the shells that appear in the integrated terminal profile picker.',
    sections: [
      section('Choose a profile', 'A profile identifies the shell executable, arguments, and environment used to start a terminal. Confirm that the executable exists and is accessible to the application.'),
      section('Use platform-specific settings', 'Windows, macOS, and Linux use different shell paths and startup conventions. Keep operating-system-specific profile settings in the appropriate user or workspace configuration.'),
      section('Fix a profile that will not start', 'Check quoting, executable paths, startup scripts, and environment overrides. Remove custom arguments temporarily to isolate the failing setting.'),
    ],
  },
  {
    path: '/docs/terminal/shell-integration', title: 'Shell integration', category: 'Editor & workspace',
    summary: 'Enable shell integration so the editor can identify prompts, commands, and their results.',
    sections: [
      section('What integration provides', 'When the shell supports integration, the terminal can track command boundaries and provide richer navigation and completion behavior.'),
      section('Check whether it is active', 'Open a new terminal and look for the integration status in terminal controls. Existing sessions may need to be restarted after changing shell settings.'),
      section('Resolve startup conflicts', 'Custom shell startup files can prevent integration scripts from loading. Compare a clean shell session with your configured profile and review terminal logs.'),
      section('Manual setup', 'If automatic setup does not work in your shell, follow the application’s supported manual installation instructions and confirm that the script matches the shell and operating system in use.'),
    ],
  },
  {
    path: '/docs/terminal/suggestions', title: 'Terminal suggestions', category: 'Editor & workspace',
    summary: 'Use command suggestions in supported shells and troubleshoot missing completions.',
    sections: [
      section('Requirements', 'Suggestions depend on the selected shell, terminal integration, and the relevant editor settings. Start a new terminal after changing these settings.'),
      section('Check shell support', 'Confirm that the shell version is supported and that startup scripts allow the integration environment to load.'),
      section('Privacy and context', 'Terminal suggestions may use recent command context. Avoid exposing secrets in command history and review the product privacy settings for your installation.'),
    ],
  },
  {
    path: '/docs/editor/versioncontrol', title: 'Source control', category: 'Editor & workspace',
    summary: 'Review repository changes and use the source control view for common Git operations.',
    sections: [
      section('Inspect changes', 'The source control view lists modified files and lets you inspect diffs before staging. Review generated files and unrelated changes before creating a commit.'),
      section('Stage and commit', 'Stage only the files intended for the commit, write a message that describes the change, and verify the staged diff before committing.'),
      section('Use the command line when needed', 'The integrated terminal can run Git commands for operations that are not exposed in the source control view. Check the current branch and repository status before destructive commands.'),
    ],
    aliases: ['/docs/editor/git-repository-in-parent-folders'],
  },
  {
    path: '/docs/editor/extension-gallery', title: 'Extensions', category: 'Editor & workspace',
    summary: 'Find, install, update, and manage extensions in Dardcor Code.',
    sections: [
      section('Choose extensions carefully', 'Review an extension’s publisher, permissions, source, and compatibility before installation. Extensions can execute code with the privileges available to the editor.'),
      section('Manage installed extensions', 'Use the Extensions view to inspect installed items, update them, or disable them for a workspace. Restart or reload when an extension requests it.'),
      section('Troubleshoot conflicts', 'Disable recently added extensions and reload the editor. Re-enable extensions one at a time to find a conflict.'),
    ],
  },
  {
    path: '/docs/editor/accessibility', title: 'Accessibility', category: 'Editor & workspace',
    summary: 'Configure keyboard navigation, screen-reader support, and accessible terminal behavior.',
    sections: [
      section('Keyboard navigation', 'Use the Command Palette and keyboard shortcuts to reach editor, terminal, and chat controls. Check the Keyboard Shortcuts editor when a shortcut conflicts with another application.'),
      section('Screen readers', 'Enable screen-reader optimized mode when needed and verify that the editor announces the active control and result. Use accessible help views to discover commands.'),
      section('Terminal accessibility', 'Terminal accessibility settings can improve command and output navigation. Choose settings that fit your screen reader and shell workflow.'),
    ],
  },
  {
    path: '/docs/editor/codebasics', title: 'Editing code', category: 'Editor & workspace',
    summary: 'Use selection, search, multi-cursor editing, and save behavior in the code editor.',
    sections: [
      section('Search and replace', 'Use editor search for the current file and global search for a workspace. Check case, whole-word, and regular-expression options before applying a large replacement.'),
      section('Multiple cursors', 'Add cursors to edit repeated text in several locations. Review the resulting diff before saving when edits span many lines.'),
      section('Save behavior', 'Configure automatic saving if it fits your workflow. Keep source control enabled so changes remain reviewable.'),
    ],
  },
  {
    path: '/docs/editor/editingevolved', title: 'Code navigation and actions', category: 'Editor & workspace',
    summary: 'Navigate symbols, inspect references, and apply code actions offered by language tools.',
    sections: [
      section('Navigate code', 'Use Go to Definition, Find References, and symbol search when supported by the active language service. Results depend on the project and installed extensions.'),
      section('Apply code actions', 'A lightbulb indicates that a provider offers an action for the current location. Preview broad edits and check the diff before accepting them.'),
      section('When navigation is unavailable', 'Confirm that the language extension is installed, the project is open at its root, and the language server has finished loading.'),
    ],
  },
  {
    path: '/docs/editor/tasks', title: 'Tasks and problem matchers', category: 'Build & debug',
    summary: 'Define repeatable project commands and connect their output to editor diagnostics.',
    sections: [
      section('Create a task', 'Start with the project’s existing scripts or build commands. Keep task arguments explicit and avoid embedding secrets.'),
      section('Match diagnostics', 'A problem matcher maps command output to file, line, column, and message fields. Validate it against actual command output before relying on it.'),
      section('Run safely', 'A task can modify files or start long-running processes. Inspect its definition and output, and stop it when it is no longer needed.'),
    ],
  },
  {
    path: '/docs/debugtest/tasks', title: 'Build and test tasks', category: 'Build & debug',
    summary: 'Run project build or test commands as editor tasks and review their results.',
    sections: [
      section('Use the project’s scripts', 'Prefer the build and test commands documented by the repository. A task should call the project’s existing scripts rather than duplicate their logic.'),
      section('Read the complete result', 'A task is successful only when its process exits successfully and the expected output is present. A command that starts and then stops early is not verification.'),
      section('Keep tasks maintainable', 'Use descriptive labels, explicit working directories, and appropriate problem matchers. Avoid assuming that every developer has the same global tools installed.'),
    ],
  },
  {
    path: '/docs/languages/javascript', title: 'JavaScript and TypeScript', category: 'Languages',
    summary: 'Configure language support and diagnose project indexing or validation issues.',
    sections: [
      section('Open the project root', 'Open the directory that contains the project configuration so the language service can resolve dependencies and workspace settings.'),
      section('Use project-local tools', 'Install the dependencies declared by the repository and use its scripts for validation. Keep compiler options in the project configuration.'),
      section('Resolve stale diagnostics', 'Wait for indexing to finish, inspect the Problems view, and restart the language service if it remains out of sync with the current files.'),
    ],
    aliases: ['/docs/nodejs/working-with-javascript'],
  },
  {
    path: '/docs/languages/typescript', title: 'TypeScript', category: 'Languages',
    summary: 'Configure TypeScript language services and choose a compiler version for your project.',
    sections: [
      section('Use the project compiler', 'Install the TypeScript dependency declared by the project and select the workspace version when the editor asks. This keeps editor diagnostics aligned with the build.'),
      section('Configure project checks', 'Use the project’s `tsconfig.json` to set strictness, module resolution, and included files. Run the repository’s own typecheck script to confirm the same configuration used in CI.'),
      section('Resolve stale or missing features', 'Wait for project loading to finish, check the active TypeScript version, and restart the language service when it remains out of sync.'),
    ],
    aliases: ['/docs/typescript/typescript-compiling'],
  },
  {
    path: '/docs/languages/css', title: 'CSS', category: 'Languages',
    summary: 'Use built-in CSS editing features and configure validation for stylesheets.',
    sections: [
      section('Navigate styles', 'Use document symbols, color previews, and references to move between selectors and their usages where the stylesheet service supports them.'),
      section('Configure validation', 'Check the CSS validation settings and project tooling. Lint diagnostics from an extension may appear alongside the built-in language service.'),
      section('Work with preprocessors', 'Install the extension that supports your preprocessor and verify that generated or virtual files are handled as expected.'),
    ],
  },
  {
    path: '/docs/languages/html', title: 'HTML', category: 'Languages',
    summary: 'Edit HTML with language-aware completion, navigation, and embedded-language support.',
    sections: [
      section('Use completion and navigation', 'HTML language features can provide tag completion, document symbols, and navigation between linked resources. Confirm that the file is recognized as HTML.'),
      section('Configure embedded languages', 'Scripts and styles embedded in HTML use their corresponding language services. Install the needed extensions and check project configuration.'),
      section('Validate output', 'Use the project’s formatter and validation tools when the built-in language service does not cover your requirements.'),
    ],
  },
  {
    path: '/docs/languages/json', title: 'JSON', category: 'Languages',
    summary: 'Validate JSON and connect files to schemas for completion and diagnostics.',
    sections: [
      section('Use schema validation', 'Associate a JSON file with a schema using the supported settings or a schema declaration in the file. Schemas can provide completion, validation, and hover information.'),
      section('Check comments and variants', 'JSONC and JSON are different file modes. Use the format expected by the application or tool that reads the file.'),
      section('Resolve a schema mismatch', 'Confirm which schema is selected, inspect the Problems view, and check whether the schema URL or local file is reachable.'),
    ],
  },
  {
    path: '/docs/languages/markdown', title: 'Markdown', category: 'Languages',
    summary: 'Edit Markdown and preview rendered documentation while keeping links and assets valid.',
    sections: [
      section('Open the preview', 'Use the Markdown preview command to inspect headings, lists, links, and embedded assets as they render.'),
      section('Navigate large documents', 'Use the document outline and heading links to move through long files. Keep heading levels in a consistent order.'),
      section('Check links before publishing', 'Verify relative paths and external destinations in the project context. Preview rendering does not confirm that a remote destination is available.'),
    ],
  },
  {
    path: '/docs/languages/php', title: 'PHP', category: 'Languages',
    summary: 'Set up PHP language features and use the project’s installed runtime and tooling.',
    sections: [
      section('Select the PHP runtime', 'Install PHP and configure the executable path required by your tools. Check that the terminal and editor use the intended version.'),
      section('Add language features', 'Choose a maintained PHP extension for completion, diagnostics, and navigation. Review its formatter and analyzer settings.'),
      section('Run project checks', 'Use Composer scripts or project documentation for tests and static analysis. Report the exact command and runtime version when troubleshooting.'),
    ],
  },
  {
    path: '/docs/nodejs/nodejs-tutorial', title: 'Node.js projects', category: 'Languages',
    summary: 'Open, run, and debug a Node.js project using its declared scripts and runtime.',
    sections: [
      section('Open the project root', 'Open the directory containing `package.json` so the editor can resolve dependencies, scripts, and workspace settings.'),
      section('Use the project runtime', 'Check the supported Node.js version in the project’s version file or package metadata. Install dependencies using the package manager and lockfile the project specifies.'),
      section('Run a project script', 'Inspect available scripts before running them. Prefer the repository’s existing test, lint, and build commands over global tooling.'),
    ],
  },
  {
    path: '/docs/languages/typescript/preview', title: 'TypeScript preview features', category: 'Languages',
    summary: 'Evaluate preview TypeScript support in a separate project workflow before adopting it.',
    sections: [
      section('Check the selected compiler', 'Preview language features may depend on the workspace TypeScript version and editor extension. Confirm both before changing project configuration.'),
      section('Try it in a branch', 'Test preview behavior in a small branch or sample project. Keep production builds pinned to the version supported by your project.'),
      section('Report incompatibilities', 'Include the TypeScript version, editor version, language service output, and a minimal example when a preview feature behaves unexpectedly.'),
    ],
  },
  {
    path: '/docs/languages/javascript/partial-mode', title: 'JavaScript language service limits', category: 'Languages',
    summary: 'Understand reduced language-service behavior when a project is too large or incomplete to analyze fully.',
    sections: [
      section('Check project loading', 'Large workspaces or unresolved dependencies can limit navigation and diagnostics. Open the correct project root and wait for indexing to finish.'),
      section('Reduce unnecessary work', 'Exclude generated output and dependencies from project analysis where appropriate. Keep exclusions narrow so useful source files remain available.'),
      section('Inspect service status', 'Review language service logs and restart the service after changing project files or TypeScript configuration.'),
    ],
  },
  {
    path: '/docs/editor/multi-root-workspaces', title: 'Multi-root workspaces', category: 'Editor & workspace',
    summary: 'Work with several related project folders in one workspace window.',
    sections: [
      section('Add workspace folders', 'Add related folders to a workspace when they share a development task. Give each root a clear name so it is easy to distinguish files and terminal locations.'),
      section('Scope configuration', 'Workspace settings can apply across roots, while individual project files may configure their own tools. Check which folder owns a setting or task.'),
      section('Keep paths portable', 'Prefer workspace-relative paths in shared configuration. Avoid committing absolute paths tied to one developer’s machine.'),
    ],
  },
  {
    path: '/docs/editor/portable', title: 'Portable mode', category: 'Editor & workspace',
    summary: 'Understand where a portable installation stores application data and how to back it up.',
    sections: [
      section('Check installation support', 'Portable mode depends on the Dardcor Code package and operating system. Consult the distribution notes for the build you installed.'),
      section('Protect portable data', 'Settings, extensions, and state stored beside the application should be backed up and protected like workspace data.'),
      section('Move the installation carefully', 'Close the editor before copying its data directory. Verify that the new location is writable and that installed extensions load.'),
    ],
  },
  {
    path: '/docs/extensions/overview', title: 'Extension development', category: 'Extensions & APIs',
    summary: 'Build an extension that contributes commands, language support, views, or agent tools.',
    sections: [
      section('Create a minimal extension', 'Start with a small manifest and one contribution. Use the extension development host to inspect activation and UI behavior.'),
      section('Declare supported APIs', 'Set the engine compatibility range and declare contribution points accurately. Avoid APIs that are not available in the Dardcor Code target.'),
      section('Test and package', 'Run the extension checks, test a clean installation, and inspect the package contents before distribution.'),
    ],
  },
  {
    path: '/docs/setup/linux', title: 'Install on Linux', category: 'Getting started',
    summary: 'Install Dardcor Code on a supported Linux distribution and verify its prerequisites.',
    sections: [
      section('Choose a package', 'Download a package from the Dardcor Code release page for the correct architecture and distribution format.'),
      section('Check system dependencies', 'Install required system libraries using your distribution package manager. Review startup output if the application cannot load its native components.'),
      section('Keep the installation current', 'Use the release channel documented by Dardcor Code and back up important settings before changing package sources.'),
    ],
  },
  {
    path: '/docs/setup/windows', title: 'Install on Windows', category: 'Getting started',
    summary: 'Install Dardcor Code on Windows and prepare its terminal and file associations.',
    sections: [
      section('Select the installer', 'Choose the Dardcor Code release package that matches your Windows architecture and installation preference.'),
      section('Set up a shell', 'Confirm that PowerShell or another supported shell is installed. Choose a terminal profile after installation.'),
      section('Resolve startup issues', 'Check Windows security prompts, permissions, system requirements, and the application startup log.'),
    ],
  },
  {
    path: '/docs/setup/mac', title: 'Install on macOS', category: 'Getting started',
    summary: 'Install Dardcor Code on macOS and verify system and architecture compatibility.',
    sections: [
      section('Choose the package', 'Download the Dardcor Code package that matches your Mac processor architecture and release channel.'),
      section('Complete first launch', 'Move the application to the intended location and follow macOS security prompts for software from the project’s distribution channel.'),
      section('Check startup problems', 'Confirm the macOS version, processor architecture, available disk space, and application logs.'),
    ],
  },
  {
    path: '/docs/languages/identifiers', title: 'Language identifiers', category: 'Languages',
    summary: 'Find the language ID used by settings, snippets, and language-specific extensions.',
    sections: [
      section('Where identifiers are used', 'Language IDs appear in settings, snippet files, extension contributions, and editor commands. They are stable identifiers and may differ from the display name.'),
      section('Confirm the active language', 'Check the language mode shown in the editor status bar. Use that value when a setting or snippet requires a language identifier.'),
      section('Extension contributions', 'When authoring an extension, declare supported language IDs explicitly and test them with representative file extensions.'),
    ],
  },
  {
    path: '/docs/remote/overview', title: 'Remote development', category: 'Remote development',
    summary: 'Understand the local editor and remote workspace boundary before connecting to another machine.',
    sections: [
      section('Local interface, remote tools', 'A remote workspace can run files, terminals, and extensions on another host while the editor interface stays on your device. Confirm which machine owns each file and process.'),
      section('Protect remote access', 'Use trusted hosts and supported authentication. Review forwarded ports and remote extensions before exposing a service.'),
      section('Diagnose a connection', 'Check network reachability, credentials, remote prerequisites, and the connection log. Retry only after confirming that the previous session has closed cleanly.'),
    ],
    aliases: ['/docs/remote'],
  },
  {
    path: '/docs/remote/wsl', title: 'Windows Subsystem for Linux', category: 'Remote development',
    summary: 'Open a Linux workspace from Windows and troubleshoot the editor connection to WSL.',
    sections: [
      section('Prepare WSL', 'Install and start a supported WSL distribution, then confirm that the Linux shell can access the project and required tools.'),
      section('Open the Linux project', 'Use the Dardcor Code remote workflow to open a directory inside the distribution. Keep source files on the filesystem that best fits the project’s toolchain.'),
      section('Fix connection failures', 'Check the distribution status, available disk space, networking, and remote server logs. Restart the distribution if a stale process prevents a new session.'),
    ],
  },
  {
    path: '/docs/remote/server', title: 'Remote server', category: 'Remote development',
    summary: 'Learn what the remote server does and how to diagnose a failed connection.',
    sections: [
      section('Server role', 'A remote server provides editor services on the target host. It is separate from the local user interface and may install a server build the first time you connect.'),
      section('Network and permissions', 'Confirm that the remote host is reachable and that the account can start the server in its data directory. Follow your organization’s rules for forwarded ports.'),
      section('Collect diagnostics', 'Use the remote connection log and server process output to identify download, startup, or authentication failures.'),
    ],
    aliases: ['/docs/remote/vscode-server'],
  },
  {
    path: '/docs/remote/tunnels', title: 'Remote tunnels', category: 'Remote development',
    summary: 'Connect to a development machine through a tunnel and manage its access deliberately.',
    sections: [
      section('Start a tunnel', 'Sign in with the account configured for your installation and start a tunnel on the host machine. Keep the host online while a remote session is needed.'),
      section('Control access', 'A tunnel provides remote access to a development environment. Share it only with intended users and stop it when it is no longer needed.'),
      section('Troubleshoot', 'Check account authorization, host connectivity, tunnel status, and firewall rules. Verify which machine is running commands before changing files.'),
    ],
  },
  {
    path: '/docs/enterprise/overview', title: 'Enterprise administration', category: 'Administration',
    summary: 'Plan deployment, policies, model providers, and extension access for a managed environment.',
    sections: [
      section('Define policy', 'Decide which providers, extensions, network destinations, and agent access levels are permitted. Communicate which settings are managed centrally and which users can change.'),
      section('Manage configuration', 'Use supported policy and deployment mechanisms for your Dardcor Code build. Validate changes with a pilot group before distributing them broadly.'),
      section('Review data handling', 'Document where model requests, credentials, logs, and workspace files travel. Confirm behavior with the selected provider and the organization’s contracts.'),
    ],
    aliases: ['/docs/setup/enterprise'],
  },
  {
    path: '/docs/extensions/security', title: 'Extension security', category: 'Extensions & APIs',
    summary: 'Assess extension publisher identity, permissions, updates, and workspace impact.',
    sections: [
      section('Verify the publisher', 'Check the publisher name and verification status in the extension details. A verified identity helps identify the publisher; it does not certify that every extension behavior is safe.'),
      section('Review capabilities', 'Extensions may access workspace files, start processes, and make network requests. Install only extensions you need and keep them updated from a trusted source.'),
      section('Investigate a warning', 'Use the extension details and editor logs to understand the warning. Disable the extension if its behavior is unexpected.'),
    ],
  },
  {
    path: '/docs/extensions/troubleshooting/bisect', title: 'Find extension conflicts', category: 'Extensions & APIs',
    summary: 'Narrow down editor problems by disabling groups of extensions and comparing behavior.',
    sections: [
      section('Start an extension bisect', 'Use the extension troubleshooting command to disable a group of extensions, then check whether the issue remains. The editor narrows the set over repeated steps.'),
      section('Keep the reproduction consistent', 'Repeat the same action, workspace, and settings during each step. Note the result so the comparison stays reliable.'),
      section('Restore your setup', 'When the failing extension is identified, update or disable it and restore other extensions that were temporarily disabled.'),
    ],
  },
  {
    path: '/docs/extensions/web', title: 'Web extensions', category: 'Extensions & APIs',
    summary: 'Understand which extension features can run in a browser-based editor environment.',
    sections: [
      section('Check runtime support', 'Web extensions run in a browser-compatible extension host and cannot use every Node.js or operating-system API. Review the extension manifest and implementation for supported environments.'),
      section('Move work to a supported host', 'An extension can use a remote or workspace host for operations that need filesystem or process access, if its architecture supports that model.'),
      section('Test the web target', 'Validate activation, file access, and dependencies in the intended browser environment. A desktop-only test does not confirm web compatibility.'),
    ],
  },
  {
    path: '/docs/extensions/api/webviews', title: 'Extension webviews', category: 'Extensions & APIs',
    summary: 'Build a webview with a restrictive content policy and safe resource URLs.',
    sections: [
      section('Restrict web content', 'Use a content security policy that allows only the scripts, styles, and resources the view needs. Avoid enabling remote scripts or inline execution without a concrete requirement.'),
      section('Convert local resources', 'Use the extension API’s webview URI conversion method to expose local assets. Do not construct privileged filesystem URLs by hand.'),
      section('Validate messages', 'Treat messages from the webview as untrusted input. Validate their shape and allowed commands in the extension host before acting on them.'),
    ],
  },
  {
    path: '/api/extension-guides/tools', title: 'Language model tool API', category: 'Extensions & APIs',
    summary: 'Expose a validated extension operation as a tool that an agent can request.',
    sections: [
      section('Declare the tool', 'Register a tool with a stable name, a clear description, and an input schema. The description should explain limits and side effects so users and models can choose it appropriately.'),
      section('Validate and execute input', 'Treat model-generated arguments as untrusted. Validate types, ranges, paths, and allowed operations in the extension host before performing work.'),
      section('Return useful results', 'Return concise results that distinguish success, partial completion, and failure. Respect cancellation and do not hide an error that could change the user’s next decision.'),
    ],
  },
  {
    path: '/api/extension-guides/chat', title: 'Chat participant API', category: 'Extensions & APIs',
    summary: 'Add a chat participant that handles requests and streams a response from an extension.',
    sections: [
      section('Register a participant', 'Declare the participant metadata and activation behavior supported by the target Dardcor Code API. Use a recognizable name and a short description.'),
      section('Handle a request', 'Read the prompt, selected context, and cancellation token. Stream incremental output where supported and make errors visible to the user.'),
      section('Keep data scoped', 'Request only the workspace context needed for the task. Do not forward source files or credentials to a service without the user’s knowledge and an appropriate policy.'),
    ],
  },
  {
    path: '/api/references/vscode-api', title: 'Extension API reference', category: 'Extensions & APIs',
    summary: 'Use the API types and behavior available in the Dardcor Code extension host.',
    sections: [
      section('Target the shipped API', 'Build against the API declarations and engine version shipped with your Dardcor Code target. Check feature availability before calling optional or proposed APIs.'),
      section('Handle lifecycle and cancellation', 'Dispose event listeners and resources when their owner is disposed. Observe cancellation tokens for long-running work.'),
      section('Test supported hosts', 'Extension APIs can behave differently in desktop, web, and remote extension hosts. Test each runtime your extension claims to support.'),
    ],
  },
  {
    path: '/api/advanced-topics/using-proposed-api', title: 'Preview extension APIs', category: 'Extensions & APIs',
    summary: 'Understand compatibility limits when developing against APIs that are not generally available.',
    sections: [
      section('Expect change', 'Preview APIs can change or be removed between application versions. Keep their use isolated and document the exact target version.'),
      section('Use a development build', 'Enable preview API access only in a controlled development environment. Do not assume a published extension can use an API that the stable host does not expose.'),
      section('Plan a fallback', 'Check whether the extension can provide a reduced feature or a clear message when the preview API is unavailable.'),
    ],
  },
  {
    path: '/api/advanced-topics/remote-extensions', title: 'Extension hosts and remote workspaces', category: 'Extensions & APIs',
    summary: 'Choose where extension code runs and account for local, web, and remote capabilities.',
    sections: [
      section('Select an extension host', 'An extension may run with the local UI, in a web worker, or beside a remote workspace. Choose a host that has access to the APIs and files the extension needs.'),
      section('Separate UI and workspace work', 'Keep user-interface contributions independent from operations that require the workspace filesystem or processes. Communicate across hosts through supported APIs.'),
      section('Handle missing dependencies', 'Check runtime availability before loading native modules or platform-specific tools. Provide an actionable message when the active host cannot perform an operation.'),
    ],
  },
  {
    path: '/api/references/activation-events', title: 'Extension activation events', category: 'Extensions & APIs',
    summary: 'Activate an extension when its contributed feature or supported event is needed.',
    sections: [
      section('Avoid unnecessary startup work', 'Choose activation events that match the extension’s features. Defer expensive setup until the user invokes a relevant command or opens a supported resource.'),
      section('Declare contributions consistently', 'Keep activation events aligned with contributed commands, languages, views, and other manifest metadata.'),
      section('Check activation failures', 'Inspect the extension host log for module loading errors and exceptions during activation. Add clear logging around expected setup failures.'),
    ],
  },
  {
    path: '/api/extension-guides/task-provider', title: 'Task providers', category: 'Extensions & APIs',
    summary: 'Provide project tasks to the editor and define when they can be resolved.',
    sections: [
      section('Describe task types', 'Use a stable task type and define the properties needed to identify or resolve a task. Keep user-provided values separate from executable command construction.'),
      section('Resolve tasks safely', 'Validate task inputs and avoid constructing shell commands from untrusted strings. Use structured process arguments when the API permits.'),
      section('Match task output', 'Pair task execution with an appropriate problem matcher so diagnostics point back to workspace files.'),
    ],
  },
  {
    path: '/api/working-with-extensions/publishing-extension', title: 'Package and publish an extension', category: 'Extensions & APIs',
    summary: 'Prepare extension metadata, package contents, and release channels for distribution.',
    sections: [
      section('Review the manifest', 'Check the extension identifier, version, display name, license, repository, and supported engine range before packaging.'),
      section('Inspect the package', 'Exclude development artifacts, local configuration, credentials, and generated files that are not required at runtime.'),
      section('Release deliberately', 'Validate the packaged extension in a clean installation and document the changes. Protect publishing credentials and use the intended release channel.'),
    ],
  },
  {
    path: '/docs/dardcor/guides/monitoring-agents', title: 'Monitor agent activity', category: 'Agents & automation',
    summary: 'Use visible status, tool results, and logs to understand what an agent has done.',
    sections: [
      section('Follow the current action', 'Review the task state, active tool, and latest result in chat. A status message alone does not prove that a command or browser action succeeded.'),
      section('Inspect evidence', 'Check command exit codes, changed files, browser snapshots, and verification output. Ask the agent to explain any result that is missing or ambiguous.'),
      section('Resume or stop', 'When a task pauses, review the saved checkpoint and next step before continuing. Cancel the session if its actions no longer match your intent.'),
    ],
  },
  {
    path: '/docs/troubleshooting/performance/cpu-profile', title: 'Capture a CPU profile', category: 'Troubleshooting',
    summary: 'Collect performance data when the editor becomes unresponsive or unusually slow.',
    sections: [
      section('Capture during the slowdown', 'Use the application’s performance profiling command while the problem is happening. A profile captured after the slowdown ends may not include the cause.'),
      section('Protect project data', 'Performance profiles can contain file paths and activity details. Review the file before sharing it outside your organization.'),
      section('Report useful context', 'Include the application version, operating system, steps to reproduce, and whether the issue occurs with extensions disabled.'),
    ],
  },
  {
    path: '/docs/troubleshooting/macos-compatibility', title: 'Troubleshoot macOS compatibility', category: 'Troubleshooting',
    summary: 'Check operating-system support and collect diagnostics for startup or compatibility problems.',
    sections: [
      section('Check system requirements', 'Confirm that your macOS version and processor architecture are supported by the Dardcor Code build you installed.'),
      section('Check the installation', 'Verify that the downloaded application came from the Dardcor distribution channel and that macOS completed its security checks.'),
      section('Collect diagnostics', 'Record the version, operating-system build, and startup logs. Remove account and workspace secrets before sharing them.'),
    ],
  },
  {
    path: '/docs/extensions/api/chat', title: 'Chat participant API', category: 'Extensions & APIs',
    summary: 'Create an extension contribution that responds to chat requests through the supported API.',
    sections: [
      section('Declare the contribution', 'Define the participant identifier, display metadata, and activation behavior in the extension manifest supported by your target build.'),
      section('Handle requests', 'Read the request and selected context, then stream a response using the documented extension API. Respect cancellation and report errors in a form the user can act on.'),
      section('Test compatibility', 'Build against the API version shipped by the Dardcor Code target. Proposed or preview APIs can change and should not be assumed available in a stable release.'),
    ],
  },
  {
    path: '/docs/configuration/glob-patterns', title: 'Glob patterns', category: 'Configuration',
    summary: 'Use file patterns to scope settings, searches, tasks, and editor behavior.',
    sections: [
      section('Match the intended files', 'A glob pattern describes paths using wildcards. Check whether matching is relative to the workspace root, the current file, or a configured base path.'),
      section('Test narrow patterns first', 'Try a pattern against a small known set of paths before using it to exclude files or scope an automation.'),
      section('Avoid accidental exclusions', 'Broad patterns can hide files from search, indexing, or validation. Review affected results whenever you change an exclusion.'),
    ],
    aliases: ['/docs/configuration/when-clauses'],
  },
  {
    path: '/docs/user-data/profiles', title: 'Profiles', category: 'Configuration',
    summary: 'Keep editor settings, extensions, and interface preferences organized for different workflows.',
    sections: [
      section('Create a profile', 'Start a profile for a distinct environment or role, then configure only the settings and extensions needed there.'),
      section('Switch and export', 'Check the active profile before changing settings. Export or share a profile only after removing machine-specific paths and private values.'),
      section('Troubleshoot profile behavior', 'Confirm the active profile, inspect its enabled extensions, and compare its settings with the profile where the issue does not occur.'),
    ],
  },
  {
    path: '/docs/user-data/settings-sync', title: 'Settings sync', category: 'Configuration',
    summary: 'Synchronize selected editor settings across devices using the account configured for your build.',
    sections: [
      section('Choose what to sync', 'Review the settings, extensions, and profile data included by your sync configuration. Do not sync secrets or machine-specific configuration.'),
      section('Resolve conflicts', 'When two devices changed the same item, inspect the versions and choose the intended result. Keep a local backup before replacing important settings.'),
      section('Sign-in and privacy', 'Sync uses the configured account and service. Check your organization’s account and data policies before enabling it.'),
    ],
  },
  {
    path: '/docs/privacy/telemetry', title: 'Diagnostics and privacy', category: 'Administration',
    summary: 'Review diagnostics settings and understand which service receives application data.',
    sections: [
      section('Review settings', 'Use the product privacy and telemetry settings to inspect diagnostic data choices for your build. Managed policies may enforce specific values.'),
      section('Check provider behavior separately', 'Model providers can process prompts and context under their own terms. Review the selected provider’s privacy policy and account configuration.'),
      section('Report an issue safely', 'Remove credentials, private source code, account identifiers, and customer data from logs or screenshots before sharing diagnostics.'),
    ],
  },
  {
    path: '/docs/platform/windows/unc-paths', title: 'Windows network paths', category: 'Platforms',
    summary: 'Configure access to Windows UNC paths and understand confirmation prompts.',
    sections: [
      section('Recognize a UNC path', 'A UNC path identifies a network resource using a server and share, for example `\\server\share\project`. Access may depend on Windows credentials and network policy.'),
      section('Allow only trusted hosts', 'Use the supported host allowlist for servers you trust. Confirm unknown hosts before allowing access, especially when a project contains scripts or agent instructions.'),
      section('Troubleshoot access', 'Check the server name, share permissions, VPN, and Windows credentials. A path that works locally may still be unavailable to a remote agent process.'),
    ],
  },
  {
    path: '/docs/getting-started/git', title: 'Install and configure Git', category: 'Getting started',
    summary: 'Set up Git so Dardcor Code can show source control changes for your project.',
    sections: [
      section('Install Git', 'Install Git from a trusted distribution for your operating system. Restart Dardcor Code after installation if Git was not detected during startup.'),
      section('Check the repository', 'Open a folder containing a Git repository and confirm the current branch appears in the source control view.'),
      section('Configure your identity', 'Set the author name and email you want recorded in commits. Avoid committing credentials or personal data unintentionally.'),
    ],
  },
  {
    path: '/docs/getstarted/tutorials', title: 'Getting started tutorials', category: 'Getting started',
    summary: 'A practical route through the editor, terminal, source control, and agent workflow.',
    sections: [
      section('1. Open a project', 'Open a trusted project folder and wait for its files and language services to load.'),
      section('2. Make a small edit', 'Use search, navigation, and the integrated terminal to understand the project before changing multiple files.'),
      section('3. Ask an agent for help', 'Describe the outcome and constraints. Review proposed edits and approve tool actions according to the session access level.'),
      section('4. Verify the result', 'Run the project’s documented checks, inspect the final diff, and address any failed verification before accepting the work.'),
    ],
    aliases: ['/docs/getstarted/introvideos'],
  },
  {
    path: '/docs/getting-started/tips-and-tricks', title: 'Tips and shortcuts', category: 'Getting started',
    summary: 'Find commands quickly and make common editor actions easier to repeat.',
    sections: [
      section('Use the Command Palette', 'Search the Command Palette for actions by name instead of memorizing every command. Recent results and keyboard shortcuts help make frequent actions faster.'),
      section('Learn a few shortcuts', 'Start with file search, the Command Palette, terminal visibility, and editor navigation. Customize a shortcut when it conflicts with your operating system or another tool.'),
      section('Explore one feature at a time', 'Use the editor walkthroughs and documentation to learn a feature in the context of a small project. Review settings before enabling automation.'),
    ],
    aliases: ['/docs/dardcor/dardcor-vscode-features'],
  },
  {
    path: '/docs/editor/emmet', title: 'Emmet abbreviations', category: 'Editor & workspace',
    summary: 'Expand supported Emmet abbreviations into HTML and CSS structures.',
    sections: [
      section('Expand an abbreviation', 'Type an abbreviation in a supported file and trigger the editor’s Emmet expansion command or configured keybinding.'),
      section('Check language mode', 'Emmet support depends on the active language mode and its configuration. Confirm the file is recognized as HTML, CSS, or a configured embedded language.'),
      section('Customize expansion', 'Use Emmet settings for language mappings and preferences. Test a mapping in a small file before relying on it across a project.'),
    ],
  },
  {
    path: '/docs/editor/userdefinedsnippets', title: 'User snippets', category: 'Editor & workspace',
    summary: 'Create reusable code snippets and control where they appear in the editor.',
    sections: [
      section('Create a snippet file', 'Use the snippets command to create a language-specific or global snippet file. Give each snippet a clear name, prefix, body, and description.'),
      section('Write snippet bodies', 'Snippet bodies support text, placeholders, choices, and variables. Escape special characters according to the snippet file format and test the expansion in a scratch file.'),
      section('Scope snippets', 'Choose a language-specific file when a snippet should appear only in one language. Check the active language mode if a snippet is missing.'),
    ],
  },
  {
    path: '/docs/editor/hot-exit', title: 'Restore unsaved files', category: 'Editor & workspace',
    summary: 'Understand how editor backups can restore unsaved work after a restart.',
    sections: [
      section('How recovery works', 'The editor can retain working copies of unsaved files so they can be restored after a window closes unexpectedly or the application restarts.'),
      section('Save important work', 'Recovery is a convenience, not a replacement for saving or source control. Save important edits and commit or back them up regularly.'),
      section('Find a missing edit', 'Reopen the same workspace and check the editor’s restored unsaved items. Confirm the correct profile and user data directory are active.'),
    ],
  },
  {
    path: '/docs/editor/inline-completions', title: 'Inline completions', category: 'Editor & workspace',
    summary: 'Review inline code suggestions and configure when completion providers can run.',
    sections: [
      section('Accept or dismiss a suggestion', 'Inline suggestions appear near the insertion point. Review the full proposed text before accepting it, especially when it includes imports or changes surrounding code.'),
      section('Configure providers', 'Completion behavior depends on installed providers, model selection, and language settings. Disable a provider temporarily to identify conflicts.'),
      section('Protect project context', 'Completion services may receive nearby source context. Check the selected provider’s data handling and your organization policy.'),
    ],
    aliases: ['/docs/editor/next-edit-suggestions'],
  },
  {
    path: '/docs/enterprise/extensions/allowlist', title: 'Extension allowlists', category: 'Administration',
    summary: 'Control which extension publishers or packages are available in a managed environment.',
    sections: [
      section('Define the policy scope', 'Choose whether policy applies to publishers, individual extensions, or trusted sources. Keep the approved set as narrow as practical.'),
      section('Test policy changes', 'Pilot the policy with representative users and verify install, update, and disable behavior before broad deployment.'),
      section('Keep the list current', 'Review allowlisted extensions periodically and remove entries that are no longer needed or maintained.'),
    ],
  },
  {
    path: '/docs/enterprise/data-and-privacy', title: 'Workspace data and privacy', category: 'Administration',
    summary: 'Review data flow when enabling remote indexing, external search, or model-backed features.',
    sections: [
      section('Identify the data flow', 'Before enabling a feature, identify which workspace content, metadata, or diagnostics leave the device and which service receives them.'),
      section('Apply organization policy', 'Use managed policies and provider settings to limit external processing. Confirm that the selected account and service are approved for the data involved.'),
      section('Revisit configuration', 'Review enabled features and data destinations when providers, organization policies, or project sensitivity change.'),
    ],
  },
  {
    path: '/docs/workspaces/remote-index', title: 'Remote workspace indexing', category: 'Editor & workspace',
    summary: 'Understand where workspace indexing runs and how to control remote or external processing.',
    sections: [
      section('Check the indexing mode', 'Workspace search and indexing can use local, remote, or provider-backed services depending on the active feature and configuration. Review the setting description before enabling external processing.'),
      section('Limit indexed content', 'Exclude generated, private, or credential-containing files using the project’s supported ignore settings. Check the resulting index scope.'),
      section('Troubleshoot stale results', 'Allow indexing to finish, inspect its status, and refresh the index if files changed outside the editor.'),
    ],
  },
  {
    path: '/docs/extensions/api-migration', title: 'Extension API migration', category: 'Extensions & APIs',
    summary: 'Update an extension to supported APIs when a previous method is deprecated or removed.',
    sections: [
      section('Read the diagnostic', 'Use the deprecation message to identify the affected API and the supported replacement. Check the target engine version before making the migration.'),
      section('Update and validate', 'Replace the deprecated call, update TypeScript declarations if needed, and run the extension’s checks against the minimum supported host.'),
      section('Keep compatibility explicit', 'If the extension supports multiple host versions, guard newer behavior and provide a compatible fallback.'),
    ],
  },
  {
    path: '/docs/extensions/publishers', title: 'Publisher identity', category: 'Extensions & APIs',
    summary: 'Check who publishes an extension and what publisher verification means.',
    sections: [
      section('Verify the publisher details', 'Compare the publisher name, profile, source repository, and extension identifier with the project you intended to install.'),
      section('Understand verification', 'A verified publisher indicator helps establish account identity. It is not a review of the extension’s code or a guarantee of safety.'),
      section('Report suspicious behavior', 'Disable an extension that behaves unexpectedly and collect its identifier and relevant logs before reporting it through the appropriate channel.'),
    ],
  },
  {
    path: '/docs/extensions/platform-specific', title: 'Platform-specific extensions', category: 'Extensions & APIs',
    summary: 'Check whether an extension package supports your operating system and extension host.',
    sections: [
      section('Check the supported target', 'Some extensions include native binaries or platform-specific dependencies. Review the package targets and compatibility statement before installation.'),
      section('Remote and web hosts', 'An extension that works on desktop may not work in a web worker or remote host. Check where the extension is installed and where its code runs.'),
      section('Resolve a missing package', 'Update the extension and verify that the correct platform package is available. Report missing targets to the extension publisher.'),
    ],
  },
  {
    path: '/docs/extensions/api/navigator', title: 'Navigator compatibility', category: 'Extensions & APIs',
    summary: 'Avoid relying on runtime globals that are not provided consistently by extension hosts.',
    sections: [
      section('Use supported APIs', 'Use the documented extension APIs and runtime features available in your target host. Avoid assuming browser globals or Node.js globals exist in every execution environment.'),
      section('Check your runtime target', 'Review the Node.js and extension host versions supported by the application build. Add type declarations and feature checks that match those versions.'),
      section('Validate across hosts', 'Test the extension in each host it supports, including remote or web execution if claimed.'),
    ],
  },
  {
    path: '/docs/remote/linux-arm-support', title: 'Remote Linux architecture support', category: 'Remote development',
    summary: 'Check architecture support before connecting to an older or specialized Linux host.',
    sections: [
      section('Identify the remote architecture', 'Check the remote operating-system version and CPU architecture using the system tools available on that host.'),
      section('Check prerequisites', 'The remote server may require a supported runtime, libraries, and executable permissions. Review the connection log for the exact missing component.'),
      section('Choose a supported host', 'If the target architecture is no longer supported by your installed build, connect from a supported machine or update the remote environment.'),
    ],
  },
  {
    path: '/docs/remote/troubleshooting/linux', title: 'Troubleshoot remote Linux connections', category: 'Remote development',
    summary: 'Diagnose remote server startup failures on Linux hosts.',
    sections: [
      section('Check system prerequisites', 'Confirm the remote host architecture, required system libraries, shell, and writable server data directory.'),
      section('Inspect connection output', 'Use the remote connection log to distinguish download, extraction, permission, and server startup failures.'),
      section('Clean up a stale installation', 'Stop the previous remote process before removing a stale server directory. Preserve logs needed to diagnose a recurring failure.'),
    ],
  },
  {
    path: '/docs/terminal/troubleshooting', title: 'Troubleshoot terminal startup', category: 'Editor & workspace',
    summary: 'Find why an integrated terminal exits or fails before displaying a prompt.',
    sections: [
      section('Check the profile', 'Confirm the selected shell executable exists and that its arguments are valid for your operating system.'),
      section('Inspect startup scripts', 'Temporarily start a clean shell without custom profile scripts. If it works, re-enable startup configuration gradually to find the conflicting command.'),
      section('Review the environment', 'Check PATH, working directory, permissions, and environment variables. Read terminal logs for the specific launch error.'),
    ],
  },
  {
    path: '/docs/security/git-ownership', title: 'Git repository ownership', category: 'Security',
    summary: 'Resolve Git ownership warnings without disabling repository safety checks globally.',
    sections: [
      section('Understand the warning', 'Git may refuse to operate in a repository owned by another user to protect against unsafe configuration and hooks.'),
      section('Verify the repository first', 'Check the repository path, owner, and source. If it is yours and the ownership is expected, configure trust for that specific directory using Git’s supported safe-directory setting.'),
      section('Avoid broad trust rules', 'Do not mark every directory as safe to silence a warning. Narrow exceptions reduce the chance that a malicious repository runs unexpected behavior.'),
    ],
  },
  {
    path: '/docs/security/github-push-protection', title: 'GitHub push protection', category: 'Security',
    summary: 'Respond to a push block caused by a secret detected in Git history.',
    sections: [
      section('Remove the secret', 'Revoke or rotate the exposed credential first. Remove it from the commit and any affected history using the repository’s approved remediation process.'),
      section('Check the full change', 'Search the current working tree and recent commits for copies of the credential. Add appropriate ignore rules for local secret files.'),
      section('Use an exception only when justified', 'If a detection is a false positive, follow your repository’s review process and provide the required reason. Never bypass protection for a real secret.'),
    ],
  },
  {
    path: '/api/references/extension-manifest', title: 'Extension manifest reference', category: 'Extensions & APIs',
    summary: 'Describe an extension’s identity, compatibility range, activation, and contributions.',
    sections: [
      section('Set accurate metadata', 'Declare a stable identifier, version, publisher, display name, license, and engine compatibility range.'),
      section('Describe contributions', 'Register commands, languages, views, and other capabilities in the manifest. Keep activation behavior aligned with the features the extension exposes.'),
      section('Validate the package', 'Run manifest validation and test the extension in a clean development host before publishing.'),
    ],
  },
  {
    path: '/api/references/when-clause-contexts', title: 'When-clause contexts', category: 'Extensions & APIs',
    summary: 'Use context expressions to show commands and controls only when they apply.',
    sections: [
      section('Build a focused expression', 'Combine supported context keys with boolean operators to express when a command, menu item, or view is relevant.'),
      section('Use supported keys', 'Check the context keys supplied by the target Dardcor Code API. A typo or unsupported key can leave a contribution permanently hidden.'),
      section('Test each state', 'Verify the contribution in both the matching and non-matching states, including focus and resource changes.'),
    ],
  },
  {
    path: '/docs/troubleshooting/browser-popups', title: 'Allow browser pop-ups', category: 'Troubleshooting',
    summary: 'Allow the Dardcor Code page to open a requested window when your browser blocks pop-ups.',
    sections: [
      section('Allow pop-ups for Dardcor Code', 'Browsers block unexpected pop-up windows by default. When Dardcor Code reports that a new window could not open, use the browser’s site controls to allow pop-ups for the current Dardcor Code website, then retry the command that opened the window.', ['Use the browser address-bar site controls for the current Dardcor Code origin.', 'Allow pop-ups only for the Dardcor Code site you trust.', 'Reload the page or repeat the action after changing the permission.']),
      section('Check browser and workspace settings', 'Managed browser policies can prevent users from changing pop-up permissions. If the control is unavailable, ask your administrator to review the policy for the Dardcor Code site. For a remote workspace, check whether the requested window opens on the local or remote browser surface.'),
      section('Keep access narrow', 'Do not turn off pop-up blocking globally to resolve a single site issue. Remove the site exception when you no longer need it, and report the browser name and version if pop-ups remain blocked after the site permission is allowed.'),
    ],
    aliases: ['/docs/platform/browser-popups'],
  },
  {
    path: '/docs/platform/browser-file-access', title: 'Browser file and folder access', category: 'Platform',
    summary: 'Understand when Dardcor Code can use browser file pickers and which browser limitations affect local files.',
    sections: [
      section('Use a supported browser', 'Opening and saving local files in a browser depends on the File System Access API and browser permission support. When the current browser does not provide the required API, use the desktop application or connect to a remote workspace.', ['Use the Open Files or Open Folder command in a supported browser.', 'When access is denied, check the browser permission prompt and the page security context.', 'For an unsupported browser, use Open Remote or the desktop Dardcor Code application.']),
      section('Understand the permission boundary', 'A web page cannot silently read arbitrary files from your computer. The browser asks you to choose files or folders and grants access only through the handles returned by that picker. Closing the page or revoking permission may make those handles unavailable.', ['Choose only the files needed for the current workspace.', 'Review browser permission prompts before granting access.', 'Use remote development when project files should remain on another machine.']),
      section('Troubleshoot unavailable file access', 'Update to a browser version that supports the required picker APIs, open Dardcor Code over a secure context, and retry the file picker. If the picker remains unavailable, use the desktop or remote workflow and include the browser name and version when reporting the problem.'),
    ],
    aliases: ['/docs/security/web-local-file-access'],
  },
  {
    path: '/updates/v1_109', title: 'Windows terminal compatibility notes', category: 'Release notes',
    summary: 'Troubleshoot older Windows terminal launch configurations from this legacy documentation route.',
    sections: [
      section('Check your terminal profile', 'Confirm the selected PowerShell or other shell executable is installed and configured as a valid terminal profile in your Dardcor Code version.'),
      section('Update the editor and dependencies', 'Terminal launch behavior depends on the installed application build and system components. Install a current supported Dardcor Code release before changing legacy terminal settings.'),
      section('Collect a useful error report', 'Copy the exact terminal launch error and include your Windows version, selected profile, and Dardcor Code version. Remove workspace secrets before sharing logs.'),
    ],
  },
  {
    path: '/updates/insiders', title: 'Preview builds and release updates', category: 'Release notes',
    summary: 'Find current Dardcor Code release information and check whether preview packages are available.',
    sections: [
      section('Check current availability', 'Use the Dardcor Code release page for packages and version notes published by the project. Availability of preview builds can change over time.'),
      section('Keep preview work separate', 'If you use a preview build, back up important settings and workspaces before upgrading. Preview versions may change configuration or extension behavior.'),
      section('Compare versions', 'Include the installed version and operating system when reporting a regression so maintainers can identify the affected release.'),
    ],
  },
];

export const docsCategories = [...new Set(docsArticles.map((article) => article.category))];

export function normalizeDocsPath(path: string): string {
  let decodedPath = path;
  try {
    decodedPath = decodeURIComponent(path);
  } catch {
    // Preserve the route if a copied URL contains an invalid percent escape.
  }
  const decoded = decodedPath.replace(/\/+$/, '').toLowerCase();
  return decoded || '/docs';
}

export function findDocsArticle(path: string): DocsArticle | undefined {
  const normalized = normalizeDocsPath(path);
  return docsArticles.find((article) =>
    normalizeDocsPath(article.path) === normalized
    || article.aliases?.some((alias) => normalizeDocsPath(alias) === normalized),
  );
}

export function createFallbackArticle(path: string): DocsArticle {
  const normalized = normalizeDocsPath(path);
  const segments = normalized.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] ?? 'documentation';
  const title = lastSegment
    .split(/[-_]/g)
    .map((word) => word.length > 0 ? `${word[0].toUpperCase()}${word.slice(1)}` : word)
    .join(' ');
  const route = normalized.startsWith('/api/') ? 'API reference' : 'Dardcor Code documentation';

  return {
    path: normalized,
    title,
    category: route,
    summary: `Reference information for ${title.toLowerCase()} in Dardcor Code.`,
    sections: [
      section('Overview', `This Dardcor Code page keeps the original documentation route available at \`${normalized}\`. The feature is controlled by the corresponding editor, extension, or Router settings in your installation.`),
      section('Find the related setting or command', 'Use the Command Palette to search for the feature name, then inspect the setting description or command details shown by your installed build.'),
      section('Troubleshooting', 'Check the editor version, workspace trust, relevant extension or provider availability, and the application logs. If the behavior differs from this guide, use the in-product setting description as the source for your installed version.'),
    ],
  };
}
