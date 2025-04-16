import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { GraphQLError } from 'graphql';

export const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

export async function executeGraphQLQuery(
	source: string,
	variables: Record<string, unknown> = {},
	context: unknown = {}
) {
	try {
		const { graphql } = await import('graphql');

		const result = await graphql({
			schema,
			source,
			variableValues: variables,
			contextValue: context
		});

		return result;
	} catch (error) {
		console.error('GraphQL execution error:', error);
		return {
			errors: [new GraphQLError(error instanceof Error ? error.message : String(error))]
		};
	}
}
