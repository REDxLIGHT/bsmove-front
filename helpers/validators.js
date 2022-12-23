import validator from 'validator';

export function isEmailValid(email) {
  return validator.isEmail(email);
}

export function isLastNameValid(lastName) {
  return !!lastName.match(/^[a-zA-Z- ]*$/)
}

export function isFirstNameValid(firstName) {
  return !!firstName.match(/^[a-zA-Z- ]*$/)
}

export function isPasswordValid(password) {
  return (
    validator.isLength(password, { min: 8, max: 50 })
    && !(validator.isEmpty(password, { ignore_whitespace: true }))
  );
}

export function isPhoneNumberValid(phoneNumber) {
  return validator.isMobilePhone(phoneNumber);
}

export default {
  isEmailValid,
  isLastNameValid,
  isFirstNameValid,
  isPasswordValid,
  isPhoneNumberValid,
};
