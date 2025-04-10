<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Async/Await Syntax'
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
		<h2 class="mb-4 text-2xl font-bold text-indigo-600">Async/Await: Cleaner Asynchronous Code</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				Introduced in ES2017 (ES8), `async` and `await` are special keywords that provide "syntactic
				sugar" on top of Promises, making asynchronous code look and behave a bit more like
				synchronous code. This often improves readability and simplifies error handling.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">The `async` Keyword</h3>
			<p class="text-gray-700">
				Placing `async` before a function declaration turns it into an <strong class="font-medium"
					>async function</strong
				>.
			</p>
			<ul class="list-disc space-y-1 pl-5 text-gray-700">
				<li>An `async` function always implicitly returns a Promise.</li>
				<li>
					If the function explicitly returns a value, that value will be the resolved value of the
					promise.
				</li>
				<li>
					If the function throws an error, the returned promise will be rejected with that error.
				</li>
			</ul>
			<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
async function myAsyncFunction() {
  console.log('Inside async function');
  return 'Hello from async!'; // This promise will resolve with 'Hello from async!'
}

async function anotherAsync() {
  throw new Error('Something failed'); // This promise will reject with the error
}

myAsyncFunction().then(value => console.log(value)); // Output: Hello from async!
anotherAsync().catch(error => console.error(error.message)); // Output: Something failed`}</pre>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">The `await` Keyword</h3>
			<p class="text-gray-700">
				The `await` keyword can <strong class="font-medium"
					>only be used inside an `async` function</strong
				>. It makes JavaScript wait until a Promise settles (resolves or rejects).
			</p>
			<ul class="list-disc space-y-1 pl-5 text-gray-700">
				<li>If the Promise fulfills, `await` returns the resolved value.</li>
				<li>If the Promise rejects, `await` throws the rejection reason (error).</li>
			</ul>
			<p class="mt-2 text-gray-700">
				This allows you to write asynchronous code that reads almost like synchronous code, avoiding
				chains of `.then()`.
			</p>
			<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
function resolveAfter(ms, value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), ms);
  });
}

async function runSequence() {
  console.log('Starting sequence...');
  const result1 = await resolveAfter(1000, 'First step done'); // Wait 1s
  console.log(result1);
  const result2 = await resolveAfter(1000, 'Second step done'); // Wait another 1s
  console.log(result2);
  return 'Sequence complete!';
}

runSequence().then(finalMsg => console.log(finalMsg));
// Output:
// Starting sequence...
// (after 1s) First step done
// (after 1s) Second step done
// Sequence complete!`}</pre>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Error Handling with `try...catch`</h3>
			<p class="text-gray-700">
				Since `await` throws an error when a promise rejects, you can use standard synchronous
				`try...catch` blocks for error handling within `async` functions, which is often more
				intuitive than `.catch()`.
			</p>
			<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
async function fetchDataWithAsyncAwait(url) {
  console.log(\`Workspaceing data from \${url}...\`);
  try {
    const response = await fetch(url); // Wait for the fetch promise

    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }

    const data = await response.json(); // Wait for the .json() promise
    console.log('Data fetched successfully:', data);
    return data;

  } catch (error) {
    console.error('Failed to fetch data:', error);
    // Handle the error appropriately (e.g., show a message to the user)
    // return null; // Or re-throw if needed
  } finally {
      console.log('Fetch attempt finished.'); // Runs regardless of success/error
  }
}

// Example usage:
fetchDataWithAsyncAwait('https://jsonplaceholder.typicode.com/posts/1');
fetchDataWithAsyncAwait('https://jsonplaceholder.typicode.com/invalid-url'); // Example of failure
`}</pre>
		</div>
		<p class="text-lg text-gray-700">
			`async`/`await` significantly improves the readability and maintainability of asynchronous
			JavaScript code, especially when dealing with multiple sequential asynchronous steps. It's the
			modern standard for handling Promises.
		</p>
	</div>
</ModuleTask>
