<script lang="ts">
	import type { Snippet } from 'svelte';
	import JsCodeEditor from './JsCodeEditor.svelte';
	import { codeRunner } from '$lib/client/codeRunner';

	interface Props {
		title: string;
		descriptionFragment: Snippet;
		errorFragment?: Snippet<[string]>;
		successFragment?: Snippet<[string]>;
		initialCode?: string;
		onSubmit?: (code: string) =>
			| Promise<{
					success: boolean;
					message: string;
			  }>
			| { success: boolean; message: string };
	}

	let {
		title,
		descriptionFragment: description,
		initialCode = '',
		onSubmit,
		errorFragment,
		successFragment
	}: Props = $props();
	let code = $state(initialCode);
	let submissionResult: null | { success: boolean; message: string } = $state(null);

	let runResults: {
		output: unknown;
		console: { level: string; message: string; time: number }[];
	} | null = $state(null);

	async function runCode() {
		try {
			const res = await codeRunner.runCode(code);
			runResults = res;
		} catch (e) {
			runResults = { output: e, console: [] };
		}
	}

	async function submitCode() {
		if (!onSubmit) return;

		submissionResult = null;

		const res = await onSubmit(code);

		submissionResult = res;
		const success = res.success ? 'Task completed successfully' : 'Task failed';
		alert(`${success}: ${res.message}`);
	}
</script>

<div class="grid h-full w-full grid-cols-2 gap-8">
	<div class="flex flex-col gap-4">
		<h1 class="text-2xl font-semibold">{title}</h1>
		<div>{@render description()}</div>
		<div class="flex-1"></div>
		{#if successFragment && submissionResult?.success === true}
			<div>{@render successFragment(submissionResult.message)}</div>
		{:else if errorFragment && submissionResult?.success === false}
			<div>{@render errorFragment(submissionResult.message)}</div>
		{/if}
	</div>
	<div class="flex flex-col gap-2">
		<JsCodeEditor class="flex-1" bind:value={code} />
		<button class="btn primary" onclick={runCode}>Run</button>
		{#if runResults !== null}
			<div class="box flex flex-col gap-2 overflow-auto">
				<p>Output: {runResults.output}</p>
				<div class="h-0 w-full border border-b border-gray-300"></div>
				<h1>Console:</h1>
				{#each runResults.console as log (log.time)}
					<p>
						{new Date(log.time).toISOString()} [{log.level.toUpperCase()}]: {log.message}
					</p>
				{/each}
			</div>
		{/if}
		<button class="btn primary" onclick={submitCode}>Submit</button>
	</div>
</div>
