import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Typography } from '@material-ui/core';
import { Cmp } from '$types';
import { FormikTextField } from '$cmp/form/TextField';
import { AuthWrapper } from '$cmp/styling/AuthWrapper';
import { FormikErrorList } from '$cmp/utils/FormikErrorList';
import {
  firebaseAuth,
  FirebaseErrorCodes,
  FirebaseErrorMessages,
  isFirebaseError,
} from '$utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { ErrorList } from '$cmp/utils/ErrorList';
import { LoadingModal } from '$cmp/utils/LoadingModal';
import { AuthButtonContainer } from './AuthButtonContainer';
import { SignInWithGoogleButton } from './SignInWithGoogleButton';

type RegistrationForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const formInitialValues: RegistrationForm = { email: '', password: '', confirmPassword: '' };

const RegistrationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .required('Password confirmation is required')
    .equals([Yup.ref('password')], 'Passwords do not match'),
});

export const RegistrationForm: Cmp = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: RegistrationForm) => {
    setIsLoading(true);
    try {
      setErrors([]);
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password
      );
      console.log(userCredential);
    } catch (error) {
      setIsLoading(false);
      if (error.code === FirebaseErrorCodes.AuthEmailAlreadyInUse) {
        setErrors([FirebaseErrorMessages[FirebaseErrorCodes.AuthEmailAlreadyInUse]]);
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
        Register a new account
      </Typography>
      <Formik<RegistrationForm>
        initialValues={formInitialValues}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur
      >
        <Form noValidate>
          <FormikErrorList />
          <ErrorList errors={errors} />
          <FormikTextField type="email" name="email" label="Email Address" fullWidth />
          <FormikTextField type="password" name="password" label="Password" fullWidth />
          <FormikTextField
            type="password"
            name="confirmPassword"
            label="Confirm password"
            fullWidth
          />
          <AuthButtonContainer>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Register
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
