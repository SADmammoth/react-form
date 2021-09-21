import React, { Fragment, useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';

import useOnInputsUpdate from '../../../helpers/hooks/useOnInputsUpdate';
import Input from '../Input';
import validatorsMap from '@/Validator/validatorsMap';
import renderGroups from '@/formHelpers/output/renderGroups';
import renderTag from '@/formHelpers/renderTag';
import validateForm from '@/formHelpers/validation/validateForm';
import useOnSubmit from '@/formStateHelpers/handlers/useOnSubmit';
import useFormReducer from '@/formStateHelpers/useFormReducer';
import useNotifications from '@/formStateHelpers/useNotifications';
import useDiff from '@/hooks/useDiff';
import masks from '@/maskHelpers/masks';

const Form = (props) => {
  let { showNotifications } = props;
  const {
    id: formId,
    inputs: inputsProps,
    onInputsUpdate,
    onSubmit: onSubmitHandler,
    notify,
    render,
    validationMaskDateFormat,
    validationMaskDateTimeFormat,
    dateFormatMask,
    dateTimeFormatMask,
    resetOnSubmit,
  } = props;

  const [notifications] = useNotifications({ showNotifications }, notify);

  const inputAdditionalFields = {
    render,
    formId,
  };

  const [state, dispatch, actions] = useFormReducer(
    notifications,
    inputAdditionalFields,
  );

  useDiff(() => {
    dispatch(actions.createValues(inputsProps));
  }, [inputsProps]);

  useDiff(() => {
    dispatch(actions.createInputs(inputsProps, render));
  }, [state.values, inputsProps]);

  useOnInputsUpdate(inputsProps, state, onInputsUpdate);

  if (!notify) {
    showNotifications = 'hideAll';
  }

  function onValidationFail(input) {
    if (input) {
      dispatch(actions.highlightInput(input.name));
      notifications.error(input.validationMessage);
    }
  }

  useEffect(() => {
    validatorsMap.setFormats(
      validationMaskDateFormat,
      validationMaskDateTimeFormat,
      dateFormatMask,
      dateTimeFormatMask,
    );
  }, [
    validationMaskDateFormat,
    validationMaskDateTimeFormat,
    dateFormatMask,
    dateTimeFormatMask,
  ]);

  const { values, inputs } = state;
  const onSubmit = useOnSubmit(
    values,
    inputsProps,
    () => validateForm(inputsProps, values, onValidationFail),
    (data) =>
      onSubmitHandler(data).then(() => {
        if (resetOnSubmit) {
          dispatch(actions.resetForm(inputsProps));
        }
      }),
    notifications,
    resetOnSubmit,
  );

  const { method, action, className, style, submitButton, children } = props;

  const FormTag = renderTag(render, 'Form');

  return (
    <FormTag
      method={method}
      action={action}
      className={`form ${className}` || ''}
      style={{ ...style }}
      onSubmit={onSubmit}>
      {children || renderGroups(inputs, inputsProps, render.group)}
      {React.cloneElement(submitButton, { type: 'submit' })}
    </FormTag>
  );
};

Form.defaultProps = {
  method: 'GET',
  action: '/',
  className: '',
  style: {},
  submitButton: <Fragment />,
  onInputsUpdate: (inputs) => inputs,
  showNotifications: 'all',
  children: null,
  onSubmit: false,
  validationMaskDateFormat: masks.date,
  validationMaskDateTimeFormat: masks.dateTime,
  dateFormatMask: masks.dateMask,
  dateTimeFormatMask: masks.dateTimeMask,
  resetOnSubmit: false,
  render: {},
};

Form.propTypes = {
  id: PropTypes.string.isRequired,
  method: PropTypes.string,
  action: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      ...Input.publicProps,
      validationMessage: PropTypes.string,
      group: PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.string,
      }),
      control: {
        field: PropTypes.string,
        group: PropTypes.string,
        prop: PropTypes.string,
        map: PropTypes.objectOf(PropTypes.string),
      },
      bind: PropTypes.string,
      hide: PropTypes.bool,
    }),
  ).isRequired,
  onSubmit: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  submitButton: PropTypes.element,
  children: PropTypes.any,

  // Passed in order to get inputs components
  onInputsUpdate: PropTypes.func,
  showNotifications: PropTypes.oneOf(['all', 'errorsOnly', 'hideAll']),
  // eslint-disable-next-line react/require-default-props
  notify: PropTypes.func,
  render: PropTypes.shape({
    Group: PropTypes.any,
    Label: PropTypes.any,
    Loader: PropTypes.func,
    Input: PropTypes.any,
    Form: PropTypes.any,
  }),
  validationMaskDateFormat: PropTypes.string,
  validationMaskDateTimeFormat: PropTypes.string,
  dateFormatMask: PropTypes.string,
  dateTimeFormatMask: PropTypes.string,

  resetOnSubmit: PropTypes.bool,
};

export default Form;
