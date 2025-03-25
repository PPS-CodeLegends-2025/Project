<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();

	let loading = $state(false);
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-50 p-4">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
		<h1 class="mb-6 text-center text-2xl text-gray-900">Login</h1>

		{#if form?.message}
			<div class="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700">
				{form.message}
			</div>
		{/if}

		<form
			method="POST"
			action="?/login"
			use:enhance={() => {
				loading = true;

				return async ({ update }) => {
					loading = false;
					await update();
				};
			}}
		>
			<div class="mb-4">
				<label for="username" class="mb-2 block text-sm font-medium text-gray-600">
					Username
				</label>
				<input
					type="text"
					id="username"
					name="username"
					required
					autocomplete="username"
					disabled={loading}
					class="input w-full"
				/>
			</div>

			<div class="mb-4">
				<label for="password" class="mb-2 block text-sm font-medium text-gray-600">
					Password
				</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					autocomplete="current-password"
					disabled={loading}
					class="input w-full"
				/>
			</div>

			<div class="mb-4 flex justify-end">
				<!-- <a href="/forgot-password" class="text-sm text-indigo-500 hover:text-indigo-600">
					Forgot password?
				</a> -->
			</div>

			<button type="submit" class="btn primary w-full" disabled={loading}>
				{loading ? 'Logging in...' : 'Login'}
			</button>
		</form>

		<div class="mt-6 text-center text-sm text-gray-600">
			Don't have an account?
			<a href="/register" class="font-medium text-indigo-500 hover:text-indigo-600"> Create one </a>
		</div>
	</div>
</div>
