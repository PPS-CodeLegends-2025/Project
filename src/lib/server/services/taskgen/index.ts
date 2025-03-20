import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import { openaiClient } from './oai';

const DataTypes = z.enum(['number', 'string', 'boolean', 'array', 'object']);

const Task = z.object({
	name: z.string(),
	description: z.string(),
	inputs: z.array(DataTypes),
	output: z.object({
		type: DataTypes
	}),
	exampleData: z.array(
		z.object({
			input: z.array(
				z.union([
					z.number(),
					z.string(),
					z.boolean(),
					z.array(z.union([z.number(), z.string(), z.boolean()]))
				])
			),
			output: z.union([
				z.number(),
				z.string(),
				z.boolean(),
				z.array(z.union([z.number(), z.string(), z.boolean()]))
			])
		})
	),
	exampleCode: z.string()
});

export type GeneratedTask = z.infer<typeof Task>;

export async function generateTask(prompt: string): Promise<GeneratedTask> {
	const completion = await openaiClient.beta.chat.completions.parse({
		model: 'gpt-4o-2024-08-06',
		messages: [
			{
				role: 'system',
				content:
					'Generate a javascript task based on the prompt. Function in example code should only contain the function named "solution", without any additional code (comments are allowed).'
			},
			{ role: 'user', content: prompt }
		],
		response_format: zodResponseFormat(Task, 'task')
	});
	const task = completion.choices[0].message.parsed;
	if (!task) throw new Error('Failed to generate task');
	return task;
}
