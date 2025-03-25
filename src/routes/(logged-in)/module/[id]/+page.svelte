<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { moduleWithSections2 } from '../hardcoded';

	const moduleId = page.params.id;

	const modules = moduleWithSections2;

	const module = modules.find((m) => m.id === parseInt(moduleId));

	function goBack() {
		goto('/module');
	}

	function navigateToSection(sectionId: string) {
		goto(`/module/${moduleId}/${sectionId}`);
	}

	function startModule() {
		if (module && module.sections && module.sections.length > 0) {
			navigateToSection(module.sections[0].id);
		}
	}
</script>

<div class="container mx-auto p-6">
	<button
		class="btn mb-4 flex flex-row gap-4 rounded-lg px-3 py-2 hover:bg-gray-100"
		onclick={goBack}
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
	</button>

	{#if module}
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

						{#if module.progress > 0}
							<div class="mt-2">
								<div class="mb-1 flex justify-between">
									<span>Progress:</span>
									<span>{module.progress}%</span>
								</div>
								<div class="h-2.5 w-full rounded-full bg-gray-200">
									<div
										class="h-2.5 rounded-full bg-indigo-600"
										style="width: {module.progress}%"
									></div>
								</div>
							</div>
						{:else}
							<div class="mt-2">Not started</div>
						{/if}
					</div>

					<button class="btn primary mt-6 w-full" onclick={startModule}> Start Module </button>
				</div>

				<div class="md:w-2/3">
					<h1 class="mb-4 text-3xl font-bold">{module.title}</h1>
					<p class="mb-6">{module.description}</p>

					<div class="max-w-none">
						<p>{module.content}</p>
						<h2 class="mt-6">What You'll Learn</h2>
						<ul>
							<li>Key concept 1</li>
							<li>Key concept 2</li>
							<li>Key concept 3</li>
							<li>And more...</li>
						</ul>

						<h2 class="mt-6">Module Sections</h2>
						{#if module.sections && module.sections.length > 0}
							<div class="mt-4 space-y-3">
								{#each module.sections as section, index (section.id)}
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
											{#if section.isCompleted}
												<span class="text-sm text-green-600">Completed</span>
											{:else}
												<span class="text-sm text-gray-500">Not completed</span>
											{/if}
										</div>
										<button
											class={`btn primary w-24 px-3 transition-colors ${
												section.isCompleted
													? 'bg-green-100 text-green-800 hover:bg-green-200'
													: 'bg-indigo-600 text-white hover:bg-indigo-700'
											}`}
											onclick={() => navigateToSection(section.id)}
										>
											{section.isCompleted ? 'Review' : 'Start'}
										</button>
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
	{:else}
		<div class="rounded-lg border border-gray-200 bg-white py-12 text-center shadow-sm">
			<h2 class="mb-4 text-2xl font-bold">Module Not Found</h2>
			<p>The module you're looking for doesn't exist.</p>
			<button class="btn primary mt-4" onclick={goBack}> Return to Modules </button>
		</div>
	{/if}
</div>
