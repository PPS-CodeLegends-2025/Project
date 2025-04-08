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
		title: 'Challenge: Schedule Creator'
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
  <title>My Weekly Schedule</title>
</head>
<body>
  <!-- Create your weekly schedule table here -->
  
</body>
</html>`);

	let taskCompleted = $state(false);
	let submissionResult = $state<ValidationResult | null>(null);
	let validationErrors = $state<ValidationError[]>([]);

	const validateScheduleTable = (code: string) => {
		const customChecks = [
			createCustomCheck(
				'tableElement',
				'Your page needs a <table> element as the foundation for your schedule.',
				/<table[\s\S]*?>[\s\S]*?<\/table>/i
			),
			createCustomCheck(
				'tableHeader',
				'Include a <thead> section to organize your table headers.',
				/<thead[\s\S]*?>[\s\S]*?<\/thead>/i
			),
			createCustomCheck(
				'tableBody',
				'Add a <tbody> section to contain your schedule data.',
				/<tbody[\s\S]*?>[\s\S]*?<\/tbody>/i
			),
			createCustomCheck(
				'tableRows',
				'Your table should have multiple rows (<tr> elements).',
				/(<tr[\s\S]*?>[\s\S]*?<\/tr>[\s\S]*?){3,}/i
			),
			createCustomCheck(
				'tableHeaderCells',
				'Use <th> elements for your table headers (days of the week and/or time slots).',
				/<th[\s\S]*?>[\s\S]*?<\/th>/i
			),
			createCustomCheck(
				'tableDataCells',
				'Include <td> elements for your schedule activities.',
				/<td[\s\S]*?>[\s\S]*?<\/td>/i
			),
			createCustomCheck(
				'daysOfWeek',
				'Include the days of the week in your schedule.',
				/(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i
			),
			createCustomCheck(
				'timeSlots',
				'Your schedule should include time slots.',
				/([0-9]|1[0-2])[\s]*?(:|am|pm|:00|:15|:30|:45)/i
			),
			createCustomCheck(
				'activities',
				'Add some activities to your schedule.',
				/(class|meeting|lunch|breakfast|dinner|study|work|exercise|gym|break|lecture)/i
			),
			createCustomCheck(
				'caption',
				'Consider adding a <caption> element to provide a title for your table.',
				/<caption[\s\S]*?>[\s\S]*?<\/caption>/i
			),
			createCustomCheck(
				'scope',
				'For better accessibility, use the "scope" attribute in your table headers.',
				/<th[\s\S]*?scope=["'](col|row)["'][\s\S]*?>/i
			)
		];

		const result = validateHtml(code, customChecks);

		// Check for minimum requirements - a proper table with days, times, and data cells
		const hasTable = /<table[\s\S]*?>[\s\S]*?<\/table>/i.test(code);
		const hasHeaders = /<th[\s\S]*?>[\s\S]*?<\/th>/i.test(code);
		const hasData = /<td[\s\S]*?>[\s\S]*?<\/td>/i.test(code);
		const hasDaysOfWeek = /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i.test(code);
		const hasTimeSlots = /([0-9]|1[0-2])[\s]*?(:|am|pm|:00|:15|:30|:45)/i.test(code);

		if (result.success && hasTable && hasHeaders && hasData && hasDaysOfWeek && hasTimeSlots) {
			taskCompleted = true;
		}

		return result;
	};

	const handleSubmit = () => {
		try {
			submissionResult = validateScheduleTable(htmlCode);
			validationErrors = submissionResult.errors || [];

			if (!submissionResult.success) {
				submissionResult = null;
			}
		} catch (error) {
			console.error('Error in schedule table validation:', error);
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
			<h3 class="mb-3 text-xl font-semibold">Challenge: Create a Weekly Schedule</h3>
			<p class="text-lg">
				Now that you've learned about HTML tables, it's time to put your knowledge into practice by
				creating a weekly schedule. Tables are perfect for this type of structured data where you
				need to organize information by days and times.
			</p>
			<p class="mt-2 text-lg">
				In this challenge, you'll create a weekly schedule using semantic table elements to clearly
				display your activities throughout the week.
			</p>
		</section>

		<div class="border-l-4 border-indigo-500 bg-indigo-50 p-4">
			<h4 class="font-semibold">✨ Your Mission:</h4>
			<p>Create a weekly schedule table that includes:</p>
			<ul class="mt-2 ml-6 list-disc">
				<li>
					A well-structured <code class="code">&lt;table&gt;</code> with proper semantic elements (<code
						class="code">&lt;thead&gt;</code
					>, <code class="code">&lt;tbody&gt;</code>, etc.)
				</li>
				<li>
					Days of the week as column headers in <code class="code">&lt;th&gt;</code> elements
				</li>
				<li>
					Time slots (e.g., 9:00 AM, 10:00 AM) as row headers using <code class="code"
						>&lt;th&gt;</code
					> elements
				</li>
				<li>
					Activities or events in data cells using <code class="code">&lt;td&gt;</code> elements
				</li>
				<li>
					Proper use of the <code class="code">scope</code> attribute for better accessibility
				</li>
				<li>
					A descriptive <code class="code">&lt;caption&gt;</code> for your table
				</li>
			</ul>
			<p class="mt-3 italic">
				Your schedule can be for school, work, or any weekly routine you'd like to organize. Be
				creative with your activities!
			</p>
		</div>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Schedule Examples</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div class="rounded-lg border border-blue-200 bg-blue-50 p-3 shadow-sm">
					<h4 class="font-medium text-blue-700">Student Schedule</h4>
					<ul class="mt-1 list-disc pl-5 text-sm">
						<li>Class times and subjects</li>
						<li>Study periods</li>
						<li>Extracurricular activities</li>
						<li>Meal times</li>
					</ul>
				</div>
				<div class="rounded-lg border border-purple-200 bg-purple-50 p-3 shadow-sm">
					<h4 class="font-medium text-purple-700">Work Schedule</h4>
					<ul class="mt-1 list-disc pl-5 text-sm">
						<li>Meetings and appointments</li>
						<li>Project deadlines</li>
						<li>Break times</li>
						<li>Focused work sessions</li>
					</ul>
				</div>
				<div class="rounded-lg border border-green-200 bg-green-50 p-3 shadow-sm">
					<h4 class="font-medium text-green-700">Fitness Schedule</h4>
					<ul class="mt-1 list-disc pl-5 text-sm">
						<li>Workout routines</li>
						<li>Rest days</li>
						<li>Meal planning</li>
						<li>Progress tracking</li>
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
						<p>
							Great job! You've created a well-structured schedule using proper HTML table elements.
						</p>
						<p class="mt-1">Your table demonstrates good semantic organization of tabular data.</p>
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
						<svelte:fragment slot="trigger">Hint: Basic Schedule Structure</svelte:fragment>
						<div class="hint-card">
							<p>Here's a basic structure to get you started:</p>
							<pre class="code mt-2 rounded p-2">
&lt;table&gt;
  &lt;caption&gt;My Weekly Schedule&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;&lt;/th&gt; &lt;!-- Empty cell for the corner --&gt;
      &lt;th scope="col"&gt;Monday&lt;/th&gt;
      &lt;th scope="col"&gt;Tuesday&lt;/th&gt;
      &lt;!-- Add more days of the week --&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;9:00 AM&lt;/th&gt;
      &lt;td&gt;Activity for Monday at 9 AM&lt;/td&gt;
      &lt;td&gt;Activity for Tuesday at 9 AM&lt;/td&gt;
      &lt;!-- Add more activities for other days --&gt;
    &lt;/tr&gt;
    &lt;!-- Add more time slots --&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint2">
						<svelte:fragment slot="trigger">Hint: Accessibility Features</svelte:fragment>
						<div class="hint-card">
							<p>For better accessibility, use these features:</p>
							<ul class="mt-2 list-disc pl-6">
								<li>
									The <code>scope</code> attribute on <code>&lt;th&gt;</code> elements:
									<pre class="code mt-1 rounded p-1 text-sm">
&lt;th scope="col"&gt;Monday&lt;/th&gt; &lt;!-- This is a column header --&gt;
&lt;th scope="row"&gt;9:00 AM&lt;/th&gt; &lt;!-- This is a row header --&gt;</pre>
								</li>
								<li class="mt-2">
									A descriptive <code>&lt;caption&gt;</code> element:
									<pre class="code mt-1 rounded p-1 text-sm">
&lt;caption&gt;Weekly Class Schedule for Fall Semester 2023&lt;/caption&gt;</pre>
								</li>
							</ul>
						</div>
					</AccordionItem>

					<AccordionItem value="hint3">
						<svelte:fragment slot="trigger">Hint: Complete Schedule Example</svelte:fragment>
						<div class="hint-card">
							<p>Here's a more complete example of a student schedule:</p>
							<pre class="code mt-2 rounded p-2">
&lt;table&gt;
  &lt;caption&gt;My College Class Schedule - Spring 2023&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;&lt;/th&gt;
      &lt;th scope="col"&gt;Monday&lt;/th&gt;
      &lt;th scope="col"&gt;Tuesday&lt;/th&gt;
      &lt;th scope="col"&gt;Wednesday&lt;/th&gt;
      &lt;th scope="col"&gt;Thursday&lt;/th&gt;
      &lt;th scope="col"&gt;Friday&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;8:00 AM&lt;/th&gt;
      &lt;td&gt;Mathematics&lt;/td&gt;
      &lt;td&gt;&lt;/td&gt;
      &lt;td&gt;Mathematics&lt;/td&gt;
      &lt;td&gt;&lt;/td&gt;
      &lt;td&gt;Mathematics&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;10:00 AM&lt;/th&gt;
      &lt;td&gt;Web Development&lt;/td&gt;
      &lt;td&gt;Computer Science&lt;/td&gt;
      &lt;td&gt;Web Development&lt;/td&gt;
      &lt;td&gt;Computer Science&lt;/td&gt;
      &lt;td&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;12:00 PM&lt;/th&gt;
      &lt;td colspan="5"&gt;Lunch Break&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;1:00 PM&lt;/th&gt;
      &lt;td&gt;History&lt;/td&gt;
      &lt;td&gt;Study Group&lt;/td&gt;
      &lt;td&gt;History&lt;/td&gt;
      &lt;td&gt;Study Group&lt;/td&gt;
      &lt;td&gt;History&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;3:00 PM&lt;/th&gt;
      &lt;td&gt;Art&lt;/td&gt;
      &lt;td&gt;&lt;/td&gt;
      &lt;td&gt;Art&lt;/td&gt;
      &lt;td&gt;&lt;/td&gt;
      &lt;td&gt;Club Meeting&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</pre>
							<p class="mt-2 text-sm">
								Notice how the lunch break uses <code>colspan="5"</code> to span across all days of the
								week.
							</p>
						</div>
					</AccordionItem>

					<AccordionItem value="hint4">
						<svelte:fragment slot="trigger">Hint: Styling Your Table (Optional)</svelte:fragment>
						<div class="hint-card">
							<p>
								While this challenge focuses on HTML structure, you can add some basic styling with
								inline CSS:
							</p>
							<pre class="code mt-2 rounded p-2">
&lt;table border="1" style="border-collapse: collapse; width: 100%;"&gt;
  &lt;!-- Table content --&gt;
&lt;/table&gt;</pre>
							<p class="mt-2 text-sm">And for cells:</p>
							<pre class="code mt-2 rounded p-2">
&lt;th style="padding: 8px; background-color: #f2f2f2;"&gt;Monday&lt;/th&gt;
&lt;td style="padding: 8px; text-align: center;"&gt;Meeting&lt;/td&gt;</pre>
							<p class="mt-2 text-sm">
								This is optional, but can make your schedule more readable. In real projects, you
								would use external CSS instead.
							</p>
						</div>
					</AccordionItem>
				</Accordion>
			</div>
		</div>

		<div class="mt-8 rounded-lg bg-blue-50 p-6">
			<h4 class="font-semibold">Why Tables Matter for Schedules</h4>
			<p class="mt-2">
				Schedules are a perfect use case for HTML tables because they represent truly tabular
				data—information that is naturally organized in rows and columns. Using semantic table
				elements provides several benefits:
			</p>
			<ul class="mt-3 list-disc space-y-1 pl-6">
				<li>
					<strong>Clear organization:</strong> Tables visually organize time and activity data in an
					intuitive grid format
				</li>
				<li>
					<strong>Accessibility:</strong> Properly marked-up tables with <code>scope</code> attributes
					help screen readers announce headers with their associated data
				</li>
				<li>
					<strong>Responsiveness:</strong> Well-structured tables can be styled to adapt to different
					screen sizes
				</li>
				<li>
					<strong>Readability:</strong> Tables make it easy to quickly scan and find specific time slots
					or activities
				</li>
			</ul>
			<p class="mt-3">
				Creating schedules with proper HTML tables is a skill you'll use in many real-world
				applications, from personal planners to academic websites and business applications.
			</p>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Additional Resources</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Table Documentation</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN Web Docs: HTML Table Element</a
							>
						</li>
						<li>
							<a
								href="https://www.w3.org/WAI/tutorials/tables/"
								target="_blank"
								class="text-indigo-600 hover:underline">W3C: Tables Tutorial</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Advanced Table Features</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope"
								target="_blank"
								class="text-indigo-600 hover:underline">Using the scope attribute</a
							>
						</li>
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced"
								target="_blank"
								class="text-indigo-600 hover:underline">Advanced features and accessibility</a
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
