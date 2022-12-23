import React from 'react';
import { useRouter } from 'next/router';

import { useLoading } from '../../hooks/loading';
import { useAlert } from '../../hooks/alert';

import Layout from '../../components/Layout';
import SigninContainer from '../../containers/SigninContainer';
import Component from '../../containers/ResetPassword';
import messages from '../../containers/ResetPassword/messages';

import { ALERT } from '../../helpers/constants';
import Routes from '../../helpers/routes';
import api from '../../helpers/api';
import { useCustomer } from '../../hooks/customer';
import { handlePageRedirect, parseCookies } from '../../helpers/functions';

const ResetPasswordPage = ({ cookies }) => {
  const router = useRouter();
  const { setGlobalLoading } = useLoading();
  const { setAlert } = useAlert();
  const { auth, setCustomer } = useCustomer();

  async function handleSubmit({ oldPassword, newPassword, confirmPassword }) {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return setAlert({ severity: ALERT.ERROR, content: messages.alert.error.missingValues });
    }
    if (newPassword !== confirmPassword) {
      return setAlert({ severity: ALERT.ERROR, content: messages.alert.error.confirmPassword });
    }
    setGlobalLoading(true);
    const response = await api.post('/Customers/change-password', { oldPassword, newPassword }, { headers: { Authorization: auth.id } });
    setGlobalLoading(false);
    if (!response || !response.ok) {
      return setAlert({ severity: ALERT.ERROR, content: messages.alert.error.confirmPassword });
    }
    setCustomer(prevCustomer => ({ ...prevCustomer, passwordReset: false }));
    setAlert({ severity: ALERT.SUCCESS, content: messages.alert.success });
    return router.push(Routes.HOME_PAGE);
  }

  return (
    <Layout cookies={cookies} withoutHeader title='Changement de mot de passe' pageId='reset-password' display="flex">
      <SigninContainer page='reset-password'>
        <Component handleSubmit={handleSubmit} />
      </SigninContainer>
    </Layout>
  )
}

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'private', Routes.RESET_PASSWORD_PAGE);
}

export default ResetPasswordPage;
