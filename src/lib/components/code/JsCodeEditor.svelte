<script lang="ts">
	import { browser } from '$app/environment';

	interface Props {
		class?: string;
		value?: string;
		leaveWarning?: boolean;
		language?: string;
	}

	let {
		class: className,
		value = $bindable(''),
		leaveWarning,
		language = 'javascript'
	}: Props = $props();
</script>

{#if browser}
	{#await import('./internal/_JsCodeEditorBundle.svelte').then((x) => x.default) then Editor}
		<Editor class={className} bind:value {leaveWarning} {language} />
	{/await}
{/if}
