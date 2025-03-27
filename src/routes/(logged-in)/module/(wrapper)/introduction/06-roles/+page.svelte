<script lang="ts">
	import type { PageData } from './$types';
	import type { Section } from '$lib/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { page } from '$app/stores';
	import { modules } from '$lib/services/modules';

	const sectionData: Section = {
		title: 'Web Development Roles'
	};

	let { data }: { data: PageData } = $props();

	const sectionIndex = data.section.index;
	const userId = $page.data.user?.id || 'guest-user';
	const moduleId = data.module.data.url;

	const taskProps = {
		section: { ...sectionData, ...data.section.current },
		nextSection: data.module.sections[sectionIndex + 1],
		prevSection: data.module.sections[sectionIndex - 1], // This should point to 02-history
		completed: data.section.current?.completed || false,
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
		<h2 class="mb-4 text-2xl font-bold text-indigo-600">Roles in Web Development</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				Web development encompasses various specialized roles, each focusing on different aspects of
				creating websites and web applications. Understanding these roles helps you decide which
				area you might want to specialize in.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<!-- Frontend Developer -->
			<div class="rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm">
				<h3 class="mb-3 text-xl font-bold text-blue-700">Frontend Developer</h3>
				<div class="mb-4 flex justify-center">
					<div class="rounded-full bg-blue-100 p-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-12 w-12 text-blue-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</div>
				</div>
				<p class="mb-3">
					Frontend developers build what users see and interact with in a browser. They focus on:
				</p>
				<ul class="ml-5 list-disc space-y-1">
					<li>
						Creating user interfaces with <strong>HTML</strong>, <strong>CSS</strong>, and
						<strong>JavaScript</strong>
					</li>
					<li>Implementing responsive design for different screen sizes</li>
					<li>
						Using frontend frameworks like <strong>React</strong>, <strong>Vue</strong>, or
						<strong>Svelte</strong>
					</li>
					<li>Ensuring accessibility and good user experience</li>
				</ul>
				<p class="mt-3 text-sm italic">
					Frontend developers bridge design and technology to create engaging user experiences.
				</p>
			</div>

			<!-- Backend Developer -->
			<div class="rounded-lg border border-green-200 bg-green-50 p-6 shadow-sm">
				<h3 class="mb-3 text-xl font-bold text-green-700">Backend Developer</h3>
				<div class="mb-4 flex justify-center">
					<div class="rounded-full bg-green-100 p-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-12 w-12 text-green-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
							/>
						</svg>
					</div>
				</div>
				<p class="mb-3">
					Backend developers work on server-side applications. Their responsibilities include:
				</p>
				<ul class="ml-5 list-disc space-y-1">
					<li>
						Building and maintaining servers using languages like <strong>Node.js</strong>,
						<strong>Python</strong>, or <strong>Java</strong>
					</li>
					<li>Designing and managing databases (SQL or NoSQL)</li>
					<li>Creating APIs for frontend applications</li>
					<li>Implementing security, authentication, and authorization</li>
				</ul>
				<p class="mt-3 text-sm italic">
					Backend developers handle the "behind the scenes" logic, data processing, and server
					operations.
				</p>
			</div>

			<!-- Full Stack Developer -->
			<div class="rounded-lg border border-purple-200 bg-purple-50 p-6 shadow-sm">
				<h3 class="mb-3 text-xl font-bold text-purple-700">Full-Stack Developer</h3>
				<div class="mb-4 flex justify-center">
					<div class="rounded-full bg-purple-100 p-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-12 w-12 text-purple-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
							/>
						</svg>
					</div>
				</div>
				<p class="mb-3">
					Full-stack developers work with both frontend and backend technologies. They:
				</p>
				<ul class="ml-5 list-disc space-y-1">
					<li>Develop complete web applications from database to user interface</li>
					<li>Have knowledge of multiple programming languages</li>
					<li>Understand how all parts of a web application interact</li>
					<li>Can switch between frontend and backend tasks as needed</li>
				</ul>
				<p class="mt-3 text-sm italic">
					Full-stack developers provide end-to-end solutions and have a broad technical skillset.
				</p>
			</div>
		</div>

		<div class="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-6">
			<h3 class="mb-3 text-xl font-bold text-amber-700">Related Specialized Roles</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">DevOps Engineer</h4>
					<p>Focuses on deployment, automation, and maintaining development infrastructure</p>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">UI/UX Designer</h4>
					<p>Designs user interfaces and experiences before they're implemented by developers</p>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">QA Engineer</h4>
					<p>Tests applications to ensure quality and identify bugs before release</p>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Mobile Web Specialist</h4>
					<p>Focuses on making web applications work well on mobile devices</p>
				</div>
			</div>
		</div>

		<div class="rounded-lg bg-indigo-50 p-6 text-center">
			<h3 class="mb-3 text-xl font-bold">Your Path Forward</h3>
			<p>
				Many web developers start by learning the basics of all areas before specializing. As you
				progress through this course, you'll gain experience with various technologies that will
				help you decide which role suits you best.
			</p>
			<p class="mt-2 font-medium">
				The most important qualities for any web developer are curiosity, problem-solving skills,
				and a desire to keep learning!
			</p>
		</div>
	</div>
</ModuleTask>
