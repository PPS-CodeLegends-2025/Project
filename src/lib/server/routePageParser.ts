import { readFileSync } from 'fs';

export function extractScriptTagText(path: string) {
	path = path.replace('/module', '/module/(wrapper)');
	const page = `src/routes/(logged-in)/${path}/+page.svelte`;
	const content = readFileSync(page, 'utf-8');

	const script = content.match(/<script lang="ts">([\s\S]+?)<\/script>/);
	if (!script) return null;

	return script[1];
}

export function readModuleData(path: string) {
	const script = extractScriptTagText(path);
	if (!script) throw new Error(`No script tag found in ${path}`);

	const moduleMatch = script.match(/const module\s*:?\s*(?:Module\s*)?\s*=\s*{([\s\S]+?)}/);
	if (!moduleMatch) throw new Error(`No module found in ${path}`);

	const imageMatch = moduleMatch[1].match(/image:\s*'(.+?)'/);
	const levelMatch = moduleMatch[1].match(/level:\s*'(.+?)'/);
	const xpRewardMatch = moduleMatch[1].match(/xpReward:\s*(\d+)/);
	const categoryMatch = moduleMatch[1].match(/category:\s*'(.+?)'/);
	const titleMatch = moduleMatch[1].match(/title:\s*'(.+?)'/);
	const descriptionMatch = moduleMatch[1].match(/description:\s*'(.+?)'/);

	if (
		!imageMatch ||
		!levelMatch ||
		!xpRewardMatch ||
		!categoryMatch ||
		!titleMatch ||
		!descriptionMatch
	)
		throw new Error(`Missing field in module in ${path}`);

	return {
		image: imageMatch[1],
		level: levelMatch[1],
		xpReward: parseInt(xpRewardMatch[1]),
		category: categoryMatch[1],
		title: titleMatch[1],
		description: descriptionMatch[1],
		url: path
	};
}

export function readModuleSectionData(path: string) {
	const script = extractScriptTagText(path);
	if (!script) throw new Error(`No script tag found in ${path}`);

	const sectionDataMatch = script.match(
		/const sectionData\s*:?\s*(?:Section\s*)?\s*=\s*{([\s\S]+?)}/
	);
	if (!sectionDataMatch) throw new Error(`No sectionData found in ${path}`);

	const titleMatch = sectionDataMatch[1].match(/title:\s*'(.+?)'/);

	if (!titleMatch) throw new Error(`No id or title found in sectionData in ${path}`);

	return {
		title: titleMatch[1],
		url: path
	};
}
