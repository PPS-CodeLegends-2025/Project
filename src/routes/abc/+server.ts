import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    return json({
        message: 'Hello, world!',
        a: 3,
        x: [1,2,3]
    });
};