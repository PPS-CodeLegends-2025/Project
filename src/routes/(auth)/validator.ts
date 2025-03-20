export function validateUsername(username: unknown): username is string {
	return typeof username === 'string' && /^[a-zA-Z0-9]{3,31}$/.test(username);
}

export function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}
