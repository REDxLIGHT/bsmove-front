import React from 'react';
import Layout from '../../components/Layout';
import NavHeader from '../../components/NavHeader';
import Footer from '../../components/Footer'

import Component from '../../containers/Profil';
import { handlePageRedirect, parseCookies } from '../../helpers/functions';

const ProfilPage = ({ cookies = {} }) => (
  <Layout cookies={cookies} title='Mon profil' pageId='profil'>
    <NavHeader />
    <Component />
    <Footer />
  </Layout>
);

ProfilPage.propTypes = {};

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'private');
}

export default ProfilPage;
