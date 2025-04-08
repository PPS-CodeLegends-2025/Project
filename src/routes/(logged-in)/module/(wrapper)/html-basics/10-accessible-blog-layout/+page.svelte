<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { Accordion, AccordionItem } from '$lib/components/ui/accordion';
	import JsCodeEditor from '$lib/components/code/JsCodeEditor.svelte';
	import { modules } from '$lib/client/services/modules';
	import { onMount } from 'svelte';
	import { validateHtml, createCustomCheck, type ValidationResult } from '$lib/utils/htmlValidator';
	import HtmlPreview from '$lib/components/code/HtmlPreview.svelte';
	import type { ValidationError } from '$lib/utils/htmlValidator';

	const sectionData: Section = {
		title: 'Challenge: Accessible Blog Layout'
	};

	let { data }: PageProps = $props();

	const sectionIndex = data.section.index;
	const userId = data.user.id;
	const moduleId = data.module.data.url;

	let htmlCode = $state(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Blog</title>
</head>
<body>
  <!-- Create your semantic blog layout here -->
  
</body>
</html>`);

	let taskCompleted = $state(false);
	let submissionResult = $state<ValidationResult | null>(null);
	let validationErrors = $state<ValidationError[]>([]);

	const validateBlogLayout = (code: string) => {
		const customChecks = [
			createCustomCheck(
				'headerElement',
				'Your blog should have a <header> element for the page header/banner.',
				/<header[\s\S]*?>[\s\S]*?<\/header>/i
			),
			createCustomCheck(
				'navElement',
				'Include a <nav> element for your site navigation.',
				/<nav[\s\S]*?>[\s\S]*?<\/nav>/i
			),
			createCustomCheck(
				'mainElement',
				'Use a <main> element to contain your primary content.',
				/<main[\s\S]*?>[\s\S]*?<\/main>/i
			),
			createCustomCheck(
				'articleElement',
				'The blog post should be in an <article> element.',
				/<article[\s\S]*?>[\s\S]*?<\/article>/i
			),
			createCustomCheck(
				'asideElement',
				'Add an <aside> element for the sidebar content.',
				/<aside[\s\S]*?>[\s\S]*?<\/aside>/i
			),
			createCustomCheck(
				'footerElement',
				'Your blog needs a <footer> element for the page footer.',
				/<footer[\s\S]*?>[\s\S]*?<\/footer>/i
			),
			createCustomCheck(
				'headingHierarchy',
				'Use proper heading hierarchy with at least an <h1> and an <h2>.',
				/(<h1[\s\S]*?>[\s\S]*?<\/h1>)[\s\S]*?(<h2[\s\S]*?>[\s\S]*?<\/h2>)/i
			),
			createCustomCheck(
				'paragraphContent',
				'Include paragraph content using <p> tags.',
				/<p[\s\S]*?>[\s\S]*?<\/p>/i
			)
		];

		const result = validateHtml(code, customChecks);

		if (result.success) {
			taskCompleted = true;
		}

		return result;
	};

	const handleSubmit = () => {
		try {
			submissionResult = validateBlogLayout(htmlCode);

			validationErrors = submissionResult.errors || [];

			if (!submissionResult.success) {
				submissionResult = null;
			}
		} catch (error) {
			console.error('Error in blog layout validation:', error);
			validationErrors = [];
		}
	};

	onMount(() => {});

	const taskProps = $derived({
		section: { ...sectionData, ...data.section.meta },
		nextSection: data.module.sections[sectionIndex + 1],
		prevSection: data.module.sections[sectionIndex - 1],
		completed: data.section.completed,
		completedNow: taskCompleted,
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
	});
</script>

<ModuleTask {...taskProps}>
	<div class="space-y-6">
		<section>
			<h3 class="mb-3 text-xl font-semibold">Challenge: Build an Accessible Blog Layout</h3>
			<p class="text-lg">
				Now that you understand semantic HTML, it's time to put your knowledge into practice by
				creating an accessible blog layout. Using semantic HTML elements not only creates a
				well-structured document, but also improves accessibility for users with screen readers and
				other assistive technologies.
			</p>
			<p class="mt-2 text-lg">
				This challenge focuses on organizing content meaningfully using the appropriate HTML
				elements for each section of a blog.
			</p>
		</section>

		<div class="border-l-4 border-indigo-500 bg-indigo-50 p-4">
			<h4 class="font-semibold">✨ Your Mission:</h4>
			<p>Create a blog layout that includes:</p>
			<ul class="mt-2 ml-6 list-disc">
				<li>
					A page <code class="code">&lt;header&gt;</code> containing the blog title and tagline
				</li>
				<li>
					A <code class="code">&lt;nav&gt;</code> section with navigation links
				</li>
				<li>
					A <code class="code">&lt;main&gt;</code> content area that contains:
					<ul class="ml-6 list-disc">
						<li>
							At least one blog post in an <code class="code">&lt;article&gt;</code> element
						</li>
						<li>
							Proper headings (<code class="code">&lt;h1&gt;</code>,
							<code class="code">&lt;h2&gt;</code>, etc.) with a logical hierarchy
						</li>
					</ul>
				</li>
				<li>
					An <code class="code">&lt;aside&gt;</code> element for sidebar content (like categories, recent
					posts, etc.)
				</li>
				<li>
					A page <code class="code">&lt;footer&gt;</code> with copyright information
				</li>
			</ul>
			<p class="mt-3 italic">
				Focus on the structure and semantics, not on styling. The goal is to create a well-organized
				and accessible document structure.
			</p>
		</div>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Blog Layout Diagram</h3>
			<div class="rounded-lg border bg-white p-5">
				<div class="grid grid-cols-1 gap-4">
					<div class="rounded border-2 border-dashed border-blue-300 bg-blue-50 p-4 text-center">
						<strong>&lt;header&gt;</strong> - Page Header & Logo
					</div>
					<div class="rounded border-2 border-dashed border-green-300 bg-green-50 p-4 text-center">
						<strong>&lt;nav&gt;</strong> - Navigation Links
					</div>
					<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
						<div class="md:col-span-2">
							<div
								class="rounded border-2 border-dashed border-amber-300 bg-amber-50 p-4 text-center"
							>
								<strong>&lt;main&gt;</strong>
								<div class="mt-2 rounded border-2 border-dashed border-red-300 bg-red-50 p-4">
									<strong>&lt;article&gt;</strong> - Blog Posts
									<div class="mt-2 text-sm">(with headings, paragraphs, etc.)</div>
								</div>
							</div>
						</div>
						<div>
							<div
								class="h-full rounded border-2 border-dashed border-purple-300 bg-purple-50 p-4 text-center"
							>
								<strong>&lt;aside&gt;</strong> - Sidebar Content
								<div class="mt-2 text-sm">(categories, recent posts, etc.)</div>
							</div>
						</div>
					</div>
					<div class="rounded border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center">
						<strong>&lt;footer&gt;</strong> - Copyright Info
					</div>
				</div>
			</div>
		</section>

		<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
			<div class="flex flex-col">
				<h4 class="mb-3 font-semibold">Code Editor</h4>
				<div class="editor-container">
					<JsCodeEditor bind:value={htmlCode} />
				</div>

				<div class="mt-4 flex justify-end">
					<button class="btn primary" onclick={() => handleSubmit()}>Submit</button>
				</div>

				{#if submissionResult && submissionResult.success}
					<div class="box success mt-4">
						{submissionResult.message}
					</div>
				{/if}
			</div>

			<div class="flex flex-col">
				<h4 class="mb-3 font-semibold">Preview</h4>
				<div class="preview-container">
					<HtmlPreview {htmlCode} height="100%" {validationErrors} />
				</div>

				<Accordion className="mt-4">
					<AccordionItem value="hint1">
						<svelte:fragment slot="trigger">Hint: Basic Structure</svelte:fragment>
						<div class="hint-card">
							<p>Here's a skeleton structure to get you started:</p>
							<pre class="code mt-2 rounded p-2">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;My Blog&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;header&gt;
    &lt;!-- Blog title and tagline go here --&gt;
  &lt;/header&gt;
  
  &lt;nav&gt;
    &lt;!-- Navigation links go here --&gt;
  &lt;/nav&gt;
  
  &lt;main&gt;
    &lt;article&gt;
      &lt;!-- Blog post content goes here --&gt;
    &lt;/article&gt;
  &lt;/main&gt;
  
  &lt;aside&gt;
    &lt;!-- Sidebar content goes here --&gt;
  &lt;/aside&gt;
  
  &lt;footer&gt;
    &lt;!-- Footer content goes here --&gt;
  &lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint2">
						<svelte:fragment slot="trigger">Hint: Header & Navigation</svelte:fragment>
						<div class="hint-card">
							<p>For the header and navigation section:</p>
							<pre class="code mt-2 rounded p-2">
&lt;header&gt;
  &lt;h1&gt;My Web Development Blog&lt;/h1&gt;
  &lt;p&gt;Exploring HTML, CSS, and JavaScript&lt;/p&gt;
&lt;/header&gt;

&lt;nav&gt;
  &lt;ul&gt;
    &lt;li&gt;&lt;a href="#"&gt;Home&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Articles&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;Tutorials&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;About&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint3">
						<svelte:fragment slot="trigger">Hint: Main Content & Sidebar</svelte:fragment>
						<div class="hint-card">
							<p>For the main content and sidebar:</p>
							<pre class="code mt-2 rounded p-2">
&lt;main&gt;
  &lt;article&gt;
    &lt;h2&gt;Getting Started with Semantic HTML&lt;/h2&gt;
    &lt;p class="meta"&gt;Posted on October 22, 2023 by WebDev&lt;/p&gt;
    
    &lt;p&gt;Semantic HTML is the use of HTML markup to reinforce the meaning of the content...&lt;/p&gt;
    
    &lt;h3&gt;Why Semantics Matter&lt;/h3&gt;
    &lt;p&gt;Using semantic HTML improves accessibility, SEO, and makes your code more readable...&lt;/p&gt;
    
    &lt;h3&gt;Key Semantic Elements&lt;/h3&gt;
    &lt;p&gt;Some of the most useful semantic elements include header, nav, main, article...&lt;/p&gt;
  &lt;/article&gt;
&lt;/main&gt;

&lt;aside&gt;
  &lt;h3&gt;Categories&lt;/h3&gt;
  &lt;ul&gt;
    &lt;li&gt;HTML&lt;/li&gt;
    &lt;li&gt;CSS&lt;/li&gt;
    &lt;li&gt;JavaScript&lt;/li&gt;
    &lt;li&gt;Accessibility&lt;/li&gt;
  &lt;/ul&gt;
  
  &lt;h3&gt;Recent Posts&lt;/h3&gt;
  &lt;ul&gt;
    &lt;li&gt;CSS Grid Layout&lt;/li&gt;
    &lt;li&gt;JavaScript Basics&lt;/li&gt;
    &lt;li&gt;Responsive Design&lt;/li&gt;
  &lt;/ul&gt;
&lt;/aside&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint4">
						<svelte:fragment slot="trigger">Hint: Footer</svelte:fragment>
						<div class="hint-card">
							<p>For the footer section:</p>
							<pre class="code mt-2 rounded p-2">
&lt;footer&gt;
  &lt;p&gt;&copy; 2023 My Web Development Blog. All rights reserved.&lt;/p&gt;
  &lt;nav&gt;
    &lt;ul&gt;
      &lt;li&gt;&lt;a href="#"&gt;Privacy Policy&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="#"&gt;Terms of Service&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="#"&gt;Contact&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/nav&gt;
&lt;/footer&gt;</pre>
						</div>
					</AccordionItem>
				</Accordion>
			</div>
		</div>

		<div class="mt-8 rounded-lg bg-blue-50 p-6">
			<h4 class="font-semibold">Why Semantic Structure Matters for Blogs</h4>
			<p class="mt-2">
				Blog websites particularly benefit from semantic HTML because they typically contain various
				types of content that need clear organization:
			</p>
			<ul class="mt-3 list-disc space-y-1 pl-6">
				<li>
					<strong>Navigation:</strong> Readers need to easily move between different sections and articles
				</li>
				<li>
					<strong>Content organization:</strong> Clear separation between posts, sidebars, and metadata
				</li>
				<li>
					<strong>Hierarchy:</strong> Logical heading structure makes content skimmable and accessible
				</li>
				<li>
					<strong>SEO:</strong> Search engines better understand and rank content with proper semantic
					markup
				</li>
				<li>
					<strong>Assistive technologies:</strong> Screen readers can navigate and announce content properly
				</li>
			</ul>
			<p class="mt-3">
				Many professional blogs and news sites follow similar semantic structures to what you're
				building in this exercise.
			</p>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Additional Resources</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Semantic HTML References</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN: HTML - Accessibility</a
							>
						</li>
						<li>
							<a
								href="https://www.w3.org/WAI/tutorials/"
								target="_blank"
								class="text-indigo-600 hover:underline">W3C Web Accessibility Tutorials</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Real-World Examples</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://alistapart.com/"
								target="_blank"
								class="text-indigo-600 hover:underline">A List Apart</a
							> - Example of well-structured web content
						</li>
						<li>
							<a
								href="https://css-tricks.com/"
								target="_blank"
								class="text-indigo-600 hover:underline">CSS-Tricks</a
							> - A blog with excellent semantic structure
						</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</ModuleTask>

<style>
	.hint-card {
		border-left: 4px solid #3b82f6;
		background-color: #eff6ff;
		padding: 1rem;
		margin-top: 0.5rem;
	}

	.editor-container {
		height: 25rem;
		margin-bottom: 1rem;
	}

	.preview-container {
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		overflow: hidden;
		background-color: white;
		width: 100%;
		height: 25rem;
	}

	.code {
		font-family: monospace;
		background-color: #f3f4f6;
		padding: 0.1rem 0.3rem;
		border-radius: 0.25rem;
	}

	.hint-card pre {
		white-space: pre-wrap;
		word-wrap: break-word;
		overflow-x: auto;
		max-width: 100%;
		margin: 0.5rem 0;
	}

	pre.code {
		display: block;
		padding: 0.75rem;
		line-height: 1.4;
	}
</style>
