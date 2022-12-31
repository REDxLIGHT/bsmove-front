import React from 'react';
import { node, string } from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';

import Routes from '../../helpers/routes.js';
import Logo from '../../components/Logo';

import styles from './index.module.css';
import messages from './messages';
import { Subtitle } from '../../components/Texts/index.jsx';

const S = {};

S.LinkContent = styled.span`
  color: ${props => props.theme.colors.mainGreen};
  text-decoration: underline;
  cursor: pointer;
`;

S.Content = styled.span`
  color: ${props => props.theme.colors.disabledGrey};
  margin-right: 0.250rem;
`;

const routesHref = {
  login: Routes.LOGIN_PAGE,
  register: Routes.REGISTER_PAGE,
}

function getSigninPage(page = 'login') {
  switch (page) {
    case 'login':
      return Routes.LOGIN_PAGE;
    case 'register':
      return Routes.REGISTER_PAGE;
    case 'login-admin':
      return Routes.DASHBOARD_LOGIN_PAGE;
  }
}

const SigninContainer = ({ children, page = 'login' }) => {
  return (
    <div className={styles.container}>
      <Slide timeout={500} in={true} direction="left" mountOnEnter>
        <Paper elevation={4} className={styles.paper}>
          <div className={styles.logo_container}>
            <Logo /> 
          </div>
          <div className={styles.title_container}>
            <Subtitle className={styles.title}>{messages[page].title}</Subtitle>
          </div>
          {children}
        </Paper>
      </Slide>
      {page === 'login-admin' ? null : (
          <div className={styles.redirecting}>
            <S.Content>{messages[page].redirect.content}</S.Content>
            <Link href={page === 'login' ? Routes.REGISTER_PAGE : Routes.LOGIN_PAGE}>
              <S.LinkContent>{messages[page].redirect.link}</S.LinkContent>
            </Link>
          </div>
      )}
    </div>
  )
};

SigninContainer.propTypes = {
  children: node.isRequired,
  page: string.isRequired,
}

export default SigninContainer;
