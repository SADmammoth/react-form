import React from 'react';

import PropTypes from 'prop-types';

import {
  CheckboxGroup,
  CustomNumber,
  File,
  Image,
  MarkdownText,
  MultipleFiles,
  MultipleImages,
  MultipleSearch,
  MultipleSelect,
  Password,
  Range,
  Search,
  Select,
  Slider,
  TextArea,
  TextInput,
  ActionButton,
} from '../customInputs';
import Tag from '@/generic/Tag';
import compareObjects from '@/helpers/compareObjects';
import LabeledInput from '@/wrappers/LabelledInput';
import MaskedInput from '@/wrappers/MaskedInput';

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
    render,
    markdownFeatures,
    allowScroll,
    accept,
    actionButton,
    min,
    max,
    step,
  } = props;

  const onError = (overriddenValidationMessage) => {
    console.log(validationMessage);
    highlightInput(name, overriddenValidationMessage || validationMessage);
  };

  const onChangeHandler = ({
    target: { name: targetName, value: targetValue },
  }) => {
    if (validator && highlightInput && !validator(value)) {
      onError();
    }
    onChange(targetName, targetValue);
  };

  const onInputHandler = ({
    target: { name: targetName, value: targetValue },
  }) => {
    onInput(targetName, targetValue);
  };

  function renderInput() {
    if (
      type === 'checkbox' ||
      type === 'radio' ||
      type === 'toggle' ||
      type === 'spoiler'
    ) {
      return LabeledInput(
        render,
        label,
        id,
        <CheckboxGroup
          id={id}
          type={type}
          name={name}
          description={description}
          onChange={onChangeHandler}
          onInput={onInputHandler}
          required={required}
          label={label}
          attributes={attributes}
          value={value}
          valueOptions={valueOptions}
          render={render}
        />,
      );
    }

    if (type === 'markdown') {
      return LabeledInput(
        render,
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
          render={render}
          markdownFeatures={markdownFeatures}
        />,
      );
    }

    if (type === 'number') {
      return LabeledInput(
        render,
        label,
        id,
        ActionButton(
          actionButton,
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
            render={render}
            min={min}
            max={max}
            step={step}
          />,
        ),
      );
    }

    if (type === 'select') {
      return LabeledInput(
        render,
        label,
        id,
        ActionButton(
          actionButton,
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
            render={render}
          />,
        ),
      );
    }

    if (type === 'select-multiple') {
      return LabeledInput(
        render,
        label,
        id,
        ActionButton(
          actionButton,
          id,
          <MultipleSelect
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
            render={render}
          />,
        ),
      );
    }

    if (type === 'search-multiple') {
      return LabeledInput(
        render,
        label,
        id,
        ActionButton(
          actionButton,
          id,
          <MultipleSearch
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
            render={render}
          />,
        ),
      );
    }

    if (type === 'textarea') {
      return LabeledInput(
        render,
        label,
        id,
        ActionButton(
          actionButton,
          id,
          <TextArea
            id={id}
            type={type}
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
            render={render}
          />,
        ),
      );
    }

    if (type === 'slider') {
      return LabeledInput(
        render,
        label,
        id,
        ActionButton(
          actionButton,
          id,
          <Slider
            id={id}
            type={type}
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
            render={render}
          />,
        ),
      );
    }

    if (type === 'range') {
      return LabeledInput(
        render,
        label,
        id,
        ActionButton(
          actionButton,
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
            render={render}
          />,
        ),
      );
    }

    if (type === 'search') {
      return LabeledInput(
        render,
        label,
        id,
        ActionButton(
          actionButton,
          id,
          <Search
            id={id}
            name={name}
            description={description}
            onChange={onChangeHandler}
            onInput={onInputHandler}
            required={required}
            attributes={attributes}
            value={value}
            valueOptions={valueOptions}
            placeholder={placeholder}
            render={render}
            allowScroll={allowScroll}
          />,
        ),
      );
    }

    if (type === 'password') {
      return LabeledInput(
        render,
        label,
        id,
        <Password
          id={id}
          name={name}
          description={description}
          onChange={onChangeHandler}
          onInput={onInputHandler}
          required={required}
          attributes={attributes}
          value={value}
          valueOptions={valueOptions}
          placeholder={placeholder}
          render={render}
          allowScroll={allowScroll}
        />,
      );
    }

    if (type === 'file') {
      return (
        <File
          id={id}
          name={name}
          accept={accept}
          description={description}
          onChange={onChangeHandler}
          onInput={onInputHandler}
          required={required}
          attributes={attributes}
          value={value}
          valueOptions={valueOptions}
          placeholder={placeholder}
          render={render}
          allowScroll={allowScroll}
          label={label}
        />
      );
    }

    if (type === 'file-multiple') {
      return (
        <MultipleFiles
          id={id}
          name={name}
          accept={accept}
          description={description}
          onChange={onChangeHandler}
          onInput={onInputHandler}
          required={required}
          attributes={attributes}
          value={value}
          valueOptions={valueOptions}
          placeholder={placeholder}
          render={render}
          allowScroll={allowScroll}
          label={label}
        />
      );
    }

    if (type === 'image') {
      return (
        <Image
          id={id}
          name={name}
          accept={accept}
          description={description}
          onChange={onChangeHandler}
          onInput={onInputHandler}
          required={required}
          attributes={attributes}
          value={value}
          valueOptions={valueOptions}
          placeholder={placeholder}
          render={render}
          allowScroll={allowScroll}
          label={label}
        />
      );
    }

    if (type === 'image-multiple') {
      return (
        <MultipleImages
          id={id}
          name={name}
          accept={accept}
          description={description}
          onChange={onChangeHandler}
          onInput={onInputHandler}
          required={required}
          attributes={attributes}
          value={value}
          valueOptions={valueOptions}
          placeholder={placeholder}
          render={render}
          allowScroll={allowScroll}
          label={label}
        />
      );
    }

    return LabeledInput(
      render,
      label,
      id,
      ActionButton(
        actionButton,
        id,
        MaskedInput(
          mask,
          byCharValidator,
          maskType,
          <TextInput
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            required={required && 'required'}
            onChange={onInputHandler}
            onBlur={onChangeHandler}
            validator={validator}
            byCharValidator={byCharValidator}
            value={value}
            render={render}
            invalid={invalid}
          />,
        ),
      ),
    );
  }

  return renderInput();
}

