<script lang="ts">
	import type { PageData } from './$types';
	import type { Section } from '$lib/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { page } from '$app/stores';
	import { modules } from '$lib/services/modules';

	const sectionData: Section = {
		title: 'Understanding Websites and Web Applications'
	};

	let { data }: { data: PageData } = $props();

	const sectionIndex = data.section?.index ?? 0;
	const userId = $page.data.user?.id || 'guest-user';
	const moduleId = data.module?.data?.url || '/module/introduction';

	const taskProps = {
		section: {
			...sectionData,
			...data.section?.current,
			url: '/module/introduction/03-understanding-websites'
		},
		nextSection: data.module?.sections?.[sectionIndex + 1],
		prevSection: data.module?.sections?.[sectionIndex - 1],
		completed: data.section?.current?.completed || false,
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
			<h3 class="mb-3 text-xl font-semibold">What are Websites?</h3>
			<p class="text-lg">
				A website is a collection of related web pages, images, videos, or other digital content
				that is identified by a common domain name and published on at least one web server.
				Websites are primarily informational and content-oriented, serving as digital brochures,
				portfolios, blogs, or information resources.
			</p>
			<p class="mt-2 text-lg">
				Traditional websites typically follow a multi-page architecture where each page is loaded
				from the server when requested. When users navigate to a different section, the browser
				requests and loads an entirely new page.
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">What are Web Applications?</h3>
			<p class="text-lg">
				Web applications (or web apps) are interactive, dynamic programs that run on web browsers
				and provide functionality beyond simple information display. They allow users to create,
				read, update, and delete data, and often mimic desktop applications in their functionality
				and user experience.
			</p>
			<p class="mt-2 text-lg">
				Modern web applications often use JavaScript frameworks like React, Angular, or Vue.js to
				create responsive, dynamic user interfaces. Many web applications follow a single-page
				application (SPA) architecture, where the entire app is loaded once, and then specific
				components update as users interact with the application, without requiring full page
				reloads.
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Key Differences</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Websites</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>Primary purpose is to display information</li>
						<li>Content-focused with minimal interactivity</li>
						<li>Multi-page structure with full page reloads</li>
						<li>Examples: blogs, news sites, corporate sites</li>
						<li>Usually simpler in architecture</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Web Applications</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>Primary purpose is to perform tasks or functions</li>
						<li>Interactive with complex user inputs and processing</li>
						<li>Often single-page with dynamic content loading</li>
						<li>Examples: email clients, project management tools, social networks</li>
						<li>More complex architecture with front-end and back-end components</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">The Blurred Line</h3>
			<p class="text-lg">
				With advancing web technologies, the distinction between websites and web applications has
				become increasingly blurred. Many modern websites incorporate interactive elements
				traditionally associated with web applications, while web applications may include
				content-focused sections similar to traditional websites.
			</p>
			<p class="mt-2 text-lg">
				This convergence has led to the term "web platform" being used to describe comprehensive
				online experiences that combine aspects of both websites and applications. Examples include
				platforms like YouTube, which offers both content consumption (website aspect) and content
				creation tools (application aspect).
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Technical Architecture</h3>
			<p class="text-lg">
				Modern web development often utilizes a client-server architecture where:
			</p>
			<div class="mt-3 grid gap-4 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-4">
					<h4 class="font-semibold">Front-end (Client-side)</h4>
					<p>
						Uses HTML, CSS, and JavaScript to create the user interface. The front-end is what users
						see and interact with in their browsers. For web applications, this often includes
						complex state management and data processing.
					</p>
				</div>
				<div class="rounded-lg border bg-gray-50 p-4">
					<h4 class="font-semibold">Back-end (Server-side)</h4>
					<p>
						Handles data processing, storage, and business logic. The back-end typically includes a
						server, database, and APIs that the front-end communicates with to retrieve or store
						data.
					</p>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Future Trends</h3>
			<p class="text-lg">The future of web development is moving toward:</p>
			<ul class="list-disc space-y-2 pl-8 text-lg">
				<li>
					Progressive Web Apps (PWAs) that combine the best of websites and native applications
				</li>
				<li>
					Serverless architectures that reduce the complexity of managing server infrastructure
				</li>
				<li>Edge computing that brings processing closer to the user for improved performance</li>
				<li>Increased use of AI and machine learning to enhance user experiences</li>
				<li>Greater focus on accessibility and inclusive design</li>
			</ul>
		</section>

		<div class="mt-6 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4 italic">
			<p>
				"The best way to predict the future is to implement it." — David Heinemeier Hansson, creator
				of Ruby on Rails
			</p>
		</div>
	</div>
</ModuleTask>
