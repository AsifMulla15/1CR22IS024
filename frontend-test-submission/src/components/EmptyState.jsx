
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function EmptyState({
	title = 'Nothing here yet',
	subtitle = 'Create your first short link above.',
}) {
	return (
		<Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
			<Typography variant="h6" gutterBottom>
				{title}
			</Typography>
			<Typography variant="body2">{subtitle}</Typography>
		</Box>
	);
}