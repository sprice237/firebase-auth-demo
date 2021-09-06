import React from 'react';
import styled from 'styled-components';
import { Alert as MuiAlert } from '@material-ui/lab';
import { spacing } from '@material-ui/system';
import { Cmp } from '$types';
import { useFormikContext } from 'formik';

const Alert = styled(MuiAlert)(spacing);

export const FormikErrorList: Cmp = () => {
  const formikContext = useFormikContext<Record<string, unknown>>();

  return (
    <>
      {Object.entries(formikContext.errors).map(([key, error]) => (
        <Alert key={key} mt={2} mb={1} severity="error">
          {error}
        </Alert>
      ))}
    </>
  );
};
