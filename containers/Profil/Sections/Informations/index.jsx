import React, { useState } from 'react';
import { pick } from 'ramda';

import { ALERT } from '../../../../helpers/constants';
import API from '../../../../helpers/api';
import Section from '../section';
import messages from './messages';
import { useLoading } from '../../../../hooks/loading';
import { useAlert } from '../../../../hooks/alert';
import { useCustomer } from '../../../../hooks/customer';
import { CoordinatesComponent, PasswordComponent } from './component';

const customerDetailsKeys = [
  'lastName',
  'firstName',
  'phoneNumber',
  'birthdate',
];

const customerEmailKeys = [
  'email',
]

const customerPasswordKeys = [
  'password',
  'oldPassword',
  'newPassword',
  'confirmPassword',
]

const customerDetailsConstants = [
  { label: messages.sections.labels.lastName, type: 'text' },
  { label: messages.sections.labels.firstName, type: 'text' },
  { label: messages.sections.labels.phoneNumber, type: 'tel' },
  { label: messages.sections.labels.birthDate, type: 'text' },
];

const customerEmailLabels = [
  { label: messages.sections.labels.email, type: 'email' }
];

const customerPasswordLabels = [
  { label: messages.sections.labels.password, noInput: true },
  { label: messages.sections.labels.oldPassword, type: 'password', noPreview: true },
  { label: messages.sections.labels.newPassword, type: 'password', noPreview: true },
  { label: messages.sections.labels.confirmPassword, type: 'password', noPreview: true },
];

const ProfileInformations = ({ customer }) => {
  const [isCustomerDetailsDialogOpen, setCustomerDetailsDialogOpen] = useState(false);
  const [isCustomerEmailDialogOpen, setCustomerEmailDialogOpen] = useState(false);
  const [isCustomerPasswordDialogOpen, setCustomerPasswordDialogOpen] = useState(false);
  const { setGlobalLoading } = useLoading();
  const { auth, setCustomer } = useCustomer();
  const { setAlert } = useAlert();

  const initialCustomerDetailsValues = {
      lastName: customer.lastName || '',
      firstName: customer.firstName || '',
      phoneNumber: customer.phoneNumber || '',
      birthDate: customer.birthdate || '',
      // birthDate: format(new Date(customer.birthDate), 'dd/MM/yyyy') || '',
    }

  function handleCustomerDetailsValidation(values) {
    const errors = {};
    if (!values.lastName) errors.lastName = messages.errors.required;
    if (!values.firstName) errors.firstName = messages.errors.required;
    if (!values.phoneNumber) errors.phoneNumber = messages.errors.required;
    if (!values.birthDate) errors.birthDate = messages.errors.required;
    return errors;
  }

  function handleCustomerEmailValidation(values) {
    const errors = {};
    if (!values.email) errors.email = messages.errors.required;
    return errors;
  }

  function handleCustomerPasswordValidation(values) {
    const errors = {};
    if (!values.oldPassword) errors.oldPassword = messages.errors.required;
    if (!values.newPassword) errors.newPassword = messages.errors.required;
    if (!values.confirmPassword) errors.confirmPassword = messages.errors.required;
    else if (values.newPassword !== values.confirmPassword) errors.confirmPassword = messages.errors.nonIdentical;
    return errors;
  }

  async function handleCustomerDetailsChange(values) {
    if (!values) return ;
    setGlobalLoading(true);
    const response = await API.patch(`/Customers/${auth.userId}`, values, { headers: { Authorization: auth.id } });
    setGlobalLoading(false);
    if (!response || !response.ok) {
      return setAlert({ severity: ALERT.ERROR, content: messages.alert.error.patchError });
    }
    setCustomer(response?.data);
    setCustomerDetailsDialogOpen(false);
    return setAlert({ severity: ALERT.SUCCESS, content: messages.alert.modification.success });
  }

  async function handleCustomerEmailChange(values) {
    if (!values) return ;
    setGlobalLoading(true);
    const response = await API.patch(`/Customers/${auth.userId}`, values, { headers: { Authorization: auth.id } });
    setGlobalLoading(false);
    if (!response || !response.ok) {
      return setAlert({ severity: ALERT.ERROR, content: messages.alert.error.patchError });
    }
    setCustomer(response?.data);
    setCustomerEmailDialogOpen(false);
    return setAlert({ severity: ALERT.SUCCESS, content: messages.alert.modification.success });
  }

  async function handleCustomerPasswordChange({ oldPassword, newPassword }) {
    if (!oldPassword || !newPassword) return ;
    setGlobalLoading(true);
    const response = await API.post(`/Customers/change-password`, { oldPassword, newPassword }, { headers: { Authorization: auth.id }});
    setGlobalLoading(false);
    if (!response || !response.ok) {
      if (response?.data?.error?.code === 'INVALID_PASSWORD') {
        return setAlert({ severity: ALERT.ERROR, content: messages.alert.error.oldPassword })
      }
      return setAlert({ severity: ALERT.ERROR, content: messages.alert.error.patchError });
    }
    setCustomerPasswordDialogOpen(false);
    return setAlert({ severity: ALERT.SUCCESS, content: messages.alert.modification.success });
  }

  function reduceInformations(keys, datas, constants) {
    const values = pick(keys, datas);
    const finalValues = Object.keys(values).map((key, index) => ({ key, value: values[key], ...constants[index] }));
    return finalValues;
  }

  // section should have content + button if needed, component in the same folder

  return (
    <>
      <Section
        sectionTitle={messages.sectionTitle.coordinates}
        component={CoordinatesComponent}
      />
      <Section
        sectionTitle={messages.sectionTitle.password}
        component={PasswordComponent}
      />
      {/* <Section
        contents={reduceInformations(customerPasswordKeys, { password: '*************', oldPassword: '', newPassword: '', confirmPassword: '' }, customerPasswordLabels)}
        isDialogOpen={isCustomerPasswordDialogOpen}
        handleDialog={() => setCustomerPasswordDialogOpen(prevState => !prevState)}
        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '', password: '' }}
        validate={handleCustomerPasswordValidation}
        handleSubmit={handleCustomerPasswordChange}
      /> */}
    </>
  )
};

export default ProfileInformations;
