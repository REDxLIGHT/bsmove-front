import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { debounce } from 'lodash';

const GlobalContext = createContext({
  setGlobal: global => undefined,
});

// This component is declared at the top level,
export const GlobalProvider = ({ children }) => {
  const [global, setGlobal] = useState({ screenWidth: 9999 })

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window?.addEventListener('resize', debounce(() => {
      setGlobal(prevGlobal => ({ ...prevGlobal, screenWidth: window?.innerWidth }));
    }, 300));
    setGlobal(prevGlobal => ({ ...prevGlobal, screenWidth: window?.innerWidth }));
    return () => window?.removeEventListener('resize', null);
  }, []);

  return (
    <GlobalContext.Provider value={{
      global, setGlobal,
    }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
