import type { Challenge } from '$server/db/schema';
import { logger } from '$server/logger';
import { challenges } from '$services/challenge';
import type { GeneratedTaskTemplate } from '$services/taskgen';

export async function createInitialChallenges() {
	const count = await challenges.getChallengeCount();

	if (count > 4) return;

	const challengesToCreate: { challenge: Challenge; task: GeneratedTaskTemplate }[] = [
		{
			challenge: {
				title: 'First Steps',
				description: 'Your first steps in the world of coding!',
				difficulty: 'Easy',
				category: 'Tutorial',
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
				category: 'Tutorial',
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
				category: 'Tutorial',
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
				category: 'Tutorial',
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
				category: 'Tutorial',
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
		},
		{
			challenge: {
				title: 'Basic Math 05',
				description: 'Learn to do basic math operations!',
				difficulty: 'Medium',
				category: 'Tutorial',
				xp: 50,
				timeEstimate: '10 minutes'
			},
			task: {
				name: 'Simple Modulus',
				description: 'Create a function that returns the modulus of two numbers',
				inputs: ['number', 'number'],
				output: { type: 'number' },
				tests: [
					{
						input: [5, 2],
						output: 1
					},
					{
						input: [10, 3],
						output: 1
					}
				],
				exampleCode: ''
			}
		},
		{
			challenge: {
				title: 'Basic Math 06',
				description: 'Learn to do basic math operations!',
				difficulty: 'Medium',
				category: 'Tutorial',
				xp: 50,
				timeEstimate: '10 minutes'
			},
			task: {
				name: 'Simple Exponentiation',
				description: 'Create a function that raises a number to the power of another number',
				inputs: ['number', 'number'],
				output: { type: 'number' },
				tests: [
					{
						input: [2, 3],
						output: 8
					},
					{
						input: [4, 2],
						output: 16
					}
				],
				exampleCode: ''
			}
		},
		{
			challenge: {
				title: 'Basic Math 07',
				description:
					'Create a function that returns the square root of a number, returning "undefined" if the number is negative',
				difficulty: 'Medium',
				category: 'Tutorial',
				xp: 50,
				timeEstimate: '10 minutes'
			},
			task: {
				name: 'Simple Square Root',
				description:
					'Create a function that returns the square root of a number, returning "undefined" if the number is negative',
				inputs: ['number'],
				output: { type: 'number' },
				tests: [
					{
						input: [4],
						output: 2
					},
					{
						input: [16],
						output: 4
					},
					{
						input: [-4],
						output: 'undefined'
					}
				],
				exampleCode: ''
			}
		},
		{
			challenge: {
				title: 'Is a Palindrome',
				description: 'Create a function that checks if a string is a palindrome',
				difficulty: 'Medium',
				category: 'Strings',
				xp: 50,
				timeEstimate: '10 minutes'
			},
			task: {
				name: 'Is Palindrome',
				description: 'Create a function that checks if a string is a palindrome',
				inputs: ['string'],
				output: { type: 'boolean' },
				tests: [
					{
						input: ['racecar'],
						output: true
					},
					{
						input: ['hello'],
						output: false
					}
				],
				exampleCode: ''
			}
		},
		{
			challenge: {
				title: 'FizzBuzz',
				description: 'Create a function that returns "Fizz", "Buzz", or "FizzBuzz"',
				difficulty: 'Medium',
				category: 'Logic',
				xp: 50,
				timeEstimate: '10 minutes'
			},
			task: {
				name: 'FizzBuzz',
				description:
					'Create a function that returns "Fizz" if the number is divisible by 3, "Buzz" if divisible by 5, and "FizzBuzz" if divisible by both',
				inputs: ['number'],
				output: { type: 'string' },
				tests: [
					{
						input: [3],
						output: 'Fizz'
					},
					{
						input: [5],
						output: 'Buzz'
					},
					{
						input: [15],
						output: 'FizzBuzz'
					},
					{
						input: [7],
						output: '7'
					},
					{
						input: [0],
						output: 'FizzBuzz'
					}
				],
				exampleCode: ''
			}
		},
		{
			challenge: {
				title: 'Advanced Math',
				description: 'Create a function that calculates the factorial of a number',
				difficulty: 'Hard',
				category: 'Math',
				xp: 50,
				timeEstimate: '10 minutes'
			},
			task: {
				name: 'Factorial',
				description: 'Create a function that calculates the factorial of a number',
				inputs: ['number'],
				output: { type: 'number' },
				tests: [
					{
						input: [5],
						output: 120
					},
					{
						input: [0],
						output: 1
					},
					{
						input: [1],
						output: 1
					},
					{
						input: [10],
						output: 3628800
					}
				],
				exampleCode: ''
			}
		},
		{
			challenge: {
				title: 'Fibonacci Sequence',
				description: 'Create a function that returns the nth Fibonacci number',
				difficulty: 'Hard',
				category: 'Math',
				xp: 50,
				timeEstimate: '10 minutes'
			},
			task: {
				name: 'Fibonacci',
				description: 'Create a function that returns the nth Fibonacci number',
				inputs: ['number'],
				output: { type: 'number' },
				tests: [
					{
						input: [0],
						output: 0
					},
					{
						input: [1],
						output: 1
					},
					{
						input: [2],
						output: 1
					},
					{
						input: [3],
						output: 2
					},
					{
						input: [4],
						output: 3
					},
					{
						input: [5],
						output: 5
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
