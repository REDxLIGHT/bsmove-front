import { useState } from "react";

import Layout from "../../../components/Layout";
import NavHeader from "../../../components/NavHeader";
import Footer from "../../../components/Footer";
import Component from "../../../containers/Estimate/Validation";
import { handlePageRedirect, parseCookies } from "../../../helpers/functions";
import { NAV_HEADER_ESTIMATE_STEPS } from "../../../helpers/constants";

const EstimateSummaryPage = ({ cookies }) => (
  <Layout
    cookies={cookies}
    title="Devis - Validation"
    pageId="estimate-validation"
    withoutHeader
  >
    <NavHeader secondary initialStep={3} steps={NAV_HEADER_ESTIMATE_STEPS} />
    <Component />
    <Footer />
  </Layout>
);

export const getServerSideProps = async (context) => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, "private");
};

export default EstimateSummaryPage;
