import React, {
  createContext,
  useContext,
  useState,
} from 'react';
import styled from 'styled-components';
import LoadingComponent from '../components/LoadingComponent';

const LoadingContext = createContext({
  setGlobalLoading: globalLoading => undefined,
});

const LoadingContainer = styled.div`
  position: fixed;
  z-index: 9999;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.10);
`;

// Alert severity can be one of the following : 'error' | 'info' | 'success' | 'warning'

// This component is declared at the top level,
export const LoadingProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(false);

  function handleGlobalLoading() {
    return setGlobalLoading(prevState => !prevState);
  }

  return (
    <LoadingContext.Provider value={{
      globalLoading, setGlobalLoading, handleGlobalLoading,
    }}
    >
      {globalLoading && <LoadingContainer>
        <LoadingComponent />
      </LoadingContainer>}
      {children}
    </LoadingContext.Provider>
  );
};

// used to consume data from the provider == access to the data
// from any component inside the provider
export const useLoading = () => useContext(LoadingContext);
