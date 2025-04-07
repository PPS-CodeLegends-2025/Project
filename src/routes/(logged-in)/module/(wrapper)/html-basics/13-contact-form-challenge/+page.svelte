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
		title: 'Challenge: Contact Form'
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
  <title>Contact Form</title>
</head>
<body>
  <!-- Create your contact form here -->
  
</body>
</html>`);

	let taskCompleted = $state(false);
	let submissionResult = $state<ValidationResult | null>(null);
	let validationErrors = $state<ValidationError[]>([]);

	const validateContactForm = (code: string) => {
		const customChecks = [
			createCustomCheck(
				'formElement',
				'Your page needs a <form> element to contain the form controls.',
				/<form[\s\S]*?>[\s\S]*?<\/form>/i
			),
			createCustomCheck(
				'nameField',
				"Include a text input field for the user's name.",
				/<input[\s\S]*?type=["']text["'][\s\S]*?name=["'].*?name.*?["'][\s\S]*?>/i
			),
			createCustomCheck(
				'emailField',
				'Add an email input field with the appropriate type.',
				/<input[\s\S]*?type=["']email["'][\s\S]*?>/i
			),
			createCustomCheck(
				'messageField',
				'Include a <textarea> element for the message content.',
				/<textarea[\s\S]*?>[\s\S]*?<\/textarea>/i
			),
			createCustomCheck(
				'submitButton',
				'Add a submit button to send the form.',
				/(<button[\s\S]*?type=["']submit["'][\s\S]*?>[\s\S]*?<\/button>|<input[\s\S]*?type=["']submit["'][\s\S]*?>)/i
			),
			createCustomCheck(
				'labels',
				'Each form field should have an associated <label> element.',
				/(<label[\s\S]*?>[\s\S]*?<\/label>[\s\S]*?){3,}/i
			),
			createCustomCheck(
				'forAttribute',
				'Use the "for" attribute in labels to associate them with their input fields.',
				/<label[\s\S]*?for=["'][^"']+["'][\s\S]*?>/i
			),
			createCustomCheck(
				'idAttribute',
				'Input fields should have "id" attributes that match their label\'s "for" attribute.',
				/<input[\s\S]*?id=["'][^"']+["'][\s\S]*?>/i
			),
			createCustomCheck(
				'required',
				'Make at least one field required for form validation.',
				/<input[\s\S]*?required[\s\S]*?>/i
			),
			createCustomCheck(
				'formStructure',
				'Organize your form with appropriate structure and spacing.',
				(code) => code.length > 300
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
			submissionResult = validateContactForm(htmlCode);

			validationErrors = submissionResult.errors || [];

			if (!submissionResult.success) {
				submissionResult = null;
			}
		} catch (error) {
			console.error('Error in contact form validation:', error);
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
			<h3 class="mb-3 text-xl font-semibold">Challenge: Create an Accessible Contact Form</h3>
			<p class="text-lg">
				Now that you've learned about HTML forms and accessibility best practices, it's time to put
				your knowledge to work by creating a user-friendly contact form.
			</p>
			<p class="mt-2 text-lg">
				Contact forms are essential elements on many websites, allowing visitors to communicate with
				site owners. Your challenge is to create a form that is both functional and accessible to
				all users, including those using assistive technologies.
			</p>
		</section>

		<div class="border-l-4 border-indigo-500 bg-indigo-50 p-4">
			<h4 class="font-semibold">✨ Your Mission:</h4>
			<p>Create a contact form that includes:</p>
			<ul class="mt-2 ml-6 list-disc">
				<li>A <code class="code">&lt;form&gt;</code> element as the container</li>
				<li>Input fields for the user's name and email address</li>
				<li>A textarea for the message content</li>
				<li>A submit button</li>
				<li>Proper labels for all form controls</li>
				<li>At least one required field</li>
				<li>Form elements with appropriate accessibility attributes</li>
			</ul>
			<p class="mt-3 italic">
				Focus on creating a well-structured, accessible form that would be easy for all users to
				complete, including those using screen readers or keyboard navigation.
			</p>
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
						<svelte:fragment slot="trigger">Hint: Form Structure</svelte:fragment>
						<div class="hint-card">
							<p>Start with a basic form structure:</p>
							<pre class="code mt-2 rounded p-2">
&lt;form action="#" method="post"&gt;
  &lt;div&gt;
    &lt;!-- Name field goes here --&gt;
  &lt;/div&gt;
  
  &lt;div&gt;
    &lt;!-- Email field goes here --&gt;
  &lt;/div&gt;
  
  &lt;div&gt;
    &lt;!-- Message field goes here --&gt;
  &lt;/div&gt;
  
  &lt;div&gt;
    &lt;!-- Submit button goes here --&gt;
  &lt;/div&gt;
&lt;/form&gt;</pre>
							<p class="mt-2 text-sm">
								The action attribute would normally point to a server endpoint, but we're using "#"
								as a placeholder.
							</p>
						</div>
					</AccordionItem>

					<AccordionItem value="hint2">
						<svelte:fragment slot="trigger">Hint: Creating Labeled Inputs</svelte:fragment>
						<div class="hint-card">
							<p>Here's how to properly label an input field:</p>
							<pre class="code mt-2 rounded p-2">
&lt;div&gt;
  &lt;label for="name"&gt;Name:&lt;/label&gt;
  &lt;input type="text" id="name" name="name" required&gt;
&lt;/div&gt;</pre>
							<p class="mt-3">Or you can wrap the input with the label:</p>
							<pre class="code mt-2 rounded p-2">
&lt;div&gt;
  &lt;label&gt;
    Email:
    &lt;input type="email" id="email" name="email" required&gt;
  &lt;/label&gt;
&lt;/div&gt;</pre>
							<p class="mt-2 text-sm">
								The <code>for</code> attribute should match the <code>id</code> attribute of the input
								it's labeling.
							</p>
						</div>
					</AccordionItem>

					<AccordionItem value="hint3">
						<svelte:fragment slot="trigger">Hint: Creating a Textarea</svelte:fragment>
						<div class="hint-card">
							<p>For the message field, use a textarea element:</p>
							<pre class="code mt-2 rounded p-2">
&lt;div&gt;
  &lt;label for="message"&gt;Message:&lt;/label&gt;
  &lt;textarea id="message" name="message" rows="5" cols="30"&gt;&lt;/textarea&gt;
&lt;/div&gt;</pre>
							<p class="mt-2 text-sm">
								The <code>rows</code> and <code>cols</code> attributes control the initial size of the
								textarea.
							</p>
						</div>
					</AccordionItem>

					<AccordionItem value="hint4">
						<svelte:fragment slot="trigger">Hint: Submit Button Options</svelte:fragment>
						<div class="hint-card">
							<p>You can create a submit button in two ways:</p>
							<pre class="code mt-2 rounded p-2">
&lt;!-- Option 1: Using the button element --&gt;
&lt;div&gt;
  &lt;button type="submit"&gt;Send Message&lt;/button&gt;
&lt;/div&gt;

&lt;!-- Option 2: Using the input element --&gt;
&lt;div&gt;
  &lt;input type="submit" value="Send Message"&gt;
&lt;/div&gt;</pre>
							<p class="mt-2 text-sm">
								The <code>button</code> element is more flexible as it can contain other elements (like
								icons).
							</p>
						</div>
					</AccordionItem>

					<AccordionItem value="hint5">
						<svelte:fragment slot="trigger">Hint: Accessibility Enhancements</svelte:fragment>
						<div class="hint-card">
							<p>Consider these additional accessibility improvements:</p>
							<pre class="code mt-2 rounded p-2">
&lt;!-- Adding placeholders --&gt;
&lt;input type="text" id="name" name="name" placeholder="Your name" required&gt;

&lt;!-- Adding ARIA attributes --&gt;
&lt;textarea id="message" name="message" aria-describedby="message-help"&gt;&lt;/textarea&gt;
&lt;p id="message-help" class="help-text"&gt;Please include any specific details in your message.&lt;/p&gt;

&lt;!-- Indicating required fields --&gt;
&lt;label for="email"&gt;Email: &lt;span class="required"&gt;*&lt;/span&gt;&lt;/label&gt;
&lt;input type="email" id="email" name="email" required&gt;</pre>
							<p class="mt-2 text-sm">
								Remember that placeholders should supplement, not replace, proper labels.
							</p>
						</div>
					</AccordionItem>

					<AccordionItem value="hint6">
						<svelte:fragment slot="trigger">Hint: Complete Form Example</svelte:fragment>
						<div class="hint-card">
							<p>Here's a complete contact form example to guide you:</p>
							<pre class="code mt-2 rounded p-2">
&lt;form action="#" method="post"&gt;
  &lt;div&gt;
    &lt;label for="name"&gt;Name:&lt;/label&gt;
    &lt;input type="text" id="name" name="name" placeholder="Your name"&gt;
  &lt;/div&gt;
  
  &lt;div&gt;
    &lt;label for="email"&gt;Email: &lt;span&gt;*&lt;/span&gt;&lt;/label&gt;
    &lt;input type="email" id="email" name="email" placeholder="your.email@example.com" required&gt;
  &lt;/div&gt;
  
  &lt;div&gt;
    &lt;label for="message"&gt;Your Message:&lt;/label&gt;
    &lt;textarea id="message" name="message" rows="5" placeholder="Type your message here..."&gt;&lt;/textarea&gt;
  &lt;/div&gt;
  
  &lt;div&gt;
    &lt;button type="submit"&gt;Send Message&lt;/button&gt;
  &lt;/div&gt;
&lt;/form&gt;</pre>
							<p class="mt-2 text-sm italic">
								Feel free to modify and enhance this example to make the form your own!
							</p>
						</div>
					</AccordionItem>
				</Accordion>
			</div>
		</div>

		<div class="mt-8 rounded-lg bg-blue-50 p-6">
			<h4 class="font-semibold">Why Contact Forms Matter</h4>
			<p class="mt-2">
				Contact forms are often critical touchpoints between websites and their visitors. A
				well-designed, accessible contact form:
			</p>
			<ul class="mt-3 list-disc space-y-1 pl-6">
				<li>
					<strong>Enhances user experience</strong> by making it easy for visitors to reach out
				</li>
				<li>
					<strong>Improves inclusivity</strong> by ensuring all users, including those with disabilities,
					can complete the form
				</li>
				<li>
					<strong>Provides better data</strong> through proper field validation and structure
				</li>
				<li>
					<strong>Reduces errors</strong> by clearly labeling what information is expected
				</li>
				<li>
					<strong>Protects against spam</strong> when combined with proper validation techniques
				</li>
			</ul>
			<p class="mt-3">
				The HTML skills you're practicing in this challenge are directly applicable to real-world
				web development projects across virtually all industries.
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
								href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN: Form Element Reference</a
							>
						</li>
						<li>
							<a
								href="https://www.w3.org/WAI/tutorials/forms/"
								target="_blank"
								class="text-indigo-600 hover:underline">W3C: Web Accessibility Tutorials - Forms</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Best Practices</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://webaim.org/techniques/forms/controls"
								target="_blank"
								class="text-indigo-600 hover:underline">WebAIM: Creating Accessible Forms</a
							>
						</li>
						<li>
							<a
								href="https://www.smashingmagazine.com/2018/06/placeholder-attribute/"
								target="_blank"
								class="text-indigo-600 hover:underline"
								>Smashing Magazine: Placeholder Attribute Pitfalls</a
							>
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
