import DateMask from './DateMask';
import MaskValidator from './MaskValidator';
import Validator from './Validator';

const validatorsMap = {
  email: {
    validator: Validator.email,
    validationMessage: Validator.emailMessage,
  },
  userName: {
    validator: Validator.userName,
    validationMessage: Validator.userNameMessage,
    byCharValidator: Validator.alphanumeric,
  },
  password: {
    validator: Validator.password,
    validationMessage: Validator.passwordMessage,
  },
  number: {
    byCharValidator: Validator.numericByChar,
  },
  float: {
    byCharValidator: Validator.floatByChar,
  },
  alphanumeric: {
    byCharValidator: Validator.alphanumeric,
  },

  phone: {
    validator: (input) =>
      MaskValidator.maskValidator(input, '+999 (99) 999-99-99'),
    validationMessage: 'Input must fit the mask',
  },
  phoneByChar: {
    byCharValidator: (input) =>
      MaskValidator.maskByChar(input, '+999 (99) 999-99-99'),
  },

  dateTime: {
    validator: DateMask.dateTime,
    validationMessage: DateMask.dateTimeMessage,
  },
  dateTimeByChar: {
    byCharValidator: DateMask.dateByChar,
  },
  dateTimeInPast: {
    validator: DateMask.dateTimeInPast,
    validationMessage: DateMask.dateTimeInPastMessage,
  },
};

export default validatorsMap;
