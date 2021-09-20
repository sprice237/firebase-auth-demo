import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { GqlProvider } from '@sprice237/firebase-auth-demo-gql';
import { AppThemeProvider } from '$theme';
import { Cmp } from '$types';
import { useCurrentUserAuthToken } from '$utils/firebase';
import { AppRouter } from './routes/AppRouter';
import { LoadingModal } from './utils/LoadingModal';

export const App: Cmp = () => {
  const [userToken, isInitialized] = useCurrentUserAuthToken();

  return (
    <GqlProvider token={userToken}>
      {!isInitialized && <LoadingModal />}
      {isInitialized && (
        <Router>
          <AppThemeProvider>
            <CssBaseline />
            <AppRouter />
          </AppThemeProvider>
        </Router>
      )}
    </GqlProvider>
  );
};
