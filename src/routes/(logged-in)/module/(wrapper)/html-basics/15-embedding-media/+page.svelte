<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';
	import JsCodeEditor from '$lib/components/code/JsCodeEditor.svelte';
	import HtmlPreview from '$lib/components/code/HtmlPreview.svelte';
	import type { ValidationError } from '$lib/utils/htmlValidator';

	const sectionData: Section = {
		title: 'Embedding Media'
	};

	let { data }: PageProps = $props();

	const sectionIndex = data.section.index;
	const userId = data.user.id;
	const moduleId = data.module.data.url;

	const taskProps = {
		section: { ...sectionData, ...data.section.meta },
		nextSection: data.module.sections[sectionIndex + 1],
		prevSection: data.module.sections[sectionIndex - 1],
		completed: data.section.completed,
		completedNow: true,
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
	};

	// Example code samples for users to try
	let videoExampleCode = `<video controls width="400">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  <p>Your browser doesn't support HTML5 video. Here is a <a href="https://www.w3schools.com/html/mov_bbb.mp4">link to the video</a> instead.</p>
</video>`;

	let audioExampleCode = `<audio controls>
  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
  <p>Your browser doesn't support HTML5 audio. Here is a <a href="https://www.w3schools.com/html/horse.mp3">link to the audio</a> instead.</p>
</audio>`;

	let iframeExampleCode = `<iframe 
      width="400" 
      height="225" 
      src="https://www.youtube.com/embed/qoqYMv_V_3o" 
      title="Inspirational Talk" 
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>`;
	let currentPreviewCode = $state(videoExampleCode);
	let validationErrors = $state<ValidationError[]>([]);
</script>

<ModuleTask {...taskProps}>
	<div class="space-y-6">
		<section>
			<h3 class="mb-3 text-xl font-semibold">Embedding Media in Web Pages</h3>
			<p class="text-lg">
				Modern websites often include various types of media content—videos, audio, interactive
				maps, social media posts, and more. HTML5 provides powerful elements for embedding media
				directly into web pages, allowing users to consume content without leaving your site.
			</p>

			<div class="mt-4 rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
				<p class="text-lg">
					In this section, we'll explore three key elements for embedding media: <code
						>&lt;video&gt;</code
					>, <code>&lt;audio&gt;</code>, and <code>&lt;iframe&gt;</code>. We'll also cover best
					practices for optimizing these elements for performance, accessibility, and user
					experience.
				</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">The &lt;video&gt; Element: Embedding Videos</h3>
			<p class="text-lg">
				HTML5's <code>&lt;video&gt;</code> element allows you to embed video content directly in your
				webpage without requiring third-party plugins like Flash. This native support provides better
				performance, accessibility, and integration with the rest of your HTML content.
			</p>

			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<h4 class="mb-2 font-semibold text-indigo-700">Basic Video Syntax</h4>
					<div class="rounded bg-gray-100 p-4 font-mono text-sm">
						<pre>&lt;video width="320" height="240" controls&gt;
  &lt;source src="movie.mp4" type="video/mp4"&gt;
  &lt;source src="movie.webm" type="video/webm"&gt;
  Your browser does not support the video tag.
