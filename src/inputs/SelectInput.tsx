import React, { useCallback, useState } from 'react';
import { css } from '@emotion/react';
import { Optional } from '../helpers/Optional';
import { EKeyboardKey } from '../types/EKeyboardKey';
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

  const findIndex = () => {
    return valueOptions.findIndex(
      ({ value: currValue }) => currValue === currentValue?.value,
    );
  };

  const [currentValue, setCurrentValue] = useState(value);

  const setCurrentValueByIndex = (index: number) => {
    if (index < 0 || index >= valueOptions.length) {
      return;
    }
    setCurrentValue(valueOptions[index]);
  };

  const c = useCallback(
    (event) => {
      console.log(event.key, findIndex());
      switch (event.key) {
        case EKeyboardKey.ArrowDown: {
          setCurrentValueByIndex(findIndex() + 1);
          return;
        }
        case EKeyboardKey.ArrowUp: {
          setCurrentValueByIndex(findIndex() - 1);
          return;
        }
        case EKeyboardKey.Enter:
        case EKeyboardKey.Space: {
          if (isFocused) {
            setIsFocused(false);
            setValue(name, currentValue);
          } else {
            setIsFocused(true);
          }
          return;
        }
        default: {
          event.preventDefault();
        }
      }
    },
    [currentValue, isFocused],
  );

  return (
    <div css={inputBoxStyle}>
      <OptionList
        options={valueOptions.map((option) => {
          if (option.value === currentValue?.value) {
            return { option, isActive: true };
          }
          return { option };
        })}
        id={id}
        onSelect={(option) => {
          if (option?.value === value?.value) {
            if (required) {
              return;
            }
            setValue(name, undefined);
            return;
          }

          setValue(name, option);
        }}
        show={isFocused}>
        <input
          css={inputStyle}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={currentValue?.label}
          list={name}
          onClick={(event) => {
            setIsFocused(!isFocused);
            event.preventDefault();
          }}
          onBlur={(event) => {
            setIsFocused(false);
            event.preventDefault();
          }}
          onPaste={(event) => event.preventDefault()}
          onFocus={(event) => event.preventDefault()}
          onMouseDown={(event) => event.preventDefault()}
          onKeyDown={c}
          disabled={disabled}
          required={required}
        />
      </OptionList>
      <Optional $={!!label}>
        <label
          htmlFor={id}
          onPaste={(event) => event.preventDefault()}
          onFocus={(event) => event.preventDefault()}
          onMouseDown={(event) => event.preventDefault()}
          onClick={(event) => {
            setIsFocused(!isFocused);
            event.preventDefault();
          }}
          css={isFocused ? [labelStyle, style?.labelActive] : labelStyle}>
          {label}
        </label>
      </Optional>
    </div>
  );
};

export default SelectInput;
