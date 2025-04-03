<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { Accordion, AccordionItem } from '$lib/components/ui/accordion';
	import JsCodeEditor from '$lib/components/code/JsCodeEditor.svelte';
	import { modules } from '$lib/client/services/modules';
	import { onMount } from 'svelte';
	import { validateHtml, createCustomCheck, type ValidationResult } from '$lib/utils/htmlValidator';
	import HtmlPreview from '$lib/components/code/HtmlPreview.svelte';
	import type { ValidationError } from '$lib/utils/htmlValidator';

	const sectionData: Section = {
		title: 'Recipe Webpage Project'
	};

	let { data }: PageProps = $props();

	const sectionIndex = data.section.index;
	const userId = data.user.id;
	const moduleId = data.module.data.url;

	let htmlCode = $state(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Recipe</title>
</head>
<body>
  <!-- Create your recipe page here -->
  
</body>
</html>`);

	let taskCompleted = $state(false);
	let submissionResult = $state<ValidationResult | null>(null);
	let validationErrors = $state<ValidationError[]>([]);

	const validateHtmlForRecipe = (code: string) => {
		const customChecks = [
			createCustomCheck(
				'heading1',
				'Your recipe needs a main title using an <h1> element.',
				/<h1[^>]*>.*?<\/h1>/i
			),
			createCustomCheck(
				'heading2',
				'Add section headings using <h2> elements for ingredients and preparation steps.',
				/<h2[^>]*>.*?<\/h2>/i
			),
			createCustomCheck(
				'unorderedList',
				'Your recipe should have at least one list (<ul> or <ol>) for ingredients or steps.',
				/<(ul|ol)[^>]*>.*?<\/(ul|ol)>/is
			),
			createCustomCheck(
				'listItems',
				'Add list items (<li>) to your ingredients or preparation steps lists.',
				/<li[^>]*>.*?<\/li>/i
			),
			createCustomCheck(
				'image',
				'Add an image of your dish using the <img> element.',
				/<img[^>]*src=["'][^"']*["'][^>]*>/i
			),
			createCustomCheck(
				'altText',
				'Remember to include alt text for your image for accessibility.',
				/<img[^>]*alt=["'][^"']*["'][^>]*>/i
			),
			createCustomCheck(
				'link',
				'Include a link (<a>) to a related recipe or cooking website.',
				/<a[^>]*href=["'][^"']*["'][^>]*>.*?<\/a>/i
			),
			createCustomCheck(
				'ingredients',
				'Make sure to include a section for ingredients.',
				/ingredients/i
			),
			createCustomCheck(
				'directions',
				'Make sure to include a section for preparation steps/directions.',
				/(directions|instructions|steps|preparation)/i
			),
			createCustomCheck(
				'personalizedContent',
				'Add more details to make this recipe page your own!',
				(code) => code.length > 300
			)
		];

		const result = validateHtml(code, customChecks);

		if (result.success) {
			taskCompleted = true;
		}

		return result;
	};

	const handleSubmit = () => {
		try {
			submissionResult = validateHtmlForRecipe(htmlCode);

			validationErrors = submissionResult.errors || [];

			if (!submissionResult.success) {
				submissionResult = null;
			}
		} catch (error) {
			console.error('Error in recipe HTML validation:', error);
			validationErrors = [];
		}
	};

	$effect(() => {});

	onMount(() => {});

	const taskProps = $derived({
		section: { ...sectionData, ...data.section.meta },
		nextSection: data.module.sections[sectionIndex + 1],
		prevSection: data.module.sections[sectionIndex - 1],
		completed: data.section.completed,
		completedNow: taskCompleted,
		module: data.module.data,
		currentSectionIndex: sectionIndex,
		totalSections: data.module.sections.length,
		onMarkAsCompleted: async () => {
			try {
				await modules.markSectionCompleted(userId, moduleId, sectionIndex);
			} catch (error) {
				console.error('Failed to mark as completed:', error);
			}
		}
	});

	const recipeImageUrls = [
		'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
		'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
		'https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
	];
</script>

<ModuleTask {...taskProps}>
	<div class="space-y-6">
		<section>
			<h3 class="mb-3 text-xl font-semibold">Create a Recipe Webpage</h3>
			<p class="text-lg">
				Now it's time to apply what you've learned about HTML elements to create something
				delicious—a webpage that showcases a favorite recipe! This project will help you practice
				using headings, lists, images, and links together in a real-world context.
			</p>
			<p class="mt-2 text-lg">
				Whether it's your grandmother's secret chocolate chip cookies, a refreshing summer salad, or
				your signature pasta dish, this is your chance to document it with HTML.
			</p>
		</section>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
			<h4 class="font-semibold">✨ Your Project Requirements:</h4>
			<p>Create a recipe webpage that includes:</p>
			<ul class="mt-2 ml-6 list-disc">
				<li>A main heading (<code class="code">&lt;h1&gt;</code>) with the recipe name</li>
				<li>
					Subheadings (<code class="code">&lt;h2&gt;</code>) for different sections (ingredients,
					preparation, etc.)
				</li>
				<li>An unordered list (<code class="code">&lt;ul&gt;</code>) for ingredients</li>
				<li>An ordered list (<code class="code">&lt;ol&gt;</code>) for preparation steps</li>
				<li>
					At least one image (<code class="code">&lt;img&gt;</code>) of the dish with descriptive
					alt text
				</li>
				<li>
					A link (<code class="code">&lt;a&gt;</code>) to another cooking website or similar recipe
				</li>
				<li>
					Paragraphs (<code class="code">&lt;p&gt;</code>) describing the recipe, its history, or
					why you like it
				</li>
			</ul>
			<p class="mt-3 italic">
				Make it personal and delicious! Your recipe should tell a story through its structure and
				content.
			</p>
		</div>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Project Ideas</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div class="rounded-lg border border-amber-200 bg-amber-50 p-3 shadow-sm">
					<h4 class="font-medium text-amber-700">Family Recipes</h4>
					<ul class="mt-1 list-disc pl-5 text-sm">
						<li>Traditional family dishes</li>
						<li>Holiday specialties</li>
						<li>Recipes passed through generations</li>
					</ul>
				</div>
				<div class="rounded-lg border border-green-200 bg-green-50 p-3 shadow-sm">
					<h4 class="font-medium text-green-700">Quick & Easy Meals</h4>
					<ul class="mt-1 list-disc pl-5 text-sm">
						<li>5-ingredient recipes</li>
						<li>30-minute dinners</li>
						<li>One-pot or one-pan dishes</li>
					</ul>
				</div>
				<div class="rounded-lg border border-blue-200 bg-blue-50 p-3 shadow-sm">
					<h4 class="font-medium text-blue-700">Special Diets</h4>
					<ul class="mt-1 list-disc pl-5 text-sm">
						<li>Vegetarian or vegan recipes</li>
						<li>Gluten-free options</li>
						<li>Health-focused dishes</li>
					</ul>
				</div>
			</div>
		</section>

		<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
			<div class="flex flex-col">
				<h4 class="mb-3 font-semibold">Code Editor</h4>
				<div class="editor-container">
					<JsCodeEditor bind:value={htmlCode} />
				</div>

				<div class="mt-4 flex justify-end">
					<button class="btn primary" onclick={() => handleSubmit()}>Submit</button>
				</div>

				{#if submissionResult && submissionResult.success}
					<div class="box success mt-4">
						{submissionResult.message}
					</div>
				{/if}
			</div>

			<div class="flex flex-col">
				<h4 class="mb-3 font-semibold">Preview</h4>
				<div class="preview-container">
					<HtmlPreview {htmlCode} height="100%" {validationErrors} />
				</div>

				<Accordion className="mt-4">
					<AccordionItem value="hint1">
						<svelte:fragment slot="trigger">Hint: Recipe Page Structure</svelte:fragment>
						<div class="hint-card">
							<p>A well-organized recipe page typically follows this structure:</p>
							<pre class="code mt-2 rounded p-2">
&lt;h1&gt;Recipe Name&lt;/h1&gt;

&lt;img src="recipe-image.jpg" alt="Description of the dish"&gt;

&lt;p&gt;Brief introduction or history of the recipe&lt;/p&gt;

&lt;h2&gt;Ingredients&lt;/h2&gt;
&lt;ul&gt;
  &lt;li&gt;Ingredient 1&lt;/li&gt;
  &lt;li&gt;Ingredient 2&lt;/li&gt;
  &lt;!-- More ingredients... --&gt;
&lt;/ul&gt;

&lt;h2&gt;Preparation Steps&lt;/h2&gt;
&lt;ol&gt;
  &lt;li&gt;First step...&lt;/li&gt;
  &lt;li&gt;Second step...&lt;/li&gt;
  &lt;!-- More steps... --&gt;
&lt;/ol&gt;

&lt;p&gt;Final notes or serving suggestions&lt;/p&gt;

&lt;p&gt;Check out &lt;a href="https://example.com"&gt;similar recipes&lt;/a&gt;.&lt;/p&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint2">
						<svelte:fragment slot="trigger">Hint: Using Images</svelte:fragment>
						<div class="hint-card">
							<p>
								You can use images from the web by linking to their URL. Here are some example food
								images you could use:
							</p>
							<div class="mt-2 grid grid-cols-3 gap-2">
								{#each recipeImageUrls as url, i (i)}
									<div class="text-center">
										<img src={url} alt="Delicious food example" class="h-auto w-full rounded" />
										<button
											class="mt-1 text-xs text-blue-600"
											onclick={() => {
												navigator.clipboard.writeText(url);
												alert('Image URL copied to clipboard!');
											}}>Copy URL</button
										>
									</div>
								{/each}
							</div>
							<p class="mt-2 text-sm">
								Remember to include descriptive alt text for accessibility:
							</p>
							<pre
								class="code mt-1 rounded p-2">&lt;img src="URL_HERE" alt="Freshly baked chocolate chip cookies on a cooling rack"&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint3">
						<svelte:fragment slot="trigger">Hint: Creating Lists</svelte:fragment>
						<div class="hint-card">
							<p>For ingredients, use an unordered list:</p>
							<pre class="code mt-2 rounded p-2">
&lt;h2&gt;Ingredients&lt;/h2&gt;
&lt;ul&gt;
  &lt;li&gt;2 cups all-purpose flour&lt;/li&gt;
  &lt;li&gt;1/2 tsp baking soda&lt;/li&gt;
  &lt;li&gt;1/2 cup butter, melted&lt;/li&gt;
  &lt;li&gt;1 cup packed brown sugar&lt;/li&gt;
  &lt;li&gt;1/2 cup white sugar&lt;/li&gt;
  &lt;li&gt;1 tbsp vanilla extract&lt;/li&gt;
  &lt;li&gt;1 egg&lt;/li&gt;
  &lt;li&gt;1 egg yolk&lt;/li&gt;
  &lt;li&gt;2 cups chocolate chips&lt;/li&gt;
&lt;/ul&gt;</pre>

							<p class="mt-3">For preparation steps, use an ordered list:</p>
							<pre class="code mt-2 rounded p-2">
&lt;h2&gt;Preparation Steps&lt;/h2&gt;
&lt;ol&gt;
  &lt;li&gt;Preheat oven to 325°F (165°C).&lt;/li&gt;
  &lt;li&gt;Mix flour and baking soda in a bowl.&lt;/li&gt;
  &lt;li&gt;In another bowl, cream melted butter and sugars together.&lt;/li&gt;
  &lt;li&gt;Beat in vanilla, egg, and egg yolk until light and creamy.&lt;/li&gt;
  &lt;li&gt;Mix in the dry ingredients until just blended.&lt;/li&gt;
  &lt;li&gt;Stir in chocolate chips by hand.&lt;/li&gt;
  &lt;li&gt;Drop cookie dough onto baking sheets.&lt;/li&gt;
  &lt;li&gt;Bake for 10-12 minutes or until edges are golden.&lt;/li&gt;
&lt;/ol&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint4">
						<svelte:fragment slot="trigger">Hint: Adding Links</svelte:fragment>
						<div class="hint-card">
							<p>Link to other recipe websites or related content:</p>
							<pre class="code mt-2 rounded p-2">
&lt;p&gt;Check out more cookie recipes at 
&lt;a href="https://www.allrecipes.com/recipes/362/desserts/cookies/" target="_blank"&gt;
  AllRecipes
&lt;/a&gt;.
&lt;/p&gt;</pre>
							<p class="mt-2 text-sm">
								The <code>target="_blank"</code> attribute makes the link open in a new tab.
							</p>
						</div>
					</AccordionItem>
				</Accordion>
			</div>
		</div>

		<div class="mt-8 rounded-lg bg-blue-50 p-6">
			<h4 class="font-semibold">Why This Project Matters</h4>
			<p class="mt-2">
				Recipe pages are perfect for practicing HTML because they naturally include various content
				types that require different HTML elements. The structure of a recipe—with its title,
				ingredients list, numbered steps, and images—provides a practical way to apply the HTML
				elements you've learned.
			</p>
			<p class="mt-2">
				This project connects abstract HTML concepts to real-world applications, helping you
				understand how different elements work together to create organized, useful content on the
				web.
			</p>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Further Exploration</h3>
			<p>
				Once you've mastered the basics, consider enhancing your recipe page with these advanced
				features:
			</p>
			<div class="mt-3 grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Additional Elements</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Add a table for nutrition information</li>
						<li>Include preparation time and serving size</li>
						<li>Use <code>&lt;blockquote&gt;</code> for a testimonial or quote</li>
						<li>Add a <code>&lt;footer&gt;</code> with author information</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Real-World Applications</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Recipe blogs use these exact HTML structures</li>
						<li>Food websites organize content using these elements</li>
						<li>Recipe apps preserve this content hierarchy</li>
						<li>Cooking videos often link to structured HTML recipes</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</ModuleTask>

<style>
	.hint-card {
		border-left: 4px solid #3b82f6;
		background-color: #eff6ff;
		padding: 1rem;
		margin-top: 0.5rem;
	}

	.editor-container {
		height: 25rem;
		margin-bottom: 1rem;
	}

	.preview-container {
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		overflow: hidden;
		background-color: white;
		width: 100%;
		height: 25rem;
	}

	.code {
		font-family: monospace;
		background-color: #f3f4f6;
		padding: 0.1rem 0.3rem;
		border-radius: 0.25rem;
	}

	.hint-card pre {
		white-space: pre-wrap;
		word-wrap: break-word;
		overflow-x: auto;
		max-width: 100%;
		margin: 0.5rem 0;
	}

	pre.code {
		display: block;
		padding: 0.75rem;
		line-height: 1.4;
	}

	.hint-card .rounded {
		border-radius: 0.375rem;
	}
</style>
