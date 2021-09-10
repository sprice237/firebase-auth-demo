import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Typography } from '@material-ui/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Cmp } from '$types';
import { FormikTextField } from '$cmp/form/TextField';
import { AuthWrapper } from '$cmp/styling/AuthWrapper';
import { ErrorList } from '$cmp/utils/ErrorList';
import { FormikErrorList } from '$cmp/utils/FormikErrorList';
import { LoadingModal } from '$cmp/utils/LoadingModal';
import {
  firebaseAuth,
  FirebaseErrorCodes,
  FirebaseErrorMessages,
  isFirebaseError,
} from '$utils/firebase';
import { SignInWithGoogleButton } from './SignInWithGoogleButton';
import { AuthButtonContainer } from './AuthButtonContainer';

type LoginForm = {
  email: string;
  password: string;
};

const formInitialValues = { email: '', password: '' };

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const Login: Cmp = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: LoginForm) => {
    setIsLoading(true);
    try {
      setErrors([]);
      await signInWithEmailAndPassword(firebaseAuth, values.email, values.password);
    } catch (error) {
      setIsLoading(false);
      if (Object.keys(FirebaseErrorMessages).includes(error.code)) {
        setErrors([FirebaseErrorMessages[error.code as FirebaseErrorCodes]]);
      } else {
        setErrors(['An unknown error has occurred']);
        throw error;
      }
    }
  };

  const handleSignInWithGoogleError = (error: Error) => {
    setIsLoading(false);
    if (isFirebaseError(error) && Object.keys(FirebaseErrorMessages).includes(error.code)) {
      setErrors([FirebaseErrorMessages[error.code as FirebaseErrorCodes]]);
    } else {
      setErrors(['An unknown error has occurred']);
      throw error;
    }
  };

  return (
    <AuthWrapper>
      {isLoading && <LoadingModal />}
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Demo
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Sign in to your account to continue
      </Typography>
      <Formik<LoginForm>
        initialValues={formInitialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur
      >
        <Form noValidate>
          <FormikErrorList />
          <ErrorList errors={errors} />
          <FormikTextField type="email" name="email" label="Email Address" fullWidth />
          <FormikTextField type="password" name="password" label="Password" fullWidth />
          <AuthButtonContainer>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign in
            </Button>
            <SignInWithGoogleButton
              onClick={() => setIsLoading(true)}
              onError={handleSignInWithGoogleError}
            />
          </AuthButtonContainer>
        </Form>
      </Formik>
    </AuthWrapper>
  );
};
