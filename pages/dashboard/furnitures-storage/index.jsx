import React from 'react';

import Layout from '../../../components/Layout';
import DashboardLayout from '../../../containers/Dashboard/Layout';
import Component from '../../../containers/Dashboard/Containers/FurnituresStorage';
import { handlePageRedirect, parseCookies } from '../../../helpers/functions';

const DashboardFurnituresStoragePage = ({ cookies }) => (
  <Component />
)

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'admin');
}

DashboardFurnituresStoragePage.getLayout = function getLayout(page) {
  return (
    <Layout cookies={page?.props?.cookies} title='Tableau de bord - Garde meubles' pageId='dashboard-furnitures-storage' withoutHeader>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  )
}

export default DashboardFurnituresStoragePage;
