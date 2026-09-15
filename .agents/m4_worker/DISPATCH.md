# DISPATCH — m4_worker

## 2026-09-10T04:51:28Z

You are the Editor & Ecosystem Sections Worker for Milestone 4.
Your identity: m4_worker
Your working directory: C:\Users\Dardcor\Documents\Code Editor\Website-Dardcor-Code\.agents\m4_worker

Scope and File Ownership:
You exclusively own and must create:
1. `src/components/sections/CoreEditor.tsx` (NEW):
   - "A world-class code editor at its core"
   - Description: "VS Code has been the editor of choice for millions of developers for over a decade. AI-powered inline suggestions, intelligent completions, and a rich editing experience."
   - Animated code diff view: split side-by-side or tabbed diff showing before/after code edit with inline suggestion.
   - CTA: "Get started with Dardcor Code" (links to `/release`).
2. `src/components/sections/ExtensionsSection.tsx` (NEW):
   - "Code with extensions"
   - At least 8 extension cards: Python, Stripe, C/C++, Jupyter, GitLens, C# Dev Kit, MongoDB, GitHub Copilot for Azure, Remote Development.
   - Each card: icon, extension name, description, publisher or badge.
   - Footer link: "View 80k+ extensions in the Extension Marketplace" linking to marketplace with `rel="noopener noreferrer" target="_blank"`.
3. `src/components/sections/LanguagesSection.tsx` (NEW):
   - "Code in any language"
   - Description: "Dardcor Code supports almost every major programming language. Several ship in the box, but extensions for others can be found in the Marketplace."
   - 12 language tags/pills: JavaScript, TypeScript, Python, C#, C++, HTML, Java, JSON, PHP, Markdown, PowerShell, YAML.
4. `src/components/sections/CustomizableSection.tsx` (NEW):
   - "Fully customizable"
   - Description: "Customize your Dardcor Code UI and layout so that it fits your coding style."
   - 3 feature cards: Color themes (with preview swatches), Settings Sync (with cloud icon), Profiles (with switch indicator).
5. `src/components/sections/CodeAnywhereSection.tsx` (NEW):
   - "Code anywhere"
   - Description: "Code wherever you're most productive, whether connected to the cloud, a remote repository, or in the browser."
   - 2 feature cards: Built-in Source Control (Git out-of-the-box) and GitHub Codespaces (cloud environments).
6. `src/components/sections/RichFeaturesSection.tsx` (NEW):
   - "Code with rich features"
   - 8-card grid:
     1. Integrated terminal: "Use your favorite shell: zsh, pwsh, git bash, all inside the editor."
     2. Run code: "Run and debug your code without leaving your editor."
     3. Version control: "Built-in support for git and many other source control providers."
     4. Build tasks: "Run tools and analyze their results from within Dardcor Code."
     5. Local history: "Never lose your changes with automatically tracked local history."
     6. Themes: "Your theme is an extension of your personality. Add some flair."
     7. Accessibility: "Optimized for screen readers, high contrast themes, and keyboard-only navigation."
     8. Web support: "Whether on phone, tablet, or desktop, access your code from anywhere."

Component rules:
- Export default function from each file.
- Semantic `<section id="...">` with responsive container (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24`).
- Strict TypeScript: no `any`, explicit `import type` for all type imports (`verbatimModuleSyntax`).
- Lucide React icons, Tailwind CSS v4 styling matching brand palette (`dc-600`, `surface-card`, `surface-base`, etc.).
- External links must include `rel="noopener noreferrer" target="_blank"`.

Verification:
- Run `node scripts/test-e2e.mjs --milestone M4` and ensure all 15 M4 tests pass.
- Run `npm run lint` and ensure exit code 0.
- Run `npm run build` and ensure exit code 0.
