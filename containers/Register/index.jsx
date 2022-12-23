import React, { useState, useEffect} from 'react';
import { bool, func, object } from 'prop-types';
import { FormControlLabel } from '@material-ui/core';
import Link from 'next/link';
import { useFormik, Field, FormikProvider } from 'formik';

import Input from '../../components/Input';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import * as validators from '../../helpers/validators';
import { isObjectEmpty } from '../../helpers/functions';

import styles from './index.module.css';
import messages from './messages';
import GenderRadio from '../../components/GenderRadio';

const CguComponent = ({ checked, field }) => (
  <>
    <FormControlLabel
      control={<CheckBox {...field} checked={checked} />}
      label={(
        <div>
          <span className={styles.cgu_content}>{messages.cgu.content}</span>
          <Link href='/cgu'>
            <span className={styles.cgu_link}>{messages.cgu.link}</span>
          </Link>
        </div>
      )}
    />
  </>
);

CguComponent.propTypes = {
  checked: bool.isRequired,
  field: object,
}

const RegisterComponent = ({ handleSubmit }) => {
  const [genderValue, setGenderValue] = useState('female');
  function validate(values) {
    const errors = {};
    if (!values.email) errors.email = messages.form.error.required;
    else if (!validators.isEmailValid(values.email)) errors.email = messages.form.email.error;
    if (!values.lastName) errors.lastName = messages.form.error.required;
    else if (!validators.isLastNameValid(values.lastName)) errors.lastName = messages.form.lastName.error;
    if (!values.firstName) errors.firstName = messages.form.error.required;
    else if (!validators.isFirstNameValid(values.firstName)) errors.firstName = messages.form.firstName.error;
    if (!values.password) errors.password = messages.form.error.required;
    else if (!validators.isPasswordValid(values.password)) errors.password = messages.form.password.error;
    if (!values.phoneNumber) errors.phoneNumber = messages.form.error.required;
    else if (!validators.isPhoneNumberValid(values.phoneNumber)) errors.phoneNumber = messages.form.phoneNumber.error;
    if (!values.cgu) errors.cgu = messages.form.cgu.error;
    return errors;
  }
  
  const formik = useFormik({
    initialValues: {
      gender: 'female',
      email: '',
      lastName: '',
      firstName: '',
      password: '',
      phoneNumber: '',
      cgu: false,
      address: {
        street: '',
        zipCode: '',
        city: '',
        country: '',
      },
    },
    validate,
    onSubmit: values => handleSubmit(values),
  });

  function handleGenderValueChange(event, formikHandler) {
    formikHandler(event);
    return setGenderValue(event.target.value);
  }

  return (
    <FormikProvider value={formik}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className={styles.input_container}>
            <Field
              name='gender'
              component={(props) => (
                <GenderRadio
                  {...props}
                  value={genderValue}
                  onChange={(event) => handleGenderValueChange(event, props.field.onChange)} />
                )
              }
            />
          </div>
          <div className={styles.input_container}>
            <Input
              label={messages.inputs.email.label}
              placeholder={messages.inputs.email.placeholder}
              error={formik.touched.email && (formik?.errors?.email || !!formik?.status?.errors?.email)}
              name={messages.inputs.email.name}
              values={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              type='email'
            />
          </div>
          <div className={styles.input_container}>
            <Input
              label={messages.inputs.lastName.label}
              placeholder={messages.inputs.lastName.placeholder}
              error={formik.touched.lastName && (formik?.errors?.lastName || !!formik?.status?.errors?.lastName)}
              name={messages.inputs.lastName.name}
              values={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              type='text'
            />
          </div>
          <div className={styles.input_container}>
            <Input
              label={messages.inputs.firstName.label}
              placeholder={messages.inputs.firstName.placeholder}
              error={formik.touched.firstName && (formik?.errors?.firstName || !!formik?.status?.errors?.firstName)}
              name={messages.inputs.firstName.name}
              values={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              type='text'
            />
          </div>
          <div className={styles.input_container}>
            <Input
              label={messages.inputs.password.label}
              error={formik.touched.password && (formik?.errors?.password || !!formik?.status?.errors?.password)}
              name={messages.inputs.password.name}
              values={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              type='password'
            />
          </div>
          <div className={styles.input_container}>
            <Input
              label={messages.inputs.phoneNumber.label}
              error={formik.touched.phoneNumber && (formik?.errors?.phoneNumber || !!formik?.status?.errors?.phoneNumber)}
              name={messages.inputs.phoneNumber.name}
              values={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              type='tel'
            />
          </div>
          <div className={styles.address_inputs_container}>
            <div>{messages.inputs.address.title}</div>
            <div className={styles.input_container}>
              <Input
                label={messages.inputs.address.street.label}
                placeholder={messages.inputs.address.street.placeholder}
                error={formik.touched.street && (formik?.errors?.street || !!formik?.status?.errors?.street)}
                name={messages.inputs.address.street.name}
                values={formik.values.address.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                fullWidth
                type='text'
              />
            </div>
            <div className={styles.input_container}>
              <Input
                label={messages.inputs.address.zipCode.label}
                placeholder={messages.inputs.address.zipCode.placeholder}
                error={formik.touched.zipCode && (formik?.errors?.zipCode || !!formik?.status?.errors?.zipCode)}
                name={messages.inputs.address.zipCode.name}
                values={formik.values.address.zipCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                fullWidth
                type='text'
              />
            </div>
            <div className={styles.input_container}>
              <Input
                label={messages.inputs.address.city.label}
                placeholder={messages.inputs.address.city.placeholder}
                error={formik.touched.city && (formik?.errors?.city || !!formik?.status?.errors?.city)}
                name={messages.inputs.address.city.name}
                values={formik.values.address.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                fullWidth
                type='text'
              />
            </div>
            <div className={styles.input_container}>
              <Input
                label={messages.inputs.address.country.label}
                placeholder={messages.inputs.address.country.placeholder}
                error={formik.touched.country && (formik?.errors?.country || !!formik?.status?.errors?.country)}
                name={messages.inputs.address.country.name}
                values={formik.values.address.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                fullWidth
                type='text'
              />
            </div>
          </div>
          <div className={styles.input_container}>
            <Field
              name='cgu'
              checked={formik.values.cgu}
              component={(props) => <CguComponent {...props} />}
            />
          </div>
          <div className={styles.submit_button_container}>
            <Button
              type="submit"
              disabled={formik.isSubmitting}
            >
              {messages.button.submit.label}
            </Button>
          </div>
        </form>
      </div>
    </FormikProvider>
  )
}

RegisterComponent.propTypes = {
  handleSubmit: func.isRequired,
}

export default RegisterComponent;
