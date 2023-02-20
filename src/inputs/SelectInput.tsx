import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Optional } from '../helpers/Optional';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import OptionList from './generic/OptionList';

const SelectInput = ({
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
  valueOptions,
}: InputComponentProps<InputsProps, InputType.Select>) => {
  const id = formId + name;

  const inputStyle = style ? style.root : null;
  const inputBoxStyle = style ? style.inputBox : null;
  const labelStyle = style ? style.label : null;

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div css={inputBoxStyle}>
      <OptionList
        options={valueOptions.map((option) => {
          console.log('FF', option.value === value?.value);
          if (option.value === value?.value) {
            return { option, isActive: true };
          }
          return { option };
        })}
        id={id}
        onSelect={(option) => {
          console.log(option);
        }}
        show={isFocused}>
        <input
          css={inputStyle}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value?.label}
          list={name}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          // onChange={(event) => {
          //   //@ts-ignore
          //   event.target.value = updateValue(name, event.target.value);
          // }}
          // onBlur={(event) => {
          //   //@ts-ignore
          //   event.target.value = setValue(name, event.target.value);
          // }}
          disabled={disabled}
          required={required}
        />
      </OptionList>
      <Optional $={!!label}>
        <label htmlFor={id} css={labelStyle}>
          {label}
        </label>
      </Optional>
    </div>
  );
};

export default SelectInput;
