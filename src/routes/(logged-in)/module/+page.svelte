<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let modules = $state(data.modules);

	let searchQuery = $state('');
	let selectedCategory = $state('All');
	let selectedLevel = $state('All');

	let filteredModules = $derived(
		modules.filter((module) => {
			const matchesSearch =
				module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				module.description.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory;
			const matchesLevel = selectedLevel === 'All' || module.level === selectedLevel;

			return matchesSearch && matchesCategory && matchesLevel;
		})
	);

	let categories = $derived(['All', ...new Set(modules.map((m) => m.category))]);
	const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
</script>

<div class="container mx-auto p-6">
	<h1 class="mb-8 text-3xl font-bold">Learning Modules</h1>

	<div class="mb-8 flex flex-col gap-4 md:flex-row">
		<div class="flex-1">
			<input
				type="text"
				placeholder="Search modules..."
				class="input w-full"
				bind:value={searchQuery}
			/>
		</div>
		<div class="flex gap-4">
			<select class="select w-32" bind:value={selectedCategory}>
				{#each categories as category (category)}
					<option value={category}>{category}</option>
				{/each}
			</select>

			<select class="select w-32" bind:value={selectedLevel}>
				{#each levels as level (level)}
					<option value={level}>{level}</option>
				{/each}
			</select>
		</div>
	</div>

	{#if filteredModules.length > 0}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredModules as module (module.url)}
				<a
					class="box flex w-full cursor-pointer flex-col text-left transition-shadow hover:shadow-lg"
					href={module.url}
				>
					<div class="flex h-40 items-center justify-center rounded-t-lg bg-slate-100">
						<img src={module.image} alt={module.title} class="h-20 object-contain" />
					</div>
					<div class="p-4">
						<div class="flex items-start justify-between">
							<h2 class="mb-2 text-xl font-semibold">{module.title}</h2>
							<span class="badge {module.level.toLowerCase()}">{module.level}</span>
						</div>
						<p class="mb-4 text-sm text-gray-600">{module.description}</p>

						<div class="flex justify-between text-sm text-gray-500">
							<!-- <span>{module.lessons} lessons</span> -->
							<span>{module.xpReward} XP</span>
						</div>

						{#if module.progress > 0}
							<div class="mt-4">
								<div class="h-2.5 w-full rounded-full bg-gray-200">
									<div
										class="h-2.5 rounded-full bg-indigo-500"
										style="width: {module.progress}%"
									></div>
								</div>
								<div class="mt-1 text-right text-xs">{module.progress}% complete</div>
							</div>
						{:else}
							<div class="mt-4 text-xs">Not started</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<div class="box py-12 text-center">
			<p class="text-lg">No modules found for your search criteria.</p>
		</div>
	{/if}
</div>
