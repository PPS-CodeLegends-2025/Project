<script lang="ts">
	import type { PageProps } from './$types';
	import BadgesSection from '$lib/components/badges/BadgesSection.svelte';
	import Statistics from '$components/Statistics.svelte';

	interface UserStats {
		lessonsCompleted: number;
		challengesSolved: number;
		daysActive: number;
		lastActiveDate: string | null;
	}

	interface User {
		id: string;
		username: string;
		fullName: string | null;
		level: number;
		xp: number;
		registrationDate: Date;
		stats?: UserStats;
	}

	let { data }: PageProps = $props();

	const user: User = data.user;
	const levelInfo = data.levelInfo;
	const progress = data.progress;

	let activeTab = $state('overview');

	function getDefaultAvatar(username: string): string {
		const seed = username || 'User';
		return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}`;
	}

	function formatDate(date: Date): string {
		if (!date) return 'Unknown date';

		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{user.username} | CodeLegends</title>
</svelte:head>

<div class="mx-auto max-w-[900px] p-8">
	<div class="mb-8 flex gap-8">
		<div class="relative h-[120px] w-[120px]">
			<img
				src={getDefaultAvatar(user.username)}
				alt="User avatar"
				class="h-[120px] w-[120px] rounded-full object-cover"
			/>
			<div
				class="absolute right-0 bottom-0 rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-white"
			>
				Lvl {user.level}
			</div>
		</div>

		<div class="flex-1">
			<h1 class="m-0 text-2xl font-bold">{user.username}</h1>
			<h2 class="my-1 mb-4 text-xl font-normal text-gray-600">{user.fullName || 'Anonymous'}</h2>

			<div class="mb-4">
				<div class="mb-1 h-2 overflow-hidden rounded-lg bg-gray-100">
					<div
						class="h-full bg-green-500"
						style="width: {levelInfo ? levelInfo.progressToNextLevel * 100 : 0}%"
					></div>
				</div>
				<div class="text-xs text-gray-600">
					{#if levelInfo}
						{levelInfo.currentXp} / {levelInfo.nextLevelXp} XP ({levelInfo.xpToNextLevel} XP to next
						level)
					{:else}
						{user.xp} XP
					{/if}
				</div>
			</div>

			<p class="text-xs text-gray-600">Member since {formatDate(user.registrationDate)}</p>
		</div>
	</div>

	<div class="mb-8 flex border-b border-gray-200">
		<button
			class={`cursor-pointer border-0 border-b-2 bg-transparent px-6 py-3 text-base ${
				activeTab === 'overview' ? 'border-green-500 font-bold' : 'border-transparent'
			}`}
			onclick={() => (activeTab = 'overview')}
		>
			Overview
		</button>
		<button
			class={`cursor-pointer border-0 border-b-2 bg-transparent px-6 py-3 text-base ${
				activeTab === 'badges' ? 'border-green-500 font-bold' : 'border-transparent'
			}`}
			onclick={() => (activeTab = 'badges')}
		>
			Badges
		</button>
		<button
			class={`cursor-pointer border-0 border-b-2 bg-transparent px-6 py-3 text-base ${
				activeTab === 'statistics' ? 'border-green-500 font-bold' : 'border-transparent'
			}`}
			onclick={() => (activeTab = 'statistics')}
		>
			Statistics
		</button>
	</div>

	{#if activeTab === 'overview'}
		<div class="overview-content">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div class="rounded-lg bg-gray-50 p-6 text-center">
					<h3 class="mt-0 mb-2 text-base text-gray-600">Completed Modules</h3>
					<div class="text-4xl font-bold text-gray-800">
						{progress.completedModules?.length || 0}
					</div>
				</div>
				<div class="rounded-lg bg-gray-50 p-6 text-center">
					<h3 class="mt-0 mb-2 text-base text-gray-600">In Progress Modules</h3>
					<div class="text-4xl font-bold text-gray-800">
						{progress.inProgressModules?.length || 0}
					</div>
				</div>
				<div class="rounded-lg bg-gray-50 p-6 text-center">
					<h3 class="mt-0 mb-2 text-base text-gray-600">Active Days</h3>
					<div class="text-4xl font-bold text-gray-800">{user?.stats?.daysActive || 0}</div>
				</div>
				<div class="rounded-lg bg-gray-50 p-6 text-center">
					<h3 class="mt-0 mb-2 text-base text-gray-600">Challenges Solved</h3>
					<div class="text-4xl font-bold text-gray-800">{user?.stats?.challengesSolved || 0}</div>
				</div>
			</div>

			{#if progress.inProgressModules?.length > 0}
				<div class="mt-8">
					<h3 class="mb-4 text-xl font-semibold">In Progress Modules</h3>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						{#each progress.inProgressModules as module (module.url)}
							<a
								href={module.url}
								class="flex rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
							>
								<div class="h-16 w-16 flex-shrink-0">
									<img src={module.image} alt={module.title} class="h-full w-full object-contain" />
								</div>
								<div class="ml-4 flex-1">
									<h4 class="font-medium">{module.title}</h4>
									<div class="mt-2">
										<div class="flex items-center justify-between text-sm">
											<span
												>{module.completedSections.length} of {module.totalSections} sections</span
											>
											<span>{Math.round(module.progress)}%</span>
										</div>
										<div class="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
											<div
												class="h-full rounded-full bg-green-600"
												style="width: {module.progress}%"
											></div>
										</div>
									</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}

			{#if progress.completedModules?.length > 0}
				<div class="mt-8">
					<h3 class="mb-4 text-xl font-semibold">Completed Modules</h3>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{#each progress.completedModules as module (module.url)}
							<a
								href={module.url}
								class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
							>
								<div class="flex items-center">
									<div class="h-10 w-10 flex-shrink-0">
										<img
											src={module.image}
											alt={module.title}
											class="h-full w-full object-contain"
										/>
									</div>
									<div class="ml-3 flex-1">
										<h4 class="font-medium">{module.title}</h4>
										<p class="text-xs text-gray-500">{module.category} • {module.level}</p>
									</div>
									<div class="badge bg-green-100 text-green-800">Completed</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}

			{#if progress.completedModules?.length === 0 && progress.inProgressModules?.length === 0}
				<div class="my-8 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
					<h3 class="mb-2 text-xl font-semibold">No Modules Started Yet</h3>
					<p class="mb-4">Begin your learning journey by exploring our modules.</p>
					<a href="/module" class="btn primary">Browse Modules</a>
				</div>
			{/if}
		</div>
	{:else if activeTab === 'badges'}
		<BadgesSection userId={user.id} />
	{:else if activeTab === 'statistics'}
		<Statistics weekData={data.activityStats} />
	{/if}
</div>
