import React from 'react';
import { css } from '@emotion/react';
import { Optional } from '../helpers/Optional';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';

const TextInput = ({
  type,
  label,
  name,
  formId,
  placeholder,
  value,
  setValue,
  updateValue,
  disabled,
  required,
  style,
}: InputComponentProps<InputsProps, InputType.Text>) => {
  const id = formId + name;

  const cssProp = style ? style.root : null;

  return (
    <div>
      <input
        css={cssProp}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value as string}
        onChange={(event) => {
          //@ts-ignore
          updateValue(name, event.target.value);
          event.preventDefault();
        }}
        onBlur={(event) => {
          //@ts-ignore
          setValue(name, event.target.value);
          event.preventDefault();
        }}
        disabled={disabled}
        required={required}
      />
      <Optional $={!!label}>
        <label htmlFor={id}>{label}</label>
      </Optional>
    </div>
  );
};

export default TextInput;
