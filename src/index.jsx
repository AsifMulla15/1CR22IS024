import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App.jsx";
import theme from "./theme.js";


import { LoggerProvider } from "./lib/logger.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoggerProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </LoggerProvider>
  </React.StrictMode>
);
