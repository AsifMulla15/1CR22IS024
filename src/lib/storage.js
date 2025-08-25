
/**
 * Storage schema (localStorage):
 * __shorts__: {
 *   [code]: {
 *     code, longUrl, createdAt, expiresAt, clicks: number,
 *     clicksDetail: [{ ts, source, location }]
 *   }
 * }
 */
const KEY = '__shorts__';

export function loadAll() {
	try {
		const raw = localStorage.getItem(KEY);
		const data = raw ? JSON.parse(raw) : {};
		return data;
	} catch {
		return {};
	}
}

export function saveAll(data) {
	try {
		localStorage.setItem(KEY, JSON.stringify(data));
	} catch {}
}

export function upsert(shortObj) {
	const db = loadAll();
	db[shortObj.code] = shortObj;
	saveAll(db);
}

export function get(code) {
	const db = loadAll();
	return db[code] || null;
}

export function exists(code) {
	const db = loadAll();
	return Boolean(db[code]);
}

export function list() {
	const db = loadAll();
	return Object.values(db).sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	);
}

export function recordClick(code, detail) {
	const db = loadAll();
	const item = db[code];
	if (!item) return;
	item.clicks = (item.clicks || 0) + 1;
	item.clicksDetail = item.clicksDetail || [];
	item.clicksDetail.push(detail);
	saveAll(db);
}