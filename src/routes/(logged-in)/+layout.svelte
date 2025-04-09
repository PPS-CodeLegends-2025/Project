<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import type { LayoutProps } from './$types';
	import BadgeNotificationManager from '$lib/components/badges/BadgeNotificationManager.svelte';

	let { data, children }: LayoutProps = $props();
</script>

<div class="flex h-full flex-col">
	<Navbar admin={data.user.admin} />
	<main class="flex-1 overflow-y-auto">
		{@render children()}
	</main>
	{#if data?.user}
		<BadgeNotificationManager userId={data.user.id} />
	{/if}
</div>
