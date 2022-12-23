import React from 'react';

import Layout from '../../components/Layout';
import NavHeader from '../../components/NavHeader';
import Component from '../../containers/Moving';
import { handlePageRedirect, parseCookies } from '../../helpers/functions';

const MovingPage = ({ cookies }) => (
  <Layout cookies={cookies} title='Déménagement' pageId='moving'>
    <NavHeader />
    <Component />
  </Layout>
);

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'common');
}

export default MovingPage;
