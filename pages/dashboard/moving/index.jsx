import React from 'react';

import Layout from '../../../components/Layout';
import DashboardLayout from '../../../containers/Dashboard/Layout';
import Component from '../../../containers/Dashboard/Containers/Moving';
import { handlePageRedirect, parseCookies } from '../../../helpers/functions';

const DashboardMovingPage = ({ cookies }) => (
  <Component />
)

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'admin');
}

DashboardMovingPage.getLayout = function getLayout(page) {
  return (
    <Layout cookies={page?.props?.cookies} title='Tableau de bord - Déménagement' pageId='dashboard-moving' withoutHeader>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  )
}

export default DashboardMovingPage;
