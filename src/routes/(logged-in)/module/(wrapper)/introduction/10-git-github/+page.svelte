<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Introduction to Git & GitHub'
	};

	let { data }: PageProps = $props();

	const sectionIndex = data.section.index;
	const userId = data.user.id;
	const moduleId = data.module.data.url;

	const taskProps = {
		section: { ...sectionData, ...data.section.meta },
		nextSection: data.module.sections[sectionIndex + 1],
		prevSection: data.module.sections[sectionIndex - 1],
		completed: data.section.completed,
		completedNow: true,
		module: data.module.data,
		currentSectionIndex: sectionIndex,
		totalSections: data.module.sections.length,
		onMarkAsCompleted: async () => {
			try {
				await modules.markSectionCompleted(userId, moduleId, sectionIndex);
			} catch (error) {
				console.error('Failed to mark as completed:', error);
			}
		}
	};
</script>

<ModuleTask {...taskProps}>
	<div class="space-y-6">
		<section>
			<h3 class="mb-3 text-xl font-semibold">Introduction to Git & GitHub</h3>
			<p class="text-lg">
				Git and GitHub are essential tools in modern software development that help developers track
				changes, collaborate with others, and manage code effectively. Together, they form the
				backbone of version control and collaborative coding practices throughout the industry.
			</p>
			<p class="mt-2 text-lg">
				Whether you're working solo or as part of a large development team, understanding these
				tools will significantly improve your workflow and make you a more effective software
				developer.
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">What is Git?</h3>
			<p class="text-lg">
				Git is a distributed version control system that tracks changes in your code over time. It
				allows you to revisit earlier versions, work on different features simultaneously, and
				collaborate with other developers without overwriting each other's work.
			</p>

			<div class="mt-4 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4 italic">
				<p>
					"Git is like a time machine for your code that also enables parallel universes of
					development."
				</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">What is GitHub?</h3>
			<p class="text-lg">
				GitHub is a cloud-based hosting service for Git repositories. It adds a web-based interface
				and social features to Git, making it easier to collaborate on projects. GitHub provides
				tools for code review, project management, and integration with other development tools.
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Why Learn Git & GitHub?</h3>
			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Professional Development</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>Industry-standard for version control</li>
						<li>Expected skill for nearly all developer positions</li>
						<li>Facilitates collaboration with other developers</li>
						<li>Showcases your work to potential employers</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Practical Benefits</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>Track and revert changes when needed</li>
						<li>Work on multiple features simultaneously</li>
						<li>Backup your code in a remote repository</li>
						<li>Collaborate without code conflicts</li>
					</ul>
				</div>
			</div>
		</section>

		<div class="mt-6 rounded-lg border bg-gray-50 p-5">
			<p class="text-lg">
				In the following sections, we'll explore the fundamentals of Git and GitHub, learning how to
				use them effectively in your development workflow. You'll discover how to create
				repositories, track changes, collaborate with others, and leverage these powerful tools to
				become a more efficient and organized developer.
			</p>
		</div>
	</div>
</ModuleTask>
