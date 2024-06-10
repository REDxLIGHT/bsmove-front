import React, { useState } from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/router";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import { ExpandLess } from "@mui/icons-material";
import ExpandMore from "@mui/icons-material/ExpandMore";

import messages from "./messages";
import styles from "./index.module.css";
import { useCustomer } from "../../hooks/customer";
import { redirectNotLogged } from "../../helpers/functions";
import Routes from "../../helpers/routes";
import { useBasket } from "../../hooks/basket";
import Badge from "../Badge";
import Logo from "../Logo";
import Link from "next/link";
import { useGlobal } from "../../hooks/global";
import { useAlert } from "../../hooks/alert";

const S = {};

S.LeftHeader = styled.p`
  font-size: 16px;
  font-family: 'Satoshi', sans-serif;
  font-weight: 400;
  padding: 0 1rem;
  text-decoration-line: underline;
  line-height: 24px;
`;

S.RightHeader = styled.div`
  display: flex;
  line-height: 1.5em;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  font-size: 1rem;
  font-family: 'Satoshi', sans-serif;
  font-weight: 600;
  width: 6.5rem;
  height: 48px;
`;

S.IconButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.lightGrey};
`;

S.Divider = styled(Divider)`
  background-color: ${({ theme }) => theme.colors.grey};
`;

const DesktopHeader = ({ basket, handleCartButton, handleProfilButton }) => {
  return (
    <>
      <S.LeftHeader>
        {messages.help}
        <a
          style={{ color: "rgb(249,250,251)" }}
          href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE_NUMBER}`}
        >
          {process.env.NEXT_PUBLIC_CONTACT_PHONE_NUMBER}
        </a>
      </S.LeftHeader>
      <S.RightHeader>
        <IconButton
          className={styles.header_icon}
          id="header-profil-icon-button"
          onClick={handleProfilButton}
          size="large"
        >
          <PersonOutlineIcon />
        </IconButton>
        <IconButton
          className={styles.header_icon}
          id="header-cart-icon-button"
          onClick={handleCartButton}
          size="large"
        >
          <Badge count={basket?.totalItems || undefined}>
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </S.RightHeader>
    </>
  );
};

