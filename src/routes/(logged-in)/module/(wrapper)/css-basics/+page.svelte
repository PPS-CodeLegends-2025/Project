<script lang="ts">
	import type { PageProps } from './$types';
	import ModuleTemplate from '$templates/ModuleTemplate.svelte';
	import type { Module } from '$lib/types/module';

	let { data }: PageProps = $props();

	const progress = data.userProgress;
	const sections = data.module.sections;

	const module: Module = {
		image: '/images/CSSbasics.png',
		level: 'Beginner',
		xpReward: 100,
		category: 'CSS',
		progress: progress.module,
		title: 'CSS Basics',
		description:
			'Learn the fundamentals of CSS to style web pages and create beautiful designs. Explore selectors, properties, layout techniques, and responsive design.',
		lessons: sections.length,
		sections,
		content
	};
</script>

{#snippet content()}
	<div>
		<p class="mb-4 text-lg">
			This course will teach you the fundamentals of CSS (Cascading Style Sheets), the language used
			to style and layout web pages.
		</p>
		<p class="mb-4 text-lg">
			From basic styling to advanced layouts, you'll learn how to transform plain HTML into visually
			appealing designs. You'll master selectors, properties, values, and the CSS box model.
		</p>
		<p class="text-lg">
			By the end of this course, you'll be able to create responsive, professional-looking web pages
			with modern styling techniques.
		</p>
	</div>
{/snippet}

<ModuleTemplate {...module} />
