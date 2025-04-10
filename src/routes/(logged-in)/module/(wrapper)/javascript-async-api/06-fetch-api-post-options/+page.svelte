<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Fetch API: POST Requests & Options'
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
		<h2 class="mb-4 text-2xl font-bold text-indigo-600">Fetch API: Options and POST Requests</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				While simple GET requests only need a URL, other HTTP methods (like POST, PUT, DELETE) or
				requests needing specific headers require passing an <strong class="font-medium"
					>options object</strong
				> as the second argument to `Workspace()`.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">The `Workspace` Options Object</h3>
			<p class="text-gray-700">
				This object allows you to configure various aspects of the request. Some common properties
				include:
			</p>
			<ul class="list-disc space-y-1 pl-5 text-gray-700">
				<li>
					`method`: The HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE'). Defaults to 'GET'.
				</li>
				<li>
					`headers`: An object or `Headers` object containing request headers (e.g., 'Content-Type',
					'Authorization').
				</li>
				<li>
					`body`: The request body. Must match the `Content-Type` header. For JSON, use
					`JSON.stringify()` to convert your data object into a JSON string.
				</li>
				<li>`mode`: Request mode (e.g., 'cors', 'no-cors', 'same-origin').</li>
				<li>`cache`: Caching behavior (e.g., 'default', 'no-cache', 'reload').</li>
				<li>... and others.</li>
			</ul>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">
				Example: Making a POST Request with JSON Data
			</h3>
			<p class="text-gray-700">
				Let's send some data to an API endpoint using the POST method, specifying that we're sending
				JSON.
			</p>
			<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // API endpoint for creating posts

// The data we want to send
const newPostData = {
  title: 'My New Post Title',
  body: 'This is the content of my new post.',
  userId: 1
};

// Fetch options configuration
const fetchOptions = {
  method: 'POST', // Specify the HTTP method
  headers: {
    // Tell the server we're sending JSON data
    'Content-Type': 'application/json; charset=UTF-8',
    // Add other headers if needed, like Authorization
    // 'Authorization': 'Bearer YOUR_API_TOKEN'
  },
  // Convert the JavaScript object to a JSON string for the body
  body: JSON.stringify(newPostData)
};

console.log('Sending POST request...');

fetch(apiUrl, fetchOptions) // Pass URL and options object
  .then(response => {
    if (!response.ok) {
      // Check status code for potential errors (e.g., 400 Bad Request, 500 Server Error)
      // You might want more specific error handling based on status
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    // Often, a POST request returns the created resource or a confirmation
    return response.json(); // Parse the response body as JSON
  })
  .then(createdPost => {
    console.log('Successfully created post:', createdPost);
    // Example output from JSONPlaceholder might include an 'id' for the new post
    // { title: 'My New Post Title', body: '...', userId: 1, id: 101 }
  })
  .catch(error => {
    console.error('Error sending POST request:', error);
  });`}</pre>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Handling Different Response Types</h3>
			<p class="text-gray-700">
				Remember that the server might respond with different content types or just a status code
				(e.g., a 204 No Content for a successful DELETE). You might need to use `response.text()`
				instead of `response.json()`, or sometimes you might only need to check `response.ok`
				without reading the body. Always check the API documentation for expected request formats
				and response details.
			</p>
		</div>

		<p class="text-lg text-gray-700">
			The options object makes `Workspace()` a versatile tool for interacting with APIs using
			various HTTP methods and configurations.
		</p>
	</div>
</ModuleTask>
