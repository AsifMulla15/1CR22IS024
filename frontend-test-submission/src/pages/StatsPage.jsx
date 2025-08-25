
import React, { useMemo } from 'react';
import {
	Container,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Stack,
	Link,
	Chip,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { list } from '../lib/storage.js';

export default function StatsPage() {
	const data = useMemo(() => list(), []);

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				URL Statistics
			</Typography>

			{data.length > 0 && (
				<Paper variant="outlined">
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Short URL</TableCell>
								<TableCell>Original</TableCell>
								<TableCell>Created</TableCell>
								<TableCell>Expires</TableCell>
								<TableCell>Clicks</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((d) => (
								<TableRow key={d.code} hover>
									<TableCell>
										<Stack direction="row" spacing={1} alignItems="center">
											<Link href={`http://localhost:3000/${d.code}`}>{`/${d.code}`}</Link>
											{new Date(d.expiresAt) < new Date() && (
												<Chip size="small" color="warning" label="Expired" />
											)}
										</Stack>
									</TableCell>
									<TableCell
										sx={{
											maxWidth: 360,
											overflow: 'hidden',
											textOverflow: 'ellipsis',
										}}
									>
										<Link href={d.longUrl} target="_blank" rel="noreferrer">
											{d.longUrl}
										</Link>
									</TableCell>
									<TableCell>{new Date(d.createdAt).toLocaleString()}</TableCell>
									<TableCell>{new Date(d.expiresAt).toLocaleString()}</TableCell>
									<TableCell>{d.clicks || 0}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
			)}

			{data.map((d) => (
				<Accordion key={`a-${d.code}`} sx={{ mt: 2 }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						Detail for /{d.code}
					</AccordionSummary>
					<AccordionDetails>
						<Typography variant="subtitle1" gutterBottom>
							Click Events
						</Typography>
						{!(d.clicksDetail?.length) && (
							<Typography color="text.secondary">No clicks yet.</Typography>
						)}
						{d.clicksDetail?.length > 0 && (
							<Paper variant="outlined">
								<Table size="small">
									<TableHead>
										<TableRow>
											<TableCell>Timestamp</TableCell>
											<TableCell>Source</TableCell>
											<TableCell>Coarse Location</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{d.clicksDetail.map((c, idx) => (
											<TableRow key={idx}>
												<TableCell>{new Date(c.ts).toLocaleString()}</TableCell>
												<TableCell>{c.source || 'direct'}</TableCell>
												<TableCell>{c.location || 'unknown'}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</Paper>
						)}
					</AccordionDetails>
				</Accordion>
			))}
		</Container>
	);
}