<script lang="ts">
	import ModuleTemplate from '$templates/ModuleTemplate.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const progress = data.userProgress;
	const sections = data.module.sections.map((section) => ({ ...section, isCompleted: false }));

	const module = {
		image: '/images/courses/web.webp',
		level: 'Beginner',
		xpReward: 10,
		category: 'General',
		progress: progress.module,
		title: 'Web Dev Introduction',
		description: 'Introduction to web development.',
		lessons: sections.length,
		sections,
		content
	};
</script>

{#snippet content()}
	<div>In this module you will learn the basics of JavaScript programming language.</div>
{/snippet}

<ModuleTemplate {...module} />
