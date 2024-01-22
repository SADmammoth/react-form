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
  ({ wrapper, commandId, activeCommand, onClose, onChange }, ref) => {
    const Wrapper = wrapper;

    return (
      <Wrapper
        contentEditable={true}
        key={commandId}
        //@ts-ignore
        ref={ref}
        //@ts-ignore
        onKeyUp={(event) => {
          const detectedCommand = filterCommands(event.target.innerHTML, {
            activeCommand,
          });
          if (detectedCommand) {
            event.target.innerHTML = event.target.innerHTML.replace(
              activeCommand.openingCommand,
              '',
            );
            onClose(event.target.innerHTML + activeCommand.openingCommand);
            return;
          }
          console.log('fwer', event.target.innerHTML);
          onChange(event.target.innerHTML);
        }}
        // //@ts-ignore
        // onBlur={(event) => {
        //   //@ts-ignore
        //   event.target.innerHTML = event.target.innerHTML.replace(
        //     activeCommand.openingCommand,
        //     '',
        //   );
        // }}
      ></Wrapper>
    );
  },
);

export default NestedTextInput;
