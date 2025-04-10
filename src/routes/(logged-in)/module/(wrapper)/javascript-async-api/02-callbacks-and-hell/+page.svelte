<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'Callbacks and Callback Hell'
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
		<h2 class="mb-4 text-2xl font-bold text-indigo-600">Callbacks for Asynchronous Operations</h2>

		<div class="rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-4">
			<p class="text-lg">
				One of the earliest ways to handle results from asynchronous operations in JavaScript was
				using <strong class="font-medium">callback functions</strong>. A callback is simply a
				function passed as an argument to another function, intended to be executed later.
			</p>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Callbacks in Action (`setTimeout`)</h3>
			<p class="text-gray-700">
				The `setTimeout` function is a classic example. It takes a callback function and a delay
				time. After the delay, the callback function is executed.
			</p>
			<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
console.log('Start');

function greeting() {
  console.log('Hello after 2 seconds!');
}

setTimeout(greeting, 2000); // Pass the 'greeting' function as a callback

// Using an anonymous function as a callback
setTimeout(() => {
  console.log('This also runs after 2 seconds.');
}, 2000);

console.log('End (logged before callbacks)');`}</pre>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-gray-800">Handling Sequential Asynchronous Tasks</h3>
			<p class="text-gray-700">
				What if you need to perform several asynchronous tasks one after another? For example, fetch
				user data, then fetch their posts based on the user ID, then fetch comments for the first
				post. With callbacks, you typically nest them:
			</p>
			<pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-sm">{`
// Pseudo-code demonstrating nesting
fetchUserData(userId, function(error, user) {
  if (error) {
    console.error('Error fetching user:', error);
  } else {
    console.log('Got user:', user.name);
    fetchUserPosts(user.id, function(error, posts) {
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        console.log('Got posts:', posts.length);
        if (posts.length > 0) {
          fetchPostComments(posts[0].id, function(error, comments) {
            if (error) {
              console.error('Error fetching comments:', error);
            } else {
              console.log('Got comments:', comments.length);
              // ... and so on ...
            }
          });
        }
      }
    });
  }
});`}</pre>
		</div>

		<div class="space-y-4">
			<h3 class="text-xl font-semibold text-red-700">Callback Hell (The Pyramid of Doom)</h3>
			<p class="text-gray-700">
				As you can see above, nesting callbacks deeply leads to code that drifts heavily to the
				right, forming a pyramid shape. This is often called <strong
					class="font-medium text-red-600">"Callback Hell"</strong
				> or the "Pyramid of Doom".
			</p>
			<div class="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
				<h4 class="font-medium text-red-800">Problems with Callback Hell:</h4>
				<ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-red-700">
					<li>
						<strong class="font-medium">Poor Readability:</strong> Code becomes very hard to follow and
						understand.
					</li>
					<li>
						<strong class="font-medium">Difficult Maintenance:</strong> Modifying or debugging nested
						callbacks is complex and error-prone.
					</li>
					<li>
						<strong class="font-medium">Error Handling Complexity:</strong> Handling errors at each nested
						level can become repetitive and messy.
					</li>
				</ul>
			</div>
			<p class="mt-4 text-gray-700">
				While callbacks are a fundamental concept, Callback Hell highlighted the need for better
				patterns to manage asynchronous code in JavaScript. This led to the development of Promises.
			</p>
		</div>
	</div>
</ModuleTask>
