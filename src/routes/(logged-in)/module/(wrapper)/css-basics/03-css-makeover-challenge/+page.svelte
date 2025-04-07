<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { Accordion, AccordionItem } from '$lib/components/ui/accordion';
	import JsCodeEditor from '$lib/components/code/JsCodeEditor.svelte';
	import { modules } from '$lib/client/services/modules';
	import type { ValidationResult } from '$lib/utils/htmlValidator';
	import HtmlPreview from '$lib/components/code/HtmlPreview.svelte';
	import type { ValidationError } from '$lib/utils/htmlValidator';

	const sectionData: Section = {
		title: 'Challenge: CSS Makeover'
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
  <title>CSS Makeover Challenge</title>
  <!-- Add your external CSS link here -->
  
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section id="intro">
      <h2>Hello there!</h2>
      <p>This is a simple webpage that needs some CSS styling. Currently, it uses the browser's default styles and looks quite plain.</p>
      <p>Your challenge is to transform this page using external CSS.</p>
    </section>
    
    <section id="features">
      <h2>Why Use CSS?</h2>
      <ul>
        <li>Separates content from presentation</li>
        <li>Allows consistent styling across multiple pages</li>
        <li>Enables responsive design for different devices</li>
        <li>Reduces code duplication and improves maintainability</li>
      </ul>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2023 CSS Makeover Challenge. All rights reserved.</p>
  </footer>
</body>
</html>`);

	let cssCode = $state(`/* Write your CSS code here */
/* Target the body element to set global styles */
body {
  /* Your styles for the body */
}

/* Style the header and navigation */
header {
  /* Your header styles */
}

nav ul {
  /* Your navigation list styles */
}

nav ul li {
  /* Your navigation item styles */
}

nav a {
  /* Your link styles */
}

/* Style the main content */
main {
  /* Your main content styles */
}

h1, h2 {
  /* Your heading styles */
}

p {
  /* Your paragraph styles */
}

/* Style the features section and list */
#features ul {
  /* Your list styles */
}

#features li {
  /* Your list item styles */
}

/* Style the footer */
footer {
  /* Your footer styles */
}`);

	let taskCompleted = $state(false);
	let submissionResult = $state<ValidationResult | null>(null);
	let validationErrors = $state<ValidationError[]>([]);
	let combinedCode = $state('');

	$effect(() => {
		// Combine HTML and CSS for preview
		combinedCode = htmlCode.replace(
			'<!-- Add your external CSS link here -->',
			`<style>\n${cssCode}\n</style>`
		);
	});

	const validateCssMakeover = (html: string, css: string) => {
		// Validation criteria
		const cssValidationChecks = [
			// Check if CSS has been modified from starter template
			css.trim() !== '/* Write your CSS code here */',
			// Check for basic CSS properties
			/background|color|font|margin|padding|border|text-align|display/.test(css),
			// Check for selectors
			/body|header|nav|main|footer|h1|h2|p|ul|li|a/.test(css),
			// Ensure at least 5 CSS rules are defined
			(css.match(/{([^}]*)}/g) || []).length >= 5
		];

		// Check if all validation criteria pass
		const allValid = cssValidationChecks.every((check) =>
			typeof check === 'boolean' ? check : true
		);

		if (allValid) {
			taskCompleted = true;
			return {
				success: true,
				message:
					"Great job! You've successfully styled the webpage with CSS. Your design shows creativity and proper use of CSS properties."
			};
		} else {
			return {
				success: false,
				message:
					"Your CSS needs more work. Make sure you've added styles for different elements and used various CSS properties.",
				errors: []
			};
		}
	};

	const handleSubmit = () => {
		try {
			submissionResult = validateCssMakeover(htmlCode, cssCode);

			if (!submissionResult.success) {
				validationErrors = [
					{
						type: 'custom',
						message: submissionResult.message,
						element: 'style'
					}
				];
				submissionResult = null;
			} else {
				validationErrors = [];
			}
		} catch (error) {
			console.error('Error in CSS validation:', error);
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

	// Example CSS for the "after" image
	const exampleAfterCSS = `body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  background-color: #f9f9f9;
}

header {
  background-color: #4a6da7;
  color: white;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 20px;
}

header h1 {
  margin: 0;
}

nav ul {
  display: flex;
  list-style: none;
  padding: 0;
}

nav ul li {
  margin-right: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

main {
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #4a6da7;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
}

#features ul {
  list-style: square;
  color: #555;
}

#features li {
  margin-bottom: 8px;
}

