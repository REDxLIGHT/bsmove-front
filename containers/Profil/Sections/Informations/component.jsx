import React, { useState, useEffect } from 'react';
import { isObject, useFormik } from 'formik';

import Input from '../../../../components/Input';

import messages from './messages';
import styles from './index.module.css';
import { useCustomer } from '../../../../hooks/customer';
import { useLoading } from '../../../../hooks/loading';
import { useAlert } from '../../../../hooks/alert';
import { isObjectEmpty } from '../../../../helpers/functions';
import API from '../../../../helpers/api';
import Button from '../../../../components/Button';
import { ALERT } from '../../../../helpers/constants';

export const CoordinatesComponent = () => {
  const { auth, customer, setCustomer } = useCustomer();
  const { setGlobalLoading } = useLoading();
  const { setAlert } = useAlert();
  const [initialValues, setInitialValues] = useState({
    lastName: customer?.lastName || '',
    firstName: customer?.firstName || '',
    email: customer?.email || '',
    phoneNumber: customer?.phoneNumber || '',  
  })

  useEffect(() => {
    if (!isObjectEmpty(customer)) {
      setInitialValues({
        lastName: customer?.lastName || '',
        firstName: customer?.firstName || '',
        email: customer?.email || '',
        phoneNumber: customer?.phoneNumber || '',
      })
    }
  }, [customer]);

  async function handleSubmit(values) {
    if (!values) return ;
    setGlobalLoading(true);
    const response = await API.patch(`/Customers/${auth.userId}`, values, { headers: { Authorization: auth.id } });
    setGlobalLoading(false);
    if (!response || !response.ok) {
      return setAlert({ severity: ALERT.ERROR, content: messages.alert.error.patchError });
    }
    setCustomer(response?.data);
    return setAlert({ severity: ALERT.SUCCESS, content: messages.alert.modification.success });
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validate: () => {},
    onSubmit: values => handleSubmit(values),
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.profil_informations_container}>
        <Input
          label={messages.inputs.lastName.label}
          placeholder={messages.inputs.lastName.placeholder}
          error={formik.touched.lastName && (formik.errors.lastName || !!formik?.status?.errors.lastName)}
          name={messages.inputs.lastName.name}
          values={formik.values.lastName}
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          type='text'
        />
        <Input
          label={messages.inputs.firstName.label}
          placeholder={messages.inputs.firstName.placeholder}
          error={formik.touched.firstName && (formik.errors.firstName || !!formik?.status?.errors.firstName)}
          name={messages.inputs.firstName.name}
          values={formik.values.firstName}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          type='text'
        />
        <Input
          label={messages.inputs.email.label}
          placeholder={messages.inputs.email.placeholder}
          error={formik.touched.email && (formik.errors.email || !!formik?.status?.errors.email)}
          name={messages.inputs.email.name}
          values={formik.values.email}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          type='email'
        />
        <Input
          label={messages.inputs.phoneNumber.label}
          placeholder={messages.inputs.phoneNumber.placeholder}
          error={formik.touched.phoneNumber && (formik.errors.phoneNumber || !!formik?.status?.errors.phoneNumber)}
          name={messages.inputs.phoneNumber.name}
          values={formik.values.phoneNumber}
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          type='tel'
        />
        <div className={styles.section_action_container}>
          <Button type="submit" fullWidth disabled={!formik.values || (!formik.values.lastName && !formik.values.firstName && !formik.values.email && !formik.values.phoneNumber)}>
            {messages.sections.action}
          </Button>
        </div>
      </form>
  )
}

function validatePasswordForm({ oldPassword, newPassword, confirmNewPassword }) {
  const errors = {};
  if (!oldPassword) errors.oldPassword = messages.errors.required;
  if (!newPassword) errors.newPassword = messages.errors.required;
  if (!confirmNewPassword) errors.confirmNewPassword = messages.errors.required;
  else if (newPassword !== confirmNewPassword) errors.confirmNewPassword = messages.errors.nonIdentical;
  return errors;
}

export const PasswordComponent = () => {
  const { auth } = useCustomer();
  const { setGlobalLoading } = useLoading();
  const { setAlert } = useAlert();

  async function handleSubmit({ oldPassword, newPassword, confirmNewPassword }) {
    if (!oldPassword || !newPassword || !confirmNewPassword) return ;
    setGlobalLoading(true);
    const response = await API.post(`/Customers/change-password`, { oldPassword, newPassword }, { headers: { Authorization: auth.id }});
    setGlobalLoading(false);
    if (!response || !response.ok) {
      if (response?.data?.error?.code === 'INVALID_PASSWORD') {
        return setAlert({ severity: ALERT.ERROR, content: messages.alert.error.oldPassword })
      }
      return setAlert({ severity: ALERT.ERROR, content: messages.alert.error.patchError });
    }
    return setAlert({ severity: ALERT.SUCCESS, content: messages.alert.modification.success });
  }
  const formik = useFormik({
    initialValues: { oldPassword: '', newPassword: '', confirmNewPassword: '' },
    validate: validatePasswordForm,
    onSubmit: values => handleSubmit(values),
  });

  return (
    <form className={styles.profil_password_form_grid} onSubmit={formik.handleSubmit}>
      <div className={styles.password_form_old_area}>
        <Input
          label={messages.inputs.oldPassword.label}
          placeholder={messages.inputs.oldPassword.placeholder}
          error={formik.touched.oldPassword && (formik.errors.oldPassword || !!formik?.status?.errors.oldPassword)}
          name={messages.inputs.oldPassword.name}
          values={formik.values.oldPassword}
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          fullWidth
          type='password'
        />
      </div>
      <div></div>
      <div className={styles.password_form_new_area}>
        <Input
          label={messages.inputs.newPassword.label}
          placeholder={messages.inputs.newPassword.placeholder}
          error={formik.touched.newPassword && (formik.errors.newPassword || !!formik?.status?.errors.newPassword)}
          name={messages.inputs.newPassword.name}
          values={formik.values.newPassword}
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          fullWidth
          type='password'
        />
      </div>
      <div className={styles.password_form_confirm_area}>
        <Input
          label={messages.inputs.confirmNewPassword.label}
          placeholder={messages.inputs.confirmNewPassword.placeholder}
          error={formik.touched.confirmNewPassword && (formik.errors.confirmNewPassword || !!formik?.status?.errors.confirmNewPassword)}
          name={messages.inputs.confirmNewPassword.name}
          values={formik.values.confirmNewPassword}
          value={formik.values.confirmNewPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          fullWidth
          type='password'
        />
      </div>
      <div>
        <Button type="submit" disabled={!isObjectEmpty(formik.errors) || isObjectEmpty(formik.touched)}>
          {messages.sections.action}
        </Button>
      </div>
    </form>
  )
}