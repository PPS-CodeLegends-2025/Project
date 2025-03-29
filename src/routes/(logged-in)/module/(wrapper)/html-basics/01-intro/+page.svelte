<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'What is HTML?'
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
			<h3 class="mb-3 text-xl font-semibold">Understanding HTML</h3>
			<p class="text-lg">
				HTML (HyperText Markup Language) is the standard markup language that forms the foundation
				of all web pages. Unlike programming languages that execute logic, HTML is a declarative
				language that describes the structure and content of a webpage.
			</p>
			<p class="mt-2 text-lg">
				Every webpage you visit uses HTML as its structural framework. When you view a page in your
				browser, what you're seeing is HTML being rendered into a visual format.
			</p>
		</section>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				<strong>Fun fact:</strong> The term "HyperText" refers to text with links to other texts—the
				concept that allows you to click and navigate between web pages. This interconnected nature of
				documents is what makes the web a "web."
			</p>
		</div>

		<section>
			<h3 class="mb-3 text-xl font-semibold">HTML Elements: The Building Blocks</h3>
			<p class="text-lg">
				HTML uses elements represented by tags to define different components of a webpage. Each
				element serves a specific purpose—from headings and paragraphs to images and links.
			</p>
			<div class="mt-4 rounded-lg bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Anatomy of an HTML Element</h4>
				<div class="rounded bg-gray-800 p-4 text-white">
					<pre>&lt;tagname attribute="value"&gt;Content goes here...&lt;/tagname&gt;</pre>
				</div>
				<ul class="mt-3 list-disc space-y-2 pl-5">
					<li><strong>Opening tag:</strong> &lt;tagname&gt; marks the beginning of an element</li>
					<li><strong>Attributes:</strong> Provide additional information or properties</li>
					<li><strong>Content:</strong> The information displayed or represented</li>
					<li><strong>Closing tag:</strong> &lt;/tagname&gt; marks the end of an element</li>
				</ul>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Key Types of HTML Elements</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Content Elements</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>: Headings of different importance
						</li>
						<li><code>&lt;p&gt;</code>: Paragraphs of text</li>
						<li><code>&lt;img&gt;</code>: Images and graphics</li>
						<li><code>&lt;a&gt;</code>: Hyperlinks to other content</li>
						<li>
							<code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, <code>&lt;li&gt;</code>: Lists
						</li>
						<li><code>&lt;button&gt;</code>: Interactive button elements</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Text Formatting</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li><code>&lt;strong&gt;</code>: Important text (typically bold)</li>
						<li><code>&lt;em&gt;</code>: Emphasized text (typically italic)</li>
						<li><code>&lt;span&gt;</code>: Inline container for text styling</li>
						<li><code>&lt;br&gt;</code>: Line break within text</li>
						<li><code>&lt;code&gt;</code>: Programming code snippets</li>
						<li><code>&lt;blockquote&gt;</code>: Quoted content blocks</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Empty Elements</h3>
			<p class="text-lg">
				Not all HTML elements have closing tags. Elements like <code>&lt;img&gt;</code>,
				<code>&lt;input&gt;</code>, and <code>&lt;br&gt;</code> are "empty" or "self-closing" because
				they don't wrap content.
			</p>
			<div class="mt-2 rounded-lg bg-gray-100 p-3">
				<code>&lt;img src="image.jpg" alt="Description"&gt;</code>
				<div class="mt-2">or in XHTML/strict style:</div>
				<code>&lt;img src="image.jpg" alt="Description" /&gt;</code>
			</div>
		</section>

		<div class="mt-6 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4">
			<p class="text-lg">
				HTML is primarily focused on meaning and structure, not appearance. This separation allows
				web developers to create content once and style it differently for various devices or needs.
				In the following lessons, we'll explore HTML's role in the web ecosystem and dive deeper
				into how HTML documents are structured.
			</p>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Additional Resources</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Reference Documentation</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN HTML Elements Reference</a
							>
						</li>
						<li>
							<a
								href="https://html.spec.whatwg.org/"
								target="_blank"
								class="text-indigo-600 hover:underline">HTML Living Standard</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Interactive Learning</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://www.freecodecamp.org/learn/responsive-web-design/basic-html-and-html5/"
								target="_blank"
								class="text-indigo-600 hover:underline">freeCodeCamp HTML Basics</a
							>
						</li>
						<li>
							<a
								href="https://websitesetup.org/html-tutorial-beginners/"
								target="_blank"
								class="text-indigo-600 hover:underline">WebsiteSetup HTML Cheat Sheet</a
							>
						</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</ModuleTask>
