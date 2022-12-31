import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from "next/legacy/image";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';

import { useBasket } from '../../hooks/basket';
import { findItemQuantityInBasket, isObjectEmpty } from '../../helpers/functions';
import styles from './index.module.css';
import Counter from '../Counter';
import { useEstimate } from '../../hooks/estimate';

const S = {};

S.IconButton = styled(IconButton)`
  height: 1.25em;
  width: 1.25em;
  color: ${({ theme }) => theme.colors.border};
`;

const ExtraFurnitureCard = ({ item }) => {
  const { inventory, addToEstimateInventoryByKey, estimate } = useEstimate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [count, setCount] = useState(0);

  const { id, name, description, price, photos } = item;

  useEffect(() => {
    if (!isObjectEmpty(item) && item.name) {
      const furnitureList = estimate?.inventory?.mounting?.extraFurnitures?.items
      const furniture = furnitureList?.find(furniture => furniture.name === item?.name);
      setCount(isObjectEmpty(furniture) ? 0 : furniture?.count);
    }
  }, [item]);


  async function handleCountInc() {
    setCount(prevCount => prevCount ? prevCount + 1 : 1);
    const furnituresList = estimate?.inventory?.mounting?.extraFurnitures?.items || [];
    const furnitureItem = furnituresList.find(furniture => furniture.name === item?.name)
    if (!isObjectEmpty(furnitureItem)) {
      furnituresList[furnituresList.indexOf(furnitureItem)].count += 1;
      addToEstimateInventoryByKey('mounting', {
        ...estimate?.inventory?.mounting,
        extraFurnitures: {
          ...estimate?.inventory?.mounting?.extraFurnitures,
          items: furnituresList,
        },
      })
    } else {
      furnituresList?.length
          ? addToEstimateInventoryByKey('mounting', {
            ...estimate?.inventory?.mounting,
            extraFurnitures: {
              ...estimate?.inventory?.mounting?.extraFurnitures,
              items: [...estimate?.inventory?.mounting?.extraFurnitures?.items, { name: item.name, count : 1 }]
            },
          })
          : addToEstimateInventoryByKey('mounting', {
            ...estimate?.inventory?.mounting,
              extraFurnitures: {
                ...estimate?.inventory?.mounting?.extraFurnitures,
                items: [{ name: item.name, count: 1  }]
              },
          })
    }
  }

  async function handleCountDec() {
    setCount(prevCount => {
      if (!prevCount || prevCount <= 0) return 0;
      return prevCount - 1;
    });
    const furnituresList = estimate?.inventory?.mounting?.extraFurnitures?.items || [];
    const furnitureItem = furnituresList.find(furniture => furniture.name === item?.name)
    if (!isObjectEmpty(furnitureItem)) {
      furnituresList[furnituresList.indexOf(furnitureItem)].count =
          furnituresList[furnituresList.indexOf(furnitureItem)].count > 0
              ? furnituresList[furnituresList.indexOf(furnitureItem)].count -= 1
              : 0;
      addToEstimateInventoryByKey('mounting', {
        ...estimate?.inventory?.mounting,
        extraFurnitures: {
          ...estimate?.inventory?.mounting?.extraFurnitures,
          items: furnituresList,
        },
      })
    }
  }

  
  function handleExtraFurnitureCardDialog() {
    return setIsDialogOpen(prevState => !prevState);
  }

  return (
    <div className={styles.extra_furniture_card_container}>
      {/*<div className={styles.furniture_card_infos}>*/}
      {/*  <S.IconButton  onClick={handleExtraFurnitureCardDialog}>*/}
      {/*    <InfoIcon />*/}
      {/*  </S.IconButton>*/}
      {/*</div>*/}
      <div className={styles.furniture_card_img_container}>
        <div className={styles.furniture_card_img_illustration_container}>
          <Image
            className={styles.furniture_card_img_illustration}
            layout="fill"
            src={photos[0]}
            alt={`${name}-${id}`}
          />
        </div>
      </div>
      <div className={styles.furniture_card_description}>
        <div className={styles.furniture_card_title}>{name}</div>
        <div className={styles.furniture_card_short_description}>{description}</div>
        <div>{`${price}€`}</div>
        <Counter
          minValue={0}
          value={count}
          handleInc={handleCountInc}
          handleDec={handleCountDec}
          margin="50% 0 0 0"
        />
      </div>
    </div>
  )
}

export default ExtraFurnitureCard;
