import React, { useState } from 'react';

import { Subtitle } from '../../components/Texts';
import messages from './messages';

const DashboardHomeContainer = () => {
  return (
    <Subtitle>{messages.title}</Subtitle>
  )
}

export default DashboardHomeContainer;
