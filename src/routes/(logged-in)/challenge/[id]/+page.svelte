<script lang="ts">
	import type { PageProps } from './$types';
	import JsTask from '$components/code/JsTask.svelte';
	import { codeRunner } from '$client/codeRunner';
	import { challenges } from '$client/services/challenges';

	let { data }: PageProps = $props();

	const tests = data.challengeTask.tests;
	let completed = $state(data.challenge.completed);

	function initialCode() {
		if (data.challengeTask.exampleCode) return data.challengeTask.exampleCode;

		const inputsStr = data.challengeTask.inputs.map((v, i) => `${v}${i}`).join(',');

		return `function solution(${inputsStr}) {\n\t// Your code here\n}\n\n\n\nsolution(${inputsStr});\n\n`;
	}

	const validateSolution = async (code: string) => {
		const result = await codeRunner.runFunctionWithTests(code, 'solution', tests);
		if (result.success) {
			await challenges.markChallengeCompleted(data.challenge.id);
			completed = true;
		}
		return result;
	};
</script>

<svelte:head>
	<title>{data.challenge.title} | CodeLegends</title>
</svelte:head>

{#snippet description()}
	<p>
		{data.challengeTask.description}
	</p>
	<p class="mt-12 text-xl">
		Always name your main function as <code class="bg-gray-100 px-1 py-0.5 text-gray-800"
			>solution</code
		>!
	</p>
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

<div class="mx-auto max-w-3xl p-5">
	<div class="mb-8">
		<h1 class="text-2xl font-bold">{data.challenge.title}</h1>
		<div class="my-2.5 flex gap-4">
			{#if data.challenge?.difficulty}
				<span
					class={`rounded px-2 py-0.5 font-bold
                        ${
													data.challenge.difficulty.toLowerCase() === 'easy'
														? 'bg-green-100 text-green-800'
														: data.challenge.difficulty.toLowerCase() === 'medium'
															? 'bg-amber-100 text-amber-800'
															: 'bg-red-100 text-red-800'
												}`}
				>
					{data.challenge.difficulty}
				</span>
			{/if}
			<span class="px-2">{data.challenge?.xp} points</span>
		</div>
		<div class="mt-2.5 flex flex-wrap gap-2">
			<span class="rounded bg-gray-100 px-2 py-1 text-sm">{data.challenge.category}</span>
			<span class="rounded bg-gray-100 px-2 py-1 text-sm">{data.challenge.timeEstimate}</span>
		</div>
	</div>

	{#if completed}
		<div class="mb-8 rounded bg-green-100 p-4 text-green-800">
			You have completed this challenge! 🎉
		</div>
	{/if}

	<div class="mb-8">
		<h2 class="mb-3 text-xl font-semibold">Description</h2>
		<div>
			{data.challenge?.description}
		</div>
	</div>

	<div class="my-12 border-t border-gray-200"></div>

	<div class="flex flex-col gap-4">
		<div class="h-full">
			<JsTask
				title={data.challengeTask.name}
				descriptionFragment={description}
				successFragment={success}
				errorFragment={error}
				onSubmit={validateSolution}
				initialCode={initialCode()}
			/>
		</div>
	</div>
</div>
