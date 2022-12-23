import React, { useState } from 'react';
import { useFormik } from 'formik';
import { mapObjIndexed, keys, map } from 'ramda';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useRouter } from 'next/router';

import messages from './messages';
import styles from './index.module.css';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import { Subtitle } from '../../components/Texts';
import Button from '../../components/Button';
import { isObjectEmpty } from '../../helpers/functions';
import { isEmailValid } from '../../helpers/validators';
import Routes from '../../helpers/routes';
import {useLoading} from "../../hooks/loading";
import api from "../../helpers/api";

const initialValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const ContactForm = ({ validate, handleSubmit }) => {
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: values => handleSubmit(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.contact_form_container}>
          {!isObjectEmpty(formik?.initialValues) && map(((inputKey) => (
            <div key={inputKey} className={styles.contact_form_input_container}>
              {
                inputKey === 'message'
                  ? <TextArea
                      label={messages.contactForm.inputs[inputKey].label}
                      placeholder={messages.contactForm.inputs[inputKey].placeholder}
                      error={formik.touched[inputKey] && (formik.errors[inputKey] || !!formik?.status?.errors[inputKey])}
                      name={messages.contactForm.inputs[inputKey].name}
                      values={formik.values[inputKey]}
                      value={formik.values[inputKey]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      fullWidth
                      type={messages.contactForm.inputs[inputKey].type}
                    />
                  : <Input
                      label={messages.contactForm.inputs[inputKey].label}
                      placeholder={messages.contactForm.inputs[inputKey].placeholder}
                      error={formik.touched[inputKey] && (formik.errors[inputKey] || !!formik?.status?.errors[inputKey])}
                      name={messages.contactForm.inputs[inputKey].name}
                      values={formik.values[inputKey]}
                      value={formik.values[inputKey]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      fullWidth
                      backgroundColor="#FFF"
                      type={messages.contactForm.inputs[inputKey].type}
                    />
                  }
              </div>
          )), keys(formik?.initialValues))}
          <Button onClick={formik.handleSubmit} disabled={!isObjectEmpty(formik.errors) || isObjectEmpty(formik.touched)}>{messages.contactForm.action}</Button>
      </div>
    </form>
  )
}

const ContactFormEnd = () => {
  const rooter = useRouter()

  function handleHomeRedirect() {
    return rooter.push(Routes.HOME_PAGE)
  }

  return (
    <div className={styles.contact_form_after_container}>
      <div>
        <CheckCircleIcon className={styles.contact_form_after_validate_icon} />
      </div>
      <div className={styles.contact_form_after_title}>{messages.contactForm.after.title}</div>
      <div className={styles.contact_page_section_content}>{messages.contactForm.after.content}</div>
      <Button onClick={handleHomeRedirect}>
        <div>{messages.contactForm.after.action}</div>
      </Button>
    </div>
  )
}

const ContactContainer = () => {
  const [emailSent, setEmailSent] = useState(false);
  const { setGlobalLoading } = useLoading()

  async function handleSubmit(values) {
    setGlobalLoading(true);
    const res = await api.post('/Customers/contact-form', values, {});
    setGlobalLoading(false);
    setEmailSent(true);
  }

  function handleEmptyFieldInValidate(values) {
    const errors = {};
    mapObjIndexed((_, key) => {
      if (!values[key]) errors[key] = messages.contactForm.errors.empty;
    }, values);
    return errors;
  }

  function handleValidate(values) {
    const errors = handleEmptyFieldInValidate(values);
    if (values?.email && !isEmailValid(values.email)) errors.email = messages.contactForm.errors.email;
    return errors;
  }

  return (
    <div className={styles.contact_page_container}>
      <div className={styles.contact_page_information}>
        <Subtitle>{messages.title}</Subtitle>
        <div className={styles.contact_page_subtitle}>{messages.subtitle}</div>
        <div className={styles.contact_page_contact_section_container}>
          <div className={styles.contact_page_section_title}>{messages.contact.title}</div>
          <div className={styles.contact_page_section_content}>{messages.contact.address.street}</div>
          <div className={styles.contact_page_section_content}>{messages.contact.address.city}</div>
          <div className={styles.contact_page_section_content}>{messages.contact.address.phoneNumber}</div>
        </div>
        <div className={styles.contact_page_contact_section_container}>
          <div className={styles.contact_page_section_title}>{messages.schedules.title}</div>
          <div className={styles.contact_page_section_content}>{messages.schedules.week.days}</div>
          <div className={styles.contact_page_section_content}>{messages.schedules.week.schedule}</div>
          <div className={styles.contact_page_section_content}>{messages.schedules.weekEnd.days}</div>
          <div className={styles.contact_page_section_content}>{messages.schedules.weekEnd.schedule}</div>
        </div>
      </div>
      <div className={styles.contact_page_form}>
        {
          !emailSent
            ? <ContactForm validate={handleValidate} handleSubmit={handleSubmit} />
            : <ContactFormEnd />
        }
      </div>
    </div>
  )
}

export default ContactContainer;
