<script lang="ts">
	import type { PageProps } from './$types';
	import type { Module } from '$lib/types/module';
	import ModuleTemplate from '$templates/ModuleTemplate.svelte';

	let { data }: PageProps = $props();

	const progress = data.userProgress;
	const sections = data.module.sections;

	const module: Module = {
		image: '/images/dom.png',
		level: 'Intermediate',
		xpReward: 100,
		category: 'JavaScript',
		progress: progress.module,
		title: 'JavaScript DOM',
		description: 'Learn the basics of JavaScript DOM.',
		lessons: sections.length,
		sections,
		content
	};
</script>

{#snippet content()}
	<div>In this module you will learn inforamtion about JavaScript DOM.</div>
{/snippet}

<ModuleTemplate {...module} />
