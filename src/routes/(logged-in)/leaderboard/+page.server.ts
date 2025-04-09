import type { PageServerLoad } from './$types';
import { userService } from '$services/user';

type User = {
	username: string;
	xp: number;
	level: number;
};

function xpToScore(level: number, xp: number): number {
	const xpWeight = Math.max(0.05, 1 - (level - 1) / 20);
	const finalXp = Math.min(xp * xpWeight, 950);
	return level * 1000 + Math.round(finalXp);
}

export const load = (async () => {
	const users = await userService.getAllUsersRank();

	const topUsers = users
		.map((user: User) => ({
			...user,
			score: xpToScore(user.level, user.xp)
		}))
		.sort((a, b) => b.score - a.score)
		.slice(0, 10);

	return {
		users: topUsers
	};
}) satisfies PageServerLoad;
