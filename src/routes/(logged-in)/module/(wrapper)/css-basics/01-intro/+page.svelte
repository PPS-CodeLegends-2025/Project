<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'What is CSS?'
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
			<h3 class="mb-3 text-xl font-semibold">Understanding CSS</h3>
			<p class="text-lg">
				CSS (Cascading Style Sheets) is the design language of the web. If HTML provides the
				structure and content of a webpage, CSS is what makes it visually appealing and
				well-organized.
			</p>
			<p class="mt-2 text-lg">
				With CSS, you can control colors, fonts, spacing, layout, animations, and responsive design
				– essentially everything related to how your web pages look and feel.
			</p>
		</section>

		<div class="rounded-lg border-l-4 border-blue-500 bg-gray-50 p-4">
			<p class="text-lg">
				<strong>Fun fact:</strong> The term "Cascading" in CSS refers to the way style rules cascade
				(or flow) through your document, with different levels of specificity determining which styles
				take precedence.
			</p>
		</div>

		<section>
			<h3 class="mb-3 text-xl font-semibold">The Importance of CSS in Web Development</h3>
			<p class="text-lg">
				CSS is not just about making websites look pretty – it's essential for creating effective
				and accessible web experiences:
			</p>
			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border border-purple-200 bg-purple-50 p-5">
					<h4 class="mb-2 font-semibold text-purple-700">User Experience</h4>
					<p>
						CSS improves readability, navigation, and overall user satisfaction through thoughtful
						design. A well-styled site guides users naturally through content and increases
						engagement.
					</p>
				</div>

				<div class="rounded-lg border border-green-200 bg-green-50 p-5">
					<h4 class="mb-2 font-semibold text-green-700">Responsive Design</h4>
					<p>
						CSS enables websites to adapt to different screen sizes and devices – critical in our
						mobile-first world where users access content on phones, tablets, and desktops.
					</p>
				</div>

				<div class="rounded-lg border border-amber-200 bg-amber-50 p-5">
					<h4 class="mb-2 font-semibold text-amber-700">Brand Identity</h4>
					<p>
						Consistent use of colors, typography, and visual elements through CSS helps establish
						and reinforce brand recognition across web properties.
					</p>
				</div>

				<div class="rounded-lg border border-blue-200 bg-blue-50 p-5">
					<h4 class="mb-2 font-semibold text-blue-700">Performance</h4>
					<p>
						Modern CSS techniques improve page load times and reduce bandwidth usage compared to
						using images for design elements or inline styling.
					</p>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">CSS Syntax: The Building Blocks</h3>
			<p class="text-lg">
				CSS uses a straightforward syntax of selectors and declarations to define how HTML elements
				should be displayed.
			</p>
			<div class="mt-4 rounded-lg bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Anatomy of a CSS Rule</h4>
				<div class="rounded bg-gray-800 p-4 text-white">
					<pre>selector &#123;
    property: value;
    another-property: value;
&#125;</pre>
				</div>
				<ul class="mt-3 list-disc space-y-2 pl-5">
					<li><strong>Selector:</strong> Targets the HTML element(s) you want to style</li>
					<li><strong>Property:</strong> The aspect you want to change (e.g., color, font-size)</li>
					<li><strong>Value:</strong> The specific setting for the property</li>
					<li><strong>Declaration:</strong> The property and value together</li>
					<li><strong>Declaration block:</strong> All declarations within the curly braces</li>
				</ul>
			</div>

			<div class="mt-4 border-l-4 border-indigo-500 bg-indigo-50 p-4">
				<h4 class="font-semibold">Basic CSS Syntax Examples</h4>
				<div class="mt-2 grid gap-4 md:grid-cols-2">
					<div class="rounded bg-white p-3 font-mono text-sm">
						<p class="font-medium text-indigo-700">Element Selector:</p>
						<pre>p &#123;
  color: navy;
  font-size: 16px;
&#125;</pre>
						<p class="mt-1 text-xs">Targets all paragraph elements</p>
					</div>
					<div class="rounded bg-white p-3 font-mono text-sm">
						<p class="font-medium text-indigo-700">Class Selector:</p>
						<pre>.button &#123;
  background-color: #007bff;
  padding: 10px 15px;
&#125;</pre>
						<p class="mt-1 text-xs">Targets elements with class="button"</p>
					</div>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Ways to Add CSS to HTML</h3>
			<div class="grid gap-6 md:grid-cols-3">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold text-blue-700">External CSS</h4>
					<p>Link an external CSS file to your HTML document:</p>
					<div class="mt-2 rounded bg-gray-100 p-3 font-mono text-sm">
						<pre>&lt;head&gt;
  &lt;link rel="stylesheet" href="styles.css" type="text/css"&gt;
&lt;/head&gt;</pre>
					</div>
					<p class="mt-2 text-sm">Best for most websites. Keeps HTML and CSS separate.</p>
				</div>

				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold text-blue-700">Internal CSS</h4>
					<p>Define styles in the head section:</p>
					<div class="mt-2 rounded bg-gray-100 p-3 font-mono text-sm">
						<pre>&lt;head&gt;
  &lt;style type="text/css"&gt;
    body &#123; 
      background: #f5f5f5; 
    &#125;
  &lt;/style&gt;
&lt;/head&gt;</pre>
					</div>
					<p class="mt-2 text-sm">Useful for single-page documents.</p>
				</div>

				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold text-blue-700">Inline CSS</h4>
					<p>Apply styles directly to elements:</p>
					<div class="mt-2 rounded bg-gray-100 p-3 font-mono text-sm">
						<pre>&lt;p style="color: blue; font-size: 18px;"&gt;
  Styled text
&lt;/p&gt;</pre>
					</div>
					<p class="mt-2 text-sm">Use sparingly for unique, one-off styles.</p>
				</div>
			</div>
		</section>

		<div class="mt-6 border-l-4 border-green-500 bg-green-50 p-3 pl-4">
			<p class="text-lg">
				In this course, we'll explore the incredible power and flexibility of CSS, from basic
				styling to complex layouts and animations. You'll learn how to transform simple HTML
				structures into beautiful, responsive web designs.
			</p>
			<p class="mt-2 text-lg">
				Remember that CSS is a skill that improves with practice. Even the most basic understanding
				of CSS can dramatically improve the appearance and functionality of your websites.
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
								href="https://developer.mozilla.org/en-US/docs/Web/CSS"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN CSS Documentation</a
							>
						</li>
						<li>
							<a
								href="https://www.w3.org/Style/CSS/"
								target="_blank"
								class="text-indigo-600 hover:underline">W3C CSS Specifications</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Interactive Learning</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://css-tricks.com/"
								target="_blank"
								class="text-indigo-600 hover:underline">CSS-Tricks</a
							>
						</li>
						<li>
							<a
								href="https://flexboxfroggy.com/"
								target="_blank"
								class="text-indigo-600 hover:underline">Flexbox Froggy</a
							> - A game for learning CSS flexbox
						</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</ModuleTask>

<style lang="css">
	pre {
		white-space: pre-wrap;
		word-wrap: break-word;
		overflow-x: auto;
		max-width: 100%;
	}

	.rounded.bg-gray-100 {
		overflow-x: auto;
	}
</style>
