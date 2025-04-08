<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';
	import { Accordion, AccordionItem } from '$lib/components/ui/accordion';

	const sectionData: Section = {
		title: 'What is Semantic HTML?'
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
			<h3 class="mb-3 text-xl font-semibold">Understanding Semantic HTML</h3>
			<p class="text-lg">
				Semantic HTML means using HTML elements that clearly describe their meaning to both the
				browser and the developer. Instead of using generic containers like <code>&lt;div&gt;</code>
				and <code>&lt;span&gt;</code> for everything, semantic HTML provides specific elements that communicate
				the purpose of the content they contain.
			</p>
		</section>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				Think of semantic HTML as giving your content meaningful labels. Just as you would organize
				items in labeled boxes rather than throwing everything into unlabeled containers, semantic
				HTML organizes your web content in elements that describe what they contain.
			</p>
		</div>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Why Semantics Matter</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border border-green-200 bg-green-50 p-5">
					<h4 class="mb-2 font-semibold text-green-700">Accessibility</h4>
					<p>
						Screen readers and assistive technologies rely on semantic HTML to properly interpret
						and announce content. For users with disabilities, semantics can make the difference
						between a usable and unusable website.
					</p>
				</div>

				<div class="rounded-lg border border-blue-200 bg-blue-50 p-5">
					<h4 class="mb-2 font-semibold text-blue-700">SEO Benefits</h4>
					<p>
						Search engines better understand your content when it's properly structured with
						semantic elements. This can improve your site's visibility in search results and help
						search engines identify key content.
					</p>
				</div>

				<div class="rounded-lg border border-amber-200 bg-amber-50 p-5">
					<h4 class="mb-2 font-semibold text-amber-700">Maintainability</h4>
					<p>
						Code is easier to read and maintain when elements clearly describe their purpose. A team
						of developers can more quickly understand HTML that uses semantic elements rather than
						generic containers.
					</p>
				</div>

				<div class="rounded-lg border border-purple-200 bg-purple-50 p-5">
					<h4 class="mb-2 font-semibold text-purple-700">Device Compatibility</h4>
					<p>
						Semantic HTML helps content display appropriately across different devices and
						platforms. It provides built-in responsive behavior for many elements that generic divs
						don't have.
					</p>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Non-Semantic vs. Semantic HTML</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border border-red-200 bg-white p-5">
					<h4 class="mb-2 font-semibold text-red-700">Non-Semantic Example</h4>
					<div class="rounded bg-gray-100 p-4 font-mono text-sm">
						<pre>&lt;div class="header"&gt;
  &lt;div class="nav"&gt;
    &lt;div class="nav-item"&gt;Home&lt;/div&gt;
    &lt;div class="nav-item"&gt;About&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;div class="main-content"&gt;
  &lt;div class="article"&gt;
    &lt;div class="article-title"&gt;My Article&lt;/div&gt;
    &lt;div class="article-content"&gt;Content here...&lt;/div&gt;
  &lt;/div&gt;
  
  &lt;div class="sidebar"&gt;Related links...&lt;/div&gt;
&lt;/div&gt;

&lt;div class="footer"&gt;Copyright 2023&lt;/div&gt;</pre>
					</div>
					<p class="mt-3 text-gray-600">
						This example uses generic <code>&lt;div&gt;</code> elements with classes to indicate their
						purpose. The structure is unclear without the class names.
					</p>
				</div>

				<div class="rounded-lg border border-green-200 bg-white p-5">
					<h4 class="mb-2 font-semibold text-green-700">Semantic Example</h4>
					<div class="rounded bg-gray-100 p-4 font-mono text-sm">
						<pre>&lt;header&gt;
  &lt;nav&gt;
    &lt;ul&gt;
      &lt;li&gt;&lt;a href="#"&gt;Home&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="#"&gt;About&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/nav&gt;
&lt;/header&gt;

&lt;main&gt;
  &lt;article&gt;
    &lt;h1&gt;My Article&lt;/h1&gt;
    &lt;p&gt;Content here...&lt;/p&gt;
  &lt;/article&gt;
  
  &lt;aside&gt;Related links...&lt;/aside&gt;
&lt;/main&gt;

&lt;footer&gt;Copyright 2023&lt;/footer&gt;</pre>
					</div>
					<p class="mt-3 text-gray-600">
						This example uses semantic elements that clearly describe their purpose. The structure
						is clear even without additional class names.
					</p>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Key Semantic Elements</h3>
			<p class="mb-4 text-lg">
				HTML5 introduced several semantic elements to better structure web pages. Let's explore the
				most important ones:
			</p>

			<div class="space-y-6">
				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<div class="flex items-start">
						<div class="mr-3 rounded-full bg-indigo-100 p-2">
							<code>&lt;header&gt;</code>
						</div>
						<div>
							<h4 class="font-semibold text-indigo-700">Header</h4>
							<p class="mt-1">
								Represents introductory content at the beginning of a section or page. Typically
								contains headings, logos, navigation, and search functionality.
							</p>
							<div class="mt-3 rounded bg-gray-100 p-3 font-mono text-sm">
								<pre>&lt;header&gt;
  &lt;img src="logo.png" alt="Company Logo"&gt;
  &lt;h1&gt;Website Title&lt;/h1&gt;
  &lt;nav&gt;...&lt;/nav&gt;
&lt;/header&gt;</pre>
							</div>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<div class="flex items-start">
						<div class="mr-3 rounded-full bg-indigo-100 p-2">
							<code>&lt;nav&gt;</code>
						</div>
						<div>
							<h4 class="font-semibold text-indigo-700">Navigation</h4>
							<p class="mt-1">
								Defines a section containing navigation links, either within the current document or
								to other documents.
							</p>
							<div class="mt-3 rounded bg-gray-100 p-3 font-mono text-sm">
								<pre>&lt;nav&gt;
  &lt;ul&gt;
    &lt;li&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="/about"&gt;About&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="/contact"&gt;Contact&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</pre>
							</div>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<div class="flex items-start">
						<div class="mr-3 rounded-full bg-indigo-100 p-2">
							<code>&lt;main&gt;</code>
						</div>
						<div>
							<h4 class="font-semibold text-indigo-700">Main</h4>
							<p class="mt-1">
								Specifies the main content area of a document. There should be only one
								<code>&lt;main&gt;</code> element per page, and it should not be nested within other
								semantic elements like <code>&lt;article&gt;</code> or <code>&lt;section&gt;</code>.
							</p>
							<div class="mt-3 rounded bg-gray-100 p-3 font-mono text-sm">
								<pre>&lt;main&gt;
  &lt;h1&gt;Page Title&lt;/h1&gt;
  &lt;p&gt;Main content goes here...&lt;/p&gt;
  &lt;article&gt;...&lt;/article&gt;
&lt;/main&gt;</pre>
							</div>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<div class="flex items-start">
						<div class="mr-3 rounded-full bg-indigo-100 p-2">
							<code>&lt;article&gt;</code>
						</div>
						<div>
							<h4 class="font-semibold text-indigo-700">Article</h4>
							<p class="mt-1">
								Represents a self-contained composition that could be distributed and reused
								independently, such as a blog post, news story, or forum post.
							</p>
							<div class="mt-3 rounded bg-gray-100 p-3 font-mono text-sm">
								<pre>&lt;article&gt;
  &lt;header&gt;
    &lt;h2&gt;Article Title&lt;/h2&gt;
    &lt;p&gt;Published on &lt;time datetime="2023-04-20"&gt;April 20, 2023&lt;/time&gt;&lt;/p&gt;
  &lt;/header&gt;
  &lt;p&gt;Article content...&lt;/p&gt;
  &lt;footer&gt;
    &lt;p&gt;Author: Jane Smith&lt;/p&gt;
  &lt;/footer&gt;
&lt;/article&gt;</pre>
							</div>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<div class="flex items-start">
						<div class="mr-3 rounded-full bg-indigo-100 p-2">
							<code>&lt;section&gt;</code>
						</div>
						<div>
							<h4 class="font-semibold text-indigo-700">Section</h4>
							<p class="mt-1">
								Represents a standalone section of content that could have its own heading. It's
								more general than <code>&lt;article&gt;</code> and is often used to group related content.
							</p>
							<div class="mt-3 rounded bg-gray-100 p-3 font-mono text-sm">
								<pre>&lt;section&gt;
  &lt;h2&gt;Features&lt;/h2&gt;
  &lt;p&gt;Information about our product features...&lt;/p&gt;
  &lt;ul&gt;
    &lt;li&gt;Feature 1&lt;/li&gt;
    &lt;li&gt;Feature 2&lt;/li&gt;
  &lt;/ul&gt;
&lt;/section&gt;</pre>
							</div>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<div class="flex items-start">
						<div class="mr-3 rounded-full bg-indigo-100 p-2">
							<code>&lt;aside&gt;</code>
						</div>
						<div>
							<h4 class="font-semibold text-indigo-700">Aside</h4>
							<p class="mt-1">
								Represents content that is tangentially related to the content around it, like a
								sidebar or pull quote. It could be removed without affecting the main content's
								meaning.
							</p>
							<div class="mt-3 rounded bg-gray-100 p-3 font-mono text-sm">
								<pre>&lt;aside&gt;
  &lt;h3&gt;Related Articles&lt;/h3&gt;
  &lt;ul&gt;
    &lt;li&gt;&lt;a href="#"&gt;Similar Topic 1&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Similar Topic 2&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/aside&gt;</pre>
							</div>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<div class="flex items-start">
						<div class="mr-3 rounded-full bg-indigo-100 p-2">
							<code>&lt;footer&gt;</code>
						</div>
						<div>
							<h4 class="font-semibold text-indigo-700">Footer</h4>
							<p class="mt-1">
								Represents a footer for its nearest sectioning content or sectioning root element.
								It typically contains information about the author, copyright data, or links to
								related documents.
							</p>
							<div class="mt-3 rounded bg-gray-100 p-3 font-mono text-sm">
								<pre>&lt;footer&gt;
  &lt;p&gt;&copy; 2023 My Website. All rights reserved.&lt;/p&gt;
  &lt;nav&gt;
    &lt;a href="/privacy"&gt;Privacy Policy&lt;/a&gt;
    &lt;a href="/terms"&gt;Terms of Service&lt;/a&gt;
  &lt;/nav&gt;
&lt;/footer&gt;</pre>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Page Structure Example</h3>
			<p class="text-lg">Here's how these elements work together to structure a complete page:</p>

			<Accordion className="mt-4">
				<AccordionItem value="example">
					<svelte:fragment slot="trigger">View Complete Semantic HTML Structure</svelte:fragment>
					<div class="rounded bg-gray-100 p-4 font-mono text-sm">
						<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;Semantic HTML Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;header&gt;
    &lt;h1&gt;My Website&lt;/h1&gt;
    &lt;nav&gt;
      &lt;ul&gt;
        &lt;li&gt;&lt;a href="#"&gt;Home&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;Blog&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;About&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;Contact&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/nav&gt;
  &lt;/header&gt;
  
  &lt;main&gt;
    &lt;section&gt;
      &lt;h2&gt;Welcome&lt;/h2&gt;
      &lt;p&gt;Welcome to my website about semantic HTML.&lt;/p&gt;
    &lt;/section&gt;
    
    &lt;article&gt;
      &lt;header&gt;
        &lt;h2&gt;The Importance of Semantic HTML&lt;/h2&gt;
        &lt;p&gt;Published by &lt;a href="#"&gt;Jane Smith&lt;/a&gt; on 
          &lt;time datetime="2023-04-20"&gt;April 20, 2023&lt;/time&gt;&lt;/p&gt;
      &lt;/header&gt;
      
      &lt;section&gt;
        &lt;h3&gt;Introduction&lt;/h3&gt;
        &lt;p&gt;Semantic HTML is crucial for accessibility, SEO, and code maintainability.&lt;/p&gt;
      &lt;/section&gt;
      
      &lt;section&gt;
        &lt;h3&gt;Benefits&lt;/h3&gt;
        &lt;ul&gt;
          &lt;li&gt;Improved accessibility for screen readers&lt;/li&gt;
          &lt;li&gt;Better SEO rankings&lt;/li&gt;
          &lt;li&gt;Easier code maintenance&lt;/li&gt;
        &lt;/ul&gt;
      &lt;/section&gt;
      
      &lt;footer&gt;
        &lt;p&gt;Tags: &lt;a href="#"&gt;HTML5&lt;/a&gt;, &lt;a href="#"&gt;Semantics&lt;/a&gt;, &lt;a href="#"&gt;Web Development&lt;/a&gt;&lt;/p&gt;
      &lt;/footer&gt;
    &lt;/article&gt;
    
    &lt;aside&gt;
      &lt;h3&gt;Related Articles&lt;/h3&gt;
      &lt;ul&gt;
        &lt;li&gt;&lt;a href="#"&gt;HTML Best Practices&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;CSS Basics&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;JavaScript Fundamentals&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/aside&gt;
  &lt;/main&gt;
  
  &lt;footer&gt;
    &lt;p&gt;&copy; 2023 My Website. All rights reserved.&lt;/p&gt;
    &lt;nav&gt;
      &lt;ul&gt;
        &lt;li&gt;&lt;a href="#"&gt;Privacy Policy&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;Terms of Service&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/nav&gt;
  &lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
					</div>
				</AccordionItem>
			</Accordion>

			<div class="mt-6">
				<img
					src="/images/courses/HTMLStructure.png"
					alt="Visual representation of semantic HTML structure"
					class="w-full rounded-lg border shadow-sm"
				/>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Best Practices for Semantic HTML</h3>
			<div class="mt-2 space-y-3">
				<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
					<h4 class="font-semibold">Use the right element for the right job</h4>
					<p>
						Don't use headings for styling purposes or tables for layout. Choose elements based on
						their meaning, not their default appearance.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
					<h4 class="font-semibold">Maintain a logical document outline</h4>
					<p>
						Use heading elements (<code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>) to create
						a hierarchical structure that reflects the content's organization.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
					<h4 class="font-semibold">Don't overuse sectioning elements</h4>
					<p>
						Not every <code>&lt;div&gt;</code> needs to be replaced with a semantic element. Use semantic
						elements when they accurately represent the content's meaning.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
					<h4 class="font-semibold">Nest elements properly</h4>
					<p>
						Understand the semantic hierarchy and nest elements appropriately. For example, an
						<code>&lt;article&gt;</code> can contain <code>&lt;section&gt;</code> elements, and both
						can have their own <code>&lt;header&gt;</code> and <code>&lt;footer&gt;</code>.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
					<h4 class="font-semibold">Use HTML5 input types and attributes</h4>
					<p>
						Form fields have semantic types like <code>email</code>, <code>tel</code>, and
						<code>date</code> that provide built-in validation and appropriate keyboards on mobile devices.
					</p>
				</div>
			</div>
		</section>

		<div class="mt-6 rounded-lg bg-blue-50 p-6">
			<h3 class="mb-3 text-xl font-semibold">Why Use Semantic HTML?</h3>
			<p class="text-lg">
				Beyond the technical benefits, semantic HTML creates a better web ecosystem for everyone:
			</p>
			<ul class="mt-3 list-disc space-y-2 pl-6 text-lg">
				<li>
					<strong>Accessibility:</strong> 15-20% of the world's population has a disability. Semantic
					HTML makes your content accessible to more users.
				</li>
				<li>
					<strong>Future Compatibility:</strong> As browsers and devices evolve, semantic markup is more
					likely to remain compatible and display properly.
				</li>
				<li>
					<strong>Development Efficiency:</strong> Clear, meaningful markup is easier to debug, update,
					and collaborate on.
				</li>
				<li>
					<strong>Content Reusability:</strong> Properly structured content can be more easily repurposed
					across different platforms and devices.
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
								href="https://developer.mozilla.org/en-US/docs/Glossary/Semantics"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN: Semantics in HTML</a
							>
						</li>
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN: Document and Website Structure</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Tools</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://wave.webaim.org/"
								target="_blank"
								class="text-indigo-600 hover:underline">WAVE Accessibility Evaluation Tool</a
							>
						</li>
						<li>
							<a
								href="https://validator.w3.org/nu/"
								target="_blank"
								class="text-indigo-600 hover:underline">W3C HTML Validator</a
							>
						</li>
						<li>
							<a
								href="https://html5outliner.gsnedders.html5.org/"
								target="_blank"
								class="text-indigo-600 hover:underline">HTML5 Outliner</a
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
