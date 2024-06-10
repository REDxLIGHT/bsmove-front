import { useEffect } from "react";
import Cookies from "cookies";

import Layout from "../../components/Layout";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import Component from "../../containers/Basket";
import { handlePageRedirect, parseCookies } from "../../helpers/functions";
import { NAV_HEADER_FURNITURES_BUY_STEPS } from "../../helpers/constants";

const BasketPage = ({ cookies }) => (
  <Layout cookies={cookies} title="BS Move Déménagement - Mon panier" description="Consultez les articles que vous avez ajoutés à votre panier et procédez au paiement en toute sécurité." keywords="panier, achats, déménagement, produits, commande" pageId="basket" withoutHeader>
    <NavHeader
      secondary
      initialStep={0}
      steps={NAV_HEADER_FURNITURES_BUY_STEPS}
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

export default BasketPage;
