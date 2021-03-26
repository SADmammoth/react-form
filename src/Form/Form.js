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

  const mapGroupsCb = useCallback((inputs) => mapGroups(inputs, inputsProps), [
    inputsProps,
  ]);

  let [state, dispatch, actions] = useFormReducer(notifications, render);

  useDiff(
    ([valuesDiff, inputsPropsDiff]) => {
      if (valuesDiff.value || inputsPropsDiff) {
        onInputsUpdate({
          ...mapGroupsCb(state.inputs),
          $list: [...Object.values(state.inputs)],
        });
      }
    },
    [state.values, inputsProps]
  );

  useEffect(() => {
    dispatch(actions.createValues(inputsProps));
  }, [inputsProps]);

  useEffect(() => {
    dispatch(actions.createInputs(inputsProps, render));
  }, [state.values, inputsProps]);

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

  const FormTag = render.form || 'form';

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
    group: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    loader: PropTypes.func,
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    form: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  }),
};

export default Form;
