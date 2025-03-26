<script lang="ts">
	import ModuleTemplate from '$templates/ModuleTemplate.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const progress = data.userProgress;
	const sections = data.module.sections.map((section) => ({ ...section, isCompleted: false }));

	const module = {
		image: '/images/js-logo.png',
		level: 'Beginner',
		xpReward: 50,
		category: 'JavaScript',
		progress: progress.module,
		title: 'JavaScript Functions',
		description: 'Learn how to create and use functions in JavaScript.',
		lessons: sections.length,
		sections,
		content
	};
</script>

{#snippet content()}
	<div>In this module you will learn the basics of JavaScript programming language.</div>
{/snippet}

<ModuleTemplate {...module} />