Input.publicDefaults = {
  label: false,
  placeholder: null,
  attributes: {},
  value: '',
  byCharValidator: () => true,
  validator: () => true,
  minSymbols: 0,
  maxSymbols: 1000,
  validationMessage: '',
  allowScroll: false,
  converters: {
    in: (inOut) => inOut,
    out: (outIn) => outIn,
  },
};

Input.defaultProps = {
  onInput: () => {},
  onChange: () => {},
  required: false,
  highlightInput: () => {},
  render: {
    // eslint-disable-next-line no-unused-vars
    Loader: (size, centered) => 'Loading...',
    Input: (props) => <input {...props} />,
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    Label: (props) => <label {...props} />,
    Tag: (props) => <Tag {...props} />,
    passwordBullet: '\u2022',
  },
  ...Input.publicDefaults,
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
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  value: PropTypes.any,
  valueOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    PropTypes.func,
  ]),
  minSymbols: PropTypes.number,
  maxSymbols: PropTypes.number,
  mask: PropTypes.string,
  maskType: PropTypes.string,
  byCharValidator: PropTypes.func,
  validator: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  validationMessage: PropTypes.string,
  alwaysShowTip: PropTypes.bool,
  editable: PropTypes.bool,
  markdownFeatures: PropTypes.object,
  allowScroll: PropTypes.bool,
  converters: {
    in: PropTypes.func,
    out: PropTypes.func,
  },
  accept: PropTypes.string,
  actionButton: { label: PropTypes.node, action: PropTypes.func },
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  required: PropTypes.bool,
  invalid: PropTypes.bool.isRequired,
  highlightInput: PropTypes.func,
  render: PropTypes.shape({
    Input: PropTypes.any,
    Loader: PropTypes.func,
    Label: PropTypes.any,
    Option: PropTypes.any,
    Tag: PropTypes.any,
    passwordBullet: PropTypes.string,
  }),
  ...Input.publicProps,
};

export default React.memo(Input, compareObjects);
