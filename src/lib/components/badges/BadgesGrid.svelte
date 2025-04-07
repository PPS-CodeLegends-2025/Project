<script lang="ts">
	import type { Badge } from '$lib/client/services/badges';
	import BadgeDisplay from './BadgeDisplay.svelte';

	interface Props {
		badges: Badge[];
		showEarnedStatus?: boolean;
		size?: 'sm' | 'md' | 'lg';
		columns?: number;
		showEmpty?: boolean;
		title?: string;
	}

	let {
		badges = [],
		showEarnedStatus = false,
		size = 'md',
		columns = 4,
		showEmpty = true,
		title
	}: Props = $props();

	let layoutClass = $derived(`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-${columns}`);
</script>

{#if title}
	<h3 class="mb-3 text-lg font-semibold">{title}</h3>
{/if}

{#if badges.length > 0}
	<div class={layoutClass}>
		{#each badges as badge (badge.id)}
			<div class="flex items-center rounded-lg bg-gray-50 px-3 py-2 shadow-sm">
				<BadgeDisplay {badge} {size} {showEarnedStatus} />
				<span class="ml-3 text-sm">{badge.name}</span>
			</div>
		{/each}
	</div>
{:else if showEmpty}
	<div class="rounded-lg bg-gray-50 p-4 text-center text-gray-500">
		No badges in this category yet.
	</div>
{/if}
