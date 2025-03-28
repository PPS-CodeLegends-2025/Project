<script lang="ts">
	import type { PageData } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { page } from '$app/stores';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Frontend vs Backend Development'
	};

	let { data }: { data: PageData } = $props();

	const sectionIndex = data.section.index;
	const userId = $page.data.user?.id || 'guest-user';
	const moduleId = data.module.data.url;

	const taskProps = {
		section: { ...sectionData, ...data.section.current },
		nextSection: data.module.sections[sectionIndex + 1],
		prevSection: data.module.sections[sectionIndex - 1],
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
		<section>
			<h3 class="mb-3 text-xl font-semibold">What is Frontend Development?</h3>
			<p class="text-lg">
				Frontend development focuses on everything that users directly interact with in their web
				browsers. It's responsible for the look, feel, and interactive behavior of websites and web
				applications—essentially everything you can see and interact with.
			</p>
			<p class="mt-2 text-lg">
				Frontend developers transform designs and wireframes into functional user interfaces,
				ensuring the application is responsive, accessible, and provides an optimal user experience
				across different devices and screen sizes.
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">What is Backend Development?</h3>
			<p class="text-lg">
				Backend development involves the "behind-the-scenes" functionality that powers websites and
				applications. It's responsible for server-side logic, database interactions, API
				development, authentication, and all the invisible processes that make applications work.
			</p>
			<p class="mt-2 text-lg">
				Backend developers build the infrastructure that supports the frontend, processes user
				requests, stores and retrieves data, and ensures the application's security, performance,
				and scalability.
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Key Differences</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Frontend</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>Focuses on client-side development</li>
						<li>Creates the user interface and experience</li>
						<li>Works with HTML, CSS, and JavaScript</li>
						<li>Concerned with visual elements and interactivity</li>
						<li>Uses frameworks like React, Angular, Vue</li>
						<li>Directly interacts with users</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Backend</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>Focuses on server-side development</li>
						<li>Manages data storage, security, and business logic</li>
						<li>Works with languages like Python, Java, Node.js, PHP</li>
						<li>Concerned with functionality and performance</li>
						<li>Uses databases and server technologies</li>
						<li>Invisible to end users but crucial for functionality</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Core Technologies</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Frontend Technologies</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>HTML:</strong> Structures the content of web pages</li>
						<li><strong>CSS:</strong> Styles the visual presentation</li>
						<li><strong>JavaScript:</strong> Adds interactivity and dynamic behavior</li>
						<li><strong>Frameworks/Libraries:</strong> React, Angular, Vue.js, Svelte</li>
						<li><strong>CSS Frameworks:</strong> Tailwind CSS, Bootstrap, Material UI</li>
						<li><strong>Tools:</strong> Webpack, Babel, npm/yarn</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Backend Technologies</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>Languages:</strong> Python, Java, PHP, Ruby, Node.js, Go</li>
						<li><strong>Databases:</strong> MySQL, PostgreSQL, MongoDB, Redis</li>
						<li><strong>Frameworks:</strong> Django, Express, Laravel, Ruby on Rails</li>
						<li><strong>APIs:</strong> RESTful APIs, GraphQL</li>
						<li><strong>Authentication:</strong> OAuth, JWT, Sessions</li>
						<li><strong>Server Software:</strong> Nginx, Apache, Docker</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">How Frontend and Backend Interact</h3>
			<p class="text-lg">
				The frontend and backend communicate through APIs (Application Programming Interfaces),
				which define how different software components should interact. This communication typically
				follows these steps:
			</p>
			<ol class="mt-2 list-decimal space-y-2 pl-8 text-lg">
				<li>A user performs an action in the frontend (e.g., submitting a form)</li>
				<li>The frontend JavaScript makes an HTTP request to a backend API endpoint</li>
				<li>The backend receives the request, processes it, and often interacts with a database</li>
				<li>The backend sends a response back to the frontend (typically in JSON format)</li>
				<li>The frontend processes this response and updates the UI accordingly</li>
			</ol>
			<p class="mt-4 text-lg">
				This client-server architecture allows for separation of concerns, making applications more
				maintainable, scalable, and secure.
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Career Paths</h3>
			<div class="grid gap-6 md:grid-cols-3">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Frontend Roles</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Frontend Developer</li>
						<li>UI/UX Developer</li>
						<li>JavaScript Engineer</li>
						<li>React/Angular/Vue Developer</li>
						<li>Mobile Web Developer</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Backend Roles</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Backend Developer</li>
						<li>API Developer</li>
						<li>Database Administrator</li>
						<li>Server Engineer</li>
						<li>Cloud Infrastructure Engineer</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Full Stack Roles</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Full Stack Developer</li>
						<li>Web Application Engineer</li>
						<li>Software Engineer</li>
						<li>DevOps Engineer</li>
						<li>Technical Lead</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Best Practices</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Frontend Best Practices</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Optimize for performance and loading speed</li>
						<li>Ensure responsive design for all devices</li>
						<li>Follow accessibility standards (WCAG)</li>
						<li>Implement proper error handling</li>
						<li>Create maintainable, modular code</li>
						<li>Optimize for SEO when applicable</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Backend Best Practices</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Secure data and implement proper authentication</li>
						<li>Design efficient database schemas</li>
						<li>Create well-documented APIs</li>
						<li>Implement caching strategies</li>
						<li>Handle errors gracefully and log appropriately</li>
						<li>Scale horizontally when needed</li>
					</ul>
				</div>
			</div>
		</section>

		<div class="mt-6 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4 italic">
			<p>
				"Frontend and backend are like two sides of the same coin - while they focus on different
				aspects, they're ultimately part of a single, unified user experience."
			</p>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Additional Resources</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Frontend Resources</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Learn/Front-end_web_developer"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN: Frontend Web Developer Learning Path</a
							>
						</li>
						<li>
							<a
								href="https://frontendmasters.com/guides/front-end-handbook/2019/"
								target="_blank"
								class="text-indigo-600 hover:underline">Frontend Developer Handbook</a
							>
						</li>
						<li>
							<a
								href="https://css-tricks.com/"
								target="_blank"
								class="text-indigo-600 hover:underline">CSS-Tricks</a
							> - Articles and tutorials on frontend development
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Backend Resources</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://roadmap.sh/backend"
								target="_blank"
								class="text-indigo-600 hover:underline">Backend Developer Roadmap</a
							>
						</li>
						<li>
							<a
								href="https://expressjs.com/en/starter/installing.html"
								target="_blank"
								class="text-indigo-600 hover:underline">Express.js Getting Started</a
							> - Popular Node.js framework
						</li>
						<li>
							<a
								href="https://www.youtube.com/watch?v=XBu54nfzxAQ"
								target="_blank"
								class="text-indigo-600 hover:underline"
								>Backend Web Development - Complete Course (YouTube)</a
							>
						</li>
					</ul>
				</div>
			</div>
			<div class="mt-4">
				<h4 class="mb-2 font-semibold">Learning Paths & Courses</h4>
				<ul class="list-disc space-y-1 pl-5">
					<li>
						<a
							href="https://www.freecodecamp.org/learn/"
							target="_blank"
							class="text-indigo-600 hover:underline">freeCodeCamp Curriculum</a
						> - Free courses on both frontend and backend
					</li>
					<li>
						<a
							href="https://fullstackopen.com/en/"
							target="_blank"
							class="text-indigo-600 hover:underline">Full Stack Open</a
						> - Modern web application development
					</li>
					<li>
						<a
							href="https://www.theodinproject.com/"
							target="_blank"
							class="text-indigo-600 hover:underline">The Odin Project</a
						> - Full stack curriculum
					</li>
				</ul>
			</div>
		</section>
	</div>
</ModuleTask>
