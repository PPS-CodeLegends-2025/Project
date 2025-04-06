<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { Accordion, AccordionItem } from '$lib/components/ui/accordion';
	import JsCodeEditor from '$lib/components/code/JsCodeEditor.svelte';
	import { modules } from '$lib/client/services/modules';
	import { onMount } from 'svelte';
	import { validateHtml, createCustomCheck } from '$lib/utils/htmlValidator';
	import HtmlPreview from '$lib/components/code/HtmlPreview.svelte';
	import type { ValidationError } from '$lib/utils/htmlValidator';

	const sectionData: Section = {
		title: 'Create Your Personal Introduction Page'
	};

	let { data }: PageProps = $props();

	const sectionIndex = data.section.index;
	const userId = data.user.id;
	const moduleId = data.module.data.url;

	let htmlCode = $state(`<!DOCTYPE html>
<html>
  <!-- Start building your personal page here -->
  
</html>`);

	let taskCompleted = $state(false);
	let submissionResult = $state<{ success: boolean; message: string } | null>(null);
	let validationErrors = $state<ValidationError[]>([]);

	const validatePersonalHtml = (code: string) => {
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
				'Add a <title> tag in the <head> section to give your page a title that appears in the browser tab.',
				/<title[\s\S]*?>[\s\S]*?<\/title>/i
			),
			createCustomCheck(
				'bodyTag',
				'Your page needs a <body> element to hold all the visible content.',
				/<body[\s\S]*?>[\s\S]*?<\/body>/i
			),
			createCustomCheck(
				'heading',
				'Add an <h1> heading to introduce yourself or your page.',
				/<h1[\s\S]*?>[\s\S]*?<\/h1>/i
			),
			createCustomCheck(
				'paragraph',
				'Add at least one <p> paragraph to tell us something about yourself.',
				/<p[\s\S]*?>[\s\S]*?<\/p>/i
			),
			createCustomCheck(
				'personalizedContent',
				'Try adding more personal details to make your page unique!',
				(code) => code.length > 150
			)
		];

		// Run enhanced validation with custom checks
		const result = validateHtml(code, customChecks);

		// Set taskCompleted if validation passes
		if (result.success) {
			taskCompleted = true;
			return {
				success: true,
				message:
					"Excellent work! You've created a personal webpage with all the essential HTML elements."
			};
		} else {
			return result;
		}
	};

	const handleSubmit = () => {
		try {
			submissionResult = validatePersonalHtml(htmlCode);
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
			console.error('Error in personal HTML validation:', error);
			validationErrors = [];
		}
	};

	$effect(() => {});

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
			<h3 class="mb-3 text-xl font-semibold">Create Your Digital Introduction</h3>
			<p class="text-lg">
				Now that you understand the basics of HTML structure, it's time to put your knowledge into
				practice! You'll create a personal introduction page that showcases who you are.
			</p>
			<p class="mt-2 text-lg">
				This page will be your first step toward building your web presence - a digital handshake
				that introduces you to the world.
			</p>
		</section>

		<div class="border-l-4 border-indigo-500 bg-indigo-50 p-4">
			<h4 class="font-semibold">✨ Your Mission:</h4>
			<p>Create a personal introduction page with:</p>
			<ul class="mt-2 ml-6 list-disc">
				<li>
					A proper HTML document structure with <code class="code">&lt;html&gt;</code>,
					<code class="code">&lt;head&gt;</code>, and <code class="code">&lt;body&gt;</code> tags
				</li>
				<li>
					A descriptive title that appears in the browser tab using <code class="code"
						>&lt;title&gt;</code
					>
				</li>
				<li>
					A main heading (<code class="code">&lt;h1&gt;</code>) with your name or an introduction
				</li>
				<li>
					At least one paragraph (<code class="code">&lt;p&gt;</code>) that shares something about
					you
				</li>
			</ul>
			<p class="mt-3 italic">Be creative! This is your chance to express yourself through code.</p>
		</div>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Ideas to Include About Yourself</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div class="rounded-lg bg-blue-50 p-3 shadow-sm">
					<h4 class="font-medium text-blue-700">Personal</h4>
					<ul class="mt-1 list-disc pl-5 text-sm">
						<li>Your name and hometown</li>
						<li>Interests and hobbies</li>
						<li>Fun facts about yourself</li>
					</ul>
				</div>
				<div class="rounded-lg bg-purple-50 p-3 shadow-sm">
					<h4 class="font-medium text-purple-700">Professional</h4>
					<ul class="mt-1 list-disc pl-5 text-sm">
						<li>Career aspirations</li>
						<li>Skills you're learning</li>
						<li>Projects you're working on</li>
					</ul>
				</div>
				<div class="rounded-lg bg-green-50 p-3 shadow-sm">
					<h4 class="font-medium text-green-700">Learning Journey</h4>
					<ul class="mt-1 list-disc pl-5 text-sm">
						<li>Why you're learning to code</li>
						<li>What you're excited to build</li>
						<li>Your coding goals</li>
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
					<button class="btn primary" onclick={handleSubmit}>Submit</button>
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
					<HtmlPreview {htmlCode} height="20rem" {validationErrors} />
				</div>

				<Accordion className="mt-4">
					<AccordionItem value="hint1">
						<svelte:fragment slot="trigger">Hint: Basic HTML Structure</svelte:fragment>
						<div class="hint-card">
							<p>Remember to include all the essential parts of an HTML document:</p>
							<pre class="code mt-2 rounded p-2">
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Your Name - Personal Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;!-- Your visible content goes here --&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint2">
						<svelte:fragment slot="trigger">Hint: Creating a Main Heading</svelte:fragment>
						<div class="hint-card">
							<p>Use the h1 tag to create a prominent heading that introduces your page:</p>
							<pre class="code mt-2 rounded p-2">
