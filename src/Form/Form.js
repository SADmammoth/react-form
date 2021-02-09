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
  } = props;

  let [state, dispatch, actions] = useFormReducer(onInputsUpdate);

  useEffect(() => {
    dispatch(actions.createValues(inputsProps));
  }, [inputsProps]);

  useEffect(() => {
    dispatch(actions.createInputs(inputsProps));
  }, [state.values]);

  const [notifications] = useNotifications({ showNotifications });

  function onValidationFail(input) {
    dispatch(actions.highlightInput(input.name));
    console.log(
      input.description || input.label || input.name,
      input.validationMessage
    );
    notifications.error(
      input.description || input.label || input.name,
      input.validationMessage
    );
    return false;
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
      {children || Object.values(inputs)}
      {React.cloneElement(submitButton, { type: 'submit' })}
    </form>
  );
};

Form.defaultProps = {
  method: 'GET',
  action: '/',
  className: '',
  style: {},
  submitButton: <></>,
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
};

export default Form;
