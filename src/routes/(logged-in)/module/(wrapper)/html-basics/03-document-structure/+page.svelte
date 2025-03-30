<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Anatomy of an HTML Document'
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
			<h3 class="mb-3 text-xl font-semibold">The Blueprint of Every Webpage</h3>
			<p class="text-lg">
				Every HTML document follows a standard structure that creates the framework for your web
				content. Understanding this structure is like learning the anatomy of a building – it helps
				you know where and how to place different components to create a stable, well-functioning
				result.
			</p>

			<div class="mt-4 rounded-lg bg-gray-50 p-5">
				<div class="rounded bg-gray-800 p-4 font-mono text-sm text-white">
					<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document Title&lt;/title&gt;
    &lt;link rel="stylesheet" href="styles.css"&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Main Heading&lt;/h1&gt;
    &lt;p&gt;This is where your visible content lives.&lt;/p&gt;
    &lt;script src="script.js"&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
				</div>
				<p class="mt-3">
					This basic structure is shared by virtually every HTML document on the web, from simple
					pages to complex applications.
				</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">The DOCTYPE Declaration</h3>
			<p class="text-lg">
				The first line of every HTML document should be the DOCTYPE declaration. It tells browsers
				which version of HTML the page is using, helping them render the page correctly.
			</p>

			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border border-blue-200 bg-blue-50 p-5">
					<h4 class="mb-2 font-semibold">HTML5 DOCTYPE</h4>
					<div class="rounded bg-white p-3 font-mono">&lt;!DOCTYPE html&gt;</div>
					<p class="mt-2">
						The simple HTML5 declaration is clean and straightforward. It's the standard for modern
						web development.
					</p>
				</div>

				<div class="rounded-lg border border-amber-200 bg-amber-50 p-5">
					<h4 class="mb-2 font-semibold">Historical DOCTYPEs</h4>
					<div class="rounded bg-white p-3 font-mono text-xs">
						&lt;!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
						"http://www.w3.org/TR/html4/strict.dtd"&gt;
					</div>
					<p class="mt-2">
						Older HTML versions used more complex declarations that specified exact DTD (Document
						Type Definition) information.
					</p>
				</div>
			</div>

			<div class="mt-4 border-l-4 border-yellow-500 bg-yellow-50 p-4">
				<p>
					<strong>Why it matters:</strong> Without a DOCTYPE, browsers enter "quirks mode," which can
					cause inconsistent rendering across different browsers. The DOCTYPE ensures "standards mode"
					is used.
				</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">The &lt;html&gt; Element: The Root</h3>
			<p class="text-lg">
				The <code>&lt;html&gt;</code> element is the root element that contains all other HTML elements
				on the page. It's like the foundation of a house – everything else is built inside it.
			</p>

			<div class="mt-4 rounded-lg bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Key Attributes</h4>
				<ul class="list-disc space-y-3 pl-5">
					<li>
						<strong>lang:</strong> Specifies the language of the document
						<div class="mt-1 rounded bg-white p-2 font-mono">&lt;html lang="en"&gt;</div>
						<p class="mt-1 text-sm">
							This helps search engines and screen readers understand the document language. Use
							country codes for specific dialects (e.g., "en-US", "fr-CA").
						</p>
					</li>
					<li>
						<strong>dir:</strong> Specifies the text direction
						<div class="mt-1 rounded bg-white p-2 font-mono">&lt;html dir="rtl"&gt;</div>
						<p class="mt-1 text-sm">
							Use "ltr" for left-to-right languages (default) or "rtl" for right-to-left languages
							like Arabic or Hebrew.
						</p>
					</li>
				</ul>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">The &lt;head&gt; Section: The "Invisible" Part</h3>
			<p class="text-lg">
				The <code>&lt;head&gt;</code> section contains metadata about the document – information that
				isn't directly displayed on the page but is crucial for browsers, search engines, and other web
				services.
			</p>

			<div class="mt-4 rounded-lg bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Common Head Elements</h4>
				<div class="grid gap-4 md:grid-cols-2">
					<div>
						<h5 class="font-medium text-indigo-700">Title Tag</h5>
						<div class="mt-1 rounded bg-white p-2 font-mono">
							&lt;title&gt;Page Title&lt;/title&gt;
						</div>
						<p class="mt-1 text-sm">
							Defines the title shown in browser tabs and search results. This is the only required
							element in the &lt;head&gt;.
						</p>
					</div>

					<div>
						<h5 class="font-medium text-indigo-700">Character Encoding</h5>
						<div class="mt-1 rounded bg-white p-2 font-mono">&lt;meta charset="utf-8"&gt;</div>
						<p class="mt-1 text-sm">
							Specifies the character encoding for the document. UTF-8 is recommended as it supports
							all characters and symbols.
						</p>
					</div>

					<div>
						<h5 class="font-medium text-indigo-700">Viewport Settings</h5>
						<div class="mt-1 rounded bg-white p-2 font-mono">
							&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
						</div>
						<p class="mt-1 text-sm">
							Controls how the page is displayed on mobile devices. Critical for responsive design.
						</p>
					</div>

					<div>
						<h5 class="font-medium text-indigo-700">CSS Stylesheets</h5>
						<div class="mt-1 rounded bg-white p-2 font-mono">
							&lt;link rel="stylesheet" href="styles.css"&gt;
						</div>
						<p class="mt-1 text-sm">Links external CSS files to style the page.</p>
					</div>

					<div>
						<h5 class="font-medium text-indigo-700">JavaScript</h5>
						<div class="mt-1 rounded bg-white p-2 font-mono">
							&lt;script src="script.js"&gt;&lt;/script&gt;
						</div>
						<p class="mt-1 text-sm">
							Links or contains JavaScript code (can also be placed just before the closing
							&lt;/body&gt; tag).
						</p>
					</div>

					<div>
						<h5 class="font-medium text-indigo-700">Meta Description</h5>
						<div class="mt-1 rounded bg-white p-2 font-mono">
							&lt;meta name="description" content="Page description"&gt;
						</div>
						<p class="mt-1 text-sm">Provides a brief summary of the page used in search results.</p>
					</div>
				</div>
			</div>

			<div class="mt-4 border-l-4 border-green-500 bg-green-50 p-4">
				<p>
					<strong>Pro tip:</strong> A well-structured &lt;head&gt; section is crucial for SEO, social
					sharing, and browser compatibility. Don't skip these metadata elements!
				</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">The &lt;body&gt; Element: Where Content Lives</h3>
			<p class="text-lg">
				The <code>&lt;body&gt;</code> element contains all the content that users will see and interact
				with on your webpage. This is where your headings, paragraphs, images, forms, and interactive
				elements go.
			</p>

			<div class="mt-4 rounded-lg bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Proper Body Structure</h4>
				<div class="rounded bg-white p-4 font-mono text-sm">
					<pre>&lt;body&gt;
  &lt;header&gt;
    &lt;nav&gt;
      &lt;!-- Navigation links --&gt;
    &lt;/nav&gt;
  &lt;/header&gt;
  
  &lt;main&gt;
    &lt;section&gt;
      &lt;h1&gt;Main Heading&lt;/h1&gt;
      &lt;p&gt;Primary content goes here.&lt;/p&gt;
    &lt;/section&gt;
    
    &lt;article&gt;
      &lt;h2&gt;Article Title&lt;/h2&gt;
      &lt;p&gt;Article content here.&lt;/p&gt;
    &lt;/article&gt;
  &lt;/main&gt;
  
  &lt;footer&gt;
    &lt;!-- Footer content --&gt;
  &lt;/footer&gt;
  
  &lt;script src="script.js"&gt;&lt;/script&gt;
