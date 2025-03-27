<script lang="ts">
	//import type { PageData } from './$types';
	import type { PageData } from '../../../+page';
	import type { Section } from '$lib/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/services/modules';
	import { page } from '$app/stores';

	const sectionData: Section = {
		title: 'Web History'
	};

	let { data }: { data: PageData } = $props();

	const sectionIndex = data.section?.index ?? 0;
	const userId = $page.data.user?.id || 'guest-user';
	const moduleId = data.module?.data?.url || '/module/introduction';

	const taskProps = {
		section: {
			...sectionData,
			...(data.section?.current || {}),
			url: '/module/introduction/02-history'
		},
		nextSection: data.module?.sections[sectionIndex + 1],
		prevSection: data.module?.sections[sectionIndex - 1],
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
	<div class="space-y-6">
		<section>
			<h3 class="mb-3 text-xl font-semibold">The Birth of the World Wide Web (1989-1993)</h3>
			<p class="text-lg">
				The World Wide Web was invented by Sir Tim Berners-Lee in 1989 while working at CERN. His
				vision was to create a global hypertext system that would allow researchers to share
				information. In 1991, he launched the world's first website, a simple text-based page that
				explained the World Wide Web project and provided information on how to create web pages.
			</p>
			<p class="mt-2 text-lg">
				In 1993, CERN announced that the World Wide Web would be free for everyone to use and
				develop, which was a pivotal moment for its global adoption.
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">The Foundation: HTML, CSS, and JavaScript</h3>
			<div class="grid gap-4 md:grid-cols-3">
				<div class="rounded-lg border bg-gray-50 p-4">
					<h4 class="font-semibold">HTML (1993)</h4>
					<p>
						Created by Tim Berners-Lee as the standard markup language for creating web pages and
						applications.
					</p>
				</div>
				<div class="rounded-lg border bg-gray-50 p-4">
					<h4 class="font-semibold">CSS (1996)</h4>
					<p>
						Developed by Håkon Wium Lie, CSS separated content from presentation, allowing designers
						to control layout and appearance.
					</p>
				</div>
				<div class="rounded-lg border bg-gray-50 p-4">
					<h4 class="font-semibold">JavaScript (1995)</h4>
					<p>
						Created by Brendan Eich at Netscape, it brought interactivity to web pages and later
						became the backbone of modern web applications.
					</p>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">The Browser Wars (1995-2001)</h3>
			<p class="text-lg">
				The mid-1990s saw fierce competition between Netscape Navigator and Microsoft's Internet
				Explorer. This period, known as the "Browser Wars," led to rapid innovation but also
				fragmentation as each browser implemented proprietary features, making it difficult for
				developers to create websites that worked consistently across browsers.
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Web Standards and Modern Development</h3>
			<p class="text-lg">
				The 2000s saw the rise of web standards with the World Wide Web Consortium (W3C) working to
				create specifications that all browsers should follow. This era also introduced AJAX (2005),
				enabling more interactive web applications without full page reloads.
			</p>
			<p class="mt-2 text-lg">
				The 2010s brought responsive web design, mobile-first development, and the rise of
				JavaScript frameworks like Angular, React, and Vue.js. Single Page Applications (SPAs)
				became common, and performance optimization became increasingly important as web
				applications grew more complex.
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Modern Web Development</h3>
			<p class="text-lg">
				Today's web development landscape includes technologies like Progressive Web Apps (PWAs),
				WebAssembly, and serverless architectures. The focus has shifted toward user experience,
				accessibility, and performance across all devices. The evolution continues as developers
				push the boundaries of what's possible on the web.
			</p>
		</section>

		<div class="mt-6 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4 italic">
			<p>
				"The Web as I envisaged it, we have not seen it yet. The future is still so much bigger than
				the past." — Tim Berners-Lee
			</p>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Additional Resources</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Historical Documents & Archives</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="http://info.cern.ch/hypertext/WWW/TheProject.html"
								target="_blank"
								class="text-indigo-600 hover:underline">The First Website Ever Created</a
							>
						</li>
						<li>
							<a
								href="https://home.web.cern.ch/science/computing/birth-web"
								target="_blank"
								class="text-indigo-600 hover:underline">CERN: Birth of the Web</a
							>
						</li>
						<li>
							<a
								href="https://www.w3.org/History.html"
								target="_blank"
								class="text-indigo-600 hover:underline">W3C: History of the Web</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Videos & Documentaries</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://www.youtube.com/watch?v=J8hzJxb0rpc"
								target="_blank"
								class="text-indigo-600 hover:underline">The Invention of the Internet (YouTube)</a
							>
						</li>
						<li>
							<a
								href="https://www.youtube.com/watch?v=21eFwbb48sE"
								target="_blank"
								class="text-indigo-600 hover:underline"
								>Sir Tim Berners-Lee: The World Wide Web (TED Talk)</a
							>
						</li>
						<li>
							<a
								href="https://www.youtube.com/watch?v=AHVzSnzlnSs"
								target="_blank"
								class="text-indigo-600 hover:underline">History of JavaScript (YouTube)</a
							>
						</li>
					</ul>
				</div>
			</div>
			<div class="mt-4">
				<h4 class="mb-2 font-semibold">Interactive Timeline</h4>
				<a
					href="https://web.archive.org/web/20190826012053/http://www.evolutionoftheweb.com/"
					target="_blank"
					class="text-indigo-600 hover:underline">The Evolution of the Web (Interactive)</a
				> - A beautiful visualization of web technologies and browsers over time.
			</div>
		</section>
	</div>
</ModuleTask>
