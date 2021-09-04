import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Typography } from '@material-ui/core';
import { Cmp } from '$types';
import { FormikTextField } from '$cmp/form/TextField';
import { AuthWrapper } from '$cmp/styling/AuthWrapper';
import { ErrorList } from '$cmp/utils/ErrorList';

type LoginForm = {
  email: string;
  password: string;
};

const formInitialValues = { email: '', password: '', confirmPassword: '' };

export const RegistrationForm: Cmp = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (values: LoginForm) => {
    console.log(values);
  };

  return (
    <AuthWrapper>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Demo
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Register a new account
      </Typography>
      <ErrorList errors={errors} onChange={setErrors} dismissable />
      <Formik<LoginForm> initialValues={formInitialValues} onSubmit={handleSubmit}>
        <Form>
          <FormikTextField type="email" name="email" label="Email Address" fullWidth />
          <FormikTextField type="password" name="password" label="Password" fullWidth />
          <FormikTextField
            type="password"
            name="confirmPassword"
            label="Confirm password"
            fullWidth
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Register
          </Button>
        </Form>
      </Formik>
    </AuthWrapper>
  );
};
