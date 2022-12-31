import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Fade from '@mui/material/Fade';

import Header from '../Header';
import LoadingComponent from '../LoadingComponent';
import styles from './index.module.css';
import { CookiesProvider } from '../../hooks/cookies';

const S = {};

S.ChildContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-width: 100vw;
  overflow: hidden;
  display: ${({ display }) => display};
`;

export default function Layout({
  title = 'BS Move', pageId = 'bsmove', withoutHeader = false,
  children, loading, display = 'inherit', cookies = {},
}) {
  return (
    <CookiesProvider cookies={cookies}>
      <Fade in={true} timeout={500}>
        <div id={`${pageId}-page`} className={styles.container}>
          {loading
          ? <LoadingComponent />
          : (
            <S.ChildContainer display={display}>
              <Head>
                <title>{title}</title>
              </Head>
              {!withoutHeader && <Header />}
              {children}
            </S.ChildContainer>
          )}
        </div>
      </Fade>
    </CookiesProvider>
  )
};