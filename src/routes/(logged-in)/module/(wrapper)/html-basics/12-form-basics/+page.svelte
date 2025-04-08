<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'HTML Form Basics'
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
			<h3 class="mb-3 text-xl font-semibold">Introduction to HTML Forms</h3>
			<p class="text-lg">
				Forms are the primary way users interact with websites, allowing them to submit information,
				make selections, and communicate with web applications. From search boxes to login screens,
				payment details to feedback surveys, HTML forms are essential for creating interactive web
				experiences.
			</p>

			<div class="mt-4 border-l-4 border-indigo-500 bg-indigo-50 p-4">
				<p class="text-lg">
					Forms collect, validate, and submit user input to servers for processing. Understanding
					form elements and their attributes is crucial for creating effective user interfaces and
					ensuring proper data collection.
				</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">
				The &lt;form&gt; Element: Container for Form Controls
			</h3>
			<p class="text-lg">
				The <code>&lt;form&gt;</code> element acts as a container for all form controls and defines how
				data should be submitted. It's the foundation of every HTML form.
			</p>

			<div class="mt-4 rounded-lg bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Key Form Attributes</h4>
				<div class="grid gap-4 md:grid-cols-2">
					<div>
						<h5 class="font-medium text-indigo-700">action</h5>
						<div class="mt-1 rounded bg-white p-2 font-mono">
							&lt;form action="/submit-form"&gt;
						</div>
						<p class="mt-1 text-sm">
							Specifies where form data should be sent when submitted. Can be a URL or omitted for
							JavaScript handling.
						</p>
					</div>

					<div>
						<h5 class="font-medium text-indigo-700">method</h5>
						<div class="mt-1 rounded bg-white p-2 font-mono">&lt;form method="post"&gt;</div>
						<p class="mt-1 text-sm">
							Defines how data is sent. Common values are "get" (in URL parameters) and "post" (in
							request body).
						</p>
					</div>
				</div>
			</div>

			<div class="mt-4 rounded-lg bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Basic Form Structure</h4>
				<div class="rounded bg-gray-100 p-4 font-mono text-sm">
					<pre>&lt;form action="/submit" method="post"&gt;
  &lt;!-- Form controls go here --&gt;
  &lt;input type="text" name="username"&gt;
  &lt;input type="password" name="password"&gt;
  &lt;button type="submit"&gt;Log In&lt;/button&gt;
&lt;/form&gt;</pre>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Labels: Connecting Text to Form Controls</h3>
			<p class="text-lg">
				The <code>&lt;label&gt;</code> element associates text with form controls, improving accessibility
				and user experience. When a user clicks on a label, it focuses the associated form control.
			</p>

			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold text-indigo-700">Using the 'for' Attribute</h4>
					<div class="rounded bg-gray-100 p-3 font-mono text-sm">
						<pre>&lt;label for="username"&gt;Username:&lt;/label&gt;
&lt;input type="text" id="username" name="username"&gt;</pre>
					</div>
					<p class="mt-2">
						The <code>for</code> attribute references the <code>id</code> of the form control it's associated
						with.
					</p>
				</div>

				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold text-indigo-700">Wrapping the Input</h4>
					<div class="rounded bg-gray-100 p-3 font-mono text-sm">
						<pre>&lt;label&gt;
  Username:
  &lt;input type="text" name="username"&gt;
