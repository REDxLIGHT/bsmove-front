import React from 'react';

import Layout from '../../../components/Layout';
import DashboardLayout from '../../../containers/Dashboard/Layout';
import Component from '../../../containers/Dashboard/Containers/VehicleRenting';
import { handlePageRedirect, parseCookies } from '../../../helpers/functions';

const DashboardVehicleRentingPage = ({ cookies }) => (
  <Component />
)

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'admin', '', parsedCookies?.order?.items?.length);
}

DashboardVehicleRentingPage.getLayout = function getLayout(page) {
  return (
    <Layout cookies={page?.props?.cookies} title='Tableau de bord - Location de véhicules' pageId='dashboard-vehicle-renting' withoutHeader>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  )
}

export default DashboardVehicleRentingPage;
