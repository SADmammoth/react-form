import React, { Fragment, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import validateForm from '../helpers/formHelpers/validateForm';
import useOnSubmit from './helpers/handlers/useOnSubmit';
import useNotifications from './helpers/useNotifications';
import useFormReducer from './helpers/useFormReducer';

const Form = (props) => {
  let {
    inputs: inputsProps,
    onInputsUpdate,
    onSubmit: onSubmitHandler,
    showNotifications,
    notify,
    render,
  } = props;

  const [notifications] = useNotifications({ showNotifications }, notify);

  let [state, dispatch, actions] = useFormReducer(
    onInputsUpdate,
    notifications,
    render
  );

  useEffect(() => {
    dispatch(actions.createValues(inputsProps));
  }, [inputsProps]);

  useEffect(() => {
    dispatch(actions.createInputs(inputsProps, render));
  }, [state.values]);

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
    () => validateForm(inputsProps, values, onValidationFail),
    onSubmitHandler,
    notifications
  );

  const { method, action, className, style, submitButton, children } = props;

  return (
    <form
      method={method}
      action={action}
      className={`form ${className}` || ''}
      style={{ ...style }}
      onSubmit={onSubmit}
    >
      {children || (inputs && Object.values(inputs))}
      {React.cloneElement(submitButton, { type: 'submit' })}
    </form>
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
  defaultValue: null,
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
    })
  ).isRequired,
  onSubmit: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  submitButton: PropTypes.element,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  // Passed in order to get inputs components
  onInputsUpdate: PropTypes.func,
  showNotifications: PropTypes.oneOf(['all', 'errorsOnly', 'hideAll']),
  // eslint-disable-next-line react/no-unused-prop-types
  defaultValue: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object])
  ),
  notify: PropTypes.func,
};

export default Form;
