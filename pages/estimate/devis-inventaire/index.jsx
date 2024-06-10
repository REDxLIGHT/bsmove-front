import { useState } from "react";

import Layout from "../../../components/Layout";
import NavHeader from "../../../components/NavHeader";
import Footer from "../../../components/Footer";
import Component from "../../../containers/Estimate";
import { handlePageRedirect, parseCookies } from "../../../helpers/functions";
import { NAV_HEADER_ESTIMATE_STEPS } from "../../../helpers/constants";

const EstimateInventoryPage = ({ cookies }) => {
  const [step, setStep] = useState(1);
  return (
    <Layout
      cookies={cookies}
      title="BSMove Déménagement - Devis Inventaire"
      description="Établissez un inventaire détaillé de vos biens pour obtenir une estimation précise du coût de votre déménagement."
      keywords="inventaire de l'estimation, inventaire, estimation, déménagement, services"
      pageId="estimate-inventory"
      withoutHeader
    >
      <NavHeader secondary initialStep={1} steps={NAV_HEADER_ESTIMATE_STEPS} />
      <Component step={step} setStep={setStep} />
      <Footer />
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, "common");
};

export default EstimateInventoryPage;
