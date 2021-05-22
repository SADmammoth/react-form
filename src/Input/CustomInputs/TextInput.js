import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

function TextInput({
  name,
  type,
  invalid,
  value: currentValue,
  render,
  attributes,
  onChange,
  onBlur,
  ...props
}) {
  const InputTag = render.Input || 'input';
  const [value, setValue] = useState(currentValue);
  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  return (
    <InputTag
      name={name}
      type={type}
      className={`form-control${invalid ? ' invalid' : ''}`}
      value={value}
      onBlur={() => {}}
      onBlur={(event) => {
        setValue(event.target.value);
        onBlur(event);
      }}
      onChange={(event) => {
        setValue(event.target.value);
        onChange(event);
      }}
      {...attributes}
      {...props}
    />
  );
}

TextInput.propTypes = {};

export default TextInput;
