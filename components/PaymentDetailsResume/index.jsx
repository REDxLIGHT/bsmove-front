import React, { useState } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { capitalize, Dialog } from '@material-ui/core';


import { getShortExpiry } from '../../helpers/functions';
import API from '../../helpers/api';
import { ALERT } from '../../helpers/constants';

import { useCustomer } from '../../hooks/customer';
import { useLoading } from '../../hooks/loading';
import Button from '../../components/Button';

import styles from './index.module.css';
import messages from './messages';
import DeleteDialog from '../DeleteDialog';
import { useAlert } from '../../hooks/alert';

const PaymentDetailsResumeComponent = ({ setPaymentMethod, paymentMethod: {
  id: paymentMethodId,
  card: { last4, exp_month, exp_year, brand } = {},
} = {}}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { auth } = useCustomer();
  const { setGlobalLoading } = useLoading();
  const { setAlert } = useAlert();

  function handleDeleteDialog() {
    return setDeleteDialogOpen(prevState => !prevState);
  }

  async function handleDelete() {
    if (!auth) return ;
    setGlobalLoading(true);
    const res = await API.post(`/Customers/${auth.userId}/StripeAccount/removeCard`, { paymentMethodId }, { headers: { Authorization: auth.id } });
    setGlobalLoading(false);
    setPaymentMethod({});
    setAlert({ severity: ALERT.success, content: messages.alert.success });
    return handleDeleteDialog();
  }

  return (
    <div className={styles.payment_details_resume_container}>
      <div className={styles.payment_details_resume_header}>
        <span>{messages.header.method}</span>
        <span>{messages.header.expiry}</span>
        <span>{messages.header.type}</span>
      </div>
      <div>
        <span>{`${messages.content.method} ${last4}`}</span>
        <span>{getShortExpiry(exp_month, exp_year)}</span>
        <span>{capitalize(brand) || ''}</span>
        <div className={styles.payment_details_resume_action_container}>
          <Button onClick={handleDeleteDialog} marginLabel='0 20%' outlined color='rgba(239, 68, 68, 1)'>
            <div className={styles.payment_details_resume_action_label}>
              <div>{messages.action.delete}</div>
              <DeleteForeverIcon fontSize='small' />
            </div>
          </Button>
        </div>
      </div>
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialog}
        title={messages.dialog.title}
        item={`${messages.dialog.content}${last4}`}
        handleConfirm={handleDelete}
        handleDeny={handleDeleteDialog}
      />
    </div>
  )
}

const PaymentDetailsResume = ({ setPaymentMethod, paymentMethod = {} }) => (
  <div>
    {
      paymentMethod?.id
        ? <PaymentDetailsResumeComponent setPaymentMethod={setPaymentMethod} paymentMethod={paymentMethod} />
        : <div>{messages.noContent}</div>
    }
  </div>
)

export default PaymentDetailsResume;
