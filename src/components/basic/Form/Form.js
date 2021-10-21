import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import renderTag from '@/helpers/renderTag';
import validateForm from '@/helpers/validateForm';
import useDiff from '@/hooks/useDiff';
import useInputHighlight from '@/hooks/useInputHighlight';
import useNotifications from '@/hooks/useNotifications';
import useOnInputsUpdate from '@/hooks/useOnInputsUpdate';
import useOnSubmit from '@/hooks/useOnSubmit';
import useValidatorFormats from '@/hooks/useValidatorFormats';
import masks from '@/maskHelpers/masks';
import renderGroups from '@/outputHelpers/renderGroups';
import useInputsReducer from '@/stateHelpers/Inputs';
import useValuesReducer from '@/stateHelpers/Values';
import controlInputProps from '@/stateHelpers/helpers/controlInputProps';
import Input from '../Input';

const Form = (props) => {
  let { showNotifications } = props;
  const {
    id: formId,
    inputs: inputsProps,
    onInputsUpdate,
    onSubmit: onSubmitHandler,
    notify,
    render,
    resetOnSubmit,
    onValueChange,
  } = props;

  const [notifications] = useNotifications({ showNotifications }, notify);

  if (!notify) {
    showNotifications = 'hideAll';
  }

  const [inputs, inputsActions] = useInputsReducer();

  useEffect(() => {
    inputsActions.init({ inputsProps });
  }, [inputsProps]);

  const [values, valuesActions] = useValuesReducer();

  useEffect(() => {
    valuesActions.init({ inputsProps });
  }, [inputsProps]);

  useDiff(
    (diff) => {
      if (diff && diff[0]) {
        const [changedValues] = diff;

        if (onValueChange) onValueChange(changedValues);

        Object.entries(changedValues).forEach(([name, { value }]) =>
          controlInputProps(
            name,
            { ...inputs[name], value },
            inputs,
            (name, props) => inputsActions.put({ name, props }),
          ),
        );
      }
    },
    [values, inputs],
  );

  const updateValue = (name, value) => {
    valuesActions.put({ name, value });
  };

  const highlightInput = useInputHighlight(
    inputsActions.setInvalid,
    inputsActions.unsetInvalid,
    2000,
    notifications,
  );

  const inputAdditionalFields = {
    render,
    formId,
    highlightInput,
    updateValue,
  };

  useOnInputsUpdate(inputs, values, inputAdditionalFields, onInputsUpdate);

  function onValidationFail(input) {
    if (input) {
      highlightInput(input.name, input.validationMessage);
    }
  }

  useValidatorFormats(props);

  const onSubmit = useOnSubmit(
    values,
    inputs,
    () => validateForm(inputs, values, onValidationFail),
    (data) =>
      onSubmitHandler(data).then(() => {
        if (resetOnSubmit) {
          valuesActions.init({ inputsProps });
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
      {children ||
        renderGroups(inputs, values, inputAdditionalFields, render.group)}
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
  onValueChange: () => {},
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
  // eslint-disable-next-line react/no-unused-prop-types
  validationMaskDateFormat: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  validationMaskDateTimeFormat: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  dateFormatMask: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  dateTimeFormatMask: PropTypes.string,

  resetOnSubmit: PropTypes.bool,
  onValueChange: PropTypes.func,
};

export default Form;
