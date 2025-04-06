<script lang="ts">
	import { onMount } from 'svelte';
	import { badgeService, type Badge } from '$lib/client/services/badges';
	import BadgesGrid from './BadgesGrid.svelte';

	interface Props {
		userId: string;
	}

	let { userId }: Props = $props();

	let badges = $state<Badge[]>([]);
	let loading = $state(true);
	let selectedCategory = $state('all');
	let checkingBadges = $state(false);
	let badgeCheckResult = $state<{
		newlyAwarded: number;
		alreadyHad: number;
		awardedBadges: Badge[];
	} | null>(null);

	$effect(() => {
		loadBadges();
	});

	async function loadBadges() {
		loading = true;
		try {
			if (selectedCategory === 'all') {
				badges = await badgeService.getAllBadges(userId);
			} else {
				badges = await badgeService.getAllBadges(userId, selectedCategory);
			}
		} catch (error) {
			console.error('Failed to load badges:', error);
		} finally {
			loading = false;
		}
	}

	async function checkForMissingBadges() {
		checkingBadges = true;
		badgeCheckResult = null;

		try {
			const result = await badgeService.checkAndAwardMissingBadges(userId);

			if (result.success) {
				badgeCheckResult = {
					newlyAwarded: result.newlyAwarded,
					alreadyHad: result.alreadyHad,
					awardedBadges: result.awardedBadges
				};

				if (result.newlyAwarded > 0) {
					await loadBadges();
				}
			}
		} catch (error) {
			console.error('Failed to check missing badges:', error);
		} finally {
			checkingBadges = false;
		}
	}

	const earnedBadges = $derived(badges.filter((b) => b.earned));
	const unearnedBadges = $derived(badges.filter((b) => !b.earned && !b.hidden));
	const categories = $derived(['all', ...new Set(badges.map((b) => b.category))]);

	onMount(() => {
		loadBadges();
	});
</script>

<div class="space-y-8">
	<div>
		<div class="flex items-center justify-between">
			<h2 class="text-2xl font-semibold">Your Badges</h2>

			<div class="flex space-x-2">
				{#each categories as category (category)}
					<button
						class={`rounded-md px-3 py-1 text-sm ${selectedCategory === category ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
						onclick={() => (selectedCategory = category)}
					>
						{category.charAt(0).toUpperCase() + category.slice(1)}
					</button>
				{/each}
			</div>
		</div>

		<!-- Check for missing badges button -->
		<div class="mt-4 flex justify-end">
			<button
				class="flex items-center space-x-2 rounded-md bg-indigo-50 px-4 py-2 text-sm text-indigo-700 hover:bg-indigo-100"
				onclick={checkForMissingBadges}
				disabled={checkingBadges}
			>
				{#if checkingBadges}
					<div class="h-4 w-4 animate-spin rounded-full border-b-2 border-indigo-700"></div>
					<span>Checking...</span>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
					<span>Check for Missing Badges</span>
				{/if}
			</button>
		</div>

		<!-- Badge check results -->
		{#if badgeCheckResult}
			<div
				class={`mt-3 rounded-md p-3 text-sm ${badgeCheckResult.newlyAwarded > 0 ? 'bg-green-50 text-green-800' : 'bg-blue-50 text-blue-800'}`}
			>
				{#if badgeCheckResult.newlyAwarded > 0}
					<p>
						🎉 You've been awarded {badgeCheckResult.newlyAwarded} new badge{badgeCheckResult.newlyAwarded >
						1
							? 's'
							: ''}!
					</p>
					{#if badgeCheckResult.awardedBadges.length > 0}
						<div class="mt-2 flex flex-wrap gap-2">
							{#each badgeCheckResult.awardedBadges as badge (badge.id)}
								<div class="flex items-center rounded bg-white/50 px-2 py-1">
									<span class="mr-1 text-lg">{badge.icon}</span>
									<span>{badge.name}</span>
								</div>
							{/each}
						</div>
					{/if}
				{:else}
					<p>✓ You're all caught up! No new badges to award.</p>
				{/if}
			</div>
		{/if}

		{#if loading}
			<div class="flex justify-center p-8">
				<div class="h-8 w-8 animate-spin rounded-full border-b-2 border-indigo-500"></div>
			</div>
		{:else}
			<div class="mt-6">
				<BadgesGrid
					badges={earnedBadges}
					title="Earned Badges"
					showEarnedStatus={false}
					size="md"
				/>

				{#if unearnedBadges.length > 0}
					<div class="mt-10">
						<BadgesGrid
							badges={unearnedBadges}
							title="Badges to Earn"
							showEarnedStatus={false}
							size="sm"
						/>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
		<h3 class="mb-2 text-lg font-semibold">How to Earn Badges</h3>
		<p class="text-gray-600">
			Complete courses, challenges and achieve milestones to earn badges. Each badge represents an
			achievement in your learning journey.
		</p>
	</div>
</div>
