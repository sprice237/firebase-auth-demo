import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { Cmp } from '$types';

const StyledTextField = styled(MuiTextField)<{ my?: number }>(spacing);

export const TextField: Cmp<MuiTextFieldProps> = (props) => {
  return <StyledTextField {...props} my={2} />;
};

type FormikTextFieldProps = Omit<MuiTextFieldProps, 'value' | 'onChange' | 'name'> & {
  name: string;
};

export const FormikTextField: Cmp<FormikTextFieldProps> = (props) => {
  const [field, meta] = useField(props.name);
  return (
    <TextField
      {...props}
      value={field.value}
      onChange={field.onChange}
      error={meta.touched && !!meta.error}
    />
  );
};
