import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import checkCharsCount from '../../helpers/formHelpers/checkCharsCount';
import compareObjects from '../../helpers/compareObjects';

function TextArea(props) {
  const {
    id,
    type,
    name,
    description,
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

  let [placeholderOn, switchPlaceholder] = useState(false);

  let onFocus = useCallback(
    (event) => {
      if (placeholderOn) {
        switchPlaceholder(false);
      }
    },
    [value, placeholderOn]
  );

  useEffect(() => {
    console.log('mount');
    if (!value && !placeholderOn) {
      switchPlaceholder(true);
    }
  }, []);

  const onChangeHandler = useCallback(
    (event) => {
      console.log('blur');
      if (checkCharsCount(event.target.value, minSymbols, maxSymbols)) {
        onChange(event);
      } else {
        onError(event);
      }
      if (!value) {
        switchPlaceholder(true);
      }
    },
    [value]
  );

  const InputTag = render.Input || 'textarea';

  return (
    <InputTag
      id={id}
      type={type}
      className={`form-textarea${placeholderOn ? ' placeholdered' : ''}`}
      name={name}
      onChange={onInput}
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
    Input: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  }),
};

export default React.memo(TextArea, compareObjects);
