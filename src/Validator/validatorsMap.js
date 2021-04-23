import DateMask from './DateMask';
import MaskValidator from './MaskValidator';
import Validator from './Validator';

const globals = {
  dateFormat: 'MM-dd-yyyy',
  dateTimeFormat: 'MM-dd-yyyy hh:mm',
  dateFormatMask: '99-99-9999',
  dateTimeFormatMask: '99-99-9999 99:99',
};

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

  setFormats: (
    dateFormat,
    dateTimeFormat,
    dateFormatMask,
    dateTimeFormatMask
  ) => {
    globals.dateFormat = dateFormat;
    globals.dateTimeFormat = dateTimeFormat;
    globals.dateFormatMask = dateFormatMask;
    globals.dateTimeFormatMask = dateTimeFormatMask;
  },

  getFormats: () => {
    return { ...globals };
  },

  dateTime: {
    validator: (input) => DateMask.dateTime(input, [globals.dateTimeFormat]),
    validationMessage: DateMask.dateTimeMessage,
  },
  dateTimeByChar: {
    byCharValidator: (input) =>
      DateMask.dateByChar(input, [globals.dateTimeFormat]),
    validator: (input) => DateMask.dateTime(input, [globals.dateTimeFormat]),
    validationMessage: DateMask.dateTimeMessage,
  },
  dateTimeInPast: {
    validator: (input) =>
      DateMask.dateTimeInPast(input, globals.dateTimeFormat),
    validationMessage: DateMask.dateTimeInPastMessage,
  },
  dateTimeInPastByChar: {
    byCharValidator: (input) =>
      DateMask.dateByChar(input, [globals.dateTimeFormat]),
    validator: (input) =>
      DateMask.dateTimeInPast(input, globals.dateTimeFormat),
    validationMessage: DateMask.dateTimeInPastMessage,
  },
  dateTimeInPastByCharWithInvisibleMask: {
    byCharValidator: (input) =>
      DateMask.dateByChar(input, [globals.dateTimeFormat]),
    validator: (input) =>
      DateMask.dateTimeInPast(input, globals.dateTimeFormat),
    validationMessage: DateMask.dateTimeInPastMessage,
    mask: globals.dateTimeFormatMask,
    maskType: 'invisible',
  },
  dateTimeInPastByCharWithVisibleMask: {
    byCharValidator: (input) =>
      DateMask.dateByChar(input, [globals.dateTimeFormat]),
    validator: (input) =>
      DateMask.dateTimeInPast(input, globals.dateTimeFormat),
    validationMessage: DateMask.dateTimeInPastMessage,
    mask: globals.dateTimeFormatMask,
    maskType: 'visible',
  },
  dateTimeByCharWithInvisibleMask: {
    byCharValidator: (input) =>
      DateMask.dateByChar(input, [globals.dateTimeFormat]),
    validator: (input) => DateMask.dateTime(input, [globals.dateTimeFormat]),
    validationMessage: DateMask.dateTimeMessage,
    mask: globals.dateTimeFormatMask,
    maskType: 'invisible',
  },
  dateTimeByCharWithVisibleMask: {
    byCharValidator: (input) =>
      DateMask.dateByChar(input, [globals.dateTimeFormat]),
    validator: (input) => DateMask.dateTime(input, [globals.dateTimeFormat]),
    validationMessage: DateMask.dateTimeMessage,
    mask: globals.dateTimeFormatMask,
    maskType: 'visible',
  },

  date: {
    validator: (input) => DateMask.dateTime(input, [globals.dateFormat]),
    validationMessage: DateMask.dateTimeMessage,
  },
  dateByChar: {
    byCharValidator: (input) =>
      DateMask.dateByChar(input, [globals.dateFormat]),
  },
  dateInPast: {
    validator: (input) => DateMask.dateTimeInPast(input, globals.dateFormat),
    validationMessage: DateMask.dateTimeInPastMessage,
  },
  dateInPastByChar: {
    byCharValidator: (input) =>
      DateMask.dateByChar(input, [globals.dateFormat]),
    validator: (input) => DateMask.dateTimeInPast(input, globals.dateFormat),
    validationMessage: DateMask.dateTimeInPastMessage,
  },
  dateInPastByCharWithInvisibleMask: {
    byCharValidator: (input) =>
      DateMask.dateByChar(input, [globals.dateFormat]),
    validator: (input) => DateMask.dateTimeInPast(input, globals.dateFormat),
    validationMessage: DateMask.dateInPastMessage,
    mask: globals.dateFormatMask,
    maskType: 'invisible',
  },
  dateInPastByCharWithVisibleMask: {
    byCharValidator: (input) =>
      DateMask.dateByChar(input, [globals.dateFormat]),
    validator: (input) => DateMask.dateTimeInPast(input, globals.dateFormat),
    validationMessage: DateMask.dateTimeInPastMessage,
    mask: globals.dateFormatMask,
    maskType: 'visible',
  },
  dateByCharWithInvisibleMask: {
    byCharValidator: (input) =>
      DateMask.dateByChar(input, [globals.dateFormat]),
    validator: (input) => DateMask.dateTime(input, [globals.dateFormat]),
    validationMessage: DateMask.dateTimeMessage,
    mask: globals.dateFormatMask,
    maskType: 'invisible',
  },
  dateByCharWithVisibleMask: {
    byCharValidator: (input) =>
      DateMask.dateByChar(input, [globals.dateFormat]),
    validator: (input) => DateMask.dateTime(input, [globals.dateFormat]),
    validationMessage: DateMask.dateTimeMessage,
    mask: globals.dateFormatMask,
    maskType: 'visible',
  },
};

export default validatorsMap;
