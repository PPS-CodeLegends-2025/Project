import type { ModuleMeta, SectionMeta, Section, Module, ModuleMap } from '$lib/types/module';

// introduction module sections
const introductionSections: SectionMeta[] = [
	{ title: 'Introduction', url: '/module/introduction/01-intro' },
	{ title: 'Web History', url: '/module/introduction/02-history' },
	{ title: 'Understanding Websites', url: '/module/introduction/03-understanding-websites' },
	{ title: 'Frontend vs Backend Development', url: '/module/introduction/04-frontend-vs-backend' },
	{ title: 'Mid-Module Quiz', url: '/module/introduction/05-quiz' },
	{ title: 'Web Development Roles', url: '/module/introduction/06-roles' },
	{ title: 'Essential Tools & Environment', url: '/module/introduction/07-essential-tools' },
	{ title: 'Browser Developer Tools', url: '/module/introduction/08-browser-devtools' },
	{ title: 'Code Editors', url: '/module/introduction/09-code-editors' },
	{ title: 'Git & GitHub', url: '/module/introduction/10-git-github' },
	{ title: 'First Project Setup', url: '/module/introduction/11-first-project-setup' },
	{ title: 'Final Quiz', url: '/module/introduction/12-final-quiz' },
	{ title: 'First HTML Page', url: '/module/introduction/13-first-html-page' }
];

// Define the JavaScript basics module sections
const jsBasicsSections: SectionMeta[] = [
	{ title: 'Introduction', url: '/module/javascript-basics/01-intro' },
	{ title: 'History', url: '/module/javascript-basics/02-history' },
	{ title: 'Syntax', url: '/module/javascript-basics/03-syntax' }
];

// Define the JavaScript functions module sections
const jsFunctionsSections: SectionMeta[] = [
	{ title: 'Introduction to Functions', url: '/module/javascript-functions/01-intro' },
	{ title: 'Function Parameters', url: '/module/javascript-functions/02-parameters' },
	{ title: 'Return Values', url: '/module/javascript-functions/03-return-values' }
];

// Define all modules
const moduleMap: Record<
	string,
	{
		data: ModuleMeta;
		sections: SectionMeta[];
	}
> = {
	'/module/introduction': {
		data: {
			image: '/images/courses/web.webp',
			level: 'Beginner',
			xpReward: 10,
			category: 'General',
			title: 'Web Dev Introduction',
			description: 'Introduction to web development.',
			url: '/module/introduction'
		},
		sections: introductionSections
	},
	'/module/javascript-basics': {
		data: {
			image: '/images/js-logo.png',
			level: 'Beginner',
			xpReward: 20,
			category: 'JavaScript',
			title: 'JavaScript Basics',
			description: 'Learn the basics of JavaScript programming language.',
			url: '/module/javascript-basics'
		},
		sections: jsBasicsSections
	},
	'/module/javascript-functions': {
		data: {
			image: '/images/js-logo.png',
			level: 'Beginner',
			xpReward: 50,
			category: 'JavaScript',
			title: 'JavaScript Functions',
			description: 'Learn how to create and use functions in JavaScript.',
			url: '/module/javascript-functions'
		},
		sections: jsFunctionsSections
	}
};

export const modules = {
	map() {
		return moduleMap;
	},
	list() {
		return Object.keys(moduleMap).map((x) => moduleMap[x].data);
	},
	navMap() {
		return Object.keys(moduleMap).map((x) => ({
			title: moduleMap[x].data.title,
			url: moduleMap[x].data.url
		}));
	},
	getModule(path: string) {
		return moduleMap[path] || null;
	},
	async markSectionCompleted(userId: string, moduleId: string, sectionIndex: number) {
		try {
			const normalizedModuleId = moduleId.startsWith('/') ? moduleId : `/${moduleId}`;

			const response = await fetch('/api/progress', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					userId,
					moduleId: normalizedModuleId,
					sectionIndex
				})
			});

			if (!response.ok) {
				throw new Error('Failed to mark section as completed');
			}

			return true;
		} catch (error) {
			console.error('Failed to mark section as completed:', error);
			throw error;
		}
	}
};

export type { ModuleMap, Module, ModuleMeta, SectionMeta, Section };
