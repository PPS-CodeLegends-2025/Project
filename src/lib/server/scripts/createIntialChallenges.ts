import type { Challenge } from '$server/db/schema';
import { logger } from '$server/logger';
import { challenges } from '$services/challenge';
import type { GeneratedTaskTemplate } from '$services/taskgen';

export async function createInitialChallenges() {
	const count = await challenges.getChallengeCount();

	if (count > 5) return;

	const challengesToCreate: { challenge: Challenge; task: GeneratedTaskTemplate }[] = [
		{
			challenge: {
				title: 'First Steps',
				description: 'Your first steps in the world of coding!',
				difficulty: 'Easy',
				category: 'JavaScript',
				xp: 50,
				timeEstimate: '10 minutes'
			},
			task: {
				name: 'Hello World',
				description: 'Create a function that returns "Hello, World!"',
				inputs: [],
				output: { type: 'string' },
				tests: [
					{
						input: [],
						output: 'Hello, World!'
					}
				],
				exampleCode: ''
			}
		},
		{
			challenge: {
				title: 'Basic Math 01',
				description: 'Learn to do basic math operations!',
				difficulty: 'Easy',
				category: 'JavaScript',
				xp: 50,
				timeEstimate: '10 minutes'
			},
			task: {
				name: 'Simple Addition',
				description: 'Create a function that adds two numbers',
				inputs: ['number', 'number'],
				output: { type: 'number' },
				tests: [
					{
						input: [1, 2],
						output: 3
					},
					{
						input: [5, 7],
						output: 12
					}
				],
				exampleCode: ''
			}
		},
		{
			challenge: {
				title: 'Basic Math 02',
				description: 'Learn to do basic math operations!',
				difficulty: 'Easy',
				category: 'JavaScript',
				xp: 50,
				timeEstimate: '10 minutes'
			},
			task: {
				name: 'Simple Subtraction',
				description: 'Create a function that subtracts two numbers',
				inputs: ['number', 'number'],
				output: { type: 'number' },
				tests: [
					{
						input: [5, 2],
						output: 3
					},
					{
						input: [10, 7],
						output: 3
					}
				],
				exampleCode: ''
			}
		},
		{
			challenge: {
				title: 'Basic Math 03',
				description: 'Learn to do basic math operations!',
				difficulty: 'Easy',
				category: 'JavaScript',
				xp: 50,
				timeEstimate: '10 minutes'
			},
			task: {
				name: 'Simple Multiplication',
				description: 'Create a function that multiplies two numbers',
				inputs: ['number', 'number'],
				output: { type: 'number' },
				tests: [
					{
						input: [2, 3],
						output: 6
					},
					{
						input: [4, 5],
						output: 20
					}
				],
				exampleCode: ''
			}
		},
		{
			challenge: {
				title: 'Basic Math 04',
				description: 'Learn to do basic math operations!',
				difficulty: 'Easy',
				category: 'JavaScript',
				xp: 50,
				timeEstimate: '10 minutes'
			},
			task: {
				name: 'Simple Division',
				description:
					'Create a function that divides two numbers, returning "undefined" if dividing by zero',
				inputs: ['number', 'number'],
				output: { type: 'number' },
				tests: [
					{
						input: [6, 3],
						output: 2
					},
					{
						input: [15, 5],
						output: 3
					},
					{
						input: [10, 0],
						output: 'undefined'
					}
				],
				exampleCode: ''
			}
		}
	];

	for (const chal of challengesToCreate)
		await challenges.createChallenge(chal.challenge, chal.task);

	logger.info('Initial challenges created!');
}
