export const moduleList = [
	{
		id: 1,
		title: 'JavaScript Fundamentals',
		description: 'Learn the core concepts of JavaScript programming',
		level: 'Beginner',
		xpReward: 500,
		progress: 0,
		lessons: 10,
		category: 'JavaScript',
		image: '/images/js-logo.png'
	},
	{
		id: 2,
		title: 'Advanced JavaScript',
		description: 'Dive deeper into JavaScript with advanced topics',
		level: 'Intermediate',
		xpReward: 800,
		progress: 25,
		lessons: 12,
		category: 'JavaScript',
		image: '/images/js-logo.png'
	},
	{
		id: 3,
		title: 'TypeScript Basics',
		description: 'Start your journey with TypeScript',
		level: 'Beginner',
		xpReward: 600,
		progress: 0,
		lessons: 8,
		category: 'TypeScript',
		image: '/images/ts-logo.png'
	},
	{
		id: 4,
		title: 'Svelte for Beginners',
		description: 'Learn the Svelte framework from scratch',
		level: 'Beginner',
		xpReward: 600,
		progress: 75,
		lessons: 8,
		category: 'Frameworks',
		image: '/images/svelte-logo.png'
	}
];

export const moduleWithSections = [
	{
		id: 1,
		title: 'JavaScript Fundamentals',
		description: 'Learn the core concepts of JavaScript programming',
		level: 'Beginner',
		xpReward: 500,
		progress: 0,
		lessons: 10,
		category: 'JavaScript',
		image: '/images/js-logo.png',
		content: 'This is the detailed content for JavaScript Fundamentals module.',
		sections: [
			{
				id: 'introduction',
				title: 'Introduction to JavaScript',
				isCompleted: false,
				content:
					'JavaScript is a programming language that enables interactive web pages. This section covers the basics of what JavaScript is and its role in web development.'
			},
			{
				id: 'variables',
				title: 'Variables and Data Types',
				isCompleted: false,
				content:
					'Learn how to declare variables and understand the different data types in JavaScript, including strings, numbers, booleans, and objects.'
			},
			{
				id: 'functions',
				title: 'Working with Functions',
				isCompleted: false,
				content:
					'Functions are reusable blocks of code. This section explains how to define and call functions, pass parameters, and return values.'
			}
		]
	},
	{
		id: 2,
		title: 'Advanced JavaScript',
		description: 'Dive deeper into JavaScript with advanced topics',
		level: 'Intermediate',
		xpReward: 800,
		progress: 25,
		lessons: 12,
		category: 'JavaScript',
		image: '/images/js-logo.png',
		content: 'This is the detailed content for Advanced JavaScript module.',
		sections: [
			{
				id: 'closures',
				title: 'Closures and Scope',
				isCompleted: true,
				content: 'Understand JavaScript closures and how scope works in JavaScript applications.'
			},
			{
				id: 'promises',
				title: 'Promises and Async/Await',
				isCompleted: false,
				content:
					'Learn how to work with asynchronous code using Promises and the async/await syntax.'
			},
			{
				id: 'modules',
				title: 'JavaScript Modules',
				isCompleted: false,
				content:
					'Explore how to organize your code using JavaScript modules with import and export statements.'
			}
		]
	},
	{
		id: 3,
		title: 'TypeScript Basics',
		description: 'Start your journey with TypeScript',
		level: 'Beginner',
		xpReward: 600,
		progress: 0,
		lessons: 8,
		category: 'TypeScript',
		image: '/images/ts-logo.png',
		content: 'This is the detailed content for TypeScript Basics module.',
		sections: [
			{
				id: 'intro',
				title: 'Introduction to TypeScript',
				isCompleted: false,
				content: 'Learn what TypeScript is and how it enhances JavaScript with static types.'
			},
			{
				id: 'types',
				title: 'Basic Types',
				isCompleted: false,
				content: 'Explore the basic types available in TypeScript and how to use them effectively.'
			},
			{
				id: 'interfaces',
				title: 'Interfaces and Type Aliases',
				isCompleted: false,
				content:
					'Learn how to define complex types using interfaces and type aliases in TypeScript.'
			}
		]
	},
	{
		id: 4,
		title: 'Svelte for Beginners',
		description: 'Learn the Svelte framework from scratch',
		level: 'Beginner',
		xpReward: 600,
		progress: 75,
		lessons: 8,
		category: 'Frameworks',
		image: '/images/svelte-logo.png',
		content: 'This is the detailed content for Svelte for Beginners module.',
		sections: [
			{
				id: 'getting-started',
				title: 'Getting Started with Svelte',
				isCompleted: true,
				content: 'Learn how to set up a new Svelte project and understand its basic structure.'
			},
			{
				id: 'components',
				title: 'Svelte Components',
				isCompleted: true,
				content: 'Explore how to create and use components in Svelte applications.'
			},
			{
				id: 'reactivity',
				title: 'Reactivity in Svelte',
				isCompleted: false,
				content:
					"Understand Svelte's unique approach to reactivity and how to leverage it in your applications."
			}
		]
	}
];

export const moduleWithSections2 = [
	{
		id: 1,
		title: 'JavaScript Fundamentals',
		description: 'Learn the core concepts of JavaScript programming',
		level: 'Beginner',
		xpReward: 500,
		progress: 0,
		lessons: 10,
		category: 'JavaScript',
		image: '/images/js-logo.png',
		content: 'This is the detailed content for JavaScript Fundamentals module.',
		sections: [
			{ id: 'introduction', title: 'Introduction to JavaScript', isCompleted: false },
			{ id: 'variables', title: 'Variables and Data Types', isCompleted: false },
			{ id: 'functions', title: 'Working with Functions', isCompleted: false }
		]
	},
	{
		id: 2,
		title: 'Advanced JavaScript',
		description: 'Dive deeper into JavaScript with advanced topics',
		level: 'Intermediate',
		xpReward: 800,
		progress: 25,
		lessons: 12,
		category: 'JavaScript',
		image: '/images/js-logo.png',
		content: 'This is the detailed content for Advanced JavaScript module.',
		sections: [
			{ id: 'closures', title: 'Closures and Scope', isCompleted: true },
			{ id: 'promises', title: 'Promises and Async/Await', isCompleted: false },
			{ id: 'modules', title: 'JavaScript Modules', isCompleted: false }
		]
	},
	{
		id: 3,
		title: 'TypeScript Basics',
		description: 'Start your journey with TypeScript',
		level: 'Beginner',
		xpReward: 600,
		progress: 0,
		lessons: 8,
		category: 'TypeScript',
		image: '/images/ts-logo.png',
		content: 'This is the detailed content for TypeScript Basics module.',
		sections: [
			{ id: 'intro', title: 'Introduction to TypeScript', isCompleted: false },
			{ id: 'types', title: 'Basic Types', isCompleted: false },
			{ id: 'interfaces', title: 'Interfaces and Type Aliases', isCompleted: false }
		]
	},
	{
		id: 4,
		title: 'Svelte for Beginners',
		description: 'Learn the Svelte framework from scratch',
		level: 'Beginner',
		xpReward: 600,
		progress: 75,
		lessons: 8,
		category: 'Frameworks',
		image: '/images/svelte-logo.png',
		content: 'This is the detailed content for Svelte for Beginners module.',
		sections: [
			{ id: 'getting-started', title: 'Getting Started with Svelte', isCompleted: true },
			{ id: 'components', title: 'Svelte Components', isCompleted: true },
			{ id: 'reactivity', title: 'Reactivity in Svelte', isCompleted: false }
		]
	}
];
