import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import { CmpWithChildren } from '$types';

export const AuthBackdrop = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

export const AuthWrapper: CmpWithChildren = ({ children }) => {
  return (
    <AuthBackdrop>
      <StyledPaper>{children}</StyledPaper>
    </AuthBackdrop>
  );
};
