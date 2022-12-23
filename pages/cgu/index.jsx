import React from 'react';

import InConstructionComponent from '../../components/InConstruction'
import Layout from '../../components/Layout';
import { handlePageRedirect, parseCookies } from '../../helpers/functions';

const CguPage = ({ cookies }) => (
  <Layout cookies={cookies} title="Conditions d'utilisation" pageId='cgu'>
    <InConstructionComponent />
  </Layout>
);

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'common');
}

export default CguPage;
