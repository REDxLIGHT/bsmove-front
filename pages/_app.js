import React, { useEffect } from 'react';
import {CssBaseline, StyledEngineProvider} from '@mui/material';
import { CacheProvider } from "@emotion/react";

import '../styles/global.css';

/* Hooks */
import ThemeProvider from '../hooks/themeProvider';
import { LoadingProvider } from '../hooks/loading';
import { AlertProvider } from '../hooks/alert';
import { CustomerProvider } from '../hooks/customer';
import { BasketProvider } from '../hooks/basket';
import { EstimateProvider } from '../hooks/estimate';
import { GlobalProvider } from '../hooks/global';
import { OrderProvider } from '../hooks/order';

import RouterTransitions from '../components/RouterTransitions';
import createEmotionCache from "../utils/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const getLayout = Component.getLayout || ((page) => page)

  return (
      <CacheProvider value={emotionCache}>
        <GlobalProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider>
            <AlertProvider>
              <LoadingProvider>
                <CustomerProvider>
                  <BasketProvider>
                    <EstimateProvider>
                      <OrderProvider>
                        <CssBaseline />
                        <RouterTransitions />
                        {getLayout(<Component {...pageProps} />)}
                      </OrderProvider>
                    </EstimateProvider>
                  </BasketProvider>
                </CustomerProvider>
              </LoadingProvider>
            </AlertProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </GlobalProvider>
    </CacheProvider>
  );
}
