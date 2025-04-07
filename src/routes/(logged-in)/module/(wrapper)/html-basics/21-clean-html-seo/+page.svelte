<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';
	import { Accordion, AccordionItem } from '$lib/components/ui/accordion';

	const sectionData: Section = {
		title: 'Writing Clean HTML & Basic SEO'
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
			<h3 class="mb-3 text-xl font-semibold">Clean, Readable HTML: A Professional Approach</h3>
			<p class="text-lg">
				Writing clean, well-formatted HTML isn't just about making your code look nice—it's about
				making it maintainable, accessible, and easier to collaborate on. As you build more complex
				websites, good HTML practices become increasingly valuable.
			</p>
		</section>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				<strong>Why clean HTML matters:</strong> Code is read more often than it's written. Clean HTML
				makes your work more professional, easier to maintain, and helps others understand your code
				quickly—an essential skill for any developer.
			</p>
		</div>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Best Practices for Clean HTML</h3>

			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border border-green-200 bg-green-50 p-5">
					<h4 class="mb-2 font-semibold text-green-700">Proper Indentation</h4>
					<p>
						Consistent indentation creates a visual hierarchy that makes HTML structure easier to
						understand at a glance.
					</p>
					<div class="mt-3 grid grid-cols-2 gap-4">
						<div>
							<h5 class="text-sm font-semibold text-red-700">❌ Messy</h5>
							<div class="rounded bg-white p-3 font-mono text-sm">
								<pre>&lt;div&gt;
&lt;h2&gt;Title&lt;/h2&gt;
&lt;ul&gt;
&lt;li&gt;Item 1&lt;/li&gt;
&lt;li&gt;Item 2&lt;/li&gt;
&lt;/ul&gt;
&lt;/div&gt;</pre>
							</div>
						</div>
						<div>
							<h5 class="text-sm font-semibold text-green-700">✅ Clean</h5>
							<div class="rounded bg-white p-3 font-mono text-sm">
								<pre>&lt;div&gt;
  &lt;h2&gt;Title&lt;/h2&gt;
  &lt;ul&gt;
    &lt;li&gt;Item 1&lt;/li&gt;
    &lt;li&gt;Item 2&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;</pre>
							</div>
						</div>
					</div>
				</div>

				<div class="rounded-lg border border-blue-200 bg-blue-50 p-5">
					<h4 class="mb-2 font-semibold text-blue-700">Meaningful Class & ID Names</h4>
					<p>Use descriptive names that explain the purpose of elements, not their appearance.</p>
					<div class="mt-3 grid grid-cols-2 gap-4">
						<div>
							<h5 class="text-sm font-semibold text-red-700">❌ Poor</h5>
							<div class="rounded bg-white p-3 font-mono text-sm">
								<pre>&lt;div class="blue-box"&gt;
  &lt;p class="big-text"&gt;...&lt;/p&gt;
&lt;/div&gt;</pre>
							</div>
						</div>
						<div>
							<h5 class="text-sm font-semibold text-green-700">✅ Better</h5>
							<div class="rounded bg-white p-3 font-mono text-sm">
								<pre>&lt;div class="feature-card"&gt;
  &lt;p class="card-title"&gt;...&lt;/p&gt;
&lt;/div&gt;</pre>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border border-purple-200 bg-purple-50 p-5">
					<h4 class="mb-2 font-semibold text-purple-700">Logical Document Structure</h4>
					<p>Organize your HTML in a logical way that follows content hierarchy.</p>
					<div class="mt-3 rounded bg-white p-3 font-mono text-sm">
						<pre>&lt;header&gt;
  &lt;h1&gt;Site Title&lt;/h1&gt;
  &lt;nav&gt;...&lt;/nav&gt;
&lt;/header&gt;

&lt;main&gt;
  &lt;section&gt;
    &lt;h2&gt;Section Title&lt;/h2&gt;
    &lt;p&gt;Content...&lt;/p&gt;
  &lt;/section&gt;
&lt;/main&gt;

&lt;footer&gt;...&lt;/footer&gt;</pre>
					</div>
				</div>

				<div class="rounded-lg border border-amber-200 bg-amber-50 p-5">
					<h4 class="mb-2 font-semibold text-amber-700">Consistent Formatting</h4>
					<p>Follow consistent conventions for attribute ordering, quotes, and spacing.</p>
					<div class="mt-3 rounded bg-white p-3 font-mono text-sm">
						<pre>&lt;!-- Consistent attribute ordering --&gt;
&lt;a 
  id="main-link" 
  class="button primary" 
  href="https://example.com" 
  target="_blank" 
  rel="noopener"
&gt;
  Visit Site
&lt;/a&gt;</pre>
					</div>
				</div>
			</div>

			<div class="mt-4 rounded-lg border border-red-200 bg-red-50 p-5">
				<h4 class="mb-2 font-semibold text-red-700">Common HTML Code Smells to Avoid</h4>
				<ul class="list-disc space-y-2 pl-5">
					<li>
						<strong>Div Soup</strong> - Overusing generic <code>&lt;div&gt;</code> elements instead of
						semantic HTML
					</li>
					<li><strong>Orphaned Tags</strong> - Forgetting to close tags, creating invalid HTML</li>
					<li>
						<strong>Inconsistent Casing</strong> - Mixing uppercase/lowercase in element or attribute
						names
					</li>
					<li>
						<strong>Inline Styles</strong> - Overusing style attributes instead of external CSS
					</li>
					<li>
						<strong>Huge Files</strong> - Creating overly long HTML files instead of breaking them into
						components
					</li>
				</ul>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">HTML for Better SEO</h3>
			<p class="text-lg">
				Search Engine Optimization (SEO) helps your website rank higher in search results.
				Well-structured HTML plays a crucial role in helping search engines understand your content.
			</p>

			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<h4 class="mb-2 font-semibold text-indigo-700">The Power of the Title Tag</h4>
					<p>
						The <code>&lt;title&gt;</code> element is one of the most important on-page SEO factors.
						It appears in:
					</p>
					<ul class="mt-2 list-disc space-y-1 pl-5">
						<li>Browser tabs</li>
						<li>Search engine results</li>
						<li>Social media shares</li>
						<li>Browser bookmarks</li>
					</ul>
					<div class="mt-3 rounded bg-gray-100 p-3 font-mono text-sm">
						<pre>&lt;head&gt;
  &lt;title&gt;Concise, Keyword-Rich Title | Brand Name&lt;/title&gt;
&lt;/head&gt;</pre>
					</div>
					<p class="mt-2 text-sm">
						<strong>Best Practice:</strong> Keep titles under 60 characters, include your primary keyword
						near the beginning, and make it compelling.
					</p>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<h4 class="mb-2 font-semibold text-indigo-700">Essential Meta Tags</h4>
					<p>
						Meta tags provide information about your page to search engines and website visitors.
					</p>
					<div class="mt-3 rounded bg-gray-100 p-3 font-mono text-sm">
						<pre>&lt;head&gt;
  &lt;meta charset="utf-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
  &lt;meta name="description" content="A clear, compelling description of your page that includes keywords naturally."&gt;
  
  &lt;!-- Open Graph tags for social sharing --&gt;
  &lt;meta property="og:title" content="Page Title"&gt;
  &lt;meta property="og:description" content="Page description"&gt;
  &lt;meta property="og:image" content="image-url.jpg"&gt;
&lt;/head&gt;</pre>
					</div>
					<p class="mt-2 text-sm">
						<strong>Best Practice:</strong> Write unique, descriptive meta descriptions under 155 characters
						that encourage clicks.
					</p>
				</div>
			</div>

			<div class="mt-6">
				<h4 class="mb-3 font-semibold">The SEO Importance of Image Alt Text</h4>
				<p class="text-lg">
					The <code>alt</code> attribute isn't just for accessibility—it's a powerful SEO tool that helps
					search engines understand your images.
				</p>

				<div class="mt-4 grid gap-4 md:grid-cols-3">
					<div class="rounded-lg border-l-4 border-red-300 bg-red-50 p-3">
						<h5 class="font-semibold text-red-700">❌ Poor Alt Text</h5>
						<div class="rounded bg-white p-2 font-mono text-sm">
							&lt;img src="img1.jpg" alt="image"&gt;
						</div>
						<p class="mt-2 text-sm">Too vague, provides no context or value</p>
					</div>

					<div class="rounded-lg border-l-4 border-amber-300 bg-amber-50 p-3">
						<h5 class="font-semibold text-amber-700">⚠️ Better Alt Text</h5>
						<div class="rounded bg-white p-2 font-mono text-sm">
							&lt;img src="img1.jpg" alt="red shoes"&gt;
						</div>
						<p class="mt-2 text-sm">Basic description but lacks detail</p>
					</div>

					<div class="rounded-lg border-l-4 border-green-300 bg-green-50 p-3">
						<h5 class="font-semibold text-green-700">✅ Good Alt Text</h5>
						<div class="rounded bg-white p-2 font-mono text-sm">
							&lt;img src="img1.jpg" alt="Women's Nike Air Max red running shoes"&gt;
						</div>
						<p class="mt-2 text-sm">Descriptive, includes keywords naturally</p>
					</div>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Semantic HTML: The SEO Secret Weapon</h3>
			<p class="text-lg">
				Using the right HTML elements for their intended purpose helps search engines better
				understand your content.
			</p>

			<div class="mt-4 rounded-lg border bg-white p-5 shadow-sm">
				<h4 class="mb-2 font-semibold">SEO-Friendly Elements</h4>
				<div class="grid gap-4 md:grid-cols-2">
					<div>
						<ul class="list-disc space-y-2 pl-5">
							<li>
								<strong>&lt;h1&gt; to &lt;h6&gt;</strong> - Use proper heading hierarchy with keywords
							</li>
							<li><strong>&lt;main&gt;</strong> - Identifies the main content of the page</li>
							<li><strong>&lt;article&gt;</strong> - For self-contained content pieces</li>
							<li><strong>&lt;section&gt;</strong> - For thematic grouping of content</li>
							<li><strong>&lt;nav&gt;</strong> - Identifies navigation sections</li>
						</ul>
					</div>
					<div>
						<ul class="list-disc space-y-2 pl-5">
							<li>
								<strong>&lt;header&gt; and &lt;footer&gt;</strong> - Clearly define page sections
							</li>
							<li><strong>&lt;strong&gt; and &lt;em&gt;</strong> - Highlight important text</li>
							<li>
								<strong>&lt;figure&gt; and &lt;figcaption&gt;</strong> - Connect images with captions
							</li>
							<li><strong>&lt;time&gt;</strong> - Mark dates and times properly</li>
							<li><strong>&lt;address&gt;</strong> - Format contact information</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<div class="mt-6 rounded-lg bg-blue-50 p-6">
			<h3 class="mb-3 text-xl font-semibold">Putting It All Together</h3>

			<Accordion className="mt-3">
				<AccordionItem value="seo-example">
					<svelte:fragment slot="trigger">Complete SEO-Friendly HTML Example</svelte:fragment>
					<div class="rounded bg-gray-100 p-4 font-mono text-sm">
						<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="utf-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
  &lt;title&gt;Beginner's Guide to HTML Basics | CodeLegends&lt;/title&gt;
  &lt;meta name="description" content="Learn the fundamentals of HTML with our comprehensive beginner's guide. Structured tutorials and practical examples to get you started with web development."&gt;
  &lt;meta name="keywords" content="HTML basics, learn HTML, beginner HTML tutorial"&gt;
  &lt;meta name="author" content="CodeLegends Team"&gt;
  
  &lt;!-- Open Graph / Social Media --&gt;
  &lt;meta property="og:title" content="Beginner's Guide to HTML Basics"&gt;
  &lt;meta property="og:description" content="Learn HTML fundamentals with our comprehensive guide for beginners."&gt;
  &lt;meta property="og:image" content="https://example.com/images/html-guide-cover.jpg"&gt;
  &lt;meta property="og:url" content="https://example.com/html-basics-guide"&gt;
  
  &lt;link rel="stylesheet" href="styles.css"&gt;
&lt;/head&gt;

&lt;body&gt;
  &lt;header&gt;
    &lt;nav&gt;
      &lt;ul&gt;
        &lt;li&gt;&lt;a href="/">Home&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="/tutorials">Tutorials&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="/contact">Contact&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/nav&gt;
  &lt;/header&gt;

  &lt;main&gt;
    &lt;article&gt;
      &lt;header&gt;
        &lt;h1&gt;Beginner's Guide to HTML Basics&lt;/h1&gt;
        &lt;p&gt;Published: &lt;time datetime="2023-11-15"&gt;November 15, 2023&lt;/time&gt; by &lt;address class="author"&gt;Emma Davis&lt;/address&gt;&lt;/p&gt;
      &lt;/header&gt;

      &lt;section&gt;
        &lt;h2&gt;What is HTML?&lt;/h2&gt;
        &lt;p&gt;&lt;strong&gt;HTML&lt;/strong&gt; (HyperText Markup Language) is the standard markup language for creating web pages.&lt;/p&gt;
        
        &lt;figure&gt;
          &lt;img src="html-structure-diagram.jpg" alt="Diagram showing basic HTML document structure with head and body sections" width="600" height="400"&gt;
          &lt;figcaption&gt;The basic structure of an HTML document&lt;/figcaption&gt;
        &lt;/figure&gt;
      &lt;/section&gt;

      &lt;section&gt;
        &lt;h2&gt;Basic HTML Elements&lt;/h2&gt;
        &lt;p&gt;Here are some fundamental HTML elements you should know:&lt;/p&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;code&gt;&amp;lt;p&amp;gt;&lt;/code&gt; - For paragraphs&lt;/li&gt;
          &lt;li&gt;&lt;code&gt;&amp;lt;a&amp;gt;&lt;/code&gt; - For links&lt;/li&gt;
          &lt;li&gt;&lt;code&gt;&amp;lt;h1&amp;gt; to &amp;lt;h6&amp;gt;&lt;/code&gt; - For headings&lt;/li&gt;
        &lt;/ul&gt;
      &lt;/section&gt;
    &lt;/article&gt;
    
    &lt;aside&gt;
      &lt;h3&gt;Related Resources&lt;/h3&gt;
      &lt;ul&gt;
        &lt;li&gt;&lt;a href="/css-basics"&gt;CSS Basics Tutorial&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="/web-accessibility"&gt;Web Accessibility Guide&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/aside&gt;
  &lt;/main&gt;

  &lt;footer&gt;
    &lt;p&gt;&amp;copy; 2023 CodeLegends. All rights reserved.&lt;/p&gt;
    &lt;nav&gt;
      &lt;ul&gt;
        &lt;li&gt;&lt;a href="/privacy"&gt;Privacy Policy&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="/terms"&gt;Terms of Service&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/nav&gt;
  &lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
					</div>
				</AccordionItem>
			</Accordion>
		</div>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Key Takeaways</h3>
			<div class="grid gap-4 md:grid-cols-3">
				<div class="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
					<h4 class="font-semibold text-green-700">Clean Code Matters</h4>
					<p class="mt-2">
						Well-formatted, properly indented HTML improves readability, maintainability, and
						collaboration efficiency.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
					<h4 class="font-semibold text-blue-700">Meta Information is Crucial</h4>
					<p class="mt-2">
						Proper &lt;title&gt;, meta descriptions, and structured data help search engines and
						users understand your content.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-purple-500 bg-purple-50 p-4">
					<h4 class="font-semibold text-purple-700">Semantics Boost SEO</h4>
					<p class="mt-2">
						Using the right elements for the right purpose improves accessibility, SEO, and the
						overall quality of your HTML.
					</p>
				</div>
			</div>
		</section>

		<div class="mt-6 rounded-lg bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Challenge Your Understanding</h3>
			<p class="text-lg">
				Review your previous HTML projects and identify areas where you can improve:
			</p>
			<ul class="mt-3 list-disc space-y-1 pl-6">
				<li>Are you using semantic HTML elements appropriately?</li>
				<li>Have you included proper meta tags and a descriptive title?</li>
				<li>Does every image have meaningful alt text?</li>
				<li>Is your code consistently formatted and indented?</li>
				<li>Are your class and ID names descriptive of content purpose rather than appearance?</li>
			</ul>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Additional Resources</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Clean HTML & Code Style</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://google.github.io/styleguide/htmlcssguide.html"
								target="_blank"
								class="text-indigo-600 hover:underline">Google HTML/CSS Style Guide</a
							>
						</li>
						<li>
							<a
								href="https://codeguide.co/"
								target="_blank"
								class="text-indigo-600 hover:underline">Code Guide by @mdo</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">SEO Resources</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://moz.com/beginners-guide-to-seo"
								target="_blank"
								class="text-indigo-600 hover:underline">Moz Beginner's Guide to SEO</a
							>
						</li>
						<li>
							<a
								href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
								target="_blank"
								class="text-indigo-600 hover:underline">Google SEO Starter Guide</a
							>
						</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</ModuleTask>

<style>
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
