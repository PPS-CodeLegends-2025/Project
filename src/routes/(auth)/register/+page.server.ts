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
	register: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const fullname = formData.get('fullname');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirm_password');

		if (
			typeof username !== 'string' ||
			typeof password !== 'string' ||
			typeof confirmPassword !== 'string'
		)
			return fail(400, {
				message: 'Username and password are required'
			});

		if (!validateUsername(username))
			return fail(400, {
				message: 'Invalid username (min 3, max 31 characters, alphanumeric only)'
			});

		if (fullname !== null && !validateUsername(fullname))
			return fail(400, {
				message: 'Fullname must be a valid alphanumeric string'
			});

		if (!validatePassword(password))
			return fail(400, {
				message: 'Invalid password (min 6, max 255 characters)'
			});

		if (password !== confirmPassword)
			return fail(400, {
				message: 'Passwords do not match'
			});

		try {
			if (await userService.exists(username))
				return fail(400, { message: 'Username already taken' });

			const newUser = await userService.register(username, password, fullname ?? undefined);
			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, newUser.id);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch (error) {
			console.error('Registration error:', error);
			return fail(500, { message: 'Failed to register. Please try again later.' });
		}

		return redirect(302, '/');
	}
};
