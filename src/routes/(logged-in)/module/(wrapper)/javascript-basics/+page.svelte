<script lang="ts">
	import type { PageData } from './$types';

	import type { Module } from '$lib/services/modules';
	import ModuleTemplate from '$templates/ModuleTemplate.svelte';
	import { modules } from '$lib/services/modules';

	let { data }: PageData = $props();
	console.log('data2', data);

	const progress = data?.userProgress || { module: 0 };
	const moduleData = modules.map()['/module/javascript-basics'];
	// mimimi
	let sections = [];
	for (let i = 0; i < moduleData?.sections.length; i++) {
		sections.push({
			...moduleData?.sections[i],
			completed: data?.userProgress?.sections[i] == 100 || false
		});
	}
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
