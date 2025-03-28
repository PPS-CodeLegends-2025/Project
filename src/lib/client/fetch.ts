function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;

	const apiUrl = `/api${normalizedPath}`;

	const fetchOptions: RequestInit = {
		...options,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			...options.headers
		}
	};

	return fetch(apiUrl, fetchOptions);
}

function apiGet(path: string, options: RequestInit = {}): Promise<Response> {
	return apiFetch(path, { ...options, method: 'GET' });
}

function apiPost(path: string, data?: unknown, options: RequestInit = {}): Promise<Response> {
	return apiFetch(path, {
		...options,
		method: 'POST',
		body: data ? JSON.stringify(data) : undefined
	});
}

export const apiClient = {
	fetch: apiFetch,
	get: apiGet,
	post: apiPost
};
