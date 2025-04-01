<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	
	function goToModules() {
		goto('/module');
	}

	const xpProgress = $derived(() => {
		if (!data.levelInfo) return 0;
		const { currentXp, nextLevelXp, currentLevelXp } = data.levelInfo;
		const levelRange = nextLevelXp - currentLevelXp;
		const xpInCurrentLevel = currentXp - currentLevelXp;
		return Math.min(Math.round((xpInCurrentLevel / levelRange) * 100), 100);
	});
	
	const moduleCompletion = $derived(() => {
		if (!data.modules?.all || data.modules.all.length === 0) return 0;
		return Math.round((data.modules.completed.length / data.modules.all.length) * 100);
	});
</script>

<div class="container mx-auto p-6">
	<h1 class="mb-6 text-3xl font-bold">Welcome to CodeLegends{data.user?.fullName ? `, ${data.user.fullName}` : ''}</h1>
	<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
		<div class="card rounded-lg border border-gray-100 bg-white p-6 shadow">
			<h2 class="mb-4 text-xl font-semibold">Your Progress</h2>
			<p>Current level: {data.user?.level || 0}</p>
			<p class="text-sm text-gray-600">XP: {data.levelInfo?.currentXp || 0} / {data.levelInfo?.nextLevelXp || 100}</p>
			<div class="progress-bar mt-2 rounded-full bg-gray-200">
				<div
					class="progress h-2 rounded-full bg-indigo-500"
					style={`width: ${xpProgress}%`}
				></div>
			</div>
		</div>
		<div class="card rounded-lg border border-gray-100 bg-white p-6 shadow">
			<h2 class="mb-4 text-xl font-semibold">Module Completion</h2>
			<p>Completed: {data.modules?.completed?.length || 0} of {data.modules?.all?.length || 0} modules</p>
			<div class="progress-bar mt-2 rounded-full bg-gray-200">
				<div
					class="progress h-2 rounded-full bg-green-500"
					style={`width: ${moduleCompletion}%`}
				></div>
			</div>
			<p class="mt-2 text-sm text-gray-600">In progress: {data.modules?.inProgress?.length || 0} modules</p>
		</div>
	</div>

	<div class="rounded-lg border border-gray-100 bg-white p-6 shadow">
		<h2 class="mb-4 text-xl font-semibold">Available Modules</h2>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#if data.modules?.inProgress?.length > 0}
				{#each data.modules.inProgress.slice(0, 3) as module (module.url)}
					<div class="module-box">
						<h3 class="mb-2 font-medium">{module.title}</h3>
						<p class="mb-4 text-sm text-gray-600">{module.description}</p>
						<div class="mb-2 w-full">
							<div class="h-1.5 w-full rounded-full bg-gray-200">
								<div
									class="h-1.5 rounded-full bg-indigo-600"
									style="width: {module.progress}%"
								></div>
							</div>
							<p class="mt-1 text-xs text-gray-500">{Math.round(module.progress)}% completed</p>
						</div>
						<a class="btn primary" href={module.url}> Continue Learning </a>
					</div>
				{/each}
			{:else}
				<div class="module-box">
					<h3 class="mb-2 font-medium">JavaScript Basics</h3>
					<p class="mb-4 text-sm text-gray-600">Learn the fundamentals of JavaScript programming</p>
					<div class="flex-1"></div>
					<a class="btn primary" href="/module/javascript-basics"> Start Learning </a>
				</div>
				<div class="module-box">
					<h3 class="mb-2 font-medium">Web Dev Introduction</h3>
					<p class="mb-4 text-sm text-gray-600">Learn about web development roles and concepts</p>
					<div class="flex-1"></div>
					<a class="btn primary" href="/module/introduction"> Start Learning </a>
				</div>
				<div class="module-box">
					<h3 class="mb-2 font-medium">HTML Basics</h3>
					<p class="mb-4 text-sm text-gray-600">Master the foundations of HTML</p>
					<div class="flex-1"></div>
					<a class="btn primary" href="/module/html-basics"> Start Learning </a>
				</div>
			{/if}
		</div>

		<button class="btn secondary mt-6" onclick={goToModules}> View All Modules </button>
	</div>
</div>

<style lang="postcss">
	@reference 'tailwindcss';

	.module-box {
		@apply rounded border border-gray-300 p-4 transition-all hover:shadow-md;
		@apply flex flex-col items-start justify-between;
	}
</style>
