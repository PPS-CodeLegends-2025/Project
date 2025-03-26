<script lang="ts">
	import type { PageData } from './$types';
	import type { Section } from '$services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { codeRunner } from '$lib/client/codeRunner';
	import JsTask from '$lib/components/code/JsTask.svelte';

	const initialCode = 'function add(a, b) {\n\t// your code here\n}\n';

	const tests = [
		{ input: [2, 3], output: 5 },
		{ input: [-1, 5], output: 4 },
		{ input: [0, 0], output: 0 },
		{ input: [7, -7], output: 0 }
	];

	const validateSolution = async (code: string) => {
		try {
			for (const { input, output } of tests) {
				const result = await codeRunner.runFunction(code, 'add', input);
				if (result !== output) {
					return {
						success: false,
						message: `Expected ${output}, but got ${result} when calling add(${input.join(', ')})`
					};
				}
			}
		} catch (e) {
			if (e instanceof Error) return { success: false, message: e.message };
			else return { success: false, message: String(e) };
		}

		taskCompleted = true;
		return { success: true, message: 'All tests passed!' };
	};

	const sectionData: Section = {
		title: 'Introduction'
	};

	let taskCompleted = $state(false);

	let { data }: { data: PageData } = $props();

	const sectionIndex = data.section.index;

	const taskProps = $derived({
		section: { ...sectionData, ...data.section.current },
		nextSection: data.module.sections[sectionIndex + 1],
		prevSection: data.module.sections[sectionIndex - 1],
		completed: false, // TODO: data.userProgress.sections
		completedNow: taskCompleted, // TODO: for enabling the complete button (just change to true to enable)
		module: data.module.data,
		currentSectionIndex: sectionIndex,
		totalSections: data.module.sections.length,
		onMarkAsCompleted: () => {
			alert('Marked as completed');
		}
	});
</script>

{#snippet description()}
	<div class="space-y-3">
		<p>
			Write a function named <code class="code">add</code> that takes two numbers as parameters and returns
			their sum.
		</p>

		<h4 class="mt-4 font-semibold">Examples:</h4>
		<pre class="code rounded p-2">
add(2, 3)   // should return 5
add(-1, 5)  // should return 4
add(0, 0)   // should return 0
add(7, -7)  // should return 0</pre>

		<p class="mt-4">Your function should work with positive numbers, negative numbers, and zero.</p>
	</div>
{/snippet}

{#snippet success(message: string)}
	<div class="box success">
		{message}
	</div>
{/snippet}

{#snippet error(message: string)}
	<div class="box error">
		Test failed: {message}
	</div>
{/snippet}

<ModuleTask {...taskProps}>
	<div class="space-y-6 px-4">
		<div class="mb-6">
			<h2 class="mb-4 text-2xl font-bold">JavaScript Functions: The Building Blocks</h2>

			<p class="mb-3">
				Functions are one of the fundamental building blocks in JavaScript. A function is a reusable
				block of code designed to perform a specific task.
			</p>

			<p class="mb-3">
				Think of functions as small machines: they take some input (parameters), process it, and
				then produce an output (return value). This concept is central to programming and will be
				used throughout your coding journey.
			</p>

			<p class="mb-5">
				In this first exercise, we'll start with something simple - creating a function that adds
				two numbers together. This will help you understand the basic structure of functions in
				JavaScript.
			</p>

			<div class="bg-base-200 mb-5 rounded-lg p-4">
				<h3 class="mb-2 font-semibold">Function Syntax:</h3>
				<pre class="code p-2">{`function functionName(parameter1, parameter2) {
	// code to execute
	return result;
}`}</pre>
			</div>

			<p>Let's apply this knowledge in the task below:</p>
		</div>

		<div class="my-12 border-t border-gray-200"></div>

		<div class="h-full">
			<JsTask
				title="Addition Function"
				descriptionFragment={description}
				successFragment={success}
				errorFragment={error}
				onSubmit={validateSolution}
				{initialCode}
			/>
		</div>
	</div>
</ModuleTask>
