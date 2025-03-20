<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const moduleId = parseInt($page.params.id);
	const sectionId = $page.params.sectionId;

	const modules = [
		{
			id: 1,
			title: 'JavaScript Fundamentals',
			description: 'Learn the core concepts of JavaScript programming',
			level: 'Beginner',
			xpReward: 500,
			progress: 0,
			lessons: 10,
			category: 'JavaScript',
			image: '/images/js-logo.png',
			content: 'This is the detailed content for JavaScript Fundamentals module.',
			sections: [
				{
					id: 'introduction',
					title: 'Introduction to JavaScript',
					isCompleted: false,
					content:
						'JavaScript is a programming language that enables interactive web pages. This section covers the basics of what JavaScript is and its role in web development.'
				},
				{
					id: 'variables',
					title: 'Variables and Data Types',
					isCompleted: false,
					content:
						'Learn how to declare variables and understand the different data types in JavaScript, including strings, numbers, booleans, and objects.'
				},
				{
					id: 'functions',
					title: 'Working with Functions',
					isCompleted: false,
					content:
						'Functions are reusable blocks of code. This section explains how to define and call functions, pass parameters, and return values.'
				}
			]
		},
		{
			id: 2,
			title: 'Advanced JavaScript',
			description: 'Dive deeper into JavaScript with advanced topics',
			level: 'Intermediate',
			xpReward: 800,
			progress: 25,
			lessons: 12,
			category: 'JavaScript',
			image: '/images/js-logo.png',
			content: 'This is the detailed content for Advanced JavaScript module.',
			sections: [
				{
					id: 'closures',
					title: 'Closures and Scope',
					isCompleted: true,
					content: 'Understand JavaScript closures and how scope works in JavaScript applications.'
				},
				{
					id: 'promises',
					title: 'Promises and Async/Await',
					isCompleted: false,
					content:
						'Learn how to work with asynchronous code using Promises and the async/await syntax.'
				},
				{
					id: 'modules',
					title: 'JavaScript Modules',
					isCompleted: false,
					content:
						'Explore how to organize your code using JavaScript modules with import and export statements.'
				}
			]
		},
		{
			id: 3,
			title: 'TypeScript Basics',
			description: 'Start your journey with TypeScript',
			level: 'Beginner',
			xpReward: 600,
			progress: 0,
			lessons: 8,
			category: 'TypeScript',
			image: '/images/ts-logo.png',
			content: 'This is the detailed content for TypeScript Basics module.',
			sections: [
				{
					id: 'intro',
					title: 'Introduction to TypeScript',
					isCompleted: false,
					content: 'Learn what TypeScript is and how it enhances JavaScript with static types.'
				},
				{
					id: 'types',
					title: 'Basic Types',
					isCompleted: false,
					content:
						'Explore the basic types available in TypeScript and how to use them effectively.'
				},
				{
					id: 'interfaces',
					title: 'Interfaces and Type Aliases',
					isCompleted: false,
					content:
						'Learn how to define complex types using interfaces and type aliases in TypeScript.'
				}
			]
		},
		{
			id: 4,
			title: 'Svelte for Beginners',
			description: 'Learn the Svelte framework from scratch',
			level: 'Beginner',
			xpReward: 600,
			progress: 75,
			lessons: 8,
			category: 'Frameworks',
			image: '/images/svelte-logo.png',
			content: 'This is the detailed content for Svelte for Beginners module.',
			sections: [
				{
					id: 'getting-started',
					title: 'Getting Started with Svelte',
					isCompleted: true,
					content: 'Learn how to set up a new Svelte project and understand its basic structure.'
				},
				{
					id: 'components',
					title: 'Svelte Components',
					isCompleted: true,
					content: 'Explore how to create and use components in Svelte applications.'
				},
				{
					id: 'reactivity',
					title: 'Reactivity in Svelte',
					isCompleted: false,
					content:
						"Understand Svelte's unique approach to reactivity and how to leverage it in your applications."
				}
			]
		}
	];

	const module = modules.find((m) => m.id === moduleId);
	const sections = module?.sections || [];
	const currentSection = sections.find((s) => s.id === sectionId);

	const currentSectionIndex = sections.findIndex((s) => s.id === sectionId);
	const prevSection = currentSectionIndex > 0 ? sections[currentSectionIndex - 1] : null;
	const nextSection =
		currentSectionIndex < sections.length - 1 ? sections[currentSectionIndex + 1] : null;

	function goToModule() {
		goto(`/module/${moduleId}`);
	}

	function goToSection(sectionId: string) {
		goto(`/module/${moduleId}/${sectionId}`);
	}

	function markAsCompleted() {
		alert('Section marked as completed!');

		if (nextSection) {
			goToSection(nextSection.id);
		} else {
			goToModule();
		}
	}
