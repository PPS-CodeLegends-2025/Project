<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let multiple = false;
	export let value: string | string[] | undefined = undefined;
	export let className: string = '';

	const openItems: Writable<string[]> = writable(
		Array.isArray(value) ? value : value ? [value] : []
	);

	$: if (value !== undefined) {
		if (Array.isArray(value)) {
			openItems.set(value);
		} else if (value) {
			openItems.set([value]);
		} else {
			openItems.set([]);
		}
	}

	setContext('accordion', {
		open: openItems,
		toggle: (itemValue: string) => {
			openItems.update((items) => {
				const index = items.indexOf(itemValue);
				if (index !== -1) {
					return multiple ? items.filter((i) => i !== itemValue) : [];
				} else {
					return multiple ? [...items, itemValue] : [itemValue];
				}
			});
		}
	});
</script>

<div class={`accordion-root ${className}`}>
	<slot />
</div>

<style lang="postcss">
	@reference 'tailwindcss';

	.accordion-root {
		@apply w-full;
	}
</style>
