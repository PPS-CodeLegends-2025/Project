<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'History of JavaScript'
	};

	let { data }: PageProps = $props();

	const sectionIndex = data.section.index;
	const userId = data.user.id;
	const moduleId = data.module.data.url;

	const taskProps = {
		section: { ...sectionData, ...data.section.meta },
		nextSection: data.module.sections[sectionIndex + 1],
		prevSection: data.module.sections[sectionIndex - 1],
		completedNow: true,
		completed: data.section.completed,
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
	<div class="text-lg">
		JavaScript has a rich and fascinating history that spans over 25 years of web development:

		<div class="my-4 rounded-lg bg-gray-50 p-6 shadow-sm">
			<h2 class="mb-3 text-2xl font-bold text-indigo-700">The Birth (1995)</h2>
			<p class="mb-2">
				Created by <span class="font-semibold">Brendan Eich</span> at Netscape in just
				<span class="italic">10 days</span>, JavaScript was initially named "Mocha," then
				"LiveScript," before settling on its current name.
			</p>
		</div>

		<div class="my-4 rounded-lg bg-gray-50 p-6 shadow-sm">
			<h2 class="mb-3 text-2xl font-bold text-indigo-700">Standardization (1997)</h2>
			<p class="mb-2">
				JavaScript was standardized as ECMAScript (ES1) in 1997, providing a foundation for future
				development.
			</p>
		</div>

		<div class="my-4 rounded-lg bg-gray-50 p-6 shadow-sm">
			<h2 class="mb-3 text-2xl font-bold text-indigo-700">Growth Period (2000s)</h2>
			<ul class="ml-6 list-disc space-y-1">
				<li>AJAX was introduced in 2005, revolutionizing web applications</li>
				<li>jQuery emerged in 2006, simplifying DOM manipulation</li>
				<li>V8 JavaScript engine by Google in 2008 dramatically improved performance</li>
			</ul>
		</div>

		<div class="my-4 rounded-lg bg-gray-50 p-6 shadow-sm">
			<h2 class="mb-3 text-2xl font-bold text-indigo-700">Modern Era (2009-Present)</h2>
			<p class="mb-2">ES6 (2015) introduced significant enhancements including:</p>
			<ul class="mb-3 ml-6 list-disc space-y-1">
				<li>Arrow functions</li>
				<li>Classes</li>
				<li>Promises</li>
				<li>Template literals</li>
			</ul>
			<p>
				Today, JavaScript powers front-end frameworks like <span
					class="font-semibold text-green-600">React</span
				>, <span class="font-semibold text-blue-600">Angular</span>, and
				<span class="font-semibold text-orange-600">Svelte</span>, as well as back-end environments
				with Node.js.
			</p>
		</div>

		<p class="mt-6 text-center text-lg font-medium">
			JavaScript has evolved from a simple scripting language to one of the most important
			programming languages in the world!
		</p>
	</div>
</ModuleTask>
