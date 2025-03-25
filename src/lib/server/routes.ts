const pages = import.meta.glob('/src/routes/**/+page.svelte');
export const routes = Object.keys(pages)
	.map((x) => x.substring(11)) // /src/routes
	.map((x) => x.substring(0, x.length - 13)) // /+page.svelte
	.map((x) => x.replaceAll(/\/\([\w|-]+\)/g, '')) // (groups)
	.filter((x) => !x.includes('[')) // parametrized
	.map((x) => (x.length > 0 ? x : '/'))
	.sort();
