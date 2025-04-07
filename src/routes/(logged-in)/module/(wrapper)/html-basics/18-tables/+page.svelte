<script lang="ts">
	import type { PageProps } from './$types';
	import type { Section } from '$lib/client/services/modules';
	import ModuleTask from '$templates/ModuleTaskTemplate.svelte';
	import { modules } from '$lib/client/services/modules';

	const sectionData: Section = {
		title: 'HTML Tables: Structured Data'
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
			<h3 class="mb-3 text-xl font-semibold">Understanding HTML Tables</h3>
			<p class="text-lg">
				HTML tables allow web developers to arrange data in rows and columns—perfect for displaying
				structured information like statistics, comparison data, schedules, and more. While tables
				shouldn't be used for page layout, they're excellent for their intended purpose: displaying
				tabular data.
			</p>

			<div class="mt-4 border-l-4 border-indigo-500 bg-indigo-50 p-4">
				<p class="text-lg">
					<strong>Key point:</strong> Tables should only be used for tabular data, not for page layout.
					For layout purposes, CSS grid and flexbox are much better options.
				</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Basic Table Structure</h3>
			<p class="text-lg">
				All HTML tables start with the <code>&lt;table&gt;</code> element, which serves as a container
				for all other table-related elements. The data inside is organized into rows and cells.
			</p>

			<div class="mt-4 rounded-lg bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Basic Table Elements</h4>
				<div class="grid gap-4 md:grid-cols-2">
					<div>
						<div class="rounded bg-gray-100 p-4 font-mono text-sm">
							<pre>&lt;table&gt;
  &lt;tr&gt;
    &lt;td&gt;Row 1, Cell 1&lt;/td&gt;
    &lt;td&gt;Row 1, Cell 2&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Row 2, Cell 1&lt;/td&gt;
    &lt;td&gt;Row 2, Cell 2&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</pre>
						</div>
					</div>
					<div>
						<div class="overflow-auto rounded-lg border">
							<table class="w-full border-collapse">
								<tbody>
									<tr class="border">
										<td class="border p-2">Row 1, Cell 1</td>
										<td class="border p-2">Row 1, Cell 2</td>
									</tr>
									<tr class="border">
										<td class="border p-2">Row 2, Cell 1</td>
										<td class="border p-2">Row 2, Cell 2</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<p class="mt-3 text-gray-600">
					This simple example shows two rows, each containing two cells of data.
				</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Key Table Elements</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<div class="flex items-start">
						<div class="mr-3 rounded-full bg-indigo-100 p-2">
							<code>&lt;table&gt;</code>
						</div>
						<div>
							<h4 class="font-semibold text-indigo-700">Table Container</h4>
							<p class="mt-1">
								The main container element that defines an HTML table. All table content must be
								placed within this element.
							</p>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<div class="flex items-start">
						<div class="mr-3 rounded-full bg-indigo-100 p-2">
							<code>&lt;tr&gt;</code>
						</div>
						<div>
							<h4 class="font-semibold text-indigo-700">Table Row</h4>
							<p class="mt-1">
								Defines a row of cells in a table. Each <code>&lt;tr&gt;</code> element contains one
								or more table cells (<code>&lt;th&gt;</code> or <code>&lt;td&gt;</code>).
							</p>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<div class="flex items-start">
						<div class="mr-3 rounded-full bg-indigo-100 p-2">
							<code>&lt;td&gt;</code>
						</div>
						<div>
							<h4 class="font-semibold text-indigo-700">Table Data Cell</h4>
							<p class="mt-1">
								Defines a standard data cell in a table. These cells contain the actual content you
								want to display in the table.
							</p>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<div class="flex items-start">
						<div class="mr-3 rounded-full bg-indigo-100 p-2">
							<code>&lt;th&gt;</code>
						</div>
						<div>
							<h4 class="font-semibold text-indigo-700">Table Header Cell</h4>
							<p class="mt-1">
								Defines a header cell in a table. These cells typically contain headings for columns
								or rows and are displayed in bold and centered by default.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Table Headers</h3>
			<p class="text-lg">
				Table headers (<code>&lt;th&gt;</code>) help identify what each column or row represents.
				They improve both the visual structure and the accessibility of your table.
			</p>

			<div class="mt-4 grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Headers Example</h4>
					<div class="rounded bg-gray-100 p-4 font-mono text-sm">
						<pre>&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Name&lt;/th&gt;
    &lt;th&gt;Age&lt;/th&gt;
    &lt;th&gt;Country&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Anna&lt;/td&gt;
    &lt;td&gt;28&lt;/td&gt;
    &lt;td&gt;Sweden&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Miguel&lt;/td&gt;
    &lt;td&gt;32&lt;/td&gt;
    &lt;td&gt;Spain&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</pre>
					</div>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Visual Result</h4>
					<div class="overflow-auto rounded-lg border">
						<table class="w-full border-collapse">
							<thead>
								<tr class="border">
									<th class="border bg-gray-100 p-2">Name</th>
									<th class="border bg-gray-100 p-2">Age</th>
									<th class="border bg-gray-100 p-2">Country</th>
								</tr>
							</thead>
							<tbody>
								<tr class="border">
									<td class="border p-2">Anna</td>
									<td class="border p-2">28</td>
									<td class="border p-2">Sweden</td>
								</tr>
								<tr class="border">
									<td class="border p-2">Miguel</td>
									<td class="border p-2">32</td>
									<td class="border p-2">Spain</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div class="mt-4 border-l-4 border-amber-400 bg-amber-50 p-4">
				<h4 class="font-semibold">Accessibility Note</h4>
				<p class="mt-2">
					Using <code>&lt;th&gt;</code> elements instead of <code>&lt;td&gt;</code> for headers is crucial
					for screen readers, which can read out table headers for each data cell, helping users understand
					the relationship between data.
				</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Table Sections</h3>
			<p class="text-lg">
				For more complex tables, you can organize your table into logical sections using
				<code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, and optionally
				<code>&lt;tfoot&gt;</code> elements.
			</p>

			<div class="mt-4 rounded-lg bg-gray-50 p-5">
				<h4 class="mb-2 font-semibold">Table with Sections</h4>
				<div class="rounded bg-gray-100 p-4 font-mono text-sm">
					<pre>&lt;table&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;Month&lt;/th&gt;
      &lt;th&gt;Income&lt;/th&gt;
      &lt;th&gt;Expenses&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;January&lt;/td&gt;
      &lt;td&gt;$5,000&lt;/td&gt;
      &lt;td&gt;$3,500&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;February&lt;/td&gt;
      &lt;td&gt;$4,800&lt;/td&gt;
      &lt;td&gt;$3,200&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</pre>
				</div>
				<div class="mt-4">
					<div class="overflow-auto rounded-lg border">
						<table class="w-full border-collapse">
							<thead class="bg-gray-200">
								<tr class="border">
									<th class="border p-2">Month</th>
									<th class="border p-2">Income</th>
									<th class="border p-2">Expenses</th>
								</tr>
							</thead>
							<tbody>
								<tr class="border">
									<td class="border p-2">January</td>
									<td class="border p-2">$5,000</td>
									<td class="border p-2">$3,500</td>
								</tr>
								<tr class="border">
									<td class="border p-2">February</td>
									<td class="border p-2">$4,800</td>
									<td class="border p-2">$3,200</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div class="mt-4 grid gap-6 md:grid-cols-3">
				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<div class="flex items-start">
						<div class="mr-3 rounded-full bg-indigo-100 p-2">
							<code>&lt;thead&gt;</code>
						</div>
						<div>
							<h4 class="font-semibold text-indigo-700">Table Header Section</h4>
							<p class="mt-1">
								Groups the header content in a table. Typically contains one <code>&lt;tr&gt;</code>
								with
								<code>&lt;th&gt;</code> elements.
							</p>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<div class="flex items-start">
						<div class="mr-3 rounded-full bg-indigo-100 p-2">
							<code>&lt;tbody&gt;</code>
						</div>
						<div>
							<h4 class="font-semibold text-indigo-700">Table Body Section</h4>
							<p class="mt-1">
								Groups the main body content of a table. Contains your rows of data.
							</p>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<div class="flex items-start">
						<div class="mr-3 rounded-full bg-indigo-100 p-2">
							<code>&lt;tfoot&gt;</code>
						</div>
						<div>
							<h4 class="font-semibold text-indigo-700">Table Footer Section</h4>
							<p class="mt-1">
								Groups footer content in a table. Useful for sum totals or footnotes.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-4 border-l-4 border-blue-500 bg-blue-50 p-4">
				<p class="text-lg">
					<strong>Why use table sections?</strong> They improve organization, enable independent
					styling for different parts of your table, and provide better accessibility. Many browsers
					will also display <code>&lt;thead&gt;</code> at the top when scrolling through long tables.
				</p>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Advanced Table Features</h3>
			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<h4 class="mb-2 font-semibold">Cell Spanning</h4>
					<p>
						You can make cells span multiple columns or rows using the <code>colspan</code> and
						<code>rowspan</code> attributes.
					</p>
					<div class="mt-3 rounded bg-gray-100 p-3 font-mono text-sm">
						<pre>&lt;td colspan="2"&gt;Spans 2 columns&lt;/td&gt;
&lt;td rowspan="3"&gt;Spans 3 rows&lt;/td&gt;</pre>
					</div>
					<div class="mt-4 overflow-auto rounded-lg border">
						<table class="w-full border-collapse">
							<tbody>
								<tr class="border">
									<td class="border p-2" colspan="2">This cell spans 2 columns</td>
									<td class="border p-2">Normal cell</td>
								</tr>
								<tr class="border">
									<td class="border p-2">Normal cell</td>
									<td class="border p-2">Normal cell</td>
									<td class="border p-2" rowspan="2">This cell spans 2 rows</td>
								</tr>
								<tr class="border">
									<td class="border p-2">Normal cell</td>
									<td class="border p-2">Normal cell</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div class="rounded-lg border bg-white p-5 shadow-sm">
					<h4 class="mb-2 font-semibold">Accessibility Attributes</h4>
					<p>For complex tables, additional attributes improve accessibility:</p>
					<div class="mt-3 rounded bg-gray-100 p-3 font-mono text-sm">
						<pre>&lt;table&gt;
  &lt;caption&gt;Monthly Savings&lt;/caption&gt;
  &lt;tr&gt;
    &lt;th scope="col"&gt;Month&lt;/th&gt;
    &lt;th scope="col"&gt;Amount&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;January&lt;/td&gt;
    &lt;td&gt;$100&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</pre>
					</div>
					<p class="mt-3">
						The <code>caption</code> element adds a title to the table, while the
						<code>scope</code> attribute helps screen readers identify whether a header is for a row
						or column.
					</p>
				</div>
			</div>
		</section>

		<section>
			<h3 class="mb-3 text-xl font-semibold">Table Best Practices</h3>
			<div class="space-y-3">
				<div class="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
					<h4 class="font-semibold">Use tables for tabular data only</h4>
					<p>Tables should be used for presenting data in rows and columns, not for page layout.</p>
				</div>

				<div class="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
					<h4 class="font-semibold">Always include table headers</h4>
					<p>
						Use <code>&lt;th&gt;</code> elements to clearly identify what each column or row represents.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
					<h4 class="font-semibold">Use captions when appropriate</h4>
					<p>
						The <code>&lt;caption&gt;</code> element provides a title for your table, helping users understand
						its purpose.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
					<h4 class="font-semibold">Keep tables simple</h4>
					<p>
						Complex tables with many nested levels or spans can be difficult for users to navigate,
						especially those using assistive technologies.
					</p>
				</div>

				<div class="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
					<h4 class="font-semibold">Apply responsive design techniques</h4>
					<p>
						Tables can be challenging on small screens. Consider responsive design techniques like
						horizontal scrolling or collapsing tables on mobile devices.
					</p>
				</div>
			</div>
		</section>

		<div class="mt-6 rounded-lg bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Real-World Applications</h3>
			<p class="text-lg">HTML tables are used in countless real-world scenarios, including:</p>
			<ul class="mt-3 list-disc space-y-2 pl-6 text-lg">
				<li>
					<strong>Financial data:</strong> Income statements, balance sheets, budget comparisons
				</li>
				<li><strong>Schedules:</strong> Class schedules, event timetables, TV program listings</li>
				<li>
					<strong>Product comparisons:</strong> Features and specifications across different models
				</li>
				<li>
					<strong>Sports statistics:</strong> League standings, player statistics, scoreboards
				</li>
				<li>
					<strong>Scientific data:</strong> Experiment results, survey findings, data analysis
				</li>
			</ul>
			<p class="mt-2">
				Understanding how to create well-structured, accessible tables will serve you well
				throughout your web development career.
			</p>
		</div>

		<section class="mt-6 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-6">
			<h3 class="mb-3 text-xl font-semibold text-indigo-800">Additional Resources</h3>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<h4 class="mb-2 font-semibold">Documentation</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table"
								target="_blank"
								class="text-indigo-600 hover:underline">MDN: Table Element Reference</a
							>
						</li>
						<li>
							<a
								href="https://www.w3.org/WAI/tutorials/tables/"
								target="_blank"
								class="text-indigo-600 hover:underline">W3C: Web Accessibility Tables Tutorial</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-2 font-semibold">Tools & Techniques</h4>
					<ul class="list-disc space-y-1 pl-5">
						<li>
							<a
								href="https://css-tricks.com/complete-guide-table-element/"
								target="_blank"
								class="text-indigo-600 hover:underline"
								>CSS-Tricks: A Complete Guide to the Table Element</a
							>
						</li>
						<li>
							<a
								href="https://adrianroselli.com/2017/11/a-responsive-accessible-table.html"
								target="_blank"
								class="text-indigo-600 hover:underline">Creating Responsive Accessible Tables</a
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
