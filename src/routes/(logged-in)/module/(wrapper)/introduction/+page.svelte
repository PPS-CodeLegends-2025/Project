<script lang="ts">
	import type { PageData } from './$types';

	import type { Module } from '$lib/services/modules';
	import ModuleTemplate from '$templates/ModuleTemplate.svelte';
	import { modules } from '$lib/services/modules';

	let { data } = $props<{ data: PageData }>();
	console.log('data1', data);

	const progress = data?.userProgress || { module: 0 };
	const moduleData = modules.map()['/module/introduction'];
	// mimimi mimimi
	let sections = [];
	for (let i = 0; i < moduleData?.sections.length; i++) {
		sections.push({
			...moduleData?.sections[i],
			completed: data?.userProgress?.sections[i] == 100 || false
		});
	}

	const module: Module = {
		image: '/images/courses/web.webp',
		level: 'Beginner',
		xpReward: 10,
		category: 'General',
		progress: progress.module,
		title: 'Web Dev Introduction',
		description: 'Introduction to web development fundamentals, tools, and best practices.',
		lessons: sections.length,
		sections,
		content,
		url: '/module/introduction'
	};
</script>

{#snippet content()}
	<div>
		<p class="mb-4 text-lg">
			This module will introduce you to the world of web development. You'll learn about the history
			of the web, understand the difference between websites and web applications, and explore the
			roles of frontend and backend development.
		</p>
		<p class="mb-4 text-lg">
			You'll also discover essential tools used in modern web development, learn about browser
			developer tools, and understand the importance of version control with Git and GitHub.
		</p>
		<p class="text-lg">
			By the end of this module, you'll have a solid foundation in web development concepts and be
			ready to dive deeper into specific technologies and frameworks.
		</p>
	</div>
{/snippet}

<ModuleTemplate {...module} />
