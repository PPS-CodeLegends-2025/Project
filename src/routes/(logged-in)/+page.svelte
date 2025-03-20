<script lang="ts">
	import { goto } from '$app/navigation';
	let count = $state(0);
	let array: Array<number> = $state([]);

	function increment() {
		count += 1;
		array.push(count);
	}

	function goToModules() {
		goto('/module');
	}
</script>

<div class="container mx-auto p-6">
	<h1 class="mb-6 text-3xl font-bold">Welcome to CodeLegends</h1>
	<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
		<div class="card rounded-lg border border-gray-100 bg-white p-6 shadow">
			<h2 class="mb-4 text-xl font-semibold">Your Progress</h2>
			<p>Current level: {count}</p>
			<div class="progress-bar mt-2 rounded-full bg-gray-200">
				<div
					class="progress h-2 rounded-full bg-blue-500"
					style="width: {Math.min(count * 10, 100)}%"
				></div>
			</div>
		</div>
		<div class="card rounded-lg border border-gray-100 bg-white p-6 shadow">
			<h2 class="mb-4 text-xl font-semibold">Next Challenge</h2>
			<p>Complete {count + 1} exercises to advance</p>
			<button class="btn primary mt-4" onclick={increment}> Start Challenge </button>
		</div>
	</div>

	<div class="rounded-lg border border-gray-100 bg-white p-6 shadow">
		<h2 class="mb-4 text-xl font-semibold">Available Modules</h2>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<div class="module-box">
				<h3 class="mb-2 font-medium">JavaScript Basics</h3>
				<p class="mb-4 text-sm text-gray-600">Learn the fundamentals of JavaScript programming</p>
				<div class="flex-1"></div>
				<a class="btn primary" href="/module/1"> Start Learning </a>
			</div>
			<div class="module-box">
				<h3 class="mb-2 font-medium">Svelte Essentials</h3>
				<p class="mb-4 text-sm text-gray-600">Master the basics of Svelte framework</p>
				<div class="flex-1"></div>
				<a class="btn primary" href="/module/2"> Start Learning </a>
			</div>
		</div>

		<button class="btn secondary mt-6" onclick={goToModules}> View All Modules </button>
	</div>
</div>

<style lang="postcss">
	@import 'tailwindcss/theme';

	.module-box {
		@apply rounded border border-gray-300 p-4 transition-all hover:shadow-md;
		@apply flex flex-col items-start justify-between;
	}
</style>
