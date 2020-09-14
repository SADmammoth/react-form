import React, { Fragment, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import notify from '../helpers/formHelpers/notify';
import compareObjects from '../helpers/compareObjects';
import errorNotification from '../helpers/formHelpers/errorNotification';
import formatFormValues from '../helpers/formHelpers/formatFormValues';
import validateForm from '../helpers/formHelpers/validateForm';
import setFormDefaultValue from '../helpers/formHelpers/setFormDefaultValue';
import CreateInput from './CreateInput';
import Spinner from '../Spinner';

const Form = (props) => {
  const createInputs = (inputsProps, valuesState, onInputsUpdate) => {
    if (!Object.keys(valuesState).length) {
      return {};
    }

    const inputsData = {};

    inputsProps.forEach(
      ({
        type,
        name,
        description,
        required,
        label,
        placeholder,
        attributes,
        byCharValidator,
        validator,
        valueOptions,
        minSymbols,
        maxSymbols,
        mask,
        maskType,
        validationMessage,
        onChange,
        onInput,
        alwaysShowTip,
      }) => {
        const higlightInputCallback = () => highlightInput(name);

        const onChangeHandler = (inputName, value) => {
          if (onChange) {
            onChange(inputName, value);
          }

          updateValueCallback(inputName, value);
        };

        const onInputHandler = (inputName, value) => {
          if (onInput) {
            onInput(inputName, value);
          }

          updateValueCallback(inputName, value);
        };

        inputsData[name] = CreateInput({
          id: valuesState[name].id,
          type,
          name,
          description,
          onInput: onInputHandler,
          onChange: onChangeHandler,
          mask,
          maskType,
          validator,
          byCharValidator,
          required,
          label,
          placeholder,
          attributes,
          value: valuesState[name].value,
          valueOptions,
          minSymbols,
          maxSymbols,
          invalid: !!valuesState[name].invalid,
          highlightInput: higlightInputCallback,
          validationMessage,
          alwaysShowTip,
        });
        onInputsUpdate(inputsData);
      }
    );
    return inputsData;
  };

  function updateInput(
    inputProps,
    newValue,
    inputName,
    valuesState,
    inputsState
  ) {
    console.log(inputProps);
    let {
      type,
      name,
      description,
      required,
      label,
      placeholder,
      attributes,
      byCharValidator,
      validator,
      valueOptions,
      minSymbols,
      maxSymbols,
      mask,
      maskType,
      validationMessage,
      onChange,
      onInput,
      alwaysShowTip,
    } = inputProps.find((inputProp) => inputProp.name === inputName);

    const higlightInputCallback = () => highlightInput(name);

    const onChangeHandler = (inputName, value) => {
      if (onChange) {
        onChange(inputName, value);
      }

      updateValueCallback(inputName, value);
    };

    const onInputHandler = (inputName, value) => {
      if (onInput) {
        onInput(inputName, value);
      }

      updateValueCallback(inputName, value);
    };

    let newInput = CreateInput({
      id: valuesState[name].id,
      type,
      name,
      description,
      onInput: onInputHandler,
      onChange: onChangeHandler,
      mask,
      maskType,
      validator,
      byCharValidator,
      required,
      label,
      placeholder,
      attributes,
      value: valuesState[name].value,
      valueOptions,
      minSymbols,
      maxSymbols,
      invalid: !!valuesState[name].invalid,
      highlightInput: higlightInputCallback,
      validationMessage,
      alwaysShowTip,
    });
    console.log(newInput);
    let newInputsState = { ...inputsState, [inputName]: newInput };
    console.log(newInputsState);
    onInputsUpdate(newInputsState);
    return newInputsState;
  }

  function createValues(inputsProps, valuesState) {
    const valuesData = {};
    inputsProps.forEach((input) => {
      valuesData[input.name] = {
        id: input.name,
        value: input.defaultValue || input.value,
        required: input.required,
        defaultValue: setFormDefaultValue(valuesState, input),
      };
    });

    return { ...valuesState, ...valuesData };
  }
  let {
    inputs: inputsProps,
    onInputsUpdate,
    onSubmit: onSubmitHandler,
  } = props;

  let reducer = (state, { type, data }) => {
    let { inputs, values } = state;
    switch (type) {
      case 'updateInput':
        return {
          ...state,
          inputs: {
            ...updateInput(inputsProps, data.name, values, inputs),
          },
        };
      case 'updateValue':
        return {
          ...state,
          values: {
            ...state.values,
            ...updateValue(data.name, values[data.name], data.value),
          },
        };
      case 'createInputs':
        return {
          ...state,
          inputs: createInputs(inputsProps, values, onInputsUpdate),
        };
      case 'createValues':
        return { ...state, values: createValues(inputsProps, values) };
      case 'highlightInput':
        return {
          ...state,
          values: { ...state.values, ...highlightInput(values[data.name]) },
        };
    }
  };

  let [state, dispatch] = useReducer(reducer, { inputs: {}, values: {} });

  let actions = {
    updateInput: (name, value) =>
      dispatch({ type: 'updateInput', data: { name, value } }),
    updateValue: (name, value) =>
      dispatch({ type: 'updateValue', data: { name, value } }),
    createInputs: () => dispatch({ type: 'createInputs' }),
    createValues: () => dispatch({ type: 'createValues' }),
  };

  useEffect(() => {
    actions.createValues();
  }, [inputsProps]);

  useEffect(() => {
    console.log(state.values);
    console.log(state);
    actions.createInputs();
  }, [state.values]);

  function getInput(name) {
    const { input } = state;
    return input[name];
  }

  function updateValue(name, valueItem, newValue) {
    console.log(valueItem.name);
    return { [name]: { ...valueItem, value: newValue } };
  }

  function updateValueCallback(name, value) {
    console.log(name);
    actions.updateValue(name, value);
  }

  function successNotification(title, message) {
    const { showNotifications } = this.props;
    if (showNotifications === 'all') {
      notify('success', title, message);
    }
  }

  function errorNotification(title, message) {
    console.trace();
    const { showNotifications } = this.props;

    if (showNotifications !== 'hideAll') {
      notify('error', title, message);
    }
  }

  function onValidationFail(input) {
    this.highlightInput(input.name);
    errorNotification(
      input.description || input.label || input.name,
      input.validationMessage
    );
    return false;
  }

  function highlightInput(input) {
    //TODO update inputs
    //TODO unhighlight after 3000ms
    return { [input.name]: { ...input, invalid: true } };
  }

  function unhighlightInput(input) {
    //TODO update inputs
    return { [input.name]: { ...input, invalid: false } };
  }

  function onResponseReceived(response) {
    if (response) {
      if (response.status === 200) {
        this.successNotification('Success', 'Data sent and accepted by server');
      } else if (response.status) {
        this.errorNotification('Server error', response && response.toString());
      }
    }
  }

  function onResponseError(error) {
    this.errorNotification(
      'Server error',
      error.response ? error.response.data.Message : error.toString()
    );
  }

  function onSubmit(event) {
    const { values } = state;
    const { inputs } = props;
    if (onSubmitHandler === null) {
      event.preventDefault();
      return;
    }

    if (onSubmitHandler) {
      event.preventDefault();
    }

    if (validateForm(values, inputs, onValidationFail)) {
      if (onSubmitHandler) {
        onSubmitHandler(formatFormValues(values))
          .then(onResponseReceived)
          .catch(onResponseError);
      }
    }
  }

  const { method, action, className, style, submitButton, children } = props;
  const { inputs } = state;
  return (
    <>
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
    </>
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
