import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	return {
		id: params.module_id
	};
}) satisfies PageServerLoad;
