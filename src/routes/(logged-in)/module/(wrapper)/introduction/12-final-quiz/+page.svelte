<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Final Quiz'
	};

	let { data }: PageProps = $props();

	const sectionIndex = data.section.index;
	const userId = data.user.id;
	const moduleId = data.module.data.url;
	let quizCompleted = $state(false);
	let selectedAnswers = $state<Record<number, number>>({});
	let showResults = $state(false);
	let score = $state(0);

	const questions = [
		{
			question: 'What are the three core technologies of web development?',
			options: [
				'HTML, Java, CSS',
				'HTML, CSS, JavaScript',
				'HTML, CSS, Python',
				'JavaScript, TypeScript, React'
			],
			correctAnswer: 1
		},
		{
			question: 'Which tool is used for version control in web development?',
			options: ['Docker', 'Webpack', 'Git', 'Node.js'],
			correctAnswer: 2
		},
		{
			question: 'What is the primary responsibility of a backend developer?',
			options: [
				'Creating user interfaces',
				'Designing website layouts',
				'Creating server-side logic and database management',
				'Testing website functionality'
			],
			correctAnswer: 2
		},
		{
			question: 'Which browser tool allows you to inspect HTML and CSS on a webpage?',
			options: ['Node Inspector', 'Developer Tools', 'Terminal', 'Visual Studio Code'],
			correctAnswer: 1
		},
		{
			question:
				'What type of architecture has a single page loading initially, with content updating dynamically?',
			options: [
				'Multi-page Application (MPA)',
				'Progressive Web App (PWA)',
				'Single-page Application (SPA)',
				'Static Site Generator (SSG)'
			],
			correctAnswer: 2
		},
		{
			question: 'Which of these is NOT a popular code editor for web development?',
			options: ['Visual Studio Code', 'Sublime Text', 'Microsoft Word', 'WebStorm'],
			correctAnswer: 2
		},
		{
			question: 'What does CSS stand for?',
			options: [
				'Computer Style Sheets',
				'Cascading Style Sheets',
				'Creative Style System',
				'Coded Style Syntax'
			],
			correctAnswer: 1
		},
		{
			question: 'Which of these is a key advantage of using Git for a project?',
			options: [
				'It automatically fixes bugs in your code',
				'It provides web hosting for your project',
				'It allows you to track changes and collaborate with others',
				'It compiles your code to make it run faster'
			],
			correctAnswer: 2
		},
		{
			question:
				'When setting up your first project, what should you create to help others understand your project?',
			options: ['A README.md file', 'A sitemap', 'A list of competitors', 'A business plan'],
			correctAnswer: 0
		},
		{
			question: 'What year was the World Wide Web invented?',
			options: ['1989', '1995', '2001', '1983'],
			correctAnswer: 0
		}
	];

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
				console.error('Failed to mark module as completed:', error);
			}
		}
	});
</script>

<ModuleTask {...taskProps}>
	<div class="space-y-6">
		<section>
			<h3 class="mb-3 text-xl font-semibold">Final Quiz: Web Development Introduction</h3>
			<p class="text-lg">
				Test your knowledge of all topics covered in this module. You'll need to score at least 75%
				to complete the module.
			</p>
		</section>

		<div class="mb-4 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4">
			<p>
				Select the best answer for each question. Aim for a score of 75% or higher to complete the
				module.
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
					<p class="mt-2 text-green-600">Congratulations! You've passed the quiz.</p>
				{:else}
					<p class="mt-2 text-amber-600">You need a score of at least 75% to pass. Try again!</p>
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
						Great job! You've completed the introduction module.
					</p>
				{:else}
					<p class="text-lg font-medium text-amber-600">Keep learning and try the quiz again.</p>
				{/if}
			{:else}
				<div></div>
				<button class="btn primary" onclick={checkAnswers}>Submit Answers</button>
			{/if}
		</div>
	</div>
</ModuleTask>
