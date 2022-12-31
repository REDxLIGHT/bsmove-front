/**
 * Dependencies
 */

import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MUIThemeProvider, createTheme, } from "@mui/material/styles";

// Libs
import themeProps from '../lib/theme';

/**
 * Provider
 */

const theme = createTheme(themeProps);

const ThemeProvider = ({ children }) => (
  <MUIThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
  </MUIThemeProvider>
);

/**
 * Interface
 */

export default ThemeProvider;
