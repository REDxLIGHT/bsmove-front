import React, {useState} from 'react';

import Layout from '../../../components/Layout';
import NavHeader from '../../../components/NavHeader';
import Footer from '../../../components/Footer';
import Component from '../../../containers/Estimate';
import { handlePageRedirect, parseCookies } from '../../../helpers/functions';
import { NAV_HEADER_ESTIMATE_STEPS } from '../../../helpers/constants';

const EstimateSummaryPage = ({ cookies }) => {
    const [step, setStep] = useState(3)
    return (
        <Layout cookies={cookies} title='Devis - Récapitulatif et paiement' pageId='estimate-summary-payment' withoutHeader>
            <NavHeader secondary initialStep={2} steps={NAV_HEADER_ESTIMATE_STEPS} />
            <Component step={step} setStep={setStep} />
            <Footer />
        </Layout>
    );
}

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'private');
}

export default EstimateSummaryPage;