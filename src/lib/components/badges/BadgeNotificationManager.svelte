<script lang="ts">
	import { onMount } from 'svelte';
	import { badgeService, type Badge } from '$lib/client/services/badges';
	import BadgeNotification from './BadgeNotification.svelte';

	interface Props {
		userId: string;
		checkInterval?: number; // in milliseconds
	}

	let { userId, checkInterval = 60000 }: Props = $props();

	let unviewedBadges = $state<Badge[]>([]);
	let currentBadge = $state<Badge | null>(null);
	let intervalId: ReturnType<typeof setInterval>;
	let checkCount = $state(0);

	async function checkForNewBadges() {
		if (!userId) return;

		checkCount++;
		console.log(`[BadgeNotificationManager] Checking for new badges (check #${checkCount})`);

		try {
			const newBadges = await badgeService.getUnviewedBadges(userId);
			console.log(`[BadgeNotificationManager] Found ${newBadges.length} unviewed badges`);

			if (newBadges.length > 0) {
				if (!currentBadge) {
					unviewedBadges = [...newBadges];
					showNextBadge();
				} else {
					const existingIds = unviewedBadges.map((b) => b.id);
					const uniqueNewBadges = newBadges.filter((b) => !existingIds.includes(b.id));

					if (uniqueNewBadges.length > 0) {
						console.log(
							`[BadgeNotificationManager] Adding ${uniqueNewBadges.length} new badges to queue`
						);
						unviewedBadges = [...unviewedBadges, ...uniqueNewBadges];
					}
				}
			}
		} catch (error) {
			console.error('Failed to check for new badges:', error);
		}
	}

	function showNextBadge() {
		if (unviewedBadges.length > 0) {
			const nextBadge = unviewedBadges[0];
			console.log(`[BadgeNotificationManager] Showing badge: ${nextBadge.name}`);
			currentBadge = nextBadge;
			unviewedBadges = unviewedBadges.slice(1);
		} else {
			console.log('[BadgeNotificationManager] No more badges to show');
			currentBadge = null;
		}
	}

	function handleClose() {
		showNextBadge();
	}

	onMount(() => {
		if (!userId) return;

		checkForNewBadges();

		intervalId = setInterval(checkForNewBadges, checkInterval);

		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	});
</script>

{#if currentBadge && userId}
	<BadgeNotification badge={currentBadge} {userId} onClose={handleClose} />
{/if}
