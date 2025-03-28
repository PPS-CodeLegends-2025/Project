<script lang="ts">
	import type { PageData } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { page } from '$app/stores';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'First Project Setup'
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
			<h3 class="mb-3 text-xl font-semibold">First Project Setup</h3>
			<p class="text-lg">
				Setting up your first coding project properly lays the foundation for successful
				development. A well-structured project makes it easier to write, test, and maintain your
				code while collaborating with others effectively.
			</p>
			<p class="mt-2 text-lg">
				This guide will walk you through the essential steps to set up your first project,
				establishing good habits that will serve you throughout your programming journey.
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Step 1: Define Your Project</h3>
			<p class="text-lg">
				Before writing any code, take time to plan and define what you're building:
			</p>
			<ul class="mt-3 list-disc space-y-2 pl-8 text-lg">
				<li>Identify the purpose and scope of your project</li>
				<li>List the main features you want to implement</li>
				<li>Consider the technologies and languages you'll use</li>
				<li>Create a simple sketch or wireframe (for visual applications)</li>
			</ul>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Step 2: Set Up Version Control</h3>
			<p class="text-lg">
				Initialize a Git repository for your project to track changes and collaborate:
			</p>
			<div class="my-3 overflow-x-auto rounded-md bg-gray-100 p-4 font-mono text-sm">
				<p># Create a new directory for your project</p>
				<p>mkdir my-first-project</p>
				<p>cd my-first-project</p>
				<p></p>
				<p># Initialize Git</p>
				<p>git init</p>
				<p></p>
				<p># Create a README.md file</p>
				<p>echo "# My First Project" > README.md</p>
				<p></p>
				<p># Create .gitignore file</p>
				<p>touch .gitignore</p>
			</div>
			<p class="mt-2 text-lg">
				Next, create a repository on GitHub and connect your local repo to it:
			</p>
			<div class="my-3 overflow-x-auto rounded-md bg-gray-100 p-4 font-mono text-sm">
				<p>git remote add origin https://github.com/yourusername/my-first-project.git</p>
				<p>git add .</p>
				<p>git commit -m "Initial commit"</p>
				<p>git push -u origin main</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Step 3: Organize Your Project Structure</h3>
			<p class="text-lg">
				Create a clean, maintainable file structure that follows standard conventions:
			</p>
			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Basic Structure Example</h4>
					<div class="font-mono text-sm">
						<p>my-first-project/</p>
						<p>├── src/ # Source code</p>
						<p>│ ├── index.js # Main entry point</p>
						<p>│ ├── components/ # Reusable components</p>
						<p>│ └── utils/ # Helper functions</p>
						<p>├── public/ # Static assets</p>
						<p>├── tests/ # Test files</p>
						<p>├── package.json # Dependencies</p>
						<p>├── README.md # Project documentation</p>
						<p>└── .gitignore # Files to ignore in Git</p>
					</div>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Best Practices</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>Separate code by function or feature</li>
						<li>Keep files small and focused on a single purpose</li>
						<li>Use consistent naming conventions</li>
						<li>Document your code structure in the README</li>
						<li>Separate source code from build outputs</li>
						<li>Include configuration files at root level</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Step 4: Set Up Development Tools</h3>
			<p class="text-lg">
				Install and configure essential tools to improve your development workflow:
			</p>
			<ul class="mt-3 list-disc space-y-2 pl-8 text-lg">
				<li><strong>Package Manager:</strong> Install npm or yarn to manage dependencies</li>
				<li><strong>Development Environment:</strong> Set up a code editor like VS Code</li>
				<li><strong>Linter:</strong> Configure ESLint, Prettier, or other code quality tools</li>
				<li><strong>Testing Framework:</strong> Set up Jest, Mocha, or another testing tool</li>
				<li>
					<strong>Build Tools:</strong> Configure webpack, Vite, or similar build systems if needed
				</li>
			</ul>

			<div class="my-4 overflow-x-auto rounded-md bg-gray-100 p-4 font-mono text-sm">
				<p># Initialize package.json</p>
				<p>npm init -y</p>
				<p></p>
				<p># Install development dependencies</p>
				<p>npm install --save-dev eslint prettier jest</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Step 5: Document Your Project</h3>
			<p class="text-lg">
				Create clear documentation to help yourself and others understand your project:
			</p>
			<div class="mt-3 rounded-lg border bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">README.md Contents</h4>
				<ul class="list-disc space-y-2 pl-5">
					<li>Project name and description</li>
					<li>Screenshots or demo (if applicable)</li>
					<li>Installation instructions</li>
					<li>Usage examples</li>
					<li>Features list</li>
					<li>Technologies used</li>
					<li>Contributing guidelines</li>
					<li>License information</li>
				</ul>
			</div>
		</section>

		<div class="mt-6 rounded-lg border bg-blue-50 p-5">
			<h4 class="mb-2 font-semibold">Practical Task</h4>
			<p class="text-lg">
				Now that you understand the steps, it's time to set up your first project:
			</p>
			<ol class="mt-3 list-decimal space-y-2 pl-8">
				<li>Define a simple project idea (e.g., a to-do list app, personal portfolio)</li>
				<li>Create a project folder and initialize Git</li>
				<li>Set up a basic file structure following the patterns above</li>
				<li>Create a GitHub repository and push your initial code</li>
				<li>Write a README.md file with your project details</li>
			</ol>
			<p class="mt-4 text-lg">
				Once complete, you'll have the foundation for your first well-structured coding project!
			</p>
		</div>
	</div>
</ModuleTask>
