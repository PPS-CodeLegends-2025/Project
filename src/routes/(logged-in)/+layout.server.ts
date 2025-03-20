import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	const { user, session } = event.locals;

	if (!user || !session) return redirect(302, '/login');

	return {
		user,
		session
	};
}) satisfies LayoutServerLoad;
