import React, { useEffect } from 'react';

import Layout from '../../components/Layout';
import NavHeader from '../../components/NavHeader';
import Footer from '../../components/Footer';
import Component from '../../containers/ConfirmPayment';
import { handlePageRedirect, isObjectEmpty, parseCookies } from '../../helpers/functions';
import { NAV_HEADER_FURNITURES_BUY_STEPS } from '../../helpers/constants';

const ConfirmPaymentPage = ({ cookies }) => (
  <Layout cookies={cookies} title='Confirmation du paiement' pageId='confirm-payment' withoutHeader>
    <NavHeader secondary initialStep={3} steps={NAV_HEADER_FURNITURES_BUY_STEPS} />
    <Component />
    <Footer />
  </Layout>
)

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'private', '', parsedCookies?.order?.items?.length);
}

export default ConfirmPaymentPage;