&lt;/video&gt;</pre>
					</div>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<h4 class="mb-2 font-semibold text-indigo-700">Key Video Attributes</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>controls</strong> - Displays the video controls (play, pause, volume)</li>
						<li>
							<strong>autoplay</strong> - Starts playing the video automatically (use with caution)
						</li>
						<li><strong>muted</strong> - Mutes the audio output (often used with autoplay)</li>
						<li><strong>loop</strong> - Replays the video when it finishes</li>
						<li><strong>poster="image.jpg"</strong> - Displays an image before the video plays</li>
						<li><strong>preload</strong> - Hints how much buffering the video needs</li>
					</ul>
				</div>
			</div>

			<div class="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
				<h4 class="font-semibold">Multiple Sources for Compatibility</h4>
				<p class="mt-2">
					Different browsers support different video formats. By providing multiple
					<code>&lt;source&gt;</code> elements with different formats, you ensure compatibility across
					browsers. Common formats include:
				</p>
				<ul class="mt-2 list-disc pl-6">
					<li><strong>MP4</strong> (.mp4) - Widely supported in modern browsers</li>
					<li><strong>WebM</strong> (.webm) - Open format with excellent compression</li>
					<li><strong>Ogg</strong> (.ogv) - Free open container format</li>
				</ul>
				<p class="mt-2">
					The browser will use the first format it supports, falling back to subsequent options if
					needed.
				</p>
			</div>

			<div class="mt-4 border-l-4 border-amber-400 bg-amber-50 p-4">
				<h4 class="font-semibold">Accessibility Considerations</h4>
				<p class="mt-2">Videos should be accessible to all users. Consider including:</p>
				<ul class="mt-2 list-disc pl-6">
					<li>Captions via <code>&lt;track kind="captions" src="captions.vtt"&gt;</code></li>
					<li>Transcripts for users who can't watch the video</li>
					<li>Audio descriptions for visual content</li>
					<li>Keyboard-accessible controls</li>
				</ul>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">The &lt;audio&gt; Element: Embedding Sound</h3>
			<p class="text-lg">
				The <code>&lt;audio&gt;</code> element works similarly to the video element but is specifically
				designed for sound content like music, podcasts, or sound effects.
			</p>

			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<h4 class="mb-2 font-semibold text-indigo-700">Basic Audio Syntax</h4>
					<div class="rounded bg-gray-100 p-4 font-mono text-sm">
						<pre>&lt;audio controls&gt;
  &lt;source src="audio.mp3" type="audio/mpeg"&gt;
  &lt;source src="audio.ogg" type="audio/ogg"&gt;
  Your browser does not support the audio element.
&lt;/audio&gt;</pre>
					</div>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<h4 class="mb-2 font-semibold text-indigo-700">Key Audio Attributes</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>controls</strong> - Displays audio controls (play, pause, volume)</li>
						<li><strong>autoplay</strong> - Starts playing automatically (use sparingly)</li>
						<li><strong>muted</strong> - Mutes the audio output</li>
						<li><strong>loop</strong> - Replays the audio when it finishes</li>
						<li><strong>preload</strong> - Hints how much buffering the audio needs</li>
					</ul>
				</div>
			</div>

			<div class="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
				<h4 class="font-semibold">Audio Format Compatibility</h4>
				<p class="mt-2">
					Just like video, different browsers support different audio formats. Common audio formats
					include:
				</p>
				<ul class="mt-2 list-disc pl-6">
					<li><strong>MP3</strong> (.mp3) - Widely supported compressed audio format</li>
					<li>
						<strong>WAV</strong> (.wav) - Uncompressed audio with high quality but large file size
					</li>
					<li>
						<strong>Ogg Vorbis</strong> (.ogg) - Free, open-source alternative to MP3 with good compression
					</li>
				</ul>
			</div>

			<div class="mt-4 border-l-4 border-red-400 bg-red-50 p-4">
				<h4 class="font-semibold">Important Consideration</h4>
				<p class="mt-2">
					Auto-playing audio can be very disruptive to users, especially those using screen readers
					or those in quiet environments. As a best practice, avoid using <code>autoplay</code> for audio
					elements unless absolutely necessary for your application (like a music player).
				</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">
				The &lt;iframe&gt; Element: Embedding External Content
			</h3>
			<p class="text-lg">
				The <code>&lt;iframe&gt;</code> (inline frame) element allows you to embed another HTML document
				within your current HTML document. This is commonly used for embedding content from other sources
				like YouTube videos, Google Maps, social media posts, and more.
			</p>

			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<h4 class="mb-2 font-semibold text-indigo-700">Basic iframe Syntax</h4>
					<div class="rounded bg-gray-100 p-4 font-mono text-sm">
						<pre>&lt;iframe
  src="https://www.example.com"
  width="400"
  height="300"
  title="Example Website"&gt;
