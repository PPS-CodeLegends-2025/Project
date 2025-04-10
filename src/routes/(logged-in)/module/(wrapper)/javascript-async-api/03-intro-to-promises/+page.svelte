<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Introduction to Promises'
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
		<h2 class="mb-4 text-2xl font-bold text-indigo-600">Introduction to Promises</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				Promises were introduced in ES6 (ECMAScript 2015) as a cleaner way to handle asynchronous
				operations and avoid Callback Hell. A Promise is an object representing the eventual
				completion (or failure) of an asynchronous operation and its resulting value.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">The Promise Object</h3>
			<p class="text-gray-700">
				A Promise acts as a placeholder for a value that is not necessarily known when the promise
				is created. It allows you to associate handlers with an asynchronous action's eventual
				success value or failure reason.
			</p>
			<h4 class="mt-4 font-medium text-indigo-700">Promise States</h4>
			<p class="text-gray-700">A Promise is always in one of three states:</p>
			<ul class="list-disc space-y-1 pl-5 text-gray-700">
				<li>
					<strong class="font-medium">Pending:</strong> Initial state, neither fulfilled nor rejected.
					The operation has not completed yet.
				</li>
				<li>
					<strong class="font-medium">Fulfilled (Resolved):</strong> The operation completed successfully,
					and the promise now has a resulting value.
				</li>
				<li>
					<strong class="font-medium">Rejected:</strong> The operation failed, and the promise has a
					reason for the failure (an error).
				</li>
			</ul>
			<p class="mt-2 text-gray-700">
				Once a promise is fulfilled or rejected, it is settled and its state will not change again.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">
				Creating a Promise (Less Common in Practice)
			</h3>
			<p class="text-gray-700">
				While you'll mostly *consume* promises returned by browser APIs (like `Workspace`), you can
				create one using the `Promise` constructor. It takes an "executor" function with two
				arguments: `resolve` and `reject`.
			</p>
			<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
const myPromise = new Promise((resolve, reject) => {
  console.log('Executor function started...');
  // Simulate an asynchronous operation
  setTimeout(() => {
    const success = Math.random() > 0.3; // Simulate success/failure
    if (success) {
      console.log('Operation successful!');
      resolve('Here is the data!'); // Fulfill the promise with a value
    } else {
      console.log('Operation failed!');
      reject(new Error('Something went wrong!')); // Reject the promise with an error
    }
  }, 1500);
});

console.log('Promise created (currently pending)');`}</pre>
			<p class="mt-2 text-gray-700">
				The `resolve` function is called when the async task succeeds, passing the result. The
				`reject` function is called when it fails, passing an error object.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">
				Consuming Promises: `.then()` and `.catch()`
			</h3>
			<p class="text-gray-700">
				The primary way to interact with a promise is using its `.then()` and `.catch()` methods.
				These methods register callbacks to receive either the promise's eventual value or the
				reason why it cannot be fulfilled.
			</p>
			<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
				<h4 class="font-medium text-indigo-700">`.then(onFulfilled, onRejected)`</h4>
				<p class="mt-2 text-sm text-gray-600">
					Takes up to two arguments: a callback for success (fulfillment) and an optional callback
					for failure (rejection).
				</p>
				<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
myPromise.then(
  (data) => { // onFulfilled: Called if promise resolves
    console.log('Success:', data);
  },
  (error) => { // onRejected: Called if promise rejects
    console.error('Failure:', error.message);
  }
);`}</pre>
			</div>
			<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
				<h4 class="font-medium text-indigo-700">`.catch(onRejected)`</h4>
				<p class="mt-2 text-sm text-gray-600">
					A more common and readable way to handle errors. It's syntactic sugar for `.then(null,
					onRejected)`.
				</p>
				<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
myPromise
  .then((data) => { // Handle success
    console.log('Success:', data);
    // Potentially do something that might cause another error
    // return processedData;
  })
  .catch((error) => { // Handle any rejection from the promise or errors in .then()
    console.error('Caught an error:', error.message);
  });`}</pre>
				<p class="mt-2 text-sm text-gray-600">
					Using `.catch()` is generally preferred for error handling.
				</p>
			</div>
			<p class="mt-4 text-gray-700">
				Promises provide a much cleaner structure for managing asynchronous operations compared to
				nested callbacks.
			</p>
		</div>
	</div>
</ModuleTask>
