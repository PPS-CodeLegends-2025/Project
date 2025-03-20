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
	<h1 class="text-3xl font-bold mb-6">Welcome to CodeLegends</h1>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
		<div class="card bg-white p-6 rounded-lg shadow">
			<h2 class="text-xl font-semibold mb-4">Your Progress</h2>
			<p>Current level: {count}</p>
			<div class="progress-bar bg-gray-200 rounded-full mt-2">
				<div class="progress bg-blue-500 rounded-full h-2" style="width: {Math.min(count * 10, 100)}%"></div>
			</div>
		</div>
		<div class="card bg-white p-6 rounded-lg shadow">
			<h2 class="text-xl font-semibold mb-4">Next Challenge</h2>
			<p>Complete {count + 1} exercises to advance</p>
			<button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4" onclick={increment}>
				Start Challenge
			</button>
		</div>
	</div>
	
	<div class="bg-white p-6 rounded-lg shadow">
		<h2 class="text-xl font-semibold mb-4">Available Modules</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div class="border rounded p-4 hover:shadow-md transition">
				<h3 class="font-medium mb-2">JavaScript Basics</h3>
				<p class="text-sm text-gray-600 mb-4">Learn the fundamentals of JavaScript programming</p>
				<button 
					class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm"
					onclick={() => goto('/module/javascript-basics')}
				>
					Start Learning
				</button>
			</div>
			<div class="border rounded p-4 hover:shadow-md transition">
				<h3 class="font-medium mb-2">Svelte Essentials</h3>
				<p class="text-sm text-gray-600 mb-4">Master the basics of Svelte framework</p>
				<button 
					class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm"
					onclick={() => goto('/module/svelte-essentials')}
				>
					Start Learning
				</button>
			</div>
		</div>
		
		<button 
			class="mt-6 border border-blue-500 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded"
			onclick={goToModules}
		>
			View All Modules
		</button>
	</div>
</div>

<style>
	p {
		color: red;
	}

	button {
		background-color: blue;
		color: white;
	}
</style>
