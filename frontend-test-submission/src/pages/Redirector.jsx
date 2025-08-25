
import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Paper, Typography, Button } from '@mui/material';
import { get, recordClick } from '../lib/storage.js';
import { useLogger } from '../lib/logger.jsx';

function getCoarseLocationSync() {
	const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const lang = navigator.language;
	return `${lang}, ${tz}`;
}

export default function Redirector() {
	const { code } = useParams();
	const { log } = useLogger();
	const [state, setState] = useState({ status: 'loading', msg: '' });

	useEffect(() => {
		const entry = get(code);
		if (!entry) {
			log('redirect:not_found', { code });
			setState({ status: 'error', msg: 'Short link not found.' });
			return;
		}
		const now = new Date();
		if (new Date(entry.expiresAt) < now) {
			log('redirect:expired', { code });
			setState({ status: 'error', msg: 'This short link has expired.' });
			return;
		}

		const detail = {
			ts: now.toISOString(),
			source: document.referrer || 'direct',
			location: getCoarseLocationSync(),
		};
		recordClick(code, detail);
		log('redirect:hit', { code, source: detail.source });

		window.location.href = entry.longUrl;
	}, [code, log]);

	if (state.status === 'loading') return null;

	if (state.status === 'error') {
		return (
			<Container maxWidth="sm" sx={{ py: 6 }}>
				<Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
					<Typography variant="h5" gutterBottom>
						Unable to redirect
					</Typography>
					<Typography color="text.secondary" gutterBottom>
						{state.msg}
					</Typography>
					<Button component={RouterLink} to="/" sx={{ mt: 2 }}>
						Go to Shortener
					</Button>
				</Paper>
			</Container>
		);
	}

	return null;
}