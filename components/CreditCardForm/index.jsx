import React, { useState } from 'react';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements, CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements,
} from '@stripe/react-stripe-js';
import { omit } from 'ramda';

import Button from '../Button';
import CheckBox from '../CheckBox';

import messages from './messages';
import styles from './index.module.css';
import { isObjectEmpty } from '../../helpers/functions';

const S = {};

S.CardElementWrapper = styled.div`
  padding: 1rem;
  border-radius: 6px;
  width: 100%;
  color: ${({ theme, hasError }) => hasError ? 'red' : theme.colors.lightGrey};
  border: ${({ hasError }) => hasError ? '1px solid red' : '1px solid #CBD5E1'};
  &.Mui-focused {
    border: ${({ theme, hasError }) => hasError ? '1px solid green' : `1px solid ${theme.colors.mainGreen}`};
  }
`;

S.FormControl = styled(FormControl)`
  width: 100%;
`;

const errorMessagesMap = new Map();
errorMessagesMap.set('invalid_number', 'Le numéro de la carte est invalide');
errorMessagesMap.set('invalid_expiry_year_past', 'La carte est pérmimée');
errorMessagesMap.set('incomplete_number', 'Le numéro de la carte est incomplet');
errorMessagesMap.set('incomplete_expiry', 'La date d\'expiration est incomplet');
errorMessagesMap.set('incomplete_cvc', 'Le code CVC est incomplet');

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const createOptions = () => ({
  style: {
    base: {
      width: '100%',
      height: '3.5em',
      border: '1px solid #CBD5E1',
      margin: '0.625em',
      letterSpacing: '0.025em',
      fontFamily: 'Source Code Pro, monospace',
      '::placeholder': {
        color: '#94A3B8',
        fontWeight: 500,
        fontSize: '1em',
        margin: '1em',
      },
      input: {
        height: '8.5em',
        backgroundColor: '#000000',
        ':focus': {
          border: '1px solid yellow',
        }
      },
    },
    invalid: {
      color: 'rgba(216, 25, 25, 1)',
      border: '1px solid rgba(216, 25, 25, 1)',
    },
  },
});

const CguSecurityComponent = ({ cguValue = false, handleCguChange, handleCguLink, handleSecurityLink }) => (
  <div>
    <CheckBox checked={cguValue} onChange={handleCguChange} />
    <span className={styles.cgu_text}>{messages.inputs.cgu.firstPart}</span>
    <span onClick={handleCguLink} className={styles.cgu_link}>{messages.inputs.cgu.secondPart}</span>
    <span className={styles.cgu_text}>{messages.inputs.cgu.thirdPart}</span>
    <span onClick={handleSecurityLink} className={styles.cgu_link}>{messages.inputs.cgu.fourthPart}</span>
  </div>
)

const CreditCardForm = ({ usePaymentMethod, handleSubmit, buttonLabel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cguValue, setCguValue] = useState(false);
  const [formTouched, setFormTouched] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });
  const [formErrors, setFormErrors] = useState({
    cardNumber: 'Empty field',
    cardExpiry: 'Empty field',
    cardCvc: 'Empty field',
  });

  function handleCguValue() {
    setCguValue(prevState => !prevState);
  }

  function handleFieldChange(field) {
    const { elementType } = field;
    if (!formTouched[elementType]) setFormTouched(prevState => ({ ...prevState, [elementType]: true }));
    if (field.empty && formTouched[elementType]) return setFormErrors(prevErrors => ({ ...prevErrors, [elementType]: 'Champs vide' }))
    if (!field.error) return setFormErrors(prevErrors => omit([elementType], prevErrors))
    return setFormErrors(prevErrors => ({ ...prevErrors, [elementType]: errorMessagesMap.get(field.error.code) }))
  }

  return (
    <div style={{ width: '100%' }}>
      <form className={styles.credit_card_form_container} onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(stripe, elements);
      }}>
      {/* SEND HANDLE SUBMIT FROM PARENTS WITH STRIPE AND ELEMENTS INSTANCE */}
        <S.FormControl>
          <div className={styles.card_form_input_label}>{messages.inputs.cardNumber.label}</div>
          <S.CardElementWrapper id="cardNumber" hasError={formErrors.cardNumber && formTouched.cardNumber}>
            <CardNumberElement
              {...createOptions()}
              onChange={handleFieldChange}
            />
          </S.CardElementWrapper>
        </S.FormControl>
        <S.FormControl>
          <div className={styles.card_form_input_label}>{messages.inputs.cardCvc.label}</div>
          <S.CardElementWrapper id="cardCVC" hasError={formErrors.cardCvc && formTouched.cardCvc}>
            <CardCvcElement
              {...createOptions()}
              onChange={handleFieldChange}
            />
        </S.CardElementWrapper>
        </S.FormControl>
        <S.FormControl>
          <div className={styles.card_form_input_label}>{messages.inputs.cardExpiry.label}</div>
          <S.CardElementWrapper id="cardExpiry" hasError={formErrors.cardExpiry && formTouched.cardExpiry}>
            <CardExpiryElement
              {...createOptions()}
              onChange={handleFieldChange}
            />
          </S.CardElementWrapper>
        </S.FormControl>
        <CguSecurityComponent cguValue={cguValue} handleCguChange={handleCguValue} />
        {/* {withSaveState && (<div>
          <CheckBox checked={saveValue} onChange={handleSaveState} />
          <span>{messages.saveCard}</span>
        </div>)} */}
        <div className={styles.credit_card_action_container}>
          <Button type="submit" onClick={handleSubmit} disabled={(!isObjectEmpty(formErrors) || !cguValue || isSubmitting) && (!usePaymentMethod || !cguValue)}>{buttonLabel || messages.action.submit}</Button>
        </div>
      </form>
    </div>
  )
}

const CreditCardContainer = ({ paymentMethod, usePaymentMethod = false, handleSubmit, buttonLabel }) => (
  <Elements stripe={stripePromise}>
    <CreditCardForm
      paymentMethod={paymentMethod}
      usePaymentMethod={usePaymentMethod}
      handleSubmit={handleSubmit}
      buttonLabel={buttonLabel}
    />
  </Elements>
)

export default CreditCardContainer;
