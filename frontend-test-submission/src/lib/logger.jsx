
import React, { createContext, useContext, useMemo } from 'react';
import { Log as baseLog } from "@logging/logger.js";

const STORAGE_KEY = '__logs__';

function loadLogs() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

function saveLogs(logs) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
	} catch {}
}

function addLog(entry) {
	const logs = loadLogs();
	const enriched = {
		id: crypto.randomUUID(),
		ts: new Date().toISOString(),
		...entry,
	};
	logs.push(enriched);
	saveLogs(logs);
	return enriched;
}

export function getLogs() {
	return loadLogs();
}

export const LoggerContext = createContext({
	log: () => {},
	withLogging: (fn) => fn,
});

export function LoggerProvider({ children }) {
	const api = useMemo(
		() => ({
			log: (type, payload = {}) => addLog({ type, payload }),
			withLogging: (label, fn) =>
				async (...args) => {
					addLog({
						type: 'action:start',
						payload: { label, argsLen: args.length },
					});
					try {
						const res = await fn(...args);
						addLog({ type: 'action:success', payload: { label } });
						return res;
					} catch (err) {
						addLog({
							type: 'action:error',
							payload: { label, message: String(err?.message || err) },
						});
						throw err;
					}
				},
		}),
		[]
	);

	return (
		<LoggerContext.Provider value={api}>{children}</LoggerContext.Provider>
	);
}

export function useLogger() {
	return useContext(LoggerContext);
}