&lt;/label&gt;</pre>
					</div>
					<p class="mt-2">
						You can also wrap the form control inside the label, which automatically associates them
						without needing IDs.
					</p>
				</div>
			</div>

			<div class="mt-4 border-l-4 border-amber-400 bg-amber-50 p-4">
				<h4 class="font-semibold">Accessibility Best Practice</h4>
				<p class="mt-2">
					Always label your form controls. Screen readers announce labels when users focus on form
					controls, making your forms accessible to visually impaired users. Labels also increase
					the clickable area for all users.
				</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Input: The Most Versatile Form Control</h3>
			<p class="text-lg">
				The <code>&lt;input&gt;</code> element is the workhorse of HTML forms, creating various
				types of form controls based on its <code>type</code> attribute.
			</p>

			<div class="mt-4 rounded-lg bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Common Input Types</h4>
				<div class="grid gap-4 md:grid-cols-2">
					<div>
						<h5 class="font-medium text-indigo-700">Text Input</h5>
						<div class="mt-1 rounded bg-white p-2 font-mono">
							&lt;input type="text" name="username"&gt;
						</div>
						<p class="mt-1 text-sm">
							Standard text entry field for names, addresses, and other short text.
						</p>
					</div>

					<div>
						<h5 class="font-medium text-indigo-700">Password Input</h5>
						<div class="mt-1 rounded bg-white p-2 font-mono">
							&lt;input type="password" name="password"&gt;
						</div>
						<p class="mt-1 text-sm">
							Text that is obscured for security (shown as dots or asterisks).
						</p>
					</div>

					<div>
						<h5 class="font-medium text-indigo-700">Email Input</h5>
						<div class="mt-1 rounded bg-white p-2 font-mono">
							&lt;input type="email" name="email"&gt;
						</div>
						<p class="mt-1 text-sm">
							Optimized for email entry with validation and appropriate mobile keyboards.
						</p>
					</div>

					<div>
						<h5 class="font-medium text-indigo-700">Number Input</h5>
						<div class="mt-1 rounded bg-white p-2 font-mono">
							&lt;input type="number" name="quantity" min="1" max="10"&gt;
						</div>
						<p class="mt-1 text-sm">
							Numeric entry with optional min/max constraints and increment buttons.
						</p>
					</div>

					<div>
						<h5 class="font-medium text-indigo-700">Checkboxes</h5>
						<div class="mt-1 rounded bg-white p-2 font-mono">
							&lt;input type="checkbox" name="subscribe" id="subscribe"&gt;
						</div>
						<p class="mt-1 text-sm">
							Toggle options that can be selected independently (multiple can be checked).
						</p>
					</div>

					<div>
						<h5 class="font-medium text-indigo-700">Radio Buttons</h5>
						<div class="mt-1 rounded bg-white p-2 font-mono">
							&lt;input type="radio" name="plan" value="basic"&gt;
						</div>
						<p class="mt-1 text-sm">
							Option selection where only one in a group with same name can be selected.
						</p>
					</div>

					<div>
						<h5 class="font-medium text-indigo-700">Date Input</h5>
						<div class="mt-1 rounded bg-white p-2 font-mono">
							&lt;input type="date" name="birthdate"&gt;
						</div>
						<p class="mt-1 text-sm">
							Date picker with calendar interface (browser-dependent implementation).
						</p>
					</div>

					<div>
						<h5 class="font-medium text-indigo-700">File Input</h5>
						<div class="mt-1 rounded bg-white p-2 font-mono">
							&lt;input type="file" name="document"&gt;
						</div>
						<p class="mt-1 text-sm">File selection control for uploading files to the server.</p>
					</div>
				</div>
			</div>

			<div class="mt-4 rounded-lg bg-white p-5 shadow-sm">
				<h4 class="mb-2 font-semibold text-indigo-700">Important Input Attributes</h4>
				<div class="grid gap-2">
					<div class="grid grid-cols-4 gap-2 rounded bg-gray-50 p-2">
						<div class="font-medium">name</div>
						<div class="col-span-3">
							Identifies the input in form submissions; becomes the variable name in the data.
						</div>
					</div>
					<div class="grid grid-cols-4 gap-2 rounded bg-gray-50 p-2">
						<div class="font-medium">id</div>
						<div class="col-span-3">
							Unique identifier for the element, used with labels and JavaScript.
						</div>
					</div>
					<div class="grid grid-cols-4 gap-2 rounded bg-gray-50 p-2">
						<div class="font-medium">value</div>
						<div class="col-span-3">
							The initial value of the input or the value submitted with the form.
						</div>
					</div>
					<div class="grid grid-cols-4 gap-2 rounded bg-gray-50 p-2">
						<div class="font-medium">placeholder</div>
						<div class="col-span-3">
							Hint text displayed when the field is empty (not a substitute for labels).
						</div>
					</div>
					<div class="grid grid-cols-4 gap-2 rounded bg-gray-50 p-2">
						<div class="font-medium">required</div>
						<div class="col-span-3">
							Makes the field mandatory; form can't be submitted until it's filled.
						</div>
					</div>
					<div class="grid grid-cols-4 gap-2 rounded bg-gray-50 p-2">
						<div class="font-medium">disabled</div>
						<div class="col-span-3">
							Makes the field inactive; value won't be submitted with the form.
						</div>
					</div>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">TextArea: Multi-line Text Input</h3>
			<p class="text-lg">
				When you need users to enter longer text content, use the <code>&lt;textarea&gt;</code>
				element, which creates a multi-line text input field.
			</p>

			<div class="mt-4 rounded-lg border bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold text-indigo-700">TextArea Syntax</h4>
				<div class="rounded bg-gray-100 p-3 font-mono text-sm">
					<pre>&lt;label for="message"&gt;Your Message:&lt;/label&gt;
&lt;textarea id="message" name="message" rows="4" cols="40"&gt;
  Default text can go here (if needed).
