<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="flex min-h-full flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
			Create your account
		</h2>
		<p class="mt-2 text-center text-sm text-gray-600">
			Or
			<a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
				sign in to your account
			</a>
		</p>
	</div>

	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
			<form class="space-y-6" method="POST" action="?/register" use:enhance>
				{#if form?.message}
					<div class="rounded-md bg-red-50 p-4">
						<div class="flex">
							<div class="text-sm text-red-700">
								{form.message}
							</div>
						</div>
					</div>
				{/if}

				<div>
					<label for="username" class="block text-sm font-medium text-gray-700"> Username </label>
					<div class="mt-1">
						<input
							id="username"
							name="username"
							type="text"
							required
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
						/>
					</div>
				</div>

				<div>
					<label for="fullname" class="block text-sm font-medium text-gray-700"> Fullname </label>
					<div class="mt-1">
						<input
							id="fullname"
							name="fullname"
							type="text"
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
						/>
					</div>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
					<div class="mt-1">
						<input
							id="password"
							name="password"
							type="password"
							required
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
						/>
					</div>
				</div>

				<div>
					<label for="confirm_password" class="block text-sm font-medium text-gray-700">
						Confirm Password
					</label>
					<div class="mt-1">
						<input
							id="confirm_password"
							name="confirm_password"
							type="password"
							required
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
						/>
					</div>
				</div>

				<div>
					<button type="submit" class="btn primary w-full"> Register </button>
				</div>
			</form>
		</div>
	</div>
</div>
