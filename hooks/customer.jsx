import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import Cookie from 'js-cookie';

import { isObjectEmpty, parseCookies } from '../helpers/functions';

const CustomerContext = createContext({
  setAuth: (auth) => undefined,
  setCustomer: (customer) => undefined,
});

// This component is declared at the top level,
// It is used to store Doctor object as persisted state.
export const CustomerProvider = ({ children, initialAuth, initialCustomer }) => {
  const [customer, setCustomer] = useState({}); // () => JSON.parse(initialCustomer)
  const [auth, setAuth] = useState({}); // () => JSON.parse(initialAuth)
  const [admin, setAdmin] = useState({}); // () => JSON.parse(initialAdmin)

  useEffect(() => {
    if (!customer || !customer.email) return ;
    Cookie.set('customer', JSON.stringify(customer))
  }, [customer]);

  useEffect(() => {
    if (!admin?.user?.username) return ;
    Cookie.set('admin', JSON.stringify(admin))
  }, [admin]);

  useEffect(() => {
    if (!auth || !auth.id || !auth.userId) return ;
    Cookie.set('auth', JSON.stringify(auth))
  }, [auth])

  function clearCustomer() {
    setCustomer({})
    Cookie.remove('customer')
  }

  function clearAuth() {
    setAuth({})
    Cookie.remove('auth')
  }

  return (
    <CustomerContext.Provider value={{
      customer, setCustomer, auth, setAuth, admin, setAdmin,
      clearCustomer, clearAuth,
    }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

// used to consume data from the provider == access to the data
// from any component inside the provider
export const useCustomer = () => useContext(CustomerContext);
