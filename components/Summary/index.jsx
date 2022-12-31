import React from 'react';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/router';
import Image from "next/legacy/image";

import { useBasket } from '../../hooks/basket';
import Subtitle from '../Texts/Subtitle';
import Routes from '../../helpers/routes';

import messages from './messages';
import { isObjectEmpty } from '../../helpers/functions';

export const SummaryFurnitureItem = ({ item: { id, photos = [], price = 0, quantity = 0, name = '[nom_non_defini]' } = {} }) => (
  <div className="summary-component__content_main_item">
    <div className="summary-component__content_main_item_preview">
      <Image
        className="summary-component__content_main_item_preview_illustration"
        layout="fill"
        src={photos[0]}
        alt={`${name}-${id}`}
      />
    </div>
    <div className="summary-component__content_main_item_infos">
      <div className="summary-component__content_main_item_quantity">
        <div>{name}</div>
        <div>{`x${quantity || 0}`}</div>
      </div>
      <div>{`${price}€`}</div>
    </div>
  </div>
)

const SummaryComponent = ({ deliveryCost = 0 }) => {
  const { basket } = useBasket();
  const router = useRouter();

  function handleRedirectToBasket() {
    return router.push(Routes.BASKET_PAGE);
  }

  return (
    <div className="summary-component__container">
      <Subtitle>{messages.title}</Subtitle>
      <div className="summary-component__content_container">
        <div className="summary-component__content_header">
          <div>{`${basket?.totalItems || '?'} ${messages.articles}`}</div>
          <div className="summary-component__content_header_action" onClick={handleRedirectToBasket}>
            {messages.action.modify}
          </div>
        </div>
        <Divider light fullWidth />
        <div className="summary-component__content_main">
          {!isObjectEmpty(basket) && basket?.items?.map((item, id) => (
            <SummaryFurnitureItem key={item?.id || id} item={item} />
          ))}
        </div>
        <Divider />
        <div className="summary-component__content_prices">
          <div className="summary-component__content_prices_row">
            <div>{messages.cost.articles}</div>
            <div>{`${basket?.totalPrice}€`}</div>
          </div>
          <div className="summary-component__content_prices_row">
            <div>{deliveryCost || messages.cost.delivery}</div>
            <div>{messages.free}</div>
          </div>
        </div>
        <Divider />
        <div className="summary-component__content_total">
          <div>{messages.cost.total}</div>
          <div>{`${basket?.totalPrice + deliveryCost}€`}</div>
        </div>
      </div>
    </div>
  )
};

export default SummaryComponent;
