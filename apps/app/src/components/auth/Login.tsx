import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Typography } from '@material-ui/core';
import { Cmp } from '$types';
import { FormikTextField } from '$cmp/form/TextField';
import { AuthWrapper } from '$cmp/styling/AuthWrapper';

type LoginForm = {
  email: string;
  password: string;
};

export const Login: Cmp = () => {
  const formInitialValues = { email: '', password: '' };

  const handleSubmit = (values: LoginForm) => {
    console.log(values);
  };

  return (
    <AuthWrapper>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Demo
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Sign in to your account to continue
      </Typography>
      <Formik<LoginForm> initialValues={formInitialValues} onSubmit={handleSubmit}>
        <Form>
          <FormikTextField type="email" name="email" label="Email Address" fullWidth />
          <FormikTextField type="password" name="password" label="Password" fullWidth />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign in
          </Button>
        </Form>
      </Formik>
    </AuthWrapper>
  );
};
