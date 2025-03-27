<script lang="ts">
	import type { PageData } from './$types';
	import type { Section } from '$lib/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { page } from '$app/stores';
	import { modules } from '$lib/services/modules';

	const sectionData: Section = {
		title: 'Your First Function'
	};

	// Define test cases for the add function
	const tests = [
		{ input: [1, 2], output: 3 },
		{ input: [5, 7], output: 12 },
		{ input: [-1, 1], output: 0 },
		{ input: [0, 0], output: 0 },
		{ input: [10, -5], output: 5 }
	];

	const validateSolution = async (code: string) => {
		try {
			// Create a function from the user's code
			const userFunction = new Function(`
				${code}
				return add;
			`)();

			for (const { input, output } of tests) {
				const result = userFunction(...input);

				if (result !== output) {
					return {
						success: false,
						message: `Expected ${output}, but got ${result} when calling add(${input.join(', ')})`
					};
				}
				taskCompleted = true;
				return { success: true, message: 'All tests passed!' };
			}
		} catch (e) {
			return {
				success: false,
				message: `Error executing your code: ${e.message}`
			};
		}
	};

	let taskCompleted = $state(false);

	let { data }: { data: PageData } = $props();

	const sectionIndex = data.section.index;
	const userId = $page.data.user?.id || 'guest-user';
	const moduleId = data.module.data.url;

	const taskProps = $derived({
		section: { ...sectionData, ...data.section.current },
		nextSection: data.module.sections[sectionIndex + 1],
		prevSection: data.module.sections[sectionIndex - 1],
		completed: data.section.current?.completed || false,
		completedNow: taskCompleted,
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
	});
</script>

<ModuleTask {...taskProps}>
	<div class="space-y-3">
		<p>
			Write a function named <code class="code">add</code> that takes two numbers as parameters and returns
			their sum.
		</p>

		<h4 class="mt-4 font-semibold">Examples:</h4>
		<pre class="code rounded p-2">
add(1, 2) => 3
add(5, 7) => 12
add(-1, 1) => 0
		</pre>

		<div class="mt-4">
			<label for="solution" class="mb-2 block font-medium">Your solution:</label>
			<textarea
				id="solution"
				rows="10"
				class="input w-full font-mono"
				placeholder="// Write your function here"
			></textarea>

			<button
				class="btn primary mt-4"
				onclick={() => validateSolution(document.getElementById('solution').value)}
			>
				Submit Solution
			</button>
		</div>
	</div>
</ModuleTask>
