import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: { main: '#0066cc' },
		secondary: { main: '#0f9d58' },
	},
	shape: { borderRadius: 14 },
	components: {
		MuiButton: {
			defaultProps: { variant: 'contained' },
		},
	},
});

export default theme;