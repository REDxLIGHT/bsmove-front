import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Cookies from 'js-cookie';

import Routes from '../../helpers/routes';
import Button from '../../components/Button';

import styles from './index.module.css';
import messages from './messages';
import { useCookies } from '../../hooks/cookies';
import { useOrder } from '../../hooks/order';
import { useBasket } from '../../hooks/basket';

const ConfirmPaymentContainer = (props) => {
  const router = useRouter();
  const { setOrder } = useOrder();
  const { setBasket } = useBasket();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    Cookies.remove('order');
    setOrder({});
    setBasket({});
  }, []);



  function handleBackToMainPage() {
    return router.push(Routes.HOME_PAGE);
  }

  function handleBackToProfile() {
    return router.push(Routes.PROFIL_PAGE);
  }

  return (
    <div className={styles.confirm_payment_container}>
      <div>
        <CheckCircleIcon className={styles.confirm_payment_icon} />
      </div>
      <div>
        <div className={styles.confirm_payment_title}>{messages.title}</div>
        <div className={styles.confirm_payment_content}>
          <span>{messages.content.text}</span>
          <span className={styles.confirm_payment_link} onClick={handleBackToProfile}>{messages.content.link}</span>
        </div>
      </div>
      <div className={styles.confirm_payment_action_container}>
        <Button outlined onClick={handleBackToMainPage}>{messages.action}</Button>
      </div>
    </div>
  )
}

export default ConfirmPaymentContainer;
