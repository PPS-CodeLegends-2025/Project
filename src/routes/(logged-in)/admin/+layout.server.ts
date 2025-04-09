import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const user = locals.user;
	if (!user || !user.admin) redirect(302, '/');
	return { user };
}) satisfies LayoutServerLoad;
