import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Typography } from '@material-ui/core';
import { Cmp } from '$types';
import { FormikTextField } from '$cmp/form/TextField';
import { AuthWrapper } from '$cmp/styling/AuthWrapper';
import { FormikErrorList } from '$cmp/utils/FormikErrorList';

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
  const handleSubmit = (values: RegistrationForm) => {
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
      <Formik<RegistrationForm>
        initialValues={formInitialValues}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur
      >
        <Form noValidate>
          <FormikErrorList />
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
