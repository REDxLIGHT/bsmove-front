import Image from "next/legacy/image";
import Button from "../../../components/Button";
import { useGlobal } from "../../../hooks/global";
import { useRouter } from "next/router";
import styles from "../index.module.css";
import messages from "../messages";
import Routes from "../../../helpers/routes";
import { any } from "prop-types";
import { colors } from "@mui/material";

const HomeEstimateSection = ({ technicalIssueAlert }) => {
  const {
    global: { screenWidth },
  } = useGlobal();
  const router = useRouter();
  return (
    <div className={styles.estimate_section}>
      <div className={styles.home_estimate_section_left}>
        <h2 className={styles.section_title}>
          {messages.estimateSection.title}
        </h2>
        <h1 className={styles.estimate_section_main_content}>
          {messages.estimateSection.content.main}
        </h1>
        <div className={styles.estimate_section_secondary_content}>
          {messages.estimateSection.content.secondary}
        </div>
        <div className={styles.estimate_section_actions_container}>
          <Button
            onClick={() => router.push(Routes.ESTIMATE_DETAILS_PAGE)}
            margin="0 4px 0 0"
          >
            {messages.estimateSection.actions.leftButton}
          </Button>
          <button
            onClick={() => router.push(Routes.CONTACT_PAGE)}
            className={styles.estimate_section_actions_right_button}
          >
            {messages.estimateSection.actions.rightButton}
          </button>
        </div>
      </div>
      <div className={styles.home_estimate_section_right}>
        <div className={styles.home_estimate_section_right_img_container}>
          <Image
            className={styles.home_estimage_section_right_img_illustration}
            layout="fill"
            src="/images/image1.jpeg"
            alt="homepage_section_estimate"
          />
          <div className={styles.stats_container}>
            <div className={styles.stats}>
              <h3>+15 ans</h3>
              <p>années d’expériences</p>
            </div>
            <div className={styles.stats}>
              <h3>+3,000</h3>
              <p>client satisfaits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HomeEstimateSection.propTypes = {
  technicalIssueAlert: any,
};

export default HomeEstimateSection;
