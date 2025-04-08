<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Quiz: Table Detective'
	};

	let { data }: PageProps = $props();

	const sectionIndex = data.section.index;
	const userId = data.user.id;
	const moduleId = data.module.data.url;

	const questions = [
		{
			question: 'Which scenario is the MOST appropriate use of an HTML table?',
			options: [
				'Creating a multi-column page layout with a header, sidebar, and footer',
				'Displaying a product pricing comparison across different service tiers',
				'Creating a photo gallery with evenly spaced images',
				'Building a navigation menu with multiple sections'
			],
			correctAnswer: 1,
			explanation:
				'Tables are designed for tabular data like pricing comparisons. Page layouts, photo galleries, and navigation menus should use CSS grid, flexbox, or other layout techniques instead.'
		},
		{
			question: "What's missing in this table structure?",
			code: `<table>
  <tr>
    <td>Name</td>
    <td>Age</td>
    <td>Country</td>
  </tr>
  <tr>
    <td>Maria</td>
    <td>28</td>
    <td>Brazil</td>
  </tr>
</table>`,
			options: [
				'The <caption> element',
				'The <thead> and <tbody> sections',
				'Table header cells (<th>) instead of <td> for column headers',
				'A border attribute'
			],
			correctAnswer: 2,
			explanation:
				'The first row contains column headings but uses <td> (table data) elements instead of <th> (table header) elements, which would provide semantic meaning and better accessibility.'
		},
		{
			question:
				'Which attribute is essential for accessibility on <th> elements in complex tables?',
			options: ['class', 'id', 'scope', 'style'],
			correctAnswer: 2,
			explanation:
				'The "scope" attribute (with values like "col" or "row") helps screen readers associate header cells with their data cells, making tables more accessible to users with screen readers.'
		},
		{
			question: 'Identify the INCORRECT HTML table code:',
			options: [
				'<table><tr><th>Header</th></tr></tr><tr><td>Data</td></tr></table>',
				'<table><thead><tr><th>Header</th></tr></thead><tbody><tr><td>Data</td></tr></tbody></table>',
				'<table><tr><td>Data1</td></tr><caption>Table Title</caption></table>',
				'<table><tr><th scope="col">Header</th></tr><tr><td>Data</td></tr></table>'
			],
			correctAnswer: 2,
			explanation:
				'The <caption> element must be the first child of the <table> element, appearing right after the opening <table> tag and before any other table elements.'
		},
		{
			question: 'Which statement about tables is FALSE?',
			options: [
				'Tables should be used for displaying tabular data like spreadsheets',
				'The <thead>, <tbody>, and <tfoot> elements help organize table content',
				'Tables are a recommended way to position elements in a responsive layout',
				'Screen readers use table headers to help users understand data relationships'
			],
			correctAnswer: 2,
			explanation:
				'Using tables for page layout is an outdated practice and NOT recommended. Modern web development uses CSS grid, flexbox, and other layout techniques for positioning elements in a responsive design.'
		},
		{
			question: "What's the purpose of the colspan and rowspan attributes in table cells?",
			options: [
				'They control the width and height of cells in pixels',
				'They specify text alignment within cells',
				'They specify how many columns or rows a cell should span',
				'They determine which cells are headers versus data cells'
			],
			correctAnswer: 2,
			explanation:
				'The colspan and rowspan attributes allow cells to span multiple columns or rows respectively, enabling more complex table structures.'
		},
		{
			question: 'Which element is used to provide a title or caption for a table?',
			options: ['<title>', '<header>', '<caption>', '<summary>'],
			correctAnswer: 2,
			explanation:
				'The <caption> element is specifically designed to provide a title or description for a table. It appears at the top of the table but is different from a header row.'
		},
		{
			question:
				'Identify the example that demonstrates proper nesting of table structure elements:',
			options: [
				'<table><tr><td><thead><tr>...</tr></thead></td></tr></table>',
				'<table><tbody><thead><tr>...</tr></thead></tbody></table>',
				'<table><thead><tr>...</tr></thead><tbody><tr>...</tr></tbody></table>',
				'<table><tr><thead>...</thead><tbody>...</tbody></tr></table>'
			],
			correctAnswer: 2,
			explanation:
				'The correct nesting structure is <table> containing <thead> and <tbody> sections, which in turn contain <tr> (row) elements. The other options incorrectly nest these elements.'
		},
		{
			question: 'Which property helps make tables more usable on small screens?',
			options: ['table-fixed', 'table-responsive', 'overflow-x: auto', 'display: flex'],
			correctAnswer: 2,
			explanation:
				'Wrapping a table in a container with "overflow-x: auto" allows users to horizontally scroll the table on small screens while keeping the rest of the page fixed.'
		},
		{
			question: 'When would it be appropriate to use nested tables (tables within tables)?',
			options: [
				'When creating a complex page layout with multiple sections',
				'When displaying hierarchical data that naturally requires nested structures',
				'When you need to align elements precisely across different rows',
				'Nested tables are always a best practice for complex data'
			],
			correctAnswer: 1,
			explanation:
				'Nested tables should be avoided when possible, but may be appropriate for truly hierarchical data where the nesting represents actual data relationships. They should not be used for layout purposes or as a standard practice.'
		}
	];

	let selectedAnswers = $state<Record<number, number>>({});
	let showResults = $state(false);
	let quizCompleted = $state(false);
	let score = $state(0);

	function selectAnswer(questionIndex: number, answerIndex: number) {
		selectedAnswers[questionIndex] = answerIndex;
	}

	function checkAnswers() {
		showResults = true;
		score = questions.reduce((acc, q, i) => {
			return acc + (selectedAnswers[i] === q.correctAnswer ? 1 : 0);
		}, 0);

		const scorePercentage = (score / questions.length) * 100;
		if (scorePercentage >= 70) {
			quizCompleted = true;
		} else {
			quizCompleted = false;
		}
	}

	function resetQuiz() {
		selectedAnswers = {};
		showResults = false;
		score = 0;
		quizCompleted = false;
	}

	const taskProps = $derived({
		section: { ...sectionData, ...data.section.meta },
		nextSection: data.module.sections[sectionIndex + 1],
		prevSection: data.module.sections[sectionIndex - 1],
		completed: data.section.completed,
		completedNow: quizCompleted,
		module: data.module.data,
		currentSectionIndex: sectionIndex,
		totalSections: data.module.sections.length,
		onMarkAsCompleted: async () => {
			try {
				await modules.markSectionCompleted(userId, moduleId, sectionIndex);
			} catch (error) {
				console.error('Failed to mark section as completed:', error);
			}
		}
	});
