<script lang="ts">
	import type { PageProps } from './$types';

	let activeTab = $state('overview');

	let { data }: PageProps = $props();

	let user = {
		username: data.user.username,
		fullName: 'John Doe',
		bio: 'Frontend developer passionate about web technologies',
		avatar: '/images/avatar.png',
		level: 5,
		xp: 350,
		nextLevelXp: 500,
		joinDate: 'January 15, 2023',
		stats: {
			lessonsCompleted: 42,
			challengesSolved: 18,
			daysActive: 27
		}
	};
</script>

<div class="mx-auto max-w-[900px] p-8">
	<div class="mb-8 flex gap-8">
		<div class="relative">
			<img
				src={user.avatar}
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
			<h2 class="my-1 mb-4 text-xl font-normal text-gray-600">{user.fullName}</h2>
			<p class="mb-4">{user.bio}</p>

			<div class="mb-4">
				<div class="mb-1 h-2 overflow-hidden rounded-lg bg-gray-100">
					<div
						class="h-full bg-green-500"
						style="width: {(user.xp / user.nextLevelXp) * 100}%"
					></div>
				</div>
				<div class="text-xs text-gray-600">{user.xp} / {user.nextLevelXp} XP</div>
			</div>

			<p class="text-xs text-gray-600">Member since {user.joinDate}</p>
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
				activeTab === 'achievements' ? 'border-green-500 font-bold' : 'border-transparent'
			}`}
			onclick={() => (activeTab = 'achievements')}
		>
			Achievements
		</button>
		<button
			class={`cursor-pointer border-0 border-b-2 bg-transparent px-6 py-3 text-base ${
				activeTab === 'settings' ? 'border-green-500 font-bold' : 'border-transparent'
			}`}
			onclick={() => (activeTab = 'settings')}
		>
			Settings
		</button>
	</div>

	<div>
		{#if activeTab === 'overview'}
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<div class="rounded-lg bg-gray-50 p-6 text-center">
					<h3 class="mt-0 mb-2 text-base text-gray-600">Lessons</h3>
					<div class="text-4xl font-bold text-gray-800">{user.stats.lessonsCompleted}</div>
				</div>
				<div class="rounded-lg bg-gray-50 p-6 text-center">
					<h3 class="mt-0 mb-2 text-base text-gray-600">Challenges</h3>
					<div class="text-4xl font-bold text-gray-800">{user.stats.challengesSolved}</div>
				</div>
				<div class="rounded-lg bg-gray-50 p-6 text-center">
					<h3 class="mt-0 mb-2 text-base text-gray-600">Active Days</h3>
					<div class="text-4xl font-bold text-gray-800">{user.stats.daysActive}</div>
				</div>
			</div>
		{/if}
	</div>
</div>
