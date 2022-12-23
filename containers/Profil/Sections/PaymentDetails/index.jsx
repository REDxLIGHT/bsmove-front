import React from 'react';
import SectionContainer from '../section';

import Component from './component';
import messages from './messages';

const PaymentDetailsSection = () => (
  <SectionContainer
    sectionTitle={messages.sectionTitle.paymentDetails}
    component={Component}
  />
);

export default PaymentDetailsSection;
