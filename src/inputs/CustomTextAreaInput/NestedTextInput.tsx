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
  onClose: (placeholderElement?: ReactNodeLike) => void;
  isActive: boolean;
};

const NestedTextInput = React.forwardRef<HTMLElement, NestedTextInputProps>(
  ({ wrapper, commandId, activeCommand, onClose, isActive }, ref) => {
    const Wrapper = wrapper;

    const [content, setContent] = useState('');

    return isActive ? (
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
            console.log('' + event.target.innerHTML);
            event.target.innerHTML = event.target.innerHTML.replace(
              activeCommand.openingCommand,
              '',
            );
            console.log('' + event.target.innerHTML);
            onClose(
              <TextInputPlaceholder
                wrapper={wrapper}
                content={event.target.innerHTML}
              />,
            );
          }
          setContent(event.target.innerHTML);
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
    ) : (
      <TextInputPlaceholder wrapper={wrapper} content={content} />
    );
  },
);

export default NestedTextInput;
