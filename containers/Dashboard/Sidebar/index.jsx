import React from 'react';
import styled from 'styled-components';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import Routes from '../../../helpers/routes';

import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';

import HomeIcon from '../../../components/Icons/home';
import MovingIcon from '../../../components/Icons/moving';
import VehicleRentingIcon from '../../../components/Icons/vehicle-location';
import ShopIcon from '../../../components/Icons/shop';
import WarehouseIcon from '../../../components/Icons/warehouse';
import LogoutIconSvg from '../../../components/Icons/logout';

import styles from './index.module.css';
import messages from './messages';

const S = {};

S.ListItem = styled(ListItem)`
background-color: ${props => props.$active ? 'rgba(30, 41, 59, 1)' : 'inherit'};
color: ${props => props.$active ? 'rgba(255, 255, 255, 1)' : 'inherit'};
&:hover {
  background-color: rgba(30, 41, 59, 1);
  }
`;

S.Subtitle = styled.label`
  color: rgba(148, 163, 184, 1);
  font-weight: 600;
  padding-left: 0.5em;
`;

S.Divider = styled(Divider)`
  margin: 0.5rem 0;
  opacity: 0.1;
  background-color: rgba(248, 250, 252, 1);
`;

S.ListItemIcon = styled(ListItemIcon)`
  color: ${props => props.$active ? 'rgba(255, 255, 255, 1)' : 'rgba(203, 213, 225, 1)'};
`;

S.ListItemText = styled(ListItemText)`
  color: ${props => props.$active ? 'rgba(255, 255, 255, 1)' : 'rgba(203, 213, 225, 1)'};
`;

const categories = [
  { label: messages.categories.home.label, icon: <HomeIcon />, name: messages.categories.home.name },
  { label: messages.categories.moving.label, icon: <MovingIcon />, name: messages.categories.moving.name },
  { label: messages.categories.vehicleRenting.label, icon: <VehicleRentingIcon />, name: messages.categories.vehicleRenting.name },
  { label: messages.categories.shop.label, icon: <ShopIcon />, name: messages.categories.shop.name },
  { label: messages.categories.furnitureStorage.label, icon: <WarehouseIcon />, name: messages.categories.furnitureStorage.name },
];

const DashboardSidebarHeader = () => (
  <div className={styles.dashboard_sidebar_header}>
    <div className={styles.dashboard_sidebar_header_logo}>
      <Avatar alt='BSMove'>{messages.avatar}</Avatar>
    </div>
    <div className={styles.dashboard_sidebar_header_text}>
      <div className={styles.dashboard_sidebar_header_title}>{messages.title}</div>
      <div className={styles.dashboard_sidebar_header_subtitle}>{messages.subtitle}</div>
    </div>
  </div>
)

const DashboardSidebarCategory = ({ label, name, icon, activeTab = false, handleActiveTab }) => (
  <S.ListItem $active={activeTab === name} button key={name} onClick={() => handleActiveTab(name)}>
    <S.ListItemIcon $active={activeTab === name}>{icon}</S.ListItemIcon>
    <S.ListItemText $active={activeTab === name} primary={label} />
  </S.ListItem>
)

const DashboardSidebarList = ({
  activeTab, handleActiveTab, subtitle, categories,
}) => (
  <div>
    <List>
      {categories.map(({ label, name, icon }) => (
        <DashboardSidebarCategory
          key={label}
          activeTab={activeTab}
          handleActiveTab={handleActiveTab}
          label={label}
          name={name}
          icon={icon}
        />
      ))}
    </List>
  </div>
)

const DashboardSidebar = ({
  activeTab, handleActiveTab,
}) => (
  <div className={styles.dashboard_sidebar_container}>
    <DashboardSidebarHeader />
    <div id='button-container' className={styles.dashboard_sidebar_button}>
      <Button>
        {messages.button}
      </Button>
    </div>
    <div id='sidebar-categories'>
      <DashboardSidebarList
        activeTab={activeTab}
        handleActiveTab={handleActiveTab}
        subtitle={messages.subtitles.vehicleRenting}
        categories={categories}
      />
      <S.Divider />
      <DashboardSidebarCategory
        activeTab={activeTab}
        handleActiveTab={handleActiveTab}
        label={messages.categories.logout.label}
        name={messages.categories.logout.name}
        icon={<LogoutIconSvg />}
      />
    </div>
  </div>
)

export default DashboardSidebar;
