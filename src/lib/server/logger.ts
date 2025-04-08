import { dev } from '$app/environment';
import pino from 'pino';

export const logger = pino(
	dev
		? undefined
		: pino.destination({
				dest: `./codelegends-server-${new Date().toISOString()}.log`,
				minLength: 4096,
				sync: false
			})
);
