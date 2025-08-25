
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function randomCode(len = 6) {
	let s = '';
	const n = alphabet.length;
	for (let i = 0; i < len; i++) {
		s += alphabet[Math.floor(Math.random() * n)];
	}
	return s;
}

export function generateUnique(existsFn) {
	let code = randomCode();
	while (existsFn(code)) {
		code = randomCode();
	}
	return code;
}