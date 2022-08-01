import React, { Fragment } from 'react';
import FormProps from '@/helpers/types/FormProps';

const Form: React.FC<FormProps> = ({ children }) => <form>{children}</form>;

Form.defaultProps = {
  method: 'GET',
  action: '/',
  className: '',
  style: {},
  submitButton: <Fragment />,
  onInputsUpdate: (inputs) => inputs,
  showNotifications: 'all',
  onSubmit: false,
  // validationMaskDateFormat: masks.date,
  // validationMaskDateTimeFormat: masks.dateTime,
  // dateFormatMask: masks.dateMask,
  // dateTimeFormatMask: masks.dateTimeMask,
  resetOnSubmit: false,
  onValueChange: () => {},
  persistFormData: false,
};

export default Form;