</script>

<div class="container mx-auto p-6">
	<div class="mb-6 flex items-center justify-between">
		<button
			class="btn mb-4 flex flex-row gap-4 rounded-lg px-3 py-2 hover:bg-gray-100"
			onclick={goToModule}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-arrow-left"
			>
				<line x1="19" y1="12" x2="5" y2="12"></line>
				<polyline points="12 19 5 12 12 5"></polyline>
			</svg>
			Back to Module
		</button>
		{#if module}
			<h3 class="text-lg font-medium text-gray-600">{module.title}</h3>
		{/if}
	</div>

	{#if module && currentSection}
		<div class="box rounded-lg bg-white p-6 shadow">
			<h1 class="mb-2 text-2xl font-bold">{currentSection.title}</h1>

			<div class="mb-6 flex items-center justify-between">
				<div class="badge bg-blue-100 text-blue-800">
					Section {currentSectionIndex + 1} of {sections.length}
				</div>
				{#if currentSection.isCompleted}
					<div class="badge bg-green-100 text-green-800">Completed</div>
				{/if}
			</div>

			<div class="prose mb-8 max-w-none">
				<p>{currentSection.content}</p>

				<h2>Key Concepts</h2>
				<ul>
					<li>Important concept 1</li>
					<li>Important concept 2</li>
					<li>Important concept 3</li>
				</ul>

				<h2>Code Example</h2>
				<pre><code>
function example() \{console.log('This is an example')};
                </code></pre>

				<h2>Practice Exercise</h2>
				<p>Try implementing the concepts learned in this section with the following exercise:</p>
				<div class="rounded bg-gray-100 p-4">
					Exercise description goes here. This would typically involve a coding task or quiz related
					to the section content.
				</div>
			</div>

			<div class="mt-10 flex justify-between">
				<div>
					{#if prevSection}
						<button class="btn btn-outline" onclick={() => goToSection(prevSection.id)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="mr-2"
							>
								<line x1="19" y1="12" x2="5" y2="12"></line>
								<polyline points="12 19 5 12 12 5"></polyline>
							</svg>
							Previous: {prevSection.title}
						</button>
					{/if}
				</div>

				<div class="flex gap-2">
					{#if !currentSection.isCompleted}
						<button class="btn primary" onclick={markAsCompleted}> Mark as Completed </button>
					{/if}

					{#if nextSection}
						<button
							class="btn primary flex flex-row items-center"
							onclick={() => goToSection(nextSection.id)}
						>
							Next: {nextSection.title}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="ml-2"
							>
								<line x1="5" y1="12" x2="19" y2="12"></line>
								<polyline points="12 5 19 12 12 19"></polyline>
							</svg>
						</button>
					{:else}
						<button class="btn btn-success" onclick={goToModule}> Complete Module </button>
					{/if}
				</div>
			</div>
		</div>
	{:else}
		<div class="box py-12 text-center">
			<h2 class="mb-4 text-2xl font-bold">Section Not Found</h2>
			<p>The section you're looking for doesn't exist.</p>
			<button class="btn primary mt-4" onclick={goToModule}>Return to Module</button>
		</div>
	{/if}
</div>

<style>
	.box {
		background-color: white;
		border-radius: 0.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	pre {
		background-color: #f8f9fa;
		padding: 1rem;
		border-radius: 0.25rem;
		overflow-x: auto;
	}

	code {
		font-family: monospace;
	}
</style>