&lt;/textarea&gt;</pre>
				</div>
				<p class="mt-2">
					Unlike <code>&lt;input&gt;</code>, <code>&lt;textarea&gt;</code> requires both opening and
					closing tags. Any content between the tags becomes the default value.
				</p>
				<p class="mt-2">
					The <code>rows</code> and <code>cols</code> attributes set the visible size (though CSS is
					often preferred for styling).
				</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Select & Option: Creating Dropdown Menus</h3>
			<p class="text-lg">
				Dropdown menus allow users to select from a predefined list of options. This is done with
				the
				<code>&lt;select&gt;</code> element containing <code>&lt;option&gt;</code> elements.
			</p>

			<div class="mt-4 rounded-lg bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Basic Select Structure</h4>
				<div class="rounded bg-gray-100 p-4 font-mono text-sm">
					<pre>&lt;label for="country"&gt;Select Your Country:&lt;/label&gt;
&lt;select id="country" name="country"&gt;
  &lt;option value=""&gt;--Please choose an option--&lt;/option&gt;
  &lt;option value="us"&gt;United States&lt;/option&gt;
  &lt;option value="ca"&gt;Canada&lt;/option&gt;
  &lt;option value="mx"&gt;Mexico&lt;/option&gt;
&lt;/select&gt;</pre>
				</div>

				<div class="mt-4 grid gap-4 md:grid-cols-2">
					<div>
						<h5 class="font-medium text-indigo-700">Option Attributes</h5>
						<ul class="mt-1 list-disc space-y-1 pl-5 text-sm">
							<li>
								<code>value</code>: The data submitted to the server (may differ from displayed
								text)
							</li>
							<li>
								<code>selected</code>: Sets the option as pre-selected
							</li>
							<li>
								<code>disabled</code>: Makes the option non-selectable
							</li>
						</ul>
					</div>

					<div>
						<h5 class="font-medium text-indigo-700">Select Attributes</h5>
						<ul class="mt-1 list-disc space-y-1 pl-5 text-sm">
							<li>
								<code>multiple</code>: Allows multiple options to be selected
							</li>
							<li>
								<code>size</code>: Number of visible options at once
							</li>
							<li>
								<code>required</code>: Makes selection mandatory
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-5">
				<h4 class="mb-2 font-semibold">Option Groups</h4>
				<p>
					You can organize options in logical groups with the <code>&lt;optgroup&gt;</code> element:
				</p>
				<div class="mt-2 rounded bg-white p-3 font-mono">
					<pre>&lt;select name="pets"&gt;
  &lt;optgroup label="Dogs"&gt;
    &lt;option value="beagle"&gt;Beagle&lt;/option&gt;
    &lt;option value="labrador"&gt;Labrador&lt;/option&gt;
  &lt;/optgroup&gt;
  &lt;optgroup label="Cats"&gt;
    &lt;option value="tabby"&gt;Tabby&lt;/option&gt;
    &lt;option value="siamese"&gt;Siamese&lt;/option&gt;
  &lt;/optgroup&gt;
&lt;/select&gt;</pre>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Buttons: Triggering Actions</h3>
			<p class="text-lg">
				Buttons allow users to submit forms, reset fields, or trigger JavaScript functions. There
				are two ways to create buttons in HTML forms:
			</p>

			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold text-indigo-700">Button Element</h4>
					<div class="rounded bg-gray-100 p-3 font-mono text-sm">
						<pre>&lt;button type="submit"&gt;Submit Form&lt;/button&gt;
&lt;button type="reset"&gt;Reset Fields&lt;/button&gt;
&lt;button type="button" onclick="handleClick()"&gt;
  Click Me
&lt;/button&gt;</pre>
					</div>
					<p class="mt-2">
						The <code>&lt;button&gt;</code> element can contain text and other HTML elements (like icons).
					</p>
				</div>

				<div class="rounded-lg border bg-gray-50 p-5">
					<h4 class="mb-2 font-semibold text-indigo-700">Input as Button</h4>
					<div class="rounded bg-gray-100 p-3 font-mono text-sm">
						<pre>&lt;input type="submit" value="Submit Form"&gt;
