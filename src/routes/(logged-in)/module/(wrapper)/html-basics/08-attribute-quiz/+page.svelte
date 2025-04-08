<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Element or Attribute?'
	};

	let { data }: PageProps = $props();

	const sectionIndex = data.section.index;
	const userId = data.user.id;
	const moduleId = data.module.data.url;

	const attributePairs = [
		{
			attribute: 'href',
			correctElement: 'a',
			description: 'Specifies the URL that a link points to'
		},
		{
			attribute: 'src',
			correctElement: 'img',
			description: 'Specifies the path to an image to display'
		},
		{
			attribute: 'alt',
			correctElement: 'img',
			description: 'Provides alternative text for an image'
		},
		{
			attribute: 'type',
			correctElement: 'input',
			description: 'Specifies what kind of input control to display'
		},
		{
			attribute: 'value',
			correctElement: 'input',
			description: 'Specifies the initial value of an input field'
		},
		{
			attribute: 'action',
			correctElement: 'form',
			description: 'Specifies where to send the form data when submitted'
		},
		{
			attribute: 'target',
			correctElement: 'a',
			description: 'Specifies where to open the linked document'
		},
		{
			attribute: 'checked',
			correctElement: 'input',
			description: 'Specifies that an input element should be pre-selected'
		},
		{
			attribute: 'for',
			correctElement: 'label',
			description: 'Specifies which form element a label is bound to'
		},
		{
			attribute: 'colspan',
			correctElement: 'td',
			description: 'Specifies how many columns a table cell should span'
		}
	];

	const possibleElements = [
		'a',
		'img',
		'input',
		'form',
		'div',
		'span',
		'p',
		'h1',
		'ul',
		'td',
		'label'
	];

	let userSelections = $state<Record<string, string>>({});

	attributePairs.forEach((pair) => {
		userSelections[pair.attribute] = '';
	});

	let showResults = $state(false);
	let quizCompleted = $state(false);
	let score = $state(0);

	function selectElement(attribute: string, element: string) {
		userSelections[attribute] = element;
	}

	function checkAnswers() {
		showResults = true;
		score = attributePairs.reduce((acc, pair) => {
			return acc + (userSelections[pair.attribute] === pair.correctElement ? 1 : 0);
		}, 0);

		const scorePercentage = (score / attributePairs.length) * 100;
		if (scorePercentage >= 70) {
			quizCompleted = true;
		} else {
			quizCompleted = false;
		}
	}

	function resetQuiz() {
		attributePairs.forEach((pair) => {
			userSelections[pair.attribute] = '';
		});
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
				console.error('Failed to mark section as completed:', error);
			}
		}
	});
</script>

<ModuleTask {...taskProps}>
	<div class="space-y-6">
		<section>
			<h3 class="mb-3 text-xl font-semibold">Element or Attribute?</h3>
			<p class="text-lg">
				Understanding which attributes belong to which HTML elements is crucial for writing correct
				HTML. In this quiz, match each attribute with the HTML element it's most commonly associated
				with.
			</p>
		</section>

		<div class="mb-4 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4">
			<p>
				Select the correct HTML element for each attribute. You need to match at least 70% correctly
				to complete this section.
			</p>
		</div>

		{#if showResults}
			<div class="mb-6 rounded-lg border bg-white p-6 shadow-sm">
				<h4 class="mb-2 text-lg font-semibold">Your Score: {score}/{attributePairs.length}</h4>
				<div class="h-4 w-full overflow-hidden rounded-full bg-gray-200">
					<div
						class="h-full rounded-full bg-indigo-600"
						style="width: {(score / attributePairs.length) * 100}%"
					></div>
				</div>
				{#if quizCompleted}
					<p class="mt-2 text-green-600">Great job! You've passed the quiz.</p>
				{:else}
					<p class="mt-2 text-amber-600">You need to match at least 70% correctly. Try again!</p>
				{/if}
			</div>
		{/if}

		<div class="space-y-6">
			{#each attributePairs as pair (pair.attribute)}
				<div class="rounded-lg border bg-white p-6 shadow-sm">
					<div class="mb-4">
						<h4 class="text-lg font-semibold">
							<code class="code">{pair.attribute}</code>
						</h4>
						<p class="mt-1 text-gray-600">{pair.description}</p>
					</div>

					<div>
						<p class="mb-2">This attribute belongs to which HTML element?</p>
						<div class="flex flex-wrap gap-2">
							{#each possibleElements as element (element)}
								<button
									class={`rounded-lg border px-3 py-1.5 transition-colors
										${userSelections[pair.attribute] === element ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
										${showResults && element === pair.correctElement ? 'border-green-500 bg-green-50 text-green-700' : ''}
										${showResults && userSelections[pair.attribute] === element && element !== pair.correctElement ? 'border-red-500 bg-red-50 text-red-700' : ''}
									`}
									onclick={() => !showResults && selectElement(pair.attribute, element)}
									disabled={showResults}
								>
									<code>&lt;{element}&gt;</code>
								</button>
							{/each}
						</div>
					</div>

					{#if showResults}
						<div class="mt-4">
							{#if userSelections[pair.attribute] === pair.correctElement}
								<p class="text-green-600">✓ Correct!</p>
							{:else if userSelections[pair.attribute]}
								<p class="text-red-600">
									✗ Incorrect. The attribute <code class="code">{pair.attribute}</code> belongs to
									<code>&lt;{pair.correctElement}&gt;</code>.
								</p>
							{:else}
								<p class="text-amber-600">⚠ You didn't select an answer for this question.</p>
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
						Congratulations! You've shown a good understanding of HTML attributes and elements.
					</p>
				{:else}
					<p class="text-lg font-medium text-amber-600">
						Keep learning about HTML attributes and try again!
					</p>
				{/if}
			{:else}
				<div></div>
				<button class="btn primary" onclick={checkAnswers}>Check Answers</button>
			{/if}
		</div>

		{#if showResults && quizCompleted}
			<div class="mt-6 rounded-lg bg-blue-50 p-6">
				<h4 class="font-semibold">Remember:</h4>
				<p class="mt-2">
					Different HTML elements support different attributes. Using the correct attributes with
					their corresponding elements is essential for creating valid and accessible web pages. The
					browser will ignore attributes that don't belong to an element, but your code won't work
					as expected.
				</p>
			</div>
		{/if}
	</div>
</ModuleTask>
