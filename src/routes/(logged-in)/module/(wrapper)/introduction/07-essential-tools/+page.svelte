<script lang="ts">
	import type { PageData } from './$types';
	import type { Section } from '$lib/types/module';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { page } from '$app/stores';
	import { modules } from '$lib/services/modules';

	const sectionData: Section = {
		title: 'Essential Tools & Environment Setup'
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
			<h3 class="mb-3 text-xl font-semibold">Development Environment Basics</h3>
			<p class="text-lg">
				A well-configured development environment is essential for productive coding. It's the
				collection of tools, software, and configurations that enable you to write, test, and deploy
				code efficiently.
			</p>
			<p class="mt-2 text-lg">
				Setting up your environment properly from the start will save you countless hours of
				frustration and enable you to focus on what matters most: building great applications.
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Code Editors & IDEs</h3>
			<p class="text-lg">
				Your code editor is where you'll spend most of your development time. Modern editors offer
				features like syntax highlighting, code completion, debugging tools, and extension
				ecosystems.
			</p>
			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Popular Code Editors</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>
							<strong>VS Code:</strong> Microsoft's powerful, free editor with extensive extension support
						</li>
						<li>
							<strong>Sublime Text:</strong> Fast, lightweight editor with excellent performance
						</li>
						<li><strong>Atom:</strong> Highly customizable editor built by GitHub</li>
						<li>
							<strong>Vim/Neovim:</strong> Terminal-based editors with steep learning curve but high
							efficiency
						</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Full IDEs</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>WebStorm:</strong> JetBrains' IDE dedicated to JavaScript development</li>
						<li>
							<strong>Visual Studio:</strong> Microsoft's comprehensive IDE for various languages
						</li>
						<li><strong>Eclipse:</strong> Versatile IDE with support for many languages</li>
						<li>
							<strong>IntelliJ IDEA:</strong> Powerful Java-based IDE with web development capabilities
						</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Version Control Systems</h3>
			<p class="text-lg">
				Version control is essential for tracking changes, collaborating with others, and
				maintaining a history of your project. Git has become the industry standard for version
				control.
			</p>
			<div class="mt-4 rounded-lg border bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Git & Platforms</h4>
				<ul class="list-disc space-y-2 pl-5">
					<li><strong>Git:</strong> The distributed version control system itself</li>
					<li>
						<strong>GitHub:</strong> Microsoft's platform for Git repositories with extensive collaboration
						features
					</li>
					<li><strong>GitLab:</strong> Alternative platform with CI/CD integration</li>
					<li><strong>Bitbucket:</strong> Atlassian's Git platform, integrates well with Jira</li>
				</ul>
				<p class="mt-3">
					<strong>Essential Git Operations:</strong> init, clone, add, commit, push, pull, branch, merge
				</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Package Managers</h3>
			<p class="text-lg">
				Package managers automate the process of installing, updating, and managing dependencies in
				your projects.
			</p>
			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">JavaScript/Node.js</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>npm:</strong> Default Node.js package manager</li>
						<li>
							<strong>yarn:</strong> Facebook's alternative to npm with some performance benefits
						</li>
						<li><strong>pnpm:</strong> Fast, disk space efficient package manager</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Other Languages</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>pip:</strong> Python package manager</li>
						<li><strong>Composer:</strong> PHP dependency manager</li>
						<li><strong>RubyGems:</strong> Ruby's package manager</li>
						<li><strong>Maven/Gradle:</strong> Java build automation tools</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Command Line & Terminal</h3>
			<p class="text-lg">
				The command line interface (CLI) is a powerful tool for developers, allowing direct
				interaction with the operating system and various development tools.
			</p>
			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Terminal Applications</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>Terminal:</strong> Default on macOS</li>
						<li><strong>iTerm2:</strong> Enhanced terminal for macOS</li>
						<li><strong>Windows Terminal:</strong> Modern terminal for Windows</li>
						<li><strong>PowerShell:</strong> Advanced command-line shell on Windows</li>
						<li><strong>GNOME Terminal:</strong> Common on Linux systems</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Essential CLI Tools</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>Bash/Zsh:</strong> Command interpreters</li>
						<li><strong>SSH:</strong> For secure remote connections</li>
						<li><strong>curl/wget:</strong> For network requests</li>
						<li><strong>grep/find:</strong> For searching files</li>
						<li><strong>Oh My Zsh:</strong> Framework for Zsh configuration</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Build Tools & Task Runners</h3>
			<p class="text-lg">
				Build tools automate repetitive tasks like compiling code, running tests, and bundling
				assets for production.
			</p>
			<div class="mt-4 rounded-lg border bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Popular Build Tools</h4>
				<ul class="list-disc space-y-2 pl-5">
					<li><strong>Webpack:</strong> Module bundler for JavaScript applications</li>
					<li><strong>Vite:</strong> Next generation frontend tooling, very fast</li>
					<li><strong>Parcel:</strong> Zero-configuration web application bundler</li>
					<li><strong>Rollup:</strong> Module bundler for JavaScript libraries</li>
					<li><strong>esbuild:</strong> Extremely fast JavaScript bundler</li>
					<li><strong>Grunt/Gulp:</strong> Task runners for automating workflows</li>
				</ul>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Browser Developer Tools</h3>
			<p class="text-lg">
				Browser dev tools are essential for debugging, testing, and optimizing web applications
				directly in the browser environment.
			</p>
			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Key Features</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>Elements panel:</strong> Inspect and modify HTML/CSS</li>
						<li><strong>Console:</strong> JavaScript debugging and logging</li>
						<li><strong>Network panel:</strong> Monitor requests and performance</li>
						<li><strong>Performance tab:</strong> Identify bottlenecks</li>
						<li><strong>Application tab:</strong> Inspect storage, PWA features</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Browser-Specific Tools</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>Chrome DevTools:</strong> Most comprehensive toolset</li>
						<li><strong>Firefox Developer Tools:</strong> Strong CSS debugging</li>
						<li><strong>Safari Web Inspector:</strong> For Safari and iOS testing</li>
						<li><strong>Edge DevTools:</strong> Based on Chromium, similar to Chrome</li>
						<li><strong>Responsive Design Mode:</strong> Test different screen sizes</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Deployment & Hosting Tools</h3>
			<p class="text-lg">
				Various tools and platforms make it easier to deploy and host your applications, from
				development to production.
			</p>
			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Static Sites & Frontend</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>Vercel:</strong> Optimized for Next.js and frontend projects</li>
						<li><strong>Netlify:</strong> Continuous deployment with Git integration</li>
						<li><strong>GitHub Pages:</strong> Free hosting for static sites</li>
						<li><strong>Firebase Hosting:</strong> Fast and secure web hosting</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Full-Stack Applications</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>Heroku:</strong> Platform as a Service (PaaS)</li>
						<li><strong>Railway:</strong> Infrastructure provider with simple workflow</li>
						<li><strong>DigitalOcean:</strong> Cloud infrastructure provider</li>
						<li><strong>AWS/Azure/GCP:</strong> Major cloud platforms</li>
						<li><strong>Docker:</strong> Containerization platform</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Setting Up Your First Environment</h3>
			<p class="text-lg">Here's a basic checklist for setting up a web development environment:</p>
			<ol class="mt-2 list-decimal space-y-2 pl-8 text-lg">
				<li>Install a code editor (VS Code recommended for beginners)</li>
				<li>Set up Git and create accounts on GitHub or similar platforms</li>
				<li>Install Node.js and npm (or yarn)</li>
				<li>Install browser extensions for development (React/Vue DevTools, etc.)</li>
				<li>Set up a terminal with customized shell if desired</li>
				<li>Configure editor extensions for your stack (ESLint, Prettier, etc.)</li>
				<li>Set up SSH keys for secure Git operations</li>
				<li>Install project-specific tools as needed</li>
			</ol>
		</section>

		<div class="mt-6 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4 italic">
			<p>
				"The time invested in properly setting up and learning your development tools will pay
				dividends throughout your career. Great craftspeople know their tools inside and out."
			</p>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Tool Resources & Guides</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Getting Started Guides</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://code.visualstudio.com/docs/introvideos/basics"
								target="_blank"
								class="text-indigo-600 hover:underline">VS Code Introduction Videos</a
							>
						</li>
						<li>
							<a
								href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git"
								target="_blank"
								class="text-indigo-600 hover:underline">Git - Getting Started Guide</a
							>
						</li>
						<li>
							<a
								href="https://nodejs.org/en/learn/getting-started/introduction-to-nodejs"
								target="_blank"
								class="text-indigo-600 hover:underline">Introduction to Node.js</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Tooling Tutorials</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://www.youtube.com/watch?v=WMJq4wmQGF8"
								target="_blank"
								class="text-indigo-600 hover:underline">Command Line Crash Course (YouTube)</a
							>
						</li>
						<li>
							<a
								href="https://www.youtube.com/watch?v=RGOj5yH7evk"
								target="_blank"
								class="text-indigo-600 hover:underline">Git & GitHub for Beginners (YouTube)</a
							>
						</li>
						<li>
							<a
								href="https://www.youtube.com/watch?v=Rh3tobg7hEo"
								target="_blank"
								class="text-indigo-600 hover:underline">Webpack Crash Course (YouTube)</a
							>
						</li>
					</ul>
				</div>
			</div>
			<div class="mt-4">
				<h4 class="mb-2 font-semibold">Environment Setup Cheat Sheets</h4>
				<ul class="list-disc space-y-1 pl-5">
					<li>
						<a
							href="https://github.com/microsoft/Web-Dev-For-Beginners/tree/main/1-getting-started-lessons/1-intro-to-programming-languages"
							target="_blank"
							class="text-indigo-600 hover:underline">Microsoft: Web Dev Environment Setup</a
						>
					</li>
					<li>
						<a
							href="https://github.com/kamranahmedse/developer-roadmap"
							target="_blank"
							class="text-indigo-600 hover:underline">Developer Roadmap</a
						> - Visual guides to development tools
					</li>
					<li>
						<a
							href="https://docs.github.com/en/github/getting-started-with-github/quickstart"
							target="_blank"
							class="text-indigo-600 hover:underline">GitHub Quickstart Guide</a
						>
					</li>
				</ul>
			</div>
		</section>
	</div>
</ModuleTask>
