import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useCustomer } from '../../hooks/customer';
import { useAlert } from '../../hooks/alert';

import Routes from '../../helpers/routes';
import { isObjectEmpty } from '../../helpers/functions';
import { ALERT } from '../../helpers/constants';
import messages from './messages';

const PrivateRoute = ({ Component, ...rest }) => {
  const { auth = {} } = useCustomer();
  const { setAlert } = useAlert();
  const router = useRouter();

  useEffect(() => {
    if (auth !== undefined) {
      if (auth?.id || auth?.userId) {
        router.push(Routes.HOME_PAGE);
        setAlert({ severity: ALERT.ERROR, content: messages.pageAccess })
        return <></>;
      }
    }
  }, [auth]);

  return isObjectEmpty(auth) ? (
    <Component {...rest} />
  ) : null;
}

export default PrivateRoute;
