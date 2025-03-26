<script lang="ts">
	import type { PageData } from './$types';
	import type { Section } from '$services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';

	const sectionData: Section = {
		title: 'Introduction'
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
		This module will introduce the basic concepts of web development and JavaScript programming
		language.
	</p>
	<p class="text-lg">
		Web development is the work involved in developing a website for the Internet (World Wide Web)
		or an intranet (a private network). Web development can range from developing a simple single
		static page of plain text to complex web-based internet applications (web apps), electronic
		businesses, and social network services. A more comprehensive list of tasks to which web
		development commonly refers may include web engineering, web design, web content development,
		client liaison, client-side/server-side scripting, web server and network security
		configuration, and e-commerce development.
	</p>
	<p class="text-lg">
		For this module, we will focus on the three core technologies of the World Wide Web: HTML, CSS,
		and JavaScript. HTML (HyperText Markup Language) is the standard markup language for documents
		designed to be displayed in a web browser. It can be assisted by technologies such as Cascading
		Style Sheets (CSS) and scripting languages such as JavaScript.
	</p>
	<p class="text-lg">
		When you are ready, mark this task as completed and move on to the next section.
	</p>
</ModuleTask>
