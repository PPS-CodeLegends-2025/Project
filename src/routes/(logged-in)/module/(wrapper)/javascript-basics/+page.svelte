<script lang="ts">
	import type { PageProps } from './$types';
	import type { Module } from '$lib/types/module';
	import ModuleTemplate from '$templates/ModuleTemplate.svelte';

	let { data }: PageProps = $props();

	const progress = data.userProgress;
	const sections = data.module.sections;

	const module: Module = {
		image: '/images/js-logo.png',
		level: 'Beginner',
		xpReward: 20,
		category: 'JavaScript',
		progress: progress.module,
		title: 'JavaScript Basics',
		description: 'Learn the basics of JavaScript programming language.',
		lessons: sections.length,
		sections,
		content
	};
</script>

{#snippet content()}
	<div>In this module you will learn the basics of JavaScript programming language.</div>
{/snippet}

<ModuleTemplate {...module} />
