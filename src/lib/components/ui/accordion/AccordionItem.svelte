<script lang="ts">
	import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';
	import { type Writable } from 'svelte/store';

	export let value: string;
	export let className: string = '';

	const { open, toggle } = getContext('accordion') as {
		open: Writable<string[]>;
		toggle: (value: string) => void;
	};

	$: isOpen = $open.includes(value);

	function handleToggle() {
		toggle(value);
	}
</script>

<div class={`accordion-item ${className}`}>
	<h3>
		<button
			class="accordion-trigger"
			aria-expanded={isOpen}
			aria-controls={`content-${value}`}
			onclick={handleToggle}
		>
			<slot name="trigger" />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class={`chevron ${isOpen ? 'rotate' : ''}`}
			>
				<polyline points="6 9 12 15 18 9"></polyline>
			</svg>
		</button>
	</h3>
	{#if isOpen}
		<div
			transition:slide={{ duration: 300 }}
			class="accordion-content"
			id={`content-${value}`}
			role="region"
		>
			<slot />
		</div>
	{/if}
</div>

<style>
	.accordion-item {
		border-bottom: 1px solid #e5e7eb;
	}

	.accordion-trigger {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		text-align: left;
		font-weight: 500;
	}

	.accordion-trigger:hover {
		background-color: #f9fafb;
	}

	.accordion-trigger:focus {
		outline: none;
	}

	.accordion-content {
		padding: 1rem;
		width: 100%;
		box-sizing: border-box;
		overflow-x: hidden;
	}

	.chevron {
		height: 1.25rem;
		width: 1.25rem;
		transition-property: transform;
		transition-duration: 200ms;
		flex-shrink: 0;
	}

	.rotate {
		transform: rotate(180deg);
	}
</style>
