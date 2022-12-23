import React from 'react';
import { useRouter } from 'next/router';

import { useLoading } from '../../hooks/loading';
import { useAlert } from '../../hooks/alert';

import Layout from '../../components/Layout';
import SigninContainer from '../../containers/SigninContainer';
import Component from '../../containers/ForgotPassword';
import messages from '../../containers/ForgotPassword/messages';

import { ALERT } from '../../helpers/constants';
import Routes from '../../helpers/routes';
import api from '../../helpers/api';
import { handlePageRedirect, parseCookies } from '../../helpers/functions';

const errorMap = new Map();
errorMap.set(404, messages.alert.error.notExisting);
errorMap.set(401, messages.alert.error.notVerified);
errorMap.set('technical', messages.alert.error.technicalError);

const ForgotPasswordPage = ({ cookies }) => {
  const router = useRouter();
  const { setGlobalLoading } = useLoading();
  const { setAlert } = useAlert();

  async function handleSubmit({ email }) {
    if (!email) {
      return setAlert({ severity: ALERT.ERROR, content: messages.alert.error.missingValues });
    }
    setGlobalLoading(true);
    const response = await api.post('/Customers/generateNewPassword', { email });
    setGlobalLoading(false);
    if (!response || !response.ok) {
      if (response?.status === 404 || response?.status === 401) {
        return setAlert({ severity: ALERT.ERROR, content: errorMap.get(response.status) })
      }
      return setAlert({ severity: ALERT.ERROR, content: errorMap.get('technical')});
    }
    setAlert({ severity: ALERT.SUCCESS, content: messages.alert.success });
    return router.push(Routes.LOGIN_PAGE);
  }

  return (
    <Layout cookies={cookies} withoutHeader title='Mot de passe oublié' pageId='forgot-password' display="flex">
      <SigninContainer page='forgot-password'>
        <Component
          handleSubmit={handleSubmit}
        />
      </SigninContainer>
    </Layout>
  )
}

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'public');
}

export default ForgotPasswordPage;
