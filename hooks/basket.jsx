import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { append } from 'ramda';
import Cookie from 'js-cookie';

import { isObjectEmpty, parseCookies } from '../helpers/functions';

const BasketContext = createContext({
  setBasket: basket => undefined,
});

// This component is declared at the top level,
export const BasketProvider = ({ children, initialBasket }) => {
  const [basket, setBasket] = useState(initialBasket ? JSON.parse(initialBasket) : {})

  function resetBasketQuantity(item, count) {
    const itemInBasket = basket?.items?.find(basketItem => basketItem.id === item.id);
    return setBasket(previousBasket => ({
      ...previousBasket,
      items: previousBasket?.items.filter(basketItem => basketItem.id !== item.id),
      totalPrice: previousBasket?.totalPrice - (itemInBasket?.quantity * item.price),
      totalItems: previousBasket?.totalItems - itemInBasket?.quantity,
    }));
  }

  function addToItemsList(basketItems, newItem) {
    if (isObjectEmpty(basketItems)) return [{...newItem, quantity: 1}];
    const itemFound = basketItems.find(basketItem => basketItem.id === newItem.id)?.quantity;
    if (!itemFound) return append({ ...newItem, quantity: 1 }, basketItems);
    const newBasketItemsList = basketItems.map((basketItem) => basketItem?.id === newItem?.id ? ({ ...basketItem, quantity: basketItem?.quantity + 1 }) : basketItem );
    return newBasketItemsList;
  }

  async function addToBasket(item) {
    if (isObjectEmpty(item)) return ;
    return setBasket(previousBasket => ({
      totalPrice: previousBasket?.totalPrice ? previousBasket.totalPrice + item?.price : item?.price,
      totalItems: previousBasket?.totalItems ? previousBasket.totalItems + 1 : 1,
      items: addToItemsList(previousBasket?.items, item),
    }));
  }

  function removeFromItemsList(basketItems, item) {
    const newBasketItemsList = basketItems.map((basketItem) => {
      if (basketItem?.id === item?.id) {
        if (!basketItem.quantity || basketItem.quantity <= 1) return undefined;
        return { ...basketItem, quantity: basketItem?.quantity - 1 };
      }
      return basketItem;
    });
    const filteredBaketList = newBasketItemsList.filter(item => item !== undefined);
    return filteredBaketList;
  }

  async function removeFromBasket(item) {
    if (isObjectEmpty(item) || !basket?.items?.length) return ;
    return setBasket(previousBasket => ({
      totalPrice: previousBasket?.totalPrice ? previousBasket.totalPrice - item?.price : 0,
      totalItems: previousBasket?.totalItems ? previousBasket.totalItems - 1 : 0,
      items: removeFromItemsList(previousBasket?.items, item),
      // items: isItemInBasket ? alterExistingItemInBasket(basket?.items, itemInBasketIndex, -1) : previousBasket?.items,
      // items: addToItemsList(previousBasket?.items, item),
    }));
  }

  async function clearBasket() {
    setBasket({})
    Cookie.remove('basket')
  }

  useEffect(() => {
    if (isObjectEmpty(basket)) return ;
    Cookie.set('basket', JSON.stringify(basket));
    // ServerCookies.set('basket', JSON.stringify(basket));
  }, [basket]);

  return (
    <BasketContext.Provider value={{
      basket, setBasket, addToBasket, removeFromBasket,
      resetBasketQuantity, clearBasket
    }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
