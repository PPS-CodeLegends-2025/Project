<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'DOM Navigation'
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
		<h2 class="mb-4 text-2xl font-bold text-indigo-600">Navigating the DOM Tree</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				Besides direct search, you can move between DOM elements using their relationships: finding
				parent elements, child elements, or sibling elements.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Properties for Navigation</h3>
			<p class="text-gray-700">
				Assume we have a selected element stored in the variable `element`.
			</p>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">parentNode / parentElement</h4>
					<p class="mt-2 text-sm text-gray-600">
						Access the parent node (`parentNode`) or parent element (`parentElement`).
						`parentElement` is typically used.
					</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">let parent = element.parentElement;</pre>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">children</h4>
					<p class="mt-2 text-sm text-gray-600">
						A collection (`HTMLCollection`) of only child *elements* (excludes text nodes and
						comments).
					</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">let childElements = element.children;</pre>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">childNodes</h4>
					<p class="mt-2 text-sm text-gray-600">
						A collection (`NodeList`) of all child *nodes*, including text nodes and comments.
					</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">let allChildNodes = element.childNodes;</pre>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">firstElementChild / lastElementChild</h4>
					<p class="mt-2 text-sm text-gray-600">Access the first / last child *element*.</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">let firstChild = element.firstElementChild;</pre>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">previousElementSibling / nextElementSibling</h4>
					<p class="mt-2 text-sm text-gray-600">
						Access the previous / next sibling *element* at the same hierarchy level.
					</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">let nextSibling = element.nextElementSibling;</pre>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">
						firstChild / lastChild / previousSibling / nextSibling
					</h4>
					<p class="mt-2 text-sm text-gray-600">
						Similar properties, but work with *nodes* (including text and comments). Usually less
						convenient.
					</p>
				</div>
			</div>
		</div>

		<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
			<h4 class="font-medium text-indigo-700">Example Usage</h4>
			<p class="mt-2 text-gray-700">
				Find the parent `div` of a button with id `myButton` and add a class to it:
			</p>
			<pre
				class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`let button = document.getElementById('myButton');
if (button && button.parentElement) {
    button.parentElement.classList.add('highlight');
}`}
            </pre>
		</div>

		<p class="text-lg text-gray-700">
			DOM navigation allows flexible interaction with the page structure, even if you don't know the
			exact IDs or classes of all related elements.
		</p>
	</div>
</ModuleTask>
