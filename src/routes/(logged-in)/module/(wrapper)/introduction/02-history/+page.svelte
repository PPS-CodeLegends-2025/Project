<script lang="ts">
	import type { PageData } from './$types';
	import type { Section } from '$services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';

	const sectionData: Section = {
		title: 'Web History'
	};

	let { data }: { data: PageData } = $props();

	const sectionIndex = data.section.index;

	const taskProps = {
		section: { ...sectionData, ...data.section.current },
		nextSection: data.module.sections[sectionIndex + 1],
		prevSection: data.module.sections[sectionIndex - 1],
		completed: false, // TODO: data.userProgress.sections
		completedNow: true, // TODO: for enabling the complete button (just change to true to enable)
		module: data.module.data,
		currentSectionIndex: sectionIndex,
		totalSections: data.module.sections.length,
		onMarkAsCompleted: () => {
			alert('Marked as completed');
		}
	};
</script>

<ModuleTask {...taskProps}>
	<p class="text-lg">
		Web development has come a long way since its inception. The first website was created by Tim
		Berners-Lee in 1991. It was a simple text-based page with hyperlinks. The web has evolved
		significantly since then.
	</p>
	<p class="text-lg">
		HTML was created in 1993 by Tim Berners-Lee. It was the first markup language for creating web
		pages. CSS was created in 1996 by Håkon Wium Lie. It was the first style sheet language for the
		web. JavaScript was created in 1995 by Brendan Eich. It was the first programming language for
		the web.
	</p>
	<p class="text-lg">
		These three technologies are the core of the World Wide Web. They are used to create interactive
		web pages and web applications. They are constantly evolving to meet the needs of developers and
		users.
	</p>
</ModuleTask>
