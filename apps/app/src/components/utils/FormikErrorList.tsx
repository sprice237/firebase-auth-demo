import React from 'react';
import { Cmp } from '$types';
import { useFormikContext } from 'formik';
import { ErrorList } from './ErrorList';
import { useMemo } from 'react';

export const FormikErrorList: Cmp = () => {
  const formikContext = useFormikContext<Record<string, unknown>>();
  const errors = useMemo(() => Object.values(formikContext.errors), [formikContext.errors]);

  return <ErrorList errors={errors} />;
};
