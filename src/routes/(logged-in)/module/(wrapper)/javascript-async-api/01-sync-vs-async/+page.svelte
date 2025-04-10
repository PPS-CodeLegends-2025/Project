<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Synchronous vs. Asynchronous'
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
		<h2 class="mb-4 text-2xl font-bold text-indigo-600">Synchronous vs. Asynchronous JavaScript</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				JavaScript, by default, is a single-threaded, synchronous language. Understanding the
				difference between synchronous and asynchronous execution is crucial for handling operations
				that take time, like network requests or timers.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Synchronous Execution</h3>
			<p class="text-gray-700">
				In synchronous ("sync") code, tasks execute one after another, in the order they appear.
				Each task must finish before the next one starts.
			</p>
			<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
console.log('Task 1: Start');
// Simulate a long task (blocking)
for (let i = 0; i < 1e9; i++) {} // This freezes the browser!
console.log('Task 2: After long loop');
console.log('Task 3: End');
// Output: Task 1 -> Task 2 -> Task 3 (with a noticeable delay)`}</pre>
			<p class="mt-2 text-gray-700">
				If a synchronous task takes a long time (like a complex calculation or waiting for a network
				response), it <strong class="font-medium text-red-600">blocks</strong> the entire thread. The
				browser becomes unresponsive, and the user interface freezes. This is a bad user experience.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Asynchronous Execution</h3>
			<p class="text-gray-700">
				Asynchronous ("async") code allows tasks to start now and finish later, without blocking the
				main thread. JavaScript delegates these tasks to the browser's environment (Web APIs). When
				the task completes, its result is handled later, often using callbacks, Promises, or
				async/await.
			</p>
			<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
console.log('Task 1: Start');

// Delegate a task to finish later (non-blocking)
setTimeout(() => {
  console.log('Task 2: Inside setTimeout (executed later)');
}, 2000); // Wait 2 seconds

console.log('Task 3: End');
// Output: Task 1 -> Task 3 -> (approx 2 seconds later) -> Task 2`}</pre>
			<p class="mt-2 text-gray-700">
				Common asynchronous operations include: fetching data from a server, setting timers
				(`setTimeout`, `setInterval`), handling user events (like clicks, which are inherently
				async), reading files.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">The Event Loop (Conceptual)</h3>
			<p class="text-gray-700">
				JavaScript achieves non-blocking asynchronous behavior using an <strong
					class="font-medium text-indigo-700">Event Loop</strong
				>. Conceptually:
			</p>
			<ul class="list-disc space-y-2 pl-5 text-gray-700">
				<li>
					The <strong class="font-medium">Call Stack</strong> executes synchronous code line by line.
				</li>
				<li>
					When an async operation (like `setTimeout` or `Workspace`) is called, it's handed off to
					the <strong class="font-medium">Web API</strong> (browser environment).
				</li>
				<li>The Call Stack continues executing other synchronous code without waiting.</li>
				<li>
					When the Web API finishes its task (timer expires, data arrives), the associated callback
					function is placed in the <strong class="font-medium">Callback Queue</strong> (or Task Queue).
				</li>
				<li>
					The <strong class="font-medium">Event Loop</strong> constantly checks if the Call Stack is
					empty. If it is, it takes the first function from the Callback Queue and pushes it onto the
					Call Stack for execution.
				</li>
			</ul>
			<p class="mt-2 text-gray-700">
				This mechanism allows JavaScript to remain responsive while handling long-running tasks in
				the background.
			</p>
		</div>
	</div>
</ModuleTask>
