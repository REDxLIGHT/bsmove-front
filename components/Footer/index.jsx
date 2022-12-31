import React from 'react';
import LockIcon from '@mui/icons-material/Lock';
import Image from "next/legacy/image";
import { Divider } from '@mui/material';
import { string } from 'prop-types';

import messages from './messages';
import styles from './index.module.css';
import Logo from '../Logo';

const MainFooter = () => {
  return (
    <div className={styles.main_footer_container}>
      {/* <div className={styles.main_footer_left}>
      </div> */}
      <div className={styles.main_footer_right}>
        <div className={styles.main_footer_blocks}>
          <div className={styles.logo_block}>
            <Logo />
          </div>
        </div>
        <div className={styles.main_footer_blocks}>
          <div className={styles.main_footer_blocks_title}>{messages.mainFooter.contactsBlock.title}</div>
          <div className={styles.main_footer_blocks_content}>{process.env.NEXT_PUBLIC_CONTACT_PHONE_NUMBER}</div>
          <div className={styles.main_footer_blocks_content}>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</div>
        </div>
        <div className={styles.main_footer_blocks}>
          <div className={styles.main_footer_blocks_title}>{messages.mainFooter.servicesBlock.title}</div>
          <div className={styles.main_footer_blocks_content}>{messages.mainFooter.servicesBlock.moving}</div>
          <div className={styles.main_footer_blocks_content}>{messages.mainFooter.servicesBlock.vehicleRent}</div>
          <div className={styles.main_footer_blocks_content}>{messages.mainFooter.servicesBlock.furnituresBuy}</div>
          <div className={styles.main_footer_blocks_content}>{messages.mainFooter.servicesBlock.furnituresGuard}</div>
        </div>
        <div className={styles.main_footer_blocks}>
          <div className={styles.main_footer_blocks_title}>{messages.mainFooter.legalsBlock.title}</div>
          <div className={styles.main_footer_blocks_content}>{messages.mainFooter.legalsBlock.cgv}</div>
          <div className={styles.main_footer_blocks_content}>{messages.mainFooter.legalsBlock.cgu}</div>
          <div className={styles.main_footer_blocks_content}>{messages.mainFooter.legalsBlock.confidentialPolitics}</div>
        </div>
      </div>
    </div>
  );
}

const ShopFooter = () => {
  return (
    <div>Shop footer</div>
  )
}

const SecondaryFooter = () => (
  <div className={styles.secondary_footer_container}>
    <div className={styles.secondary_footer_left}>
      {messages.copyright}
    </div>
    <div className={styles.secondary_footer_right}>
      <div className={styles.secondary_footer_logo_container}>
        <Image
          quality={100}
          className={styles.secondary_footer_logo_illustration}
          layout="fill"
          src='/images/logo_mastercard.png'
          alt='footer_logo_mastercard'
        />
      </div>
      <div className={styles.secondary_footer_logo_container}>
        <div className={styles.secondary_footer_logo_illustration}>
          <Image
            quality={100}
            className={styles.secondary_footer_logo_illustration}
            layout="fill"
            src='/images/logo_visa.png'
            alt='footer_logo_visa'
          />
        </div>
      </div>
      <div className={styles.secondary_footer_logo_container}>
        <div className={styles.secondary_footer_logo_illustration}>
          <Image
            quality={100}
            className={styles.secondary_footer_logo_illustration}
            layout="fill"
            src='/images/logo_paypal.png'
            alt='footer_logo_paypal'
          />
        </div>
      </div>
    </div>
  </div>
);

// Footer type can be main or shop

const Footer = ({ type = 'main' }) => {
  return (
    <div className={styles.footer_container}>
      {type === 'main' ? <MainFooter /> : <ShopFooter />}
      <SecondaryFooter />
    </div>
  )
}

Footer.propTypes = {
  type: string,
}

export default Footer;
