<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';
	import JsCodeEditor from '$lib/components/code/JsCodeEditor.svelte';
	import HtmlPreview from '$lib/components/code/HtmlPreview.svelte';

	const sectionData: Section = {
		title: 'Fix My Form!'
	};

	let { data }: PageProps = $props();

	const sectionIndex = data.section.index;
	const userId = data.user.id;
	const moduleId = data.module.data.url;

	const formChallenges = [
		{
			id: 1,
			title: 'Missing Label Connection',
			description: "This form has a label that isn't properly connected to its input. Fix it.",
			brokenCode: `<form>
  <label>Email Address</label>
  <input type="email" id="email" name="email" required>
  <button type="submit">Subscribe</button>
</form>`,
			solution: `<form>
  <label for="email">Email Address</label>
  <input type="email" id="email" name="email" required>
  <button type="submit">Subscribe</button>
</form>`,
			hint: "Labels should be connected to their inputs using the 'for' attribute, which matches the input's 'id'."
		},
		{
			id: 2,
			title: 'Mismatched ID and Label',
			description:
				"The label's 'for' attribute doesn't match the input's 'id'. Fix this connection.",
			brokenCode: `<form>
  <label for="user-name">Full Name:</label>
  <input type="text" id="fullname" name="fullname">
</form>`,
			solution: `<form>
  <label for="fullname">Full Name:</label>
  <input type="text" id="fullname" name="fullname">
</form>`,
			hint: "Make sure the value of the label's 'for' attribute exactly matches the input's 'id' attribute."
		},
		{
			id: 3,
			title: 'Missing Name Attribute',
			description:
				"This input will not be submitted with the form because it's missing something important.",
			brokenCode: `<form action="/submit" method="post">
  <label for="comment">Your Comment:</label>
  <textarea id="comment" rows="4" cols="50"></textarea>
  <button type="submit">Submit Comment</button>
</form>`,
			solution: `<form action="/submit" method="post">
  <label for="comment">Your Comment:</label>
  <textarea id="comment" name="comment" rows="4" cols="50"></textarea>
  <button type="submit">Submit Comment</button>
</form>`,
			hint: "For form data to be submitted, each input needs a 'name' attribute that will become the variable name in the submitted data."
		},
		{
			id: 4,
			title: 'Wrong Input Type',
			description: "This form asks for an email but doesn't use the most appropriate input type.",
			brokenCode: `<form>
  <label for="user-email">Email Address:</label>
  <input type="text" id="user-email" name="user-email">
  <button type="submit">Register</button>
</form>`,
			solution: `<form>
  <label for="user-email">Email Address:</label>
  <input type="email" id="user-email" name="user-email">
  <button type="submit">Register</button>
</form>`,
			hint: 'HTML5 provides specific input types for different kinds of data, which add built-in validation and provide appropriate keyboards on mobile devices.'
		},
		{
			id: 5,
			title: 'Radio Button Group Error',
			description:
				"These radio buttons don't work as a group. Only one should be selectable at a time.",
			brokenCode: `<form>
  <p>Select your subscription plan:</p>
  <input type="radio" id="basic" name="basic-plan" value="basic">
  <label for="basic">Basic</label><br>
  <input type="radio" id="premium" name="premium-plan" value="premium">
  <label for="premium">Premium</label><br>
  <input type="radio" id="ultimate" name="ultimate-plan" value="ultimate">
  <label for="ultimate">Ultimate</label>
</form>`,
			solution: `<form>
  <p>Select your subscription plan:</p>
  <input type="radio" id="basic" name="plan" value="basic">
  <label for="basic">Basic</label><br>
  <input type="radio" id="premium" name="plan" value="premium">
  <label for="premium">Premium</label><br>
  <input type="radio" id="ultimate" name="plan" value="ultimate">
  <label for="ultimate">Ultimate</label>
</form>`,
			hint: "Radio buttons work as a group when they share the same 'name' attribute. Each should have a unique 'id' and 'value'."
		},
		{
			id: 6,
			title: 'Self-Closing Textarea Error',
			description: "This comment form isn't working correctly. Find and fix the error.",
			brokenCode: `<form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name"><br>
  <label for="comment">Comment:</label>
  <textarea id="comment" name="comment" />
  <button type="submit">Post Comment</button>
</form>`,
			solution: `<form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name"><br>
  <label for="comment">Comment:</label>
  <textarea id="comment" name="comment"></textarea>
  <button type="submit">Post Comment</button>
</form>`,
			hint: 'Unlike input elements, textarea is not a self-closing element. It requires both opening and closing tags.'
		}
	];

	let currentChallengeIndex = $state(0);
	let userCode = $state(formChallenges[0].brokenCode);
	let submissionResult = $state<{ success: boolean; message: string } | null>(null);
	let completedChallenges = $state<number[]>([]);
	let showHint = $state(false);
	let quizCompleted = $state(false);

	function nextChallenge() {
		if (currentChallengeIndex < formChallenges.length - 1) {
			currentChallengeIndex++;
			userCode = formChallenges[currentChallengeIndex].brokenCode;
			submissionResult = null;
			showHint = false;
		}
	}

	function previousChallenge() {
		if (currentChallengeIndex > 0) {
			currentChallengeIndex--;
			userCode = formChallenges[currentChallengeIndex].brokenCode;
			submissionResult = null;
			showHint = false;
		}
	}

	function checkCurrentChallenge() {
		const currentChallenge = formChallenges[currentChallengeIndex];

		// Compare with solution, normalizing whitespace for flexibility
		const normalizedUserCode = userCode.replace(/\s+/g, ' ').trim();
		const normalizedSolution = currentChallenge.solution.replace(/\s+/g, ' ').trim();

		// Also check if the fix addresses the specific issue, even if not exactly matching the solution
		let fixApplied = false;

		if (currentChallengeIndex === 0) {
			// Check if label has for attribute
			fixApplied = /label\s+for=["']email["']/i.test(userCode);
		} else if (currentChallengeIndex === 1) {
			// Check if for attribute matches id
			fixApplied = /label\s+for=["']fullname["']/i.test(userCode);
		} else if (currentChallengeIndex === 2) {
			// Check if textarea has name attribute
			fixApplied = /textarea\s+.*?name=["']comment["']/i.test(userCode);
		} else if (currentChallengeIndex === 3) {
			// Check if input type is email
			fixApplied = /input\s+.*?type=["']email["']/i.test(userCode);
		} else if (currentChallengeIndex === 4) {
			// Check if radio buttons have same name
			const nameMatches = userCode.match(/name=["']([^"']+)["']/g);
			if (nameMatches && nameMatches.length >= 3) {
				const allSameName = nameMatches.every((n) => n === nameMatches[0]);
				fixApplied = allSameName;
			}
		} else if (currentChallengeIndex === 5) {
			// Check if textarea has closing tag
			fixApplied = /<textarea[^>]*>[^<]*<\/textarea>/i.test(userCode);
		}

		if (normalizedUserCode === normalizedSolution || fixApplied) {
			submissionResult = {
				success: true,
				message: 'Great job! You fixed the form issue correctly.'
			};

			if (!completedChallenges.includes(currentChallenge.id)) {
				completedChallenges = [...completedChallenges, currentChallenge.id];
			}

			if (completedChallenges.length === formChallenges.length) {
				quizCompleted = true;
			}
		} else {
			submissionResult = {
				success: false,
				message: "That's not quite right. Try again or check the hint."
			};
		}
	}

	function resetChallenge() {
		userCode = formChallenges[currentChallengeIndex].brokenCode;
		submissionResult = null;
	}

	function toggleHint() {
		showHint = !showHint;
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
			<h3 class="mb-3 text-xl font-semibold">Fix My Form!</h3>
			<p class="text-lg">
				Even experienced developers make mistakes when coding HTML forms. In this quiz, you'll find
				and fix common form errors - a crucial skill for creating functional and accessible web
				forms.
			</p>
		</section>

		<div class="mb-4 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4">
			<p>
				Each challenge presents a form with an error. Edit the HTML to fix the issue, then click
				"Check Solution" to verify your fix. Complete all challenges to pass the quiz.
			</p>
		</div>

		<div class="progress-bar mb-6">
			<div class="mb-1 flex justify-between text-sm">
				<span>Challenge {currentChallengeIndex + 1} of {formChallenges.length}</span>
				<span>{completedChallenges.length} completed</span>
			</div>
			<div class="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
				<div
					class="h-full rounded-full bg-indigo-600"
					style="width: {(completedChallenges.length / formChallenges.length) * 100}%"
				></div>
			</div>
		</div>

		<div class="rounded-lg border bg-white p-6 shadow-sm">
			<h4 class="mb-3 text-lg font-semibold">
				Challenge: {formChallenges[currentChallengeIndex].title}
			</h4>
			<p class="mb-4">
				{formChallenges[currentChallengeIndex].description}
			</p>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div class="code-container">
					<h5 class="mb-2 font-medium">Edit the HTML:</h5>
					{#key currentChallengeIndex}
						<JsCodeEditor bind:value={userCode} />
					{/key}
				</div>
				<div class="preview-container">
					<h5 class="mb-2 font-medium">Preview:</h5>
					{#key currentChallengeIndex}
						<HtmlPreview htmlCode={userCode} height="200px" />
					{/key}
				</div>
			</div>

			{#if showHint}
				<div class="mt-4 border-l-4 border-amber-500 bg-amber-50 p-3 pl-4">
					<p class="font-medium">Hint:</p>
					<p>{formChallenges[currentChallengeIndex].hint}</p>
				</div>
			{/if}

			{#if submissionResult}
				<div
					class={`mt-4 border-l-4 p-3 pl-4 ${
						submissionResult.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
					}`}
				>
					<p class={submissionResult.success ? 'text-green-700' : 'text-red-700'}>
						{submissionResult.message}
					</p>
				</div>
			{/if}

			<div class="mt-6 flex items-center justify-between">
				<div class="space-x-2">
					<button
						class="btn secondary"
						onclick={resetChallenge}
						disabled={userCode === formChallenges[currentChallengeIndex].brokenCode}
					>
						Reset
					</button>
					<button class="btn secondary" onclick={toggleHint}>
						{showHint ? 'Hide Hint' : 'Show Hint'}
					</button>
				</div>
				<button class="btn primary" onclick={checkCurrentChallenge}>Check Solution</button>
			</div>
		</div>

		<div class="mt-4 flex justify-between">
			<button
				class="btn secondary"
				onclick={previousChallenge}
				disabled={currentChallengeIndex === 0}
			>
				Previous Challenge
			</button>
			<button
				class="btn primary"
				onclick={nextChallenge}
				disabled={currentChallengeIndex === formChallenges.length - 1 ||
					!completedChallenges.includes(formChallenges[currentChallengeIndex].id)}
			>
				Next Challenge
			</button>
		</div>

		{#if quizCompleted}
			<div class="mt-6 rounded-lg border border-green-200 bg-green-50 p-6">
				<h4 class="font-semibold text-green-700">Congratulations!</h4>
				<p class="mt-2">
					You've successfully completed all the form debugging challenges. You've demonstrated a
					solid understanding of HTML forms and common issues that can occur when creating them.
				</p>
				<p class="mt-2">
					Remember these fixes as you build your own forms in the future. Well-structured forms are
					crucial for collecting user input correctly and providing a good experience for all users.
				</p>
			</div>
		{/if}

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Common Form Errors to Watch For</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Accessibility Issues</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Missing or incorrect label associations</li>
						<li>Missing form control names</li>
						<li>No indication of required fields</li>
						<li>Poor keyboard navigation support</li>
						<li>Missing form validation feedback</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Functional Issues</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Incorrect input types for data</li>
						<li>Broken radio button groups</li>
						<li>Improperly closed elements</li>
						<li>Missing form action or method</li>
						<li>Inputs outside of form elements</li>
					</ul>
				</div>
			</div>
		</section>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Additional Resources</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Form Validation</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN: Client-side form validation</a
							>
						</li>
						<li>
							<a
								href="https://web.dev/learn/forms/"
								target="_blank"
								class="text-indigo-600 hover:underline">Web.dev: Learn Forms</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Accessibility</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://www.w3.org/WAI/tutorials/forms/"
								target="_blank"
								class="text-indigo-600 hover:underline">W3C: Accessible Forms</a
							>
						</li>
						<li>
							<a
								href="https://webaim.org/techniques/forms/"
								target="_blank"
								class="text-indigo-600 hover:underline">WebAIM: Creating Accessible Forms</a
							>
						</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</ModuleTask>

<style>
	.code-container {
		height: 250px;
		display: flex;
		flex-direction: column;
	}

	.preview-container {
		display: flex;
		flex-direction: column;
	}

	:global(.code-container .js-editor) {
		flex-grow: 1;
		min-height: 0;
	}
</style>
