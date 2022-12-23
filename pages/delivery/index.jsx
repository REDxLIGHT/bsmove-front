import React from 'react';

import Layout from '../../components/Layout';
import NavHeader from '../../components/NavHeader';
import Footer from '../../components/Footer';
import Component from '../../containers/Delivery';
import { handlePageRedirect, isObjectEmpty, parseCookies } from '../../helpers/functions';
import PrivateRoute from '../../components/PrivateRoute';
import { NAV_HEADER_FURNITURES_BUY_STEPS } from '../../helpers/constants';

const DeliveryPage = ({ cookies, ...rest }) => (
  <Layout cookies={cookies} title='Livraison' pageId='delivery' withoutHeader>
    <NavHeader secondary initialStep={1} steps={NAV_HEADER_FURNITURES_BUY_STEPS} />
    <Component />
    <Footer />
  </Layout>
);

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'private', '', parsedCookies?.order?.items?.length);
}

export default DeliveryPage;
