import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

import styles from './index.module.css';
import Routes from '../../helpers/routes';

export default function Logo() {
  return (
    <Link href={Routes.HOME_PAGE}>
      <Image
        quality={100}
        className={styles.logo}
        layout="fill"
        src="/images/logo.png"
        alt="bsmove_logo"
      />
    </Link>
  )
}
