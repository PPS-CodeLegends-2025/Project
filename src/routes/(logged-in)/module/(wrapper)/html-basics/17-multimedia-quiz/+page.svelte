<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Multimedia Magic!'
	};

	let { data }: PageProps = $props();

	const sectionIndex = data.section.index;
	const userId = data.user.id;
	const moduleId = data.module.data.url;

	const questions = [
		{
			question: 'Which HTML attribute is required for the <img> tag?',
			options: ['width and height', 'src', 'alt', 'Both src and alt are required'],
			correctAnswer: 3,
			explanation:
				'Both the src attribute (specifying the image source) and alt attribute (providing alternative text for accessibility) are required for proper and accessible <img> elements.'
		},
		{
			question: 'What is the purpose of the loading="lazy" attribute on images?',
			options: [
				'It makes images load with animation effects',
				'It delays loading until the user scrolls near the image',
				'It ensures images load faster regardless of position',
				'It prevents images from loading on mobile devices'
			],
			correctAnswer: 1,
			explanation:
				'The loading="lazy" attribute tells browsers to defer loading images until they are about to come into the viewport, improving initial page load performance.'
		},
		{
			question: 'Which HTML5 element should you use to embed audio content?',
			options: ['<sound>', '<media type="audio">', '<audio>', '<mp3>'],
			correctAnswer: 2,
			explanation:
				'The <audio> element is the correct HTML5 element for embedding audio content like MP3 files or audio streams.'
		},
		{
			question: 'What is the best way to make a video accessible for users who cannot see it?',
			options: [
				'Use the alt attribute on the video element',
				'Provide captions and a text transcript',
				"Make the video autoplay so users don't need to find the play button",
				'Use bright colors in the video content'
			],
			correctAnswer: 1,
			explanation:
				'Providing captions (for those who cannot hear) and text transcripts (for those who cannot see or hear) is the best practice for making video content accessible.'
		},
		{
			question:
				'When using an <iframe> to embed content, what security attribute should you consider adding?',
			options: ['secure="true"', 'sandbox', 'protected', 'noembedded'],
			correctAnswer: 1,
			explanation:
				'The sandbox attribute restricts the actions the embedded content can perform, enhancing security when embedding third-party content.'
		},
		{
			question: 'Which attribute of the <video> element makes video controls visible to users?',
			options: ['visible', 'show-controls', 'controls', 'player'],
			correctAnswer: 2,
			explanation:
				"The controls attribute adds the browser's native video controls (play/pause, volume, fullscreen) to the video element."
		},
		{
			question:
				'What is the primary advantage of using the <picture> element over a simple <img> element?',
			options: [
				'It automatically enhances image quality',
				"It supports animated images while <img> doesn't",
				'It allows different images to be displayed based on device conditions',
				'It loads images faster in all browsers'
			],
			correctAnswer: 2,
			explanation:
				'The <picture> element allows developers to provide different image sources for different viewport sizes, pixel densities, or other conditions, enabling responsive images.'
		},
		{
			question: 'What is considered a best practice for video autoplay?',
			options: [
				'Always enable autoplay to improve user experience',
				'Only autoplay videos with sound to grab user attention',
				'Avoid autoplay for videos with sound unless user-initiated',
				'Set videos to autoplay at maximum volume'
			],
			correctAnswer: 2,
			explanation:
				'Autoplaying videos with sound can be disruptive and problematic for users. You should avoid autoplay with sound unless specifically requested by the user.'
		},
		{
			question: 'Which attribute can make embedded media more accessible to screen reader users?',
			options: ['aria-label', 'screen-reader', 'alt-text', 'accessible'],
			correctAnswer: 0,
			explanation:
				'The aria-label attribute can provide descriptive text about media elements that will be read by screen readers, improving accessibility.'
		},
		{
			question: 'What is the recommended way to embed YouTube videos in HTML?',
			options: [
				'Using the <youtube> tag',
				'Using the <video> tag with a YouTube URL',
				'Using an <iframe> with the YouTube embed URL',
				'Using the <embed> tag'
			],
			correctAnswer: 2,
			explanation:
				'The recommended and official way to embed YouTube videos is using an <iframe> with the embed URL provided by YouTube in their share options.'
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
			<h3 class="mb-3 text-xl font-semibold">Multimedia Magic!</h3>
			<p class="text-lg">
				Test your knowledge of HTML multimedia elements and best practices for embedding images,
				audio, video, and other media content.
			</p>
		</section>

		<div class="mb-4 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4">
			<p>
				Rich media content makes websites more engaging and interactive. This quiz tests your
				understanding of the proper ways to embed and optimize multimedia in your HTML pages. You
				need at least 70% correct answers to complete this section.
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
						Great job! You've demonstrated good knowledge of HTML multimedia elements.
					</p>
				{:else}
					<p class="mt-2 text-amber-600">
						You need a score of at least 70% to pass. Review HTML multimedia topics and try again!
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
						Congratulations! You've shown a good understanding of HTML multimedia elements.
					</p>
				{:else}
					<p class="text-lg font-medium text-amber-600">
						Keep learning about HTML multimedia and try again!
					</p>
				{/if}
			{:else}
				<div></div>
				<button class="btn primary" onclick={checkAnswers}>Check Answers</button>
			{/if}
		</div>

		{#if showResults && quizCompleted}
			<div class="mt-6 rounded-lg bg-blue-50 p-6">
				<h4 class="font-semibold">Pro Tips for Working with Multimedia:</h4>
				<ul class="mt-2 list-disc space-y-2 pl-6">
					<li>
						Always optimize images before uploading them to your website to improve loading times
					</li>
					<li>
						Use responsive techniques like srcset and the picture element for images that adapt to
						different devices
					</li>
					<li>Include transcripts or captions with audio and video content for accessibility</li>
					<li>Consider bandwidth consumption for users when embedding multiple media files</li>
					<li>Be cautious with autoplay features, especially for content with sound</li>
					<li>
						Use appropriate fallbacks for browsers that don't support certain multimedia formats
					</li>
				</ul>
			</div>
		{/if}
	</div>
</ModuleTask>
