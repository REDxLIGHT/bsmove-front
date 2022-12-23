import React from 'react';
import Section from '../section';

import Component from './component';
import messages from './messages';

const ProfilDeliveryAddress = () => (
  <>
    <Section
      sectionTitle={messages.sectionTitle.deliveryAddress}
      component={Component}
    />
  </>
)

export default ProfilDeliveryAddress;
