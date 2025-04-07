<script lang="ts">
	import { onMount } from 'svelte';
	import 'prism-code-editor/autocomplete.css';
	import 'prism-code-editor/autocomplete-icons.css';
	import 'prism-code-editor/layout.css';
	import 'prism-code-editor/invisibles.css';
	import 'prism-code-editor/scrollbar.css';
	import 'prism-code-editor/copy-button.css';
	import 'prism-code-editor/search.css';
	import 'prism-code-editor/themes/github-light.css';
	import 'prism-code-editor/prism/languages/javascript';
	import 'prism-code-editor/prism/languages/css';
	import { defaultCommands, editHistory } from 'prism-code-editor/commands';
	import { highlightBracketPairs } from 'prism-code-editor/highlight-brackets';
	import { matchTags } from 'prism-code-editor/match-tags';
	import {
		highlightSelectionMatches,
		searchWidget,
		showInvisibles
	} from 'prism-code-editor/search';
	import {
		registerCompletions,
		completeSnippets,
		autoComplete,
		fuzzyFilter
	} from 'prism-code-editor/autocomplete';
	import {
		jsContext,
		completeIdentifiers,
		completeKeywords,
		jsDocCompletion,
		jsSnipets
	} from 'prism-code-editor/autocomplete/javascript';
	import { copyButton } from 'prism-code-editor/copy-button';
	import { createEditor } from 'prism-code-editor';
	import { cursorPosition } from 'prism-code-editor/cursor';

	interface Props {
		class?: string;
		value: string;
		leaveWarning?: boolean;
		language?: string;
	}

	let {
		class: className,
		value = $bindable(),
		leaveWarning = false,
		language = 'javascript'
	}: Props = $props();

	if (language === 'javascript') {
		registerCompletions(['javascript'], {
			context: jsContext,
			sources: [
				completeIdentifiers(['console', 'console.log()']),
				completeKeywords,
				jsDocCompletion,
				completeSnippets(jsSnipets)
			]
		});
	}

	onMount(() => {
		createEditor(
			'#editor-root',
			{
				value,
				language,
				onUpdate: (v) => (value = v)
			},
			highlightSelectionMatches(),
			matchTags(),
			searchWidget(),
			defaultCommands(),
			editHistory(100),
			highlightBracketPairs(),
			cursorPosition(),
			showInvisibles(),
			copyButton(),
			autoComplete({
				filter: fuzzyFilter
			})
		);

		window.onbeforeunload = function () {
			if (leaveWarning) return true;
		};

		return () => {
			window.onbeforeunload = null;
		};
	});
</script>

<div
	id="editor-root"
	class="{className ?? ''} h-full w-full rounded border border-indigo-500 py-1 pl-1"
></div>
