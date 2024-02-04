import { any } from "prop-types";
import Layout from "../../../../components/Layout";
import NavHeader from "../../../../components/NavHeader";
import Component from "../../../../containers/Rent/Vehicle/Selection";
import {
  handlePageRedirect,
  parseCookies,
} from "../../../../helpers/functions";
import Footer from "../../../../components/Footer";
import { NAV_HEADER_VEHICLE_RENT_STEPS } from "../../../../helpers/constants";

const RentSelectionPage = ({ cookies }) => (
  <Layout
    cookies={cookies}
    title="Selection du camion"
    pageId="truck-rent-selection"
    withoutHeader
  >
    <NavHeader
      secondary
      initialStep={1}
      steps={NAV_HEADER_VEHICLE_RENT_STEPS}
    />
    <Component />
    <Footer />
  </Layout>
);

export const getServerSideProps = async (context) => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, "common");
};

RentSelectionPage.propTypes = {
  cookies: any,
};

export default RentSelectionPage;
