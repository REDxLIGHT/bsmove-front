import React from 'react';

import Layout from '../../components/Layout';
import NavHeader from '../../components/NavHeader';
import Footer from '../../components/Footer';
import Component from '../../containers/VolumeCalculator';
import { handlePageRedirect, parseCookies } from '../../helpers/functions';

const VolumeCalculatorPage = ({ cookies }) => (
  <Layout cookies={cookies} title='Calculateur de volume' pageId='volume-calculator'>
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

export default VolumeCalculatorPage;
