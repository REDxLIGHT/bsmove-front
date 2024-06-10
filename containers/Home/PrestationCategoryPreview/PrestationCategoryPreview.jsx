import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Card from "@mui/material/Card";
import styles from "../index.module.css";
import { useAlert } from "../../../hooks/alert";
import { useRouter } from "next/router";
import CategoryPreview from "../CategoryPreview/CategoryPreview";
import { shape, string } from "prop-types";
import Link from "next/link";

const PrestationCategoryPreview = ({
  category: { src, title = "", href, button, desc } = {},
}) => {
  const [raised, setRaised] = useState(false);
  const router = useRouter();
  const { handleAlertComingSoon } = useAlert();

  function toggleRaised() {
    return setRaised((prevRaised) => !prevRaised);
  }

  function categoryOnClick() {
    if (href) {
      return router.push(href);
    }
    return handleAlertComingSoon();
  }

  return (
    <div className={styles.prestation_section_category_container}>
      <div className={styles.prestation}>
        <Card
          className={styles.prestation_section_category}
          onMouseOver={toggleRaised}
          onMouseOut={toggleRaised}
          raised={raised}
          onClick={categoryOnClick}
        >
          <div
            className={styles.prestation_section_category_thumbnail_container}
          >
            <CategoryPreview href={href} title={title} src={src} />
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "self-start",
            padding: "0 1rem",
          
          }}>
            <h4 style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginTop: "1rem",
            }}>{title}</h4>
            <p style={{
              fontSize: "1rem",
              marginTop: "1rem",
            }}>{desc}</p>
          </div>
          <Link href={href} className={styles.prestation_section_category_content}>
            <div>{button}</div>
            <ArrowForwardIcon />
          </Link>
        </Card>
      </div>
    </div>
  );
};

PrestationCategoryPreview.propTypes = {
  category: shape({
    src: string,
    title: string,
    href: string,
  }),
};

export default PrestationCategoryPreview;
