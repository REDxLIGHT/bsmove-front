import React, {
  createContext,
  useContext,
  useEffect,
} from 'react';
import Cookie from 'js-cookie';
import { isObjectEmpty } from '../helpers/functions';

// hooks to handle the state
import { useBasket } from './basket';
import { useCustomer } from './customer';
import { useOrder } from './order';
import { useEstimate } from './estimate';

const CookiesContext = createContext({});

export const CookiesProvider = ({ cookies, children }) => {
  const { basket, setBasket } = useBasket();
  const { estimate, setEstimate } = useEstimate();
  const { auth, customer, setCustomer, setAuth } = useCustomer();
  const { order, setOrder } = useOrder();

  useEffect(() => {
    if (!isObjectEmpty(cookies)) {
      if (cookies?.basket && isObjectEmpty(basket)) {
        setBasket(JSON.parse(cookies.basket));
      }
      if (cookies?.customer && isObjectEmpty(customer)) {
        setCustomer(JSON.parse(cookies.customer));
      }
      if (cookies?.auth && isObjectEmpty(auth)) {
        setAuth(JSON.parse(cookies.auth));
      }
      if (cookies?.order && isObjectEmpty(order)) {
        setOrder(JSON.parse(cookies.order));
      }
      if (cookies?.estimate && isObjectEmpty(estimate)) {
        setEstimate(JSON.parse(cookies.estimate));
      }
    }
  }, [cookies]);

  return (
    <CookiesContext.Provider value={{
      cookies,
    }}>
      {children}
    </CookiesContext.Provider>
  );
};

// used to consume data from the provider == access to the data
// from any component inside the provider
export const useCookies = () => useContext(CookiesContext);
