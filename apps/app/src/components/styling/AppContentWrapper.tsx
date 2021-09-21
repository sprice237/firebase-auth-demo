import React from 'react';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import { spacing } from '@mui/system';
import { CmpWithChildren } from '$types';

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const StyledPaper = styled(Paper)(spacing);

const MainContent = styled(StyledPaper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default} !important;

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

export const AppContentWrapper: CmpWithChildren = ({ children }) => {
  return (
    <AppContent>
      <MainContent>{children}</MainContent>
    </AppContent>
  );
};
