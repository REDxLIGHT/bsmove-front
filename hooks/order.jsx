import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import Cookie from 'js-cookie';

import { isObjectEmpty } from '../helpers/functions';

const OrderContext = createContext({
  setOrder: order => undefined,
});

// This component is declared at the top level,
export const OrderProvider = ({ children, initialOrder }) => {
  const [order, setOrder] = useState(initialOrder ? JSON.parse(initialOrder) : {})

  function addBasketToOrder(basket) {
    return setOrder(prevOrder => ({
      ...prevOrder,
      items: basket?.items || [],
    }));
  }

  function addDeliveryAddressToOrder(deliveryAddress) {
    return setOrder(prevOrder => ({
      ...prevOrder,
      deliveryAddress,
    }));
  }

  function addFacturationAddressToOrder(facturationAddress) {
    return setOrder(prevOrder => ({
      ...prevOrder,
      facturationAddress,
    }));
  }

  function addToOrderByKey(key, value) {
    return setOrder(prevOrder => ({
      ...prevOrder,
      [key]: value,
    }))
  }

  useEffect(() => {
    if (isObjectEmpty(order)) return ;
    Cookie.set('order', JSON.stringify(order));
  }, [order]);
  
  return (
    <OrderContext.Provider value={{
      order, setOrder, addBasketToOrder,
      addDeliveryAddressToOrder, addFacturationAddressToOrder,
      addToOrderByKey,
    }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
