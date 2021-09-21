import React from 'react';
import styled, { createGlobalStyle, ThemeProps } from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import { Theme } from '@mui/material/styles';
import { AppThemeProvider } from '$theme';
import { CmpWithChildren } from '$types';

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const GlobalStyle = createGlobalStyle<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: ThemeProps<Theme> & { palette: any };
}>`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${(props) => props.theme.palette.background.default};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

export const StyleWrapper: CmpWithChildren = ({ children }) => {
  return (
    <AppThemeProvider>
      <Root>
        <CssBaseline />
        <GlobalStyle />
        {children}
      </Root>
    </AppThemeProvider>
  );
};
