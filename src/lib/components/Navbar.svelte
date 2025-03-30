<nav class="flex items-center justify-between border-b border-gray-300 px-12 py-4">
	<div class="flex items-center">
		<a href="/" class="text-xl font-bold">CodeLegends</a>
	</div>

	<ul class="flex">
		<li><a href="/">Dashboard</a></li>
		<li><a href="/playground">JS Playground</a></li>
		<li><a href="/module">Modules</a></li>
		<li><a href="/challenges">Challenges</a></li>
		<li><a href="/profile">Profile</a></li>
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
