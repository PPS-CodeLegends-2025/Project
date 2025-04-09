<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Manipulating Content and Attributes'
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
		<h2 class="mb-4 text-2xl font-bold text-indigo-600">Changing Element Content and Attributes</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				One of the key features of the DOM is dynamically changing what's displayed on the page. You
				can modify the text inside elements, their HTML structure, and their attributes.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Content Manipulation</h3>

			<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
				<h4 class="font-medium text-indigo-700">innerHTML</h4>
				<p class="mt-2 text-sm text-gray-600">
					Allows reading or overwriting the entire HTML content inside an element. Convenient for
					inserting ready-made HTML blocks.
				</p>
				<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">
let container = document.getElementById('content');
// Reading
console.log(container.innerHTML);
// Writing (overwrites all content)
container.innerHTML = '&lt;h2&gt;New Heading&lt;/h2&gt;&lt;p&gt;New text.&lt;/p&gt;';</pre>
				<p class="mt-2 text-xs font-semibold text-red-600">
					Warning: Using `innerHTML` with data from users or untrusted sources can lead to XSS
					(Cross-Site Scripting) attacks. Use with caution.
				</p>
			</div>

			<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
				<h4 class="font-medium text-indigo-700">textContent</h4>
				<p class="mt-2 text-sm text-gray-600">
					Allows reading or writing only the text content of an element and all its descendants,
					ignoring HTML tags. A safer way to work with text.
				</p>
				<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">
let title = document.getElementById('main-title');
// Reading
console.log(title.textContent);
// Writing (replaces content with plain text)
title.textContent = 'Updated Heading';</pre>
			</div>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Attribute Manipulation</h3>
			<p class="text-gray-700">
				HTML tag attributes (e.g., `src` in `&lt;img&gt;`, `href` in `&lt;a&gt;`, `class`, `id`,
				`data-*`) can also be changed.
			</p>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">getAttribute('name')</h4>
					<p class="mt-2 text-sm text-gray-600">Get the value of an attribute.</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">let link = document.querySelector('a');
let url = link.getAttribute('href');</pre>
				</div>
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">setAttribute('name', 'value')</h4>
					<p class="mt-2 text-sm text-gray-600">Set or change the value of an attribute.</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">let image = document.querySelector('img');
image.setAttribute('src', 'new-image.jpg');
image.setAttribute('alt', 'New description');</pre>
				</div>
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">hasAttribute('name')</h4>
					<p class="mt-2 text-sm text-gray-600">Check if an attribute exists.</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">if (image.hasAttribute('title')) {'{'}' /* ... */'}</pre>
				</div>
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">removeAttribute('name')</h4>
					<p class="mt-2 text-sm text-gray-600">Remove an attribute.</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">image.removeAttribute('title');</pre>
				</div>
			</div>
			<p class="mt-4 text-gray-700">
				Also, for many standard attributes (e.g., `id`, `src`, `href`, `value`, `className`), there
				is direct access via properties of the element object:
			</p>
			<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">
console.log(link.href); // Get href
image.src = 'another-image.png'; // Change src
let input = document.querySelector('input');
input.value = 'New value'; // Change input value
console.log(image.id); // Read id</pre>
		</div>
	</div>
</ModuleTask>
