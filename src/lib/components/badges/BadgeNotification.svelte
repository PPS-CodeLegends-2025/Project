<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Badge } from '$lib/client/services/badges';

	interface Props {
		badge: Badge;
		userId: string;
		onClose: () => void;
	}

	let { badge, onClose }: Props = $props();

	async function markAsViewed() {
		onClose();
	}

	function isImageUrl(icon: string): boolean {
		return icon.startsWith('/') || icon.startsWith('http');
	}
</script>

<div
	class="badge-notification fixed right-4 bottom-4 z-50 w-72 rounded-lg border border-indigo-200 bg-white p-4 shadow-lg"
	transition:fly={{ y: 20, duration: 500 }}
>
	<div class="flex">
		<div class="mr-3 flex-shrink-0">
			<div
				class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-indigo-600"
			>
				{#if isImageUrl(badge.icon)}
					<img src={badge.icon} alt={badge.name} class="h-full w-full object-cover" />
				{:else if badge.icon.startsWith('<svg')}
					<img
						src={`data:image/svg+xml,${encodeURIComponent(badge.icon)}`}
						alt={badge.name}
						class="h-full w-full"
					/>
				{:else}
					<span class="text-2xl">{badge.icon}</span>
				{/if}
			</div>
		</div>

		<div class="flex-1">
			<button
				type="button"
				class="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-gray-600"
				onclick={markAsViewed}
				aria-label="Close notification"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>

			<div class="flex items-center">
				<h3 class="text-lg font-semibold text-gray-900">New Badge!</h3>
			</div>

			<p class="text-base font-medium text-indigo-600">{badge.name}</p>
			<p class="mt-1 text-sm text-gray-600">{badge.description}</p>

			<button
				class="mt-3 w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-500"
				onclick={markAsViewed}
			>
				Awesome!
			</button>
		</div>
	</div>
</div>
