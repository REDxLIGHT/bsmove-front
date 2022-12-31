import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router';
import { number } from 'prop-types';
import { MenuItem, Step, StepLabel, Stepper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import clsx from 'clsx';
import styled from 'styled-components';
import { ChevronRight } from '@mui/icons-material';

import messages from './messages';
import Logo from '../Logo';

import styles from './index.module.css';
import Menu from '../Menu';
import Routes from '../../helpers/routes';
import { useGlobal } from '../../hooks/global';
import {useAlert} from "../../hooks/alert";

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

const S = {};

S.Step = styled(Step)`
  color: red;
`

S.Tabs = styled(Tabs)({
  textTransform: 'capitalize',
  width: '100vw',
  fontSize: '1rem',
  backgroundColor: '#FFFFFF',
  color: '#000000',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  '& .MuiTabs-flexContainer': {
    justifyContent: 'flex-end',
  },
  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent',
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
      <S.Tabs
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{
          id: value === 0 ? 'service-menu_tab-indicator' : undefined,
        }}
      >
        <Tab id='service-menu' onClick={handleOpen} label={<ServicesMenu open={open} handleOpen={handleOpen} anchorRef={anchorRef} label={messages.services} />}
             sx={{
                 color: '#000000',
                 fontWeight: 600,
                 fontFamily: 'proxima-nova',
                 fontSize: '80%',
                 minWidth: '8rem',
                 '& Mui-Selected:': {
                     color: 'rgb(56, 199, 152)',
                 },
             }}
        />
        <Tab label={<div className={styles.menu_label_span}>{messages.advises}</div>}
             sx={{
                color: '#000000',
                fontWeight: 600,
                fontFamily: 'proxima-nova',
                fontSize: '80%',
                minWidth: '8rem',
                 '& Mui-Selected:': {
                  color: 'rgb(56, 199, 152)',
                },
             }}/>
        <Tab label={<div className={styles.menu_label_span}>{messages.news}</div>}
             sx={{
                color: '#000000',
                fontWeight: 600,
                fontFamily: 'proxima-nova',
                fontSize: '80%',
                minWidth: '8rem',
                '& Mui-Selected:': {
                  color: 'rgb(56, 199, 152)',
                },
             }}/>
        <Tab label={<div className={styles.menu_label_span}>{messages.contact}</div>}
             sx={{
                color: '#000000',
                fontWeight: 600,
                fontFamily: 'proxima-nova',
                fontSize: '80%',
                minWidth: '8rem',
               '& Mui-Selected:': {
                  color: 'rgb(56, 199, 152)',
                },
             }}/>
      </S.Tabs>
      <div className={styles.button_container}>
        <div onClick={() => router.push(Routes.ESTIMATE_DETAILS_PAGE)} className={styles.button_component}>{messages.estimate}</div>
      </div>
    </div>
  );
};

const SecondaryNavHeader = ({ initialStep = 0, steps = [] }) => {
  // const classes = useStepperStyles();
  const { global: { screenWidth } } = useGlobal();

  return (
    <div className={styles.secondary_nav_header_container}>
      <div className={styles.logo_container}>
        <Logo />
      </div>
      <div className={styles.secondary_nav_header_stepper}>
        <Stepper activeStep={initialStep} alternativeLabel={screenWidth <= 750 }>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel
                  classes={{ alternativeLabel: 'alternative-label' }}
                  StepIconProps={{ sx: {
                      color: 'rgba(183, 186, 194, 1)',
                      fontSize: '1.2rem',
                      '& .Mui-active:': {
                          color: 'rgb(56, 199, 152)',
                      },
                      '& .Mui-disabled:': {
                          color: 'rgba(183, 186, 194, 1)',
                      },
                      '& .Mui-completed:': {
                          color: 'rgb(56, 199, 152)',
                      },
                  } }}
              >
                {step}
              </StepLabel>
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
}

NavHeader.propTypes = {
  initialTab: number,
}

export default NavHeader;
