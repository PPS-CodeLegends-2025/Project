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
		title: 'Challenge: SEO-Optimized Landing Page'
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
  <title>My Landing Page</title>
  <!-- Add your SEO meta tags here -->
</head>
<body>
  <!-- Create your SEO-optimized landing page here -->
  
</body>
</html>`);

	let taskCompleted = $state(false);
	let submissionResult = $state<ValidationResult | null>(null);
	let validationErrors = $state<ValidationError[]>([]);

	const validateSeoLandingPage = (code: string) => {
		const customChecks = [
			createCustomCheck('doctype', 'Include the HTML5 doctype declaration.', /<!DOCTYPE html>/i),
			createCustomCheck(
				'htmlLang',
				'Set the language attribute on the html element for better accessibility and SEO.',
				/<html[\s\S]*?lang=["'][a-z-]+["'][\s\S]*?>/i
			),
			createCustomCheck(
				'metaDescription',
				'Include a meta description tag to improve SEO.',
				/<meta[\s\S]*?name=["']description["'][\s\S]*?content=["'][^"']{10,}["'][\s\S]*?>/i
			),
			createCustomCheck(
				'metaViewport',
				'Include a viewport meta tag for responsive design.',
				/<meta[\s\S]*?name=["']viewport["'][\s\S]*?>/i
			),
			createCustomCheck(
				'titleTag',
				'Use a descriptive title tag that includes relevant keywords.',
				/<title>[\s\S]{5,}[\s\S]*?<\/title>/i
			),
			createCustomCheck(
				'headings',
				'Use heading elements (h1-h6) to create a logical content hierarchy.',
				/<h1[\s\S]*?>[\s\S]*?<\/h1>[\s\S]*?<h[2-6][\s\S]*?>[\s\S]*?<\/h[2-6]>/i
			),
			createCustomCheck(
				'semanticElements',
				'Use semantic HTML elements like header, main, section, article, or footer.',
				/(<header|<main|<section|<article|<footer|<nav|<aside)[\s\S]*?>/i
			),
			createCustomCheck('image', 'Include at least one image element.', /<img[\s\S]*?>/i),
			createCustomCheck(
				'imageAlt',
				'Provide descriptive alt text for all images.',
				/<img[\s\S]*?alt=["'][^"']{5,}["'][\s\S]*?>/i
			),
			createCustomCheck(
				'paragraphContent',
				'Include descriptive paragraph content about your topic.',
				/<p[\s\S]*?>[\s\S]{20,}?<\/p>/i
			),
			createCustomCheck(
				'metaKeywords',
				'Consider adding meta keywords related to your hobby or interest.',
				// Making this always "pass" but still show the message as a suggestion
				() => true
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
			submissionResult = validateSeoLandingPage(htmlCode);

			validationErrors = submissionResult.errors || [];

			if (!submissionResult.success) {
				submissionResult = null;
			}
		} catch (error) {
			console.error('Error in SEO landing page validation:', error);
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

	// Example image URLs for inspiration
	const imageUrls = [
		'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
		'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
	];
</script>

<ModuleTask {...taskProps}>
	<div class="space-y-6">
		<section>
			<h3 class="mb-3 text-xl font-semibold">Challenge: Create an SEO-Optimized Landing Page</h3>
			<p class="text-lg">
				Now that you've learned about clean HTML and SEO best practices, it's time to apply those
				skills by creating a landing page that's optimized for search engines. You'll build a page
				about your favorite hobby or interest using semantic HTML and proper SEO elements.
			</p>
			<p class="mt-2 text-lg">
				This challenge will help you understand how proper HTML structure and metadata contribute to
				a page's visibility in search results and overall accessibility.
			</p>
		</section>

		<div class="border-l-4 border-indigo-500 bg-indigo-50 p-4">
			<h4 class="font-semibold">✨ Your Mission:</h4>
			<p>Create a landing page about your favorite hobby or interest that includes:</p>
			<ul class="mt-2 ml-6 list-disc">
				<li>
					A descriptive <code class="code">&lt;title&gt;</code> tag that includes keywords related to
					your topic
				</li>
				<li>
					SEO meta tags in the <code class="code">&lt;head&gt;</code> section (at minimum, a meta description)
				</li>
				<li>
					Proper document structure with semantic HTML elements like <code class="code"
						>&lt;header&gt;</code
					>, <code class="code">&lt;main&gt;</code>, <code class="code">&lt;section&gt;</code>, etc.
				</li>
				<li>
					A logical heading hierarchy starting with an <code class="code">&lt;h1&gt;</code> and using
					subheadings appropriately
				</li>
				<li>
					At least one image with descriptive <code class="code">alt</code> text that includes relevant
					keywords
				</li>
				<li>
					Descriptive, keyword-rich content in paragraphs that would help visitors and search
					engines understand your topic
				</li>
			</ul>
			<p class="mt-3 italic">
				Remember: Good SEO is about creating valuable content for real users while making it easily
				discoverable by search engines.
			</p>
		</div>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Landing Page Topic Ideas</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div class="rounded-lg border border-purple-200 bg-purple-50 p-3 shadow-sm">
					<h4 class="font-medium text-purple-700">Creative Hobbies</h4>
					<ul class="mt-1 list-disc pl-5 text-sm">
						<li>Photography basics for beginners</li>
						<li>Introduction to watercolor painting</li>
						<li>Creative writing techniques</li>
						<li>Getting started with knitting</li>
					</ul>
				</div>
				<div class="rounded-lg border border-blue-200 bg-blue-50 p-3 shadow-sm">
					<h4 class="font-medium text-blue-700">Technology & Gaming</h4>
					<ul class="mt-1 list-disc pl-5 text-sm">
						<li>Beginner's guide to PC building</li>
						<li>Introduction to 3D printing</li>
						<li>Getting started with chess</li>
						<li>Drone photography basics</li>
					</ul>
				</div>
				<div class="rounded-lg border border-green-200 bg-green-50 p-3 shadow-sm">
					<h4 class="font-medium text-green-700">Outdoor & Wellness</h4>
					<ul class="mt-1 list-disc pl-5 text-sm">
						<li>Hiking tips for beginners</li>
						<li>Urban gardening in small spaces</li>
						<li>Mindfulness meditation practices</li>
						<li>Home workout essentials</li>
					</ul>
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
						<svelte:fragment slot="trigger">Hint: SEO Meta Tags</svelte:fragment>
						<div class="hint-card">
							<p>
								Add these important meta tags to the <code>&lt;head&gt;</code> section of your HTML:
							</p>
							<pre class="code mt-2 rounded p-2">
&lt;meta charset="UTF-8"&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;meta name="description" content="A comprehensive guide to [your topic]. Learn about [key aspect], [key aspect], and [key aspect] for beginners and enthusiasts alike."&gt;
&lt;meta name="keywords" content="[keyword], [keyword], [keyword], [keyword]"&gt;
&lt;meta name="author" content="Your Name"&gt;

&lt;title&gt;Descriptive, Keyword-Rich Title About Your Topic | Your Brand&lt;/title&gt;</pre>
							<p class="mt-2 text-sm">
								The meta description should be 150-160 characters and include your main keywords
								naturally. Make it compelling as this often appears in search results.
							</p>
						</div>
					</AccordionItem>

					<AccordionItem value="hint2">
						<svelte:fragment slot="trigger">Hint: Semantic Structure</svelte:fragment>
						<div class="hint-card">
							<p>Use semantic HTML elements to create a well-structured document:</p>
							<pre class="code mt-2 rounded p-2">
&lt;body&gt;
  &lt;header&gt;
    &lt;h1&gt;Main Topic Title&lt;/h1&gt;
    &lt;nav&gt;
      &lt;!-- Navigation links if needed --&gt;
    &lt;/nav&gt;
  &lt;/header&gt;
  
  &lt;main&gt;
    &lt;section&gt;
      &lt;h2&gt;Introduction to [Your Topic]&lt;/h2&gt;
      &lt;p&gt;Descriptive paragraph about your topic...&lt;/p&gt;
      &lt;img src="image-url.jpg" alt="Descriptive alt text with keywords about [specific aspect]"&gt;
    &lt;/section&gt;
    
    &lt;section&gt;
      &lt;h2&gt;Key Benefits or Features&lt;/h2&gt;
      &lt;article&gt;
        &lt;h3&gt;First Benefit&lt;/h3&gt;
        &lt;p&gt;Detailed description...&lt;/p&gt;
      &lt;/article&gt;
      
      &lt;article&gt;
        &lt;h3&gt;Second Benefit&lt;/h3&gt;
        &lt;p&gt;Detailed description...&lt;/p&gt;
      &lt;/article&gt;
    &lt;/section&gt;
  &lt;/main&gt;
  
  &lt;footer&gt;
    &lt;p&gt;© 2023 Your Name - All about [Your Topic]&lt;/p&gt;
  &lt;/footer&gt;
&lt;/body&gt;</pre>
							<p class="mt-2 text-sm">
								This structure helps search engines understand the importance and relationship
								between different parts of your content.
							</p>
						</div>
					</AccordionItem>

					<AccordionItem value="hint3">
						<svelte:fragment slot="trigger">Hint: Image SEO</svelte:fragment>
						<div class="hint-card">
							<p>Here are some example images you could use (remember to add proper alt text):</p>
							<div class="mt-2 grid grid-cols-2 gap-2">
								{#each imageUrls as url, i (i)}
									<div class="text-center">
										<img
											src={url}
											alt="Example imagery for landing page"
											class="h-auto w-full rounded"
										/>
										<button
											class="mt-1 text-xs text-blue-600"
											onclick={() => {
												navigator.clipboard.writeText(url);
												alert('Image URL copied to clipboard!');
											}}>Copy URL</button
										>
									</div>
								{/each}
							</div>
							<p class="mt-3 text-sm">
								When adding images, use descriptive filenames and alt text that include relevant
								keywords:
							</p>
							<pre class="code mt-2 rounded p-2">
&lt;img 
  src="mountain-hiking-trail-sunset.jpg" 
  alt="Scenic mountain hiking trail in Colorado at sunset with pine trees and rocky terrain"
  width="800"
  height="500"
&gt;</pre>
							<p class="mt-2 text-sm">
								Including dimensions (width/height) helps prevent layout shifts during page load,
								which improves Core Web Vitals scores.
							</p>
						</div>
					</AccordionItem>

					<AccordionItem value="hint4">
						<svelte:fragment slot="trigger">Hint: Content Optimization</svelte:fragment>
						<div class="hint-card">
							<p>Write SEO-friendly content by following these guidelines:</p>
							<ul class="mt-2 list-disc space-y-1 pl-6">
								<li>Use your main keywords in the first paragraph</li>
								<li>Include keywords naturally in headings (H1, H2, H3)</li>
								<li>Write paragraphs that are 2-5 sentences long for readability</li>
								<li>Use related terms and synonyms (LSI keywords) throughout your content</li>
								<li>Make sure your content answers common questions about your topic</li>
								<li>
									If appropriate, include lists (ul/ol) to break up text and highlight key points
								</li>
							</ul>
							<p class="mt-2 text-sm italic">
								Remember: Write for humans first, search engines second. Keyword stuffing can hurt
								your SEO.
							</p>
						</div>
					</AccordionItem>

					<AccordionItem value="hint5">
						<svelte:fragment slot="trigger">Hint: Complete Example Structure</svelte:fragment>
						<div class="hint-card">
							<p>Here's a simplified example for a photography landing page:</p>
							<pre class="code mt-2 rounded p-2">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;meta name="description" content="Beginner's guide to digital photography. Learn essential camera settings, composition techniques, and editing tips to take stunning photos."&gt;
  &lt;meta name="keywords" content="photography tips, digital photography, beginner photography, camera settings"&gt;
  &lt;title&gt;Digital Photography for Beginners: Essential Tips & Techniques&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;header&gt;
    &lt;h1&gt;Digital Photography Essentials: A Beginner's Guide&lt;/h1&gt;
    &lt;p&gt;Master the fundamentals and start taking beautiful photos today&lt;/p&gt;
  &lt;/header&gt;
  
  &lt;main&gt;
    &lt;section&gt;
      &lt;h2&gt;Why Photography Is a Rewarding Hobby&lt;/h2&gt;
      &lt;p&gt;Photography allows you to capture moments, express creativity, and see the world through a new lens. Whether you're using a smartphone or a DSLR, these fundamental techniques will help you take better photos immediately.&lt;/p&gt;
      &lt;img 
        src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94"
        alt="Stunning landscape photograph of mountain sunrise showcasing photography composition techniques"
        width="800"
        height="500"
      &gt;
    &lt;/section&gt;
    
    &lt;section&gt;
      &lt;h2&gt;Essential Camera Settings for Beginners&lt;/h2&gt;
      &lt;article&gt;
        &lt;h3&gt;Understanding Aperture&lt;/h3&gt;
        &lt;p&gt;Aperture controls the amount of light entering your camera and affects depth of field. A wider aperture (smaller f-number) creates a blurry background, perfect for portraits. A narrow aperture (larger f-number) keeps more of your scene in focus, ideal for landscapes.&lt;/p&gt;
      &lt;/article&gt;
      
      &lt;article&gt;
        &lt;h3&gt;Mastering Shutter Speed&lt;/h3&gt;
        &lt;p&gt;Shutter speed determines how long your camera's sensor is exposed to light. Fast shutter speeds freeze action, while slow shutter speeds create motion blur effects like silky waterfall shots or light trails from cars at night.&lt;/p&gt;
      &lt;/article&gt;
    &lt;/section&gt;
  &lt;/main&gt;
  
  &lt;footer&gt;
    &lt;p&gt;© 2023 Photography Enthusiast - Helping beginners master digital photography&lt;/p&gt;
  &lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
							<p class="mt-2 text-sm italic">
								Use this as inspiration, but create your own unique content about a hobby or
								interest you're passionate about!
							</p>
						</div>
					</AccordionItem>
				</Accordion>
			</div>
		</div>

		<div class="mt-8 rounded-lg bg-blue-50 p-6">
			<h4 class="font-semibold">Why SEO-Optimized HTML Matters</h4>
			<p class="mt-2">
				When you create a webpage, you want people to find it. Search engines like Google analyze
				your HTML structure, content, and metadata to determine what your page is about and how
				relevant it is to searchers. Well-structured HTML with appropriate metadata helps search
				engines understand your content better, potentially leading to higher rankings.
			</p>
			<p class="mt-2">
				This isn't just about technical SEO tricks—it's about creating a better user experience. The
				same elements that help search engines understand your page (descriptive headings, organized
				content, clear structure) also help human visitors navigate and comprehend your information.
			</p>
			<p class="mt-2">
				In professional web development, these SEO best practices are standard for every page you
				create, whether it's a personal blog or an enterprise e-commerce site.
			</p>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Additional Resources</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">SEO Fundamentals</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://moz.com/beginners-guide-to-seo"
								target="_blank"
								class="text-indigo-600 hover:underline">Moz: Beginner's Guide to SEO</a
							>
						</li>
						<li>
							<a
								href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
								target="_blank"
								class="text-indigo-600 hover:underline">Google: SEO Starter Guide</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Tools & Techniques</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://search.google.com/search-console"
								target="_blank"
								class="text-indigo-600 hover:underline">Google Search Console</a
							> - Free tool to monitor search performance
						</li>
						<li>
							<a
								href="https://web.dev/learn/seo/"
								target="_blank"
								class="text-indigo-600 hover:underline">web.dev: Learn SEO</a
							> - Google's guide to modern SEO
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
