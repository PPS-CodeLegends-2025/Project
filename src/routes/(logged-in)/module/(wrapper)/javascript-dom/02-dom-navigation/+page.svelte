<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';
	const sectionData: Section = {
		title: 'Selecting Elements'
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
		<h2 class="mb-4 text-2xl font-bold text-indigo-600">Selecting Elements in the DOM</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				To interact with elements on the page (change text, styles, add event handlers), you first
				need to find and "select" them in the DOM tree. JavaScript provides several methods for
				this.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Core Selection Methods</h3>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">getElementById('id')</h4>
					<p class="mt-2 text-sm text-gray-600">
						Finds an element by its unique `id` attribute. Returns a single element or `null`.
					</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">let titleElement = document.getElementById('main-title');</pre>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">getElementsByTagName('tag')</h4>
					<p class="mt-2 text-sm text-gray-600">
						Finds all elements with the specified tag name. Returns a "live" `HTMLCollection`.
					</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">let allParagraphs = document.getElementsByTagName('p');</pre>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">getElementsByClassName('class')</h4>
					<p class="mt-2 text-sm text-gray-600">
						Finds all elements with the specified class name. Returns a "live" `HTMLCollection`.
					</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">let notes = document.getElementsByClassName('note');</pre>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">querySelector('selector')</h4>
					<p class="mt-2 text-sm text-gray-600">
						Finds the *first* element matching the CSS selector. Returns a single element or `null`.
						Very powerful.
					</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">let firstItem = document.querySelector('ul > li:first-child');</pre>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">querySelectorAll('selector')</h4>
					<p class="mt-2 text-sm text-gray-600">
						Finds *all* elements matching the CSS selector. Returns a static `NodeList`.
					</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">let allListItems = document.querySelectorAll('.my-list .item');</pre>
				</div>
			</div>
		</div>

		<div class="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4">
			<h4 class="font-medium text-yellow-800">Recommendation</h4>
			<p class="mt-2 text-sm text-yellow-700">
				The `querySelector` and `querySelectorAll` methods are the most flexible and recommended, as
				they allow using any CSS selector. `getElementById` is useful for accessing unique elements.
				The `getElementsBy*` methods return "live" collections, which can sometimes lead to
				unexpected behavior, so they are used less often.
			</p>
		</div>

		<p class="text-lg text-gray-700">
			Once an element or collection of elements is selected, you can proceed to navigate or
			manipulate them.
		</p>
	</div>
</ModuleTask>
