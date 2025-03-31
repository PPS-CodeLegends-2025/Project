<script lang="ts">
	import { codeRunner } from '$lib/client/codeRunner';
	import JsCodeEditor from '$lib/components/code/JsCodeEditor.svelte';

	let code = $state('\n'.repeat(15));
	let result = $state('');
	let consoleOutput = $state<{ level: string; message: string; time: number }[]>([]);

	async function runCode() {
		consoleOutput = [];
		result = '';
		try {
			const xResult = await codeRunner.runCode(code);
			const val = xResult.output;
			consoleOutput = xResult.console;
			result = val === undefined ? '' : String(val);
		} catch (e) {
			if (e instanceof Error) result = e.message;
			else result = String(e);
		}
	}
</script>

<div class="flex h-full min-h-[50rem] flex-col gap-8 p-8 md:min-h-auto">
	<div class="grid h-full grid-cols-1 gap-8 overflow-hidden md:grid-cols-2">
		<div class="flex min-h-64 flex-col gap-8 overflow-hidden">
			<div class="flex flex-1 flex-col overflow-hidden">
				<JsCodeEditor class="flex-1" bind:value={code} leaveWarning={true} />
			</div>
			<button class="btn primary" onclick={runCode}>Run</button>
		</div>
		<div class="flex min-h-64 flex-col gap-8">
			<h1 class="-mb-4 text-xl">Output:</h1>
			<pre class="box flex-1 overflow-auto">{result}</pre>
			<h1 class="-mb-4 text-xl">Console:</h1>
			<div class="box flex flex-1 flex-col gap-2 overflow-auto">
				{#each consoleOutput as { level, message, time } (time)}
					<div class="flex gap-2">
						<span>{new Date(time).toISOString()}</span>
						<span class="uppercase">[{level}]:</span>
						<span>{message}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
