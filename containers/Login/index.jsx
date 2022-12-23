import React, { useEffect} from 'react';
import { func } from 'prop-types';
import Link from 'next/link';
import { useFormik } from 'formik';

import Input from '../../components/Input';
import Button from '../../components/Button';
import * as validators from '../../helpers/validators';

import styles from './index.module.css';
import messages from './messages';
import { isObjectEmpty } from '../../helpers/functions';

function isButtonDisabled({ errors, touched, status, values }) {
  if (!isObjectEmpty(errors) || !isObjectEmpty(status?.errors)) {
    return true;
  }
  else if (!values.email || !values.password) return true;
  return false;
}

const LoginComponent = ({ handleSubmit, page = 'login' }) => {
  function validate(values) {
    const errors = {};
    if (!values.email) errors.email = messages.form.error.required;
    else if (!validators.isEmailValid(values.email)) errors.email = messages.form.email.error;
    if (!values.password) errors.password = messages.form.error.required;
    return errors;
  }
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => handleSubmit(values),
  });

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.input_container}>
          <Input
            label={messages.inputs.email.label}
            placeholder={messages.inputs.email.placeholder}
            error={formik.touched.email && (formik.errors.email || !!formik?.status?.errors?.email)}
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
            label={messages.inputs.password.label}
            error={formik.touched.password && (formik.errors.password || !!formik?.status?.errors?.password)}
            name={messages.inputs.password.name}
            values={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            fullWidth
            type='password'
          />
        </div>
        {page === 'login-admin'
            ? null
            : (
              <div className={styles.forgot_password_container}>
                <Link href='/forgot-password'>
                  <span className={styles.forgot_password}>{messages.forgotPassword}</span>
                </Link>
              </div>
            )}
        <div className={styles.submit_button_container}>
          <Button
            type="submit"
            disabled={formik.isSubmitting || !isObjectEmpty(formik.errors)}
          >
            {messages.button.submit.label}
          </Button>
        </div>
      </form>
    </div>
  )
};

LoginComponent.propTypes = {
  handleSubmit: func.isRequired,
};

export default LoginComponent;
