<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Introduction to Modern CSS'
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
			<h3 class="mb-3 text-xl font-semibold">The Evolution of CSS</h3>
			<p class="text-lg">
				CSS has come a long way since its introduction in 1996. What began as a simple styling
				language has evolved into a powerful system for creating complex layouts and rich visual
				experiences.
			</p>
			<p class="mt-2 text-lg">
				Modern CSS features have revolutionized how we approach web design, making many older
				techniques and hacks obsolete while enabling more efficient, maintainable code.
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Key Modern CSS Features</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Layout Systems</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>Flexbox:</strong> One-dimensional layout system</li>
						<li><strong>Grid:</strong> Two-dimensional layout system</li>
						<li><strong>Multi-column Layout:</strong> Newspaper-style columns</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Enhanced Styling</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>Custom Properties:</strong> CSS variables</li>
						<li><strong>calc():</strong> Mathematical calculations</li>
						<li><strong>clamp():</strong> Responsive values with min/max limits</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Benefits of Modern CSS</h3>
			<div class="mt-4 rounded-lg border bg-indigo-50 p-5">
				<ul class="list-disc space-y-2 pl-5">
					<li>More maintainable code with fewer hacks</li>
					<li>Better responsive design capabilities</li>
					<li>Reduced reliance on JavaScript for layout</li>
					<li>Improved performance with native browser features</li>
					<li>Easier implementation of complex designs</li>
				</ul>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Browser Support</h3>
			<p class="text-lg">
				Most modern browsers now support these CSS features, making them safe to use in production.
				The days of significant cross-browser compatibility issues are largely behind us, though
				it's still important to check browser support for cutting-edge features.
			</p>
			<div class="mt-4 rounded-lg border bg-amber-50 p-5">
				<h4 class="mb-2 font-semibold">Resources for Browser Compatibility</h4>
				<ul class="list-disc space-y-1 pl-5">
					<li>
						<a href="https://caniuse.com/" target="_blank" class="text-indigo-600 hover:underline"
							>Can I Use</a
						> - Check feature support across browsers
					</li>
					<li>
						<a
							href="https://developer.mozilla.org/en-US/"
							target="_blank"
							class="text-indigo-600 hover:underline">MDN Web Docs</a
						> - Detailed browser compatibility tables
					</li>
				</ul>
			</div>
		</section>
	</div>
</ModuleTask>
