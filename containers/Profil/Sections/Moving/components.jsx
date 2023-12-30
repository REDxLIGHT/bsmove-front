import { useCustomer } from "../../../../hooks/customer";
import API from "../../../../helpers/api";
import styles from "./index.module.css";
import LoadingComponent from "../../../../components/LoadingComponent";
import messages from "./messages";
import Button from "../../../../components/Button";
import Routes from "../../../../helpers/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import TabPanel from "../../../../components/TabPanel";

const PreviousMovingEstimate = ({ estimateItem }) => {
  return (
    <div className={styles.profil_moving_estimate}>
      <span className={styles.profil_moving_previous_estimate_subsection}>
        REF #{estimateItem.id.slice(0, 5)}
      </span>
      <div className={styles.profil_moving_previous_estimate_subsection}>
        <span>
          {estimateItem.startInformations?.address?.city || "?"} --{" "}
          {estimateItem.endInformations?.address?.city || "?"}
        </span>
        <span>{estimateItem.startDate}</span>
      </div>
      <Button
        outlined
        className={styles.profil_moving_previous_estimate_see_more}
      >
        Details
      </Button>
    </div>
  );
};

const PreviousMovingComponent = ({ previousEstimates }) => {
  const [activeTab, setActiveTab] = useState(0);

  function handleTabChange(e, newTab = 0) {
    if (newTab === activeTab) return;
    setActiveTab(newTab);
  }

  return (
    <section style={{ width: "100%" }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <Tab label="En cours" fullWidth className={styles.profil_moving_tab} />
        <Tab
          label="En attente"
          fullWidth
          className={styles.profil_moving_tab}
        />
        <Tab label="Terminée" fullWidth className={styles.profil_moving_tab} />
      </Tabs>
      <TabPanel value={activeTab} index={0}>
        <PreviousMovingEstimate estimateItem={previousEstimates[0]} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}></TabPanel>
      <TabPanel value={activeTab} index={2}></TabPanel>
    </section>
  );
};

const ProfilMovingComponent = () => {
  const [previousEstimates, setPreviousEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useCustomer();
  const router = useRouter();

  useEffect(() => {
    if (auth?.userId) {
      async function fetchEstimates() {
        const res = await API.get(
          `/Customers/${auth.userId}/Estimates`,
          {},
          { headers: { Authorization: auth.id } }
        );
        setLoading(false);
        if (!res?.ok) {
          return console.error("res is not ok : ", res);
        }
        setPreviousEstimates(res.data);
      }

      fetchEstimates();
    }
  }, [auth]);

  function redirectToEstimate() {
    router.push(Routes.ESTIMATE_DETAILS_PAGE);
  }

  console.log("previousEstimates : ", previousEstimates);

  return (
    <section className={styles.profil_moving_section_container}>
      {loading ? (
        <LoadingComponent />
      ) : previousEstimates?.length ? (
        <PreviousMovingComponent previousEstimates={previousEstimates} />
      ) : (
        <article className={styles.profil_moving_no_content}>
          <span>{messages.noContent}</span>
          <Button
            className={styles.profil_moving_go_to_estimate_button}
            onClick={redirectToEstimate}
          >
            {messages.action.goToEstimate}
          </Button>
        </article>
      )}
    </section>
  );
};

export default ProfilMovingComponent;
