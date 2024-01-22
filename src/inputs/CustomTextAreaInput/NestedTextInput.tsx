import React, { useState } from 'react';
import { ReactComponentLike, ReactNodeLike } from 'prop-types';
import { IMacros } from 'src/types/InputsProps/inputTypes/ICustomTextAreaInputProps';
import { filterCommands } from './filterCommands';

type TextInputPlaceholderProps = {
  wrapper: ReactComponentLike;
  content: string;
};

const TextInputPlaceholder = ({
  wrapper,
  content,
}: TextInputPlaceholderProps) => {
  const Wrapper = wrapper;
  return <Wrapper>{content}</Wrapper>;
};

type NestedTextInputProps = {
  wrapper: ReactComponentLike;
  commandId: string;
  activeCommand: IMacros;
  onChange: (value: string) => void;
  onClose: (finalValue: string, placeholderElement?: ReactNodeLike) => void;
  isActive: boolean;
};

const NestedTextInput = React.forwardRef<HTMLElement, NestedTextInputProps>(
  ({ wrapper, commandId, activeCommand, onClose, onChange, isActive }, ref) => {
    const Wrapper = wrapper;

    const changeHandler = (event: any) => {
      const detectedCommand = filterCommands(event.target.innerHTML, {
        activeCommand,
        closing: { openingCommand: '\n' } as IMacros,
      });
      if (detectedCommand) {
        event.target.innerHTML = event.target.innerHTML.replace(
          activeCommand.openingCommand,
          '',
        );
        onClose(event.target.innerHTML + activeCommand.openingCommand);
        return;
      }
      onChange(event.target.innerHTML);
    };

    return (
      <Wrapper
        contentEditable={true}
        key={commandId}
        //@ts-ignore
        ref={ref}
        //@ts-ignore
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            const old = '' + event.target.innerHTML;
            event.target.innerHTML += '\n';
            changeHandler(event);
            event.target.innerHTML = old + '<br/>';
          }
        }}
        //@ts-ignore
        onKeyUp={changeHandler}
        //@ts-ignore
        onBlur={(event) => {
          if (isActive) {
            onClose(event.target.innerHTML + activeCommand.openingCommand);
          }
        }}></Wrapper>
    );
  },
);

export default NestedTextInput;
