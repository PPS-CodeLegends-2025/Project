import { hash, verify } from '@node-rs/argon2';
import { db } from '../db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

const hashOptions = {
	memoryCost: 4096,
	timeCost: 2,
	outputLen: 32,
	parallelism: 4
} as const;

export const userService = {
	async register(username: string, password: string) {
		const passwordHash = await hash(password, hashOptions);

		const [res] = await db
			.insert(table.user)
			.values({
				username,
				passwordHash,
				level: 0,
				xp: 0
			})
			.$returningId();

		const [newUser] = await db
			.select({
				id: table.user.id,
				username: table.user.username
			})
			.from(table.user)
			.where(eq(table.user.id, res.id));

		return newUser;
	},
	async exists(username: string) {
		const results = await db.select().from(table.user).where(eq(table.user.username, username));
		return results.length > 0;
	},
	async login(username: string, password: string) {
		const [user] = await db.select().from(table.user).where(eq(table.user.username, username));

		if (!user) return null;

		const validPassword = await verify(user.passwordHash, password, hashOptions);

		if (!validPassword) return null;

		return {
			id: user.id,
			username: user.username,
			registrationDate: user.registrationDate
		};
	}
};
