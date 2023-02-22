import React, { useCallback, useState } from 'react';
import { css } from '@emotion/react';
import { Optional } from '../helpers/Optional';
import { EKeyboardKey } from '../types/EKeyboardKey';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { ValueOption } from '../types/InputsProps/atomic/ValueOptions';
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
  allowMultiple,
}: InputComponentProps<InputsProps, InputType.Select>) => {
  const id = formId + name;

  const inputStyle = style ? style.root : null;
  const inputBoxStyle = style ? style.inputBox : null;
  const labelStyle = style ? style.label : null;

  const [isFocused, setIsFocused] = useState(false);

  // const [currentValue, setCurrentValue] = useState(value);

  const setCurrentValue = (value?: ValueOption[]) => {
    setValue(name, value);
  };

  const currentValue = value;

  const isValueSelected = (currValue: string) =>
    !!currentValue?.find(({ value }) => currValue === value);

  const findSelectedIndex = () => {
    return valueOptions.findIndex(({ value: currValue }) =>
      isValueSelected(currValue),
    );
  };

  const findIndex = (value: string) => {
    return valueOptions.findIndex(
      ({ value: currValue }) => currValue === value,
    );
  };

  const setCurrentValueOption = (valueOption: ValueOption) => {
    const isSelected = isValueSelected(valueOption?.value);
    if (!allowMultiple) {
      if (isSelected) {
        setCurrentValue(undefined);
        return;
      }
      setCurrentValue([valueOption]);
      return;
    }
    if (currentValue && !required && isSelected) {
      if (currentValue.length === 1) {
        setCurrentValue(undefined);
        return;
      }
      const index = currentValue?.findIndex(
        ({ value }) => valueOption.value === value,
      );
      setCurrentValue([
        ...currentValue.slice(0, index),
        ...currentValue.slice(index + 1, currentValue.length),
      ]);
      return;
    }
    if (!currentValue) {
      setCurrentValue([valueOption]);
      return;
    }
    setCurrentValue([...currentValue, valueOption]);
  };

  const sendCurrentValue = useCallback(() => {
    setCurrentValue(value);
  }, []);

  const c = useCallback(
    (event) => {
      event.preventDefault();
      const index = findSelectedIndex();
      if (index < 0 || index >= valueOptions.length) {
        return;
      }
      switch (event.key) {
        case EKeyboardKey.ArrowDown: {
          setCurrentValueOption(valueOptions[index + 1]);
          return;
        }
        case EKeyboardKey.ArrowUp: {
          setCurrentValueOption(valueOptions[index - 1]);
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
      }
    },
    [currentValue, isFocused],
  );

  return (
    <div css={inputBoxStyle}>
      <OptionList
        options={valueOptions.map((option) => {
          if (isValueSelected(option?.value)) {
            return { option, isActive: true };
          }
          return { option };
        })}
        id={id}
        onSelect={(option) => {
          setCurrentValueOption(option);
          setIsFocused(false);
        }}
        show={isFocused}>
        <input
          css={inputStyle}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={currentValue?.map(({ label }) => label).join(', ')}
          list={name}
          onClick={(event) => {
            setIsFocused(!isFocused);
            // event.preventDefault();
          }}
          onBlur={(event) => {
            setIsFocused(false);
            // event.preventDefault();
          }}
          // onPaste={(event) => event.preventDefault()}
          // // onFocus={(event) => event.preventDefault()}
          // onMouseDown={(event) => event.preventDefault()}
          onKeyDown={c}
          disabled={disabled}
          required={required}
        />
      </OptionList>
      <Optional $={!!label}>
        <label
          htmlFor={id}
          // onPaste={(event) => event.preventDefault()}
          // // onFocus={(event) => event.preventDefault()}
          // onMouseDown={(event) => event.preventDefault()}
          onClick={(event) => {
            setIsFocused(!isFocused);
            // event.preventDefault();
          }}
          css={isFocused ? [labelStyle, style?.labelActive] : labelStyle}>
          {label}
        </label>
      </Optional>
    </div>
  );
};

export default SelectInput;
