<script lang="ts">
	import { goto } from '$app/navigation';

	const challenges = [
		{
			id: 1,
			title: 'Hello World',
			description: "Write your first JavaScript program that prints 'Hello World'.",
			difficulty: 'beginner',
			category: 'JavaScript',
			xpReward: 50,
			completed: true,
			timeEstimate: '5 mins'
		},
		{
			id: 2,
			title: 'Variables and Data Types',
			description:
				'Learn how to declare variables and work with different data types in JavaScript.',
			difficulty: 'beginner',
			category: 'JavaScript',
			xpReward: 75,
			completed: true,
			timeEstimate: '10 mins'
		},
		{
			id: 3,
			title: 'Conditional Statements',
			description: 'Master if/else statements to create conditional logic in your programs.',
			difficulty: 'beginner',
			category: 'JavaScript',
			xpReward: 100,
			completed: false,
			timeEstimate: '15 mins'
		},
		{
			id: 4,
			title: 'Loops and Iterations',
			description: 'Learn how to use for loops and while loops for repeated operations.',
			difficulty: 'intermediate',
			category: 'JavaScript',
			xpReward: 150,
			completed: false,
			timeEstimate: '20 mins'
		},
		{
			id: 5,
			title: 'Basic HTML Structure',
			description: 'Create your first HTML document with proper structure and elements.',
			difficulty: 'beginner',
			category: 'HTML',
			xpReward: 50,
			completed: false,
			timeEstimate: '10 mins'
		},
		{
			id: 6,
			title: 'CSS Styling Basics',
			description: 'Learn how to apply styles to HTML elements using CSS.',
			difficulty: 'beginner',
			category: 'CSS',
			xpReward: 75,
			completed: false,
			timeEstimate: '15 mins'
		}
	];

	let selectedCategory = $state('all');
	let selectedDifficulty = $state('all');
	let searchQuery = $state('');

	let filteredChallenges = $derived(
		challenges.filter((challenge) => {
			const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
			const matchesDifficulty =
				selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
			const matchesSearch =
				challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				challenge.description.toLowerCase().includes(searchQuery.toLowerCase());

			return matchesCategory && matchesDifficulty && matchesSearch;
		})
	);

	let categories = $derived(['all', ...new Set(challenges.map((c) => c.category))]);
	let difficulties = $derived(['all', ...new Set(challenges.map((c) => c.difficulty))]);

	function startChallenge(id: number) {
		goto(`/challenges/${id}`);
	}
</script>

<svelte:head>
	<title>Coding Challenges | CodeLegends</title>
</svelte:head>

<div class="mx-auto max-w-7xl p-8">
	<div class="mb-4 text-sm text-gray-600">
		<a href="/" class="text-indigo-600 hover:underline">Home</a> / Challenges
	</div>

	<header class="mb-8 text-center">
		<h1 class="mb-2 text-4xl">Coding Challenges</h1>
		<p>Complete challenges to earn XP and level up your coding skills!</p>
	</header>

	<div class="mb-8 flex flex-wrap items-center justify-between gap-4">
		<div class="min-w-[300px] flex-1">
			<input
				type="text"
				placeholder="Search challenges..."
				bind:value={searchQuery}
				class="input w-full"
			/>
		</div>

		<div class="flex gap-4">
			<select bind:value={selectedCategory} class="select min-w-[150px]">
				{#each categories as category (category)}
					<option value={category}>
						{category === 'all' ? 'All Categories' : category}
					</option>
				{/each}
			</select>

			<select bind:value={selectedDifficulty} class="select min-w-[150px]">
				{#each difficulties as difficulty (difficulty)}
					<option value={difficulty}>
						{difficulty === 'all' ? 'All Difficulties' : difficulty}
					</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#if filteredChallenges.length === 0}
			<div class="col-span-full rounded-lg bg-gray-100 p-12 text-center">
				<p>No challenges found matching your criteria. Try adjusting your filters.</p>
			</div>
		{:else}
			{#each filteredChallenges as challenge (challenge.id)}
				<div
					class="relative rounded-lg border border-gray-100 bg-white p-6 shadow-md transition duration-200 hover:translate-y-[-5px] hover:shadow-lg {challenge.completed
						? 'border-l-4 border-l-green-500'
						: ''}"
				>
					<div class="mb-4">
						<h3 class="mb-2 text-xl">{challenge.title}</h3>
						<div class="flex gap-2">
							<span class="rounded bg-gray-100 p-1 px-2 text-xs">{challenge.category}</span>
							<span
								class={`rounded p-1 px-2 text-xs 
                                ${challenge.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : ''} 
                                ${challenge.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-800' : ''} 
                                ${challenge.difficulty === 'advanced' ? 'bg-red-100 text-red-800' : ''}`}
							>
								{challenge.difficulty}
							</span>
						</div>
					</div>

					<p class="mb-6 text-sm leading-relaxed text-gray-600">{challenge.description}</p>

					<div class="flex items-center justify-between">
						<div class="flex gap-4 text-sm">
							<span class="font-bold text-purple-700">{challenge.xpReward} XP</span>
							<span class="text-gray-500">{challenge.timeEstimate}</span>
						</div>

						<button class="btn primary rounded-md" onclick={() => startChallenge(challenge.id)}>
							{challenge.completed ? 'Retry' : 'Start'}
						</button>
					</div>

					{#if challenge.completed}
						<div
							class="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 font-bold text-white"
						>
							✓
						</div>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
</div>
