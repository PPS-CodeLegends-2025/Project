<script lang="ts">
	import type { Module } from '$lib/types/module';
	import ModuleTemplate from '$templates/ModuleTemplate.svelte';
	import type { PageProps } from './$types';
	import { modules } from '$lib/services/modules';

	let { data }: PageProps = $props();
	console.log('data3', data);

	const progress = data?.userProgress || { module: 0 };
	const moduleData = modules.map()['/module/javascript-functions'];
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
		xpReward: 50,
		category: 'JavaScript',
		title: 'JavaScript Functions',
		description: 'Learn how to create and use functions in JavaScript.',
		progress: progress.module,
		lessons: sections.length,
		sections,
		content,
		url: data.module.data.url
	};
</script>

{#snippet content()}
	<div>In this module you will learn the basics of JavaScript programming language.</div>
{/snippet}

<ModuleTemplate {...module} />
