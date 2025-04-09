<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="container mx-auto p-6">
	<header class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold">User Management</h1>
			<p class="text-gray-600">Manage users</p>
		</div>
	</header>

	<div class="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Username</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Level</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>XP</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Joined</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Status</th
						>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Actions</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each data.users as user (user.id)}
						<tr>
							<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900"
								>{user.username}</td
							>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{user.level}</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{user.xp}</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
								{new Date(user.registrationDate).toLocaleDateString()}
							</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap">
								<span
									class={`rounded-full px-2 py-1 text-xs font-medium 
                                ${user.admin ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}
								>
									{user.admin ? 'Admin' : 'User'}
								</span>
							</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
								{#if !user.admin}
									<form
										method="POST"
										action="?/removeUser"
										onsubmit={(e) => {
											if (!confirm('Are you sure you want to remove this user?')) {
												e.preventDefault();
												return false;
											}
											return true;
										}}
									>
										<input type="hidden" name="userId" value={user.id} />
										<button type="submit" class="cursor-pointer text-red-600 hover:text-red-800"
											>Remove</button
										>
									</form>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
