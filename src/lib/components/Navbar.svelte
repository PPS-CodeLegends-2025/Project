<script lang="ts">
	interface Props {
		admin: boolean;
	}

	let { admin }: Props = $props();
</script>

<nav class="flex items-center justify-between border-b border-gray-300 px-12 py-4">
	<div class="flex items-center">
		<a href="/" class="flex items-center">
			<img src="/images/logo.png" alt="CodeLegends Logo" class="mr-2 h-14" />
		</a>
	</div>

	<ul class="flex">
		{#if admin}
			<li><a href="/admin" class="text-indigo-500">Admin</a></li>
		{/if}
		<li><a href="/">Dashboard</a></li>
		<li><a href="/leaderboard">Leaderboard</a></li>
		<li><a href="/playground">JS Playground</a></li>
		<li><a href="/module">Modules</a></li>
		<li><a href="/challenge">Challenges</a></li>
		<li><a href="/profile" data-sveltekit-reload>Profile</a></li>
		<li><a href="/logout" data-sveltekit-preload-data="off">Logout</a></li>
	</ul>
</nav>

<style lang="postcss">
	@reference 'tailwindcss';

	a {
		@apply transition-colors hover:text-indigo-500;
	}

	li:not(:last-child)::after {
		content: '|';
		@apply mx-4 text-gray-400;
	}
</style>
