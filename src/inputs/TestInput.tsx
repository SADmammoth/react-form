import React from 'react';
import { CommonInputsComponentsProps } from '../types/InputsComponentsProps/CommonInputsComponentsProps';
import { InputPropsIntersection } from '../types/InputsProps/InputProps';
import { InputsProps } from '../types/InputsProps/InputsProps';

type Props = InputPropsIntersection &
  CommonInputsComponentsProps<InputsProps> & { name: string };

const TestInput = ({
  type,
  label,
  name,
  formId,
  placeholder,
  value,
  setValue,
  updateValue,
  ...props
}: Props) => {
  const id = formId + name;
  console.log(value);
  return (
    <div>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value as string}
        onInput={(event) => {
          //@ts-ignore
          updateValue(name, event.target.value);
          event.preventDefault();
        }}
        onChange={(event) => {
          //@ts-ignore
          setValue(name, event.target.value);
          event.preventDefault();
        }}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default TestInput;
