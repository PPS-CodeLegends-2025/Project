<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Event Handling'
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
		<h2 class="mb-4 text-2xl font-bold text-indigo-600">Handling Events in JavaScript</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				Events are actions that occur on a web page (mouse clicks, key presses, page loads, form
				submissions, etc.). JavaScript allows you to "listen" for these events and react to them by
				executing specific code. This makes pages interactive.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Adding Event Handlers: addEventListener</h3>
			<p class="text-gray-700">
				The most common and recommended way to add an event handler is the addEventListener method.
			</p>
			<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
				<h4 class="font-medium text-indigo-700">Syntax</h4>
				<pre
					class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">element.addEventListener('eventName', handlerFunction, [options]);</pre>
				<ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
					<li>element: The DOM element to listen for events on.</li>
					<li>eventName: String with the event name (e.g., 'click', 'mouseover', 'keydown').</li>
					<li>
						handlerFunction: The function to be called when the event occurs. This function
						automatically receives the event object as an argument.
					</li>
					<li>
						options (optional): An object with additional settings (e.g., capture, once, passive).
					</li>
				</ul>
			</div>
			<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
				<h4 class="font-medium text-indigo-700">Example: Handling a Button Click</h4>
				<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
let myButton = document.getElementById('actionButton');

function handleClick() {
  console.log('Button clicked!');
  alert('You clicked the button!');
}

myButton.addEventListener('click', handleClick);

// Can also use an anonymous function:
myButton.addEventListener('mouseover', function() {
  console.log('Mouse over button');
});`}</pre>
			</div>
		</div>
	</div>

	<div class="space-y-4">
		<h3 class="text-xl font-semibold text-gray-800">The Event Object (event)</h3>
		<p class="text-gray-700">
			The handler function automatically receives an event object (commonly named event, evt, or e),
			which contains detailed information about the event.
		</p>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
				<h4 class="font-medium text-indigo-700">Useful Properties</h4>
				<ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
					<li>event.target: The element on which the event originally occurred.</li>
					<li>
						event.currentTarget: The element the handler is attached to (useful with bubbling).
					</li>
					<li>event.type: The type of event (e.g., 'click').</li>
					<li>event.key (for keyboard events): The key that was pressed.</li>
					<li>event.clientX, event.clientY (for mouse events): Cursor coordinates.</li>
				</ul>
			</div>
			<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
				<h4 class="font-medium text-indigo-700">Useful Methods</h4>
				<ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
					<li>
						event.preventDefault(): Cancel the browser's default action (e.g., following a link,
						submitting a form).
					</li>
					<li>event.stopPropagation(): Stop the event from "bubbling" up the DOM tree.</li>
				</ul>
			</div>
		</div>
		<div class="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
			<h4 class="font-medium text-indigo-700">Example: Preventing Form Submission</h4>
			<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
let myForm = document.getElementById('myForm');

myForm.addEventListener('submit', function(event) {
// Validate form data...
let nameInput = document.getElementById('name');
if (nameInput.value === '') {
 alert('Please enter your name!');
 event.preventDefault(); // Stop form submission
}
});`}</pre>
		</div>
	</div>

	<div class="space-y-4">
		<h3 class="text-xl font-semibold text-gray-800">Common Event Types</h3>
		<ul class="list-disc space-y-1 pl-5 text-gray-700">
			<li>
				<strong>Mouse Events:</strong> click, dblclick, mousedown, mouseup, mouseover, mouseout, mousemove.
			</li>
			<li><strong>Keyboard Events:</strong> keydown, keyup, keypress.</li>
			<li>
				<strong>Form Events:</strong> submit, change (for &lt;input&gt;, &lt;select&gt;, &lt;textarea&gt;),
				focus, blur.
			</li>
			<li><strong>Document/Window Events:</strong> load, DOMContentLoaded, resize, scroll."</li>
		</ul>
	</div>

	<div class="space-y-4">
		<h3 class="text-xl font-semibold text-gray-800">Removing Handlers: "removeEventListener"</h3>
		<p class="text-gray-700">
			If a handler is no longer needed, it can be removed to free up memory. It's important to pass
			the exact same function that was used in `addEventListener`.
		</p>
		<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
// Adding
myButton.addEventListener('click', handleClick);

// Removing (requires the same handleClick function)
myButton.removeEventListener('click', handleClick);
`}
</pre>
	</div>

	<p class="text-lg text-gray-700">
		Event handling is the foundation of interactivity on the web. Understanding how to listen for
		and respond to events allows you to create dynamic and user-friendly web applications.
	</p>
</ModuleTask>
