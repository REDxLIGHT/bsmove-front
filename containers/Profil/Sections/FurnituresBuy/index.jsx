import React, { useState } from 'react';
import SectionContainer from '../section';

import messages from './messages';
import Component from './component';
import { isObjectEmpty } from '../../../../helpers/functions';
import FurnituresBuyResume from './FurnituresBuyResume';

const ProfilFurnitures = () => {
  const [details, setDetails] = useState({});

  function handleSeeDetails(order) {
    if (isObjectEmpty(order)) return setDetails({});
    return setDetails(previousState => ({ ...previousState, order }))
  }

  return (
    <>
      {isObjectEmpty(details)
        ? (
          <SectionContainer
            sectionTitle={messages.sectionTitle.furnituresBuy}
            component={Component}
            handleSeeDetails={handleSeeDetails}
          />
        ) : (
          <FurnituresBuyResume
            handleSeeDetails={handleSeeDetails}
            order={details?.order}
          />
        )
      }
    </>
)
}

export default ProfilFurnitures;
