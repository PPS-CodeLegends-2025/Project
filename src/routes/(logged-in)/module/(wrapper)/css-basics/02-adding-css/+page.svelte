<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Adding CSS to HTML'
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
			<h3 class="mb-3 text-xl font-semibold">Three Ways to Add CSS to Your HTML</h3>
			<p class="text-lg">
				There are three primary methods to incorporate CSS into your HTML documents. Each approach
				has its own advantages and appropriate use cases.
			</p>
		</section>

		<div class="rounded-lg border-l-4 border-blue-500 bg-gray-50 p-4">
			<p class="text-lg">
				The method you choose often depends on factors like project size, reusability needs, and
				development workflow. Understanding all three approaches will help you make the best
				decision for your specific situation.
			</p>
		</div>

		<section>
			<h3 class="mb-3 text-xl font-semibold">1. Inline CSS: Styling Individual Elements</h3>
			<p class="text-lg">
				Inline CSS applies styles directly to HTML elements using the <code>style</code> attribute. Each
				element gets its own unique styling instructions.
			</p>

			<div class="mt-4 rounded-lg border bg-white p-5 shadow-sm">
				<h4 class="mb-2 font-semibold text-blue-700">Syntax</h4>
				<div class="rounded bg-gray-100 p-4 font-mono text-sm">
					<pre>&lt;element style="property1: value1; property2: value2;"&gt;Content&lt;/element&gt;</pre>
				</div>

				<h4 class="mt-4 mb-2 font-semibold text-blue-700">Example</h4>
				<div class="grid gap-6 md:grid-cols-2">
					<div>
						<div class="rounded bg-gray-100 p-3 font-mono text-sm">
							<pre>&lt;h1 style="color: blue; font-size: 24px;"&gt;
  Welcome to My Website
&lt;/h1&gt;

&lt;p style="color: gray; line-height: 1.6;"&gt;
  This paragraph has its own styling.
&lt;/p&gt;</pre>
						</div>
					</div>
					<div class="rounded bg-white p-3 shadow-sm">
						<h1 style="color: blue; font-size: 24px;">Welcome to My Website</h1>
						<p style="color: gray; line-height: 1.6;">This paragraph has its own styling.</p>
					</div>
				</div>

				<div class="mt-4 grid gap-4 md:grid-cols-2">
					<div class="rounded-lg border border-green-100 bg-green-50 p-3">
						<h5 class="font-medium text-green-800">Advantages</h5>
						<ul class="mt-1 list-disc pl-5 text-sm">
							<li>Highest specificity - overrides other styles</li>
							<li>Quick for testing or small changes</li>
							<li>No additional files needed</li>
							<li>Styles are applied directly where needed</li>
						</ul>
					</div>
					<div class="rounded-lg border border-red-100 bg-red-50 p-3">
						<h5 class="font-medium text-red-800">Disadvantages</h5>
						<ul class="mt-1 list-disc pl-5 text-sm">
							<li>Mixes content with presentation</li>
							<li>No reusability - styles repeated for similar elements</li>
							<li>Increases HTML size and reduces readability</li>
							<li>Difficult to maintain for larger projects</li>
							<li>No caching benefits</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">2. Internal CSS: Styling a Single Page</h3>
			<p class="text-lg">
				Internal CSS (or embedded CSS) uses the <code>&lt;style&gt;</code> element within the
				<code>&lt;head&gt;</code> section of an HTML document. This method keeps all styles for a single
				page in one place.
			</p>

			<div class="mt-4 rounded-lg border bg-white p-5 shadow-sm">
				<h4 class="mb-2 font-semibold text-blue-700">Syntax</h4>
				<div class="rounded bg-gray-100 p-4 font-mono text-sm">
					<pre>&lt;head&gt;
  &lt;style type="text/css"&gt;
    selector &#123;
      property1: value1;
      property2: value2;
    &#125;
  &lt;/style&gt;
