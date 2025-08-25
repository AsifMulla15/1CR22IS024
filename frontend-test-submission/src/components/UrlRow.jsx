import React from 'react';
import { Grid, TextField } from '@mui/material';

export default function UrlRow({ index, row, onChange }) {
	const handle = (k) => (e) => onChange(index, { ...row, [k]: e.target.value });

	return (
		<Grid container spacing={2} alignItems="center">
			<Grid item xs={12} md={6}>
				<TextField
					fullWidth
					label="Original Long URL"
					placeholder="https://example.com/page"
					value={row.longUrl}
					onChange={handle('longUrl')}
				/>
			</Grid>
			<Grid item xs={6} md={3}>
				<TextField
					fullWidth
					type="number"
					label="Validity (minutes, optional)"
					placeholder="30"
					value={row.minutes}
					onChange={handle('minutes')}
				/>
			</Grid>
			<Grid item xs={6} md={3}>
				<TextField
					fullWidth
					label="Preferred Shortcode (optional)"
					placeholder="mycode"
					value={row.shortcode}
					onChange={handle('shortcode')}
				/>
			</Grid>
		</Grid>
	);
}