<script lang="ts">
	import type { PageProps } from './$types';
	import JsTask from '$components/code/JsTask.svelte';
	import { codeRunner } from '$client/codeRunner';

	const tests = [
		{ input: [1, 2], output: 3 },
		{ input: [5, 7], output: 12 },
		{ input: [-1, 1], output: 0 },
		{ input: [0, 0], output: 0 },
		{ input: [10, -5], output: 5 }
	];

	const validateSolution = async (code: string) => {
		const result = await codeRunner.runFunctionWithTests(code, 'add', tests);
		return result;
	};

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.challenge.title} | Code Legends</title>
</svelte:head>

{#snippet description()}
	<p>
		{data.challengeTask.description}
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
			<span class="rounded bg-gray-100 px-2 py-1 text-sm">{data.challenge?.category}</span>
			<span class="rounded bg-gray-100 px-2 py-1 text-sm">{data.challenge?.timeEstimate}</span>
		</div>
	</div>

	<div class="mb-8">
		<h2 class="mb-3 text-xl font-semibold">Description</h2>
		<div>
			{data.challenge?.description}
		</div>
	</div>

	<div class="my-12 border-t border-gray-200"></div>

	<div class="flex flex-col gap-4">
		<h2 class="text-xl font-semibold">Your Solution</h2>
		<div class="h-full">
			<JsTask
				title={data.challengeTask.name}
				descriptionFragment={description}
				successFragment={success}
				errorFragment={error}
				onSubmit={validateSolution}
				initialCode={data.challengeTask.exampleCode}
			/>
		</div>
	</div>
</div>