&lt;/head&gt;</pre>
				</div>

				<h4 class="mt-4 mb-2 font-semibold text-blue-700">Example</h4>
				<div class="rounded bg-gray-100 p-3 font-mono text-sm">
					<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;My Website&lt;/title&gt;
  &lt;style&gt;
    h1 &#123;
      color: blue;
      font-size: 24px;
    &#125;
    
    p &#123;
      color: gray;
      line-height: 1.6;
    &#125;
    
    .highlight &#123;
      background-color: yellow;
      padding: 5px;
    &#125;
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Welcome to My Website&lt;/h1&gt;
  &lt;p&gt;This is a regular paragraph.&lt;/p&gt;
  &lt;p class="highlight"&gt;This paragraph is highlighted.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
				</div>

				<div class="mt-4 grid gap-4 md:grid-cols-2">
					<div class="rounded-lg border border-green-100 bg-green-50 p-3">
						<h5 class="font-medium text-green-800">Advantages</h5>
						<ul class="mt-1 list-disc pl-5 text-sm">
							<li>Separates CSS from HTML content</li>
							<li>Styles can be reused within the page</li>
							<li>No additional HTTP requests</li>
							<li>Useful for single-page documents</li>
						</ul>
					</div>
					<div class="rounded-lg border border-red-100 bg-red-50 p-3">
						<h5 class="font-medium text-red-800">Disadvantages</h5>
						<ul class="mt-1 list-disc pl-5 text-sm">
							<li>Styles cannot be reused across multiple pages</li>
							<li>Can increase page load time for large stylesheets</li>
							<li>Mixing HTML and CSS in one file</li>
							<li>No caching benefits between pages</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">3. External CSS: Styling Multiple Pages</h3>
			<p class="text-lg">
				External CSS places all your styles in a separate .css file that is linked to HTML
				documents. This is the most common and recommended approach for most websites.
			</p>

			<div class="mt-4 rounded-lg border bg-white p-5 shadow-sm">
				<h4 class="mb-2 font-semibold text-blue-700">Linking an External Stylesheet</h4>
				<div class="rounded bg-gray-100 p-4 font-mono text-sm">
					<pre>&lt;head&gt;
  &lt;link rel="stylesheet" href="styles.css"&gt;
&lt;/head&gt;</pre>
				</div>

				<h4 class="mt-4 mb-2 font-semibold text-blue-700">Example</h4>
				<div class="grid gap-6 md:grid-cols-2">
					<div>
						<p class="font-medium">HTML File (index.html):</p>
						<div class="rounded bg-gray-100 p-3 font-mono text-sm">
							<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;My Website&lt;/title&gt;
  &lt;link rel="stylesheet" href="styles.css"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Welcome to My Website&lt;/h1&gt;
  &lt;p&gt;This is a regular paragraph.&lt;/p&gt;
  &lt;p class="highlight"&gt;This paragraph is highlighted.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
						</div>
					</div>
					<div>
						<p class="font-medium">CSS File (styles.css):</p>
						<div class="rounded bg-gray-100 p-3 font-mono text-sm">
							<pre>h1 &#123;
  color: blue;
  font-size: 24px;
&#125;

p &#123;
  color: gray;
  line-height: 1.6;
&#125;

.highlight &#123;
  background-color: yellow;
  padding: 5px;
