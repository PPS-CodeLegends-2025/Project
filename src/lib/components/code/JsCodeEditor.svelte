<script lang="ts">
	import { browser } from '$app/environment';

	interface Props {
		class?: string;
		value?: string;
		leaveWarning?: boolean;
	}

	let { class: className, value = $bindable(''), leaveWarning }: Props = $props();
</script>

{#if browser}
	{#await import('./internal/_JsCodeEditorBundle.svelte').then((x) => x.default) then Editor}
		<Editor class={className} bind:value {leaveWarning} />
	{/await}
{/if}
