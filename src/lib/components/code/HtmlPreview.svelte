<script lang="ts">
	import { onMount } from 'svelte';
	import type { ValidationError } from '$lib/utils/htmlValidator';

	interface Props {
		htmlCode: string;
		height?: string;
		validationErrors?: ValidationError[];
	}

	let { htmlCode, height = '100%', validationErrors = [] }: Props = $props();

	let iframe: HTMLIFrameElement;
	let errors = $state<Array<{ element: string; message: string }>>([]);
	let warnings = $state<Array<{ element: string; message: string }>>([]);
	let showErrors = $state(false);
	let lastRenderedCode = '';

	function updatePreview() {
		if (!iframe || lastRenderedCode === htmlCode) return;

		lastRenderedCode = htmlCode;

		// Process validation errors separately from rendering
		processValidationErrors();

		const doc = iframe.contentDocument || iframe.contentWindow?.document;
		if (!doc) return;

		try {
			doc.open();
			doc.write(htmlCode);
			doc.close();

			requestAnimationFrame(() => {
				if (doc.body) {
					setupErrorHandlers(doc);
					checkLoadedResources(doc);
				}
			});
		} catch (error: unknown) {
			console.error('Error rendering HTML:', error);
			errors = [
				...errors,
				{
					element: 'document',
					message: `Error rendering HTML: ${error instanceof Error ? error.message : String(error)}`
				}
			];
		}
	}

	function processValidationErrors() {
		if (validationErrors && validationErrors.length > 0) {
			const validationErrorMessages = validationErrors.map((err) => ({
				element: err.element || 'Unknown element',
				message: err.message
			}));

			errors = [
				...errors.filter((err) => !err.message.includes('validation error')),
				...validationErrorMessages
			];

			if (validationErrorMessages.length > 0) {
				showErrors = true;
			}
		}
	}

	function setupErrorHandlers(doc: Document) {
		doc.querySelectorAll('img').forEach((img) => {
			img.onerror = () => {
				errors = [
					...errors,
					{
						element: img.outerHTML,
						message: `Failed to load image: ${img.src}`
					}
				];
			};
		});

		doc.querySelectorAll('a[href^="http"]').forEach((link) => {
			warnings = [
				...warnings,
				{
					element: link.outerHTML,
					message: `External link will open in a new tab in the preview`
				}
			];

			link.setAttribute('target', '_blank');
			link.setAttribute('rel', 'noopener noreferrer');
		});
	}

	function checkLoadedResources(doc: Document) {
		doc.querySelectorAll('img').forEach((img) => {
			if (img.complete && img.naturalHeight === 0) {
				errors = [
					...errors,
					{
						element: img.outerHTML,
						message: `Image could not be loaded: ${img.src}`
					}
				];
			}
		});
	}

	$effect(() => {
		if (htmlCode !== lastRenderedCode) {
			updatePreview();
		}
	});

	$effect(() => {
		if (validationErrors && validationErrors.length > 0) {
			processValidationErrors();
		}
	});

	onMount(() => {
		if (htmlCode) {
			updatePreview();
		}

		return () => {
			errors = [];
			warnings = [];
		};
	});
</script>

<div class="html-preview-container" style="height: {height};">
	<iframe
		bind:this={iframe}
		title="HTML Preview"
		sandbox="allow-scripts allow-same-origin"
		class="html-preview-iframe"
	></iframe>

	{#if errors.length > 0 || warnings.length > 0}
		<div class="preview-notification">
			<button class="notification-toggle" onclick={() => (showErrors = !showErrors)}>
				{#if errors.length > 0}
					🔴 {errors.length} error{errors.length > 1 ? 's' : ''}
				{:else if warnings.length > 0}
					⚠️ {warnings.length} warning{warnings.length > 1 ? 's' : ''}
				{/if}
				{showErrors ? '▲' : '▼'}
			</button>

			{#if showErrors}
				<div class="notification-details">
					{#if errors.length > 0}
						<h4>Errors:</h4>
						<ul class="error-list">
							{#each errors as error (error)}
								<li class="error-item">
									<div class="error-message">{error.message}</div>
									<div class="error-element">{error.element}</div>
								</li>
							{/each}
						</ul>
					{/if}

					{#if warnings.length > 0}
						<h4>Warnings:</h4>
						<ul class="warning-list">
							{#each warnings as warning (warning)}
								<li class="warning-item">
									<div class="warning-message">{warning.message}</div>
									<div class="warning-element">{warning.element}</div>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.html-preview-container {
		position: relative;
		width: 100%;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		overflow: hidden;
		background-color: white;
	}

	.html-preview-iframe {
		width: 100%;
		height: 100%;
		border: none;
		padding-bottom: 2.5rem;
	}

	.preview-notification {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(255, 255, 255, 0.95);
		border-top: 1px solid #d1d5db;
		max-height: 60%;
		display: flex;
		flex-direction: column;
	}

	.notification-toggle {
		width: 100%;
		padding: 0.5rem;
		background-color: #f3f4f6;
		border: none;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		font-weight: bold;
		z-index: 10;
	}

	.notification-details {
		padding: 0.5rem;
		max-height: 150px;
		overflow-y: auto;
		background-color: white;
		box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
	}

	.html-preview-container:has(.preview-notification .notification-details) .html-preview-iframe {
		height: calc(100% - 2.5rem);
	}

	.html-preview-iframe {
		height: calc(100% - 2.5rem);
	}

	.error-list,
	.warning-list {
		list-style: none;
		padding: 0;
		margin: 0.5rem 0;
	}

	.error-item,
	.warning-item {
		padding: 0.5rem;
		margin-bottom: 0.5rem;
		border-radius: 0.25rem;
	}

	.error-item {
		background-color: rgba(239, 68, 68, 0.1);
		border-left: 3px solid #ef4444;
	}

	.warning-item {
		background-color: rgba(245, 158, 11, 0.1);
		border-left: 3px solid #f59e0b;
	}

	.error-message,
	.warning-message {
		font-weight: bold;
		margin-bottom: 0.25rem;
	}

	.error-element,
	.warning-element {
		font-family: monospace;
		font-size: 0.8rem;
		overflow-x: auto;
		white-space: nowrap;
		padding: 0.25rem;
		background-color: rgba(0, 0, 0, 0.05);
		border-radius: 0.25rem;
	}
</style>
