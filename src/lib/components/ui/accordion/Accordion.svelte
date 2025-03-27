<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let multiple = false;
	export let value: string | string[] | undefined = undefined;
	export let className: string = '';

	const openItems: Writable<string[]> = writable(
		Array.isArray(value) ? value : value ? [value] : []
	);

	// Update open items when value prop changes
	$: if (value !== undefined) {
		if (Array.isArray(value)) {
			openItems.set(value);
		} else if (value) {
			openItems.set([value]);
		} else {
			openItems.set([]);
		}
	}

	// Set up context for accordion items
	setContext('accordion', {
		open: openItems,
		toggle: (itemValue: string) => {
			openItems.update((items) => {
				const index = items.indexOf(itemValue);
				if (index !== -1) {
					// Item is open, close it
					return multiple ? items.filter((i) => i !== itemValue) : [];
				} else {
					// Item is closed, open it
					return multiple ? [...items, itemValue] : [itemValue];
				}
			});
		}
	});
</script>

<div class={`accordion-root ${className}`}>
	<slot />
</div>

<style>
	.accordion-root {
		@apply w-full;
	}
</style>
