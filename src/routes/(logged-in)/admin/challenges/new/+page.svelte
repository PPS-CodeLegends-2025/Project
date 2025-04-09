<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	let isGenerating = $state(false);
	let errorMessage = $state('');
	let currentStep = $state('input');

	let promptExample =
		'Create a beginner-friendly coding challenge about calculating Fibonacci numbers';
</script>

<svelte:head>
	<title>Create Challenge - Admin</title>
</svelte:head>

<div class="container mx-auto p-6">
	<div class="mb-6">
		<h1 class="mb-2 text-2xl font-bold">Create New Challenge</h1>
		<p class="text-gray-600">Use AI to generate a new coding challenge</p>
	</div>

	{#if form?.error}
		<div class="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700" role="alert">
			<p>{form.error}</p>
		</div>
	{/if}

	{#if errorMessage}
		<div class="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700" role="alert">
			<p>{errorMessage}</p>
		</div>
	{/if}

	{#if form?.success}
		<div
			class="mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
			role="alert"
		>
			<p>Challenge created successfully!</p>
			<a href="/admin/challenges" class="mt-2 inline-block text-green-700 underline">
				Return to Challenge Management
			</a>
		</div>
	{/if}

	<div class="relative mb-8 flex justify-between">
		<div class="absolute top-1/2 mx-4 h-0.5 w-[98%] -translate-y-4 bg-gray-200"></div>

		<div class="relative flex flex-col items-center">
			<div
				class={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${currentStep === 'input' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-800'}`}
			>
				1
			</div>
			<span class="mt-2 text-sm">Enter Details</span>
		</div>

		<div class="relative flex flex-col items-center">
			<div
				class={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${currentStep === 'preview' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-800'}`}
			>
				2
			</div>
			<span class="mt-2 text-sm">Preview Challenge</span>
		</div>

		<div class="relative flex flex-col items-center">
			<div
				class={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${currentStep === 'success' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-800'}`}
			>
				3
			</div>
			<span class="mt-2 text-sm">Complete</span>
		</div>
	</div>

	{#if currentStep === 'input'}
		<div class="mb-4 rounded border border-gray-200 bg-white px-8 pt-6 pb-8 shadow-md">
			<form
				method="POST"
				action="?/generateChallenge"
				use:enhance={() => {
					isGenerating = true;
					errorMessage = '';

					return async ({ result, update }) => {
						isGenerating = false;

						if (result.type === 'success') currentStep = 'preview';
						else if (result.type === 'failure')
							errorMessage = 'Failed to generate challenge. Please try again.';
						return await update();
					};
				}}
			>
				<div class="mb-6">
					<label class="mb-2 block text-sm font-bold text-gray-700" for="title">
						Challenge Title *
					</label>
					<input
						class="w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow"
						id="title"
						name="title"
						type="text"
						placeholder="Enter a title for your challenge"
						required
					/>
				</div>

				<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
					<div>
						<label class="mb-2 block text-sm font-bold text-gray-700" for="difficulty">
							Difficulty *
						</label>
						<select
							class="w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow"
							id="difficulty"
							name="difficulty"
							required
						>
							<option value="Easy">Easy</option>
							<option value="Medium" selected>Medium</option>
							<option value="Hard">Hard</option>
						</select>
					</div>

					<div>
						<label class="mb-2 block text-sm font-bold text-gray-700" for="category">
							Category *
						</label>
						<select
							class="w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow"
							id="category"
							name="category"
							required
						>
							<option value="Tutorial">Tutorial</option>
							<option value="Math">Math</option>
							<option value="Strings">Strings</option>
							<option value="Arrays">Arrays</option>
							<option value="Logic">Logic</option>
							<option value="Algorithms">Algorithms</option>
						</select>
					</div>

					<div>
						<label class="mb-2 block text-sm font-bold text-gray-700" for="xp"> XP Reward * </label>
						<input
							class="w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow"
							id="xp"
							name="xp"
							type="number"
							min="10"
							max="500"
							value="50"
							required
						/>
					</div>
				</div>

				<div class="mb-6">
					<label class="mb-2 block text-sm font-bold text-gray-700" for="timeEstimate">
						Time Estimate *
					</label>
					<input
						class="w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow"
						id="timeEstimate"
						name="timeEstimate"
						type="text"
						placeholder="e.g., 10 minutes"
						value="10 minutes"
						required
					/>
				</div>

				<div class="mb-6">
					<label class="mb-2 block text-sm font-bold text-gray-700" for="description">
						Challenge Description *
					</label>
					<textarea
						class="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
						id="description"
						name="description"
						rows="3"
						placeholder="Enter a brief description of what this challenge is about"
						required
					></textarea>
				</div>

				<div class="mb-6">
					<label class="mb-2 block text-sm font-bold text-gray-700" for="prompt">
						AI Generation Prompt *
					</label>
					<div class="mb-2 text-sm text-gray-600">
						Describe the challenge you want to generate. Be specific about requirements and
						difficulty level.
					</div>
					<textarea
						class="w-full appearance-none rounded border px-3 py-2 font-mono text-gray-700 shadow"
						id="prompt"
						name="prompt"
						rows="5"
						placeholder={promptExample}
						required
					></textarea>

					<div class="mt-2 text-sm text-gray-600">
						<p class="font-medium">Example prompts:</p>
						<ul class="list-inside list-disc">
							<li>Create a challenge to find the palindrome substring in a given string</li>
							<li>
								Generate an array manipulation challenge to find the sum of elements that appear
								exactly once
							</li>
							<li>Create a simple math challenge that involves calculating prime numbers</li>
						</ul>
					</div>
				</div>

				<div class="flex items-center justify-end">
					<button
						class="focus:shadow-outline flex items-center rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-700 focus:outline-none"
						type="submit"
						disabled={isGenerating}
					>
						{#if isGenerating}
							<svg
								class="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Generating...
						{:else}
							Generate Challenge
						{/if}
					</button>
				</div>
			</form>
		</div>
	{:else if currentStep === 'preview' && form}
		<div class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
			<h2 class="mb-4 text-xl font-bold">Challenge Preview</h2>

			<div class="mb-4 border-b pb-4">
				<h3 class="mb-2 text-lg font-semibold">Basic Information</h3>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<span class="block text-sm font-medium text-gray-700">Title:</span>
						<span class="block">{form?.generatedData?.challenge?.title}</span>
					</div>

					<div>
						<span class="block text-sm font-medium text-gray-700">Category:</span>
						<span class="block">{form?.generatedData?.challenge?.category}</span>
					</div>

					<div>
						<span class="block text-sm font-medium text-gray-700">Difficulty:</span>
						<span class="block">{form?.generatedData?.challenge?.difficulty}</span>
					</div>

					<div>
						<span class="block text-sm font-medium text-gray-700">XP Reward:</span>
						<span class="block">{form?.generatedData?.challenge?.xp}</span>
					</div>

					<div>
						<span class="block text-sm font-medium text-gray-700">Time Estimate:</span>
						<span class="block">{form?.generatedData?.challenge?.timeEstimate}</span>
					</div>
				</div>

				<div class="mt-4">
					<span class="block text-sm font-medium text-gray-700">Description:</span>
					<span class="block whitespace-pre-wrap"
						>{form?.generatedData?.challenge?.description}</span
					>
				</div>
			</div>

			<div class="mb-4 border-b pb-4">
				<h3 class="mb-2 text-lg font-semibold">Task Details</h3>

				<div>
					<span class="block text-sm font-medium text-gray-700">Task Name:</span>
					<span class="block">{form?.generatedData?.task?.name}</span>
				</div>

				<div class="mt-4">
					<span class="block text-sm font-medium text-gray-700">Task Description:</span>
					<span class="block whitespace-pre-wrap">{form?.generatedData?.task?.description}</span>
				</div>

				<div class="mt-4">
					<span class="block text-sm font-medium text-gray-700">Inputs:</span>
					<div class="mt-1 flex flex-wrap gap-2">
						{#each form?.generatedData?.task?.inputs || [] as input, i (i)}
							<span class="inline-block rounded bg-gray-100 px-2 py-1 text-sm">{input}</span>
						{/each}
					</div>
				</div>

				<div class="mt-4">
					<span class="block text-sm font-medium text-gray-700">Output:</span>
					<span class="mt-1 inline-block rounded bg-gray-100 px-2 py-1 text-sm"
						>{form?.generatedData?.task?.output?.type}</span
					>
				</div>
			</div>

			<div class="mb-4 border-b pb-4">
				<h3 class="mb-2 text-lg font-semibold">Test Cases</h3>

				<div class="overflow-x-auto">
					<table class="min-w-full divide-y divide-gray-200">
						<thead>
							<tr>
								<th
									class="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
									>Input</th
								>
								<th
									class="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
									>Expected Output</th
								>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200">
							{#each form?.generatedData?.task?.tests || [] as test, i (i)}
								<tr>
									<td class="px-4 py-2 font-mono text-sm">
										{JSON.stringify(test.input)}
									</td>
									<td class="px-4 py-2 font-mono text-sm">
										{JSON.stringify(test.output)}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>

			<div class="mb-4">
				<h3 class="mb-2 text-lg font-semibold">Example Code</h3>

				<div class="overflow-x-auto rounded bg-gray-50 p-4 font-mono text-sm">
					<pre>{form?.generatedData?.task?.exampleCode || 'No example code provided'}</pre>
				</div>
			</div>

			<div class="mt-6 flex items-center justify-between">
				<button
					class="focus:shadow-outline rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400 focus:outline-none"
					onclick={() => (currentStep = 'input')}
				>
					Go Back
				</button>

				<form
					method="POST"
					action="?/createChallenge"
					use:enhance={() => {
						return async ({ result }) => {
							if (result.type === 'success') {
								currentStep = 'success';
							}
						};
					}}
				>
					<input type="hidden" name="confirm" value="true" />
					<input type="hidden" name="challenge" value={JSON.stringify(form?.generatedData)} />
					<button
						class="focus:shadow-outline rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none"
						type="submit"
					>
						Create Challenge
					</button>
				</form>
			</div>
		</div>
	{:else if currentStep === 'success'}
		<div class="mb-4 rounded bg-white px-8 pt-6 pb-8 text-center shadow-md">
			<svg
				class="mx-auto mb-4 h-12 w-12 text-green-500"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
				></path>
			</svg>
			<h2 class="mb-4 text-2xl font-bold">Challenge Created Successfully!</h2>
			<p class="mb-6">Your AI-generated challenge has been added to the system.</p>

			<div class="flex justify-center gap-4">
				<a
					href="/admin/challenges"
					class="focus:shadow-outline rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-700 focus:outline-none"
				>
					Back to Challenges
				</a>
				<button
					class="focus:shadow-outline rounded bg-gray-200 px-4 py-2 font-bold text-gray-800 hover:bg-gray-300 focus:outline-none"
					onclick={() => {
						currentStep = 'input';
						window.scrollTo(0, 0);
					}}
				>
					Create Another
				</button>
			</div>
		</div>
	{/if}
</div>
