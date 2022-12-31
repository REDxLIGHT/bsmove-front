import React, { useEffect, useState } from 'react';
import { Dialog, IconButton } from '@mui/material';
import { CardNumberElement } from '@stripe/react-stripe-js';
import { getCode } from 'country-list';

import API from '../../../../helpers/api';
import CreditCardForm from '../../../../components/CreditCardForm';
import LoadingComponent from '../../../../components/LoadingComponent';
import PaymentDetailsResume from '../../../../components/PaymentDetailsResume';
import { useCustomer } from '../../../../hooks/customer';
import Close from '@mui/icons-material/Close';

import { Subtitle } from '../../../../components/Texts';
import styles from './index.module.css';
import messages from './messages';
import Button from '../../../../components/Button';
import { useLoading } from '../../../../hooks/loading';

const CreditCardDialog = ({ open, handleDialog, handleSubmit, buttonLabel }) => (
  <Dialog
    open={open}
    onClose={handleDialog}
    fullWidth
  >
    <div className={styles.credit_card_add_dialog_container}>
      <div className={styles.credit_card_add_dialog_header}>
        <Subtitle>{messages.dialog.title}</Subtitle>
        <IconButton onClick={handleDialog} size="large">
          <Close fontSize="small" />
        </IconButton>
      </div>
      <div className={styles.credit_card_add_dialog_form}>
        <CreditCardForm buttonLabel={buttonLabel} handleSubmit={handleSubmit} />
      </div>
    </div>
  </Dialog>
)

const PaymentDetailsComponent = () => {
  const [paymentMethod, setPaymentMethod] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { auth, customer } = useCustomer();
  const { setGlobalLoading } = useLoading();

  useEffect(() => {
    if (auth?.userId) {
      async function fetchPaymentDetails() {
        if (!loading) setLoading(true);
        const response = await API.get(`/Customers/${auth.userId}/StripeAccount`, {}, { headers: { Authorization: auth.id } });
        if (response?.ok && response?.data?.paymentMethods) {
          setPaymentMethod(response?.data?.paymentMethods[0]);
        } else {
          setPaymentMethod({});
        }
        setLoading(false);
      }

      fetchPaymentDetails();
    }
  }, [auth])

  function handleDialog() {
    return setOpen(prevState => !prevState);
  }

  async function handleSubmit(stripe, elements) {
    if (stripe && auth && elements) {
      setGlobalLoading(true);
      const cardNumber = await elements.getElement(CardNumberElement);
      const stripeAccount = await API.get(`/Customers/${auth.userId}/setupIntent`, {}, { headers: { Authorization: auth.id } });
      const confirmCardSetupResponse = await stripe.confirmCardSetup(stripeAccount?.data?.client_secret, {
        payment_method: {
          card: cardNumber,
          billing_details: {
            name: `${customer?.lastName} ${customer?.firstName}`,
            address: {
              city: customer?.address?.city || '',
              line1: customer?.address?.street || '',
              postal_code: customer?.address?.zipCode || '',
              // country: 'FR',
              country: getCode(customer?.address?.country) || '',
            },
            email: customer?.email,
            phone: customer?.phoneNumber,
          },
        },
        expand: ['payment_method'],
      });
      const stripeAccountResponse = await API.put(`/Customers/${auth.userId}/StripeAccount`, { paymentMethods: true }, { headers: { Authorization: auth.id } });
      setPaymentMethod(stripeAccountResponse?.data?.paymentMethods[0]);
      handleDialog();
      return setGlobalLoading(false);
    }
  }

  return (
    <>
      {
        loading
          ? (
            <LoadingComponent />
          ) : (
            <>
              <div className={styles.payment_details_section_container}>
                <div className={styles.payment_details_section_content}>
                  <PaymentDetailsResume setPaymentMethod={setPaymentMethod} paymentMethod={paymentMethod} />
                </div>
                <div className={styles.payment_details_section_action}>
                  <Button onClick={handleDialog} disabled={paymentMethod?.id}>
                    {messages.action}
                  </Button>
                </div>
              </div>
              <CreditCardDialog
                open={open}
                buttonLabel={messages.dialog.submit}
                handleDialog={handleDialog}
                handleSubmit={handleSubmit}
              />
            </>
          )
      }
    </>
  )
}

export default PaymentDetailsComponent;
