import React from 'react';
import firebase from 'firebase';
import Typography from '@mui/material/Typography';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Cmp } from '$types';
import { AuthWrapper } from '$cmp/styling/AuthWrapper';

const uiConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    // see https://github.com/firebase/firebaseui-web#credential-helper
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    'microsoft.com',
  ],
};

export const Login: Cmp = () => {
  return (
    <AuthWrapper>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Demo
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Sign in to your account to continue
      </Typography>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </AuthWrapper>
  );
};
