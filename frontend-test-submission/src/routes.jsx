// src/routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ShortenerPage from './pages/ShortenerPage.jsx';
import StatsPage from './pages/StatsPage.jsx';
import Redirector from './pages/Redirector.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ShortenerPage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path=":code" element={<Redirector />} />
    </Routes>
  );
}
