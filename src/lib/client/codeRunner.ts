import { browser as _$$browser } from '$app/environment';

class ConsoleReplacement {
	private logs: {
		level: string;
		message: string;
		time: number;
	}[];

	constructor() {
		this.logs = [];
	}

	private _log(level: string, args: unknown) {
		const argsArray = Array.isArray(args) ? args : [args];
		this.logs.push({
			level: level,
			message: argsArray.map((arg) => JSON.stringify(arg)).join(' '),
			time: Date.now()
		});
	}

	log(args: unknown) {
		this._log('log', args);
	}

	warn(args: unknown) {
		this._log('warn', args);
	}

	error(args: unknown) {
		this._log('error', args);
	}

	clear() {
		this.logs = [];
	}

	data() {
		return this.logs;
	}
}

async function evalPlus<T = unknown>(
	_$$code: string
): Promise<{ console: ReturnType<ConsoleReplacement['data']>; output: T }> {
	if (!_$$browser) throw new Error('Exec code can only be called in the browser');
	const console = Object.freeze(new ConsoleReplacement());
	const output = (await eval(_$$code)) as T;
	return { console: console.data(), output };
}

function buildFunctionExecutionCode(functionName: string, args: unknown[]) {
	return `${functionName}(${args.map((arg) => JSON.stringify(arg)).join(',')})`;
}

async function runFunction<T = unknown>(code: string, functionName: string, args: unknown[]) {
	try {
		return await evalPlus<T>(`${code};\n${buildFunctionExecutionCode(functionName, args)}`).then(
			({ output }) => output
		);
	} catch (e) {
		console.error(e);

		if (e instanceof Error)
			throw new Error(`Error while running function ${functionName}: ${e.message}`);
		else throw new Error(`Error while running function ${functionName}`);
	}
}

async function runFunctionWithTests(
	code: string,
	functionName: string,
	tests: { input: unknown[]; output: unknown }[]
) {
	try {
		for (const { input, output } of tests) {
			const result = await codeRunner.runFunction(code, functionName, input);

			if (result !== output) {
				return {
					success: false,
					message: `Expected ${output}, but got ${result} when calling ${functionName}(${input.join(', ')})`
				};
			}
		}

		return { success: true, message: 'All tests passed!' };
	} catch (e) {
		if (e instanceof Error)
			return {
				success: false,
				message: `Error executing your code: ${e.message}`
			};

		return {
			success: false,
			message: 'An error occurred while running your code. Please try again.'
		};
	}
}

export const codeRunner = {
	runCode: evalPlus,
	runFunction,
	runFunctionWithTests
};
