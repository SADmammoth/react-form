import React from 'react';
import PropTypes from 'prop-types';
import CheckboxGroup from './CustomInputs/CheckboxGroup';
import Select from './CustomInputs/Select';
import TextArea from './CustomInputs/TextArea';
import compareObjects from '../helpers/compareObjects';
import MaskedInput from './MaskedInput';
import LabeledInput from './LabeledInput';
import CustomNumber from './CustomInputs/CustomNumber';
import Slider from './CustomInputs/Slider';
import Range from './CustomInputs/Range';
import MarkdownText from './CustomInputs/MarkdownText';

function Input(props) {
  const {
    id,
    type,
    name,
    description,
    onChange,
    onInput,
    required,
    label,
    placeholder,
    attributes,
    value,
    byCharValidator,
    validator,
    valueOptions,
    minSymbols,
    maxSymbols,
    mask,
    maskType,
    invalid,
    valueSet,
    highlightInput,
    validationMessage,
    alwaysShowTip,
    editable,
    renderLoader,
  } = props;

  const onChangeHandler = ({
    target: { name: targetName, value: targetValue },
  }) => {
    if (!validator(value)) {
      highlightInput();
    }
    onChange(targetName, targetValue);
  };

  const onInputHandler = ({
    target: { name: targetName, value: targetValue },
  }) => {
    onInput(targetName, targetValue);
  };

  const onKeyPressHandler = (event) => {
    const {
      target: { value: targetValue },
      key,
    } = event;

    if (!byCharValidator(targetValue + key)) {
      event.preventDefault();
    }
  };

  const onError = () => {
    highlightInput();
  };

  function renderInput() {
    if (
      type === 'checkbox' ||
      type === 'radio' ||
      type === 'toggle' ||
      type === 'spoiler'
    ) {
      return LabeledInput(
        label,
        id,
        <CheckboxGroup
          id={id}
          type={type}
          name={name}
          description={description}
          onKeyPress={onKeyPressHandler}
          onChange={onChangeHandler}
          onInput={onInputHandler}
          required={required}
          label={label}
          attributes={attributes}
          value={value}
          valueOptions={valueOptions}
          renderLoader={renderLoader}
        />
      );
    }

    if (type === 'markdown') {
      return LabeledInput(
        label,
        id,
        <MarkdownText
          id={id}
          type={type}
          name={name}
          description={description}
          onChange={onChangeHandler}
          onInput={onInputHandler}
          required={required}
          attributes={attributes}
          value={value}
          editable={editable}
        />
      );
    }

    if (type === 'number') {
      return LabeledInput(
        label,
        id,
        <CustomNumber
          id={id}
          type={type}
          name={name}
          description={description}
          onChange={onChangeHandler}
          onInput={onInputHandler}
          required={required}
          attributes={attributes}
          value={value}
          placeholder={placeholder}
        />
      );
    }

    if (type === 'select') {
      return LabeledInput(
        label,
        id,
        <Select
          id={id}
          type={type}
          name={name}
          description={description}
          onChange={onChangeHandler}
          onInput={onInputHandler}
          required={required}
          attributes={attributes}
          value={value}
          valueOptions={valueOptions}
          placeholder={placeholder}
          renderLoader={renderLoader}
        />
      );
    }
    if (type === 'textarea') {
      return LabeledInput(
        label,
        id,
        <TextArea
          id={id}
          name={name}
          description={description}
          onChange={onChangeHandler}
          onInput={onInputHandler}
          onError={onError}
          required={required}
          attributes={attributes}
          value={value}
          minSymbols={minSymbols}
          maxSymbols={maxSymbols}
          placeholder={placeholder}
        />
      );
    }

    if (type === 'slider') {
      return LabeledInput(
        label,
        id,
        <Slider
          id={id}
          name={name}
          description={description}
          onChange={onChangeHandler}
          onInput={onInputHandler}
          required={required}
          attributes={attributes}
          value={value}
          valueSet={valueSet}
          valueOptions={valueOptions}
          placeholder={placeholder}
          alwaysShowTip={alwaysShowTip}
        />
      );
    }

    if (type === 'range') {
      return LabeledInput(
        label,
        id,
        <Range
          id={id}
          name={name}
          description={description}
          onChange={onChangeHandler}
          onInput={onInputHandler}
          required={required}
          attributes={attributes}
          value={value}
          valueSet={valueSet}
          valueOptions={valueOptions}
          placeholder={placeholder}
          alwaysShowTip={alwaysShowTip}
        />
      );
    }

    return LabeledInput(
      label,
      id,
      MaskedInput(
        mask,
        byCharValidator,
        maskType,
        <input
          id={id}
          type={type}
          name={name}
          className={`form-control${invalid ? ' invalid' : ''}`}
          placeholder={placeholder}
          required={required && 'required'}
          onKeyPress={onKeyPressHandler}
          onChange={onInputHandler}
          onBlur={onChangeHandler}
          {...attributes}
          value={value}
        />
      )
    );
  }

  return renderInput();
}

Input.defaultProps = {
  onInput: () => {},
  onChange: () => {},
  required: false,
  label: false,
  placeholder: null,
  attributes: {},
  value: '',
  byCharValidator: () => true,
  validator: () => true,
  minSymbols: 0,
  maxSymbols: 1000,
  highlightInput: () => {},
  validationMessage: '',
  renderLoader: (size, centered) => 'Loading...',
};

Input.publicProps = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  placeholder: PropTypes.string,
  attributes: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  value: PropTypes.any,
  valueOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    PropTypes.func,
  ]),
  minSymbols: PropTypes.number,
  maxSymbols: PropTypes.number,
  mask: PropTypes.string,
  maskType: PropTypes.string,
  byCharValidator: PropTypes.func,
  validator: PropTypes.func,
  validationMessage: PropTypes.string,
  alwaysShowTip: PropTypes.bool,
  editable: PropTypes.bool,
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  required: PropTypes.bool,
  invalid: PropTypes.bool.isRequired,
  highlightInput: PropTypes.func,
  renderLoader: PropTypes.func,
  ...Input.publicProps,
};

export default React.memo(Input, compareObjects);
