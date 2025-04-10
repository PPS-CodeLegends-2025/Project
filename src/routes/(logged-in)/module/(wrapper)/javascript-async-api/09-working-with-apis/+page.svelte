<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Working with a Real API'
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
		<h2 class="mb-4 text-2xl font-bold text-indigo-600">
			Practical Example: Working with a Public API
		</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				Let's put together what we've learned about `async`/`await`, `Workspace`, JSON, and DOM
				manipulation to interact with a real, free public API: <strong class="font-medium"
					>JSONPlaceholder</strong
				>. We'll fetch a list of users and display their names on the page.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Goal</h3>
			<p class="text-gray-700">
				Fetch user data from https://jsonplaceholder.typicode.com/users and display each user's name
				in an unordered list (&lt;ul&gt;) on the HTML page.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">HTML Setup</h3>
			<p class="text-gray-700">
				First, ensure you have an element in your HTML to display the results, for example:
			</p>
			<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">
&lt;!-- Somewhere in your HTML body --&gt;
&lt;h2&gt;Users List&lt;/h2&gt;
&lt;ul id="user-list"&gt;
  &lt;li&gt;Loading users...&lt;/li&gt;
&lt;/ul&gt;</pre>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">
				JavaScript Implementation (using Async/Await)
			</h3>
			<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
// Select the list element where we'll display the names
const userListElement = document.getElementById('user-list');
const apiUrl = 'https://jsonplaceholder.typicode.com/users';

// Define an async function to fetch and display users
async function fetchAndDisplayUsers() {
  // Clear the initial "Loading..." message
  userListElement.innerHTML = '';
  try {
    console.log('Fetching users...');
    // Use await to wait for the fetch Promise
    const response = await fetch(apiUrl);

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }

    // Use await to wait for the response.json() Promise
    const users = await response.json(); // users will be an array of user objects
    console.log('Users data:', users);

    // Check if we actually got an array
    if (!Array.isArray(users)) {
        throw new Error('Received invalid data format from API');
    }

    // Process the users array and display names
    if (users.length === 0) {
        userListElement.innerHTML = '&lt;li&gt;No users found.&lt;/li&gt;';
    } else {
        users.forEach(user => {
          // Create a new list item element
          const listItem = document.createElement('li');
          // Set its text content to the user's name
          listItem.textContent = user.name;
          // Add the list item to the user list on the page
          userListElement.appendChild(listItem);
        });
    }

  } catch (error) {
    // Handle any errors during fetch or processing
    console.error('Error fetching or displaying users:', error);
    // Display an error message to the user
    userListElement.innerHTML = \`&lt;li style="color: red;"&gt;Failed to load users: \${error.message}&lt;/li&gt;\`;
  } finally {
      console.log('User fetch attempt finished.');
  }
}

// Call the async function to start the process
fetchAndDisplayUsers();

`}</pre>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Explanation</h3>
			<ul class="list-disc space-y-2 pl-5 text-gray-700">
				<li>We define an `async` function `WorkspaceAndDisplayUsers`.</li>
				<li>Inside a `try...catch` block for error handling:</li>
				<li>We `await fetch(apiUrl)` to get the `Response` object.</li>
				<li>We check `response.ok` and throw an error if needed.</li>
				<li>
					We `await response.json()` to parse the JSON data into a JavaScript array (`users`).
				</li>
				<li>We iterate through the `users` array using `forEach`.</li>
				<li>
					For each `user`, we use DOM manipulation (`createElement`, `textContent`, `appendChild`)
					to create a new `
				</li>
				<li>
					` element containing the user's name and add it to our `
					<ul>`.</ul>
				</li>
				<li>The `catch` block handles any errors and displays a message.</li>
				<li>The `finally` block logs a message when the operation finishes.</li>
				<li>
					Finally, we call `WorkspaceAndDisplayUsers()` to run the function when the script loads.
				</li>
			</ul>
		</div>

		<p class="text-lg text-gray-700">
			This example demonstrates the common workflow of fetching data from an API using modern
			asynchronous JavaScript techniques and updating the user interface based on the received data.
		</p>
	</div>
</ModuleTask>
