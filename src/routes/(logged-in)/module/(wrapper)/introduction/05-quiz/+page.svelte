<script lang="ts">
	import type { PageData } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { page } from '$app/stores';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Mid-Module Quiz'
	};

	let { data }: { data: PageData } = $props();

	const sectionIndex = data.section.index;
	let quizCompleted = $state(false);
	let selectedAnswers = $state<Record<number, number>>({});
	let showResults = $state(false);
	const userId = $page.data.user?.id || 'guest-user';
	const moduleId = data.module.data.url;

	const questions = [
		{
			question: 'Who invented the World Wide Web?',
			options: ['Bill Gates', 'Tim Berners-Lee', 'Steve Jobs', 'Vint Cerf'],
			correctAnswer: 1
		},
		{
			question: 'Which of the following is NOT a primary component of web development?',
			options: ['HTML', 'CSS', 'JavaScript', 'PHP'],
			correctAnswer: 3
		},
		{
			question: 'What is the main difference between a website and a web application?',
			options: [
				'Websites are always free, web applications are paid',
				'Websites display information, web applications are interactive',
				'Websites use HTML, web applications use JavaScript',
				'There is no difference'
			],
			correctAnswer: 1
		},
		{
			question: 'Frontend development focuses on:',
			options: [
				'Server management and data processing',
				'What users see and interact with in the browser',
				'Database design and optimization',
				'API development'
			],
			correctAnswer: 1
		},
		{
			question: 'Which language is primarily used for styling web pages?',
			options: ['HTML', 'JavaScript', 'CSS', 'Python'],
			correctAnswer: 2
		}
	];

	function selectAnswer(questionIndex: number, answerIndex: number) {
		selectedAnswers[questionIndex] = answerIndex;
	}

	function checkAnswers() {
		showResults = true;
		const correctAnswers = questions.reduce((acc, q, i) => {
			return acc + (selectedAnswers[i] === q.correctAnswer ? 1 : 0);
		}, 0);

		const totalQuestions = questions.length;
		const scorePercentage = (correctAnswers / totalQuestions) * 100;

		// Require at least 75% correct answers to pass
		if (scorePercentage >= 75) {
			quizCompleted = true;
		} else {
			quizCompleted = false;
		}
	}

	function resetQuiz() {
		selectedAnswers = {};
		showResults = false;
	}

	const taskProps = $derived({
		section: { ...sectionData, ...data.section.current },
		nextSection: data.module.sections[sectionIndex + 1],
		prevSection: data.module.sections[sectionIndex - 1],
		completed: data.section.current?.completed || false,
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
			<h3 class="mb-3 text-xl font-semibold">Mid-Module Quiz</h3>
			<p class="text-lg">
				Test your knowledge of web fundamentals, history, and frontend/backend concepts. You need at
				least 75% correct answers to complete this section.
			</p>
		</section>

		<div class="mb-4 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4">
			<p>
				Select the best answer for each question. You need to answer at least 75% correctly to
				proceed.
			</p>
		</div>

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
						Congratulations! You've answered enough questions correctly to proceed.
					</p>
				{:else}
					<p class="text-lg font-medium text-amber-600">
						You need at least 75% correct answers to continue. Please try again.
					</p>
				{/if}
			{:else}
				<div></div>
				<button class="btn primary" onclick={checkAnswers}>Check Answers</button>
			{/if}
		</div>
	</div>
</ModuleTask>
