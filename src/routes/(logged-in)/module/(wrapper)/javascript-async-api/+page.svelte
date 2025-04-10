<script lang="ts">
	import type { PageProps } from './$types';
	import type { Module } from '$lib/types/module';
	import ModuleTemplate from '$templates/ModuleTemplate.svelte';

	let { data }: PageProps = $props();

	const progress = data.userProgress;
	const sections = data.module.sections;

	const module: Module = {
		image: '/images/js-logo.png',
		level: 'Intermediate',
		xpReward: 100,
		category: 'JavaScript',
		progress: progress.module,
		title: 'JavaScript Async',
		description: 'Learn the JavaScript async.',
		lessons: sections.length,
		sections,
		content
	};
</script>

{#snippet content()}
	<div>In this module you will learn async processes in JavaScript.</div>
{/snippet}

<ModuleTemplate {...module} />
