import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { useAlert } from '../../../../../../hooks/alert';

import Card from '../../../../../../components/Card';
import Button from '../../../../../../components/Button';
import TextArea from '../../../../../../components/TextArea';

import detailStyles from '../index.module.css';
import messages from './messages';
import { ALERT } from '../../../../../../helpers/constants';

const DashboardMovingDetailDenied = () => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const { setAlert } = useAlert();
  const { ref } = router.query;

  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleCancel() {
    return router.back();
  }

  function handleAccept() {
    if (!input || !input.length) return setAlert({ severity: ALERT.ERROR, content: messages.actions.alert.error.emptyField });
    return setAlert({ severity: ALERT.SUCCESS, content: messages.actions.alert.success });
  }

  return (
    <div className={detailStyles.dashboard_moving_detail_container}>
      <div className={detailStyles.dashboard_moving_detail_left_container}>
        <Card title={messages.title}>
          <TextArea onChange={handleChange} rows={12} label={messages.inputPlaceholder} />
        </Card>
        <div className={detailStyles.dashboard_moving_detail_left_container_buttons_wrapper_reverse_container}>
          <div className={detailStyles.dashboard_moving_detail_left_container_buttons_wrapper}>
            <Button onClick={handleCancel} outlined $color='rgba(220, 38, 38, 1)'>{messages.actions.cancel}</Button>
            <Button onClick={handleAccept} disabled={!input?.length}>{messages.actions.accept}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardMovingDetailDenied;
