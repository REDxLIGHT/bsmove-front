import React from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from 'next/router';
import { useBasket } from '../../hooks/basket';

import Button from '../Button';
import styles from './index.module.css';
import messages from './messages';
import Routes from '../../helpers/routes';

const StickyBasket = () => {
  const router = useRouter();
  const { basket: { items = [], totalPrice = 0, totalItems = 0 } = {} } = useBasket();

  function redirectToBasket() {
    return router.push(Routes.BASKET_PAGE);
  }

  if (totalItems <= 0) return null;

  return (
    <div className={styles.basket_container}>
      <div className={styles.basket_left_part}>
        <ShoppingCartOutlinedIcon fontSize='large' />
        <div className={styles.basket_informations}>
          <div className={styles.basket_informations_title} onClick={redirectToBasket}>{messages.title}</div>
          <div className={styles.basket_informations_content} onClick={redirectToBasket}>{`${messages.items.youHave}${totalItems || 0}${messages.items.basket}`}</div>
        </div>
      </div>
      <div className={styles.basket_right_part}>
        <div className={styles.basket_total_price}>{`${messages.total}${totalPrice || 0}€`}</div>
        <div className={styles.basket_action}>
          <Button onClick={redirectToBasket} padding="0 1em" outlined $backgroundColor='rgba(255, 255, 255, 1)'>{messages.action}</Button>
        </div>
      </div>
    </div>
  )
};

export default StickyBasket;
