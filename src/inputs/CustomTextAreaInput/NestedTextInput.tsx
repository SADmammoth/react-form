import React from 'react';
import { ReactComponentLike, ReactNodeLike } from 'prop-types';
import { IMacros } from 'src/types/InputsProps/inputTypes/ICustomTextAreaInputProps';

interface INestedTextInputProps {
  id: string;
  wrapper: ReactComponentLike;
  command: IMacros;
  onInput: (value: string) => void;
  onChange: (value: string, focusNext?: boolean) => void;
  placeholder: string;
  closingCommands?: string[] | null;
}

const NestedTextInput = React.forwardRef<HTMLElement, INestedTextInputProps>(
  (
    { id, wrapper, placeholder, onInput, onChange, closingCommands },
    currentInput,
  ) => {
    const Wrapper = wrapper;

    const internalOnInput = (value: string, valueDiff: string) => {
      // Use command detector
      onInput(value);
      return value;
    };

    const input = (
      <input
        type="text"
        placeholder={placeholder}
        onKeyUp={(event) => {
          const target = event.currentTarget;
          target.value = internalOnInput(target.value, event.key);
        }}
        onBlur={(event) => onChange(event.target.value, false)}
      />
    );

    return wrapper ? <Wrapper>{input}</Wrapper> : input;
  },
);

export default NestedTextInput;
