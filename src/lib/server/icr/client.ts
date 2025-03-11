import { OPEN_AI_API_KEY } from '$env/static/private';
import OpenAI from 'openai';

export const openaiClient = new OpenAI({ apiKey: OPEN_AI_API_KEY });
