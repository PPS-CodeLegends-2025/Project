<script lang="ts">
	import { onMount } from 'svelte';

	import type { PageProps } from './$types';

	interface Challenge {
		id: string;
		title: string;
		description: string;
		difficulty: string;
		points: number;
		completedBy: number;
		tags: string[];
	}

	let { data }: PageProps = $props();

	let challenge: Challenge | null = $state(null);
	let loading = $state(true);
	let error: string | null = $state(null);

	onMount(async () => {
		try {
			// TODO: placeholder
			challenge ??= {
				id: data.id,
				title: 'Example Challenge',
				description: 'This is an example challenge description.',
				difficulty: 'Medium',
				points: 100,
				completedBy: 42,
				tags: ['algorithm', 'data structures']
			};
		} catch (err) {
			error = 'Failed to load challenge';
			console.error(err);
		} finally {
			loading = false;
		}
	});

	function handleSubmitSolution() {
		// TODO: implement solution submission
		alert('Solution submitted!');
	}
</script>

<svelte:head>
	<title>{challenge?.title || 'Challenge'} | Platform Name</title>
</svelte:head>

<div class="mx-auto max-w-3xl p-5">
	{#if loading}
		<div class="py-10 text-center">Loading challenge...</div>
	{:else if error}
		<div class="py-10 text-center text-red-600">{error}</div>
	{:else}
		<div class="mb-8">
			<h1 class="text-2xl font-bold">{challenge?.title}</h1>
			<div class="my-2.5 flex gap-4">
				{#if challenge?.difficulty}
					<span
						class={`rounded px-2 py-0.5 font-bold
                        ${
													challenge.difficulty.toLowerCase() === 'easy'
														? 'bg-green-100 text-green-800'
														: challenge.difficulty.toLowerCase() === 'medium'
															? 'bg-amber-100 text-amber-800'
															: 'bg-red-100 text-red-800'
												}`}
					>
						{challenge.difficulty}
					</span>
				{/if}
				<span class="px-2">{challenge?.points} points</span>
				<span class="px-2">{challenge?.completedBy} completions</span>
			</div>
			<div class="mt-2.5 flex flex-wrap gap-2">
				{#each challenge?.tags || [] as tag (tag)}
					<span class="rounded bg-gray-100 px-2 py-1 text-sm">{tag}</span>
				{/each}
			</div>
		</div>

		<div class="mb-8">
			<h2 class="mb-3 text-xl font-semibold">Description</h2>
			<div class="prose">
				{challenge?.description}
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<h2 class="text-xl font-semibold">Your Solution</h2>
			<textarea class="input min-h-[200px] w-full" placeholder="Write your solution here..."
			></textarea>
			<button class="btn primary" onclick={handleSubmitSolution}> Submit Solution </button>
		</div>
	{/if}
</div>
