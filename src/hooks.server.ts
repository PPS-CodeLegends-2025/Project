import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth.js';

const handleAuth: Handle = async ({ event, resolve }) => {
	event.locals.user = null;
	event.locals.session = null;
	
	const sessionToken = event.cookies.get(auth.sessionCookieName);
	if (sessionToken) {
		try {
			const { session, user } = await auth.validateSessionToken(sessionToken);
			
			if (session) {
				auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
				event.locals.user = user;
				event.locals.session = session;
			} else {
				auth.deleteSessionTokenCookie(event);
			}
		} catch (error) {
			console.error('Auth validation error:', error);
			auth.deleteSessionTokenCookie(event);
		}
	}

	return resolve(event);
};

export const handle: Handle = handleAuth;
