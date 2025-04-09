import type { PageServerLoad } from './$types';
import { userService } from '$services/user';

type User = {
	username: string;
	xp: number;
	level: number;
};

export const load = (async () => {
	const users = await userService.getAllUsersRank();

	const topUsers = users
		.map((user: User) => ({
			...user,
			score: user.level * 1000 + user.xp
		}))
		.sort((a, b) => b.score - a.score)
		.slice(0, 10);

	return {
		users: topUsers
	};
}) satisfies PageServerLoad;
