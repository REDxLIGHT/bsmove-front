import React from 'react';

import Layout from '../../components/Layout';
import NavHeader from '../../components/NavHeader';
import Component from '../../containers/VehicleRent';
import { handlePageRedirect, parseCookies } from '../../helpers/functions';

const VehicleRentPage = ({ cookies }) => (
  <Layout cookies={cookies} title='Location de véhicule' pageId='vehicle-rent'>
    <NavHeader />
    <Component />
  </Layout>
);

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'common');
}

export default VehicleRentPage;
