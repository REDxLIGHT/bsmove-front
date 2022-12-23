import React from 'react';
import { useFormik } from 'formik';
import { func } from 'prop-types';

import Input from '../../components/Input';
import Button from '../../components/Button';
import * as validators from '../../helpers/validators';

import messages from './messages';
import styles from './index.module.css';
import { isObjectEmpty } from '../../helpers/functions';

const ResetPasswordContainer = ({ handleSubmit }) => {
  function validate(values) {
    const errors = {};
    if (!values.oldPassword) errors.oldPassword = messages.form.error.required;
    if (!values.newPassword) errors.newPassword = messages.form.error.required;
    else if (!validators.isPasswordValid(values.newPassword)) errors.newPassword = messages.form.newPassword.error;
    if (!values.confirmPassword) errors.confirmPassword = messages.form.error.required;
    else if (values.newPassword !== values.confirmPassword) errors.confirmPassword = messages.form.confirmPassword.error;
    return errors;
  }

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: values => handleSubmit(values),
  });
  return (
    <>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.input_container}>
          <Input
            label={messages.inputs.oldPassword.label}
            placeholder={messages.inputs.oldPassword.placeholder}
            error={formik.touched.oldPassword && (formik.errors.oldPassword || !!formik?.status?.errors?.oldPassword)}
            name={messages.inputs.oldPassword.name}
            values={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            fullWidth
            type='password'
          />
        </div>
        <div className={styles.input_container}>
          <Input
            label={messages.inputs.newPassword.label}
            placeholder={messages.inputs.newPassword.placeholder}
            error={formik.touched.newPassword && (formik.errors.newPassword || !!formik?.status?.errors?.newPassword)}
            name={messages.inputs.newPassword.name}
            values={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            fullWidth
            type='password'
          />
        </div>
        <div className={styles.forgot_password_infos}>{messages.infos}</div>
          <div className={styles.input_container}>
            <Input
              label={messages.inputs.confirmPassword.label}
              placeholder={messages.inputs.confirmPassword.placeholder}
              error={formik.touched.confirmPassword && (formik.errors.confirmPassword || !!formik?.status?.errors?.confirmPassword)}
              name={messages.inputs.confirmPassword.name}
              values={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              type='password'
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
}

ResetPasswordContainer.propTypes = {
  handleSubmit: func.isRequired,
}

export default ResetPasswordContainer;
