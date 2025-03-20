import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import auth from '$lib/server/services/auth';

export const GET: RequestHandler = async (event) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);
	if (!sessionToken) return redirect(302, '/login');

	auth.deleteSessionTokenCookie(event);
	return redirect(302, '/login');
};