</script>

<ModuleTask {...taskProps}>
	<div class="space-y-6">
		<section>
			<h3 class="mb-3 text-xl font-semibold">Quiz: Table Detective</h3>
			<p class="text-lg">
				Test your knowledge of HTML tables! This quiz will challenge your understanding of table
				elements, structure, and best practices.
			</p>
			<p class="mt-2 text-lg">
				Can you spot the correct way to use tables and identify common mistakes? Let's find out!
			</p>
		</section>

		<div class="mb-4 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4">
			<p>
				Tables are powerful for displaying structured data, but they have specific use cases and
				best practices. Choose the best answer for each question to demonstrate your understanding
				of when and how to use HTML tables properly.
			</p>
		</div>

		{#if showResults}
			<div class="mb-6 rounded-lg border bg-white p-6 shadow-sm">
				<h4 class="mb-2 text-lg font-semibold">Your Score: {score}/{questions.length}</h4>
				<div class="h-4 w-full overflow-hidden rounded-full bg-gray-200">
					<div
						class="h-full rounded-full bg-indigo-600"
						style="width: {(score / questions.length) * 100}%"
					></div>
				</div>
				{#if quizCompleted}
					<p class="mt-2 text-green-600">
						Great job! You have a solid understanding of HTML tables.
					</p>
				{:else}
					<p class="mt-2 text-amber-600">
						You need a score of at least 70% to pass. Review the table lesson and try again!
					</p>
				{/if}
			</div>
		{/if}

		<div class="space-y-8">
			{#each questions as question, questionIndex (questionIndex)}
				<div class="rounded-lg border bg-white p-6 shadow-sm">
					<h4 class="mb-4 text-lg font-semibold">
						Question {questionIndex + 1}: {question.question}
					</h4>

					{#if question.code}
						<div class="mb-4 rounded bg-gray-100 p-4 font-mono text-sm">
							<pre>{question.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
						</div>
					{/if}

					<div class="space-y-2">
						{#each question.options as option, optionIndex (optionIndex)}
							<label
								class="flex cursor-pointer items-start rounded-lg border p-3 transition-colors
									{selectedAnswers[questionIndex] === optionIndex
									? 'border-indigo-300 bg-indigo-50'
									: 'hover:bg-gray-50'}
									{showResults && optionIndex === question.correctAnswer ? 'border-green-300 bg-green-50' : ''}
									{showResults &&
								selectedAnswers[questionIndex] === optionIndex &&
								optionIndex !== question.correctAnswer
									? 'border-red-300 bg-red-50'
									: ''}"
							>
								<input
									type="radio"
									class="mt-1 mr-3"
									name="question-{questionIndex}"
									value={optionIndex}
									checked={selectedAnswers[questionIndex] === optionIndex}
									onchange={() => selectAnswer(questionIndex, optionIndex)}
									disabled={showResults}
								/>
								<span>{option}</span>
							</label>
						{/each}
					</div>

					{#if showResults}
						<div class="mt-4">
							{#if selectedAnswers[questionIndex] === question.correctAnswer}
								<p class="text-green-600">✓ Correct!</p>
							{:else if selectedAnswers[questionIndex] !== undefined}
								<p class="text-red-600">
									✗ Incorrect. The correct answer is: {question.options[question.correctAnswer]}
								</p>
							{:else}
								<p class="text-amber-600">⚠ You didn't answer this question.</p>
							{/if}
							<p class="mt-1 text-gray-700 italic">{question.explanation}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<div class="mt-8 flex justify-between">
			{#if showResults}
				<button class="btn secondary" onclick={() => resetQuiz()}>Try Again</button>

				{#if quizCompleted}
					<p class="text-lg font-medium text-green-600">
						Great job! You've demonstrated good understanding of HTML tables.
					</p>
				{:else}
					<p class="text-lg font-medium text-amber-600">
						Keep learning about HTML tables and try again!
					</p>
				{/if}
			{:else}
				<div></div>
				<button class="btn primary" onclick={() => checkAnswers()}>Check Answers</button>
			{/if}
		</div>

		{#if showResults && quizCompleted}
			<div class="mt-6 rounded-lg bg-blue-50 p-6">
				<h4 class="font-semibold">Tables in Modern Web Development</h4>
				<p class="mt-2">
					Now that you understand proper table usage, you'll be able to create accessible,
					well-structured data tables while avoiding common pitfalls like using tables for layout.
					This skill is essential for creating professional web content that works well for all
					users.
				</p>
				<p class="mt-2">
					In the next section, you'll apply this knowledge by creating your own weekly schedule
					using HTML tables!
				</p>
			</div>
		{/if}
	</div>
</ModuleTask>

<style>
	/* Add any specific styles needed for this quiz page */
</style>
