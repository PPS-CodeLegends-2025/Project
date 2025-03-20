import { fail, redirect } from '@sveltejs/kit';
import auth from '$lib/server/services/auth';
import type { Actions, PageServerLoad } from './$types';
import { validateUsername, validatePassword } from '../validator';
import { userService } from '$lib/server/services/user';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) return redirect(302, '/');
	return {};
};

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (typeof username !== 'string' || typeof password !== 'string') {
			return fail(400, {
				message: 'Username and password are required'
			});
		}

		if (!validateUsername(username)) {
			return fail(400, {
				message: 'Invalid username (min 3, max 31 characters, alphanumeric only)'
			});
		}

		if (!validatePassword(password)) {
			return fail(400, {
				message: 'Invalid password (min 6, max 255 characters)'
			});
		}

		try {
			const user = await userService.login(username, password);

			if (!user) return fail(400, { message: 'Incorrect username or password' });

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, user.id);

			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch (error) {
			console.error('Login error:', error);
			return fail(500, { message: 'An error occurred during login' });
		}

		return redirect(302, '/');
	}
};
