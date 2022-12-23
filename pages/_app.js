import React, { useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';

import '../styles/global.css';

/* Hooks */
import ThemeProvider from '../hooks/themeProvider';
import { LoadingProvider, useLoading } from '../hooks/loading';
import { AlertProvider } from '../hooks/alert';
import { CustomerProvider } from '../hooks/customer';
import { BasketProvider } from '../hooks/basket';
import { EstimateProvider } from '../hooks/estimate';
import { GlobalProvider } from '../hooks/global';
import { OrderProvider } from '../hooks/order';

import { isObjectEmpty } from '../helpers/functions';

import RouterTransitions from '../components/RouterTransitions';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <GlobalProvider>
      <ThemeProvider>
        <AlertProvider>
          <LoadingProvider>
            <CustomerProvider>
              <BasketProvider>
                <EstimateProvider>
                  <OrderProvider>
                    <CssBaseline />
                    <RouterTransitions />
                    {/* <NextNProgress color="rgb(56, 199, 152)" /> */}
                    {getLayout(<Component {...pageProps} />)}
                  </OrderProvider>
                </EstimateProvider>
              </BasketProvider>
            </CustomerProvider>
          </LoadingProvider>
        </AlertProvider>
      </ThemeProvider>
    </GlobalProvider>
  )
}
