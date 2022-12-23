import React, { useEffect, useState } from 'react';
import {
  CardNumberElement,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import { getCode } from 'country-list';

import { Subtitle } from '../../components/Texts';

import SummaryComponent from '../../components/Summary';
import CreditCardForm from '../../components/CreditCardForm';
import Switch from '../../components/Switch';
import { useCustomer } from '../../hooks/customer';
import API from '../../helpers/api';

import messages from './messages';
import styles from './index.module.css';
import { isObjectEmpty } from '../../helpers/functions';
import Button from '../../components/Button';
import { useOrder } from '../../hooks/order';
import { useLoading } from '../../hooks/loading';
import { useAlert } from '../../hooks/alert';
import Routes from '../../helpers/routes';
import { useGlobal } from '../../hooks/global';
import {useBasket} from "../../hooks/basket";

const PaymentComponent = () => {
  const [paymentMethod, setPaymentMethod] = useState({});
  const [usePaymentMethod, setUsePaymentMethod] = useState(false);
  const { customer, auth } = useCustomer();
  const { addToOrderByKey, order } = useOrder();
  const { setGlobalLoading } = useLoading();
  const router = useRouter();
  const { clearBasket } = useBasket()

  const handleSubmit = async (stripe, elements) => {
    if (stripe && auth && elements) {
      setGlobalLoading(true);
      if (!usePaymentMethod) {
        if (paymentMethod?.id) { // change nom pd
          const res = await API.post(`/Customers/${auth.userId}/StripeAccount/removeCard`, { paymentMethodId: paymentMethod.id }, { headers: { Authorization: auth.id } });
          addToOrderByKey('paymentMethodId', null);
        }
        const cardNumber = await elements.getElement(CardNumberElement);
        const stripeAccount = await API.get(`/Customers/${auth.userId}/setupIntent`, {}, { headers: { Authorization: auth.id } });
        const stripeResponse = await stripe.confirmCardSetup(stripeAccount?.data?.client_secret, {
          payment_method: {
            card: cardNumber,
            billing_details: {
              name: `${customer?.lastName} ${customer?.firstName}`,
              address: {
                city: customer?.address?.city,
                line1: customer?.address?.street,
                postal_code: customer?.address?.zipCode,
                // country: 'FR',
                country: getCode(customer?.address?.country),
              },
              email: customer?.email,
              phone: customer?.phoneNumber,
            },
          },
          expand: ['payment_method'],
        });
        const paymentResponse = await API.put(`/Customers/${auth.userId}/StripeAccount`, { paymentMethods: true }, { headers: { Authorization: auth.id } });
        setPaymentMethod(paymentResponse?.data?.paymentMethods[0]);
        addToOrderByKey('paymentMethodId', paymentResponse?.data?.paymentMethods[0].id);
        await API.post(`/Customers/${auth.userId}/Orders`, { ...order, paymentMethodId: paymentResponse?.data?.paymentMethods[0].id, savePaymentMethod: true }, { headers: { Authorization: auth.id } });
      } else {
        await API.post(`/Customers/${auth.userId}/Orders`, { ...order, savePaymentMethod: true }, { headers: { Authorization: auth.id } })
      }
      await router.push(Routes.CONFIRM_PAYMENT_PAGE);
      clearBasket()
      return setGlobalLoading(false);
    }
  }
  
  useEffect(() => {
    async function getCustomerPaymentMethod() {
      if (!isObjectEmpty(customer) && auth) {
        const response = await API.get(`/Customers/${auth.userId}/StripeAccount`, {}, { headers: { Authorization: auth.id } });
        if (!isObjectEmpty(response) && response.ok && response?.data?.paymentMethods) {
          setPaymentMethod(response?.data?.paymentMethods[0]);
          addToOrderByKey('paymentMethodId', response?.data?.paymentMethods[0]?.id);
        }
      }
    }

    getCustomerPaymentMethod();
  }, [customer])

  return (
    <div className={styles.payment_component_wrapper}>
      <Subtitle>{messages.title}</Subtitle>
      {!isObjectEmpty(paymentMethod) && (
        <div className={styles.payment_details_container}>
          <Switch
            checked={usePaymentMethod}
            onChange={() => setUsePaymentMethod(prevState => !prevState)}
            name="use_payment_details"
          />
          <div className={styles.payment_details_history_container}>
            <div>{messages.paymentMethod.content}</div>
            <div>{`**** **** **** ${paymentMethod?.card?.last4}`}</div> 
          </div>
        </div>
      )}
      <div className={styles.payment_component_form}>
        <CreditCardForm
          handleSubmit={handleSubmit}
          paymentMethod={paymentMethod}
          usePaymentMethod={usePaymentMethod}
        />
      </div>
    </div>
  )
}

const PaymentPageContainer = () => {
  const { global: { screenWidth } } = useGlobal();
  return (
    <div className={styles.payment_page_container}>
      <PaymentComponent />
      {screenWidth >= 750 ? <SummaryComponent /> : null}
    </div>
  )
  }

export default PaymentPageContainer;
