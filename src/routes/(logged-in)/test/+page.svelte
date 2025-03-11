<script lang="ts">
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
		return { success: true, message: 'All tests passed!' };
	};
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

<div class="h-full p-8">
	<JsTask
		title="Addition Function"
		descriptionFragment={description}
		successFragment={success}
		errorFragment={error}
		onSubmit={validateSolution}
		{initialCode}
	/>
</div>
