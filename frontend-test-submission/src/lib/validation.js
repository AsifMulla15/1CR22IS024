
export function isValidUrl(url) {
	try {
		const u = new URL(url);
		return ['http:', 'https:'].includes(u.protocol);
	} catch {
		return false;
	}
}

export function parseMinutesOrDefault(minStr, def = 30) {
	if (
		minStr === undefined ||
		minStr === null ||
		String(minStr).trim() === ''
	)
		return def;
	const n = Number(minStr);
	if (!Number.isFinite(n) || n <= 0)
		throw new Error('Validity must be a positive number of minutes.');
	return Math.min(n, 60 * 24 * 30); // cap at 30 days for safety
}