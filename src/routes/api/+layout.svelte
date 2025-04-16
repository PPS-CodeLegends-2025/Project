<script lang="ts">
</script>

<div class="api-layout">
	<slot />
</div>

<style>
	:global(html, body) {
		height: 100%;
		min-height: 100%;
		overflow: hidden;
	}

	.api-layout {
		height: 100vh;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
	}

	:global(.container) {
		flex: 1;
		overflow: auto;
	}
</style>
