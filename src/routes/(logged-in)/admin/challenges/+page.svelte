<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="container mx-auto p-6">
	<header class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold">Challenge Management</h1>
			<p class="text-gray-600">Create and manage coding challenges</p>
		</div>

		<div>
			<a
				href="/admin/challenges/new"
				class="flex items-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mr-2 h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
						clip-rule="evenodd"
					/>
				</svg>
				Create with AI
			</a>
		</div>
	</header>

	<div class="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
		<h2 class="mb-4 text-xl font-semibold">Existing Challenges</h2>
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Title</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Category</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Difficulty</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>XP</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Completions</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each data.challenges as challenge (challenge.id)}
						<tr class="hover:bg-gray-50">
							<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
								<a href={`/challenge/${challenge.id}`} class="text-indigo-600 hover:underline">
									{challenge.title}
								</a>
							</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{challenge.category}</td
							>
							<td class="px-6 py-4 text-sm whitespace-nowrap">
								<span
									class={`rounded-full px-2 py-1 text-xs font-medium 
                                        ${
																					challenge.difficulty === 'Easy'
																						? 'bg-green-100 text-green-800'
																						: challenge.difficulty === 'Medium'
																							? 'bg-yellow-100 text-yellow-800'
																							: 'bg-red-100 text-red-800'
																				}`}
								>
									{challenge.difficulty}
								</span>
							</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{challenge.xp}</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
								{challenge.completions}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