&lt;/body&gt;</pre>
				</div>
			</div>

			<div class="mt-4 grid gap-4 md:grid-cols-2">
				<div class="rounded-lg border border-indigo-100 p-4">
					<h4 class="font-medium text-indigo-700">Semantic Sections</h4>
					<p class="mt-1">
						The body typically contains semantic elements like <code>&lt;header&gt;</code>,
						<code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>,
						<code>&lt;article&gt;</code>, and <code>&lt;footer&gt;</code> that give structure and meaning
						to your content.
					</p>
				</div>

				<div class="rounded-lg border border-indigo-100 p-4">
					<h4 class="font-medium text-indigo-700">Script Placement</h4>
					<p class="mt-1">
						JavaScript <code>&lt;script&gt;</code> tags are often placed just before the closing
						<code>&lt;/body&gt;</code> tag for better page loading performance, allowing HTML to load
						first.
					</p>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Comments in HTML</h3>
			<p class="text-lg">
				HTML comments allow you to add notes to your code that aren't displayed in the browser.
				They're useful for documentation, organization, or temporarily disabling code.
			</p>

			<div class="mt-4 rounded-lg bg-gray-50 p-5">
				<div class="rounded bg-white p-3 font-mono">&lt;!-- This is an HTML comment --&gt;</div>
				<p class="mt-2">
					Comments can span multiple lines and are ignored by browsers when rendering the page.
				</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Document Structure Best Practices</h3>
			<div class="mt-2 space-y-3">
				<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
					<h4 class="font-semibold">Always include the basic structure</h4>
					<p>
						Even for simple pages, include DOCTYPE, html, head, and body elements for proper
						rendering and functionality.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
					<h4 class="font-semibold">Add the language attribute</h4>
					<p>
						Always specify the document language with the lang attribute on the html element for
						accessibility and SEO.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
					<h4 class="font-semibold">Include meta viewport for responsive design</h4>
					<p>
						This ensures proper display on mobile devices and is essential for modern web
						development.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
					<h4 class="font-semibold">Use semantic structure</h4>
					<p>
						Organize your body content with semantic elements rather than generic div elements
						wherever possible.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
					<h4 class="font-semibold">Write meaningful titles</h4>
					<p>
						Craft descriptive, concise page titles that help users and search engines understand
						your content.
					</p>
				</div>
			</div>
		</section>

		<div class="mt-6 rounded-lg bg-blue-50 p-6">
			<h3 class="mb-3 text-xl font-semibold">Why Structure Matters</h3>
			<p class="text-lg">
				A proper HTML document structure isn't just about following rules—it provides real benefits:
			</p>
			<ul class="mt-3 list-disc space-y-2 pl-6 text-lg">
				<li>
					<strong>Accessibility:</strong> Screen readers and assistive technologies rely on proper document
					structure
				</li>
				<li>
					<strong>SEO:</strong> Search engines use document structure to understand and index content
				</li>
				<li>
					<strong>Maintainability:</strong> Well-structured documents are easier to update and modify
				</li>
				<li>
					<strong>Rendering:</strong> Browsers render standards-compliant HTML more consistently
				</li>
				<li>
					<strong>Performance:</strong> Properly structured documents often load and render more efficiently
				</li>
			</ul>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Additional Resources</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Documentation</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN: Document and Website Structure</a
							>
						</li>
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN: The Head Metadata Element</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Tools</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://validator.w3.org/"
								target="_blank"
								class="text-indigo-600 hover:underline">W3C HTML Validator</a
							> - Check if your HTML structure is valid
						</li>
						<li>
							<a
								href="https://realfavicongenerator.net/"
								target="_blank"
								class="text-indigo-600 hover:underline">Favicon Generator</a
							> - Generate proper favicon code for your head section
						</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</ModuleTask>