&lt;input type="reset" value="Reset Fields"&gt;
&lt;input type="button" value="Click Me" onclick="handleClick()"&gt;</pre>
					</div>
					<p class="mt-2">
						Using <code>&lt;input&gt;</code> creates a button that can only contain text (no nested HTML).
					</p>
				</div>
			</div>

			<div class="mt-4 border-l-4 border-amber-400 bg-amber-50 p-4">
				<h4 class="font-semibold">Button Types</h4>
				<ul class="mt-2 list-disc space-y-1 pl-6">
					<li>
						<strong>submit</strong>: Sends the form data to the server (default type for
						<code>&lt;button&gt;</code>)
					</li>
					<li><strong>reset</strong>: Clears all form fields to their initial values</li>
					<li>
						<strong>button</strong>: Does nothing by default; used with JavaScript for custom
						actions
					</li>
				</ul>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Form Validation</h3>
			<p class="text-lg">
				HTML5 introduced built-in form validation that helps ensure users provide data in the
				expected format before submission, improving user experience and data quality.
			</p>

			<div class="mt-4 rounded-lg bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Validation Attributes</h4>
				<div class="grid gap-4 md:grid-cols-2">
					<div>
						<ul class="list-disc space-y-2 pl-5">
							<li>
								<code>required</code>: Field must be filled before form submission
							</li>
							<li>
								<code>min</code>/<code>max</code>: Minimum/maximum values for numeric inputs
							</li>
							<li>
								<code>minlength</code>/<code>maxlength</code>: Character limits for text inputs
							</li>
						</ul>
					</div>
					<div>
						<ul class="list-disc space-y-2 pl-5">
							<li>
								<code>pattern</code>: Regular expression pattern to validate against
							</li>
							<li>
								<code>type="email"</code>/<code>type="url"</code>: Automatic format validation
							</li>
							<li>
								<code>novalidate</code>: Disables form validation (on the form element)
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="mt-4 rounded-lg bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Validation Example</h4>
				<div class="rounded bg-gray-100 p-4 font-mono text-sm">
					<pre>&lt;form&gt;
  &lt;label&gt;
    Username (4-12 characters):
    &lt;input type="text" name="username" minlength="4" maxlength="12" required&gt;
  &lt;/label&gt;
  
  &lt;label&gt;
    Email:
    &lt;input type="email" name="email" required&gt;
  &lt;/label&gt;
  
  &lt;label&gt;
    Age (18-120):
    &lt;input type="number" name="age" min="18" max="120" required&gt;
  &lt;/label&gt;
  
  &lt;label&gt;
    Website:
    &lt;input type="url" name="website"&gt;
  &lt;/label&gt;
  
  &lt;label&gt;
    Zip Code:
    &lt;input type="text" name="zipcode" pattern="[0-9]{5}" title="Five digit zip code"&gt;
  &lt;/label&gt;
  
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</pre>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Form Layout and Organization</h3>
			<p class="text-lg">
				Organizing forms helps improve usability and comprehension, especially for complex forms
				with multiple sections.
			</p>

			<div class="mt-4 rounded-lg bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Fieldset and Legend</h4>
				<p class="mt-1">
					Use <code>&lt;fieldset&gt;</code> to group related form controls together, and
					<code>&lt;legend&gt;</code> to provide a caption for the group.
				</p>
				<div class="mt-2 rounded bg-gray-100 p-4 font-mono text-sm">
					<pre>&lt;form&gt;
  &lt;fieldset&gt;
    &lt;legend&gt;Personal Information&lt;/legend&gt;
    &lt;label&gt;First Name: &lt;input type="text" name="firstname"&gt;&lt;/label&gt;
    &lt;label&gt;Last Name: &lt;input type="text" name="lastname"&gt;&lt;/label&gt;
  &lt;/fieldset&gt;
  
  &lt;fieldset&gt;
    &lt;legend&gt;Contact Details&lt;/legend&gt;
    &lt;label&gt;Email: &lt;input type="email" name="email"&gt;&lt;/label&gt;
    &lt;label&gt;Phone: &lt;input type="tel" name="phone"&gt;&lt;/label&gt;
  &lt;/fieldset&gt;
  
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</pre>
				</div>
				<p class="mt-2">
					This organization helps screen readers understand the form structure, improving
					accessibility.
				</p>
			</div>
		</section>

		<div class="mt-6 rounded-lg bg-blue-50 p-6">
			<h3 class="mb-3 text-xl font-semibold">Form Best Practices</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold text-blue-700">Accessibility</h4>
					<ul class="mt-1 list-disc space-y-1 pl-5">
						<li>Always use labels for form controls</li>
						<li>Provide clear error messages for validation failures</li>
						<li>Use fieldsets to group related controls</li>
						<li>Maintain tab order for keyboard navigation</li>
						<li>Add appropriate ARIA attributes when needed</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold text-blue-700">Usability</h4>
					<ul class="mt-1 list-disc space-y-1 pl-5">
						<li>Keep forms as simple as possible</li>
						<li>Use appropriate input types for better mobile experience</li>
						<li>Provide clear instructions for complex inputs</li>
						<li>Limit required fields to essential information</li>
						<li>Use logical grouping and visual hierarchy</li>
					</ul>
				</div>
			</div>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Additional Resources</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Documentation</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN: Form Element</a
							>
						</li>
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN: Input Element Types</a
							>
						</li>
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Learn/Forms"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN: Web Forms Guide</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Accessibility</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://webaim.org/techniques/forms/"
								target="_blank"
								class="text-indigo-600 hover:underline">WebAIM: Creating Accessible Forms</a
							>
						</li>
						<li>
							<a
								href="https://www.w3.org/WAI/tutorials/forms/"
								target="_blank"
								class="text-indigo-600 hover:underline">W3C Web Accessibility Tutorials: Forms</a
							>
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
</style>
