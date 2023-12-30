import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import messages from "./messages";
import styles from "./index.module.css";
import { useCustomer } from "../../hooks/customer";
import Routes from "../../helpers/routes";
import { Subtitle } from "../../components/Texts";
import VerticalTabs from "../../components/VerticalTabs";

import ProfilContentSection from "./Sections";
import { useEstimate } from "../../hooks/estimate";
import { useGlobal } from "../../hooks/global";

const profilTabs = [
  { title: messages.settings.categories.personalInformations, value: 0 },
  { title: messages.settings.categories.facturationInformations, value: 1 },
  { title: messages.settings.categories.paymentDetails, value: 2 },
];

const mySpaceTabs = [
  { title: messages.mySpace.categories.moving, value: 3 },
  { title: messages.mySpace.categories.vehiclesRent, value: 4 },
  { title: messages.mySpace.categories.furnitures, value: 5 },
];

const ProfilNavigationRow = ({ handleLogout, handleTabChange, activeTab }) => (
  <div className={styles.profil_navigation_row_container}>
    <Subtitle>{messages.title}</Subtitle>
    <div className={styles.profil_navigation_row_categories}>
      <div className={styles.profil_navigation_row_category_container}>
        <div className={styles.profil_navigation_row_category_title}>
          {messages.settings.title}
        </div>
        <VerticalTabs
          tabs={profilTabs}
          handleTabChange={handleTabChange}
          active={activeTab}
        />
      </div>
      <div className={styles.profil_navigation_row_category_container}>
        <div className={styles.profil_navigation_row_category_title}>
          {messages.mySpace.title}
        </div>
        <VerticalTabs
          tabs={mySpaceTabs}
          handleTabChange={handleTabChange}
          active={activeTab}
        />
      </div>
      <div className={styles.profil_logout} onClick={handleLogout}>
        {messages.logout}
      </div>
    </div>
  </div>
);

const ProfilContainer = ({ initialTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const router = useRouter();
  const { clearEstimate } = useEstimate();
  const { clearAuth, clearCustomer } = useCustomer();
  const { resetRedirect, global } = useGlobal();

  useEffect(() => {
    resetRedirect();
  }, [global]);
  function handleTabChange(tabValue) {
    return setActiveTab(tabValue);
  }

  async function handleLogout() {
    clearAuth();
    clearCustomer();
    clearEstimate();
    router.replace(Routes.HOME_PAGE);
  }

  return (
    <div className={styles.container}>
      <ProfilNavigationRow
        handleLogout={handleLogout}
        handleTabChange={handleTabChange}
        activeTab={activeTab}
      />
      <ProfilContentSection tabValue={activeTab} />
    </div>
  );
};

export default ProfilContainer;
