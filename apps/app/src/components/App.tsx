import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GqlProvider } from '@sprice237/firebase-auth-demo-gql';
import { Sidebar } from '$cmp/sidebar/Sidebar';
import { AppContentWrapper } from '$cmp/styling/AppContentWrapper';
import { StyleWrapper } from '$cmp/styling/StyleWrapper';
import { Cmp } from '$types';
import { useCurrentUser, useCurrentUserAuthToken } from '$utils/firebase';
import { AppRouter } from '$utils/routing';
import { LoadingModal } from './utils/LoadingModal';

export const App: Cmp = () => {
  const [userToken, isFirebaseAuthTokenInitialized] = useCurrentUserAuthToken();
  const [user, isFirebaseAuthInitialized] = useCurrentUser();

  const isInitialized = isFirebaseAuthTokenInitialized && isFirebaseAuthInitialized;

  return (
    <StyleWrapper>
      {!isInitialized && <LoadingModal />}
      {isInitialized && (
        <GqlProvider token={userToken}>
          <Router>
            {!!user && <Sidebar />}
            <AppContentWrapper>
              <AppRouter />
            </AppContentWrapper>
          </Router>
        </GqlProvider>
      )}
    </StyleWrapper>
  );
};
