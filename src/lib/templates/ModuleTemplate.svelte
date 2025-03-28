<script lang="ts">
	import type { Module } from '$lib/types/module';

	const module: Module = $props();

	const completedSections = module.sections.filter((section) => section.completed).length;
	const totalSections = module.sections.length;
	const calculatedProgress = totalSections > 0 ? (completedSections / totalSections) * 100 : 0;

	const displayProgress = completedSections > 0 ? calculatedProgress : module.progress;
</script>

<div class="container mx-auto p-6">
	<a
		class="btn mb-4 flex w-fit flex-row gap-4 rounded-lg px-3 py-2 hover:bg-gray-100"
		href="/module"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-arrow-left"
		>
			<line x1="19" y1="12" x2="5" y2="12"></line>
			<polyline points="12 19 5 12 12 5"></polyline>
		</svg>
		Back to Modules
	</a>

	<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
		<div class="flex flex-col gap-6 md:flex-row">
			<div class="md:w-1/3">
				<div class="flex h-48 items-center justify-center rounded-lg bg-slate-100 p-4">
					<img src={module.image} alt={module.title} class="h-24 object-contain" />
				</div>

				<div class="mt-4">
					<div class="my-2 flex items-center justify-between">
						<span>Level:</span>
						<span
							class={`rounded-full px-2 py-0.5 text-xs font-semibold
                                ${
																	module.level.toLowerCase() === 'beginner'
																		? 'bg-green-100 text-green-800'
																		: module.level.toLowerCase() === 'intermediate'
																			? 'bg-amber-100 text-amber-800'
																			: 'bg-red-100 text-red-800'
																}`}
						>
							{module.level}
						</span>
					</div>

					<div class="my-2 flex items-center justify-between">
						<span>Lessons:</span>
						<span>{module.lessons}</span>
					</div>

					<div class="my-2 flex items-center justify-between">
						<span>XP Reward:</span>
						<span>{module.xpReward} XP</span>
					</div>

					<div class="my-2 flex items-center justify-between">
						<span>Category:</span>
						<span>{module.category}</span>
					</div>

					{#if displayProgress > 0}
						<div class="mt-2">
							<div class="mb-1 flex justify-between">
								<span>Progress:</span>
								<span>{Math.round(displayProgress)}%</span>
							</div>
							<div class="h-2.5 w-full rounded-full bg-gray-200">
								<div
									class="h-2.5 rounded-full bg-indigo-600"
									style="width: {displayProgress}%"
								></div>
							</div>
						</div>
					{:else}
						<div class="mt-2">Not started</div>
					{/if}
				</div>

				{#if module.sections && module.sections.length > 0}
					<a class="btn primary mt-6 w-full" href={module.sections[0].url}> Start Module </a>
				{:else}
					<button class="btn primary mt-6 w-full" disabled>No Sections Available</button>
				{/if}
			</div>

			<div class="md:w-2/3">
				<h1 class="mb-4 text-3xl font-bold">{module.title}</h1>
				<p class="mb-6">{module.description}</p>

				<div class="max-w-none">
					{@render module.content()}

					<h2 class="mt-6 text-2xl font-semibold">Module Sections</h2>
					{#if module.sections && module.sections.length > 0}
						<div class="mt-4 space-y-3">
							{#each module.sections as section, index (section.url)}
								<div
									class="flex items-center justify-between rounded-lg border border-gray-300 p-4"
								>
									<div>
										<div class="flex items-center gap-2">
											<span
												class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-800"
											>
												{index + 1}
											</span>
											<h3 class="font-medium">{section.title}</h3>
										</div>
										{#if section.completed}
											<span class="text-sm text-green-600">Completed</span>
										{:else if index === 0 || module.sections[index - 1].completed}
											<span class="text-sm text-blue-600">Available</span>
										{:else}
											<span class="text-sm text-gray-500">Locked</span>
										{/if}
									</div>
									<a
										class={`btn primary w-28 px-3 text-center transition-colors ${
											section.completed
												? 'bg-green-100 text-green-800 hover:bg-green-200'
												: index === 0 || module.sections[index - 1].completed
													? 'bg-indigo-600 text-white hover:bg-indigo-700'
													: 'cursor-not-allowed bg-gray-100 text-gray-400 opacity-60'
										}`}
										href={section.url}
										role={index > 0 && !module.sections[index - 1].completed ? 'button' : undefined}
										aria-disabled={index > 0 && !module.sections[index - 1].completed}
										onclick={(e) => {
											if (index > 0 && !module.sections[index - 1].completed) {
												e.preventDefault();
												e.stopPropagation();
											}
										}}
									>
										{section.completed
											? 'Review'
											: index === 0 || module.sections[index - 1].completed
												? 'Start'
												: '🔒 Locked'}
									</a>
								</div>
							{/each}
						</div>
					{:else}
						<p>No sections available for this module.</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
