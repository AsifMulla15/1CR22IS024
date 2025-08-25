import React, { useState } from 'react';
import {
	Box,
	Container,
	Typography,
	Stack,
	Button,
	Alert,
	Snackbar,
	Paper,
	Divider,
} from '@mui/material';
import UrlRow from '../components/UrlRow.jsx';
import ResultList from '../components/ResultList.jsx';
import { useLogger } from '../lib/logger.jsx';
import { isValidUrl, parseMinutesOrDefault } from '../lib/validation.js';
import { exists, upsert } from '../lib/storage.js';
import { generateUnique } from '../lib/shortcode.js';

export default function ShortenerPage() {
	const { log, withLogging } = useLogger();
	const [rows, setRows] = useState([
		{ longUrl: '', minutes: '', shortcode: '' },
	]);
	const [error, setError] = useState('');
	const [snack, setSnack] = useState('');
	const [results, setResults] = useState([]);

	const updateRow = (i, value) =>
		setRows((prev) => prev.map((r, idx) => (idx === i ? value : r)));

	const addRow = () =>
		setRows((prev) =>
			prev.length < 5
				? [...prev, { longUrl: '', minutes: '', shortcode: '' }]
				: prev
		);
	const removeRow = (i) =>
		setRows((prev) => prev.filter((_, idx) => idx !== i));

	const submit = withLogging('shorten:submit', async () => {
		setError('');
		const now = Date.now();
		const created = [];

		for (let i = 0; i < rows.length; i++) {
			const { longUrl, minutes, shortcode } = rows[i];
			if (!longUrl?.trim()) {
				setError('Please provide at least one valid URL.');
				break;
			}
			if (!isValidUrl(longUrl)) {
				setError(`Row ${i + 1}: Malformed URL.`);
				break;
			}
			let mins;
			try {
				mins = parseMinutesOrDefault(minutes, 30);
			} catch (e) {
				setError(`Row ${i + 1}: ${e.message}`);
				break;
			}

			let code = (shortcode || '').trim();
			let infoNote = '';
			if (code) {
				if (exists(code)) {
					const newCode = generateUnique(exists);
					infoNote = `Preferred shortcode "${code}" was taken. Generated "${newCode}" instead.`;
					code = newCode;
					setSnack('Preferred shortcode unavailable. We generated a unique one.');
				}
			} else {
				code = generateUnique(exists);
			}

			const expiresAt = new Date(now + mins * 60 * 1000).toISOString();
			const createdAt = new Date(now).toISOString();

			const item = {
				code,
				longUrl,
				createdAt,
				expiresAt,
				clicks: 0,
				clicksDetail: [],
			};
			upsert(item);
			created.push({ ...item, info: infoNote });
			log('short:create', { code, longUrl, expiresAt });
		}

		setResults(created);
	});

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				URL Shortener
			</Typography>
			<Paper variant="outlined" sx={{ p: 2 }}>
				<Stack spacing={2}>
					{rows.map((row, i) => (
						<Box key={i}>
							<UrlRow index={i} row={row} onChange={updateRow} />
							{rows.length > 1 && (
								<Box sx={{ textAlign: 'right', mt: 1 }}>
									<Button
										color="secondary"
										variant="text"
										onClick={() => removeRow(i)}
									>
										Remove
									</Button>
								</Box>
							)}
							{i < rows.length - 1 && <Divider sx={{ my: 2 }} />}
						</Box>
					))}
					<Stack direction="row" spacing={1}>
						<Button
							onClick={addRow}
							disabled={rows.length >= 5}
							variant="outlined"
						>
							Add another URL
						</Button>
						<Button onClick={submit}>Shorten</Button>
					</Stack>
					{error && <Alert severity="error">{error}</Alert>}
				</Stack>
			</Paper>

			<ResultList items={results} />

			<Snackbar
				open={!!snack}
				autoHideDuration={3000}
				onClose={() => setSnack('')}
				message={snack}
			/>
		</Container>
	);
}