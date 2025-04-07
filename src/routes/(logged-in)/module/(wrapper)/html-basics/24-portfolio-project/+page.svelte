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
		title: 'Final Project: Personal Portfolio Page'
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
  <title>My Portfolio</title>
</head>
<body>
  <!-- Create your portfolio page here -->
  
</body>
</html>`);

	let taskCompleted = $state(false);
	let submissionResult = $state<ValidationResult | null>(null);
	let validationErrors = $state<ValidationError[]>([]);

	const validatePortfolioPage = (code: string) => {
		const customChecks = [
			createCustomCheck(
				'properStructure',
				'Your page should have the proper HTML structure with <!DOCTYPE>, <html>, <head>, and <body> tags.',
				/<!DOCTYPE html>[\s\S]*?<html[\s\S]*?>[\s\S]*?<head[\s\S]*?>[\s\S]*?<\/head>[\s\S]*?<body[\s\S]*?>[\s\S]*?<\/body>[\s\S]*?<\/html>/i
			),
			createCustomCheck(
				'title',
				'Include a descriptive title for your portfolio page.',
				/<title[\s\S]*?>[\s\S]*?<\/title>/i
			),
			createCustomCheck(
				'semanticStructure',
				'Use semantic structure (header, main, footer, etc.) for better accessibility.',
				/(<header[\s\S]*?>[\s\S]*?<\/header>|<nav[\s\S]*?>[\s\S]*?<\/nav>|<main[\s\S]*?>[\s\S]*?<\/main>|<section[\s\S]*?>[\s\S]*?<\/section>|<article[\s\S]*?>[\s\S]*?<\/article>|<footer[\s\S]*?>[\s\S]*?<\/footer>)/i
			),
			createCustomCheck(
				'heading1',
				'Your portfolio should have a main heading with your name or a title.',
				/<h1[\s\S]*?>[\s\S]*?<\/h1>/i
			),
			createCustomCheck(
				'biographySection',
				'Include a section with biographical information about yourself.',
				/bio|about|profile|introduction|myself/i
			),
			createCustomCheck(
				'paragraphContent',
				'Add paragraph content to describe yourself or your work.',
				/<p[\s\S]*?>[\s\S]*?<\/p>/i
			),
			createCustomCheck(
				'form',
				'Create a contact form with at least one input field and a submit button.',
				/<form[\s\S]*?>[\s\S]*?<input[\s\S]*?>[\s\S]*?<\/form>/i
			),
			createCustomCheck(
				'formButton',
				'Your form should include a button to submit it.',
				/<form[\s\S]*?>[\s\S]*?<button[\s\S]*?>[\s\S]*?<\/button>[\s\S]*?<\/form>|<form[\s\S]*?>[\s\S]*?<input[\s\S]*?type=["']submit["'][\s\S]*?>[\s\S]*?<\/form>/i
			),
			createCustomCheck(
				'multimedia',
				'Include multimedia content like video or audio.',
				/<(video|audio|iframe)[\s\S]*?>/i
			),
			createCustomCheck(
				'projectsList',
				'Display your projects using either an ordered or unordered list.',
				/<(ol|ul)[\s\S]*?>[\s\S]*?<li[\s\S]*?>[\s\S]*?<\/li>[\s\S]*?<\/(ol|ul)>/i
			),
			createCustomCheck(
				'tableElement',
				'Use a table to organize some information on your page.',
				/<table[\s\S]*?>[\s\S]*?<\/table>/i
			),
			createCustomCheck(
				'additionalStructure',
				'Use additional HTML elements to enhance your portfolio.',
				/(<img[\s\S]*?>|<a[\s\S]*?>[\s\S]*?<\/a>)/i
			),
			createCustomCheck(
				'personalizedContent',
				'Add more personalized content to make your portfolio unique!',
				(code) => code.length > 500
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
			submissionResult = validatePortfolioPage(htmlCode);
			validationErrors = submissionResult.errors || [];

			if (!submissionResult.success) {
				submissionResult = null;
			}
		} catch (error) {
			console.error('Error in portfolio page validation:', error);
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
			<h3 class="mb-3 text-xl font-semibold">Create Your Personal Portfolio Page</h3>
			<p class="text-lg">
				Congratulations on reaching the final project of the HTML Basics module! Now it's time to
				apply everything you've learned to create something meaningful—a portfolio page that
				showcases who you are and what you can do.
			</p>
			<p class="mt-2 text-lg">
				This project brings together all the HTML concepts you've learned: document structure,
				semantic elements, forms, tables, lists, multimedia, and accessibility.
			</p>
		</section>

		<div class="border-l-4 border-indigo-500 bg-indigo-50 p-4">
			<h4 class="font-semibold">✨ Your Portfolio Project Requirements:</h4>
			<p>Create a complete portfolio page that includes:</p>
			<ul class="mt-2 ml-6 list-disc">
				<li>
					<strong>Introduction & Bio:</strong> A section about yourself with proper heading structure
					and paragraphs
				</li>
				<li>
					<strong>Contact Form:</strong> A form with input fields (name, email, message) and a submit
					button
				</li>
				<li>
					<strong>Multimedia:</strong> Embedded video or audio content (YouTube video, SoundCloud, or
					HTML5 audio/video)
				</li>
				<li>
					<strong>Project Showcase:</strong> Display your projects using lists and organize information
					in a table
				</li>
				<li>
					<strong>Semantic Structure:</strong> Use semantic HTML elements (<code class="code"
						>&lt;header&gt;</code
					>, <code class="code">&lt;nav&gt;</code>, <code class="code">&lt;main&gt;</code>, etc.)
					throughout your page
				</li>
			</ul>
			<p class="mt-3 italic">
				Make it personal and showcase your skills! This portfolio serves as a demonstration of your
				HTML knowledge.
			</p>
		</div>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Portfolio Page Structure</h3>
			<div class="rounded-lg border bg-white p-5">
				<div class="grid grid-cols-1 gap-4">
					<div class="rounded border-2 border-dashed border-blue-300 bg-blue-50 p-4 text-center">
						<strong>&lt;header&gt;</strong> - Your name, profile image, and navigation
					</div>
					<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
						<div class="md:col-span-3">
							<div
								class="rounded border-2 border-dashed border-amber-300 bg-amber-50 p-4 text-center"
							>
								<strong>&lt;main&gt;</strong>
								<div class="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3">
									<div
										class="rounded border-2 border-dashed border-green-300 bg-green-50 p-2 text-center"
									>
										<strong>&lt;section&gt;</strong> - About Me
									</div>
									<div
										class="rounded border-2 border-dashed border-green-300 bg-green-50 p-2 text-center"
									>
										<strong>&lt;section&gt;</strong> - Projects Table/List
									</div>
									<div
										class="rounded border-2 border-dashed border-green-300 bg-green-50 p-2 text-center"
									>
										<strong>&lt;section&gt;</strong> - Multimedia Content
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						class="rounded border-2 border-dashed border-purple-300 bg-purple-50 p-4 text-center"
					>
						<strong>&lt;section&gt;</strong> - Contact Form
					</div>
					<div class="rounded border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center">
						<strong>&lt;footer&gt;</strong> - Copyright, Social Links
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
						<svelte:fragment slot="trigger">Hint: Page Structure</svelte:fragment>
						<div class="hint-card">
							<p>Here's a starting structure for your portfolio:</p>
							<pre class="code mt-2 rounded p-2">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;Your Name - Portfolio&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;header&gt;
    &lt;h1&gt;Your Name&lt;/h1&gt;
    &lt;p&gt;Web Developer&lt;/p&gt;
    
    &lt;nav&gt;
      &lt;ul&gt;
        &lt;li&gt;&lt;a href="#about"&gt;About&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#projects"&gt;Projects&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#contact"&gt;Contact&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/nav&gt;
  &lt;/header&gt;
  
  &lt;main&gt;
    &lt;section id="about"&gt;
      &lt;!-- About section here --&gt;
    &lt;/section&gt;
    
    &lt;section id="projects"&gt;
      &lt;!-- Projects section here --&gt;
    &lt;/section&gt;
    
    &lt;section id="multimedia"&gt;
      &lt;!-- Multimedia section here --&gt;
    &lt;/section&gt;
  &lt;/main&gt;
  
  &lt;section id="contact"&gt;
    &lt;!-- Contact form here --&gt;
  &lt;/section&gt;
  
  &lt;footer&gt;
    &lt;!-- Footer content here --&gt;
  &lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint2">
						<svelte:fragment slot="trigger">Hint: About Me Section</svelte:fragment>
						<div class="hint-card">
							<p>Create a personal and engaging About Me section:</p>
							<pre class="code mt-2 rounded p-2">
&lt;section id="about"&gt;
  &lt;h2&gt;About Me&lt;/h2&gt;
  &lt;img src="https://api.dicebear.com/7.x/avataaars/svg?seed=YourName" alt="Profile Picture" width="150" height="150"&gt;
  
  &lt;p&gt;
    Hello! I'm a web development enthusiast with a passion for creating clean, accessible, and user-friendly websites.
    I'm currently learning HTML, CSS, and JavaScript to build responsive and interactive web applications.
  &lt;/p&gt;
  
  &lt;h3&gt;Skills&lt;/h3&gt;
  &lt;ul&gt;
    &lt;li&gt;HTML5&lt;/li&gt;
    &lt;li&gt;CSS3&lt;/li&gt;
    &lt;li&gt;JavaScript&lt;/li&gt;
    &lt;li&gt;Responsive Design&lt;/li&gt;
    &lt;li&gt;Accessibility&lt;/li&gt;
  &lt;/ul&gt;
&lt;/section&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint3">
						<svelte:fragment slot="trigger">Hint: Projects Table</svelte:fragment>
						<div class="hint-card">
							<p>Use a table to showcase your projects with details:</p>
							<pre class="code mt-2 rounded p-2">
&lt;section id="projects"&gt;
  &lt;h2&gt;My Projects&lt;/h2&gt;
  
  &lt;table&gt;
    &lt;thead&gt;
      &lt;tr&gt;
        &lt;th&gt;Project Name&lt;/th&gt;
        &lt;th&gt;Description&lt;/th&gt;
        &lt;th&gt;Technologies&lt;/th&gt;
        &lt;th&gt;Status&lt;/th&gt;
      &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
      &lt;tr&gt;
        &lt;td&gt;Personal Blog&lt;/td&gt;
        &lt;td&gt;A responsive blog with multiple pages&lt;/td&gt;
        &lt;td&gt;HTML, CSS&lt;/td&gt;
        &lt;td&gt;Completed&lt;/td&gt;
      &lt;/tr&gt;
      &lt;tr&gt;
        &lt;td&gt;Recipe Collection&lt;/td&gt;
        &lt;td&gt;A website featuring family recipes&lt;/td&gt;
        &lt;td&gt;HTML, CSS, JavaScript&lt;/td&gt;
        &lt;td&gt;In Progress&lt;/td&gt;
      &lt;/tr&gt;
      &lt;tr&gt;
        &lt;td&gt;Weather App&lt;/td&gt;
        &lt;td&gt;Web app that displays current weather&lt;/td&gt;
        &lt;td&gt;HTML, CSS, JavaScript, API&lt;/td&gt;
        &lt;td&gt;Planning&lt;/td&gt;
      &lt;/tr&gt;
    &lt;/tbody&gt;
  &lt;/table&gt;
&lt;/section&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint4">
						<svelte:fragment slot="trigger">Hint: Contact Form</svelte:fragment>
						<div class="hint-card">
							<p>Create an accessible contact form:</p>
							<pre class="code mt-2 rounded p-2">
&lt;section id="contact"&gt;
  &lt;h2&gt;Contact Me&lt;/h2&gt;
  &lt;p&gt;Have a question or want to work together? Fill out the form below!&lt;/p&gt;
  
  &lt;form&gt;
    &lt;div&gt;
      &lt;label for="name"&gt;Name:&lt;/label&gt;
      &lt;input type="text" id="name" name="name" required&gt;
    &lt;/div&gt;
    
    &lt;div&gt;
      &lt;label for="email"&gt;Email:&lt;/label&gt;
      &lt;input type="email" id="email" name="email" required&gt;
    &lt;/div&gt;
    
    &lt;div&gt;
      &lt;label for="subject"&gt;Subject:&lt;/label&gt;
      &lt;select id="subject" name="subject"&gt;
        &lt;option value="collaboration"&gt;Collaboration&lt;/option&gt;
        &lt;option value="question"&gt;Question&lt;/option&gt;
        &lt;option value="hiring"&gt;Job Opportunity&lt;/option&gt;
        &lt;option value="other"&gt;Other&lt;/option&gt;
      &lt;/select&gt;
    &lt;/div&gt;
    
    &lt;div&gt;
      &lt;label for="message"&gt;Message:&lt;/label&gt;
      &lt;textarea id="message" name="message" rows="5" required&gt;&lt;/textarea&gt;
    &lt;/div&gt;
    
    &lt;button type="submit"&gt;Send Message&lt;/button&gt;
  &lt;/form&gt;
&lt;/section&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint5">
						<svelte:fragment slot="trigger">Hint: Multimedia Section</svelte:fragment>
						<div class="hint-card">
							<p>Add multimedia content to make your portfolio more engaging:</p>
							<pre class="code mt-2 rounded p-2">
&lt;section id="multimedia"&gt;
  &lt;h2&gt;Multimedia&lt;/h2&gt;
  
  &lt;h3&gt;My Introduction Video&lt;/h3&gt;
  &lt;iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
    title="Introduction Video" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen&gt;
  &lt;/iframe&gt;
  
  &lt;h3&gt;Audio Introduction&lt;/h3&gt;
  &lt;audio controls&gt;
    &lt;source src="https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3" type="audio/mpeg"&gt;
    Your browser does not support the audio element.
  &lt;/audio&gt;
&lt;/section&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint6">
						<svelte:fragment slot="trigger">Hint: Footer</svelte:fragment>
						<div class="hint-card">
							<p>Complete your page with a nice footer:</p>
							<pre class="code mt-2 rounded p-2">
&lt;footer&gt;
  &lt;p&gt;&copy; 2023 Your Name. All rights reserved.&lt;/p&gt;
  
  &lt;div class="social-links"&gt;
    &lt;h3&gt;Connect With Me&lt;/h3&gt;
    &lt;ul&gt;
      &lt;li&gt;&lt;a href="https://github.com/" target="_blank"&gt;GitHub&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="https://linkedin.com/" target="_blank"&gt;LinkedIn&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="https://twitter.com/" target="_blank"&gt;Twitter&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
&lt;/footer&gt;</pre>
						</div>
					</AccordionItem>
				</Accordion>
			</div>
		</div>

		<div class="mt-8 rounded-lg bg-blue-50 p-6">
			<h4 class="font-semibold">Why This Project Matters</h4>
			<p class="mt-2">
				A portfolio page is often the first coding project many web developers create and maintain
				throughout their careers. This project not only helps you apply all the HTML concepts you've
				learned but also gives you a foundation that you can continue to improve as you learn CSS
				and JavaScript.
			</p>
			<p class="mt-2">
				By creating a structured, semantic portfolio with various content types, you're building a
				valuable foundation for:
			</p>
			<ul class="mt-3 list-disc space-y-1 pl-6">
				<li>Showcasing your skills to potential employers or clients</li>
				<li>Practicing proper HTML document structure and organization</li>
				<li>Understanding how different HTML elements work together</li>
				<li>Building accessible web content from the start</li>
				<li>Creating a project you can continue to enhance as you learn more</li>
			</ul>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Next Steps</h3>
			<p>After completing this HTML portfolio project, consider these next steps:</p>
			<div class="mt-3 grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Enhance Your Portfolio</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Add CSS to style your portfolio (coming in the CSS module)</li>
						<li>Implement responsive design techniques</li>
						<li>Add JavaScript for interactivity (form validation, animations)</li>
						<li>Deploy your portfolio to a free hosting service</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Continue Learning</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Explore advanced HTML5 features and APIs</li>
						<li>Learn about CSS for styling your portfolio</li>
						<li>Study JavaScript to add dynamic functionality</li>
						<li>Explore web accessibility best practices in depth</li>
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

	.hint-card .rounded {
		border-radius: 0.375rem;
	}
</style>
