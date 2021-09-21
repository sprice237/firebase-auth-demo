import React from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components/macro';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CmpWithChildren } from '$types';
import { breakpoints } from './breakpoints';
import { shadows } from './shadows';
import { typography } from './typography';
import { ThemeVariantEnum, variants } from './variants';

const themeConfig = variants[ThemeVariantEnum.DEFAULT];

const theme = createTheme(
  {
    spacing: 4,
    breakpoints,
    typography,
    shadows,
    palette: themeConfig.palette,
  },
  {
    name: themeConfig.name,
    header: themeConfig.header,
    footer: themeConfig.footer,
    sidebar: themeConfig.sidebar,
  }
);

export const AppThemeProvider: CmpWithChildren = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>
    </MuiThemeProvider>
  );
};
