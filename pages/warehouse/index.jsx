import React from 'react';

import Layout from '../../components/Layout';
import NavHeader from '../../components/NavHeader';
import Component from '../../containers/Warehouse';
import { handlePageRedirect, parseCookies } from '../../helpers/functions';

const WarehousePage = ({ cookies }) => (
  <Layout cookies={cookies} title='Garde meuble' pageId='warehouse'>
    <NavHeader />
    <Component />
  </Layout>
);

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'common');
}

export default WarehousePage;
