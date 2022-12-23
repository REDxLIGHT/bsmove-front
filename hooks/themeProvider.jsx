/**
 * Dependencies
 */

import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { createTheme, StylesProvider, ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';

// Libs
import themeProps from '../lib/theme';

/**
 * Provider
 */

const theme = createTheme(themeProps);

const ThemeProvider = ({ children }) => (
  <MUIThemeProvider theme={theme}>
    <StylesProvider injectFirst>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </StylesProvider>
  </MUIThemeProvider>
);

/**
 * Interface
 */

export default ThemeProvider;
