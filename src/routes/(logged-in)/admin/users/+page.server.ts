import { db } from '$server/db';
import { desc } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';
import { userService } from '$services/user';
import { fail } from '@sveltejs/kit';

export const actions = {
	removeUser: async ({ request }) => {
		const formData = await request.formData();
		const userId = formData.get('userId');

		if (!userId || typeof userId !== 'string') throw fail(400, { message: 'Invalid user ID' });

		const ok = await userService.deleteUser(userId);
		if (!ok) return { message: 'User removed successfully' };
		else throw fail(500, { message: 'Failed to remove user' });
	}
};

export const load = (async () => {
	const users = await db
		.select({
			id: table.user.id,
			username: table.user.username,
			level: table.user.level,
			xp: table.user.xp,
			registrationDate: table.user.registrationDate,
			admin: table.user.admin
		})
		.from(table.user)
		.orderBy(desc(table.user.registrationDate));

	return { users };
}) satisfies PageServerLoad;
