<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ModuleMeta, SectionMeta } from '$lib/types/module';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';

	interface Props {
		section: SectionMeta;
		nextSection?: SectionMeta;
		prevSection?: SectionMeta;
		completed: boolean;
		module: ModuleMeta;
		currentSectionIndex: number;
		totalSections: number;
		completedNow?: boolean;
		onMarkAsCompleted: () => Promise<void> | void;
		children: Snippet;
	}

	let {
		section,
		nextSection,
		prevSection,
		completed,
		currentSectionIndex,
		totalSections,
		module,
		completedNow = false,
		onMarkAsCompleted,
		children
	}: Props = $props();

	let justCompleted = $state(false);

	onMount(() => {
		document.getElementById('section-content')?.scrollIntoView({ behavior: 'smooth' });
	});

	function goToModule() {
		goto(module.url, { replaceState: true, invalidateAll: true });
	}

	async function markAsCompleted() {
		try {
			await onMarkAsCompleted();
			justCompleted = true;

			if (nextSection) goto(nextSection.url, { replaceState: true, invalidateAll: true });
		} catch (error) {
			console.error('Failed to mark section as completed:', error);
			alert('Failed to mark section as completed. Please try again.');
		}
	}

	const isCompleted = $derived(completed || justCompleted || false);
</script>

<div class="container mx-auto p-6">
	<div class="mb-6 flex items-center justify-between">
		<a
			class="btn mb-4 flex flex-row gap-4 rounded-lg px-3 py-2 hover:bg-gray-100"
			href={module.url}
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
		</a>
		<h3 class="text-lg font-medium text-gray-600">{module.title}</h3>
	</div>

	<div class="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-6 shadow">
		<h1 class="text-2xl font-bold">{section.title}</h1>

		<div class="mb-4 flex items-center justify-between">
			<div class="badge bg-indigo-100 text-indigo-800">
				Section {currentSectionIndex + 1} of {totalSections || 1}
			</div>
			{#if isCompleted}
				<div class="badge bg-green-100 text-green-800">Completed</div>
			{/if}
		</div>

		<div id="section-content" class="mb-8 flex flex-col gap-4">
			{@render children()}
		</div>

		<div class="mt-10 flex justify-between">
			<div>
				{#if prevSection}
					<a class="btn secondary flex flex-row items-center gap-2" href={prevSection.url}>
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
				{#if nextSection}
					{#if isCompleted}
						<a class="btn primary flex flex-row items-center" href={nextSection.url}>
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
					{:else if completedNow}
						<button class="btn primary" onclick={markAsCompleted}> Complete & Continue </button>
					{:else}
						<button
							class="btn primary flex cursor-not-allowed flex-row items-center opacity-70"
							disabled
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
							<span class="ml-2">🔒</span>
						</button>
					{/if}
				{:else if !isCompleted}
					<button class="btn primary" onclick={markAsCompleted} disabled={!completedNow}>
						Complete Module
					</button>
				{:else if isCompleted}
					<button class="btn primary" onclick={goToModule}> Back to Module Overview </button>
				{/if}
			</div>
		</div>
	</div>
</div>
