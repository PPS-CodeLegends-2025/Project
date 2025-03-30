export interface ValidationResult {
	success: boolean;
	message: string;
	errors?: ValidationError[];
}

export interface ValidationError {
	type: string;
	message: string;
	element?: string;
	line?: number;
}

export function validateHtml(
	code: string,
	customChecks: Array<(code: string) => ValidationError | null> = []
): ValidationResult {
	const errors: ValidationError[] = [];

	const structureErrors = checkHtmlStructure(code);
	errors.push(...structureErrors);

	const imageErrors = checkImageSources(code);
	errors.push(...imageErrors);

	const linkErrors = checkLinks(code);
	errors.push(...linkErrors);

	customChecks.forEach((check) => {
		const error = check(code);
		if (error) errors.push(error);
	});

	if (errors.length === 0) {
		return {
			success: true,
			message: 'HTML validation passed successfully!'
		};
	} else {
		return {
			success: false,
			message: `Found ${errors.length} HTML issue${errors.length === 1 ? '' : 's'}: ${errors[0].message}${errors.length > 1 ? ' and more...' : ''}`,
			errors
		};
	}
}

function checkHtmlStructure(code: string): ValidationError[] {
	const errors: ValidationError[] = [];

	if (!/<html[\s\S]*?>[\s\S]*?<\/html>/i.test(code)) {
		errors.push({
			type: 'structure',
			message: 'Missing <html> element to contain page content'
		});
	}

	const openingTags = code.match(/<([a-z][a-z0-9]*)\s*[^>]*>/gi) || [];
	const closingTags = code.match(/<\/([a-z][a-z0-9]*)\s*>/gi) || [];

	if (openingTags.length - getVoidElementCount(code) !== closingTags.length) {
		errors.push({
			type: 'structure',
			message: 'Mismatched HTML tags - some tags are not properly closed'
		});
	}

	return errors;
}

function checkImageSources(code: string): ValidationError[] {
	const errors: ValidationError[] = [];
	const imgRegex = /<img\s+[^>]*src\s*=\s*["']([^"']+)["'][^>]*>/gi;
	let match;

	while ((match = imgRegex.exec(code)) !== null) {
		const imgSrc = match[1];

		if (!imgSrc || imgSrc.trim() === '') {
			errors.push({
				type: 'image',
				message: 'Image has an empty src attribute',
				element: match[0]
			});
			continue;
		}

		if (imgSrc.startsWith('/') || imgSrc.startsWith('./') || imgSrc.startsWith('../')) {
			errors.push({
				type: 'image',
				message: `Image uses a relative path (${imgSrc}) which may not work in the preview`,
				element: match[0]
			});
			continue;
		}

		if (!/<img\s+[^>]*alt\s*=\s*["'][^"']*["'][^>]*>/i.test(match[0])) {
			errors.push({
				type: 'accessibility',
				message: 'Image is missing an alt attribute for accessibility',
				element: match[0]
			});
		}
	}

	return errors;
}

function checkLinks(code: string): ValidationError[] {
	const errors: ValidationError[] = [];
	const linkRegex = /<a\s+[^>]*href\s*=\s*["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
	let match;

	while ((match = linkRegex.exec(code)) !== null) {
		const href = match[1];
		const linkText = match[2];

		if (!href || href.trim() === '') {
			errors.push({
				type: 'link',
				message: 'Link has an empty href attribute',
				element: match[0]
			});
			continue;
		}

		if (!linkText || linkText.trim() === '') {
			errors.push({
				type: 'accessibility',
				message: 'Link has no text content, which is bad for accessibility',
				element: match[0]
			});
		}

		if (href.toLowerCase().startsWith('javascript:')) {
			errors.push({
				type: 'security',
				message: 'Link uses javascript: URL which can be a security risk',
				element: match[0]
			});
		}
	}

	return errors;
}

function getVoidElementCount(code: string): number {
	const voidElements = [
		'area',
		'base',
		'br',
		'col',
		'embed',
		'hr',
		'img',
		'input',
		'link',
		'meta',
		'param',
		'source',
		'track',
		'wbr'
	];

	let count = 0;
	voidElements.forEach((element) => {
		const regex = new RegExp(`<${element}[\\s>]`, 'gi');
		const matches = code.match(regex);
		if (matches) {
			count += matches.length;
		}
	});

	return count;
}

export function createCustomCheck(
	elementType: string,
	message: string,
	regex: RegExp | ((code: string) => boolean)
): (code: string) => ValidationError | null {
	return (code: string) => {
		let passed: boolean;

		if (regex instanceof RegExp) {
			passed = regex.test(code);
		} else if (typeof regex === 'function') {
			passed = regex(code);
		} else {
			console.error('Invalid check type provided:', regex);
			return null;
		}

		if (!passed) {
			return {
				type: 'custom',
				message
			};
		}
		return null;
	};
}
