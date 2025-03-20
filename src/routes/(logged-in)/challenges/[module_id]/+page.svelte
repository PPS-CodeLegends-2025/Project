<script lang="ts">
	import { onMount } from 'svelte';

	import type { PageData as BasePageData } from '../$types';

	interface Challenge {
		id: string;
		title: string;
		description: string;
		difficulty: string;
		points: number;
		completedBy: number;
		tags: string[];
	}

	interface PageData extends BasePageData {
		challenge?: Challenge;
		id: string;
	}

	export let data: PageData;

	let challenge: Challenge = {} as Challenge;
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			// TODO: placeholder
			challenge = data.challenge || {
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
		// todo
		alert('Solution submitted!');
	}
</script>

<svelte:head>
	<title>{challenge.title || 'Challenge'} | Platform Name</title>
</svelte:head>

<div class="challenge-container">
	{#if loading}
		<div class="loading">Loading challenge...</div>
	{:else if error}
		<div class="error">{error}</div>
	{:else}
		<div class="challenge-header">
			<h1>{challenge.title}</h1>
			<div class="challenge-meta">
				<span class="difficulty {challenge.difficulty?.toLowerCase()}">{challenge.difficulty}</span>
				<span class="points">{challenge.points} points</span>
				<span class="completed-by">{challenge.completedBy} completions</span>
			</div>
			<div class="tags">
				{#each challenge.tags || [] as tag (tag)}
					<span class="tag">{tag}</span>
				{/each}
			</div>
		</div>

		<div class="challenge-description">
			<h2>Description</h2>
			<div class="description-content">
				{challenge.description}
			</div>
		</div>

		<div class="challenge-solution">
			<h2>Your Solution</h2>
			<textarea placeholder="Write your solution here..."></textarea>
			<button class="submit-btn" onclick={handleSubmitSolution}>Submit Solution</button>
		</div>
	{/if}
</div>

<style>
	.challenge-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}

	.loading,
	.error {
		text-align: center;
		padding: 40px;
	}

	.error {
		color: red;
	}

	.challenge-header {
		margin-bottom: 30px;
	}

	.challenge-meta {
		display: flex;
		gap: 15px;
		margin: 10px 0;
	}

	.difficulty {
		padding: 3px 8px;
		border-radius: 4px;
		font-weight: bold;
	}

	.difficulty.easy {
		background-color: #e7f5e7;
		color: #2e7d32;
	}

	.difficulty.medium {
		background-color: #fff8e1;
		color: #ff8f00;
	}

	.difficulty.hard {
		background-color: #ffebee;
		color: #c62828;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 10px;
	}

	.tag {
		background-color: #f0f0f0;
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 0.9em;
	}

	.challenge-description,
	.challenge-solution {
		margin-bottom: 30px;
	}

	textarea {
		width: 100%;
		min-height: 200px;
		padding: 10px;
		margin-bottom: 15px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-family: monospace;
	}

	.submit-btn {
		background-color: #4a86e8;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bold;
	}

	.submit-btn:hover {
		background-color: #3b78e7;
	}
</style>