&lt;h1&gt;Hello, I'm [Your Name]!&lt;/h1&gt;</pre>
							<p class="mt-2 text-sm">
								This is typically the largest and most important heading on your page.
							</p>
						</div>
					</AccordionItem>

					<AccordionItem value="hint3">
						<svelte:fragment slot="trigger">Hint: Adding Paragraphs</svelte:fragment>
						<div class="hint-card">
							<p>Use paragraph tags to share information about yourself:</p>
							<pre class="code mt-2 rounded p-2">
&lt;p&gt;I'm a web development student from [Your Location]. I enjoy [hobby/interest] and I'm currently learning HTML to build amazing websites!&lt;/p&gt;

&lt;p&gt;My goal is to [your coding or career goal].&lt;/p&gt;</pre>
							<p class="mt-2 text-sm italic">
								Feel free to customize with your own personal details!
							</p>
						</div>
					</AccordionItem>

					<AccordionItem value="hint4">
						<svelte:fragment slot="trigger">Hint: Complete Example</svelte:fragment>
						<div class="hint-card">
							<p>If you're really stuck, here's a complete example structure to inspire you:</p>
							<pre class="code mt-2 rounded p-2">
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Alex's Personal Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Welcome to Alex's World&lt;/h1&gt;
    
    &lt;p&gt;Hello! I'm Alex, a web development enthusiast from Toronto. I've always been fascinated by how websites work, which led me to start learning HTML and CSS.&lt;/p&gt;
    
    &lt;p&gt;When I'm not coding, I enjoy hiking in nature and experimenting with new recipes in the kitchen. My specialty is homemade pizza!&lt;/p&gt;
    
    &lt;p&gt;My goal is to build a portfolio website showcasing my future projects and eventually become a front-end developer.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
							<p class="mt-2 text-sm italic">
								Remember to make your page uniquely yours rather than copying this example directly!
							</p>
						</div>
					</AccordionItem>
				</Accordion>
			</div>
		</div>

		<div class="mt-8 rounded-lg bg-blue-50 p-6">
			<h4 class="font-semibold">Why This Matters</h4>
			<p class="mt-2">
				Personal introduction pages are often the first projects web developers create. They serve
				as a foundation for understanding how HTML elements work together to create meaningful
				content. As you progress, you'll learn how to enhance this page with CSS styling and
				JavaScript functionality.
			</p>
			<p class="mt-2">
				Many professional developers maintain personal websites throughout their careers as a way to
				showcase their work and share their journey.
			</p>
		</div>

		<div class="mt-4 text-center">
			<p class="text-lg">
				Remember, this page is about <em>you</em> - don't be afraid to let your personality shine through!
				The best web pages are those that feel authentic and personal.
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
