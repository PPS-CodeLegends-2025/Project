<script lang="ts">
	import type { PageData } from './$types';
	import type { Section } from '$lib/types/module';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { page } from '$app/stores';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Code Editors'
	};

	let { data }: { data: PageData } = $props();

	const sectionIndex = data.section.index;
	const userId = $page.data.user?.id || 'guest-user';
	const moduleId = data.module.data.url;

	const taskProps = {
		section: { ...sectionData, ...data.section.current },
		nextSection: data.module.sections[sectionIndex + 1],
		prevSection: data.module.sections[sectionIndex - 1],
		completed: data.section.current?.completed || false,
		completedNow: true,
		module: data.module.data,
		currentSectionIndex: sectionIndex,
		totalSections: data.module.sections.length,
		onMarkAsCompleted: async () => {
			try {
				await modules.markSectionCompleted(userId, moduleId, sectionIndex);
			} catch (error) {
				console.error('Failed to mark as completed:', error);
			}
		}
	};
</script>

<ModuleTask {...taskProps}>
	<div class="space-y-6">
		<section>
			<h3 class="mb-3 text-xl font-semibold">Introduction to Code Editors</h3>
			<p class="text-lg">
				Code editors are specialized text editors designed for writing and editing code. They
				provide features like syntax highlighting, code completion, and debugging tools that make
				development more efficient and enjoyable.
			</p>
			<p class="mt-2 text-lg">
				Choosing the right editor is a personal decision that depends on your workflow, the
				languages you use, and whether you prefer lightweight tools or full-featured IDEs. In this
				section, we'll explore three popular options: Visual Studio Code, Sublime Text, and
				WebStorm.
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Visual Studio Code (VS Code)</h3>
			<p class="text-lg">
				Visual Studio Code is a free, open-source code editor developed by Microsoft. It has become
				one of the most popular editors for web development due to its balance of performance,
				features, and extensibility.
			</p>

			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Key Features</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>
							<strong>IntelliSense:</strong> Smart code completion based on variable types and functions
						</li>
						<li><strong>Built-in Git:</strong> Seamless Git integration</li>
						<li>
							<strong>Extension Marketplace:</strong> Thousands of extensions for languages and tools
						</li>
						<li><strong>Integrated Terminal:</strong> Run commands without leaving the editor</li>
						<li><strong>Multi-cursor Editing:</strong> Edit multiple locations simultaneously</li>
						<li>
							<strong>Debugging:</strong> Powerful debugging with breakpoints and variable inspection
						</li>
						<li><strong>Live Share:</strong> Real-time collaborative editing</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Best For</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>Web development (JavaScript, TypeScript, HTML, CSS)</li>
						<li>Python, Java, C++, and most popular languages</li>
						<li>Projects with mixed languages/technologies</li>
						<li>Developers who want customization without complexity</li>
						<li>Those who need a free, cross-platform solution</li>
						<li>Teams using GitHub or Azure DevOps</li>
						<li>Remote development (containers, WSL, SSH)</li>
					</ul>
				</div>
			</div>

			<div class="mt-4 rounded-lg border bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Essential VS Code Extensions</h4>
				<div class="grid gap-4 md:grid-cols-2">
					<ul class="list-disc space-y-1 pl-5">
						<li><strong>ESLint:</strong> JavaScript linting</li>
						<li><strong>Prettier:</strong> Code formatting</li>
						<li><strong>GitLens:</strong> Enhanced Git capabilities</li>
						<li><strong>Live Server:</strong> Launch a development server</li>
					</ul>
					<ul class="list-disc space-y-1 pl-5">
						<li><strong>Debugger for Chrome/Firefox:</strong> Browser debugging</li>
						<li><strong>Path Intellisense:</strong> Autocomplete filenames</li>
						<li><strong>Thunder Client:</strong> REST API testing</li>
						<li><strong>Material Icon Theme:</strong> Improved file icons</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Sublime Text</h3>
			<p class="text-lg">
				Sublime Text is known for its speed and minimalist design. It's a proprietary editor with a
				free evaluation period, eventually requiring a license purchase. Many developers praise
				Sublime for its performance with large files.
			</p>

			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Key Features</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>Speed:</strong> Extremely fast startup and file handling</li>
						<li><strong>Multiple Selections:</strong> Advanced multi-cursor editing</li>
						<li><strong>Command Palette:</strong> Quick access to all features</li>
						<li><strong>Goto Anything:</strong> Fast file/symbol navigation</li>
						<li><strong>Package Control:</strong> Extension manager</li>
						<li><strong>Split Editing:</strong> Work with multiple files side by side</li>
						<li><strong>Distraction-Free Mode:</strong> Full-screen focused editing</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Best For</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>Developers who value speed above all else</li>
						<li>Working with very large files</li>
						<li>Quick edits and one-off tasks</li>
						<li>Text processing and manipulation</li>
						<li>Systems with limited resources</li>
						<li>Those who prefer minimalist interfaces</li>
						<li>Advanced search and replace operations</li>
					</ul>
				</div>
			</div>

			<div class="mt-4 rounded-lg border bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Essential Sublime Text Packages</h4>
				<div class="grid gap-4 md:grid-cols-2">
					<ul class="list-disc space-y-1 pl-5">
						<li><strong>Package Control:</strong> Package manager</li>
						<li><strong>Emmet:</strong> HTML/CSS workflow enhancement</li>
						<li><strong>SublimeLinter:</strong> Code linting framework</li>
						<li><strong>A File Icon:</strong> Better file icons</li>
					</ul>
					<ul class="list-disc space-y-1 pl-5">
						<li><strong>GitGutter:</strong> Shows git diff in the gutter</li>
						<li><strong>SideBarEnhancements:</strong> Improved sidebar</li>
						<li><strong>Terminus:</strong> Integrated terminal</li>
						<li><strong>ColorPicker:</strong> Color selection tool</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">WebStorm (JetBrains IDE)</h3>
			<p class="text-lg">
				WebStorm is a premium JavaScript IDE developed by JetBrains. It provides comprehensive
				out-of-the-box functionality without requiring extensive configuration or plugins.
			</p>

			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Key Features</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>
							<strong>Intelligent Coding Assistance:</strong> Advanced code completion and analysis
						</li>
						<li>
							<strong>Framework Support:</strong> Built-in support for React, Angular, Vue, etc.
						</li>
						<li><strong>Advanced Debugging:</strong> Sophisticated JavaScript debugging</li>
						<li><strong>Built-in Tools:</strong> Terminal, REST client, database tools</li>
						<li><strong>Refactoring:</strong> Powerful code refactoring options</li>
						<li><strong>Testing:</strong> Integrated test runners</li>
						<li><strong>Deep VCS Integration:</strong> Advanced Git, GitHub, GitLab support</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Best For</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>Professional JavaScript/TypeScript developers</li>
						<li>Large projects and enterprise development</li>
						<li>Full-stack development with Node.js</li>
						<li>Teams working on complex codebases</li>
						<li>Developers who prefer a complete solution</li>
						<li>Those who value IDE features over customization</li>
						<li>Situations where time saved justifies the cost</li>
					</ul>
				</div>
			</div>

			<div class="mt-4 rounded-lg border bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">WebStorm Advantages</h4>
				<div class="grid gap-4 md:grid-cols-2">
					<ul class="list-disc space-y-1 pl-5">
						<li>Minimal setup needed - works great out of the box</li>
						<li>Consistent experience across JetBrains IDEs</li>
						<li>Smart code navigation and search</li>
						<li>Built-in profiling and performance tools</li>
					</ul>
					<ul class="list-disc space-y-1 pl-5">
						<li>Superior refactoring capabilities</li>
						<li>Database tools and SQL support</li>
						<li>Advanced code inspections</li>
						<li>Built-in HTTP client for API testing</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Editor Comparison</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Performance Factors</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li><strong>Startup Speed:</strong> Sublime > VS Code > WebStorm</li>
						<li><strong>Large File Handling:</strong> Sublime > VS Code > WebStorm</li>
						<li><strong>Memory Usage:</strong> Sublime > VS Code > WebStorm</li>
						<li><strong>Project Indexing:</strong> WebStorm most thorough but slowest</li>
						<li><strong>Feature Completeness:</strong> WebStorm > VS Code > Sublime</li>
						<li><strong>Customization:</strong> VS Code > Sublime > WebStorm</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Pricing & Licensing</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li><strong>VS Code:</strong> Free, open-source (MIT license)</li>
						<li>
							<strong>Sublime Text:</strong> $99 per user, perpetual license with 3 years of updates
						</li>
						<li><strong>WebStorm:</strong> $69/year, discounts for continued subscriptions</li>
						<li>
							<strong>WebStorm EAP:</strong> Early Access Program is free but not for production
						</li>
						<li><strong>Student Licenses:</strong> Free for WebStorm with academic email</li>
						<li><strong>Open Source:</strong> Free WebStorm licenses for OSS contributors</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Common Productivity Features</h3>
			<div class="space-y-4">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Multi-cursor Editing</h4>
					<div class="grid gap-4 md:grid-cols-2">
						<div>
							<h5 class="font-medium">In VS Code:</h5>
							<ul class="list-disc space-y-1 pl-5">
								<li>Alt+Click to add cursors</li>
								<li>Ctrl+Alt+Up/Down to add cursors above/below</li>
								<li>Ctrl+D to select next occurrence</li>
							</ul>
						</div>
						<div>
							<h5 class="font-medium">In Sublime Text:</h5>
							<ul class="list-disc space-y-1 pl-5">
								<li>Ctrl+Click for multiple cursors</li>
								<li>Ctrl+Alt+Up/Down to add cursors</li>
								<li>Alt+F3 to select all occurrences</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Quick Navigation</h4>
					<div class="grid gap-4 md:grid-cols-3">
						<div>
							<h5 class="font-medium">In VS Code:</h5>
							<ul class="list-disc space-y-1 pl-5">
								<li>Ctrl+P for quick open</li>
								<li>Ctrl+G to go to line</li>
								<li>Ctrl+Shift+O for symbols</li>
							</ul>
						</div>
						<div>
							<h5 class="font-medium">In Sublime Text:</h5>
							<ul class="list-disc space-y-1 pl-5">
								<li>Ctrl+P for quick open</li>
								<li>Ctrl+R for symbols</li>
								<li>Ctrl+G to go to line</li>
							</ul>
						</div>
						<div>
							<h5 class="font-medium">In WebStorm:</h5>
							<ul class="list-disc space-y-1 pl-5">
								<li>Ctrl+Shift+N for files</li>
								<li>Ctrl+N for classes</li>
								<li>Alt+F7 for usages</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Code Refactoring</h4>
					<div class="grid gap-4 md:grid-cols-2">
						<div>
							<h5 class="font-medium">VS Code & Sublime:</h5>
							<ul class="list-disc space-y-1 pl-5">
								<li>Basic rename functionality</li>
								<li>Limited extract method/variable</li>
								<li>Plugin-dependent refactoring</li>
							</ul>
						</div>
						<div>
							<h5 class="font-medium">WebStorm:</h5>
							<ul class="list-disc space-y-1 pl-5">
								<li>Comprehensive refactoring options</li>
								<li>Safe rename across project</li>
								<li>Extract method, variable, component</li>
								<li>Move files with import updates</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Advanced Tips for Each Editor</h3>
			<div class="grid gap-6 md:grid-cols-3">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">VS Code Pro Tips</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Use workspaces for project-specific settings</li>
						<li>Create custom snippets for repeated code</li>
						<li>Master keyboard shortcuts with Ctrl+K Ctrl+S</li>
						<li>Try Zen Mode (Ctrl+K Z) for focus</li>
						<li>Use integrated terminal with split panels</li>
						<li>Configure task runners for automation</li>
						<li>Set up remote development with SSH</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Sublime Text Pro Tips</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Use the Command Palette for everything</li>
						<li>Master regex search and replace</li>
						<li>Create project-specific settings</li>
						<li>Use macros for repetitive tasks</li>
						<li>Customize key bindings</li>
						<li>Try vintage mode for Vim emulation</li>
						<li>Use text transforms (Ctrl+K, Ctrl+T)</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">WebStorm Pro Tips</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Use "Search Everywhere" (Shift+Shift)</li>
						<li>Create live templates for common patterns</li>
						<li>Set up run configurations</li>
						<li>Use Local History for tracking changes</li>
						<li>Try parameter hints and type info</li>
						<li>Customize inspections and scopes</li>
						<li>Set up File Watchers for tasks</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Choosing the Right Editor</h3>
			<p class="text-lg">
				Selecting an editor is a personal choice that depends on your specific needs, workflow, and
				preferences. Here are some factors to consider:
			</p>

			<div class="mt-4 space-y-4">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Consider VS Code If:</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>You want a free, powerful editor with a large ecosystem</li>
						<li>You value customization and extensibility</li>
						<li>You work across multiple languages and platforms</li>
						<li>You need good performance with moderate resource usage</li>
						<li>You want built-in Git integration and terminal</li>
						<li>You enjoy community-driven development and frequent updates</li>
					</ul>
				</div>

				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Consider Sublime Text If:</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Speed and performance are your top priorities</li>
						<li>You work with very large files</li>
						<li>You prefer a minimal interface with powerful features</li>
						<li>You want a lightweight editor that starts instantly</li>
						<li>You're willing to pay for a perpetual license</li>
						<li>You value stability and don't need frequent updates</li>
					</ul>
				</div>

				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Consider WebStorm If:</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>You work primarily with JavaScript/TypeScript</li>
						<li>You want a complete IDE with minimal setup</li>
						<li>You value advanced refactoring capabilities</li>
						<li>You're working on large, complex projects</li>
						<li>You're willing to pay for a premium development experience</li>
						<li>You want integrated debugging, testing, and profiling</li>
					</ul>
				</div>
			</div>
		</section>

		<div class="mt-6 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4 italic">
			<p>
				"The best code editor isn't the one with the most features or the fastest performance—it's
				the one that gets out of your way and helps you transform your ideas into code most
				effectively for your specific workflow."
			</p>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Code Editor Resources</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">VS Code Resources</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://code.visualstudio.com/docs/introvideos/basics"
								target="_blank"
								class="text-indigo-600 hover:underline">VS Code Intro Videos</a
							>
						</li>
						<li>
							<a
								href="https://www.youtube.com/watch?v=WPqXP_kLzpo"
								target="_blank"
								class="text-indigo-600 hover:underline">VS Code Tutorial for Beginners (YouTube)</a
							>
						</li>
						<li>
							<a
								href="https://marketplace.visualstudio.com/vscode"
								target="_blank"
								class="text-indigo-600 hover:underline">VS Code Extension Marketplace</a
							>
						</li>
						<li>
							<a
								href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf"
								target="_blank"
								class="text-indigo-600 hover:underline">VS Code Keyboard Shortcuts (PDF)</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Other Editors</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://www.sublimetext.com/docs/3/"
								target="_blank"
								class="text-indigo-600 hover:underline">Sublime Text Documentation</a
							>
						</li>
						<li>
							<a
								href="https://www.jetbrains.com/webstorm/learn/"
								target="_blank"
								class="text-indigo-600 hover:underline">WebStorm Learning Resources</a
							>
						</li>
						<li>
							<a
								href="https://www.youtube.com/watch?v=Bx-KLWdukV4"
								target="_blank"
								class="text-indigo-600 hover:underline">Sublime Text Crash Course (YouTube)</a
							>
						</li>
					</ul>
				</div>
			</div>
			<div class="mt-4">
				<h4 class="mb-2 font-semibold">Editor Setup & Customization</h4>
				<ul class="list-disc space-y-1 pl-5">
					<li>
						<a
							href="https://dev.to/thegeoffstevens/vs-code-settings-you-should-customize-5e75"
							target="_blank"
							class="text-indigo-600 hover:underline">VS Code Settings You Should Customize</a
						>
					</li>
					<li>
						<a
							href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer"
							target="_blank"
							class="text-indigo-600 hover:underline">Live Server Extension</a
						> - Launch a local development server
					</li>
					<li>
						<a
							href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode"
							target="_blank"
							class="text-indigo-600 hover:underline">Prettier Extension</a
						> - Code formatter
					</li>
				</ul>
			</div>
		</section>
	</div>
</ModuleTask>
