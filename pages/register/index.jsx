import React from 'react';
import { useRouter } from 'next/router';

import { useLoading } from '../../hooks/loading';
import { useAlert } from '../../hooks/alert';

import API from '../../helpers/api';
import Layout from '../../components/Layout';
import SigninContainer from '../../containers/SigninContainer';
import messages from '../../containers/Register/messages';
import Component from '../../containers/Register';
import { ALERT } from '../../helpers/constants';
import Routes from '../../helpers/routes';
import { handlePageRedirect, isObjectEmpty, parseCookies } from '../../helpers/functions';

const RegisterPage = ({ cookies }) => {
  const router = useRouter();
  const { setGlobalLoading } = useLoading();
  const { setAlert } = useAlert();

  async function handleSubmit({
    email, lastName, firstName, password, phoneNumber,
    gender, address, cgu,
  }) {
    if (!email || !lastName || !firstName || !password || !phoneNumber || !gender || isObjectEmpty(address) || !cgu) {
      return setAlert({ severity: ALERT.ERROR, content: messages.alert.error.missingValues });
    }
    setGlobalLoading(true);
    const response = await API.post('/Customers', {
      email,
      lastName,
      firstName,
      password,
      phoneNumber,
      civility: gender === 'female' ? 1 : 0,
      address: {
        ...address,
        firstName,
        lastName,
      },
      birthdate: "2021-08-03T15:30:51.416Z",
    });
    setGlobalLoading(false);
    if (response && response.ok) {
      setAlert({ severity: ALERT.SUCCESS, content: messages.alert.success });
      return router.push(Routes.LOGIN_PAGE);
    }
    setAlert({ severity: ALERT.ERROR, content: messages.alert.error.technicalError })
  }

  return (
    <Layout cookies={cookies} withoutHeader title='Inscription' pageId='register' display="flex">
      <SigninContainer page='register'>
        <Component
          handleSubmit={handleSubmit}
        />
      </SigninContainer>
    </Layout>
  );
}

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'public');
}

export default RegisterPage;
