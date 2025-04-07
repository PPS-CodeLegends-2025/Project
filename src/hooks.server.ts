import type { Handle } from '@sveltejs/kit';
import auth from '$lib/server/services/auth';
import { applyMigrations } from '$lib/server/db';
import { groupedModules } from '$lib/server/routes';
import { dev } from '$app/environment';
import { sequence } from '@sveltejs/kit/hooks';
import { createInitialBadges } from '$lib/server/scripts/createInitialBadges';
import { logger } from '$logger';

try {
	await applyMigrations().then(() => {
		logger.info('Database setup complete');
	});

	await createInitialBadges().then(() => {
		logger.info('Badges setup complete');
	});

	await createInitialBadges().then(() => {
		console.log('Badges setup complete');
	});
} catch (error) {
	logger.error('Failed to apply migrations:', error);
	process.exit(1);
}

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

const apiProtection: Handle = async ({ event, resolve }) => {
	if (!event.url.pathname.startsWith('/api')) return resolve(event);

	const { user, session } = event.locals;
	if (!session || !user)
		return new Response('Unauthorized', {
			status: 401
		});

	return resolve(event);
};

if (dev) logger.debug('[DEV]: App modules:', groupedModules);

export const handle: Handle = sequence(handleAuth, apiProtection);
