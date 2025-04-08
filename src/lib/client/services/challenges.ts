import { apiClient } from '$client/fetch';

export const challenges = {
	async markChallengeCompleted(challengeId: string): Promise<boolean> {
		try {
			const response = await apiClient.post('/v1/challenges/complete', {
				challengeId
			});
			if (!response.ok) throw new Error('Failed to mark challenge as completed');
			return true;
		} catch (error) {
			console.error('Failed to mark challenge as completed:', error);
			throw error;
		}
	}
};
