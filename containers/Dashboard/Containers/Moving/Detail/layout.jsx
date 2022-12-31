import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import messages from './messages';
import styles from './index.module.css';
import { Subtitle } from '../../../../../components/Texts';
import Button from '../../../../../components/Button';
import StatusVignet from '../../../../../components/StatusVignet';
import DashboardContainerHeader from '../../Header';

export default function DashboardDetailLayoutContainer({ withAction, actions, children }) {
  const router = useRouter();
  const { ref } = router.query;
  
  function handleGoBack() {
    router.back();
  }

  useEffect(() => {
    if (!ref) return ;
    async function fetchEstimateDetailByRef() {
      // if no ref existing, redirect to moving
    }
    
    fetchEstimateDetailByRef();
  }, [ref])

  return (
    <div className={styles.dashboard_moving_detail_layout_container}>
      <div className={styles.dashboard_moving_detail_layout_back_button}>
        <KeyboardArrowLeftIcon fontSize='small' />
        <Button $backgroundColor='rgba(241, 245, 249, 1)' outlined $color='rgba(241, 245, 249, 1)' onClick={handleGoBack}>
          <div className={styles.dashboard_moving_detail_layout_back_button_label}>{messages.layout.backButton}</div>
        </Button>
      </div>
      <div className={styles.dashboard_moving_detail_layout_status_container}>
        <div className={styles.dashboard_moving_detail_layout_status_vignet}>
          <StatusVignet
            message={messages.layout.status.estimate.waitingForPayment}
            status='success'
            padding='0rem 1.5rem'
          />
          {/* STATUS DU DEMENAGEMENT ? */}
          {/* <StatusVignet
            message={messages.layout.status.estimate.onGoing}
            status='pending'
            padding='0rem 1.5rem'
          /> */}
        </div>
      </div>
      <DashboardContainerHeader
        title={`${messages.layout.moving.title}${ref}`}
        withAction={withAction}
        actions={actions}
      />
      {/* <Subtitle>{`${messages.layout.moving.title}${ref}`}</Subtitle> */}
      {children}
    </div>
  )
}
