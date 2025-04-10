<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Promise Chaining and More'
	};

	let { data }: PageProps = $props();

	const sectionIndex = data.section.index;
	const userId = data.user.id;
	const moduleId = data.module.data.url;

	const taskProps = {
		section: { ...sectionData, ...data.section.meta },
		nextSection: data.module.sections[sectionIndex + 1],
		prevSection: data.module.sections[sectionIndex - 1],
		completed: data.section.completed,
		completedNow: true,
		module: data.module.data,
		currentSectionIndex: sectionIndex,
		totalSections: data.module.sections.length,
		onMarkAsCompleted: async () => {
			try {
				await modules.markSectionCompleted(userId, moduleId, sectionIndex);
			} catch (error) {
				console.error('Failed to mark as completed:', error);
			}
		}
	};
</script>

<ModuleTask {...taskProps}>
	<div class="space-y-6">
		<h2 class="mb-4 text-2xl font-bold text-indigo-600">Promise Chaining and Advanced Methods</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				Promises become even more powerful when handling sequences of asynchronous operations
				(chaining) or managing multiple promises concurrently.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Promise Chaining</h3>
			<p class="text-gray-700">
				The `.then()` method itself returns a new Promise. This allows you to chain `.then()` calls
				to execute asynchronous operations sequentially. The value returned from one `.then()`
				callback becomes the input for the next `.then()`.
			</p>
			<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
function stepOne() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(10), 500); // Resolves with 10 after 0.5s
  });
}

function stepTwo(value) {
  return new Promise((resolve) => {
    console.log('Received from step one:', value);
    setTimeout(() => resolve(value * 2), 500); // Resolves with 20 after 0.5s
  });
}

function stepThree(value) {
   return new Promise((resolve) => {
    console.log('Received from step two:', value);
    setTimeout(() => resolve(value + 5), 500); // Resolves with 25 after 0.5s
  });
}

console.log('Starting chain...');
stepOne()
  .then(stepTwo) // Pass the result of stepOne to stepTwo
  .then(stepThree) // Pass the result of stepTwo to stepThree
  .then((finalResult) => {
    console.log('Final result:', finalResult); // Output: 25
  })
  .catch((error) => {
    console.error('Error somewhere in the chain:', error); // Handles error from any step
  });`}</pre>
			<p class="mt-2 text-gray-700">
				If a step returns a value directly (not a Promise), it's implicitly wrapped in a resolved
				Promise for the next `.then()`. If any step throws an error or returns a rejected Promise,
				the chain jumps to the nearest `.catch()` handler. This avoids the "pyramid of doom" seen
				with callbacks.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">`.finally()`</h3>
			<p class="text-gray-700">
				The `.finally()` method registers a callback that executes when the promise is settled
				(either fulfilled or rejected). It's useful for cleanup code that should run regardless of
				the outcome (e.g., hiding a loading spinner).
			</p>
			<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
fetchData()
  .then(data => { console.log('Data received'); })
  .catch(error => { console.error('Error occurred'); })
  .finally(() => {
    console.log('Operation finished (finally block executed)');
    // hideLoadingSpinner();
  });`}</pre>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Static Promise Methods</h3>
			<p class="text-gray-700">
				The `Promise` object also provides static methods for managing multiple promises:
			</p>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">Promise.all(iterable)</h4>
					<p class="mt-2 text-sm text-gray-600">
						Takes an iterable (e.g., an array) of promises. Returns a new promise that fulfills when
						*all* promises in the iterable fulfill. The result is an array of the fulfillment values
						(in the same order). If *any* promise rejects, `Promise.all` immediately rejects with
						that reason.
					</p>
					<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-1 text-xs">{`
Promise.all([promise1, promise2, promise3])
  .then(results => console.log('All done:', results)) // results is [res1, res2, res3]
  .catch(error => console.error('One failed:', error));`}</pre>
				</div>
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">Promise.race(iterable)</h4>
					<p class="mt-2 text-sm text-gray-600">
						Takes an iterable of promises. Returns a new promise that settles (fulfills or rejects)
						as soon as the *first* promise in the iterable settles. The result/error is that of the
						first settled promise.
					</p>
					<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-1 text-xs">{`
Promise.race([fastPromise, slowPromise])
  .then(result => console.log('First one finished:', result))
  .catch(error => console.error('First one failed:', error));`}</pre>
				</div>
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">
						Promise.resolve(value) / Promise.reject(reason)
					</h4>
					<p class="mt-2 text-sm text-gray-600">
						Returns a promise that is already resolved with the given value or rejected with the
						given reason. Useful for starting chains or in testing.
					</p>
					<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-1 text-xs">{`
Promise.resolve('Success value')
  .then(val => console.log(val));`}</pre>
				</div>
			</div>
		</div>
	</div>
</ModuleTask>
