import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router';
import { number } from 'prop-types';
import { makeStyles, MenuItem, Step, StepLabel, Stepper } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import clsx from 'clsx';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styled from 'styled-components';
import { ChevronRight } from '@material-ui/icons';

import messages from './messages';
import Logo from '../Logo';

import styles from './index.module.css';
import Menu from '../Menu';
import Routes from '../../helpers/routes';
import { useGlobal } from '../../hooks/global';
import {useAlert} from "../../hooks/alert";

const S = {};

S.Step = styled(Step)`
  color: red;
`

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    textTransform: 'capitalize',
    width: '100vw',
    fontSize: '1rem',
    backgroundColor: theme.colors.white,
    color: theme.colors.dark,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  flexContainer: {
    justifyContent: 'flex-end',
  },
  indicator: {
    backgroundColor: props => (!props.noUnderline ? theme.colors.mainGreen : 'transparent'),
  },
}));

const useStepperStyles = makeStyles(theme => ({
  root: {
    color: 'rgba(183, 186, 194, 1)',
    fontSize: '1.2rem',
    "&$active": {
      color: theme.colors.mainGreen,
    },
    "&$completed": {
      color: theme.colors.mainGreen,
    },
    "&$disabled": {
      color: 'rgba(183, 186, 194, 1)',
    }
  },
  disabled: {},
  completed: {},
  active: {},
  alternativeLabel: {
    margin: '0 !important',
    fontSize: '100%',
  },
}));

const useStepperClasses = makeStyles(theme => ({
  root: {
    padding: '0px !important',
  }
}))

const useTabStyles = makeStyles(theme => ({
  root: {
    color: theme.colors.dark,
    fontWeight: 600,
    fontFamily: 'proxima-nova',
    fontSize: '80%',
    minWidth: '8rem'
  },
  selected: {
    color: theme.colors.mainGreen,
  },
}));

const categories = [
  { name: 'estimate/details', label: 'Déménagement' },
  { name: 'vehicle-rent', label: 'Location véhicules' },
  { name: 'furnitures-buy', label: 'Achat matériel' },
  { name: 'warehouse', label: 'Garde meuble' },
]

const ServicesMenu = ({ label = '', handleOpen, open, anchorRef }) => {
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
    const route = `/${category}`;
    if (route !== Routes.FURNITURES_BUY_PAGE && route !== Routes.ESTIMATE_DETAILS_PAGE) {
      return setAlert({
        severity: 'info',
        content: 'Cette page est en cours de construction, elle sera bientôt disponible',
      });
    }
    router.push(category ? route : '/');
  }

  return (
    <>
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
        growExtraStyle={{ transformOrigin: 'left bottom', marginTop: '35px', maxWidth: '12rem', width: '12rem' }}
      >
        {
          categories && categories.length && categories.map((category) => (
              <MenuItem key={category?.name} className={styles.menu_item_container} onClick={() => handleCategoryClicked(category.name)}>
                <div className={styles.menu_item_label}>
                  {category.label}
                </div>
                <ChevronRight />
              </MenuItem>
          ))
        }
      </Menu>
    </>
  )
}

const PrimaryNavHeader = ({ initialTab }) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const classes = useStyles({ noUnderline: true });
  const tabClasses = useTabStyles();
  const [value, setValue] = useState(initialTab || 0);
  const { handleAlertComingSoon } = useAlert();

  const router = useRouter();

  function handleOpen(state) {
    if (state) return setOpen(state);
    return setOpen(prevState => !prevState);
  }

  const handleChange = (event, newValue) => {
    if (!newValue) return ;
    if (newValue === 3) {
      return setValue(newValue);
    }
    return handleAlertComingSoon();
  };


  useEffect(() => {
    document.getElementById('service-menu_tab-indicator')?.setAttribute('ref', anchorRef);
  }, [anchorRef]);

  useEffect(() => {
    if (value === 3) router.push(Routes.CONTACT_PAGE)
  }, [value])

  return (
    <div className={styles.container}>
      <div className={styles.primary_logo_container}>
        <Logo />
      </div>
      <Tabs
        value={value}
        onChange={handleChange}
        classes={classes}
        TabIndicatorProps={{
          id: value === 0 ? 'service-menu_tab-indicator' : undefined,
        }}
      >
        <Tab id='service-menu' onClick={handleOpen} label={<ServicesMenu open={open} handleOpen={handleOpen} anchorRef={anchorRef} label={messages.services} />} classes={tabClasses} />
        <Tab label={<div className={styles.menu_label_span}>{messages.advises}</div>} classes={tabClasses}/>
        <Tab label={<div className={styles.menu_label_span}>{messages.news}</div>} classes={tabClasses}/>
        <Tab label={<div className={styles.menu_label_span}>{messages.contact}</div>} classes={tabClasses}/>
      </Tabs>
      <div className={styles.button_container}>
        <div onClick={() => router.push(Routes.ESTIMATE_DETAILS_PAGE)} className={styles.button_component}>{messages.estimate}</div>
      </div>
    </div>
  );
};

const SecondaryNavHeader = ({ initialStep = 0, steps = [] }) => {
  const classes = useStepperStyles();
  const stepperClasses = useStepperClasses();
  const { global: { screenWidth } } = useGlobal();

  return (
    <div className={styles.secondary_nav_header_container}>
      <div className={styles.logo_container}>
        <Logo />
      </div>
      <div className={styles.secondary_nav_header_stepper}>
        <Stepper className={stepperClasses.root} activeStep={initialStep} alternativeLabel={screenWidth <= 750 }>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel classes={{ alternativeLabel: classes.alternativeLabel }} StepIconProps={{ classes }}>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  )
}

function NavHeader({ auth, initialTab, initialStep = 0, secondary = false, steps }) {
  return (
    !secondary
      ? <PrimaryNavHeader initialTab={initialTab} />
      : <SecondaryNavHeader auth={auth} initialStep={initialStep} steps={steps} />
  )
};

NavHeader.propTypes = {
  initialTab: number,
}

export default NavHeader;
