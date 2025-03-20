<nav class="flex items-center justify-between border-b border-gray-300 p-4">
	<div class="flex items-center">
		<a href="/" class="text-xl font-bold">CodeLegends</a>
	</div>

	<ul class="flex space-x-6">
		<li><a href="/">Dashboard</a></li>
		<li><a href="/playground">Playground</a></li>
		<li><a href="/demo">Demo Task</a></li>
		<li><a href="/module">Modules</a></li>
		<li><a href="/profile">Profile</a></li>
		<li><a href="/challenges">Challenges</a></li>
		<li><a href="/logout" data-sveltekit-preload-data="off">Logout</a></li>
	</ul>
</nav>

<style lang="postcss">
	@reference 'tailwindcss';

	a {
		@apply transition-colors hover:text-indigo-500;
	}
</style>
