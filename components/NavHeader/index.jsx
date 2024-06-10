import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { number } from "prop-types";
import { MenuItem, Step, StepLabel, Stepper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import clsx from "clsx";
import styled from "styled-components";
import { ChevronRight } from "@mui/icons-material";
import Link from "next/link";

import messages from "./messages";
import Logo from "../Logo";

import styles from "./index.module.css";
import Menu from "../Menu";
import Routes from "../../helpers/routes";
import { useGlobal } from "../../hooks/global";
import { useAlert } from "../../hooks/alert";

const categories = [
  { name: "estimate/details", label: "Déménagement" },
  { name: "location-vehicules", label: "Location camion", state: "vehicle" },
  { name: "location-vehicules", label: "Location monte-meuble", state: "lift" },
  { name: "achat-fournitures", label: "Achat matériel" },
];

const ServicesMenu = ({ label = "", handleOpen, open, anchorRef }) => {
  const router = useRouter();
  const { setAlert } = useAlert();

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  function handleCategoryClicked(category) {
    handleOpen();
    const route = `/${category.name}`;
    if (route !== Routes.VEHICLE_RENT_PAGE) {
      router.push(category ? route : "/");
    } else {
      router.push({
        pathname: category ? route : "/",
        query: { tab: category.state },
      });
    }
  }

  return (
    <nav>
      <span className={styles.menu_label_container}>
        <span className={styles.menu_label_span}>{label}</span>
        <ExpandMoreIcon
          ref={anchorRef}
          className={clsx(styles.menu_label_icon, {
            [styles.menu_label_icon_expanded]: open,
          })}
          aria-expanded={open}
          aria-label="Services"
        />
      </span>
      <Menu
        open={open}
        handleOpen={handleOpen}
        anchorRef={anchorRef}
        growExtraStyle={{
          transformOrigin: "left bottom",
          marginTop: "35px",
          maxWidth: "12rem",
          width: "12rem",
        }}
      >
        {categories &&
          categories.length &&
          categories.map((category) => (
            <MenuItem
              key={category?.name}
              className={styles.menu_item_container}
              onClick={() => handleCategoryClicked(category)}
            >
              <div className={styles.menu_item_label}>{category.label}</div>
              <ChevronRight />
            </MenuItem>
          ))}
      </Menu>
    </nav>
  );
};

const S = {};

S.Step = styled(Step)`
  color: red;
`;

S.Tabs = styled(Tabs)({
  textTransform: "capitalize",
  width: "100vw",
  fontSize: "1rem",
  backgroundColor: "#FFFFFF",
  color: "#000000",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  "& .MuiTabs-flexContainer": {
    justifyContent: "flex-end",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
});

const PrimaryNavHeader = ({ initialTab }) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialTab || 0);
  const { handleAlertComingSoon } = useAlert();

  const router = useRouter();

  function handleOpen(state) {
    if (state) return setOpen(state);
    return setOpen((prevState) => !prevState);
  }

  const handleChange = (event, newValue) => {
  if (newValue !== value) {
    setValue(newValue);
    if (newValue === 0) {
      router.push(Routes.FURNITURES_BUY_PAGE);
    } else if (newValue === 1) {
      router.push('/location-vehicules?tab=lift');
    } else if (newValue === 2) {
      router.push('/location-vehicules?tab=vehicle');
    } else if (newValue === 3) {
      router.push(Routes.CONTACT_PAGE);
    } else if (newValue === 4) {
      router.push(Routes.BLOG_PAGE);
    } else {
      handleAlertComingSoon();
    }
  }
};


  useEffect(() => {
    document
      .getElementById("service-menu_tab-indicator")
      ?.setAttribute("ref", anchorRef);
  }, [anchorRef]);

  useEffect(() => {
    if (value === 3) router.push(Routes.CONTACT_PAGE);
  }, [value]);

  return (
    <div className={styles.container}>
      <div className={styles.primary_logo_container}>
        <Logo />
      </div>
      <S.Tabs
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{
          id: value === 0 ? "service-menu_tab-indicator" : undefined,
        }}
      >
        {/* <Tab
          id="service-menu"
          onClick={handleOpen}
          label={
            <ServicesMenu
              open={open}
              handleOpen={handleOpen}
              anchorRef={anchorRef}
              label={messages.services}
            />
          }
          sx={{
            color: "#000000",
            fontWeight: 600,
            fontFamily: "proxima-nova",
            fontSize: "80%",
            minWidth: "8rem",
            "& Mui-Selected:": {
              color: "rgb(56, 199, 152)",
            },
          }}
        /> */}
        <Tab
          label={
            <Link href={Routes.FURNITURES_BUY_PAGE}>
              <span className={styles.menu_label_span}>{messages.achat}</span>
            </Link>
          }
        />
        <Tab
          label={
            <Link href='/location-vehicules?tab=lift'>
              <span className={styles.menu_label_span}>{messages.location_meuble}</span>
            </Link>
          }
        />
        <Tab
          label={
            <Link href='/location-vehicules?tab=vehicle'>
              <span className={styles.menu_label_span}>{messages.location_camion}</span>
            </Link>
          }
        />
        {/* Blog Button */}
        <Tab
          label={
            <Link href={Routes.BLOG_PAGE}>
              <span className={styles.menu_label_span}>{messages.blog}</span>
            </Link>
          }
        />
        <Tab
          label={
            <Link href={Routes.CONTACT_PAGE}>
              <span className={styles.button_contact}>{messages.contact}</span>
            </Link>
          }
        />
      </S.Tabs>
      <Link
        className={styles.button_container}
        href={Routes.ESTIMATE_DETAILS_PAGE}
      >
        <div className={styles.button_component}>{messages.estimate}</div>
      </Link>
    </div>
  );
};

const SecondaryNavHeader = ({ initialStep = 0, steps = [] }) => {
  const {
    global: { screenWidth },
  } = useGlobal();

  return (
    <div className={styles.secondary_nav_header_container}>
      <div className={styles.logo_container}>
        <Logo />
      </div>
      <div className={styles.secondary_nav_header_stepper}>
        <Stepper activeStep={initialStep} alternativeLabel={screenWidth <= 750}>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel
                classes={{ alternativeLabel: "alternative-label" }}
                StepIconProps={{
                  sx: {
                    color: "rgba(183, 186, 194, 1)",
                    fontSize: "1.2rem",
                    "& .MuiStepIcon-text": {
                      fill: "white",
                    },
                    "& .Mui-active:": {
                      color: "rgb(56, 199, 152)",
                    },
                    "& .Mui-disabled:": {
                      color: "rgba(183, 186, 194, 1)",
                    },
                    "& .Mui-completed:": {
                      color: "rgb(56, 199, 152)",
                    },
                  },
                }}
              >
                {step}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
};

function NavHeader({
  auth,
  initialTab,
  initialStep = 0,
  secondary = false,
  steps,
}) {
  return !secondary ? (
    <PrimaryNavHeader initialTab={initialTab} />
  ) : (
    <SecondaryNavHeader auth={auth} initialStep={initialStep} steps={steps} />
  );
}

NavHeader.propTypes = {
  initialTab: number,
};

export default NavHeader;
