<script lang="ts">
	import type { PageProps } from './$types';
	import ModuleTemplate from '$templates/ModuleTemplate.svelte';
	import type { Module } from '$lib/types/module';

	let { data }: PageProps = $props();

	const progress = data.userProgress;
	const sections = data.module.sections;

	const module: Module = {
		image: '/images/html-basics.png',
		level: 'Beginner',
		xpReward: 15,
		category: 'HTML',
		progress: progress.module,
		title: 'HTML Basics',
		description: 'Learn the fundamentals of HTML for creating structured web content.',
		lessons: sections.length,
		sections,
		content
	};
</script>

{#snippet content()}
	<div>
		<p class="mb-4 text-lg">
			This module introduces the fundamental concepts of HTML (HyperText Markup Language), the
			standard markup language used to create web pages.
		</p>
		<p class="mb-4 text-lg">
			You'll learn about HTML elements, attributes, document structure, and semantic markup. By
			understanding these core concepts, you'll be able to create well-structured web pages that
			provide the foundation for everything on the web.
		</p>
		<p class="text-lg">
			By the end of this module, you'll be able to create HTML documents from scratch, understand
			the proper use of HTML elements, and build accessible, standards-compliant web pages.
		</p>
	</div>
{/snippet}

<ModuleTemplate {...module} />
