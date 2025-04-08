<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		weekData: {
			activeDate: Date;
			lessonsCompleted: number;
			challengesSolved: number;
		}[];
	}

	let { weekData }: Props = $props();

	onMount(async () => {
		const Plotly = await import('plotly.js-dist-min');
		const root = document.getElementById('chart')!;

		const displayedData = weekData.map((s) => ({
			...s,
			activeDate: new Date(s.activeDate).toLocaleDateString('en-GB', {
				month: 'short',
				day: '2-digit'
			})
		}));

		Plotly.newPlot(root, [
			{
				x: displayedData.map((s) => s.activeDate),
				y: displayedData.map((s) => s.lessonsCompleted),
				labels: displayedData.map((s) => s.activeDate),
				type: 'scatter',
				legendgroup: 'Lessons Completed',
				name: 'Lessons Completed',
				mode: 'lines+markers'
			},
			{
				x: displayedData.map((s) => s.activeDate),
				y: displayedData.map((s) => s.challengesSolved),
				labels: displayedData.map((s) => s.activeDate),
				type: 'scatter',
				legendgroup: 'Challenges Solved',
				name: 'Challenges Solved',
				mode: 'lines+markers'
			}
		]);
	});

	const totalActiveDays = weekData.filter(
		(s) => s.challengesSolved > 0 || s.lessonsCompleted > 0
	).length;
	const totalDays = weekData.length;

	const totalLessonsCompleted = weekData.reduce((acc, curr) => acc + curr.lessonsCompleted, 0);
	const totalChallengesSolved = weekData.reduce((acc, curr) => acc + curr.challengesSolved, 0);
</script>

<div class="flex flex-col gap-6">
	<h2 class="text-2xl font-bold text-gray-800">Weekly Statistics</h2>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<div class="rounded-lg border border-blue-100 bg-blue-50 p-4">
			<p class="text-sm text-gray-500">Active Days</p>
			<p class="text-2xl font-bold text-blue-600">
				{totalActiveDays}/{totalDays}
			</p>
		</div>
		<div class="rounded-lg border border-green-100 bg-green-50 p-4">
			<p class="text-sm text-gray-500">Lessons Completed</p>
			<p class="text-2xl font-bold text-green-600">{totalLessonsCompleted}</p>
		</div>
		<div class="rounded-lg border border-purple-100 bg-purple-50 p-4">
			<p class="text-sm text-gray-500">Challenges Solved</p>
			<p class="text-2xl font-bold text-purple-600">{totalChallengesSolved}</p>
		</div>
	</div>

	<h3 class="mt-2 text-xl font-semibold text-gray-700">Daily Breakdown</h3>
	<div id="chart" class="chart-container"></div>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 500px;
	}
</style>
