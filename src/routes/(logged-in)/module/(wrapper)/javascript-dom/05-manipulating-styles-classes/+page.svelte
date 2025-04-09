<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Manipulating Styles and Classes'
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
		<h2 class="mb-4 text-2xl font-bold text-indigo-600">Changing Styles and CSS Classes</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				JavaScript allows you to dynamically change the appearance of elements by controlling their
				CSS styles or CSS classes.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">
				Manipulating Inline Styles (`element.style`)
			</h3>
			<p class="text-gray-700">
				The `element.style` property provides access to the element's inline styles (those in the
				`style="..."` attribute). It allows setting or reading individual CSS properties.
			</p>
			<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
				<h4 class="font-medium text-indigo-700">Setting Styles</h4>
				<p class="mt-2 text-sm text-gray-600">
					CSS properties with hyphens are written in camelCase (e.g., `background-color` becomes
					`backgroundColor`).
				</p>
				<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
                
let box = document.getElementById('myBox');
box.style.color = 'white';
box.style.backgroundColor = 'blue';
box.style.width = '100px';
box.style.paddingTop = '10px'; // padding-top
box.style.display = 'none'; // Hide element`}</pre>
				<p class="mt-2 text-sm text-gray-600">
					To remove an inline style, you can assign an empty string `''` to it.
				</p>
				<pre
					class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">box.style.width = ''; // Remove width</pre>
			</div>
			<div class="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4">
				<h4 class="font-medium text-yellow-800">Limitations of element.style</h4>
				<p class="mt-2 text-sm text-yellow-700">
					element.style only works with inline styles. It cannot read styles set in CSS files or
					&lt;style&gt; tags unless they were previously set via element.style . Directly
					manipulating many styles can make code less readable and harder to maintain.
				</p>
			</div>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">
				Manipulating CSS Classes (`element.classList`) - Recommended Approach
			</h3>
			<p class="text-gray-700">
				A more flexible and convenient way to manage styles is by manipulating CSS classes. You
				define styles for classes in your CSS file, and then add or remove these classes from
				elements using JavaScript.
			</p>
			<p class="text-gray-700">The `element.classList` property provides handy methods for this:</p>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">add('class')</h4>
					<p class="mt-2 text-sm text-gray-600">Add a class.</p>
					<pre
						class="mt-1 overflow-x-auto rounded bg-gray-100 p-1 text-xs">element.classList.add('active');</pre>
				</div>
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">remove('class')</h4>
					<p class="mt-2 text-sm text-gray-600">Remove a class.</p>
					<pre
						class="mt-1 overflow-x-auto rounded bg-gray-100 p-1 text-xs">element.classList.remove('hidden');</pre>
				</div>
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">toggle('class')</h4>
					<p class="mt-2 text-sm text-gray-600">
						Toggle a class (add if absent, remove if present).
					</p>
					<pre
						class="mt-1 overflow-x-auto rounded bg-gray-100 p-1 text-xs">element.classList.toggle('selected');</pre>
				</div>
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h4 class="font-medium text-indigo-700">contains('class')</h4>
					<p class="mt-2 text-sm text-gray-600">
						Check if a class exists (returns `true` or `false`).
					</p>
					<pre
						class="mt-1 overflow-x-auto rounded bg-gray-100 p-1 text-xs">if (element.classList.contains('warning')) {'{/*... */}'}</pre>
				</div>
			</div>
			<div class="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
				<h4 class="font-medium text-indigo-700">Example: Toggling Visibility</h4>
				<p class="mt-2 text-sm text-gray-600">CSS:</p>
				<pre
					class="mt-1 overflow-x-auto rounded bg-gray-100 p-1 text-xs">.is-hidden display: none;</pre>
				<p class="mt-2 text-sm text-gray-600">JavaScript:</p>
				<pre class="mt-1 overflow-x-auto rounded bg-gray-100 p-1 text-xs">
{`
let menu = document.getElementById('main-menu');
let toggleButton = document.getElementById('menu-toggle');

toggleButton.addEventListener('click', () => {
  menu.classList.toggle('is-hidden');
}); 
`}       
            </pre>
			</div>
		</div>
		<p class="text-lg text-gray-700">
			Using `classList` separates behavior logic (JavaScript) from presentation (CSS), making the
			code cleaner and easier to maintain.
		</p>
	</div>
</ModuleTask>