&lt;/iframe&gt;</pre>
					</div>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<h4 class="mb-2 font-semibold text-indigo-700">Key iframe Attributes</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>src</strong> - URL of the page to embed</li>
						<li><strong>width, height</strong> - Dimensions of the frame</li>
						<li><strong>title</strong> - Accessible title (important for screen readers)</li>
						<li>
							<strong>allowfullscreen</strong> - Allows the iframe to be displayed in fullscreen mode
						</li>
						<li>
							<strong>sandbox</strong> - Restricts capabilities of the embedded content for security
							(e.g.,
							<code>sandbox="allow-scripts"</code>)
						</li>
					</ul>
				</div>
			</div>

			<div class="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
				<h4 class="font-semibold">Common iframe Use Cases</h4>
				<div class="mt-2 grid gap-4 md:grid-cols-2">
					<div class="rounded bg-white p-3">
						<h5 class="font-medium text-indigo-700">YouTube Videos</h5>
						<div class="mt-1 rounded bg-gray-100 p-2 font-mono text-xs">
							<pre>&lt;iframe
  width="560" height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="YouTube video"
  allowfullscreen&gt;
&lt;/iframe&gt;</pre>
						</div>
					</div>
					<div class="rounded bg-white p-3">
						<h5 class="font-medium text-indigo-700">Google Maps</h5>
						<div class="mt-1 rounded bg-gray-100 p-2 font-mono text-xs">
							<pre>&lt;iframe
  width="400" height="300"
  src="https://maps.google.com/maps?q=eiffel+tower&output=embed"
  title="Google Maps - Eiffel Tower"&gt;
&lt;/iframe&gt;</pre>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-4 border-l-4 border-red-400 bg-red-50 p-4">
				<h4 class="font-semibold">Security Considerations</h4>
				<p class="mt-2">
					iframes can pose security risks since they load content from external sources. Consider
					these security practices:
				</p>
				<ul class="mt-2 list-disc pl-6">
					<li>
						Use the <code>sandbox</code> attribute to restrict capabilities (e.g.,
						<code>sandbox="allow-scripts allow-same-origin"</code>)
					</li>
					<li>
						Add <code>rel="noreferrer noopener"</code> to links that open iframes
					</li>
					<li>Only embed content from trusted sources</li>
					<li>
						Consider using <code>loading="lazy"</code> to improve performance
					</li>
				</ul>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Best Practices for Media Optimization</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border border-green-200 bg-green-50 p-5">
					<h4 class="mb-2 font-semibold text-green-700">Performance Optimization</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>Compress media files</strong> to reduce file size</li>
						<li><strong>Use appropriate formats</strong> for different browsers</li>
						<li><strong>Specify width and height</strong> to prevent layout shifts</li>
						<li><strong>Use thumbnails or posters</strong> that load first</li>
						<li>
							<strong>Use lazy loading</strong> with <code>loading="lazy"</code> attribute for below-the-fold
							media
						</li>
						<li>
							<strong>Consider serving different files</strong> based on connection speed or device capabilities
						</li>
					</ul>
				</div>

				<div class="rounded-lg border border-indigo-200 bg-indigo-50 p-5">
					<h4 class="mb-2 font-semibold text-indigo-700">Accessibility Best Practices</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>Always include alternative content</strong> within media elements</li>
						<li><strong>Add captions and transcripts</strong> for audio and video content</li>
						<li><strong>Include a title attribute</strong> for iframes</li>
						<li>
							<strong>Ensure media controls are keyboard accessible</strong> by including the
							<code>controls</code> attribute
						</li>
						<li><strong>Avoid autoplay</strong> for audio or video with sound</li>
						<li><strong>Test with screen readers</strong> to verify accessibility</li>
					</ul>
				</div>
			</div>

			<div class="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-5">
				<h4 class="mb-2 font-semibold text-amber-700">Responsive Media</h4>
				<p class="mt-2">Make your media responsive to work well on any device size:</p>
				<div class="mt-3 rounded bg-white p-3 font-mono text-sm">
					<pre>&lt;!-- Responsive video container --&gt;
&lt;div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;"&gt;
  &lt;iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    title="YouTube Video"
    allowfullscreen&gt;
  &lt;/iframe&gt;
