import type { Handle } from '@sveltejs/kit';
import auth from '$lib/server/services/auth';
import { applyMigrations } from '$lib/server/db';
import { groupedModules } from '$lib/server/routes';
import { dev } from '$app/environment';

await applyMigrations().then(() => {
	console.log('Migrations applied');
});

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);

	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};

if (dev) console.log('[DEV]: App modules:', groupedModules);

export const handle: Handle = handleAuth;
