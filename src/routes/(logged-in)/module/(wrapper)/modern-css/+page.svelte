<script lang="ts">
	import type { PageProps } from './$types';
	import type { Module } from '$lib/types/module';
	import ModuleTemplate from '$templates/ModuleTemplate.svelte';

	let { data }: PageProps = $props();

	const progress = data.userProgress;
	const sections = data.module.sections;

	const module: Module = {
		image: '/images/css.png',
		level: 'Intermediate',
		xpReward: 150,
		category: 'CSS',
		progress: progress.module,
		title: 'Modern CSS Techniques',
		description: 'Learn advanced CSS features, flexbox, grid, and modern layout techniques.',
		lessons: sections.length,
		sections,
		content
	};
</script>

{#snippet content()}
	<div>
		<p class="mb-4 text-lg">
			This module will introduce you to modern CSS techniques that have transformed how we build
			layouts and style web applications.
		</p>
		<p class="mb-4 text-lg">
			You'll learn powerful layout systems like Flexbox and CSS Grid, explore CSS custom properties
			(variables), and understand how to create responsive designs using modern approaches.
		</p>
		<p class="text-lg">
			By the end of this module, you'll have the skills to create sophisticated, maintainable, and
			responsive web layouts using the latest CSS technologies.
		</p>
	</div>
{/snippet}

<ModuleTemplate {...module} />