const MobileHeader = ({ basket, handleCartButton, handleProfilButton }) => {
  const router = useRouter();
  const { setAlert } = useAlert();
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  function handleMenuOpen() {
    return setMenuOpen((prevState) => !prevState);
  }

  function handleSubmenuOpen() {
    return setSubmenuOpen((prevState) => !prevState);
  }

  function handleUnavailableRoute() {
    return setAlert({
      severity: "info",
      content: "Cette page sera bientôt disponible",
    });
  }

  function handleRedirection(route) {
    handleMenuOpen();
    return router.push(route);
  }

  return (
    <>
      <div className={styles.header_mobile_container}>
        <IconButton
          className={styles.header_icon}
          id="header-menu-icon-button"
          onClick={handleMenuOpen}
          size="large"
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <div className={styles.header_mobile_logo_container}>
          <div className={styles.header_mobile_logo_component}>
            <Logo />
          </div>
        </div>
        <S.RightHeader>
          <IconButton
            className={styles.header_icon}
            id="header-profil-icon-button"
            onClick={handleProfilButton}
            size="large"
          >
            <PersonOutlineIcon fontSize="small" />
          </IconButton>
          <IconButton
            className={styles.header_icon}
            id="header-cart-icon-button"
            onClick={handleCartButton}
            size="large"
          >
            <Badge count={basket?.totalItems || undefined}>
              <ShoppingCartOutlinedIcon fontSize="small" />
            </Badge>
          </IconButton>
        </S.RightHeader>
      </div>
      <SwipeableDrawer
        classes={{ paper: styles.header_mobile_menu_container }}
        anchor="left"
        open={menuOpen}
        onClose={handleMenuOpen}
      >
        <div>
          <List>
            {/* <ListItem button onClick={handleSubmenuOpen}>
              <ListItemText
                className={styles.header_drawer_category_label}
                primary={messages.mobile.categories.services.title}
              />
              <ListItemIcon>
                {submenuOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
            </ListItem> */}
            {/* <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
              <List
                disablePadding
                className={styles.header_drawer_submenu_container}
              >
                <ListItem>
                  <ListItemText
                    onClick={() =>
                      handleRedirection({
                        pathname: Routes.ESTIMATE_DETAILS_PAGE,
                      })
                    }
                    className={styles.header_drawer_category_label}
                    primary={
                      messages.mobile.categories.services.subCategories.moving
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    onClick={() =>
                      handleRedirection({
                        pathname: Routes.VEHICLE_RENT_PAGE,
                        query: { tab: "vehicle" },
                      })
                    }
                    className={styles.header_drawer_category_label}
                    primary={
                      messages.mobile.categories.services.subCategories
                        .rentVehicles
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    onClick={() =>
                      handleRedirection({
                        pathname: Routes.VEHICLE_RENT_PAGE,
                        query: { tab: "lift" },
                      })
                    }
                    className={styles.header_drawer_category_label}
                    primary={
                      messages.mobile.categories.services.subCategories.rentLift
                    }
                  />
                </ListItem>
                <ListItem>
                  <Link href={Routes.FURNITURES_BUY_PAGE}>
                    <ListItemText
                      onClick={() =>
                        handleRedirection(Routes.FURNITURES_BUY_PAGE)
                      }
                      className={styles.header_drawer_category_label}
                      primary={
                        messages.mobile.categories.services.subCategories
                          .buyFurnitures
                      }
                    />
                  </Link>
                </ListItem>
              </List>
            </Collapse> */}
            <ListItem>
              <ListItemText
                onClick={() => handleRedirection(Routes.ESTIMATE_DETAILS_PAGE)}
                className={styles.d}
                primary={messages.mobile.categories.services.subCategories.moving}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                onClick={() => handleRedirection('/location-vehicules?tab=vehicle')}
                className={styles.header_drawer_category_label}
                primary={messages.mobile.categories.services.subCategories.rentVehicles}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                onClick={() => handleRedirection('/location-vehicules?tab=lift')}
                className={styles.header_drawer_category_label}
                primary={messages.mobile.categories.services.subCategories.rentLift}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                onClick={() => handleRedirection(Routes.FURNITURES_BUY_PAGE)}
                className={styles.header_drawer_category_label}
                primary={messages.mobile.categories.services.subCategories.buyFurnitures}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                onClick={() => handleRedirection(Routes.CONTACT_PAGE)}
                className={styles.header_drawer_category_label}
                primary={messages.mobile.categories.contact}
              />
            </ListItem>
            {/* adding blog button */}
            <ListItem>
              <ListItemText
                onClick={() => handleRedirection(Routes.BLOG_PAGE)}
                className={styles.header_drawer_category_label}
                primary={messages.mobile.categories.blog}
              />
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    </>
  );
};

function Header() {
  const router = useRouter();
  const { auth } = useCustomer();
  const {
    global: { screenWidth },
  } = useGlobal();
  const { basket } = useBasket();

  function handleProfilButton() {
    router.push(Routes.PROFIL_PAGE);
    // return redirectNotLogged(auth, router, Routes.PROFIL_PAGE);
  }

  function handleCartButton() {
    router.push(Routes.BASKET_PAGE);
    // return redirectNotLogged(auth, router, Routes.BASKET_PAGE);
  }

  return (
    <header className={styles.header_container}>
      {screenWidth >= 750 ? (
        <DesktopHeader
          basket={basket}
          handleCartButton={handleCartButton}
          handleProfilButton={handleProfilButton}
        />
      ) : (
        <MobileHeader
          basket={basket}
          handleCartButton={handleCartButton}
          handleProfilButton={handleProfilButton}
        />
      )}
    </header>
  );
}

export default Header;
