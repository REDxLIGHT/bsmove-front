import React, { useState, useEffect, useRef } from 'react';

import Searchbar from '../../../components/Searchbar';

import messages from './messages';
import styles from './index.module.css';
import Avatar from '../../../components/Avatar';
import { useCustomer } from '../../../hooks/customer';
import NotificationsContainer from './NotificationsContainer';

const DashboardHeaderSearchbarContainer = ({
  searchBarData, handleSearchbarData,
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const ref = useRef(null);

  function handleClose() {
    return setAnchorEl(null);
  }

  useEffect(() => {
    setOpen(Boolean(anchorEl));
  }, [anchorEl])

  return (
    <>
      <Searchbar
        messages={messages.searchbar}
        withGrowMenu
        containerId='dashboard-searchbar-container'
        setAnchorEl={setAnchorEl}
      />
      {/* TODO faire le menu ici, pas compris pourquoi ça fonctionne pas */}
    </>
  )
}

const DashboardHeader = () => {
  const [searchBarData, setSearchBarData] = useState([]);
  const [notificationsData, setNotificationsData] = useState([]);
  const { customer } = useCustomer();

  async function handleNotificationsData(data) {
    setNotificationsData(data)
  }

  function handleSearchbarData(values) {
    return setSearchBarData(values)
  }

  return (
    <div className={styles.dashboard_header_container}>
      <DashboardHeaderSearchbarContainer
        searchBarData={searchBarData}
        handleSearchbarData={handleSearchbarData}
      />
      <div className={styles.dashboard_header_right_container}>
        <NotificationsContainer data={notificationsData} handleData={handleNotificationsData} />
        <Avatar
          alt='User_Image'
          src={customer.img}
          customStyles={styles.dashboard_header_right_account_avatar}
        />
      </div>
    </div>
  )
};

export default DashboardHeader;
