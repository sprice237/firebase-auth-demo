import React from 'react';
import styled from 'styled-components';
import MuiAlert from '@mui/material/Alert';
import { spacing } from '@mui/system';
import { CmpReturn } from '$types';

const Alert = styled(MuiAlert)(spacing);

type ErrorListProps<Error extends string | React.ReactNode> = {
  errors: Error[];
  onChange?: (value: Error[]) => void;
  dismissable?: boolean;
};

export const ErrorList = <Error extends string | React.ReactNode>({
  errors,
  onChange,
  dismissable = false,
}: ErrorListProps<Error>): CmpReturn => {
  const handleRemove = (item: string | React.ReactNode) => {
    if (onChange) {
      onChange(errors.filter((error) => error !== item));
    }
  };

  return (
    <>
      {errors.map((error, i) => (
        <Alert
          key={`${i}_${error}`}
          mt={2}
          mb={1}
          severity="error"
          onClose={dismissable && onChange ? () => handleRemove(error) : undefined}
        >
          {error}
        </Alert>
      ))}
    </>
  );
};
