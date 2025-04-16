<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {});
</script>

<svelte:head>
	<title>API Documentation</title>
</svelte:head>

<div class="container mx-auto h-full overflow-auto p-6">
	<h1 class="mb-6 text-3xl font-bold">API Documentation</h1>

	<div class="api-docs-content">
		<div class="mb-12 rounded-lg border bg-white p-8 shadow-md">
			<h2 class="mb-4 text-2xl font-semibold text-indigo-700">REST vs GraphQL</h2>
			<p class="mb-4">
				Our platform provides both REST and GraphQL APIs to serve different use cases.
			</p>

			<div class="mb-6">
				<h3 class="mb-3 text-xl font-semibold">When to use REST API:</h3>
				<ul class="ml-6 list-disc space-y-2">
					<li>
						<span class="font-medium">Simple data requirements</span> - When you need a complete resource
						with a predictable structure
					</li>
					<li>
						<span class="font-medium">CRUD operations</span> - For straightforward create, read, update,
						delete operations
					</li>
					<li>
						<span class="font-medium">Caching</span> - When you want to leverage HTTP caching mechanisms
					</li>
					<li>
						<span class="font-medium">File uploads</span> - For handling file uploads and binary data
					</li>
					<li>
						<span class="font-medium">Rate limiting</span> - When you need granular control over endpoint-specific
						rate limits
					</li>
					<li>
						<span class="font-medium">Simple clients</span> - For clients that don't need a specialized
						library
					</li>
				</ul>
				<p class="mt-2">
					Example: <code class="rounded bg-gray-100 px-2 py-1">GET /api/v1/modules/[id]</code> - To fetch
					a specific module with its progress
				</p>
			</div>

			<div class="mb-6">
				<h3 class="mb-3 text-xl font-semibold">When to use GraphQL API:</h3>
				<ul class="ml-6 list-disc space-y-2">
					<li>
						<span class="font-medium">Complex, nested data</span> - When you need data from multiple
						resources in a single request
					</li>
					<li>
						<span class="font-medium">Optimized data fetching</span> - To avoid over-fetching or under-fetching
						data
					</li>
					<li>
						<span class="font-medium">Multiple related resources</span> - When you need a user profile
						with their badges, modules progress, and stats
					</li>
					<li>
						<span class="font-medium">Dynamic data requirements</span> - When different clients need
						different parts of data
					</li>
					<li>
						<span class="font-medium">Exploratory development</span> - For front-end teams exploring
						data requirements
					</li>
					<li>
						<span class="font-medium">Reducing network requests</span> - To combine multiple API calls
						into a single request
					</li>
				</ul>
				<p class="mt-2">
					Example: Query a user with their badges and module progress in a single request
				</p>
			</div>

			<div class="rounded-lg bg-indigo-50 p-6">
				<h3 class="mb-3 text-xl font-semibold text-indigo-700">Example GraphQL Query</h3>
				<pre class="overflow-x-auto rounded bg-gray-800 p-4 text-sm text-white">
{`query GetUserProfile($userId: ID!) {
  user(id: $userId) {
    id
    username
    level
    xp
    badges {
      id
      name
      icon
      category
    }
    modules {
      module {
        title
        url
      }
      progress
      completedSections
    }
    stats {
      lessonsCompleted
      challengesSolved
    }
  }
}`}
        </pre>
				<p class="mt-4">
					This single query retrieves user data, badges, module progress, and stats that would
					require multiple REST API calls.
				</p>
			</div>

			<div class="mt-8 rounded-lg bg-green-50 p-6">
				<h3 class="mb-3 text-xl font-semibold text-green-700">Using the GraphQL Client</h3>
				<p class="mb-4">
					Our platform provides a GraphQL client service that makes it easy to use GraphQL in your
					frontend code:
				</p>
				<pre class="overflow-x-auto rounded bg-gray-800 p-4 text-sm text-white">
{`import { graphqlClient } from '$lib/client/services/graphql';

// In a Svelte component or script
async function fetchUserProfile(userId) {
  const query = \`
    query GetUserProfile($userId: ID!) {
      user(id: $userId) {
        id
        username
        level
        badges {
          name
          icon
        }
        stats {
          lessonsCompleted
          challengesSolved
        }
      }
    }
  \`;

  try {
    const result = await graphqlClient.query(query, { userId });
    return result.user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
}`}
        </pre>
				<p class="mt-4">
					The GraphQL client handles errors, typing, and communication with the API server.
				</p>
			</div>
		</div>

		<div class="mb-12 rounded-lg border bg-white p-8 shadow-md">
			<h2 class="mb-4 text-2xl font-semibold text-indigo-700">API Endpoints</h2>

			<div class="mb-6">
				<h3 class="mb-3 text-xl font-semibold">REST Endpoints</h3>
				<div class="overflow-x-auto">
					<table class="w-full text-left">
						<thead>
							<tr class="border-b-2 border-gray-300">
								<th class="p-3">Endpoint</th>
								<th class="p-3">Method</th>
								<th class="p-3">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-gray-200">
								<td class="p-3 font-mono">/api/v1/modules</td>
								<td class="p-3">GET</td>
								<td class="p-3">Get all available modules</td>
							</tr>
							<tr class="border-b border-gray-200">
								<td class="p-3 font-mono">/api/v1/modules/[id]</td>
								<td class="p-3">GET</td>
								<td class="p-3">Get specific module details and user progress</td>
							</tr>
							<tr class="border-b border-gray-200">
								<td class="p-3 font-mono">/api/v1/badges</td>
								<td class="p-3">GET</td>
								<td class="p-3">Get badges (filter by category with ?category=X)</td>
							</tr>
							<tr class="border-b border-gray-200">
								<td class="p-3 font-mono">/api/v1/challenges</td>
								<td class="p-3">GET</td>
								<td class="p-3">Get available challenges</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="mb-6">
				<h3 class="mb-3 text-xl font-semibold">GraphQL Endpoint</h3>
				<div class="overflow-x-auto">
					<table class="w-full text-left">
						<thead>
							<tr class="border-b-2 border-gray-300">
								<th class="p-3">Endpoint</th>
								<th class="p-3">Method</th>
								<th class="p-3">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-gray-200">
								<td class="p-3 font-mono">/api/v1/graphql</td>
								<td class="p-3">POST</td>
								<td class="p-3">GraphQL endpoint for all operations</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p class="mt-4">
					Explore our GraphQL API using the <a
						href="/api/graphql-playground"
						class="text-indigo-600 hover:underline">GraphQL Playground</a
					>.
				</p>
			</div>

			<div class="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
				<h3 class="mb-3 text-xl font-semibold text-yellow-800">
					Choosing Between REST and GraphQL
				</h3>
				<p class="mb-3">
					Our platform implements a hybrid approach using both REST and GraphQL APIs:
				</p>
				<ul class="ml-6 list-disc space-y-2">
					<li><strong>Simple resource access:</strong> Use REST API endpoints</li>
					<li><strong>Complex data with relationships:</strong> Use GraphQL queries</li>
					<li><strong>File operations:</strong> Use REST endpoints</li>
					<li>
						<strong>Multiple nested resources:</strong> Use GraphQL to avoid multiple API calls
					</li>
				</ul>
				<p class="mt-3">
					For most client applications, we recommend using a combination of both APIs to get the
					best performance and developer experience.
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	:global(html, body) {
		height: 100%;
		overflow: hidden;
	}

	:global(.api-docs-content) {
		overflow-y: auto;
		height: calc(100vh - 150px);
	}
</style>
