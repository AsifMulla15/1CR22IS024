
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Header() {
	return (
		<AppBar
			position="sticky"
			color="default"
			elevation={0}
			sx={{ borderBottom: 1, borderColor: 'divider' }}
		>
			<Toolbar>
				<Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
					AffordMed – URL Shortener
				</Typography>
				<Stack direction="row" spacing={1}>
					<Button component={RouterLink} to="/" color="primary">
						Shorten
					</Button>
					<Button component={RouterLink} to="/stats" color="primary">
						Statistics
					</Button>
				</Stack>
			</Toolbar>
		</AppBar>
	);
}