<script lang="ts">
	import type { Badge } from '$lib/client/services/badges';
	import { formatDistance } from 'date-fns';

	interface Props {
		badge: Badge;
		size?: 'sm' | 'md' | 'lg';
		showEarnedStatus?: boolean;
	}

	let { badge, size = 'md', showEarnedStatus = false }: Props = $props();

	const sizeClasses = {
		sm: 'w-12 h-12',
		md: 'w-16 h-16',
		lg: 'w-24 h-24'
	};

	const tooltipId = `badge-tooltip-${badge.id}`;

	function getTimeAgo(date: Date | null | undefined) {
		if (!date) return '';

		if (!formatDistance) {
			return new Date(date).toLocaleDateString();
		}

		return formatDistance(date, new Date(), { addSuffix: true });
	}

	function isImageUrl(icon: string): boolean {
		return icon.startsWith('/') || icon.startsWith('http');
	}

	function getSvgFallback(badge: Badge): string {
		return badge.name ? badge.name.charAt(0).toUpperCase() : '★';
	}
</script>

<div class="badge-container relative" data-tooltip-target={tooltipId}>
	<div
		class={`badge-icon ${sizeClasses[size]} flex items-center justify-center rounded-full 
    ${badge.earned ? 'bg-indigo-100' : 'bg-gray-100'} 
    ${badge.earned ? 'text-indigo-600' : 'text-gray-400'} overflow-hidden`}
	>
		{#if isImageUrl(badge.icon)}
			<img src={badge.icon} alt={badge.name} class="h-full w-full object-cover" />
		{:else if badge.icon.startsWith('<svg')}
			<span class="text-2xl">{getSvgFallback(badge)}</span>
		{:else}
			<span class="text-2xl">{badge.icon}</span>
		{/if}
	</div>

	{#if badge.earned && !badge.viewed}
		<span class="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500"></span>
	{/if}

	{#if showEarnedStatus && badge.earned}
		<span
			class="badge-earned-status absolute -bottom-1 left-1/2 -translate-x-1/2 transform rounded-full bg-green-500 px-2 py-0.5 text-xs text-white"
			>Earned</span
		>
	{/if}

	<!-- Tooltip -->
	<div
		id={tooltipId}
		role="tooltip"
		class="badge-tooltip pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm"
	>
		<div class="font-bold">{badge.name}</div>
		<p class="text-xs">{badge.description}</p>
		{#if badge.earned && badge.earnedAt}
			<p class="mt-1 text-xs text-indigo-200">Earned {getTimeAgo(badge.earnedAt)}</p>
		{/if}
		<div class="tooltip-arrow" data-popper-arrow></div>
	</div>
</div>

<style>
	.badge-container:hover .badge-tooltip {
		opacity: 1;
		pointer-events: auto;
	}

	.badge-tooltip {
		transition: opacity 0.3s;
		width: max-content;
		max-width: 200px;
		bottom: 100%;
		left: 50%;
		margin-bottom: 0.5rem;
	}

	.badge-icon {
		transition:
			transform 0.3s,
			box-shadow 0.3s;
	}

	.badge-container:hover .badge-icon {
		transform: scale(1.05);
		box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
	}
</style>
