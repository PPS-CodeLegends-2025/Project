<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'What is an API?'
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
			What is an API? (Application Programming Interface)
		</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				API stands for <strong class="font-medium">Application Programming Interface</strong>. In
				simple terms, an API is a set of rules, protocols, and tools that allows different software
				applications to communicate with each other. It defines how software components should
				interact.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Analogy: A Restaurant Menu</h3>
			<p class="text-gray-700">Think of an API like a menu in a restaurant:</p>
			<ul class="list-disc space-y-2 pl-5 text-gray-700">
				<li>
					The <strong class="font-medium">Menu (API)</strong> lists the dishes (data/functionality) you
					can order and describes them. It defines how you make a request (order a specific dish).
				</li>
				<li>
					You, the <strong class="font-medium"
						>Customer (Client Application, e.g., your JavaScript code)</strong
					>, use the menu to place an order.
				</li>
				<li>
					The <strong class="font-medium">Waiter (API communication layer)</strong> takes your order
					according to the menu's rules.
				</li>
				<li>
					The <strong class="font-medium">Kitchen (Server/Service)</strong> prepares the dish (processes
					the request) based on the order.
				</li>
				<li>The Waiter brings the dish back to you (the API returns the requested data/result).</li>
			</ul>
			<p class="mt-2 text-gray-700">
				You don't need to know *how* the kitchen works, just how to use the menu (API) to get what
				you want.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Web APIs (Specifically REST APIs)</h3>
			<p class="text-gray-700">
				In web development, we often interact with <strong class="font-medium">Web APIs</strong>. A
				very common architectural style for web APIs is
				<strong class="font-medium">REST (Representational State Transfer)</strong>. REST APIs use
				standard HTTP methods to interact with resources.
			</p>
			<h4 class="mt-4 font-medium text-indigo-700">Key REST Concepts:</h4>
			<ul class="list-disc space-y-2 pl-5 text-gray-700">
				<li>
					<strong class="font-medium">Resources:</strong> Everything is a resource (e.g., a user, a post,
					a product). Each resource has a unique identifier (URI/URL). Example: `/users/123`, `/posts`.
				</li>
				<li>
					<strong class="font-medium">HTTP Methods (Verbs):</strong> Standard HTTP methods are used
					to perform actions on resources:
					<ul class="list-circle space-y-1 pl-5">
						<li>GET: Retrieve a resource (e.g., get user details, get list of posts).</li>
						<li>POST: Create a new resource (e.g., add a new user, create a new post).</li>
						<li>
							PUT / PATCH: Update an existing resource (e.g., change user email, edit post content).
						</li>
						<li>DELETE: Remove a resource (e.g., delete a user, delete a post).</li>
					</ul>
				</li>
				<li>
					<strong class="font-medium">Representations:</strong> Data is exchanged in a standard
					format, most commonly <strong class="font-medium">JSON</strong> (JavaScript Object Notation),
					but sometimes XML or others.
				</li>
				<li>
					<strong class="font-medium">Statelessness:</strong> Each request from the client to the server
					must contain all the information needed to understand and complete the request. The server
					doesn't store client state between requests.
				</li>
				<li>
					<strong class="font-medium">Standard HTTP Status Codes:</strong> Used to indicate the outcome
					of a request (e.g., `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal
					Server Error`).
				</li>
			</ul>
		</div>

		<p class="text-lg text-gray-700">
			Using APIs allows your frontend JavaScript code to fetch data from servers, send data to
			servers, and integrate with third-party services (like weather data, payment gateways, social
			media logins) without needing direct access to their internal databases or code.
		</p>
	</div>
</ModuleTask>
