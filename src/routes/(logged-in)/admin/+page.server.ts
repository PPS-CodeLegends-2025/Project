import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { count, desc, eq, gt, sql } from 'drizzle-orm';
import { modules } from '$lib/server/services/modules';
import { subDays } from 'date-fns';

export const load = (async ({ locals }) => {
	const user = locals.user;
	if (!user || !user.admin) {
		throw redirect(302, '/');
	}

	const [userCount] = await db.select({ count: count() }).from(table.user);

	const today = new Date();
	const lastWeek = subDays(today, 7);
	const lastMonth = subDays(today, 30);

	const [newUsersLastWeek] = await db
		.select({ count: count() })
		.from(table.user)
		.where(gt(table.user.registrationDate, lastWeek));

	const [challengesCompletedResult] = await db
		.select({ count: count() })
		.from(table.challengeProgress)
		.where(eq(table.challengeProgress.completed, true));

	const userGrowthData = await db
		.select({
			date: sql<string>`DATE(${table.user.registrationDate})`,
			count: count()
		})
		.from(table.user)
		.where(gt(table.user.registrationDate, subDays(today, 30)))
		.groupBy(sql`DATE(${table.user.registrationDate})`)
		.orderBy(sql`DATE(${table.user.registrationDate})`);

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

	const moduleList = modules.list();
	const moduleMap = modules.map();

	const allCompletions = await db
		.select({
			moduleId: table.moduleProgress.moduleId,
			count: count()
		})
		.from(table.moduleProgress)
		.groupBy(table.moduleProgress.moduleId);

	const completionsMap = allCompletions.reduce(
		(acc, curr) => {
			acc[curr.moduleId] = curr.count;
			return acc;
		},
		{} as Record<string, number>
	);

	const moduleStats = moduleList.map((module) => {
		const modulePath = module.url;
		const moduleData = moduleMap[modulePath];
		const totalUsers = userCount?.count || 1;
		const completions = completionsMap[modulePath] || 0;
		const totalSections = moduleData?.sections?.length || 0;

		const completionRate = Math.round((completions / (totalUsers * totalSections)) * 100);

		return {
			name: module.title,
			url: module.url,
			completionRate
		};
	});

	const challengeCompletions = await db
		.select({
			difficulty: table.challenge.difficulty,
			count: count()
		})
		.from(table.challengeProgress)
		.innerJoin(table.challenge, eq(table.challengeProgress.challengeId, table.challenge.id))
		.where(eq(table.challengeProgress.completed, true))
		.groupBy(table.challenge.difficulty);

	const totalChallengesCompleted = challengesCompletedResult?.count || 0;

	const challengeStats = challengeCompletions.map((stat) => {
		return {
			difficulty: stat.difficulty,
			count: stat.count,
			percentage: Math.round((stat.count / totalChallengesCompleted) * 100) || 0
		};
	});

	const activeUsersLastMonth = await db
		.select({ id: table.userStats.userId })
		.from(table.userStats)
		.where(gt(table.userStats.lastActiveDate, lastMonth))
		.groupBy(table.userStats.userId)
		.then((x) => x.length);

	const userActivity = activeUsersLastMonth || 0;
	const totalUsers = userCount?.count || 0;
	const activeUserPercentage = Math.round((userActivity / totalUsers) * 100) || 0;
	const avgChallengesPerUser =
		userActivity > 0 ? Math.round((totalChallengesCompleted / userActivity) * 10) / 10 : 0;

	return {
		stats: {
			totalUsers,
			activeUsers: userActivity,
			activeUserPercentage,
			newUsersLastWeek: newUsersLastWeek?.count || 0,
			totalChallengesCompleted,
			avgChallengesPerUser
		},
		userGrowth: userGrowthData,
		users,
		moduleStats,
		challengeStats
	};
}) satisfies PageServerLoad;
