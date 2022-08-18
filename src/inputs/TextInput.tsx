import React from 'react';
import { Optional } from '../helpers/Optional';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';

const TestInput = ({
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
}: InputComponentProps<InputsProps, InputType.Text>) => {
  const id = formId + name;

  return (
    <div>
      <input
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

export default TestInput;
