import React, { useState, useEffect } from 'react';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import messages from './messages';
import styles from './index.module.css';

import API from '../../../../helpers/api';
import { useCustomer } from '../../../../hooks/customer';
import LoadingComponent from '../../../../components/LoadingComponent';
import { CURRENCY } from '../../../../helpers/constants';
import { formatDate, getOrderStatus, isObjectEmpty } from '../../../../helpers/functions';
import StatusVignet from '../../../../components/StatusVignet';
import Button from '../../../../components/Button';
import FurnituresBuyResume from './FurnituresBuyResume';


// SHOULD IMPLEMENT INFINIT SCROLL OR BUTTON TO "LOAD MORE"

const PreviousOrdersComponent = ({ previousOrders = [], handleSeeDetails }) => (
  <>
    {
      previousOrders.map((previousOrder) => (
        <div key={previousOrder.id} className={styles.furnitures_buy_resume_container}>
          <div className={styles.furnitures_buy_resume_header}>
            <span>{messages.header.order}</span>
            <span>{messages.header.date}</span>
            <span>{messages.header.state}</span>
            <span>{messages.header.total}</span>
          </div>
          <div className={styles.furnitures_buy_resume_content}>
            <span>{previousOrder.uniqueId}</span>
            <span>{formatDate(previousOrder.createdAt) || 'non defini'}</span>
            <span className={styles.status_vignet_container}>
              <StatusVignet status={getOrderStatus(previousOrder.finished, previousOrder.status)} />
            </span>
            <span>{`${previousOrder.summedTotal}${CURRENCY.EUR}` || 'non defini'}</span>
            <Button height="2.5em" fontSize='0.7em' paddingLabel='0 1em' onClick={() => handleSeeDetails(previousOrder)}>
              <div className={styles.action_label_container}>
                <div>{messages.action.seeMore}</div>
                <KeyboardArrowRightIcon fontSize='small' />
              </div>
            </Button>
          </div>
        </div>
      ))
    }
  </>
)

const ProfilFurnituresOrdersComponent = ({ handleSeeDetails }) => {
  const [previousOrders, setPreviousOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useCustomer();

  useEffect(() => {
    if (auth?.userId) {
      async function fetchOrders() {
        const res = await API.get(`/Customers/${auth.userId}/Orders?filter={ "order": "createdAt DESC", "limit": 100 }`, {}, { headers: { Authorization: auth.id } });
        setLoading(false);
        if (!res?.ok) {
          return console.error('res is not ok : ', res);
        }
        setPreviousOrders(res.data);
      }

      fetchOrders();
    }
  }, [auth])

  return (
    <div className={styles.profil_furnitures_buy_section_container}>
      {
        loading
        ? <LoadingComponent />
        : previousOrders?.length
          ? <PreviousOrdersComponent previousOrders={previousOrders} handleSeeDetails={handleSeeDetails} />
          : <div>{messages.noContent}</div>
      }
    </div>
  )
}

export default ProfilFurnituresOrdersComponent;
