import React from 'react'
import Image from "next/legacy/image";
import { useRouter } from 'next/router';

import styles from './index.module.css';
import Routes from '../../helpers/routes';

export default function Logo() {
  const router = useRouter()
  return (
      <Image
        quality={100}
        priority={true}
        className={styles.logo}
        layout="fill"
        src="/images/logo.png"
        alt="bsmove_logo"
        onClick={() => router.push(Routes.HOME_PAGE)}
      />
  )
}