&#125;</pre>
						</div>
					</div>
				</div>

				<div class="mt-4 grid gap-4 md:grid-cols-2">
					<div class="rounded-lg border border-green-100 bg-green-50 p-3">
						<h5 class="font-medium text-green-800">Advantages</h5>
						<ul class="mt-1 list-disc pl-5 text-sm">
							<li>Complete separation of content and presentation</li>
							<li>Reusability across multiple pages</li>
							<li>Better maintainability and organization</li>
							<li>Reduced file size for individual HTML pages</li>
							<li>Browser caching improves performance</li>
							<li>Easier collaboration between developers</li>
						</ul>
					</div>
					<div class="rounded-lg border border-red-100 bg-red-50 p-3">
						<h5 class="font-medium text-red-800">Disadvantages</h5>
						<ul class="mt-1 list-disc pl-5 text-sm">
							<li>Additional HTTP request(s)</li>
							<li>CSS file must be loaded before rendering</li>
							<li>May require additional infrastructure for larger projects</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Combining Multiple Methods</h3>
			<p class="text-lg">
				It's common to use a combination of these methods in real-world projects. For example:
			</p>

			<div class="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4">
				<ul class="list-disc space-y-2 pl-6">
					<li>Use <strong>external CSS</strong> for the majority of your styles</li>
					<li>Use <strong>internal CSS</strong> for page-specific styles or A/B testing</li>
					<li>
						Use <strong>inline CSS</strong> sparingly for dynamically generated content or one-off overrides
					</li>
				</ul>
			</div>

			<p class="mt-4">
				When multiple methods are used together, styles are applied according to CSS specificity
				rules and the cascade order:
			</p>

			<div class="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
				<div class="rounded-lg bg-gray-50 p-4 text-center">
					<span class="text-3xl">1</span>
					<p class="mt-2 font-medium">External CSS</p>
					<p class="text-sm text-gray-600">(Lowest Priority)</p>
				</div>
				<div class="rounded-lg bg-gray-50 p-4 text-center">
					<span class="text-3xl">2</span>
					<p class="mt-2 font-medium">Internal CSS</p>
					<p class="text-sm text-gray-600">(Medium Priority)</p>
				</div>
				<div class="rounded-lg bg-gray-50 p-4 text-center">
					<span class="text-3xl">3</span>
					<p class="mt-2 font-medium">Inline CSS</p>
					<p class="text-sm text-gray-600">(Highest Priority)</p>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Best Practices</h3>
			<div class="mt-2 space-y-3">
				<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
					<h4 class="font-semibold">Prefer external CSS for most projects</h4>
					<p>
						External CSS promotes reusability, maintainability, and leverages browser caching for
						better performance.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
					<h4 class="font-semibold">Organize CSS files logically</h4>
					<p>
						For larger projects, consider splitting CSS into multiple files (e.g., layout.css,
						typography.css, components.css).
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
					<h4 class="font-semibold">Minimize use of inline styles</h4>
					<p>
						Reserve inline styles for exceptional cases like email templates, dynamic styles, or
						one-off overrides.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
					<h4 class="font-semibold">Place stylesheets in the head</h4>
					<p>
						Link to your CSS files in the &lt;head&gt; section to ensure styles are loaded before
						content rendering.
					</p>
				</div>
			</div>
		</section>

		<div class="mt-6 border-l-4 border-green-500 bg-green-50 p-3 pl-4">
			<p class="text-lg">
				Understanding these three methods of adding CSS gives you the flexibility to choose the
				right approach for each project. As your projects grow in size and complexity, you'll likely
				shift from inline and internal styles toward external stylesheets for better organization
				and maintainability.
			</p>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Additional Resources</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Documentation</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN: How CSS is structured</a
							>
						</li>
						<li>
							<a
								href="https://www.w3schools.com/css/css_howto.asp"
								target="_blank"
								class="text-indigo-600 hover:underline">W3Schools: How to Add CSS</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Tools</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://css-tricks.com/css-basics-styling-links-like-boss/"
								target="_blank"
								class="text-indigo-600 hover:underline">CSS-Tricks: Styling Guide</a
							>
						</li>
						<li>
							<a href="https://caniuse.com/" target="_blank" class="text-indigo-600 hover:underline"
								>Can I Use</a
							> - Browser compatibility checker
						</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</ModuleTask>

<style lang="css">
	code {
		font-family: monospace;
		background-color: #f3f4f6;
		padding: 0.1rem 0.3rem;
		border-radius: 0.25rem;
	}

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
