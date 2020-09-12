import React, { Fragment } from 'react';
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

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {}, // Store values of inputs (for internal use)
      inputs: {}, // Store inputs components (for external use)
    };

    this.updateValue = this.updateValue.bind(this);
    this.onValidationFail = this.onValidationFail.bind(this);
    this.highlightInput = this.highlightInput.bind(this);
    this.unhighlightInput = this.unhighlightInput.bind(this);
    this.onResponseReceived = this.onResponseReceived.bind(this);
    this.onResponseError = this.onResponseError.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps, prevState) {
    const { inputs } = this.props;
    const { values } = this.state;

    if (
      !compareObjects(prevProps.inputs, inputs) ||
      Object.keys(values).length !== inputs.length ||
      !compareObjects(prevState.values, values)
    ) {
      this.update();
    }
  }

  // eslint-disable-next-line react/sort-comp
  update() {
    this.createValues();
    this.createInputs();
  }

  getInput(name) {
    const { input } = this.state;
    return input[name];
  }

  updateValue(name, value) {
    const { values } = this.state;
    values[name].value = value;

    this.setState({ values });
    this.createInputs();
  }

  createValue(id, type, name) {
    this.setState((state) => ({
      ...state,
      values: { ...state.values, [name]: { type, id } },
    }));
  }

  createValues() {
    const { inputs } = this.props;
    const { values } = this.state;
    const valuesData = {};
    inputs.forEach((input) => {
      valuesData[input.name] = {
        id: input.name,
        value: input.defaultValue || input.value,
        required: input.required,
        defaultValue: setFormDefaultValue(values, input),
      };
    });

    this.setState({ values: valuesData });
  }

  createInputs() {
    const { values } = this.state;
    const { inputs, onInputsUpdate } = this.props;

    if (!Object.keys(values).length) {
      return;
    }

    const inputsData = {};
    inputs.forEach(
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
        const higlightInputCallback = () => this.highlightInput(name);

        const onChangeHandler = (inputName, value) => {
          if (onChange) {
            onChange(inputName, value);
          }
          this.updateValue(inputName, value);
        };

        const onInputHandler = (inputName, value) => {
          if (onInput) {
            onInput(inputName, value);
          }
          this.updateValue(inputName, value);
        };

        inputsData[name] = CreateInput({
          id: values[name].id,
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
          value: values[name].value,
          valueOptions,
          minSymbols,
          maxSymbols,
          invalid: !!values[name].invalid,
          highlightInput: higlightInputCallback,
          validationMessage,
          alwaysShowTip,
        });

        onInputsUpdate(inputsData);

        this.setState({ inputs: inputsData });
      }
    );
  }
  // * -end- Create Inputs

  successNotification(title, message) {
    const { showNotifications } = this.props;
    if (showNotifications === 'all') {
      notify('success', title, message);
    }
  }

  errorNotification(title, message) {
    console.trace();
    const { showNotifications } = this.props;

    if (showNotifications !== 'hideAll') {
      notify('error', title, message);
    }
  }

  onValidationFail(input) {
    this.highlightInput(input.name);
    errorNotification(
      input.description || input.label || input.name,
      input.validationMessage
    );
    return false;
  }

  highlightInput(name) {
    const { values } = this.state;

    values[name].invalid = true;
    this.setState({ values }, () => this.createInputs());
    setTimeout(() => this.unhighlightInput(name), 3000);
  }

  unhighlightInput(name) {
    const { values } = this.state;
    values[name].invalid = false;
    this.setState({ values }, () => this.createInputs());
  }

  onResponseReceived(response) {
    if (response) {
      if (response.status === 200) {
        this.successNotification('Success', 'Data sent and accepted by server');
      } else if (response.status) {
        this.errorNotification('Server error', response && response.toString());
      }
    }
  }

  onResponseError(error) {
    this.errorNotification(
      'Server error',
      error.response ? error.response.data.Message : error.toString()
    );
  }

  onSubmit(event) {
    const { values } = this.state;
    const { onSubmit: onSubmitHandler, inputs } = this.props;
    if (onSubmitHandler === null) {
      event.preventDefault();
      return;
    }

    if (onSubmitHandler) {
      event.preventDefault();
    }

    if (validateForm(values, inputs, this.onValidationFail)) {
      if (onSubmitHandler) {
        onSubmitHandler(formatFormValues(values))
          .then(this.onResponseReceived)
          .catch(this.onResponseError);
      }
    }
  }

  render() {
    const {
      method,
      action,
      className,
      style,
      submitButton,
      children,
    } = this.props;
    const { inputs } = this.state;
    return (
      <>
        <form
          method={method}
          action={action}
          className={`form ${className}` || ''}
          style={{ ...style }}
          onSubmit={this.onSubmit}
        >
          {children || (
            <ul>
              {Object.entries(inputs).map(([name, input]) => (
                <li key={name}>{input}</li>
              ))}
            </ul>
          )}
          {React.cloneElement(submitButton, { type: 'submit' })}
        </form>
      </>
    );
  }
}

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
