import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useCustomer } from '../../hooks/customer';
import { useAlert } from '../../hooks/alert';

import Routes from '../../helpers/routes';
import { isObjectEmpty } from '../../helpers/functions';
import { ALERT } from '../../helpers/constants';
import messages from './messages';

const PrivateRoute = ({ cookies, Component, ...rest }) => {
  const { auth } = useCustomer();
  const { setAlert } = useAlert();
  const router = useRouter();

  useEffect(() => {
    if (auth !== undefined && cookies !== undefined) {
      async function checkPrivateRedirect() {
        const authCookie = await JSON.parse(cookies.auth);
        if ((!auth?.id || !auth?.userId) && isObjectEmpty(authCookie)) {
          router.push(Routes.LOGIN_PAGE);
          setAlert({ severity: ALERT.ERROR, content: messages.pageAccess })
          return <></>;
        }
      }
      checkPrivateRedirect();
    }
  }, [auth, cookies]);

  return !isObjectEmpty(auth) ? (
    <Component {...rest} />
  ) : <></>;
}

export default PrivateRoute;
