<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'SEO Pro!'
	};

	let { data }: PageProps = $props();

	const sectionIndex = data.section.index;
	const userId = data.user.id;
	const moduleId = data.module.data.url;

	const questions = [
		{
			question: 'Which HTML element is most important for SEO page ranking?',
			options: ['<div>', '<h1>', '<span>', '<strong>'],
			correctAnswer: 1,
			explanation:
				'The <h1> tag defines the main heading of a page and tells search engines what your content is primarily about. Each page should have exactly one meaningful <h1> tag containing your primary keyword.'
		},
		{
			question: 'What is the most SEO-effective way to handle images?',
			options: [
				'Use many small images to improve page loading',
				'Provide descriptive alt text for all meaningful images',
				'Avoid images completely and use CSS for visual elements',
				'Always use .PNG format for better indexing'
			],
			correctAnswer: 1,
			explanation:
				"Descriptive alt text helps search engines understand image content, improves accessibility, and provides context when images fail to load. It's one of the most important image-related SEO factors."
		},
		{
			question: 'Which meta tag is most critical for SEO?',
			options: [
				'<meta name="keywords" content="...">',
				'<meta name="author" content="...">',
				'<meta name="description" content="...">',
				'<meta name="robots" content="...">'
			],
			correctAnswer: 2,
			explanation:
				'The meta description provides a summary of your page content and appears in search results. While not directly affecting rankings, it dramatically influences click-through rates, which do affect SEO performance.'
		},
		{
			question: 'How should heading tags be used for optimal SEO?',
			options: [
				'Use multiple <h1> tags to emphasize all important keywords',
				'Make all important text <h2> or <h3> for better visibility',
				'Use headings in sequential order (h1, then h2, etc.) creating a logical hierarchy',
				'Avoid headings entirely as they make content too structured'
			],
			correctAnswer: 2,
			explanation:
				'Headings should create a logical hierarchical structure that reflects content organization. This helps search engines understand content relationships and importance. Skipping heading levels confuses search engines and screen readers.'
		},
		{
			question:
				'Which HTML attribute helps search engines understand the relationship between linked pages?',
			options: ['href', 'target', 'rel', 'class'],
			correctAnswer: 2,
			explanation:
				'The rel attribute defines the relationship between the current page and the linked page. Values like "nofollow", "sponsored", "ugc", or "canonical" provide search engines with context about how to interpret and value links.'
		},
		{
			question: 'When creating URLs for SEO, which practice is best?',
			options: [
				'Use long descriptive URLs with many keywords',
				'Include dates and version numbers for freshness signals',
				'Use short, descriptive URLs with hyphens between words',
				'Use underscores to separate words in URLs'
			],
			correctAnswer: 2,
			explanation:
				'Short, readable URLs with hyphens separating words are preferred by search engines. Hyphens are recognized as word separators, unlike underscores, and concise URLs are more user-friendly and shareable.'
		},
		{
			question:
				'Which HTML element helps define the primary content of your page for search engines?',
			options: ['<div id="content">', '<span class="main">', '<main>', '<body>'],
			correctAnswer: 2,
			explanation:
				'The <main> element semantically identifies the primary content of the page, helping search engines distinguish it from navigation, footers, and sidebars. This improves content prioritization and indexing.'
		},
		{
			question: 'Which of these is NOT an effective SEO practice?',
			options: [
				'Using structured data markup (Schema.org)',
				'Creating a sitemap.xml file',
				'Stuffing keywords into hidden <div> elements',
				'Ensuring mobile-responsive design'
			],
			correctAnswer: 2,
			explanation:
				'Keyword stuffing in hidden elements violates search engine guidelines and can result in penalties. Modern SEO focuses on providing valuable, relevant content in a user-friendly format rather than manipulative techniques.'
		},
		{
			question: "What's the best way to handle page titles for SEO?",
			options: [
				'Include as many keywords as possible in the title',
				'Make unique, descriptive titles with the main keyword near the beginning',
				'Use the same title for all pages to build brand recognition',
				"Titles don't matter much for SEO compared to other elements"
			],
			correctAnswer: 1,
			explanation:
				'Unique, descriptive titles with the main keyword positioned near the beginning perform best for SEO. The title tag is one of the strongest on-page ranking factors and significantly influences click-through rates.'
		},
		{
			question: 'Which HTML element best supports local SEO efforts?',
			options: ['<address>', '<location>', '<map>', '<gps>'],
			correctAnswer: 0,
			explanation:
				'The <address> element semantically identifies contact information, which can be particularly valuable for local SEO. When combined with Schema markup, it helps search engines connect physical locations to websites.'
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
			<h3 class="mb-3 text-xl font-semibold">SEO Pro!</h3>
			<p class="text-lg">
				Test your knowledge of how HTML elements and structure affect Search Engine Optimization
				(SEO). Understanding these principles will help you build websites that rank higher in
				search results.
			</p>
		</section>

		<div class="mb-4 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4">
			<p>
				Select the best answer for each question. You'll need to score at least 70% to pass this
				quiz. Each question explores how different HTML practices can impact your site's search
				engine visibility.
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
						Great job! You've demonstrated a solid understanding of SEO principles in HTML.
					</p>
				{:else}
					<p class="mt-2 text-amber-600">
						You need a score of at least 70% to pass. Review the SEO section and try again!
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
								<p class="mt-1 text-gray-700">{question.explanation}</p>
							{:else if selectedAnswers[questionIndex] !== undefined}
								<p class="text-red-600">
									✗ Incorrect. The correct answer is: {question.options[question.correctAnswer]}
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
						Well done! You've mastered the basics of HTML SEO techniques.
					</p>
				{:else}
					<p class="text-lg font-medium text-amber-600">
						Keep learning about SEO best practices and try again!
					</p>
				{/if}
			{:else}
				<div></div>
				<button class="btn primary" onclick={checkAnswers}>Check Answers</button>
			{/if}
		</div>

		{#if showResults && quizCompleted}
			<div class="mt-6 rounded-lg bg-blue-50 p-6">
				<h4 class="font-semibold">SEO Best Practices</h4>
				<p class="mt-2">
					Remember that good SEO starts with quality HTML: proper semantic structure, descriptive
					metadata, optimized images, and clear content hierarchy. While there are many technical
					aspects to SEO, the foundation is always well-structured, accessible HTML that clearly
					communicates your content's purpose and value.
				</p>
				<p class="mt-2">Consider these points when optimizing your HTML for search engines:</p>
				<ul class="mt-3 list-disc space-y-2 pl-6">
					<li>Search engines prioritize content that's valuable to users</li>
					<li>
						Accessibility and SEO go hand-in-hand - what's good for users is good for search engines
					</li>
					<li>Page load speed is a ranking factor, so keep your HTML lean and efficient</li>
					<li>Mobile-friendly pages rank higher in mobile search results</li>
					<li>Structured data helps search engines understand complex content relationships</li>
				</ul>
			</div>
		{/if}
	</div>
</ModuleTask>
