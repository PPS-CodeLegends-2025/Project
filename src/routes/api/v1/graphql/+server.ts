import { json } from '@sveltejs/kit';
import { executeGraphQLQuery } from '$lib/server/graphql';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		const { query, variables } = await request.json();

		if (!query) {
			return json({ errors: [{ message: 'No GraphQL query provided' }] }, { status: 400 });
		}

		const result = await executeGraphQLQuery(query, variables, {
			user: locals.user,
			session: locals.session
		});

		return json(result);
	} catch (error) {
		console.error('GraphQL API error:', error);
		return json(
			{
				errors: [
					{
						message: error instanceof Error ? error.message : 'An unknown error occurred'
					}
				]
			},
			{ status: 500 }
		);
	}
};

export const OPTIONS: RequestHandler = async () => {
	return new Response(null, {
		headers: {
			Allow: 'POST, OPTIONS'
		}
	});
};
