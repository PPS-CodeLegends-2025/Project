<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';
	import { Accordion, AccordionItem } from '$lib/components/ui/accordion';

	const sectionData: Section = {
		title: 'Essential HTML Elements'
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
			<h3 class="mb-3 text-xl font-semibold">Building Blocks of Web Content</h3>
			<p class="text-lg">
				Think of HTML elements as the fundamental building blocks of the web—like LEGO pieces that
				combine to create everything you see online. Each element has a specific purpose and
				appearance, and knowing when to use each one is essential for creating well-structured web
				pages.
			</p>

			<div class="mt-4 border-l-4 border-indigo-500 bg-indigo-50 p-4">
				<p class="text-lg">
					In this section, we'll explore the most commonly used HTML elements that form the backbone
					of web content: headings, paragraphs, lists, images, and links.
				</p>
			</div>
		</section>

		<section id="headings">
			<h3 class="mb-3 text-xl font-semibold">Headings: Creating a Content Hierarchy</h3>
			<p class="text-lg">
				Headings are like the chapter titles and section markers in a book. They organize your
				content and help visitors quickly understand its structure. HTML offers six levels of
				headings, from <code>&lt;h1&gt;</code> (most important) to <code>&lt;h6&gt;</code> (least important).
			</p>

			<div class="mt-4 grid gap-4 md:grid-cols-2">
				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<h4 class="mb-2 font-semibold text-indigo-700">Heading Elements</h4>
					<div class="rounded bg-gray-100 p-4 font-mono text-sm">
						<pre>&lt;h1&gt;Main Page Title&lt;/h1&gt;
&lt;h2&gt;Section Heading&lt;/h2&gt;
&lt;h3&gt;Subsection Heading&lt;/h3&gt;
&lt;h4&gt;Minor Heading&lt;/h4&gt;
&lt;h5&gt;Small Heading&lt;/h5&gt;
&lt;h6&gt;Smallest Heading&lt;/h6&gt;</pre>
					</div>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<h4 class="mb-2 font-semibold text-indigo-700">Visual Representation</h4>
					<div class="rounded bg-white p-4">
						<h1 style="font-size: 2em; font-weight: bold;">Main Page Title (h1)</h1>
						<h2 style="font-size: 1.5em; font-weight: bold;">Section Heading (h2)</h2>
						<h3 style="font-size: 1.17em; font-weight: bold;">Subsection Heading (h3)</h3>
						<h4 style="font-size: 1em; font-weight: bold;">Minor Heading (h4)</h4>
						<h5 style="font-size: 0.83em; font-weight: bold;">Small Heading (h5)</h5>
						<h6 style="font-size: 0.67em; font-weight: bold;">Smallest Heading (h6)</h6>
					</div>
				</div>
			</div>

			<div class="mt-4 border-l-4 border-amber-400 bg-amber-50 p-4">
				<h4 class="font-semibold">Best Practices for Headings</h4>
				<ul class="mt-2 list-disc space-y-1 pl-6">
					<li>Use only one <code>&lt;h1&gt;</code> per page—this should be your main title</li>
					<li>
						Follow a logical hierarchy (don't skip from <code>&lt;h1&gt;</code> to
						<code>&lt;h3&gt;</code>)
					</li>
					<li>Use headings for structure, not for making text big or bold</li>
					<li>Headings are crucial for accessibility and SEO</li>
				</ul>
			</div>
		</section>

		<section id="paragraphs">
			<h3 class="mb-3 text-xl font-semibold">Paragraphs: The Building Blocks of Content</h3>
			<p class="text-lg">
				Paragraphs are the workhorses of web content. The <code>&lt;p&gt;</code> element defines a paragraph
				of text and is one of the most commonly used HTML elements.
			</p>

			<div class="mt-4 rounded-lg border bg-white p-5 shadow-sm">
				<div class="grid gap-6 md:grid-cols-2">
					<div>
						<h4 class="mb-2 font-semibold text-indigo-700">Paragraph Syntax</h4>
						<div class="rounded bg-gray-100 p-4 font-mono text-sm">
							<pre>&lt;p&gt;This is a paragraph. It can contain text, 
links, and other inline elements. Browsers 
automatically add space before and after 
paragraphs.&lt;/p&gt;

&lt;p&gt;This is a second paragraph. Notice the 
space between paragraphs.&lt;/p&gt;</pre>
						</div>
					</div>
					<div>
						<h4 class="mb-2 font-semibold text-indigo-700">Visual Result</h4>
						<div class="rounded bg-white p-4">
							<p>
								This is a paragraph. It can contain text, links, and other inline elements. Browsers
								automatically add space before and after paragraphs.
							</p>
							<p>This is a second paragraph. Notice the space between paragraphs.</p>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
				<h4 class="font-semibold">Important Note</h4>
				<p class="mt-2">
					Unlike word processors, pressing Enter in your HTML code doesn't create a new line in the
					browser. HTML ignores extra whitespace. To create a line break within a paragraph, use the <code
						>&lt;br&gt;</code
					> tag:
				</p>
				<div class="mt-2 rounded bg-white p-3 font-mono">
					<code>&lt;p&gt;This is line one.&lt;br&gt;This is line two.&lt;/p&gt;</code>
				</div>
			</div>
		</section>

		<section id="lists">
			<h3 class="mb-3 text-xl font-semibold">Lists: Organizing Information</h3>
			<p class="text-lg">
				HTML offers three types of lists for organizing information: unordered lists (<code
					>&lt;ul&gt;</code
				>) with bullet points, ordered lists (<code>&lt;ol&gt;</code>) with numbers, and definition
				lists (<code>&lt;dl&gt;</code>) for term-definition pairs.
			</p>

			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<h4 class="mb-2 font-semibold text-indigo-700">Unordered List (Bullet Points)</h4>
					<div class="grid grid-cols-2 gap-4">
						<div class="rounded bg-gray-100 p-3 font-mono text-sm">
							<pre>&lt;ul&gt;
  &lt;li&gt;Apples&lt;/li&gt;
  &lt;li&gt;Oranges&lt;/li&gt;
  &lt;li&gt;Bananas&lt;/li&gt;
&lt;/ul&gt;</pre>
						</div>
						<div class="rounded bg-white p-3">
							<ul class="list-disc pl-5">
								<li>Apples</li>
								<li>Oranges</li>
								<li>Bananas</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<h4 class="mb-2 font-semibold text-indigo-700">Ordered List (Numbers)</h4>
					<div class="grid grid-cols-2 gap-4">
						<div class="rounded bg-gray-100 p-3 font-mono text-sm">
							<pre>&lt;ol&gt;
  &lt;li&gt;First step&lt;/li&gt;
  &lt;li&gt;Second step&lt;/li&gt;
  &lt;li&gt;Third step&lt;/li&gt;
&lt;/ol&gt;</pre>
						</div>
						<div class="rounded bg-white p-3">
							<ol class="list-decimal pl-5">
								<li>First step</li>
								<li>Second step</li>
								<li>Third step</li>
							</ol>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-4 rounded-lg border border-purple-200 bg-purple-50 p-5">
				<h4 class="mb-2 font-semibold">Nested Lists</h4>
				<p>Lists can be nested inside one another to create hierarchical structures:</p>

				<div class="mt-3 grid gap-6 md:grid-cols-2">
					<div class="rounded bg-gray-100 p-3 font-mono text-sm">
						<pre>&lt;ul&gt;
  &lt;li&gt;Fruits
    &lt;ul&gt;
      &lt;li&gt;Apples&lt;/li&gt;
      &lt;li&gt;Bananas&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
  &lt;li&gt;Vegetables
    &lt;ul&gt;
      &lt;li&gt;Carrots&lt;/li&gt;
      &lt;li&gt;Broccoli&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
&lt;/ul&gt;</pre>
					</div>
					<div class="rounded bg-white p-3">
						<ul class="list-disc pl-5">
							<li>
								Fruits
								<ul class="list-disc pl-5">
									<li>Apples</li>
									<li>Bananas</li>
								</ul>
							</li>
							<li>
								Vegetables
								<ul class="list-disc pl-5">
									<li>Carrots</li>
									<li>Broccoli</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<section id="images">
			<h3 class="mb-3 text-xl font-semibold">Images: Adding Visual Elements</h3>
			<p class="text-lg">
				Images bring your web pages to life. The <code>&lt;img&gt;</code> tag embeds images in your
				HTML documents. Unlike most elements, <code>&lt;img&gt;</code> is self-closing (it doesn't need
				a separate closing tag).
			</p>

			<div class="mt-4 rounded-lg border bg-white p-5 shadow-sm">
				<h4 class="mb-2 font-semibold text-indigo-700">Basic Image Syntax</h4>
				<div class="rounded bg-gray-100 p-4 font-mono text-sm">
					<pre>&lt;img src="path/to/image.jpg" alt="Description of the image"&gt;</pre>
				</div>

				<div class="mt-4 grid gap-4 md:grid-cols-2">
					<div>
						<h4 class="mb-2 font-semibold">Required Attributes</h4>
						<ul class="list-disc space-y-2 pl-5">
							<li><strong>src</strong>: The image file path or URL</li>
							<li>
								<strong>alt</strong>: Alternative text for screen readers, or if the image fails to
								load
							</li>
						</ul>
					</div>
					<div>
						<h4 class="mb-2 font-semibold">Optional Attributes</h4>
						<ul class="list-disc space-y-2 pl-5">
							<li><strong>width</strong>, <strong>height</strong>: Dimensions in pixels</li>
							<li><strong>loading</strong>: Set to "lazy" for improved performance</li>
							<li><strong>title</strong>: Tooltip text that appears on hover</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="mt-4 border-l-4 border-amber-400 bg-amber-50 p-4">
				<h4 class="font-semibold">Accessibility Reminder</h4>
				<p class="mt-2">
					<strong>Always include meaningful alt text</strong> for your images. This helps users who
					rely on screen readers and improves SEO. The only exception is purely decorative images,
					which can use <code>alt=""</code>.
				</p>
			</div>

			<div class="mt-4 rounded-lg border bg-white p-5 shadow-sm">
				<h4 class="mb-2 font-semibold text-indigo-700">Example: Responsive Image</h4>
				<div class="rounded bg-gray-100 p-3 font-mono text-sm">
					<pre>&lt;img 
  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97" 
  alt="Laptop with code on screen on a wooden desk" 
  width="500" 
  height="300"
  loading="lazy"
&gt;</pre>
				</div>
				<p class="mt-3">
					This would display an image from Unsplash showing code on a laptop screen.
				</p>
			</div>
		</section>

		<section id="links">
			<h3 class="mb-3 text-xl font-semibold">Links: Connecting the Web</h3>
			<p class="text-lg">
				Links (or hyperlinks) are what make the web a "web." The anchor element <code
					>&lt;a&gt;</code
				> creates connections between pages and websites, allowing users to navigate the internet.
			</p>

			<div class="mt-4 rounded-lg border bg-white p-5 shadow-sm">
				<h4 class="mb-2 font-semibold text-indigo-700">Link Syntax</h4>
				<div class="rounded bg-gray-100 p-4 font-mono text-sm">
					<pre>&lt;a href="destination.html"&gt;Link text&lt;/a&gt;</pre>
				</div>

				<div class="mt-4 grid gap-4 md:grid-cols-2">
					<div>
						<h4 class="mb-2 font-semibold">Types of Links</h4>
						<div class="rounded bg-gray-100 p-3 font-mono text-sm">
							<pre># External link
&lt;a href="https://example.com"&gt;Visit Example&lt;/a&gt;

# Internal link (same site)
&lt;a href="/about.html"&gt;About Us&lt;/a&gt;

# Email link
&lt;a href="mailto:contact@example.com"&gt;Email Us&lt;/a&gt;

# Telephone link
&lt;a href="tel:+1234567890"&gt;Call Us&lt;/a&gt;</pre>
						</div>
					</div>
					<div>
						<h4 class="mb-2 font-semibold">Opening in a New Tab</h4>
						<div class="rounded bg-gray-100 p-3 font-mono text-sm">
							<pre>&lt;a href="https://example.com" target="_blank" rel="noopener noreferrer"&gt;
  Open in new tab
&lt;/a&gt;</pre>
						</div>
						<p class="mt-3">
							<strong>Note:</strong> Always include <code>rel="noopener noreferrer"</code> when
							using <code>target="_blank"</code> for security reasons.
						</p>
					</div>
				</div>
			</div>

			<div class="mt-4 rounded-lg border bg-white p-5 shadow-sm">
				<h4 class="mb-2 font-semibold text-indigo-700">Link to Page Sections</h4>
				<p>You can link to specific sections within a page using ID attributes:</p>

				<div class="mt-3 grid gap-4 md:grid-cols-2">
					<div class="rounded bg-gray-100 p-3 font-mono text-sm">
						<pre># Define a section with an ID
&lt;section id="contact"&gt;
  &lt;h2&gt;Contact Us&lt;/h2&gt;
  ...
&lt;/section&gt;

# Create a link to that section
&lt;a href="#contact"&gt;Go to Contact Section&lt;/a&gt;</pre>
					</div>
					<div>
						<p class="mb-2">This is useful for:</p>
						<ul class="list-disc pl-5">
							<li>Table of contents</li>
							<li>Back to top links</li>
							<li>Navigation within long pages</li>
							<li>FAQ sections</li>
						</ul>
						<p class="mt-2">
							When clicked, the browser will smoothly scroll to the section with the matching ID.
						</p>
					</div>
				</div>
			</div>
		</section>

		<section id="attributes">
			<h3 class="mb-3 text-xl font-semibold">HTML Attributes: Enhancing Elements</h3>
			<p class="text-lg">
				HTML attributes provide additional information about elements and modify their behavior.
				They are always specified in the opening tag and usually come in name/value pairs like <code
					>name="value"</code
				>.
			</p>

			<div class="mt-4 rounded-lg border bg-white p-5 shadow-sm">
				<h4 class="mb-2 font-semibold text-indigo-700">Attribute Syntax</h4>
				<div class="rounded bg-gray-100 p-4 font-mono text-sm">
					<pre>&lt;element attribute="value"&gt;Content&lt;/element&gt;</pre>
				</div>

				<p class="mt-3">For example, a link with multiple attributes:</p>

				<div class="mt-2 rounded bg-gray-100 p-4 font-mono text-sm">
					<pre>&lt;a href="https://example.com" title="Visit Example" target="_blank"&gt;Example Website&lt;/a&gt;</pre>
				</div>
			</div>

			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<h4 class="mb-2 font-semibold text-indigo-700">Global Attributes</h4>
					<p class="mb-2">These can be used with any HTML element:</p>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>id</strong> - Unique identifier for an element</li>
						<li><strong>class</strong> - Specifies CSS classes for styling</li>
						<li><strong>title</strong> - Extra information shown as a tooltip</li>
						<li><strong>style</strong> - Inline CSS styling</li>
						<li><strong>lang</strong> - Declares the language of content</li>
						<li><strong>data-*</strong> - Custom data attributes</li>
					</ul>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<h4 class="mb-2 font-semibold text-indigo-700">Element-Specific Attributes</h4>
					<p class="mb-2">Some attributes only work with certain elements:</p>
					<ul class="list-disc space-y-2 pl-5">
						<li>
							<strong>href</strong> - For links (<code>&lt;a&gt;</code>) to specify destination
						</li>
						<li>
							<strong>src</strong> - For media elements (<code>&lt;img&gt;</code>,
							<code>&lt;video&gt;</code>) to specify source file
						</li>
						<li><strong>alt</strong> - For images to provide alternative text</li>
						<li><strong>type</strong> - For inputs to specify input type</li>
						<li><strong>disabled</strong> - For form elements to disable interaction</li>
						<li><strong>required</strong> - For form elements that must be filled</li>
					</ul>
				</div>
			</div>

			<div class="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-5">
				<h4 class="mb-2 font-semibold">Why Attributes Matter</h4>
				<div class="grid gap-4 md:grid-cols-3">
					<div>
						<h5 class="font-semibold text-blue-700">Accessibility</h5>
						<p>
							Attributes like <code>alt</code>, <code>aria-*</code>, and <code>role</code> make your
							content usable for people with disabilities. Screen readers and other assistive technologies
							rely on these attributes.
						</p>
					</div>
					<div>
						<h5 class="font-semibold text-blue-700">Functionality</h5>
						<p>
							Many attributes are essential for elements to work properly. Without <code>href</code>
							on links or <code>src</code> on images, these elements would be useless.
						</p>
					</div>
					<div>
						<h5 class="font-semibold text-blue-700">SEO & Performance</h5>
						<p>
							Attributes like <code>alt</code> improve SEO, while <code>loading="lazy"</code> improves
							performance. Search engines use these attributes to understand and rank your content.
						</p>
					</div>
				</div>
			</div>

			<div class="mt-4 border-l-4 border-amber-400 bg-amber-50 p-4">
				<h4 class="font-semibold">Attribute Best Practices</h4>
				<ul class="mt-2 list-disc space-y-1 pl-6">
					<li>Always use lowercase attribute names for better compatibility</li>
					<li>Always quote attribute values using double quotes</li>
					<li>Don't repeat attributes within the same element</li>
					<li>Boolean attributes (like <code>disabled</code>) don't need values</li>
					<li>
						Use data attributes (<code>data-*</code>) for custom data rather than making up
						attributes
					</li>
				</ul>
			</div>
		</section>

		<section id="combining">
			<h3 class="mb-3 text-xl font-semibold">Putting It All Together</h3>
			<p class="text-lg">
				These elements are the building blocks of web content, but their real power comes when you
				combine them to create structured, accessible, and visually engaging pages.
			</p>

			<div class="mt-4 rounded-lg border bg-white p-5 shadow-sm">
				<h4 class="mb-2 font-semibold text-indigo-700">Example: Complete Blog Post Structure</h4>
				<Accordion className="mt-3">
					<AccordionItem value="blog-example">
						<svelte:fragment slot="trigger">View Example Code</svelte:fragment>
						<div class="rounded bg-gray-100 p-3 font-mono text-sm">
							<pre>&lt;article&gt;
  &lt;h1&gt;Getting Started with HTML&lt;/h1&gt;
  
  &lt;p&gt;
    HTML is the foundation of all web pages. Learning HTML is the first step 
    in creating websites. In this guide, we'll cover the essential elements 
    that every webpage needs.
  &lt;/p&gt;
  
  &lt;h2&gt;What You'll Learn&lt;/h2&gt;
  
  &lt;ul&gt;
    &lt;li&gt;Basic HTML structure&lt;/li&gt;
    &lt;li&gt;Working with text elements&lt;/li&gt;
    &lt;li&gt;Adding images and links&lt;/li&gt;
    &lt;li&gt;Creating lists&lt;/li&gt;
  &lt;/ul&gt;
  
  &lt;h2&gt;HTML Basics&lt;/h2&gt;
  
  &lt;p&gt;
    HTML uses elements to structure content. Each element is written with 
    tags enclosed in angle brackets. Most elements have an opening and 
    closing tag, with the content placed between them.
  &lt;/p&gt;
  
  &lt;h3&gt;Example Code&lt;/h3&gt;
  
  &lt;p&gt;Here's a simple HTML example:&lt;/p&gt;
  
  &lt;img 
    src="code-example.png" 
    alt="Screenshot of HTML code example" 
    width="400"
  &gt;
  
  &lt;h2&gt;Ready to Learn More?&lt;/h2&gt;
  
  &lt;p&gt;
    Check out our &lt;a href="/html-course"&gt;complete HTML course&lt;/a&gt; 
    or &lt;a href="mailto:support@example.com"&gt;contact us&lt;/a&gt; 
    with any questions.
  &lt;/p&gt;
  
  &lt;ol&gt;
    &lt;li&gt;Start with the basics&lt;/li&gt;
    &lt;li&gt;Practice regularly&lt;/li&gt;
    &lt;li&gt;Build small projects&lt;/li&gt;
  &lt;/ol&gt;
&lt;/article&gt;</pre>
						</div>
					</AccordionItem>
				</Accordion>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Best Practices Summary</h3>

			<div class="grid gap-4 md:grid-cols-3">
				<div class="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
					<h4 class="font-semibold text-green-700">Use Semantic HTML</h4>
					<p class="mt-2">
						Choose elements based on their meaning, not just their appearance. This improves
						accessibility, SEO, and code clarity.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-purple-500 bg-purple-50 p-4">
					<h4 class="font-semibold text-purple-700">Maintain Hierarchy</h4>
					<p class="mt-2">
						Follow proper heading levels and create logical document structures. Don't skip heading
						levels for styling reasons.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
					<h4 class="font-semibold text-blue-700">Prioritize Accessibility</h4>
					<p class="mt-2">
						Always include alt text for images, use appropriate landmarks, and test with screen
						readers when possible.
					</p>
				</div>
			</div>
		</section>

		<div class="mt-6 rounded-lg bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Interactive Challenge</h3>
			<p class="text-lg">
				Now it's your turn to practice! In the next section, you'll apply these concepts to create
				your own webpage that incorporates all the elements we've covered.
			</p>
			<p class="mt-2">
				Remember that the building blocks we've covered here form the foundation of every webpage on
				the internet, from simple blogs to complex web applications.
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
								href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN HTML Elements Reference</a
							>
						</li>
						<li>
							<a
								href="https://www.w3schools.com/html/default.asp"
								target="_blank"
								class="text-indigo-600 hover:underline">W3Schools HTML Tutorial</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Practice</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://www.freecodecamp.org/learn/responsive-web-design/basic-html-and-html5/"
								target="_blank"
								class="text-indigo-600 hover:underline">freeCodeCamp HTML Challenges</a
							>
						</li>
						<li>
							<a
								href="https://codepen.io/pen/"
								target="_blank"
								class="text-indigo-600 hover:underline">CodePen</a
							> - Create and share HTML examples
						</li>
					</ul>
				</div>
			</div>
		</section>

		<p class="mt-2">
			Examples like <code class="code">&lt;img&gt;</code> and <code class="code">&lt;br&gt;</code> are
			self-closing tags.
		</p>
	</div>
</ModuleTask>;

<style>
	code.code {
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
