import React from 'react';
import { Box } from '@mui/material';
import Header from './components/Header.jsx';
import AppRoutes from './routes.jsx';

export default function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <AppRoutes />
    </Box>
  );
}
