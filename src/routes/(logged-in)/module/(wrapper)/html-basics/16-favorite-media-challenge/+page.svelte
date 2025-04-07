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
		title: 'Challenge: My Favorite Media'
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
  <title>My Favorite Media</title>
</head>
<body>
  <!-- Create your media showcase page here -->
  
</body>
</html>`);

	let taskCompleted = $state(false);
	let submissionResult = $state<ValidationResult | null>(null);
	let validationErrors = $state<ValidationError[]>([]);

	const validateMediaPage = (code: string) => {
		const customChecks = [
			createCustomCheck(
				'heading1',
				'Your page needs a main title using an <h1> element.',
				/<h1[^>]*>.*?<\/h1>/i
			),
			createCustomCheck(
				'mediaElements',
				'Include at least one media element (<video>, <audio>, or <iframe>).',
				/<(video|audio|iframe)[^>]*>.*?(<\/(video|audio|iframe)>|<\/iframe>)/is
			),
			createCustomCheck(
				'videoElement',
				'Try adding a <video> element with controls.',
				/<video[^>]*controls[^>]*>.*?<\/video>/is
			),
			createCustomCheck(
				'audioElement',
				'Consider adding an <audio> element to showcase music.',
				/<audio[^>]*>.*?<\/audio>/is
			),
			createCustomCheck(
				'iframeElement',
				'You can embed videos from platforms like YouTube using an <iframe>.',
				/<iframe[^>]*>.*?<\/iframe>/is
			),
			createCustomCheck(
				'paragraphDescription',
				'Add descriptions for your media using <p> elements.',
				/<p[^>]*>[\s\S]*?<\/p>/i
			),
			createCustomCheck(
				'sourceElement',
				'Include proper source elements or attributes for your media.',
				/<source[^>]*>|src=["'][^"']*["']/i
			),
			createCustomCheck(
				'accessibility',
				'Remember accessibility: add captions, descriptions, or alt text where appropriate.',
				/<(track|figcaption)[^>]*>|alt=["'][^"']*["']|aria-label=["'][^"']*["']/i
			),
			createCustomCheck(
				'personalizedContent',
				'Add more details to make this media showcase your own!',
				(code) => code.length > 300
			)
		];

		const result = validateHtml(code, customChecks);

		// Basic check: At least one media element AND a description
		const hasAnyMediaElement =
			/<(video|audio|iframe)[^>]*>.*?(<\/(video|audio)>|<\/iframe>)/is.test(code);
		const hasDescription = /<p[\s\S]*?>[\s\S]*?<\/p>/i.test(code);

		// More specific checks
		const mediaElementsCount = (code.match(/<(video|audio|iframe)[^>]*>/gi) || []).length;

		if (result.success && hasAnyMediaElement && hasDescription && mediaElementsCount >= 1) {
			taskCompleted = true;
		}

		return result;
	};

	const handleSubmit = () => {
		try {
			submissionResult = validateMediaPage(htmlCode);

			validationErrors = submissionResult.errors || [];

			if (!submissionResult.success) {
				submissionResult = null;
			}
		} catch (error) {
			console.error('Error in media page validation:', error);
			validationErrors = [];
		}
	};

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

	// Example media sources users can use
	const exampleMedia = {
		video:
			'https://file-examples.com/storage/fe5947fd2362fc197a0b839/2017/04/file_example_MP4_480_1_5MG.mp4',
		audio:
			'https://file-examples.com/storage/fe5947fd2362fc197a0b839/2017/11/file_example_MP3_700KB.mp3',
		youtubeEmbed: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
	};
</script>

<ModuleTask {...taskProps}>
	<div class="space-y-6">
		<section>
			<h3 class="mb-3 text-xl font-semibold">Challenge: My Favorite Media</h3>
			<p class="text-lg">
				Now that you've learned about HTML media elements, it's time to create a showcase of your
				favorite music or videos! This challenge will let you practice using <code
					>&lt;video&gt;</code
				>,
				<code>&lt;audio&gt;</code>, and <code>&lt;iframe&gt;</code> elements to embed media content in
				your webpage.
			</p>
			<p class="mt-2 text-lg">
				You'll create a personally curated media gallery with descriptions for each item.
			</p>
		</section>

		<div class="border-l-4 border-indigo-500 bg-indigo-50 p-4">
			<h4 class="font-semibold">✨ Your Challenge:</h4>
			<p>Create a media showcase page that includes:</p>
			<ul class="mt-2 ml-6 list-disc">
				<li>
					A main heading (<code class="code">&lt;h1&gt;</code>) with an appropriate title
				</li>
				<li>
					At least one embedded media element:
					<ul class="ml-6 list-disc">
						<li>A <code class="code">&lt;video&gt;</code> with controls</li>
						<li>An <code class="code">&lt;audio&gt;</code> player with controls</li>
						<li>
							An embedded YouTube or other video service using <code class="code"
								>&lt;iframe&gt;</code
							>
						</li>
					</ul>
				</li>
				<li>
					Descriptive paragraphs (<code class="code">&lt;p&gt;</code>) for each media element
					explaining why you like it
				</li>
				<li>Proper accessibility features (captions, descriptions, etc.)</li>
				<li>Organized structure with appropriate HTML elements</li>
			</ul>
			<p class="mt-3 italic">
				Make it personal! Share media that you genuinely enjoy and would recommend to others.
			</p>
		</div>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Media Showcase Ideas</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div class="rounded-lg border border-blue-200 bg-blue-50 p-3 shadow-sm">
					<h4 class="font-medium text-blue-700">Music Playlist</h4>
					<ul class="mt-1 list-disc pl-5 text-sm">
						<li>Favorite songs with audio players</li>
						<li>Music video embeds from YouTube</li>
						<li>Album artwork with descriptions</li>
					</ul>
				</div>
				<div class="rounded-lg border border-purple-200 bg-purple-50 p-3 shadow-sm">
					<h4 class="font-medium text-purple-700">Video Collection</h4>
					<ul class="mt-1 list-disc pl-5 text-sm">
						<li>Movie or TV show clips</li>
						<li>Educational videos you recommend</li>
						<li>Short films or animations</li>
					</ul>
				</div>
				<div class="rounded-lg border border-green-200 bg-green-50 p-3 shadow-sm">
					<h4 class="font-medium text-green-700">Mixed Media</h4>
					<ul class="mt-1 list-disc pl-5 text-sm">
						<li>Podcast episodes with commentary</li>
						<li>Audiobooks paired with cover images</li>
						<li>Music with lyrics or sheet music</li>
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
						<svelte:fragment slot="trigger">Hint: Adding Video</svelte:fragment>
						<div class="hint-card">
							<p>You can add a video element with controls like this:</p>
							<pre class="code mt-2 rounded p-2">
&lt;video controls width="400"&gt;
  &lt;source src="{exampleMedia.video}" type="video/mp4"&gt;
  &lt;p&gt;Your browser doesn't support HTML5 video. Here is a &lt;a href="{exampleMedia.video}"&gt;link to the video&lt;/a&gt; instead.&lt;/p&gt;
&lt;/video&gt;

&lt;p&gt;This is one of my favorite videos because...&lt;/p&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint2">
						<svelte:fragment slot="trigger">Hint: Adding Audio</svelte:fragment>
						<div class="hint-card">
							<p>Add an audio player for your favorite music:</p>
							<pre class="code mt-2 rounded p-2">
&lt;h2&gt;My Favorite Song&lt;/h2&gt;

&lt;audio controls&gt;
  &lt;source src="{exampleMedia.audio}" type="audio/mpeg"&gt;
  &lt;p&gt;Your browser doesn't support HTML5 audio. Here is a &lt;a href="{exampleMedia.audio}"&gt;link to the audio&lt;/a&gt; instead.&lt;/p&gt;
&lt;/audio&gt;

&lt;p&gt;I love this song because it always makes me feel...&lt;/p&gt;</pre>
						</div>
					</AccordionItem>

					<AccordionItem value="hint3">
						<svelte:fragment slot="trigger">Hint: Embedding YouTube Videos</svelte:fragment>
						<div class="hint-card">
							<p>Embed a YouTube video using an iframe:</p>
							<pre class="code mt-2 rounded p-2">
&lt;h2&gt;My Favorite YouTube Video&lt;/h2&gt;

&lt;iframe 
  width="400" 
  height="225" 
  src="{exampleMedia.youtubeEmbed}" 
  title="My Favorite Video"
  allowfullscreen&gt;
&lt;/iframe&gt;

&lt;p&gt;This video is amazing because...&lt;/p&gt;</pre>
							<p class="mt-2 text-sm">
								To get your own YouTube embed URL, go to a YouTube video, click "Share" then "Embed"
								and copy the src URL from the provided iframe code.
							</p>
						</div>
					</AccordionItem>

					<AccordionItem value="hint4">
						<svelte:fragment slot="trigger">Hint: Accessibility Tips</svelte:fragment>
						<div class="hint-card">
							<p>Make your media more accessible with these techniques:</p>
							<pre class="code mt-2 rounded p-2">
&lt;!-- For videos, add captions with the track element --&gt;
&lt;video controls&gt;
  &lt;source src="video.mp4" type="video/mp4"&gt;
  &lt;track kind="captions" src="captions.vtt" label="English" default&gt;
  Your browser does not support the video tag.
&lt;/video&gt;

&lt;!-- Use figure and figcaption for better semantics --&gt;
&lt;figure&gt;
  &lt;audio controls src="audio.mp3"&gt;&lt;/audio&gt;
  &lt;figcaption&gt;Artist - Song Name (Album, Year)&lt;/figcaption&gt;
&lt;/figure&gt;

&lt;!-- Add title and aria-label for iframe embeds --&gt;
&lt;iframe 
  src="https://www.youtube.com/embed/video-id" 
  title="Description of video content" 
  aria-label="Embedded video about..."&gt;
&lt;/iframe&gt;</pre>
						</div>
					</AccordionItem>
				</Accordion>
			</div>
		</div>

		<div class="mt-8 rounded-lg bg-blue-50 p-6">
			<h4 class="font-semibold">Why Media Elements Matter</h4>
			<p class="mt-2">
				Media elements transform static web pages into engaging, interactive experiences. By
				embedding audio and video directly in your HTML, you allow users to consume rich content
				without leaving your site.
			</p>
			<p class="mt-2">
				Understanding how to properly implement media elements with appropriate controls and
				accessibility features is essential for creating inclusive web experiences that everyone can
				enjoy.
			</p>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Additional Resources</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">HTML Media Documentation</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN: Video Element</a
							>
						</li>
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN: Audio Element</a
							>
						</li>
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN: iframe Element</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Media Accessibility</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://www.w3.org/WAI/media/av/"
								target="_blank"
								class="text-indigo-600 hover:underline">W3C: Making Audio and Video Accessible</a
							>
						</li>
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video"
								target="_blank"
								class="text-indigo-600 hover:underline">Adding Captions to HTML5 Video</a
							>
						</li>
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
</style>
