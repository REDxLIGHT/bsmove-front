import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CloseIcon from '@material-ui/icons/Close';
import { Divider, IconButton } from '@material-ui/core';

import { useBasket } from '../../hooks/basket';
import { useCustomer } from '../../hooks/customer';
import LoadingComponent from '../../components/LoadingComponent';
import Button from '../../components/Button';
import { Subtitle } from '../../components/Texts';
import { findItemQuantityInBasket, isObjectEmpty } from '../../helpers/functions';
import Routes from '../../helpers/routes';
import API from '../../helpers/api';

import styles from './index.module.css';
import messages from './messages';
import Counter from '../../components/Counter';
import { useOrder } from '../../hooks/order';
import DeleteDialog from '../../components/DeleteDialog';
import { useGlobal } from '../../hooks/global';

const BasketPageItem = ({ item }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [count, setCount] = useState(undefined);
  const { basket, resetBasketQuantity, addToBasket, removeFromBasket } = useBasket();

  useEffect(() => {
    if (!isObjectEmpty(item) && !isObjectEmpty(basket?.items) && count === undefined) {
      setCount(findItemQuantityInBasket(item, basket.items, resetBasketQuantity, count));
    }
  }, [item, basket]);

  function handleDialogOpen() {
    return setDeleteDialogOpen(prevState => !prevState);
  }

  async function handleCountInc() {
    setCount(prevCount => prevCount ? prevCount + 1 : 1);
    addToBasket(item);
  }

  async function handleCountDec() {
    if (count > 0 && count - 1 === 0) {
      return handleDialogOpen();
    }
    setCount(prevCount => {
      if (prevCount <= 0) return 0;
      return prevCount - 1;
    });
    removeFromBasket(item);
  }

  async function handleDialogConfirm() {
    if (!isObjectEmpty(item)) resetBasketQuantity(item, count);
    return handleDialogOpen();
  }

  return (
    <>
      <div className={styles.basket_page_item_section}>
        <div className={styles.basket_page_item_section_content}>
          <div className={styles.basket_page_item_section_content_description}>
            <div className={styles.basket_item_preview_container}>
              <Image
                className={styles.basket_item_img_illustration}
                layout="fill"
                src={item.photos[0]}
                alt={`${item.name}--${item.id}`}
              />
            </div>
            <div>
              <div>{item.name}</div>
              <div className={styles.basket_item_short_description}>{item.description}</div>
            </div>
          </div>
          <div className={styles.basket_page_item_informations}>
            <div>{`${item?.price}€`}</div>
            <Counter
              minValue={count <= 0}
              maxValue={false}
              value={count}
              handleInc={handleCountInc}
              handleDec={handleCountDec}
            />
            <div className={styles.basket_item_total_price}>{`${item?.price * item?.quantity}€`}</div>
            <div>
              <IconButton edge='end' onClick={handleDialogOpen} disableRipple className={styles.delete_icon}>
                <DeleteForeverIcon fontSize='small' />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={handleDialogOpen}
        fullWidth={true}
        title={messages.dialog.title}
        item={`"${item?.name}" du panier`}
        handleConfirm={handleDialogConfirm}
        handleDeny={handleDialogOpen}
      />
    </>
  )
}

const EmptyBasket = ({ handleEmptyBasketRedirection }) => (
  <div className={styles.empty_basket}>
    <div>{messages.emptyBasket.message}</div>
    <div className={styles.empty_basket_action_container}>
      <Button onClick={handleEmptyBasketRedirection}>{messages.emptyBasket.action}</Button>
    </div>
  </div>
)

const DesktopBasketTotal = ({ basket = {} }) => {
  return (
    <div className={styles.basket_page_total}>
      <div>{messages.total}</div>
      <div>{`${basket?.totalPrice} €`}</div>
    </div>
  )
}

const BasketItemsList = ({ basket }) => (
  <div className={styles.basket_items_grid}>
    {
      basket?.items?.map((item) => (
        <BasketPageItem item={item} />
      ))
    }
  </div>
)

const MobileBasketTotal = ({ basket: { totalPrice, delivery } }) => {
  return (
    <div className={styles.basket_page_total}>
      <Subtitle>{messages.total}</Subtitle>
      <div className={styles.basket_page_total_mobile_section}>
        <div>{messages.mobile.totalItemsCost}</div>
        <div>{`${totalPrice}€`}</div>
      </div>
      <div className={styles.basket_page_total_mobile_section}>
        <div>{messages.mobile.delivery}</div>
        <div>{delivery ? `${delivery}€` : messages.free}</div>
      </div>
      <Divider />
      <div className={styles.basket_page_total_mobile_section}>
        <div style={{ fontWeight: 600 }}>{messages.total}</div>
        <div>{`${delivery ? delivery + totalPrice : totalPrice}€`}</div>
      </div>
    </div>
  )
}

const BasketPageContent = ({ basket = {} }) => {
  const router = useRouter();
  const { customer } = useCustomer();
  const { addToOrderByKey } = useOrder();
  const { global: { screenWidth } } = useGlobal();

  function handleEmptyBasketRedirection() {
    return router.push(Routes.FURNITURES_BUY_PAGE);
  }

  function handleContinueFunnel() {
    addToOrderByKey('items', basket?.items);
    return router.push(Routes.DELIVERY_PAGE);
  }
  
  return (
    <div className={styles.basket_page_items_container}>
      {
        isObjectEmpty(basket) || basket?.items?.length <= 0
          ? <EmptyBasket handleEmptyBasketRedirection={handleEmptyBasketRedirection} />
          : <BasketItemsList basket={basket} />
      }
      {
        !isObjectEmpty(basket) && basket.items?.length ? (
          <div className={styles.basket_page_footer}>
            <div className={styles.basket_page_footer_container}>
              {
                screenWidth >= 750
                  ? <DesktopBasketTotal basket={basket} />
                  : <MobileBasketTotal basket={basket} />
              }
              <div className={styles.basket_page_action_container}>
                <Button onClick={handleContinueFunnel}>{messages.action}</Button>
              </div>
            </div>
          </div>
        ) : null
      }
    </div>
  )
}

const BasketContainer = () => {
  const [loading, setLoading] = useState(true);
  const { basket } = useBasket();

  useEffect(() => {
    if (basket !== undefined) {
      setLoading(false);
    }
  }, [basket])

  return (
    <div className={styles.basket_page_container}>
      <div className={styles.basket_page_header}>
        <div className={styles.basket_page_title}>{messages.title}</div>
        <div className={styles.basket_page_total_articles}>{`(${basket.totalItems || 0} ${messages.articles})`}</div>
      </div>
      {
        loading
          ? <LoadingComponent />
          : <BasketPageContent basket={basket} />
      }
    </div>
  )
}

export default BasketContainer;