&lt;/div&gt;

&lt;!-- Responsive image with max-width --&gt;
&lt;img src="image.jpg" alt="Description" style="max-width: 100%; height: auto;"&gt;</pre>
				</div>
				<p class="mt-3">
					The padding-bottom percentage creates a 16:9 aspect ratio container. For a 4:3 ratio, use
					75% instead of 56.25%.
				</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Try It Yourself</h3>
			<p class="text-lg">
				Experiment with the different media elements below. Select an example, view the code, and
				see how it renders in the preview.
			</p>

			<div class="mt-4 flex flex-wrap gap-3">
				<button
					class="btn rounded-md border border-indigo-300 bg-indigo-50 px-4 py-2 hover:bg-indigo-100"
					onclick={() => (currentPreviewCode = videoExampleCode)}
				>
					Video Example
				</button>
				<button
					class="btn rounded-md border border-indigo-300 bg-indigo-50 px-4 py-2 hover:bg-indigo-100"
					onclick={() => (currentPreviewCode = audioExampleCode)}
				>
					Audio Example
				</button>
				<button
					class="btn rounded-md border border-indigo-300 bg-indigo-50 px-4 py-2 hover:bg-indigo-100"
					onclick={() => (currentPreviewCode = iframeExampleCode)}
				>
					iFrame Example
				</button>
			</div>

			<div class="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
				<div class="flex flex-col">
					<h4 class="mb-3 font-semibold">Code</h4>
					<div class="editor-container flex-1">
						{#key currentPreviewCode}
							<JsCodeEditor bind:value={currentPreviewCode} />
						{/key}
					</div>
				</div>

				<div class="flex flex-col">
					<h4 class="mb-3 font-semibold">Preview</h4>
					<div class="preview-container flex-1">
						<HtmlPreview htmlCode={currentPreviewCode} height="100%" {validationErrors} />
					</div>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Using Third-Party Embeds Responsibly</h3>
			<p class="text-lg">
				Many websites rely on third-party embeds for media content. When using these, be aware of:
			</p>

			<div class="mt-2 space-y-3">
				<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
					<h4 class="font-semibold">Privacy Implications</h4>
					<p>
						Third-party embeds can track your users. Consider using a two-click solution or
						privacy-focused embedding options when available.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
					<h4 class="font-semibold">Performance Impact</h4>
					<p>
						External embeds can slow down your page. Use lazy loading and consider the number of
						embeds on a single page.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4">
					<h4 class="font-semibold">Content Reliability</h4>
					<p>
						If the third-party service goes down, your embedded content will be unavailable. Always
						have fallback options.
					</p>
				</div>
			</div>
		</section>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Additional Resources</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Documentation</h4>
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
					<h4 class="mb-2 font-semibold">Tools</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a href="https://ffmpeg.org/" target="_blank" class="text-indigo-600 hover:underline"
								>FFmpeg</a
							> - Convert and optimize video/audio formats
						</li>
						<li>
							<a
								href="https://handbrake.fr/"
								target="_blank"
								class="text-indigo-600 hover:underline">HandBrake</a
							> - Video transcoder with presets for web
						</li>
						<li>
							<a
								href="https://web.dev/fast/#optimize-your-images"
								target="_blank"
								class="text-indigo-600 hover:underline">Web.dev Media Optimization Guide</a
							>
						</li>
						<li>
							<a
								href="https://developer.vimeo.com/player/sdk"
								target="_blank"
								class="text-indigo-600 hover:underline">Vimeo Player SDK</a
							> - For custom video embedding
						</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</ModuleTask>

<style>
	code {
		font-family: monospace;
		background-color: #f3f4f6;
		padding: 0.1rem 0.3rem;
		border-radius: 0.25rem;
	}

	pre {
		white-space: pre-wrap;
		word-wrap: break-word;
		overflow-x: auto;
		max-width: 100%;
	}

	.rounded.bg-gray-100 {
		overflow-x: auto;
	}

	.editor-container {
		height: 25rem;
	}

	.preview-container {
		height: 25rem;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		overflow: hidden;
	}
</style>
