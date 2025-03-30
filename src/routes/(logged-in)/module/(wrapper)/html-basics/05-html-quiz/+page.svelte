<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'HTML Structure & Tags Quiz'
	};

	let { data }: PageProps = $props();

	const sectionIndex = data.section.index;
	const userId = data.user.id;
	const moduleId = data.module.data.url;

	const questions = [
		{
			question: 'Which of the following correctly describes HTML?',
			options: [
				'A programming language that creates dynamic websites',
				'A markup language that defines the structure of web content',
				'A styling language that controls how websites look',
				'A server-side language that processes form data'
			],
			correctAnswer: 1,
			explanation:
				'HTML (HyperText Markup Language) is a markup language that defines the structure and content of web pages, not their behavior or appearance.'
		},
		{
			question: 'What is the correct HTML structure for a basic webpage?',
			options: [
				'<body><head><title>Page Title</title></head><p>Content</p></body>',
				'<DOCTYPE html><html><title>Page Title</title><body>Content</body></html>',
				'<!DOCTYPE html><html><head><title>Page Title</title></head><body>Content</body></html>',
				'<html><body>Content</body><head><title>Page Title</title></head></html>'
			],
			correctAnswer: 2,
			explanation:
				'The correct order is DOCTYPE declaration, followed by html element containing both head (with metadata) and body (with content).'
		},
		{
			question: 'Which HTML element is a self-closing (empty) element?',
			options: ['<div>', '<span>', '<p>', '<img>'],
			correctAnswer: 3,
			explanation:
				"<img> is a self-closing element that doesn't need a closing tag because it doesn't contain content between tags."
		},
		{
			question: 'What is the primary role of HTML in modern web development?',
			options: [
				'To handle user interactions and form submissions',
				'To provide structure and semantic meaning to content',
				'To style content and create responsive designs',
				'To connect to databases and process data'
			],
			correctAnswer: 1,
			explanation:
				'HTML provides structure and semantic meaning to web content, while CSS handles styling and JavaScript handles interactions.'
		},
		{
			question: 'Which of these is NOT a benefit of using semantic HTML?',
			options: [
				'Improved accessibility for screen readers',
				'Better SEO (Search Engine Optimization)',
				'Enhanced website styling capabilities',
				'Clearer code structure and maintainability'
			],
			correctAnswer: 2,
			explanation:
				'While semantic HTML improves accessibility, SEO, and code clarity, styling capabilities come from CSS, not from semantic HTML.'
		},
		{
			question: 'What does the DOCTYPE declaration do?',
			options: [
				'It creates a connection to the database',
				'It tells the browser which version of HTML the page is using',
				"It defines the document's title that appears in the browser tab",
				'It imports external JavaScript libraries'
			],
			correctAnswer: 1,
			explanation:
				'The DOCTYPE declaration tells browsers which version of HTML the page uses, helping them render the content correctly.'
		},
		{
			question: 'Which HTML element should contain all the metadata about your web page?',
			options: ['<body>', '<meta>', '<head>', '<header>'],
			correctAnswer: 2,
			explanation:
				"The <head> element contains metadata about the document that isn't displayed on the page, like title, character encoding, and links to stylesheets."
		},
		{
			question: 'What attribute should you always include in the <html> tag for accessibility?',
			options: ['class', 'id', 'lang', 'style'],
			correctAnswer: 2,
			explanation:
				'The lang attribute specifies the language of the document, helping screen readers pronounce content correctly and improving accessibility.'
		},
		{
			question: 'Which HTML element is used for the main heading of a section?',
			options: ['<heading>', '<h1>', '<title>', '<main>'],
			correctAnswer: 1,
			explanation:
				"<h1> defines the most important heading on a page. Each page should typically have one <h1> that describes the page's main content."
		},
		{
			question: 'Where should you place <script> tags for best page loading performance?',
			options: [
				'In the <head> section at the top of the document',
				'Just before the closing </body> tag',
				'Immediately after the opening <body> tag',
				"It doesn't matter where <script> tags are placed"
			],
			correctAnswer: 1,
			explanation:
				'Placing script tags just before the closing </body> tag allows HTML to load first, improving perceived page loading performance.'
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
		if (scorePercentage >= 75) {
			quizCompleted = true;
		} else {
			quizCompleted = false;
		}
	}

	function resetQuiz() {
		selectedAnswers = {};
		showResults = false;
		score = 0;
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
				console.error('Failed to mark as completed:', error);
			}
		}
	});
</script>

<ModuleTask {...taskProps}>
	<div class="space-y-6">
		<section>
			<h3 class="mb-3 text-xl font-semibold">HTML Structure & Tags Quiz</h3>
			<p class="text-lg">
				Test your knowledge of HTML fundamentals, document structure, and proper tag usage. You need
				at least 75% correct answers to complete this section.
			</p>
		</section>

		<div class="mb-4 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4">
			<p>
				Put your HTML knowledge to the test! Select the best answer for each question. This quiz
				covers content from the previous lessons on HTML basics, structure, and the role of HTML in
				web development.
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
					<p class="mt-2 text-green-600">Great job! You've passed the HTML quiz.</p>
				{:else}
					<p class="mt-2 text-amber-600">
						You need a score of at least 75% to pass. Keep learning and try again!
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
								<p class="mt-1 text-gray-700 italic">{question.explanation}</p>
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
						Congratulations! You've mastered the basics of HTML structure and tags.
					</p>
				{:else}
					<p class="text-lg font-medium text-amber-600">
						Keep learning HTML fundamentals and try again!
					</p>
				{/if}
			{:else}
				<div></div>
				<button class="btn primary" onclick={checkAnswers}>Check Answers</button>
			{/if}
		</div>

		{#if showResults && quizCompleted}
			<div class="mt-6 rounded-lg bg-blue-50 p-6">
				<h4 class="font-semibold">What's Next?</h4>
				<p class="mt-2">
					Now that you understand the basics of HTML structure and tags, you're ready to start
					building more complex web pages. In the next sections, you'll learn how to incorporate
					more advanced HTML elements and create complete web pages from scratch.
				</p>
			</div>
		{/if}
	</div>
</ModuleTask>
