<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const users = data.users;

	function getDefaultAvatar(username: string): string {
		const seed = username || 'User';
		return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}`;
	}
</script>

<svelte:head>
	<title>Leaderboard | CodeLegends</title>
</svelte:head>

<div class="mx-auto max-w-4xl p-8">
	<header class="mb-8 text-center">
		<h1 class="mb-2 text-4xl font-bold">Leaderboard</h1>
		<p>Top 10 learners ranked by level and XP</p>
	</header>

	<div class="overflow-hidden rounded-xl bg-white py-1.5 shadow-lg">
		<table class="w-full table-auto text-left text-sm text-gray-700">
			<thead class=" bg-gray-50 text-xs tracking-wider text-gray-500 uppercase">
				<tr class="px-6">
					<th class="px-4 py-3">#</th>
					<th class="px-4 py-3">User</th>
					<th class="px-4 py-3">Level</th>
					<th class="px-4 py-3">XP</th>
					<th class="px-4 py-3">Score</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-100">
				{#each users as user, i (i)}
					<tr class="transition hover:bg-gray-50">
						<td class="px-4 py-3 font-medium">{i + 1}</td>
						<td class="flex items-center gap-3 px-4 py-3">
							<img
								src={getDefaultAvatar(user.username)}
								alt="User avatar"
								class="h-8 w-8 rounded-full"
							/>
							<span>{user.username}</span>
						</td>
						<td class="px-4 py-3">{user.level}</td>
						<td class="px-4 py-3">{user.xp}</td>
						<td class="px-4 py-3 font-semibold">{user.level * 1000 + user.xp}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
