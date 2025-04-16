<script lang="ts">
	import { onMount } from 'svelte';

	let query = `# Try a GraphQL query
query GetModulesWithDetails {
  modules {
    title
    description
    level
    category
    xpReward
    sections {
      title
      order
    }
  }
}`;

	let variables = `{
  "userId": "your-user-id",
  "limit": 10,
  "category": "javascript"
}`;

	let result = '';
	let loading = false;

	const exampleQueries = [
		{
			name: 'Get User Profile',
			query: `query GetUserProfile($userId: ID!) {
  user(id: $userId) {
    id
    username
    level
    xp
    stats {
      lessonsCompleted
      challengesSolved
      daysActive
      lastActiveDate
    }
    modules {
      module {
        title
        category
        level
      }
      progress
      completedSections
    }
    badges {
      id
      name
      icon
      category
      earnedAt
    }
  }
}`,
			variables: `{
  "userId": "your-user-id"
}`
		},
		{
			name: 'Get Modules List',
			query: `query GetModules($category: String) {
  modules(category: $category) {
    id
    title
    description
    level
    category
    xpReward
    sections {
      title
      order
    }
  }
}`,
			variables: `{
  "category": "javascript"
}`
		},
		{
			name: 'Get Leaderboard',
			query: `query GetLeaderboard($limit: Int) {
  leaderboard(limit: $limit) {
    id
    username
    level
    xp
    score
    rank
  }
}`,
			variables: `{
  "limit": 10
}`
		},
		{
			name: 'Get Badges By Category',
			query: `query GetBadgesByCategory($category: String) {
  badges(category: $category) {
    id
    name
    description
    category
    icon
    level
  }
}`,
			variables: `{
  "category": "achievements"
}`
		},
		{
			name: 'Get Challenge Details',
			query: `query GetChallengeDetails($id: ID) {
  challenge(id: $id) {
    id
    title
    description
    difficulty
    category
    xp
    completions
    task {
      name
      description
      tests {
        input
        expectedOutput
      }
    }
  }
}`,
			variables: `{
  "id": "challenge-id"
}`
		},
		{
			name: 'Search Content',
			query: `query SearchContent($query: String!, $types: [String!]) {
  search(query: $query, types: $types) {
    ... on Module {
      id
      title
      type: __typename
      category
    }
    ... on Challenge {
      id
      title
      type: __typename
      difficulty
    }
    ... on Badge {
      id
      name
      type: __typename
      category
    }
  }
}`,
			variables: `{
  "query": "javascript",
  "types": ["Module", "Challenge"]
}`
		}
	];

	function loadExample(index: number) {
		query = exampleQueries[index].query;
		variables = exampleQueries[index].variables;
	}

	async function executeQuery() {
		loading = true;
		result = '';

		try {
			const response = await fetch('/api/v1/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query,
					variables: variables ? JSON.parse(variables) : undefined
				})
			});

			const data = await response.json();
			result = JSON.stringify(data, null, 2);
		} catch (error) {
			result = JSON.stringify(
				{ error: error instanceof Error ? error.message : String(error) },
				null,
				2
			);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		const textareas = document.querySelectorAll('textarea');
		textareas.forEach((textarea) => {
			textarea.style.height = 'auto';
			textarea.style.height = textarea.scrollHeight + 'px';
		});
	});
</script>

<svelte:head>
	<title>GraphQL Playground</title>
</svelte:head>

<div class="container mx-auto h-full overflow-auto p-6">
	<h1 class="mb-6 text-3xl font-bold">GraphQL Playground</h1>

	<div class="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
		<div>
			<div class="mb-4">
				<div class="mb-2 flex justify-between">
					<h2 class="text-xl font-semibold">Query</h2>
					<div class="relative">
						<select
							class="rounded-md border border-gray-300 bg-white px-3 py-1 pr-8 text-sm"
							onchange={(e) => loadExample(Number((e.target as HTMLSelectElement)?.value))}
						>
							<option value="" selected disabled>Load example...</option>
							{#each exampleQueries as example, i (i)}
								<option value={i}>{example.name}</option>
							{/each}
						</select>
					</div>
				</div>
				<textarea
					bind:value={query}
					class="h-64 w-full rounded-md border border-gray-300 bg-gray-50 p-4 font-mono text-sm"
				></textarea>
			</div>

			<div class="mb-4">
				<h2 class="mb-2 text-xl font-semibold">Variables (JSON)</h2>
				<textarea
					bind:value={variables}
					class="h-32 w-full rounded-md border border-gray-300 bg-gray-50 p-4 font-mono text-sm"
				></textarea>
			</div>

			<button
				onclick={executeQuery}
				disabled={loading}
				class="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:bg-gray-400"
			>
				{loading ? 'Executing...' : 'Execute Query'}
			</button>
		</div>

		<div>
			<h2 class="mb-2 text-xl font-semibold">Result</h2>
			<pre
				class="h-[480px] overflow-y-auto rounded-md border border-gray-300 bg-gray-50 p-4 font-mono text-sm">{result ||
					'Execute a query to see results'}</pre>
		</div>
	</div>

	<div class="mb-6">
		<h2 class="mb-4 text-xl font-semibold">Example Queries</h2>

		<div class="grid gap-4 md:grid-cols-2">
			<div class="rounded-md border border-gray-300 bg-gray-50 p-4">
				<h3 class="mb-2 font-semibold">Get User with Modules and Badges</h3>
				<pre class="overflow-x-auto text-xs">{`query GetUserWithProgress($userId: ID!) {
  user(id: $userId) {
    username
    level
    xp
    badges {
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
  }
}`}</pre>
			</div>

			<div class="rounded-md border border-gray-300 bg-gray-50 p-4">
				<h3 class="mb-2 font-semibold">Get Modules List</h3>
				<pre class="overflow-x-auto text-xs">{`query GetModules($category: String) {
  modules(category: $category) {
    title
    description
    level
    category
    xpReward
  }
}`}</pre>
			</div>

			<div class="rounded-md border border-gray-300 bg-gray-50 p-4">
				<h3 class="mb-2 font-semibold">Get Leaderboard</h3>
				<pre class="overflow-x-auto text-xs">{`query GetLeaderboard($limit: Int) {
  leaderboard(limit: $limit) {
    username
    level
    xp
    rank
  }
}`}</pre>
			</div>

			<div class="rounded-md border border-gray-300 bg-gray-50 p-4">
				<h3 class="mb-2 font-semibold">Get Badges by Category</h3>
				<pre class="overflow-x-auto text-xs">{`query GetBadgesByCategory($category: String!) {
  badges(category: $category) {
    id
    name
    description
    icon
    level
  }
}`}</pre>
			</div>

			<div class="rounded-md border border-gray-300 bg-gray-50 p-4">
				<h3 class="mb-2 font-semibold">Get Challenge Details</h3>
				<pre class="overflow-x-auto text-xs">{`query GetChallengeDetails($id: ID!) {
  challenge(id: $id) {
    title
    description
    difficulty
    category
    xpReward
    task {
      name
      description
    }
  }
}`}</pre>
			</div>

			<div class="rounded-md border border-gray-300 bg-gray-50 p-4">
				<h3 class="mb-2 font-semibold">Search Content</h3>
				<pre
					class="overflow-x-auto text-xs">{`query SearchContent($query: String!, $types: [String!]) {
  search(query: $query, types: $types) {
    ... on Module {
      title
      type: __typename
      category
    }
    ... on Challenge {
      title
      type: __typename
      difficulty
    }
  }
}`}</pre>
			</div>
		</div>
	</div>
</div>
