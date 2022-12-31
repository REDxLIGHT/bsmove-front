import React, { useState } from 'react';
import styled from 'styled-components';
import { Popover, IconButton, Divider } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LoadingComponent from '../../../../components/LoadingComponent';
import Badge from '../../../../components/Badge';
import styles from './index.module.css';
import messages from './messages';

const S = {};

S.IconButton = styled(IconButton)`
  padding: 0;
`;

const mockedData = [
  { id: 'popo1' },
  { id: 'popo2' },
  { id: 'popo3' },
  { id: 'popo4' },
  { id: 'popo5' },
  { id: 'popo6' },
]

const NotificationsList = ({
  list = [],
}) => (
  <div>
    {
      list.length === 0
        ? <div>{messages.emptyList}</div>
        : list.map((notification, index) => (
          <div key={notification?.id}>
            <div>{notification.id}</div>
            {list.length > index + 1 && <Divider />}
          </div>
        ))
    }
  </div>
)

const POPOVER_ID = 'notification-popover';
const NotificationsContainer = ({
  notificationsList = [], handleData, loading = false,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

  const open = Boolean(anchorEl);
  const popoverId = open ? POPOVER_ID : undefined;
  return (
    <>
      <S.IconButton aria-describedby={popoverId} id='notification-button' onClick={handleClick}>
        <Badge count={mockedData.length} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} extrastyle={{ badgeBackgroundColor: 'rgba(220, 38, 38, 1)' }}>
          <NotificationsNoneOutlinedIcon className={styles.dashboard_header_right_notification_button} fontSize="large" />
        </Badge>
      </S.IconButton>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{
          paper: styles.dashboard_header_notification_popover,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {
          loading
            ? <LoadingComponent />
            : (
            <NotificationsList
              // list={notificationsList}
              list={mockedData}
            />
          )
        }
      </Popover>
    </>
  )
}

export default NotificationsContainer;
