<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Selector Detective Quiz'
	};

	let { data }: PageProps = $props();

	const sectionIndex = data.section.index;
	const userId = data.user.id;
	const moduleId = data.module.data.url;

	const questions = [
		{
			question: 'Which selector targets all paragraph elements on a page?',
			options: [
				'#p { color: blue; }',
				'.p { color: blue; }',
				'p { color: blue; }',
				'[p] { color: blue; }'
			],
			correctAnswer: 2,
			explanation:
				'Using just the element name (p) targets all paragraph elements on the page. The # symbol is for IDs, the . symbol is for classes, and [] is for attribute selectors.'
		},
		{
			question: 'How would you select an element with the ID "header"?',
			options: [
				'#header { background-color: black; }',
				'.header { background-color: black; }',
				'header { background-color: black; }',
				'*header { background-color: black; }'
			],
			correctAnswer: 0,
			explanation:
				'The # symbol is used to select elements by their ID attribute. IDs should be unique on a page.'
		},
		{
			question: 'Which selector targets all elements with the class "button"?',
			options: [
				'button { padding: 10px; }',
				'#button { padding: 10px; }',
				'[class=button] { padding: 10px; }',
				'.button { padding: 10px; }'
			],
			correctAnswer: 3,
			explanation:
				'The . symbol is used to select elements by their class. Multiple elements can share the same class.'
		},
		{
			question: 'How would you select all list items inside an unordered list?',
			options: [
				'ul + li { margin-bottom: 5px; }',
				'ul li { margin-bottom: 5px; }',
				'li.ul { margin-bottom: 5px; }',
				'li > ul { margin-bottom: 5px; }'
			],
			correctAnswer: 1,
			explanation:
				'The descendant selector (space between elements) targets all li elements that are descendants of a ul element.'
		},
		{
			question: 'Which selector targets elements with a specific attribute?',
			options: [
				'a[href] { color: purple; }',
				'a.href { color: purple; }',
				'a#href { color: purple; }',
				'a:href { color: purple; }'
			],
			correctAnswer: 0,
			explanation:
				'The attribute selector [attr] targets elements that have the specified attribute, regardless of its value.'
		},
		{
			question:
				'How would you select all links that point to external websites (starting with "https://")?',
			options: [
				'a:external { text-decoration: underline; }',
				'a[target="_blank"] { text-decoration: underline; }',
				'a[href^="https://"] { text-decoration: underline; }',
				'a.external { text-decoration: underline; }'
			],
			correctAnswer: 2,
			explanation:
				'The [attr^="value"] selector targets elements with an attribute that begins with a specific value. In this case, it selects all links whose href attribute starts with "https://".'
		},
		{
			question: 'Which selector targets the first paragraph inside a div?',
			options: [
				'div > p:first-child { font-weight: bold; }',
				'div + p { font-weight: bold; }',
				'div p:first { font-weight: bold; }',
				'div > p + p { font-weight: bold; }'
			],
			correctAnswer: 0,
			explanation:
				'The > symbol is the child selector (targeting direct children only), and :first-child is a pseudo-class that selects the first child element of its parent.'
		},
		{
			question: 'How would you style an element when the user hovers over it?',
			options: [
				'button:hover { background-color: yellow; }',
				'button[hover] { background-color: yellow; }',
				'button.hover { background-color: yellow; }',
				'button::hover { background-color: yellow; }'
			],
			correctAnswer: 0,
			explanation:
				'The :hover pseudo-class applies styles when the user hovers their mouse over the specified element.'
		},
		{
			question: 'Which selector would style both h1 and h2 elements the same way?',
			options: [
				'h1 + h2 { color: navy; }',
				'h1, h2 { color: navy; }',
				'h1 > h2 { color: navy; }',
				'h1 h2 { color: navy; }'
			],
			correctAnswer: 1,
			explanation:
				'The comma in CSS selectors lets you apply the same styles to multiple selectors. This selector targets both h1 and h2 elements.'
		},
		{
			question: 'How would you select an input element of type "email"?',
			options: [
				'input.email { border: 1px solid gray; }',
				'input#email { border: 1px solid gray; }',
				'input:email { border: 1px solid gray; }',
				'input[type="email"] { border: 1px solid gray; }'
			],
			correctAnswer: 3,
			explanation:
				'The attribute selector with a specific value [attr="value"] targets elements with that exact attribute value. This selector matches input elements with type="email".'
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
			<h3 class="mb-3 text-xl font-semibold">Selector Detective Quiz</h3>
			<p class="text-lg">
				Test your knowledge of CSS selectors! Can you identify the correct selectors for different
				targeting scenarios?
			</p>
		</section>

		<div class="mb-4 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4">
			<p>
				Selectors are one of the most important concepts in CSS - they determine which elements your
				styles apply to. This quiz will test your understanding of different selector types and
				their syntax. You need at least 70% correct answers to pass.
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
						Great job! You've demonstrated a solid understanding of CSS selectors.
					</p>
				{:else}
					<p class="mt-2 text-amber-600">
						You need a score of at least 70% to pass. Keep studying CSS selectors and try again!
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
								<code class="font-mono text-sm">{option}</code>
							</label>
						{/each}
					</div>

					{#if showResults}
						<div class="mt-4">
							{#if selectedAnswers[questionIndex] === question.correctAnswer}
								<p class="text-green-600">✓ Correct!</p>
							{:else if selectedAnswers[questionIndex] !== undefined}
								<p class="text-red-600">
									✗ Incorrect. The correct answer is: <code class="font-mono"
										>{question.options[question.correctAnswer]}</code
									>
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
						Congratulations! You're becoming a CSS selector expert.
					</p>
				{:else}
					<p class="text-lg font-medium text-amber-600">
						Keep practicing with CSS selectors and try again!
					</p>
				{/if}
			{:else}
				<div></div>
				<button class="btn primary" onclick={checkAnswers}>Check Answers</button>
			{/if}
		</div>

		{#if showResults && quizCompleted}
			<div class="mt-6 rounded-lg bg-blue-50 p-6">
				<h4 class="font-semibold">Understanding Selectors</h4>
				<p class="mt-2">
					CSS selectors are patterns used to select and style HTML elements. Mastering selectors
					gives you precise control over your web pages. Remember these key selector types:
				</p>
				<ul class="mt-2 list-disc pl-6">
					<li><code class="font-mono">element</code> - Selects all elements of that type</li>
					<li><code class="font-mono">.class</code> - Selects all elements with that class</li>
					<li><code class="font-mono">#id</code> - Selects the element with that specific ID</li>
					<li>
						<code class="font-mono">element.class</code> - Selects elements of a specific type with that
						class
					</li>
					<li><code class="font-mono">parent > child</code> - Selects direct children</li>
					<li><code class="font-mono">ancestor descendant</code> - Selects nested elements</li>
					<li><code class="font-mono">[attribute]</code> - Selects elements with that attribute</li>
					<li><code class="font-mono">:pseudo-class</code> - Selects elements in special states</li>
				</ul>
			</div>
		{/if}
	</div>
</ModuleTask>

<style>
	code {
		font-family: monospace;
		background-color: #f3f4f6;
		padding: 0.1rem 0.3rem;
		border-radius: 0.25rem;
	}
</style>
