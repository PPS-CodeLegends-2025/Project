<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'HTML Role in Web Development'
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
			<h3 class="mb-3 text-xl font-semibold">HTML in the Web Ecosystem</h3>
			<p class="text-lg">
				HTML forms the backbone of the modern web, serving as the fundamental layer in the standard
				web technology stack. When we talk about web development, we often refer to three key
				technologies:
			</p>

			<div class="mt-4 grid gap-4 md:grid-cols-3">
				<div class="relative rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
					<div class="absolute top-0 right-0 rounded-bl-lg bg-blue-200 px-2 text-xs font-bold">
						STRUCTURE
					</div>
					<h4 class="mt-2 font-medium text-blue-700">HTML</h4>
					<p class="mt-2">Defines the meaning and structure of web content</p>
				</div>
				<div class="relative rounded-lg border-2 border-pink-200 bg-pink-50 p-4">
					<div class="absolute top-0 right-0 rounded-bl-lg bg-pink-200 px-2 text-xs font-bold">
						PRESENTATION
					</div>
					<h4 class="mt-2 font-medium text-pink-700">CSS</h4>
					<p class="mt-2">Controls the appearance and layout of the content</p>
				</div>
				<div class="relative rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4">
					<div class="absolute top-0 right-0 rounded-bl-lg bg-yellow-200 px-2 text-xs font-bold">
						BEHAVIOR
					</div>
					<h4 class="mt-2 font-medium text-yellow-700">JavaScript</h4>
					<p class="mt-2">Adds interactivity and dynamic functionality</p>
				</div>
			</div>

			<p class="mt-4 text-lg">
				This separation of concerns is a fundamental principle of web development. HTML provides
				structure, CSS adds style, and JavaScript brings interactivity—each with its specific role
				and purpose.
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">The Evolution of HTML's Role</h3>
			<div class="rounded-lg bg-gray-50 p-5">
				<div class="grid gap-6 md:grid-cols-3">
					<div>
						<h4 class="mb-2 font-semibold">Early Web (1990s)</h4>
						<ul class="list-disc space-y-1 pl-5">
							<li>Basic document structure</li>
							<li>Limited styling options</li>
							<li>Focus on academic content</li>
							<li>Simple text and links</li>
						</ul>
					</div>
					<div>
						<h4 class="mb-2 font-semibold">Web 2.0 Era (2000s)</h4>
						<ul class="list-disc space-y-1 pl-5">
							<li>More interactive features</li>
							<li>Separation of structure and style</li>
							<li>Rise of web applications</li>
							<li>Dynamic content generation</li>
						</ul>
					</div>
					<div>
						<h4 class="mb-2 font-semibold">Modern Web (Today)</h4>
						<ul class="list-disc space-y-1 pl-5">
							<li>Semantic markup</li>
							<li>Responsive design foundations</li>
							<li>Accessibility emphasis</li>
							<li>Rich media integration</li>
						</ul>
					</div>
				</div>
				<p class="mt-4">
					HTML5, the current standard, introduced significant advancements like <code
						>&lt;video&gt;</code
					>, <code>&lt;canvas&gt;</code>, semantic tags, and improved form controls—transforming
					HTML from a simple document markup language to a powerful application platform component.
				</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Critical Roles of HTML</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border border-green-200 bg-green-50 p-5">
					<h4 class="mb-2 font-semibold text-green-700">Accessibility</h4>
					<p>
						Well-structured HTML is the foundation of accessible websites. Screen readers and
						assistive technologies rely on semantic HTML to properly interpret content for users
						with disabilities.
					</p>
					<div class="mt-3 rounded bg-white p-2 text-sm">
						<strong>Example:</strong> Using <code>&lt;button&gt;</code> instead of styled
						<code>&lt;div&gt;</code> elements ensures keyboard accessibility and proper screen reader
						announcements.
					</div>
				</div>

				<div class="rounded-lg border border-indigo-200 bg-indigo-50 p-5">
					<h4 class="mb-2 font-semibold text-indigo-700">SEO</h4>
					<p>
						Search engines analyze HTML structure to understand content relevance and importance.
						Proper HTML hierarchy directly impacts your site's visibility in search results.
					</p>
					<div class="mt-3 rounded bg-white p-2 text-sm">
						<strong>Example:</strong> Using <code>&lt;h1&gt;</code> for main page topics and
						<code>&lt;h2&gt;</code>, <code>&lt;h3&gt;</code> for subtopics helps search engines understand
						content hierarchy.
					</div>
				</div>

				<div class="rounded-lg border border-amber-200 bg-amber-50 p-5">
					<h4 class="mb-2 font-semibold text-amber-700">Performance</h4>
					<p>
						Clean, minimal HTML leads to faster page loading. Browsers parse HTML first before
						rendering a page, making efficient markup crucial for performance.
					</p>
					<div class="mt-3 rounded bg-white p-2 text-sm">
						<strong>Example:</strong> Avoiding deeply nested elements and unnecessary wrapper
						<code>&lt;div&gt;</code> tags improves parsing speed.
					</div>
				</div>

				<div class="rounded-lg border border-red-200 bg-red-50 p-5">
					<h4 class="mb-2 font-semibold text-red-700">Cross-Platform Support</h4>
					<p>
						HTML works across all browsers and devices, providing universal access to content
						regardless of operating system or hardware.
					</p>
					<div class="mt-3 rounded bg-white p-2 text-sm">
						<strong>Example:</strong> A properly structured HTML document will display its content on
						everything from the latest smartphones to older desktop browsers.
					</div>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">HTML in Modern Development Workflows</h3>
			<p class="text-lg">
				Despite the emergence of complex frameworks and build tools, HTML remains central to modern
				web development:
			</p>
			<div class="mt-3 rounded-lg bg-gray-50 p-5">
				<ul class="list-disc space-y-2 pl-5">
					<li>
						<strong>Component-Based Development:</strong> Modern frameworks like React and Vue still
						generate HTML—they just abstract the process through JSX or templates
					</li>
					<li>
						<strong>Static Site Generators:</strong> Tools like Gatsby, Next.js and Astro generate optimized
						HTML from templates and content sources
					</li>
					<li>
						<strong>Progressive Web Apps:</strong> Advanced web applications still rely on HTML as their
						structural foundation
					</li>
					<li>
						<strong>Responsive Web Design:</strong> HTML provides the content structure that CSS transforms
						across different screen sizes
					</li>
				</ul>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">HTML as a Career Foundation</h3>
			<p class="text-lg">
				Regardless of specialization, strong HTML knowledge is essential for web professionals:
			</p>
			<div class="mt-3 grid gap-4 md:grid-cols-3">
				<div class="rounded-lg bg-gray-50 p-4">
					<h4 class="font-medium">Frontend Developers</h4>
					<p class="mt-2 text-sm">
						Use HTML daily as the foundation for interfaces, optimizing structure and accessibility
					</p>
				</div>
				<div class="rounded-lg bg-gray-50 p-4">
					<h4 class="font-medium">UX/UI Designers</h4>
					<p class="mt-2 text-sm">
						Need HTML understanding to create designs that translate effectively to code
					</p>
				</div>
				<div class="rounded-lg bg-gray-50 p-4">
					<h4 class="font-medium">Backend Developers</h4>
					<p class="mt-2 text-sm">
						Generate HTML templates or understand how data serves frontend needs
					</p>
				</div>
			</div>
		</section>

		<div class="mt-6 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4">
			<p class="text-lg">
				While JavaScript frameworks and CSS techniques evolve rapidly, HTML's core purpose has
				remained remarkably stable. Mastering HTML fundamentals gives you a lasting foundation that
				will serve you throughout your web development career.
			</p>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Additional Resources</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">HTML Best Practices</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://web.dev/learn/html/"
								target="_blank"
								class="text-indigo-600 hover:underline">Learn HTML - web.dev</a
							>
						</li>
						<li>
							<a
								href="https://www.w3.org/WAI/fundamentals/accessibility-intro/"
								target="_blank"
								class="text-indigo-600 hover:underline">Introduction to Web Accessibility</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">HTML in Modern Development</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://css-tricks.com/why-how-and-when-to-use-semantic-html/"
								target="_blank"
								class="text-indigo-600 hover:underline">CSS-Tricks: Why Use Semantic HTML</a
							>
						</li>
						<li>
							<a
								href="https://developers.google.com/search/docs/beginner/seo-starter-guide"
								target="_blank"
								class="text-indigo-600 hover:underline">Google: SEO Starter Guide</a
							>
						</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</ModuleTask>
