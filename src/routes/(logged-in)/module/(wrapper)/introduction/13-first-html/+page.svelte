<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { Accordion, AccordionItem } from '$lib/components/ui/accordion';
	import JsCodeEditor from '$lib/components/code/JsCodeEditor.svelte';
	import { modules } from '$lib/client/services/modules';
	import { validateHtml, createCustomCheck } from '$lib/utils/htmlValidator';
	import type { ValidationError } from '$lib/utils/htmlValidator';
	import HtmlPreview from '$lib/components/code/HtmlPreview.svelte';

	const sectionData: Section = {
		title: 'Your First HTML Page'
	};

	let { data }: PageProps = $props();

	const sectionIndex = data.section.index;
	const userId = data.user.id;
	const moduleId = data.module.data.url;

	let htmlCode = $state(`<!DOCTYPE html>
<html>
  <!-- Add your code here -->
  
</html>`);

	let taskCompleted = $state(false);
	let submissionResult = $state<{ success: boolean; message: string } | null>(null);

	let validationErrors = $state<ValidationError[]>([]);

	const validateHtmlPage = (code: string) => {
		console.log('Validating HTML:', code);

		const customChecks = [
			createCustomCheck(
				'htmlTag',
				'Your page needs an <html> element to contain everything.',
				/<html[\s\S]*?>[\s\S]*?<\/html>/i
			),
			createCustomCheck(
				'headTag',
				"Don't forget to add a <head> section for your page metadata.",
				/<head[\s\S]*?>[\s\S]*?<\/head>/i
			),
			createCustomCheck(
				'title',
				'Every webpage needs a title! Add a <title> tag in the <head> section.',
				/<title[\s\S]*?>[\s\S]*?<\/title>/i
			),
			createCustomCheck(
				'bodyTag',
				'Your page needs a <body> element for its visible content.',
				/<body[\s\S]*?>[\s\S]*?<\/body>/i
			),
			createCustomCheck(
				'heading',
				'Add a heading (like <h1>) to give your page a main title.',
				/<h[1-6][\s\S]*?>[\s\S]*?<\/h[1-6]>/i
			),
			createCustomCheck(
				'paragraph',
				'Add a paragraph (<p>) with some text to make your page more informative.',
				/<p[\s\S]*?>[\s\S]*?<\/p>/i
			)
		];

		const result = validateHtml(code, customChecks);

		if (result.success) {
			taskCompleted = true;
		}

		return {
			success: result.success,
			message: result.success
				? "Great job! You've created your first HTML page with all the essential elements."
				: result.message
		};
	};

	const handleSubmit = () => {
		try {
			submissionResult = validateHtmlPage(htmlCode);
			validationErrors = submissionResult.success
				? []
				: [
						{
							type: 'custom',
							message: submissionResult.message,
							element: 'html'
						}
					];
		} catch (error) {
			console.error('Error in HTML validation:', error);
			validationErrors = [];
		}
	};

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
			<h3 class="mb-3 text-xl font-semibold">Your First Web Page</h3>
			<p class="text-lg">
				Welcome to your first coding challenge! Today, you'll create a simple HTML page - the
				foundation of every website on the internet.
			</p>
			<p class="mt-2 text-lg">
				Think of this as your "Hello, Web!" moment - the first step on your journey as a web
				developer.
			</p>
		</section>

		<div class="border-l-4 border-indigo-500 bg-indigo-50 p-4">
			<h4 class="font-semibold">✨ Your Mission:</h4>
			<p>Create a simple personal introduction page that includes:</p>
			<ul class="mt-2 ml-6 list-disc">
				<li>
					A proper HTML structure with <code class="code">&lt;html&gt;</code>,
					<code class="code">&lt;head&gt;</code>, and <code class="code">&lt;body&gt;</code> tags
				</li>
				<li>A title for your page using the <code class="code">&lt;title&gt;</code> tag</li>
				<li>A heading that introduces you or your page</li>
				<li>A paragraph of text about yourself or what you're learning</li>
			</ul>
		</div>

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
						<svelte:fragment slot="trigger">Hint: Basic HTML Structure</svelte:fragment>
						<div class="hint-card">
							<p>Every HTML page starts with a basic structure:</p>
							<pre class="code mt-2 rounded p-2">
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Your Page Title&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;!-- Your content goes here --&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint2">
						<svelte:fragment slot="trigger">Hint: Adding a Heading</svelte:fragment>
						<div class="hint-card">
							<p>
								Headings are created using h1 through h6 tags, with h1 being the most important:
							</p>
							<pre class="code mt-2 rounded p-2">
&lt;h1&gt;Welcome to My First Web Page!&lt;/h1&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint3">
						<svelte:fragment slot="trigger">Hint: Adding a Paragraph</svelte:fragment>
						<div class="hint-card">
							<p>Paragraphs are created using the p tag:</p>
							<pre class="code mt-2 rounded p-2">
&lt;p&gt;Hello! I'm learning web development and this is my first HTML page.&lt;/p&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint4">
						<svelte:fragment slot="trigger">Hint: Complete Example</svelte:fragment>
						<div class="hint-card">
							<p>If you're really stuck, here's a complete example to inspire you:</p>
							<pre class="code mt-2 rounded p-2">
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;My Developer Journey&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello, Web World!&lt;/h1&gt;
    &lt;p&gt;I'm taking my first steps in web development. This page marks the beginning of my coding journey!&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
							<p class="mt-2 text-sm italic">
								Remember: Try to write your own unique page rather than just copying this example!
							</p>
						</div>
					</AccordionItem>
				</Accordion>
			</div>
		</div>

		<div class="mt-8 rounded-lg bg-blue-50 p-6">
			<h4 class="font-semibold">Did you know?</h4>
			<p class="mt-2">
				The first web page ever created was published on August 6, 1991, by Tim Berners-Lee. It
				explained what the World Wide Web was and how people could create their own web pages - just
				like you're doing now!
			</p>
		</div>

		<div class="mt-4 text-center">
			<p class="text-lg">
				Remember, every professional web developer started exactly where you are now - with their
				first HTML page. You're on the right path!
			</p>
		</div>
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
		height: 20rem;
		margin-bottom: 1rem;
	}

	.preview-container {
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		overflow: hidden;
		background-color: white;
		width: 100%;
		height: 20rem;
	}

	.hint-card pre {
		white-space: pre-wrap;
		word-wrap: break-word;
		overflow-x: auto;
		max-width: 100%;
		margin: 0.5rem 0;
	}

	.hint-card .code {
		font-family: monospace;
		background-color: #f3f4f6;
		padding: 0.1rem 0.3rem;
		border-radius: 0.25rem;
	}

	:global(.accordion-content) {
		width: 100%;
	}
</style>