footer {
  margin-top: 20px;
  text-align: center;
  color: #777;
  padding: 10px;
  font-size: 0.9rem;
  border-top: 1px solid #e0e0e0;
}`;

	const applyExampleCSS = () => {
		cssCode = exampleAfterCSS;
	};
</script>

<ModuleTask {...taskProps}>
	<div class="space-y-6">
		<section>
			<h3 class="mb-3 text-xl font-semibold">Challenge: CSS Makeover</h3>
			<p class="text-lg">
				Time to put your CSS skills into practice! In this challenge, you'll transform a plain HTML
				page into a visually appealing website using external CSS.
			</p>
		</section>

		<div class="border-l-4 border-indigo-500 bg-indigo-50 p-4">
			<h4 class="font-semibold">✨ Your Mission:</h4>
			<p>Style the provided HTML page by writing CSS that:</p>
			<ul class="mt-2 ml-6 list-disc">
				<li>Changes the fonts, colors, and spacing to create a more appealing design</li>
				<li>Improves the layout of the navigation and content sections</li>
				<li>Adds visual hierarchy to distinguish different sections</li>
				<li>Makes the links and interactive elements more user-friendly</li>
			</ul>
			<p class="mt-3 italic">
				Be creative! There's no single "correct" design - the goal is to practice applying CSS
				properties to transform the appearance of the page.
			</p>
		</div>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Before and After</h3>
			<p>Here's how the transformation might look:</p>

			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="flex flex-col">
					<h4 class="mb-2 text-center font-semibold">Before (No CSS)</h4>
					<div class="h-64 overflow-y-auto rounded-lg border bg-gray-50 p-3 shadow-sm">
						<img
							src="/images/css-makeover-before.png"
							alt="Page without CSS"
							class="w-full border"
						/>
					</div>
				</div>
				<div class="flex flex-col">
					<h4 class="mb-2 text-center font-semibold">After (With CSS)</h4>
					<div class="h-64 overflow-y-auto rounded-lg border bg-gray-50 p-3 shadow-sm">
						<img
							src="/images/css-makeover-after.png"
							alt="Page with CSS applied"
							class="w-full border"
						/>
					</div>
				</div>
			</div>
		</section>

		<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
			<div class="flex flex-col">
				<h4 class="mb-3 font-semibold">HTML (For Reference)</h4>
				<div class="editor-container h-[300px]">
					<JsCodeEditor value={htmlCode} />
				</div>
				<div class="mt-2 text-sm text-gray-600">
					<p>This is the HTML structure you'll be styling. You don't need to modify this code.</p>
				</div>
			</div>

			<div class="flex flex-col">
				<h4 class="mb-3 font-semibold">CSS Editor</h4>
				<div class="editor-container h-[300px]">
					<JsCodeEditor bind:value={cssCode} language="css" />
				</div>
				<div class="mt-4 flex justify-end">
					<button class="btn secondary mr-2" onclick={applyExampleCSS}>See Example</button>
					<button class="btn primary" onclick={() => handleSubmit()}>Submit</button>
				</div>
				{#if submissionResult && submissionResult.success}
					<div class="box success mt-4">
						{submissionResult.message}
					</div>
				{/if}
			</div>
		</div>

		<div class="mt-6">
			<h4 class="mb-3 font-semibold">Preview</h4>
			<div class="preview-container">
				<HtmlPreview htmlCode={combinedCode} height="400px" {validationErrors} />
			</div>
		</div>

		<Accordion className="mt-6">
			<AccordionItem value="hint1">
				<svelte:fragment slot="trigger">Hint: Getting Started with Basic Styles</svelte:fragment>
				<div class="hint-card">
					<p>Start by setting some global styles on the body element:</p>
					<pre class="code mt-2 rounded p-2">
body &#123;
  font-family: Arial, sans-serif; /* Change the default font */
  line-height: 1.6; /* Improve readability with line spacing */
  color: #333; /* Dark gray is easier on the eyes than black */
  margin: 0; /* Remove default margins */
  padding: 20px; /* Add some space around the content */
  background-color: #f5f5f5; /* Light gray background */
&#125;
</pre>
				</div>
			</AccordionItem>

			<AccordionItem value="hint2">
				<svelte:fragment slot="trigger">Hint: Styling the Navigation</svelte:fragment>
				<div class="hint-card">
					<p>Make the navigation more user-friendly:</p>
					<pre class="code mt-2 rounded p-2">
nav ul &#123;
  list-style: none; /* Remove bullet points */
  padding: 0; /* Remove default padding */
  display: flex; /* Display links in a row */
&#125;

nav ul li &#123;
  margin-right: 20px; /* Space between menu items */
&#125;

nav a &#123;
  text-decoration: none; /* Remove underlines */
  color: #0066cc; /* Blue color for links */
  font-weight: bold; /* Make links stand out */
  padding: 5px 10px; /* Add some padding around links */
&#125;

nav a:hover &#123;
  color: #004080; /* Darker blue on hover */
  text-decoration: underline; /* Underline on hover */
&#125;
</pre>
				</div>
			</AccordionItem>

			<AccordionItem value="hint3">
				<svelte:fragment slot="trigger">Hint: Creating Visual Hierarchy</svelte:fragment>
				<div class="hint-card">
					<p>Use colors, spacing, and borders to distinguish different sections:</p>
					<pre class="code mt-2 rounded p-2">
header &#123;
  background-color: #4a6da7; /* Blue background */
  color: white; /* White text */
  padding: 20px; /* Add space inside */
  margin-bottom: 20px; /* Add space below */
  border-radius: 5px; /* Rounded corners */
&#125;

main &#123;
  background-color: white; /* White background for content */
  padding: 20px; /* Add space inside */
  border-radius: 5px; /* Rounded corners */
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Subtle shadow */
&#125;

footer &#123;
  margin-top: 20px; /* Space above footer */
  text-align: center; /* Center text */
  padding: 10px; /* Add space inside */
  border-top: 1px solid #e0e0e0; /* Light border at top */
  color: #777; /* Gray text */
&#125;
</pre>
				</div>
			</AccordionItem>

			<AccordionItem value="hint4">
				<svelte:fragment slot="trigger">Hint: Typography and Color Schemes</svelte:fragment>
				<div class="hint-card">
					<p>Improve readability with thoughtful typography and colors:</p>
					<pre class="code mt-2 rounded p-2">
h1, h2 &#123;
  color: #333; /* Dark text for headings */
  margin-top: 0; /* Remove top margin */
&#125;

h1 &#123;
  font-size: 2.5em; /* Larger font for main heading */
&#125;

h2 &#123;
  font-size: 1.8em; /* Medium font for subheadings */
  border-bottom: 2px solid #e0e0e0; /* Light border under subheadings */
  padding-bottom: 5px; /* Space below subheadings */
&#125;

p &#123;
  color: #555; /* Dark gray for paragraphs */
  margin-bottom: 15px; /* Space between paragraphs */
&#125;

/* You could use a color scheme like:
   Primary: #4a6da7 (blue)
   Secondary: #e0e0e0 (light gray)
   Accent: #f8c291 (peach)
   Text: #333 (dark gray)
   Background: #f9f9f9 (off-white)
*/
</pre>
				</div>
			</AccordionItem>
		</Accordion>

		<div class="mt-8 rounded-lg bg-blue-50 p-6">
			<h4 class="font-semibold">Why This Challenge Matters</h4>
			<p class="mt-2">
				This exercise demonstrates the true power of CSS - the ability to completely transform a
				webpage's appearance without changing its HTML structure. It's a fundamental skill for web
				developers to be able to take a plain HTML document and turn it into an engaging,
				user-friendly design.
			</p>
			<p class="mt-2">
				The separation of content (HTML) and presentation (CSS) is a core principle of modern web
				development, allowing for greater flexibility, maintainability, and the ability to
				completely redesign a site without altering its underlying structure.
			</p>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Going Further</h3>
			<p>Once you've completed the basic challenge, try these advanced techniques:</p>
			<div class="mt-3 grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Advanced CSS Techniques</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Add subtle hover effects to interactive elements</li>
						<li>Use CSS gradients for backgrounds</li>
						<li>Try using CSS variables for your color palette</li>
						<li>Experiment with flexbox for more advanced layouts</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Responsiveness</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Add media queries to make the design responsive</li>
						<li>Create a mobile-friendly navigation menu</li>
						<li>Use relative units (rem, em, %) instead of pixels</li>
						<li>Ensure your design works at different screen sizes</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</ModuleTask>

<style lang="postcss">
	.hint-card {
		border-left: 4px solid #3b82f6;
		background-color: #eff6ff;
		padding: 1rem;
		margin-top: 0.5rem;
	}

	.editor-container {
		height: 300px;
		margin-bottom: 1rem;
	}

	.preview-container {
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		overflow: hidden;
		background-color: white;
		width: 100%;
		height: 400px;
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
