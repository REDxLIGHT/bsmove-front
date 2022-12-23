import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

import messages from './messages';
import styles from './index.module.css';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { useCustomer } from '../../../../hooks/customer';
import { isObjectEmpty } from '../../../../helpers/functions';
import API from '../../../../helpers/api';
import { useLoading } from '../../../../hooks/loading';
import { useAlert } from '../../../../hooks/alert';
import { ALERT } from '../../../../helpers/constants';

export const ProfilDeliveryAddressComponent = () => {
  const { auth, customer, setCustomer } = useCustomer();
  const { setGlobalLoading } = useLoading();
  const { setAlert } = useAlert();
  const [initialValues, setInitialValues] = useState({
    address: customer?.address || {},
  });

  async function handleSubmit({ address }) {
    if (!auth?.userId) return ;
    setGlobalLoading(true);
    const response = await API.patch(`/Customers/${auth.userId}`, { address }, { headers: { Authorization: auth.id } });
    setGlobalLoading(false);
    if (!response?.ok || !response?.data) {
      return setAlert({ severity: ALERT.ERROR, content: messages.alert.error });
    }
    setCustomer(response.data);
    return setAlert({ severity: ALERT.SUCCESS, content: messages.alert.success })
  }

  useEffect(() => {
    if (!isObjectEmpty(customer)) {
      setInitialValues({
        address: customer?.address,
      })
    }
  }, [customer]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validate: () => {},
    onSubmit: (values) => handleSubmit(values),
  })
  return (
    <form className={styles.profil_delivery_address_container} onSubmit={formik.handleSubmit}>
      <Input
        label={messages.inputs.lastName.label}
        placeholder={messages.inputs.lastName.placeholder}
        error={formik.touched.lastName && (formik.errors.lastName || !!formik?.status?.errors.lastName)}
        name={messages.inputs.lastName.name}
        values={formik.values?.address?.lastName}
        value={formik.values?.address?.lastName}
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
        values={formik.values?.address?.firstName}
        value={formik.values?.address?.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        type='text'
      />
      <Input
        label={messages.inputs.street.label}
        placeholder={messages.inputs.street.placeholder}
        error={formik.touched.street && (formik.errors.street || !!formik?.status?.errors.street)}
        name={messages.inputs.street.name}
        values={formik.values?.address?.street}
        value={formik.values?.address?.street}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        type='text'
      />
      <Input
        label={messages.inputs.zipCode.label}
        placeholder={messages.inputs.zipCode.placeholder}
        error={formik.touched.zipCode && (formik.errors.zipCode || !!formik?.status?.errors.zipCode)}
        name={messages.inputs.zipCode.name}
        values={formik.values?.address?.zipCode}
        value={formik.values?.address?.zipCode}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        type='text'
      />
      <Input
        label={messages.inputs.city.label}
        placeholder={messages.inputs.city.placeholder}
        error={formik.touched.city && (formik.errors.city || !!formik?.status?.errors.city)}
        name={messages.inputs.city.name}
        values={formik.values?.address?.city}
        value={formik.values?.address?.city}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        type='text'
      />
      <Input
        label={messages.inputs.country.label}
        placeholder={messages.inputs.country.placeholder}
        error={formik.touched.country && (formik.errors.country || !!formik?.status?.errors.country)}
        name={messages.inputs.country.name}
        values={formik.values?.address?.country}
        value={formik.values?.address?.country}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        type='text'
      />
      <div className={styles.section_action_container}>
        <Button type='submit'>
          {messages.form.action}
        </Button>
      </div>
    </form>
  );
}

export default ProfilDeliveryAddressComponent;
