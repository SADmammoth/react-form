import React, { useEffect, useState } from 'react';
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

  let onFocus = (event) => {
    switchPlaceholder(false);
    event.target.value = value;
  };

  let [placeholderOn, switchPlaceholder] = useState(false);

  useEffect(() => {
    if (!value) {
      switchPlaceholder(true);
    }
  }, []);

  const onChangeHandler = (event) => {
    if (checkCharsCount(event.target.value, minSymbols, maxSymbols)) {
      onChange(event);
    } else {
      onError(event);
    }
    if (!value) {
      switchPlaceholder(true);
    }
  };
  const defaultInput = (props) => <input {...props} />;
  const InputTag = render.input || defaultInput;

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
    >
      {description}
    </InputTag>
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
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  }),
};

export default React.memo(TextArea, compareObjects);
