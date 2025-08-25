
import React from 'react';
import { Card, CardContent, Typography, Stack, Link, Chip } from '@mui/material';

export default function ResultList({ items }) {
	if (!items?.length) return null;
	return (
		<Stack spacing={2} sx={{ mt: 2 }}>
			{items.map((it) => (
				<Card key={it.code} variant="outlined">
					<CardContent>
						<Stack spacing={1}>
							<Typography variant="subtitle2" color="text.secondary">
								Original
							</Typography>
							<Link href={it.longUrl} target="_blank" rel="noreferrer">
								{it.longUrl}
							</Link>
							<Typography
								variant="subtitle2"
								sx={{ mt: 1 }}
								color="text.secondary"
							>
								Short URL
							</Typography>
							<Link href={`http://localhost:3000/${it.code}`}>{
								`http://localhost:3000/${it.code}`
							}</Link>
							<Stack direction="row" spacing={1} sx={{ mt: 1 }}>
								<Chip
									label={`Created: ${new Date(it.createdAt).toLocaleString()}`}
								/>
								<Chip
									color="secondary"
									label={`Expires: ${new Date(it.expiresAt).toLocaleString()}`}
								/>
							</Stack>
							{it.info && (
								<Typography variant="caption" color="warning.main">
									{it.info}
								</Typography>
							)}
						</Stack>
					</CardContent>
				</Card>
			))}
		</Stack>
	);
}