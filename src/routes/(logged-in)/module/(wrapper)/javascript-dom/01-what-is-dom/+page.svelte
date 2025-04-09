<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'What is the DOM?'
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
			Introduction to the Document Object Model (DOM)
		</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				The DOM (Document Object Model) is a programming interface for HTML and XML documents. It
				represents the structure of a document as a tree of objects, allowing programming languages
				like JavaScript to interact with the page: read and change its content, structure, and
				styles.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">The DOM as a Tree</h3>
			<p class="text-gray-700">
				When a browser loads an HTML page, it creates a model of the document in memory. This model
				has a hierarchical structure, similar to a tree.
			</p>
			<ul class="list-disc space-y-2 pl-5 text-gray-700">
				<li>
					Each HTML tag becomes an <strong class="font-medium text-indigo-700">element node</strong
					>.
				</li>
				<li>
					The text inside tags becomes a <strong class="font-medium text-indigo-700"
						>text node</strong
					>.
				</li>
				<li>
					HTML attributes become <strong class="font-medium text-indigo-700">attribute nodes</strong
					>.
				</li>
				<li>Comments become <strong class="font-medium text-indigo-700">comment nodes</strong>.</li>
			</ul>
			<p class="text-gray-700">
				The topmost node of the tree is the `document` object. From it, you can access
				`&lt;html&gt;` (`document.documentElement`), `&lt;body&gt;` (`document.body`),
				`&lt;head&gt;` (`document.head`), and other elements.
			</p>
		</div>

		<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
			<h4 class="font-medium text-indigo-700">Example Structure</h4>
			<p class="mt-2 text-gray-700">For the HTML code:</p>
			<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;My Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello, DOM!&lt;/h1&gt;
    &lt;p&gt;This is a paragraph.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
			<p class="mt-2 text-gray-700">
				The DOM tree will have a corresponding hierarchy with nodes for `html`, `head`, `title`,
				`body`, `h1`, `p`, and text nodes within them.
			</p>
		</div>

		<p class="text-lg text-gray-700">
			Understanding the DOM is key to manipulating web pages with JavaScript. The following sections
			will show how to find elements in this tree and interact with them.
		</p>
	</div>
</ModuleTask>
