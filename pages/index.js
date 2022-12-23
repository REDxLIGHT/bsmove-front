import React from 'react';

import Layout from '../components/Layout';
import NavHeader from '../components/NavHeader';
import Footer from '../components/Footer';
import Component from '../containers/Home';
import { handlePageRedirect, parseCookies } from '../helpers/functions';

export default function Home({ cookies = {} }) {
  return (
    <Layout cookies={cookies} title='Accueil' pageId='home'>
      <NavHeader />
      <Component />
      <Footer />
    </Layout>
  )
}

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'common');
}
