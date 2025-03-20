<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-4">
	<h1 class="text-xl font-semibold">{page.status}: {page.error?.message}</h1>
	<a href="/" class="btn primary">Go home</a>
</div>
