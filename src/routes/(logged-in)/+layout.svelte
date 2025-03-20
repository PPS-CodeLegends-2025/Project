<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<div class="flex h-full flex-col">
	<Navbar />
	<main class="flex-1 overflow-y-auto">
		{@render children()}
	</main>
</div>
