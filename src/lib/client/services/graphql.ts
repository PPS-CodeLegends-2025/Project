import { apiClient } from '$client/fetch';

export interface GraphQLResponse<T = unknown> {
	data?: T;
	errors?: Array<{
		message: string;
		locations?: Array<{ line: number; column: number }>;
		path?: string[];
		extensions?: Record<string, unknown>;
	}>;
}

export const graphqlClient = {
	async execute<T = unknown>(
		query: string,
		variables?: Record<string, unknown>
	): Promise<GraphQLResponse<T>> {
		try {
			const response = await apiClient.post('/v1/graphql', {
				query,
				variables
			});

			if (!response.ok) {
				throw new Error(`GraphQL request failed with status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error('GraphQL request error:', error);
			return {
				errors: [
					{
						message: error instanceof Error ? error.message : 'Unknown GraphQL request error'
					}
				]
			};
		}
	},

	async query<T = unknown>(query: string, variables?: Record<string, unknown>): Promise<T> {
		const response = await this.execute<T>(query, variables);

		if (response.errors && response.errors.length > 0) {
			throw new Error(`GraphQL query error: ${response.errors[0].message}`);
		}

		if (!response.data) {
			throw new Error('No data returned from GraphQL query');
		}

		return response.data;
	},

	async mutate<T = unknown>(mutation: string, variables?: Record<string, unknown>): Promise<T> {
		return this.query<T>(mutation, variables);
	}
};
