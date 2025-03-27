<script lang="ts">
	import type { PageData } from '../../../+page';
	import type { Section } from '$lib/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/services/modules';
	import { page } from '$app/stores';

	const sectionData: Section = {
		title: 'Introduction'
	};

	let { data }: { data: PageData } = $props();
	console.log('mi1111', data);

	const sectionIndex = data.section?.index ?? 0;
	const userId = $page.data.user?.id || 'guest-user';
	const moduleId = data.module?.data?.url || '/module/introduction';

	const taskProps = {
		section: {
			...sectionData,
			...(data.section?.current || {}),
			url: '/module/introduction/01-intro'
		},
		nextSection: data.module?.sections?.[sectionIndex + 1],
		prevSection: data.module?.sections?.[sectionIndex - 1],
		completed: data.section?.current?.completed || false,
		completedNow: true,
		module: data.module?.data || {
			title: 'Web Dev Introduction',
			url: '/module/introduction',
			level: 'Beginner',
			xpReward: 10,
			category: 'General',
			image: '/images/courses/web.webp',
			description: 'Introduction to web development fundamentals, tools, and best practices.'
		},
		currentSectionIndex: sectionIndex,
		totalSections: data.module?.sections?.length || 1,
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
	<div class="space-y-8">
		<header class="mb-6">
			<h2 class="text-3xl font-bold text-indigo-700">Welcome to Web Development</h2>
			<p class="mt-2 text-lg text-gray-600">
				Your journey into the world of building for the web begins here
			</p>
		</header>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-6">
			<p class="text-lg">
				This module will introduce you to the fundamental concepts of web development and JavaScript
				programming, giving you a solid foundation for your learning journey. By the end, you'll
				understand how websites work and be prepared to build your first web page!
			</p>
		</div>

		<section>
			<h3 class="mb-3 text-xl font-semibold text-indigo-600">What is Web Development?</h3>
			<p class="text-lg leading-relaxed">
				Web development is the process of building and maintaining websites and web applications
				that run on the internet. It ranges from creating simple static pages to complex interactive
				web applications, e-commerce sites, and social networks.
			</p>
			<p class="mt-3 text-lg leading-relaxed">
				Whether it's displaying information, collecting user data, or providing interactive
				experiences, web development makes it all possible through a combination of programming
				languages, frameworks, and tools.
			</p>
		</section>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="rounded-lg bg-blue-50 p-6 shadow-sm">
				<div class="mb-3 flex justify-center">
					<div class="rounded-full bg-blue-100 p-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-12 w-12 text-blue-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
							/>
						</svg>
					</div>
				</div>
				<h4 class="mb-2 text-center text-lg font-semibold text-blue-700">HTML</h4>
				<p class="text-center">
					The structure and content of web pages. HTML defines the elements that make up a page.
				</p>
			</div>

			<div class="rounded-lg bg-pink-50 p-6 shadow-sm">
				<div class="mb-3 flex justify-center">
					<div class="rounded-full bg-pink-100 p-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-12 w-12 text-pink-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
							/>
						</svg>
					</div>
				</div>
				<h4 class="mb-2 text-center text-lg font-semibold text-pink-700">CSS</h4>
				<p class="text-center">
					The styling and presentation. CSS controls how elements look and are positioned.
				</p>
			</div>

			<div class="rounded-lg bg-yellow-50 p-6 shadow-sm">
				<div class="mb-3 flex justify-center">
					<div class="rounded-full bg-yellow-100 p-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-12 w-12 text-yellow-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</div>
				</div>
				<h4 class="mb-2 text-center text-lg font-semibold text-yellow-700">JavaScript</h4>
				<p class="text-center">
					The functionality and interactivity. JavaScript makes pages dynamic and responsive.
				</p>
			</div>
		</div>

		<section>
			<h3 class="mb-3 text-xl font-semibold text-indigo-600">The Web Development Landscape</h3>
			<p class="text-lg leading-relaxed">
				Today's web development encompasses a wide range of technologies and approaches:
			</p>
			<ul class="mt-3 list-disc space-y-2 pl-6 text-lg">
				<li>Static websites vs. dynamic web applications</li>
				<li>Frontend and backend development</li>
				<li>Responsive design for mobile devices</li>
				<li>Modern frameworks and libraries like React, Vue, and Angular</li>
				<li>Cloud services and serverless computing</li>
			</ul>
			<p class="mt-3 text-lg">
				In this module, we'll focus on the fundamental concepts that underpin all these
				technologies.
			</p>
		</section>

		<div class="rounded-lg bg-gray-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-gray-800">Your Learning Path</h3>
			<p class="text-lg">
				Throughout this course, you'll learn how these three core technologies work together to
				create modern web experiences. You'll start with the fundamentals and progressively build up
				to more complex concepts and applications.
			</p>
			<p class="mt-4 text-center font-medium text-indigo-700">
				When you're ready, mark this section as completed and continue to the next lesson.
			</p>
		</div>

		<section class="rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Additional Resources</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Interactive Learning</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://www.freecodecamp.org/learn/responsive-web-design/"
								target="_blank"
								class="text-indigo-600 hover:underline">freeCodeCamp - Responsive Web Design</a
							>
						</li>
						<li>
							<a
								href="https://www.codecademy.com/learn/introduction-to-javascript"
								target="_blank"
								class="text-indigo-600 hover:underline">Codecademy - Intro to JavaScript</a
							>
						</li>
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Learn"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN Web Docs - Learning Area</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Videos & Tutorials</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://www.youtube.com/watch?v=pQN-pnXPaVg"
								target="_blank"
								class="text-indigo-600 hover:underline">HTML Full Course for Beginners (YouTube)</a
							>
						</li>
						<li>
							<a
								href="https://www.youtube.com/watch?v=1Rs2ND1ryYc"
								target="_blank"
								class="text-indigo-600 hover:underline">CSS Tutorial - Zero to Hero (YouTube)</a
							>
						</li>
						<li>
							<a
								href="https://www.youtube.com/watch?v=hdI2bqOjy3c"
								target="_blank"
								class="text-indigo-600 hover:underline">JavaScript Crash Course (YouTube)</a
							>
						</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</ModuleTask>
