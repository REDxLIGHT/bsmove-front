import React from 'react';
import { useFormik } from 'formik';

import messages from './messages';
import styles from './index.module.css';
import Input from '../../components/Input';
import * as validators from '../../helpers/validators';
import Button from '../../components/Button';
import { isObjectEmpty } from '../../helpers/functions';
import { func } from 'prop-types';

const ForgotPasswordComponent = ({ handleSubmit }) => {
  function validate(values) {
    const errors = {};
    if (!values.email) errors.email = messages.form.error.required;
    else if (!validators.isEmailValid(values.email)) errors.email = messages.form.email.error;
    return errors;
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: values => handleSubmit(values),
  });
  return (
    <>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.forgot_password_infos}>{messages.infos}</div>
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
        <div className={styles.submit_button_container}>
          <Button
            type="submit"
            disabled={formik.isSubmitting || !isObjectEmpty(formik.errors)}
          >
            {messages.button.submit.label}
          </Button>
        </div>
      </form>
    </>
  )
};

ForgotPasswordComponent.propTypes = {
  handleSubmit: func.isRequired,
}

export default ForgotPasswordComponent;
