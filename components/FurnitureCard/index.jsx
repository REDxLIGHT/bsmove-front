import React, { useEffect, useState } from 'react';
import Image from "next/legacy/image";

import { useBasket } from '../../hooks/basket';
import { findItemQuantityInBasket, isObjectEmpty } from '../../helpers/functions';
import styles from './furnitures-card.module.css';
import Counter from '../Counter';

// const S = {};
//
// S.IconButton = styled(IconButton)`
//   height: 1.25em;
//   width: 1.25em;
//   color: ${({ theme }) => theme.colors.border};
// `;

const FurnitureCard = ({ item, handleIncAction, handleDecAction }) => {
  const { addToBasket, removeFromBasket, basket, resetBasketQuantity } = useBasket();
  const [count, setCount] = useState(undefined);
  const { id, name, description, price, photos, stock = 500, tags } = item;

  useEffect(() => {
    if (!isObjectEmpty(item) && !isObjectEmpty(basket?.items) && count === undefined) {
      setCount(findItemQuantityInBasket(item, basket.items, resetBasketQuantity, count));
    }
  }, [item, basket]);

  async function handleCountInc() {
    setCount(prevCount => prevCount ? prevCount + 1 : 1);
    addToBasket(item);
  }

  async function handleCountDec() {
    setCount(prevCount => {
      if (prevCount <= 0) return 0;
      return prevCount - 1;
    });
    removeFromBasket(item);
  }


  return (
    <div className="furniture-card-component__furnitures_card_component">
      {/*<div className="furniture-card-component__furniture_card_infos">*/}
      {/*  <S.IconButton onClick={handleFurnitureCardDialog}>*/}
      {/*    <InfoIcon />*/}
      {/*  </S.IconButton>*/}
      {/*</div>*/}
      <div className="furniture-card-component__furniture_card_img_container">
        <div className="furniture-card-component__furniture_card_img_illustration_container">
          <Image
            className="furniture-card-component__furniture_card_img_illustration"
            layout="fill"
            src={photos[0]}
            alt={`${name}-${id}`}
          />
        </div>
      </div>
      <div className="furniture-card-component__furniture_card_description">
        <div className="furniture-card-component__furniture_card_title">{name}</div>
        <div className="furniture-card-component__furniture_card_short_description">{description}</div>
        <div>{`${price}€`}</div>
        <Counter
          minValue={count <= 0}
          maxValue={item?.stock <= count}
          value={count}
          handleInc={handleCountInc}
          handleDec={handleCountDec}
          margin="50% 0 0 0"
        />
      </div>
    </div>
  )
}

export default FurnitureCard;
