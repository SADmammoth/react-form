import React, { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useTheme, createUseStyles } from 'react-jss';

import Validator from '@/Validator';
import compareObjects from '@/helpers/compareObjects';
import theme from '@/styles/theme';

import styles from './TextArea.styles';

const useStyles = createUseStyles(styles);

function TextArea(props) {
  const classes = useStyles(theme);

  const {
    id,
    type,
    name,
    // description,
    onInput,
    onChange,
    required,
    attributes,
    value,
    minSymbols,
    maxSymbols,
    onError,
    placeholder,
    render,
  } = props;

  const [placeholderOn, switchPlaceholder] = useState(!!placeholder);

  const onFocus = useCallback(() => {
    if (placeholderOn) {
      switchPlaceholder(false);
    }
  }, [value, placeholderOn]);

  useEffect(() => {
    if (value) switchPlaceholder(false);
  }, [value]);

  useEffect(() => {
    if (!value && !placeholderOn) {
      switchPlaceholder(true);
    }
  }, []);

  const onInputHandler = (event) => {
    if (!Validator.charCountValidator(event.target.value, maxSymbols)) {
      event.preventDefault();
      return;
    }
    onInput(event);
  };

  const onChangeHandler = useCallback(
    (event) => {
      if (
        Validator.charCountValidator(event.target.value, maxSymbols, minSymbols)
      ) {
        onChange(event);
      } else {
        onError(event);
      }
      if (!value) {
        switchPlaceholder(true);
      }
    },
    [value],
  );

  const InputTag = render.Input || 'textarea';

  return (
    <InputTag
      id={id}
      type={type}
      className={classNames(classes.textarea, {
        [classes.placeholdered]: placeholderOn,
      })}
      name={name}
      onChange={onInputHandler}
      onBlur={onChangeHandler}
      required={required && 'required'}
      {...attributes}
      value={placeholderOn ? placeholder : value}
      onFocus={onFocus}
    />
  );
}

TextArea.defaultProps = {
  onInput: () => {},
  onChange: () => {},
  value: '',
  required: false,
  attributes: null,
  description: null,
  minSymbols: 0,
  maxSymbols: 0,
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  attributes: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string,
  minSymbols: PropTypes.number,
  maxSymbols: PropTypes.number,
  onError: PropTypes.func.isRequired,
  render: PropTypes.shape({
    Input: PropTypes.any,
  }),
};

export default React.memo(TextArea, compareObjects);
