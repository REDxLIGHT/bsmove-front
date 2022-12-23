import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import Cookie from 'js-cookie';

import { isObjectEmpty } from '../helpers/functions';

const EstimateContext = createContext({
  setEstimate: estimate => undefined,
});

// This component is declared at the top level,
export const EstimateProvider = ({ children, initialEstimate }) => {
  const [estimate, setEstimate] = useState({})

  useEffect(() => {
    if (isObjectEmpty(estimate)) return ; // ici checker toute les parties, sinon tout refaire à chaque fois?
    Cookie.set('estimate', JSON.stringify(estimate));
  }, [estimate]);

  function addToEstimateByKey(key, value) {
    return setEstimate(previousEstimate => ({ ...previousEstimate, [key]: value }));
  }

  function addToEstimateDetailsByKey(key, value) {
    return setEstimate(previousEstimate => ({
      ...previousEstimate,
      details: {
        ...previousEstimate?.details,
        [key]: {
          ...previousEstimate?.details?.[key], ...value,
        },
      }
    }))
  }

  function addToEstimateInventoryByKey(key, value) {
    return setEstimate(previousEstimate => ({
      ...previousEstimate,
      inventory: {
        ...previousEstimate?.inventory,
        [key]: {
          ...previousEstimate?.inventory?.[key], ...value,
        },
      },
    }))
  }

  function clearEstimate() {
    setEstimate({})
    Cookie.remove('estimate')
  }

  return (
    <EstimateContext.Provider value={{
      estimate, setEstimate, addToEstimateByKey,
      addToEstimateDetailsByKey, addToEstimateInventoryByKey,
      clearEstimate,
    }}
    >
      {children}
    </EstimateContext.Provider>
  );
};

export const useEstimate = () => useContext(EstimateContext);
