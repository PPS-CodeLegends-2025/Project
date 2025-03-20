<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let loading = false;
</script>

<div class="login-container">
	<div class="login-card">
		<h1>Login</h1>

		{#if form?.message}
			<div class="error-message">{form.message}</div>
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
			<div class="form-group">
				<label for="username">Username</label>
				<input
					type="text"
					id="username"
					name="username"
					required
					autocomplete="username"
					disabled={loading}
				/>
			</div>

			<div class="form-group">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					autocomplete="current-password"
					disabled={loading}
				/>
			</div>

			<div class="form-footer">
				<a href="/forgot-password" class="forgot-password">Forgot password?</a>
			</div>

			<button type="submit" class="btn primary w-full" disabled={loading}>
				{loading ? 'Logging in...' : 'Login'}
			</button>
		</form>

		<div class="register-link">
			Don't have an account? <a href="/register">Create one</a>
		</div>
	</div>
</div>

<style>
	.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding: 1rem;
		background-color: #f9fafb;
	}

	.login-card {
		background-color: white;
		padding: 2rem;
		border-radius: 0.5rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		width: 100%;
		max-width: 400px;
	}

	h1 {
		margin: 0 0 1.5rem 0;
		text-align: center;
		font-size: 1.5rem;
		color: #111827;
	}

	.form-group {
		margin-bottom: 1rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: #4b5563;
	}

	input {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #d1d5db;
		border-radius: 0.375rem;
		font-size: 1rem;
	}

	input:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
	}

	.form-footer {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;
	}

	.forgot-password {
		font-size: 0.875rem;
		color: #3b82f6;
		text-decoration: none;
	}

	.error-message {
		background-color: #fee2e2;
		color: #b91c1c;
		padding: 0.75rem;
		border-radius: 0.375rem;
		margin-bottom: 1rem;
		font-size: 0.875rem;
	}

	.register-link {
		margin-top: 1.5rem;
		text-align: center;
		font-size: 0.875rem;
		color: #4b5563;
	}

	.register-link a {
		color: #3b82f6;
		text-decoration: none;
		font-weight: 500;
	}
</style>
