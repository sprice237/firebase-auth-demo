import React from 'react';
import Button from '@material-ui/core/Button';
import { AppThemeProvider } from '$theme';

export const App: React.FC = () => {
  return (
    <AppThemeProvider>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </AppThemeProvider>
  );
};
