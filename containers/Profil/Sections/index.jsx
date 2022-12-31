import React from 'react';

import Informations from './Informations';
import Address from './Address';
import PaymentDetails from './PaymentDetails';
import Moving from './Moving';
import VehicleRent from './VehicleRent';
import FurnituresBuy from './FurnituresBuy';
import styles from './index.module.css';
import { Fade } from '@mui/material';
import { useCustomer } from '../../../hooks/customer';

const ProfileSections = ({ tabValue = 0 }) => {
  const { customer } = useCustomer();

  return (
    <Fade in={true} timeout={500}>
      <div className={styles.profil_content_sections_container}>
        {
          tabValue === 0 && <Informations customer={customer} />
        }
        {
          tabValue === 1 && <Address />
        }
        {
          tabValue === 2 && <PaymentDetails customer={customer} />
        }
        {
          tabValue === 3 && <Moving customer={customer} />
        }
        {
          tabValue === 4 && <VehicleRent customer={customer} />
        }
        {
          tabValue === 5 && <FurnituresBuy customer={customer} />
        }
      </div>
    </Fade>
  )
}

export default ProfileSections;
