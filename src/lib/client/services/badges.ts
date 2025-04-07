import { apiClient } from '$client/fetch';

export interface Badge {
	id: string;
	name: string;
	description: string;
	icon: string;
	category: string;
	level: number;
	hidden: boolean;
	earned?: boolean;
	earnedAt?: Date | null;
	viewed?: boolean;
}

interface BadgeApiResponse {
	id: string;
	name: string;
	description: string;
	icon: string;
	category: string;
	level: number;
	hidden: boolean;
	earned?: boolean;
	earnedAt?: string | null;
	awardedAt?: string | null;
	viewed?: boolean;
}

interface BadgeCheckResponse {
	success: boolean;
	newlyAwarded: number;
	alreadyHad: number;
	awardedBadges: BadgeApiResponse[];
}

export const badgeService = {
	async getUserBadges(userId: string): Promise<Badge[]> {
		try {
			const response = await apiClient.get(`/v1/badges/user?userId=${userId}`);

			if (!response.ok) {
				throw new Error('Failed to fetch user badges');
			}

			const data = await response.json();
			return data.map((badge: BadgeApiResponse) => ({
				...badge,
				earnedAt: badge.awardedAt ? new Date(badge.awardedAt) : null
			}));
		} catch (error) {
			console.error('Error fetching user badges:', error);
			return [];
		}
	},

	async getAllBadges(userId: string, category?: string): Promise<Badge[]> {
		try {
			const url = `/v1/badges?userId=${userId}${category ? `&category=${category}` : ''}`;
			const response = await apiClient.get(url);

			if (!response.ok) {
				throw new Error('Failed to fetch badges');
			}

			const data = await response.json();
			return data.map((badge: BadgeApiResponse) => ({
				...badge,
				earnedAt: badge.earnedAt ? new Date(badge.earnedAt) : null
			}));
		} catch (error) {
			console.error('Error fetching badges:', error);
			return [];
		}
	},

	async getUnviewedBadges(userId: string): Promise<Badge[]> {
		try {
			console.log(`[badgeService] Fetching unviewed badges for user: ${userId}`);
			const response = await apiClient.get(`/v1/badges/user?userId=${userId}&unviewed=true`);

			if (!response.ok) {
				throw new Error(`Failed to fetch unviewed badges: ${response.status}`);
			}

			const data = await response.json();
			console.log(`[badgeService] Retrieved ${data.badges.length} unviewed badges`);

			let badges = data.badges.map((badge: BadgeApiResponse) => ({
				...badge,
				earnedAt: badge.awardedAt ? new Date(badge.awardedAt) : null,
				earned: true
			}));

			badges = badges.filter((badge: Badge) => !badge.viewed);
			return badges;
		} catch (error) {
			console.error('Error fetching unviewed badges:', error);
			return [];
		}
	},

	async checkAndAwardMissingBadges(userId: string): Promise<{
		success: boolean;
		newlyAwarded: number;
		alreadyHad: number;
		awardedBadges: Badge[];
	}> {
		try {
			const response = await apiClient.post('/v1/badges/check', {
				userId
			});

			if (!response.ok) {
				throw new Error('Failed to check badges');
			}

			const data = (await response.json()) as BadgeCheckResponse;

			const processedBadges = data.awardedBadges.map((badge: BadgeApiResponse) => ({
				...badge,
				earnedAt: badge.awardedAt ? new Date(badge.awardedAt) : new Date(),
				earned: true,
				viewed: false
			}));

			console.log('Received awarded badges:', processedBadges);

			return {
				...data,
				awardedBadges: processedBadges
			};
		} catch (error) {
			console.error('Error checking badges:', error);
			return {
				success: false,
				newlyAwarded: 0,
				alreadyHad: 0,
				awardedBadges: []
			};
		}
	}
};
