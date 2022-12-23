import React from 'react';

import Layout from '../../../../components/Layout';
import DashboardLayout from '../../../../containers/Dashboard/Layout';
import DashboardDetailLayout from '../../../../containers/Dashboard/Containers/Moving/Detail/layout';

import Component from '../../../../containers/Dashboard/Containers/Moving/Detail';
import { handlePageRedirect, parseCookies } from '../../../../helpers/functions';
import ModifyIconSvg from '../../../../components/Icons/modify';

const ButtonChildrenComponent = ({ label }) => (
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', columnGap: '0.5rem', color: 'rgba(15, 23, 42, 1)' }}>
    <ModifyIconSvg />
    <div>{label}</div>
  </div>
);

const DashboardMovingDetailPage = ({ cookies }) => (
  <Component />
)

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'admin', '', parsedCookies?.order?.items?.length);
}

DashboardMovingDetailPage.getLayout = function getLayout(page) {
  return (
    <Layout cookies={page?.props?.cookies} title='Tableau de bord - Détail du déménagement' pageId='dashboard-moving-detail' withoutHeader>
      <DashboardLayout>
        <DashboardDetailLayout withAction={true} actions={{ color: 'rgba(15, 23, 42, 1)', outlined: true, buttonChildren: <ButtonChildrenComponent label={'Modifier le devis'} />, onClick: () => alert('clicked') }}>
          {page}
        </DashboardDetailLayout>
      </DashboardLayout>
    </Layout>
  )
}

export default DashboardMovingDetailPage;
