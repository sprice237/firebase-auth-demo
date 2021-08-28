import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { AppThemeProvider } from '$theme';
import { Cmp } from '$types';
import { AppRouter } from './routes/AppRouter';

export const App: Cmp = () => {
  return (
    <Router>
      <AppThemeProvider>
        <CssBaseline />
        <AppRouter />
      </AppThemeProvider>
    </Router>
  );
};
