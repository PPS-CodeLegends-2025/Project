<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Creating and Removing Elements'
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
		<h2 class="mb-4 text-2xl font-bold text-indigo-600">Creating and Removing DOM Elements</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				JavaScript allows not only modifying existing elements but also creating entirely new ones
				and adding them to the page, as well as removing unnecessary elements.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Creating New Elements</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">document.createElement('tag')</h4>
					<p class="mt-2 text-sm text-gray-600">
						Creates a new element node with the specified tag name. The element is created in memory
						but not yet added to the page.
					</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`let newDiv = document.createElement('div');
let newParagraph = document.createElement('p');`}</pre>
				</div>
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">document.createTextNode('text')</h4>
					<p class="mt-2 text-sm text-gray-600">
						Creates a new text node. This is needed to add text inside a created element safely
						(without `innerHTML`).
					</p>
					<pre
						class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">let textNode = document.createTextNode('Hello, world!');</pre>
				</div>
			</div>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Adding Elements to the Page</h3>
			<p class="text-gray-700">
				For a created element to appear on the page, it must be added to an existing DOM element.
			</p>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">parentElement.appendChild(newElement)</h4>
					<p class="mt-2 text-sm text-gray-600">
						Adds `newElement` as the last child element to `parentElement`.
					</p>
					<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
let container = document.getElementById('container');
let newDiv = document.createElement('div');
container.appendChild(newDiv); // Add div to the end of container`}</pre>
				</div>
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">
						parentElement.insertBefore(newElement, referenceElement)
					</h4>
					<p class="mt-2 text-sm text-gray-600">
						Inserts `newElement` into `parentElement` before `referenceElement` (which must be a
						child of `parentElement`).
					</p>
					<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
let list = document.getElementById('myList');
let newItem = document.createElement('li');
let firstItem = list.firstElementChild;
list.insertBefore(newItem, firstItem); // Insert before the first element</pre>`}
                </pre>
				</div>
			</div>
			<div class="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
				<h4 class="font-medium text-indigo-700">Example: Creating and Adding a List Item</h4>
				<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
// Find the list
let taskList = document.getElementById('tasks');

// Create a new <li> element
let newTask = document.createElement('li');

// Create a text node for the content
let taskText = document.createTextNode('Learn element creation');

// Add text to the <li>
newTask.appendChild(taskText);

// Add class to <li> (optional)
newTask.classList.add('task-item');

// Add the new <li> to the <ul> list
taskList.appendChild(newTask);`}</pre>
			</div>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Removing Elements</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">parentElement.removeChild(childElement)</h4>
					<p class="mt-2 text-sm text-gray-600">
						Removes childElement from parentElement. Requires knowing both the parent and child
						element.
					</p>
					<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
let itemToRemove = document.getElementById('item-3');
if (itemToRemove && itemToRemove.parentElement) {
  itemToRemove.parentElement.removeChild(itemToRemove);
}`}</pre>
				</div>
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">element.remove()</h4>
					<p class="mt-2 text-sm text-gray-600">
						A more modern and simpler way. Removes the element it's called on.
					</p>
					<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
let itemToRemove = document.getElementById('item-3');
if (itemToRemove) {
  itemToRemove.remove();
}`}</pre>
				</div>
			</div>
		</div>

		<p class="text-lg text-gray-700">
			The ability to create and remove elements is fundamental for building dynamic interfaces where
			content can change without reloading the page.
		</p>
	</div>
</ModuleTask>
