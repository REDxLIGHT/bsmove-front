import React from 'react';

import Layout from '../../components/Layout';
import NavHeader from '../../components/NavHeader';
import Footer from '../../components/Footer';
import Component from '../../containers/FurnituresBuy';
import { handlePageRedirect, parseCookies } from '../../helpers/functions';

const FurnituresBuyPage = ({ cookies }) => (
  <Layout cookies={cookies} title='Achat de fournitures' pageId='furnitures-buy'>
    <NavHeader />
    <Component />
    <Footer />
  </Layout>
)

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'common');
}

export default FurnituresBuyPage;
