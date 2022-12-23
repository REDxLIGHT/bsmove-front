import React, { useEffect, useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Divider, makeStyles } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useRouter } from 'next/router';

import { Subtitle } from '../../../../components/Texts';
import LoadingComponent from '../../../../components/LoadingComponent';
import Button from '../../../../components/Button';
import { useCustomer } from '../../../../hooks/customer';
import { CURRENCY, METRICS } from '../../../../helpers/constants';

import messages from './messages';
import styles from './index.module.css';
import { formatDate } from '../../../../helpers/functions';
import Routes from '../../../../helpers/routes';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    textTransform: 'capitalize',
    fontSize: '1rem',
    color: theme.colors.dark,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderBottom: '1px solid rgba(203, 213, 225, 1)',
    width: '100%',
  },
  flexContainer: {
    justifyContent: 'flex-start',
  },
  indicator: {
    backgroundColor: props => (!props.noUnderline ? theme.colors.mainGreen : 'transparent'),
    // bottom: 0,
  },
}));

const useTabStyles = makeStyles(theme => ({
  root: {
    color: theme.colors.dark,
    fontWeight: 600,
    fontFamily: 'proxima-nova',
    fontSize: '80%',
    textAlign: 'left',
  },
  selected: {
    color: theme.colors.mainGreen,
  },
}));

const DashboardMovingHeader = () => (
  <div className={styles.dashboard_containers_moving_header}>
    <Subtitle>{messages.title}</Subtitle>
    <div>
      <div></div>
      <div>Aujourd'hui</div>
    </div>
  </div>
)

const DashboardMovingTabs = ({
  activeTab = 0, handleActiveTabChange = () => {},
}) => {
  const classes = useStyles();
  const tabClasses = useTabStyles()
  return (
    <div className={styles.dashboard_containers_moving_categories_tabs}>
      <Tabs
        value={activeTab}
        onChange={handleActiveTabChange}
        classes={classes}
      >
        <Tab label={messages.tabs.new.label} classes={tabClasses} />
        <Tab label={messages.tabs.ongoing.label} classes={tabClasses}/>
        <Tab label={messages.tabs.finished.label} classes={tabClasses}/>
      </Tabs>
    </div>
  )
}

const DashboardMovingCategoriesHeader = () => (
  <div className={styles.dashboard_containers_moving_categories_header}>
    <div className={styles.dashboard_containers_moving_categories_layout}>
      <div className={styles.dashboard_containers_moving_category_estimate}>{messages.categories.estimate.label}</div>
      <div className={styles.dashboard_containers_moving_category_client}>{messages.categories.client.label}</div>
      <div className={styles.dashboard_containers_moving_category_delivered_date}>{messages.categories.deliveredDate.label}</div>
      <div className={styles.dashboard_containers_moving_category_started_date}>{messages.categories.startedDate.label}</div>
      <div className={styles.dashboard_containers_moving_category_volume}>{messages.categories.volume.label}</div>
      <div className={styles.dashboard_containers_moving_category_total}>{messages.categories.total.label}</div>
      <div className={styles.dashboard_containers_moving_category_action}></div>
    </div>
    <Divider />
  </div>
)

const DashboardMovingItem = ({
  item = {}, handleRedirect,
}) => {

  function handleItemClick() {
    handleRedirect(item?.ref);
  }
  
  return (
    <>
      <div key={item?.id} className={styles.dashboard_containers_moving_categories_item}>
        <div className={styles.dashboard_containers_moving_categories_layout}>
          <div className={styles.dashboard_containers_moving_category_estimate}>{`N° ${item?.id}`}</div>
          <div className={styles.dashboard_containers_moving_category_client}>{item?.name}</div>
          <div className={styles.dashboard_containers_moving_category_delivered_date}>{formatDate(item?.deliveredDate)}</div>
          <div className={styles.dashboard_containers_moving_category_started_date}>{formatDate(item?.startedDate)}</div>
          <div className={styles.dashboard_containers_moving_category_volume}>{`${item?.volume} ${METRICS.CUBE}`}</div>
          <div className={styles.dashboard_containers_moving_category_total}>{`${item?.total} ${CURRENCY.EUR}`}</div>
          <div className={styles.dashboard_containers_moving_category_action}>
            <Button height='2.5em' onClick={handleItemClick}>
              <div className={styles.dashboard_containers_moving_category_action_children}>
                <span>{messages.categories.action.label}</span>
                <KeyboardArrowRightIcon fontSize='small' />
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Divider />
    </>
  )
}

const DashboardMovingList = ({
  list = [], handleRedirect,
}) => {
  return (
    <>
      {
        !list?.length
          ? <div>test</div>
          : list.map((item) => <DashboardMovingItem item={item} handleRedirect={handleRedirect} />)
      }
    </>
  )
}

const mockedEstimateList = [
  { id: 1, ref: 1, name: 'Sami bg', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 2, ref: 2, name: 'Sami bg 2', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 3, ref: 3, name: 'Sami bg 3', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 4, ref: 4, name: 'Sami bg 4', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 5, ref: 5, name: 'Sami bg 5', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 6, ref: 6, name: 'Sami bg 6', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 7, ref: 7, name: 'Sami bg 6', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 8, ref: 8, name: 'Sami bg 6', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 9, ref: 9, name: 'Sami bg 6', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 10, ref: 10, name: 'Sami bg 6', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 11, ref: 11, name: 'Sami bg 6', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 12, ref: 12, name: 'Sami bg 6', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 13, ref: 13, name: 'Sami bg 6', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 14, ref: 14, name: 'Sami bg 6', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 15, ref: 15, name: 'Sami bg 6', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 16, ref: 16, name: 'Sami bg 6', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 17, ref: 17, name: 'Sami bg 6', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 18, ref: 18, name: 'Sami bg 6', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 19, ref: 19, name: 'Sami bg 6', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
  { id: 20, ref: 20, name: 'Sami bg 6', deliveredDate: new Date(), startedDate: new Date(), volume: 1000, total: 20.34 },
]

const DashboardMovingContainer = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const router = useRouter();
  const { auth } = useCustomer();

  function handleActiveTabChange(event, value) {
    if (value === activeTab) return ;
    setActiveTab(value)
  }

  function handleRedirect(ref) {
    return router.push(`${Routes.DASHBOARD_MOVING_DETAILS_PAGE}?ref=${ref}`);
  }

  useEffect(() => {
    if (!auth || activeTab === undefined) return ;
    async function fetchEstimateList() {
      // const response = await ...
      setList(mockedEstimateList);
      setLoading(false)
      console.log('fetching done')
    }
    console.log('fetching ...');
    setLoading(true);
    setTimeout(() => fetchEstimateList(), 2);
    // fetchEstimateList();
  }, [auth, activeTab]);

  return (
    <div className={styles.dashboard_containers_moving_container}>
      <DashboardMovingHeader />
      <DashboardMovingTabs
        activeTab={activeTab}
        handleActiveTabChange={handleActiveTabChange}
      />
      <DashboardMovingCategoriesHeader />
      {loading ? <LoadingComponent padding='1em 0' /> : <DashboardMovingList list={list} handleRedirect={handleRedirect} />}
    </div>
  );
}

export default DashboardMovingContainer;
