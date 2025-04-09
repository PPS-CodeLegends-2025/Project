<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<title>Admin</title>
</svelte:head>

<div
	class="container mx-auto my-4 mt-4 flex flex-row justify-center gap-6 rounded-lg border border-gray-300 bg-white p-6 shadow-sm"
>
	<a href="/admin/" class="font-medium text-indigo-600 hover:text-indigo-800">Dashboard</a>
	<a href="/admin/users" class="font-medium text-indigo-600 hover:text-indigo-800"
		>User Management</a
	>
	<a href="/admin/challenges" class="font-medium text-indigo-600 hover:text-indigo-800"
		>Challenge Management</a
	>
</div>

{@render children()}
