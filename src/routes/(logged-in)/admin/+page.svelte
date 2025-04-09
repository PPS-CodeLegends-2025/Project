<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();

	onMount(async () => {
		const Plotly = await import('plotly.js-dist-min');

		Plotly.newPlot(
			'userGrowthChart',
			[
				{
					x: data.userGrowth.map((item) =>
						new Date(item.date).toLocaleDateString('en-GB', { month: 'short', day: '2-digit' })
					),
					y: data.userGrowth.map((item) => item.count),
					type: 'scatter',
					mode: 'lines+markers',
					name: 'New Users',
					line: { color: '#4f46e5' }
				}
			],
			{
				margin: { t: 20, b: 40, l: 40, r: 20 },
				height: 300
			}
		);

		Plotly.newPlot(
			'moduleCompletionChart',
			[
				{
					x: data.moduleStats.map((item) => item.name),
					y: data.moduleStats.map((item) => item.completionRate),
					type: 'bar',
					marker: {
						color: data.moduleStats.map((item) => {
							if (item.completionRate > 70) return '#10b981';
							if (item.completionRate > 40) return '#f59e0b';
							return '#ef4444';
						})
					}
				}
			],
			{
				margin: { t: 20, b: 100, l: 40, r: 20 },
				height: 300,
				xaxis: { tickangle: -45 }
			}
		);

		Plotly.newPlot(
			'challengesCompletionChart',
			[
				{
					values: data.challengeStats.map((item) => item.count),
					labels: data.challengeStats.map((item) => item.difficulty),
					type: 'pie',
					marker: {
						colors: ['#10b981', '#f59e0b', '#ef4444']
					}
				}
			],
			{
				margin: { t: 20, b: 40, l: 40, r: 20 },
				height: 300
			}
		);
	});
</script>

<svelte:head>
	<title>Admin Dashboard | CodeLegends</title>
</svelte:head>

<div class="container mx-auto p-6">
	<header class="mb-8">
		<h1 class="text-3xl font-bold">Admin Dashboard</h1>
		<p class="text-gray-600">Manage your platform and view statistics</p>
	</header>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
		<div class="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
			<h2 class="mb-4 text-lg font-semibold">Total Users</h2>
			<p class="text-4xl font-bold text-indigo-600">{data.stats.totalUsers}</p>
			<div class="mt-2 text-sm text-gray-500">
				<span class="text-green-500">↑ {data.stats.newUsersLastWeek}</span> new this week
			</div>
		</div>
		<div class="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
			<h2 class="mb-4 text-lg font-semibold">Active Users</h2>
			<p class="text-4xl font-bold text-indigo-600">{data.stats.activeUsers}</p>
			<div class="mt-2 text-sm text-gray-500">
				<span>{data.stats.activeUserPercentage}%</span> of total users
			</div>
		</div>
		<div class="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
			<h2 class="mb-4 text-lg font-semibold">Challenges Completed</h2>
			<p class="text-4xl font-bold text-indigo-600">{data.stats.totalChallengesCompleted}</p>
			<div class="mt-2 text-sm text-gray-500">
				Avg {data.stats.avgChallengesPerUser} per active user
			</div>
		</div>
	</div>

	<div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
		<div class="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
			<h2 class="mb-4 text-lg font-semibold">User Growth</h2>
			<div id="userGrowthChart" class="h-[300px]"></div>
		</div>
		<div class="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
			<h2 class="mb-4 text-lg font-semibold">Challenge Completions by Difficulty</h2>
			<div id="challengesCompletionChart" class="h-[300px]"></div>
		</div>
	</div>

	<div class="mt-8">
		<div class="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
			<h2 class="mb-4 text-lg font-semibold">Module Completion Rates</h2>
			<div id="moduleCompletionChart" class="h-[300px]"></div>
		</div>
	</div>
</div>
