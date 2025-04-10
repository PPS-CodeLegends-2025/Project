<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Fetch API: GET Requests'
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
		<h2 class="mb-4 text-2xl font-bold text-indigo-600">Fetching Data with the Fetch API (GET)</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				The <strong class="font-medium">Fetch API</strong> is the modern standard way for JavaScript
				to make network requests (e.g., to get data from a server or API). It uses Promises, making asynchronous
				network operations much cleaner than older methods like `XMLHttpRequest`.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Basic GET Request</h3>
			<p class="text-gray-700">
				Making a simple GET request (the default method for fetching resources) is straightforward.
				You call `Workspace()` with the URL of the resource you want to retrieve.
			</p>
			<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1'; // Example API URL

console.log('Starting fetch request...');

fetch(apiUrl) // fetch returns a Promise
  .then(response => {
    // This first .then() receives the Response object
    console.log('Received response object:', response);
    // Check if the request was successful (status code 200-299)
    if (!response.ok) {
      // If not OK, throw an error to be caught by .catch()
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    // To get the actual data (e.g., JSON), we need to call another async method
    return response.json(); // .json() also returns a Promise
  })
  .then(data => {
    // This second .then() receives the parsed JSON data
    console.log('Data received:', data);
    // Now you can use the data, e.g., display it on the page
    // document.getElementById('title').textContent = data.title;
  })
  .catch(error => {
    // This .catch() handles errors from fetch itself (network errors)
    // or errors thrown manually (like !response.ok)
    console.error('Fetch error:', error);
  });

console.log('Fetch request initiated (code continues execution)');`}</pre>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Understanding the `Response` Object</h3>
			<p class="text-gray-700">
				The first `.then()` callback after `Workspace()` doesn't receive the data directly. It
				receives a <strong class="font-medium">`Response`</strong> object, which represents the entire
				HTTP response. Key properties and methods include:
			</p>
			<ul class="list-disc space-y-1 pl-5 text-gray-700">
				<li>
					`response.ok`: Boolean, `true` if the HTTP status code is in the 200-299 range (success).
				</li>
				<li>`response.status`: The numeric HTTP status code (e.g., 200, 404, 500).</li>
				<li>`response.statusText`: The status message (e.g., "OK", "Not Found").</li>
				<li>`response.headers`: A `Headers` object containing response headers.</li>
				<li>
					`response.json()`: Reads the response body and parses it as JSON. Returns a Promise
					resolving with the parsed data.
				</li>
				<li>
					`response.text()`: Reads the response body as plain text. Returns a Promise resolving with
					the text.
				</li>
				<li>
					`response.blob()`: Reads the response body as a Blob (binary data). Returns a Promise.
				</li>
				<li>... and others.</li>
			</ul>
			<div class="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4">
				<h4 class="font-medium text-yellow-800">Important: Error Handling</h4>
				<p class="mt-2 text-sm text-yellow-700">
					`Workspace()` only rejects its promise on *network errors* (e.g., DNS lookup failure, no
					internet connection). It does <strong class="font-medium">not</strong> automatically
					reject on HTTP error statuses like 404 (Not Found) or 500 (Server Error). You
					<strong class="font-medium">must</strong> check `response.ok` or `response.status` manually
					and throw an error if needed, as shown in the example.
				</p>
			</div>
		</div>
		<p class="text-lg text-gray-700">
			Using `Workspace` with `.then()` and `.catch()` provides a robust way to retrieve data from
			APIs for use in your web pages.
		</p>
	</div>
</ModuleTask>
