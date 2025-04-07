<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Accessibility Check!'
	};

	let { data }: PageProps = $props();

	const sectionIndex = data.section.index;
	const userId = data.user.id;
	const moduleId = data.module.data.url;

	const questions = [
		{
			scenario:
				'A website has a navigation menu at the top of the page. Which HTML element would be most appropriate to improve accessibility?',
			options: [
				'<div class="nav">...</div>',
				'<navigation>...</navigation>',
				'<nav>...</nav>',
				'<header class="navigation">...</header>'
			],
			correctAnswer: 2,
			explanation:
				'<nav> is a semantic element specifically designed for navigation sections, which helps screen readers identify and navigate through the site structure.'
		},
		{
			scenario:
				'You need to add an image of your company logo to the website. How should you make this accessible?',
			options: [
				'<img src="logo.png">',
				'<img src="logo.png" alt="Company Logo">',
				'<img src="logo.png" title="Company Logo">',
				'<picture><img src="logo.png"></picture>'
			],
			correctAnswer: 1,
			explanation:
				'The alt attribute provides alternative text for screen readers, describing the image for users who cannot see it.'
		},
		{
			scenario:
				"You're creating a form with a text input for the user's name. Which approach is most accessible?",
			options: [
				'<input type="text" name="username">',
				'<div>Name: <input type="text" name="username"></div>',
				'<label>Name: <input type="text" name="username"></label>',
				'<input type="text" name="username" placeholder="Enter your name">'
			],
			correctAnswer: 2,
			explanation:
				'Using a <label> element properly associates the text with the input field, making it clear to screen reader users what information is being requested.'
		},
		{
			scenario:
				'You need to create a page heading that represents the main topic. Which element should you use?',
			options: [
				'<p class="main-heading">Page Topic</p>',
				'<div class="heading">Page Topic</div>',
				'<h1>Page Topic</h1>',
				'<strong>Page Topic</strong>'
			],
			correctAnswer: 2,
			explanation:
				'The <h1> element represents the main heading of a page or section, which helps screen readers understand the page structure and allows users to navigate by headings.'
		},
		{
			scenario:
				"You're creating a button that opens a dialog modal. Which is the most accessible approach?",
			options: [
				'<div onclick="openModal()">Open Settings</div>',
				'<a href="#" onclick="openModal()">Open Settings</a>',
				'<button onclick="openModal()">Open Settings</button>',
				'<span class="button" onclick="openModal()">Open Settings</span>'
			],
			correctAnswer: 2,
			explanation:
				'The <button> element is inherently focusable, keyboard accessible, and semantically indicates an interactive control that performs an action when activated.'
		},
		{
			scenario:
				'A user needs to select their country from a list of options. Which form control is most accessible?',
			options: [
				'<input type="text" placeholder="Enter your country">',
				'<div class="custom-dropdown" tabindex="0">Select country</div>',
				'<select name="country"><option value="us">United States</option>...</select>',
				'A series of <input type="radio"> elements for each country'
			],
			correctAnswer: 2,
			explanation:
				'The <select> element provides built-in keyboard navigation, focus management, and is widely recognized by screen readers as a control for choosing from multiple options.'
		},
		{
			scenario:
				'You need to provide additional information about a complex form field. Which approach is most accessible?',
			options: [
				'Add detailed instructions in small text below the field',
				'Use the title attribute on the input field',
				'Link to a separate help page with instructions',
				'Use the aria-describedby attribute to link the input to an explanation'
			],
			correctAnswer: 3,
			explanation:
				'The aria-describedby attribute creates a programmatic connection between the form control and its description, ensuring screen readers can access the additional information when the user focuses on the input.'
		},
		{
			scenario:
				"You're designing a page with multiple sections. How should you structure these for the best accessibility?",
			options: [
				'Use <div> elements with descriptive class names',
				'Use <section> elements with appropriate heading elements',
				'Use <article> elements for all content blocks',
				'Use <container> elements for each section'
			],
			correctAnswer: 1,
			explanation:
				'Using <section> elements with proper heading hierarchy (<h1> through <h6>) creates a semantic document outline that helps assistive technologies understand and navigate the page structure.'
		},
		{
			scenario: 'Which approach is best for making a data table accessible?',
			options: [
				'Use <div> elements styled to look like a table',
				'Use a <table> with CSS for visual styling only',
				'Use a <table> with <th>, <caption>, and scope attributes',
				'Use a series of lists to represent the table data'
			],
			correctAnswer: 2,
			explanation:
				'Using a proper <table> structure with <th> for headers, <caption> for table description, and scope attributes to associate data cells with their headers makes the data understandable for screen reader users.'
		},
		{
			scenario:
				'You want to create a "Skip to main content" link for keyboard users. Where should this be placed?',
			options: [
				'At the bottom of the page',
				'In the site footer',
				'As the first element in the page body',
				'Within the navigation menu'
			],
			correctAnswer: 2,
			explanation:
				'Placing a skip link as the first focusable element in the page allows keyboard users to bypass navigation menus and jump directly to the main content, improving navigation efficiency.'
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
			<h3 class="mb-3 text-xl font-semibold">Accessibility Check!</h3>
			<p class="text-lg">
				Test your knowledge of HTML accessibility best practices. For each scenario, select the
				option that would create the most accessible experience for all users, including those using
				assistive technologies.
			</p>
		</section>

		<div class="mb-4 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4">
			<p>
				Accessibility is about making web content usable by everyone, including people with
				disabilities. Good HTML structure forms the foundation of accessible websites. Choose the
				best option in each scenario below to support accessibility.
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
						Great job! You've demonstrated good knowledge of HTML accessibility practices.
					</p>
				{:else}
					<p class="mt-2 text-amber-600">
						You need a score of at least 70% to pass. Keep learning about accessibility and try
						again!
					</p>
				{/if}
			</div>
		{/if}

		<div class="space-y-8">
			{#each questions as question, questionIndex (questionIndex)}
				<div class="rounded-lg border bg-white p-6 shadow-sm">
					<h4 class="mb-4 text-lg font-semibold">
						Scenario {questionIndex + 1}: {question.scenario}
					</h4>

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
								<span class="font-mono text-sm">{option}</span>
							</label>
						{/each}
					</div>

					{#if showResults}
						<div class="mt-4">
							{#if selectedAnswers[questionIndex] === question.correctAnswer}
								<p class="text-green-600">✓ Correct!</p>
								<p class="mt-1 text-gray-700">{question.explanation}</p>
							{:else if selectedAnswers[questionIndex] !== undefined}
								<p class="text-red-600">
									✗ Incorrect. The best option is: <span class="font-mono text-sm"
										>{question.options[question.correctAnswer]}</span
									>
								</p>
								<p class="mt-1 text-gray-700">{question.explanation}</p>
							{:else}
								<p class="text-amber-600">⚠ You didn't answer this question.</p>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<div class="mt-8 flex justify-between">
			{#if showResults}
				<button class="btn secondary" onclick={resetQuiz}>Try Again</button>

				{#if quizCompleted}
					<p class="text-lg font-medium text-green-600">
						Congratulations! You've shown a good understanding of HTML accessibility practices.
					</p>
				{:else}
					<p class="text-lg font-medium text-amber-600">
						Keep learning about accessibility in HTML and try again!
					</p>
				{/if}
			{:else}
				<div></div>
				<button class="btn primary" onclick={checkAnswers}>Check Answers</button>
			{/if}
		</div>

		{#if showResults && quizCompleted}
			<div class="mt-6 rounded-lg bg-blue-50 p-6">
				<h4 class="font-semibold">Why Accessibility Matters</h4>
				<p class="mt-2">
					Creating accessible websites isn't just a nice-to-have feature—it's essential for ensuring
					everyone can use your content regardless of their abilities or disabilities. Proper HTML
					structure and semantics form the foundation for accessibility, and when combined with ARIA
					attributes where needed, can dramatically improve the user experience for people using
					screen readers, keyboard navigation, or other assistive technologies.
				</p>
				<p class="mt-2">
					Remember that many accessibility improvements also benefit all users, such as clear page
					structure, proper form labels, and keyboard navigation support.
				</p>
			</div>
		{/if}
	</div>
</ModuleTask>
