import { fail, redirect } from '@sveltejs/kit';
import { hash } from '@node-rs/argon2';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    if (event.locals.user) {
        return redirect(302, '/');
    }
    return {};
};

export const actions: Actions = {
    register: async (event) => {
        const formData = await event.request.formData();
        const username = formData.get('username');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm_password');

        if (typeof username !== 'string' || typeof password !== 'string' || typeof confirmPassword !== 'string') {
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

        if (password !== confirmPassword) {
            return fail(400, {
                message: 'Passwords do not match'
            });
        }

        try {
            const results = await db.select().from(table.user).where(eq(table.user.username, username));
            
            if (results.length > 0) {
                return fail(400, { message: 'Username already taken' });
            }

            const passwordHash = await hash(password, {
                memoryCost: 19456,
                timeCost: 2,
                outputLen: 32,
                parallelism: 1
            });

            const userId = crypto.randomUUID(); 
            await db
                .insert(table.user)
                .values({
                    id: userId,
                    username,
                    passwordHash
                });
            
            const [newUser] = await db
                .select()
                .from(table.user)
                .where(eq(table.user.id, userId));

            const sessionToken = auth.generateSessionToken();
            const session = await auth.createSession(sessionToken, newUser.id);

            event.cookies.set('sessionToken', sessionToken, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 30 // 30 days
            });

            return redirect(302, '/');
        } catch (error) {
            console.error('Registration error:', error);
            return fail(500, { message: 'Failed to register. Please try again later.' });
        }
    }
};

function validateUsername(username: unknown): username is string {
    return typeof username === 'string' && /^[a-zA-Z0-9]{3,31}$/.test(username);
}

function validatePassword(password: unknown): password is string {
    return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}
