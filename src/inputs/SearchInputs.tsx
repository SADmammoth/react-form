import React, { useCallback, useState } from 'react';
import { css } from '@emotion/react';
import { Optional } from '../helpers/Optional';
import { EKeyboardKey } from '../types/EKeyboardKey';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { ValueOption } from '../types/InputsProps/atomic/ValueOptions';
import OptionList from './generic/OptionList';

const SearchInput = ({
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
  restrictedToOptions,
}: InputComponentProps<InputsProps, InputType.Search>) => {
  const id = formId + name;

  const inputStyle = style ? style.root : null;
  const inputBoxStyle = style ? style.inputBox : null;
  const labelStyle = style ? style.label : null;
  const focusedInputBox = style ? style.focusedInputBox : null;

  const [isFocused, setIsFocused] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchPrompt, setSearchPrompt] = useState('');
  const [selectedFromList, setSelectedFromList] = useState(false);

  const c = useCallback(
    (event) => {
      switch (event.key) {
        case EKeyboardKey.ArrowDown: {
          event.preventDefault();
          setCurrentIndex(currentIndex + 1);
          return;
        }
        case EKeyboardKey.ArrowUp: {
          event.preventDefault();
          setCurrentIndex(currentIndex - 1);
          return;
        }
        case EKeyboardKey.Enter:
        case EKeyboardKey.Space: {
          event.preventDefault();
          if (isFocused) {
            setIsFocused(false);
            setValue(name, valueOptions[currentIndex]);
          } else {
            setIsFocused(true);
          }
          return;
        }
      }
    },
    [currentIndex, isFocused],
  );

  return (
    <div css={isFocused ? focusedInputBox : inputBoxStyle}>
      <OptionList
        options={valueOptions.map((option) => {
          return { option };
        })}
        id={id}
        onSelect={(value) => {
          setValue(name, value.value);
          setSearchPrompt(value.label ?? '');
          setSelectedFromList(true);
        }}
        show={isFocused}
        searchPrompt={searchPrompt}>
        <input
          css={inputStyle}
          id={id}
          type="search"
          name={name}
          placeholder={placeholder}
          onInput={(event) => {}}
          onChange={(event) => {
            const input = event.target as HTMLInputElement;
            setSearchPrompt(input.value);
          }}
          list={name}
          onClick={(event) => {
            setIsFocused(!isFocused);
            // event.preventDefault();
          }}
          onBlur={(event) => {
            setIsFocused(false);

            if (selectedFromList) {
              setSelectedFromList(false);
            } else if (!restrictedToOptions) {
              const input = event.target as HTMLInputElement;
              setValue(name, input.value);
            } else {
              setValue(name, undefined);
              setSearchPrompt('');
            }
            // event.preventDefault();
          }}
          // onPaste={(event) => event.preventDefault()}
          // // onFocus={(event) => event.preventDefault()}
          // onMouseDown={(event) => event.preventDefault()}
          onKeyDown={c}
          disabled={disabled}
          required={required}
          value={searchPrompt ?? ''}
        />
      </OptionList>
      <Optional $={!!label}>
        <label
          htmlFor={id}
          // onPaste={(event) => event.preventDefault()}
          // // onFocus={(event) => event.preventDefault()}
          // onMouseDown={(event) => event.preventDefault()}
          onClick={(event) => {
            // setIsFocused(!isFocused);
            // event.preventDefault();
          }}
          css={isFocused ? [labelStyle, style?.labelActive] : labelStyle}>
          {label}
        </label>
      </Optional>
    </div>
  );
};

export default SearchInput;
