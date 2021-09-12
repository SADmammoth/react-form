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
import LabelledInput from '@/wrappers/LabelledInput';
import MaskedInput from '@/wrappers/MaskedInput';

function Input(props) {
  const {
    id,
    type,
    name,
    className,
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
      return LabelledInput(
        render,
        label,
        id,
        <CheckboxGroup
          className={className}
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
      return LabelledInput(
        render,
        label,
        id,
        <MarkdownText
          className={className}
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
      return LabelledInput(
        render,
        label,
        id,
        ActionButton(
          actionButton,
          id,
          render,
          <CustomNumber
            className={className}
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
      return LabelledInput(
        render,
        label,
        id,
        ActionButton(
          actionButton,
          id,
          render,
          <Select
            className={className}
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
      return LabelledInput(
        render,
        label,
        id,
        ActionButton(
          actionButton,
          id,
          render,
          <MultipleSelect
            className={className}
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
      return LabelledInput(
        render,
        label,
        id,
        ActionButton(
          actionButton,
          id,
          render,
          <MultipleSearch
            className={className}
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
      return LabelledInput(
        render,
        label,
        id,
        ActionButton(
          actionButton,
          id,
          render,
          <TextArea
            className={className}
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
      return LabelledInput(
        render,
        label,
        id,
        ActionButton(
          actionButton,
          id,
          render,
          <Slider
            className={className}
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
      return LabelledInput(
        render,
        label,
        id,
        ActionButton(
          actionButton,
          id,
          render,
          <Range
            className={className}
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
      return LabelledInput(
        render,
        label,
        id,
        ActionButton(
          actionButton,
          id,
          render,
          <Search
            className={className}
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
      return LabelledInput(
        render,
        label,
        id,
        <Password
          className={className}
          id={id}
          name={name}
          description={description}
          onChange={onChangeHandler}
          onInput={onInputHandler}
          required={required}
          attributes={attributes}
          value={value}
          placeholder={placeholder}
          render={render}
        />,
      );
    }

    if (type === 'file') {
      return (
        <File
          className={className}
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
          className={className}
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
          className={className}
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
          className={className}
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

    return LabelledInput(
      render,
      label,
      id,
      ActionButton(
        actionButton,
        id,
        render,
        MaskedInput(
          mask,
          byCharValidator,
          maskType,
          <TextInput
            className={className}
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            required={required && 'required'}
            onChange={onInputHandler}
            onBlur={onChangeHandler}
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
  className: '',
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
  className: PropTypes.string,
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
  converters: PropTypes.shape({
    in: PropTypes.func,
    out: PropTypes.func,
  }),
  accept: PropTypes.string,
  actionButton: PropTypes.shape({
    label: PropTypes.node,
    action: PropTypes.func,
  }),
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
