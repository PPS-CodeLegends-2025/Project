<script lang="ts">
	import type { PageData } from './$types';
	import type { Section } from '$lib/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { page } from '$app/stores';
	import { modules } from '$lib/services/modules';

	const sectionData: Section = {
		title: 'Syntax'
	};

	let { data }: { data: PageData } = $props();

	const sectionIndex = data.section.index;
	const userId = $page.data.user?.id || 'guest-user';
	const moduleId = data.module.data.url;

	const taskProps = {
		section: { ...sectionData, ...data.section.current },
		nextSection: data.module.sections[sectionIndex + 1],
		prevSection: data.module.sections[sectionIndex - 1],
		completed: data.section?.current?.completed || false,
		completedNow: false, // TODO: for enabling the complete button (just change to true to enable)
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
		<h2 class="mb-4 text-2xl font-bold text-indigo-600">JavaScript Syntax Fundamentals</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				JavaScript is a programming language that enables interactive web pages. Its syntax follows
				certain rules that define how code should be structured.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Key Syntax Elements</h3>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">Statements</h4>
					<p class="mt-2">Instructions that end with semicolons (;)</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">let name = 'John'; // Statement</pre>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">Variables</h4>
					<p class="mt-2">Containers for storing data values</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">let x = 5; const y = 10; var z = 15;</pre>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">Functions</h4>
					<p class="mt-2">Blocks of code designed to perform tasks</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{'function greet(name)\n{\n\treturn `Hello, ${name}!`;\n}'}</pre>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">Operators</h4>
					<p class="mt-2">Symbols that perform operations</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">let sum = 5 + 10; // Addition operator</pre>
				</div>
			</div>
		</div>

		<p class="text-lg text-gray-700">
			Understanding JavaScript syntax is fundamental to writing clean, error-free code. The language
			is case-sensitive, and each statement typically ends with a semicolon, though they're
			technically optional in many cases.
		</p>
	</div>
</ModuleTask>
