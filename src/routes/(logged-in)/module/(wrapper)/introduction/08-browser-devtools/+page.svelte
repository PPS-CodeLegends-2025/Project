<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Browser Developer Tools'
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
</script>

<ModuleTask {...taskProps}>
	<div class="space-y-6">
		<section>
			<h3 class="mb-3 text-xl font-semibold">Introduction to Browser Developer Tools</h3>
			<p class="text-lg">
				Browser Developer Tools are built-in debugging utilities that allow developers to inspect,
				analyze, and modify websites in real-time. They are essential for front-end development,
				debugging, performance optimization, and understanding how websites work behind the scenes.
			</p>
			<p class="mt-2 text-lg">
				Almost every modern browser includes a comprehensive set of developer tools, with Chrome
				DevTools and Firefox DevTools being among the most powerful and widely used.
			</p>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Accessing Developer Tools</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">In Chrome</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>Right-click on any element and select "Inspect"</li>
						<li>Press F12 or Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (macOS)</li>
						<li>Navigate to Menu > More Tools > Developer Tools</li>
						<li>Use Ctrl+Shift+C to directly select an element to inspect</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">In Firefox</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>Right-click and select "Inspect Element"</li>
						<li>Press F12 or Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (macOS)</li>
						<li>Navigate to Menu > More Tools > Web Developer Tools</li>
						<li>Use Ctrl+Shift+C (Windows/Linux) or Cmd+Option+C (macOS) for element selection</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Chrome DevTools in Detail</h3>
			<p class="text-lg">
				Chrome DevTools is Google Chrome's built-in web development and debugging toolkit, offering
				a comprehensive set of features for analyzing web pages, debugging code, and optimizing
				performance.
			</p>

			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Key Panels</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>Elements:</strong> Inspect and modify HTML/CSS in real-time</li>
						<li><strong>Console:</strong> JavaScript console for logging and command execution</li>
						<li><strong>Sources:</strong> Debug JavaScript with breakpoints and source maps</li>
						<li><strong>Network:</strong> Monitor network requests, analyze timing and headers</li>
						<li>
							<strong>Performance:</strong> Analyze runtime performance and identify bottlenecks
						</li>
						<li><strong>Memory:</strong> Identify memory issues and leaks</li>
						<li><strong>Application:</strong> Inspect storage, service workers, and cache</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Unique Features</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>
							<strong>Lighthouse:</strong> Built-in auditing tool for performance, SEO, accessibility
						</li>
						<li><strong>CSS Overview:</strong> Analyze CSS usage across your site</li>
						<li>
							<strong>Rendering:</strong> Visualize paint flashing, FPS meter, and layout issues
						</li>
						<li><strong>Layers:</strong> Visualize composited layers for performance debugging</li>
						<li><strong>WebAuthn:</strong> Debug and test Web Authentication</li>
						<li><strong>Coverage:</strong> See which CSS/JS is actually used</li>
						<li><strong>Issues:</strong> Automatically identify problems in your page</li>
					</ul>
				</div>
			</div>

			<div class="mt-4 rounded-lg border bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Chrome DevTools Workflow Example</h4>
				<ol class="list-decimal space-y-1 pl-5">
					<li>Use Elements panel to inspect HTML structure and CSS styles</li>
					<li>Check Console for errors and warnings affecting the page</li>
					<li>Use Network panel to identify slow requests or missing resources</li>
					<li>Debug JavaScript with breakpoints in Sources panel</li>
					<li>Analyze performance using Performance panel recording</li>
					<li>Audit the page with Lighthouse for improvement recommendations</li>
				</ol>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Firefox DevTools in Detail</h3>
			<p class="text-lg">
				Firefox DevTools offer a powerful set of web development tools with some unique features
				that differentiate them from Chrome's toolset, particularly for CSS work and accessibility
				testing.
			</p>

			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Key Panels</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>Inspector:</strong> Examine and modify HTML/CSS</li>
						<li><strong>Console:</strong> JavaScript console for execution and logging</li>
						<li><strong>Debugger:</strong> Powerful JavaScript debugger</li>
						<li><strong>Network:</strong> Monitor network activity and performance</li>
						<li><strong>Performance:</strong> Profile and analyze page performance</li>
						<li><strong>Storage:</strong> Inspect cookies, cache, and local storage</li>
						<li><strong>Accessibility:</strong> Inspect accessibility properties</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Unique Features</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li><strong>CSS Grid Inspector:</strong> Visual grid layout debugging</li>
						<li><strong>Flexbox Inspector:</strong> Visualization tool for flexbox layouts</li>
						<li><strong>Shape Editor:</strong> Visual editor for CSS shapes</li>
						<li><strong>Font Editor:</strong> Experiment with font properties visually</li>
						<li><strong>Accessibility Inspector:</strong> Detailed accessibility information</li>
						<li><strong>Changes Panel:</strong> Track CSS and HTML changes</li>
						<li><strong>Screenshot Tool:</strong> Capture full-page or element screenshots</li>
					</ul>
				</div>
			</div>

			<div class="mt-4 rounded-lg border bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Firefox DevTools Workflow Example</h4>
				<ol class="list-decimal space-y-1 pl-5">
					<li>Use Inspector to examine page structure and styles</li>
					<li>Leverage CSS Grid/Flexbox inspector for layout debugging</li>
					<li>Check Accessibility panel to ensure inclusive design</li>
					<li>Debug JavaScript with the Debugger panel</li>
					<li>Analyze network requests with the Network panel</li>
					<li>Use the Responsive Design Mode to test various screen sizes</li>
				</ol>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Chrome vs. Firefox DevTools: Key Differences</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Chrome DevTools Strengths</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>More comprehensive performance profiling</li>
						<li>Built-in Lighthouse auditing</li>
						<li>Advanced memory profiling capabilities</li>
						<li>Better for Progressive Web App development</li>
						<li>More extensive application debugging</li>
						<li>Greater community support and documentation</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Firefox DevTools Strengths</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Superior CSS inspection and debugging</li>
						<li>Best-in-class Grid and Flexbox visualization</li>
						<li>More detailed accessibility tools</li>
						<li>Better font inspection capabilities</li>
						<li>More intuitive CSS changes tracking</li>
						<li>Excellent support for CSS shapes and animations</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Common Tasks with DevTools</h3>
			<div class="space-y-4">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Debugging JavaScript</h4>
					<ol class="list-decimal space-y-1 pl-5">
						<li>Open Sources/Debugger panel</li>
						<li>Set breakpoints by clicking line numbers</li>
						<li>Use conditional breakpoints for specific scenarios</li>
						<li>Step through code execution with step controls</li>
						<li>Watch variables and expressions</li>
						<li>Check call stack to understand execution flow</li>
					</ol>
				</div>

				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Inspecting and Modifying CSS</h4>
					<ol class="list-decimal space-y-1 pl-5">
						<li>Select an element in the Elements/Inspector panel</li>
						<li>View applied styles in the Styles/Rules panel</li>
						<li>Toggle properties on/off with checkboxes</li>
						<li>Edit values directly or use visual controls</li>
						<li>Add new properties at any specificity level</li>
						<li>View computed styles to see final applied values</li>
					</ol>
				</div>

				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Analyzing Network Performance</h4>
					<ol class="list-decimal space-y-1 pl-5">
						<li>Open Network panel before loading the page</li>
						<li>Check the waterfall chart for request timing</li>
						<li>Sort requests by size, time, or type</li>
						<li>Filter requests by type (JS, CSS, images, etc.)</li>
						<li>Look for slow requests or bottlenecks</li>
						<li>Simulate slower connections with throttling</li>
					</ol>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Advanced DevTools Tips</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Chrome DevTools Tips</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Use $0 in Console to reference selected element</li>
						<li>Try console.table() for better data viewing</li>
						<li>Use Snippets for reusable code pieces</li>
						<li>Try "Capture node screenshot" in context menu</li>
						<li>Use Cmd+Shift+P / Ctrl+Shift+P command menu</li>
						<li>Try Local Overrides to persist changes</li>
						<li>Use the Request Blocking feature to test fallbacks</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Firefox DevTools Tips</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>Use the Eyedropper for precise color picking</li>
						<li>Try the Responsive Design Mode for device testing</li>
						<li>Use the Changes panel to track your modifications</li>
						<li>Try the full-page screenshot feature</li>
						<li>Use the Fonts panel to debug typography issues</li>
						<li>Check "Highlight all" in the Inspector settings</li>
						<li>Use the Rulers to measure pixel distances</li>
					</ul>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Using DevTools for Responsive Design</h3>
			<p class="text-lg">
				Both Chrome and Firefox offer powerful tools for testing responsive designs and simulating
				different devices.
			</p>

			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Chrome Device Mode</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>Toggle device mode with the phone icon or Ctrl+Shift+M</li>
						<li>Select from predefined device presets</li>
						<li>Manually adjust dimensions and scale</li>
						<li>Simulate different network conditions</li>
						<li>Test with different user agents</li>
						<li>Rotate to test landscape orientation</li>
					</ul>
				</div>
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold">Firefox Responsive Design Mode</h4>
					<ul class="list-disc space-y-2 pl-5">
						<li>Access via Ctrl+Shift+M or the phone icon</li>
						<li>Choose from device preset list</li>
						<li>Test touch events and user agents</li>
						<li>Take screenshots of responsive layouts</li>
						<li>Set custom viewport sizes</li>
						<li>Test with network throttling</li>
					</ul>
				</div>
			</div>
		</section>

		<div class="mt-6 border-l-4 border-blue-500 bg-blue-50 p-3 pl-4 italic">
			<p>
				"Browser developer tools are the modern web developer's best friend. Mastering them is like
				gaining X-ray vision into your applications, allowing you to diagnose problems and optimize
				performance with surgical precision."
			</p>
		</div>
	</div>
</ModuleTask>
