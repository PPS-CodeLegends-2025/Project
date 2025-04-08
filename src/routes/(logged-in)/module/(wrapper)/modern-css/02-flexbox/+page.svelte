<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Flexbox Layout System'
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
		<section>
			<h3 class="mb-3 text-xl font-semibold">What is Flexbox?</h3>
			<p class="text-lg">
				Flexbox (Flexible Box Layout) is a one-dimensional layout method designed for arranging
				items in rows or columns. It provides a more efficient way to distribute space and align
				items, even when their size is unknown or dynamic.
			</p>
			<p class="mt-3 text-lg">
				Think of Flexbox as a way to give elements the ability to alter their width/height to best
				fill the available space. It's particularly good at vertical centering and creating
				equal-sized columns with minimal code.
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Core Concepts</h3>
			<div class="rounded-lg border bg-gray-50 p-5">
				<div class="mb-4">
					<h4 class="mb-2 font-semibold">Flex Container vs. Flex Items</h4>
					<p>
						The parent element with <code>display: flex</code> is the
						<strong>flex container</strong>, while its direct children become
						<strong>flex items</strong>.
					</p>
				</div>
				<div class="mb-4">
					<h4 class="mb-2 font-semibold">Main Axis and Cross Axis</h4>
					<p>
						Flexbox operates on two axes: the <strong>main axis</strong> (horizontal by default) and
						the <strong>cross axis</strong> (vertical by default). These can be swapped with
						<code>flex-direction</code>.
					</p>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Key Flexbox Properties</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Container Properties</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>
							<code>display: flex</code> - Creates a flex container
						</li>
						<li>
							<code>flex-direction</code> - Row, row-reverse, column, column-reverse
						</li>
						<li>
							<code>justify-content</code> - Aligns items along the main axis
						</li>
						<li>
							<code>align-items</code> - Aligns items along the cross axis
						</li>
						<li>
							<code>flex-wrap</code> - Controls whether items wrap to new lines
						</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Item Properties</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>
							<code>flex-grow</code> - How much an item can grow relative to others
						</li>
						<li>
							<code>flex-shrink</code> - How much an item can shrink relative to others
						</li>
						<li>
							<code>flex-basis</code> - Default size of an item before growing/shrinking
						</li>
						<li>
							<code>flex</code> - Shorthand for grow, shrink, and basis
						</li>
						<li>
							<code>align-self</code> - Override the container's align-items
						</li>
						<li>
							<code>order</code> - Controls the order of specific items
						</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Common Flexbox Patterns</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Perfect Centering</h4>
					<div class="rounded bg-white p-3 font-mono text-sm">
						.parent {'{'}<br />
						&nbsp;&nbsp;display: flex;<br />
						&nbsp;&nbsp;justify-content: center;<br />
						&nbsp;&nbsp;align-items: center;<br />
						}
					</div>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Navigation Bar</h4>
					<div class="rounded bg-white p-3 font-mono text-sm">
						nav {'{'}<br />
						&nbsp;&nbsp;display: flex;<br />
						&nbsp;&nbsp;justify-content: space-between;<br />
						}<br />
						<br />
						.nav-links {'{'}<br />
						&nbsp;&nbsp;display: flex;<br />
						&nbsp;&nbsp;gap: 1rem;<br />
						}
					</div>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Learn More About Flexbox</h3>
			<div class="rounded-lg border bg-indigo-50 p-5">
				<ul class="list-disc space-y-2 pl-5">
					<li>
						<a
							href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
							target="_blank"
							class="text-indigo-600 hover:underline">CSS-Tricks: A Complete Guide to Flexbox</a
						>
					</li>
					<li>
						<a
							href="https://flexboxfroggy.com/"
							target="_blank"
							class="text-indigo-600 hover:underline">Flexbox Froggy</a
						> - Learn Flexbox by playing a game
					</li>
					<li>
						<a
							href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout"
							target="_blank"
							class="text-indigo-600 hover:underline">MDN: CSS Flexible Box Layout</a
						>
					</li>
				</ul>
			</div>
		</section>
	</div>
</ModuleTask>
