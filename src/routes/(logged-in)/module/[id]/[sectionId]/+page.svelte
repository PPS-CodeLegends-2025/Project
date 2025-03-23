<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { moduleWithSections } from '../../hardcoded';

	const moduleId = parseInt(page.params.id);
	const sectionId = page.params.sectionId;

	const modules = moduleWithSections;

	const module = modules.find((m) => m.id === moduleId);
	const sections = module?.sections || [];
	const currentSection = sections.find((s) => s.id === sectionId);

	const currentSectionIndex = sections.findIndex((s) => s.id === sectionId);
	const prevSection = currentSectionIndex > 0 ? sections[currentSectionIndex - 1] : null;
	const nextSection =
		currentSectionIndex < sections.length - 1 ? sections[currentSectionIndex + 1] : null;

	function goToModule() {
		goto(`/module/${moduleId}`);
	}

	function goToSection(sectionId: string) {
		goto(`/module/${moduleId}/${sectionId}`);
	}

	function markAsCompleted() {
		alert('Section marked as completed!');

		if (nextSection) {
			goToSection(nextSection.id);
		} else {
			goToModule();
		}
	}
</script>

{#key page.params.sectionId}
	<div class="container mx-auto p-6">
		<div class="mb-6 flex items-center justify-between">
			<button
				class="btn mb-4 flex flex-row gap-4 rounded-lg px-3 py-2 hover:bg-gray-100"
				onclick={goToModule}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="feather feather-arrow-left"
				>
					<line x1="19" y1="12" x2="5" y2="12"></line>
					<polyline points="12 19 5 12 12 5"></polyline>
				</svg>
				Back to Module
			</button>
			{#if module}
				<h3 class="text-lg font-medium text-gray-600">{module.title}</h3>
			{/if}
		</div>

		{#if module && currentSection}
			<div class="rounded-lg bg-white p-6 shadow">
				<h1 class="mb-2 text-2xl font-bold">{currentSection.title}</h1>

				<div class="mb-6 flex items-center justify-between">
					<div class="badge bg-indigo-100 text-indigo-800">
						Section {currentSectionIndex + 1} of {sections.length}
					</div>
					{#if currentSection.isCompleted}
						<div class="badge bg-green-100 text-green-800">Completed</div>
					{/if}
				</div>

				<div class="mb-8 max-w-none">
					<p>{currentSection.content}</p>

					<h2>Key Concepts</h2>
					<ul>
						<li>Important concept 1</li>
						<li>Important concept 2</li>
						<li>Important concept 3</li>
					</ul>

					<h2>Code Example</h2>
					<pre class="overflow-x-auto rounded-md bg-gray-100 p-4"><code class="font-mono"
							>function example() {`{\n\tconsole.log('This is an example')\n}`};</code
						></pre>

					<h2>Practice Exercise</h2>
					<p>Try implementing the concepts learned in this section with the following exercise:</p>
					<div class="rounded bg-gray-100 p-4">
						Exercise description goes here. This would typically involve a coding task or quiz
						related to the section content.
					</div>
				</div>

				<div class="mt-10 flex justify-between">
					<div>
						{#if prevSection}
							<a
								class="btn secondary flex flex-row items-center gap-2"
								href="/module/{moduleId}/{prevSection.id}"
								data-sveltekit-reload
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="mr-2"
								>
									<line x1="19" y1="12" x2="5" y2="12"></line>
									<polyline points="12 19 5 12 12 5"></polyline>
								</svg>
								Previous: {prevSection.title}
							</a>
						{/if}
					</div>

					<div class="flex gap-2">
						{#if !currentSection.isCompleted}
							<button class="btn primary" onclick={markAsCompleted}> Mark as Completed </button>
						{/if}

						{#if nextSection}
							<a
								class="btn primary flex flex-row items-center"
								href="/module/{moduleId}/{nextSection.id}"
								data-sveltekit-reload
							>
								Next: {nextSection.title}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="ml-2"
								>
									<line x1="5" y1="12" x2="19" y2="12"></line>
									<polyline points="12 5 19 12 12 19"></polyline>
								</svg>
							</a>
						{:else}
							<button class="btn primary" onclick={goToModule}> Complete Module </button>
						{/if}
					</div>
				</div>
			</div>
		{:else}
			<div class="rounded-lg bg-white py-12 text-center shadow">
				<h2 class="mb-4 text-2xl font-bold">Section Not Found</h2>
				<p>The section you're looking for doesn't exist.</p>
				<button class="btn primary mt-4" onclick={goToModule}>Return to Module</button>
			</div>
		{/if}
	</div>
{/key}
