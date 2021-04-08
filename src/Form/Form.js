import React, { Fragment, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import validateForm from '../helpers/formHelpers/validateForm';
import useOnSubmit from './helpers/handlers/useOnSubmit';
import useNotifications from './helpers/useNotifications';
import useFormReducer from './helpers/useFormReducer';
import mapGroups from '../helpers/formHelpers/mapGroups';
import renderGroups from '../helpers/formHelpers/renderGroups';
import _ from 'lodash';
import useDiff from '../helpers/useDiff';
import masks from '../helpers/maskHelpers/masks';

const Form = (props) => {
  let {
    inputs: inputsProps,
    onInputsUpdate,
    onSubmit: onSubmitHandler,
    showNotifications,
    notify,
    render,
    validationMaskDateFormat,
    validationMaskDateTimeFormat,
    dateFormatMask,
    dateTimeFormatMask,
  } = props;

  const [notifications] = useNotifications({ showNotifications }, notify);

  const mapGroupsCb = useCallback((inputs) => mapGroups(inputs, inputsProps), [
    inputsProps,
  ]);

  const inputAdditionalFields = {
    validationMaskDateFormat,
    validationMaskDateTimeFormat,
    dateFormatMask,
    dateTimeFormatMask,
    render,
  };

  let [state, dispatch, actions] = useFormReducer(
    notifications,
    inputAdditionalFields
  );

  useDiff(() => {
    dispatch(actions.createValues(inputsProps));
  }, [inputsProps]);

  useDiff(() => {
    dispatch(actions.createInputs(inputsProps, render));
  }, [state.values, inputsProps]);

  useDiff(
    (diff, values) => {
      if (values) {
        const [inputs] = values;
        onInputsUpdate({
          ...mapGroupsCb(inputs),
          $list: [...Object.values(inputs || {})].map((props) => (
            <Input {...props} />
          )),
        });
      }
    },
    [state.inputs, state.values]
  );

  if (!notify) {
    showNotifications = 'hideAll';
  }

  function onValidationFail(input) {
    if (input) {
      dispatch(actions.highlightInput(input.name));
      notifications.error(input.validationMessage);
    }
  }

  const { values, inputs } = state;
  const onSubmit = useOnSubmit(
    values,
    inputsProps,
    () => validateForm(inputsProps, values, onValidationFail),
    onSubmitHandler,
    notifications
  );

  const { method, action, className, style, submitButton, children } = props;

  const FormTag = render.Form || 'form';

  return (
    <FormTag
      method={method}
      action={action}
      className={`form ${className}` || ''}
      style={{ ...style }}
      onSubmit={onSubmit}
    >
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
  submitButton: <Fragment></Fragment>,
  onInputsUpdate: (inputs) => inputs,
  showNotifications: 'all',
  children: null,
  onSubmit: false,
  validationMaskDateFormat: masks.date,
  validationMaskDateTimeFormat: masks.dateTime,
  dateFormatMask: masks.dateMask,
  dateTimeFormatMask: masks.dateTimeMask,
};

Form.propTypes = {
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
    })
  ).isRequired,
  onSubmit: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  submitButton: PropTypes.element,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  // Passed in order to get inputs components
  onInputsUpdate: PropTypes.func,
  showNotifications: PropTypes.oneOf(['all', 'errorsOnly', 'hideAll']),
  notify: PropTypes.func,
  render: PropTypes.shape({
    Group: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    Label: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    Loader: PropTypes.func,
    Input: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    Form: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  }),
  validationMaskDateFormat: PropTypes.string,
  validationMaskDateTimeFormat: PropTypes.string,
  dateFormatMask: PropTypes.string,
  dateTimeFormatMask: PropTypes.string,
};

export default Form;
