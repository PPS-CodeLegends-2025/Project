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
		completedNow: false, // TODO: for enabling the complete button (just change to true to enable)
		module: data.module.data,
		currentSectionIndex: sectionIndex,
		totalSections: data.module.sections.length,
		onMarkAsCompleted: () => {
			alert('Marked as completed');
		}
	};
</script>

<ModuleTask {...taskProps}>
	<div class="space-y-6">
		<section>
			<p class="mb-4 text-lg">
				This module will cover the basics of JavaScript, a programming language that allows you to
				implement complex things on web pages. Every time a web page does more than just sit there
				and display static information for you to look at—displaying timely content updates,
				interactive maps, animated 2D/3D graphics, scrolling video jukeboxes, or more—you can bet
				that JavaScript is probably involved.
			</p>
		</section>

		<section>
			<p class="mb-4 text-lg">
				JavaScript is a high-level, often just-in-time compiled, and multi-paradigm programming
				language. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation,
				and first-class functions.
			</p>
		</section>

		<section>
			<p class="mb-4 text-lg">
				Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web.
				JavaScript enables interactive web pages and is an essential part of web applications. The
				vast majority of websites use it, and major web browsers have a dedicated JavaScript engine
				to execute it.
			</p>
		</section>

		<section>
			<p class="mb-4 text-lg">
				As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative
				programming styles. It has application programming interfaces (APIs) for working with text,
				arrays, dates, regular expressions, and the DOM, but the language itself does not include
				any I/O, such as networking, storage, or graphics facilities. It relies upon the host
				environment in which it is embedded to provide these features.
			</p>
		</section>
	</div>
</ModuleTask>
