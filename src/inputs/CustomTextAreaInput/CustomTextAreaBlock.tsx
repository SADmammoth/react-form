import React, { ReactEventHandler, useState } from 'react';
import { css } from '@emotion/react';
import { ReactComponentLike, ReactNodeLike } from 'prop-types';
import { genrateRandomString } from '../../helpers/generateRandomString';
import { useStateArray } from '../../hooks/useStateArray';
import {
  IMacros,
  MacrosCollection,
} from '../../types/InputsProps/inputTypes/ICustomTextAreaInputProps';
import NestedTextInput from './NestedTextInput';
import { useCommandEffectHandler } from './useCommandEffectHandler';

export interface ICustomTextAreaBlockProps {
  id: string;
  value?: string;
  isActive?: boolean;
  baseComponent?: ReactComponentLike;
  placeholder?: string;
  macrosCollection: MacrosCollection;
  onChange: (value: string) => void;
  onInput: (value: string) => void;
  closingCommands?: string[];
}

interface ISimpleInputProps {
  id: string;
  value?: string;
  baseComponent: ReactComponentLike;
  placeholder?: string;
  onChange: (value: string) => string;
  onInput: (value: string, valueDiff: string) => string;
}

const SimpleInput = React.forwardRef<HTMLElement, ISimpleInputProps>(
  (
    { id, value, placeholder, baseComponent: BaseComponent, onInput, onChange },
    ref,
  ) => {
    const eventHandler =
      (callback: (value: string) => string) => (event: Event) => {
        const target = event.target as HTMLElement;
        if (!target) return;
        const newValue = callback(target.innerHTML);
        if (newValue !== target.innerHTML) {
          target.innerHTML = newValue;
        }
      };

    return (
      <BaseComponent
        ref={ref}
        id={id}
        css={css`
          display: inline-block;
        `}
        onKeyUp={(event: KeyboardEvent) => {
          eventHandler((value) => onInput(value, event.key))(event);
        }}
        onBlur={eventHandler(onChange)}
        contentEditable={true}>
        {value ?? placeholder}
      </BaseComponent>
    );
  },
);

type ComponentParams = {
  id: string;
  backtrackOverflow?: string;
  command: IMacros;
};

const commandPartialCheck = (
  commandToCheck: string,
  commandsInputBuffer: string,
) => {
  if (commandToCheck.length >= commandsInputBuffer.length) {
    return null;
  }
  for (let i = commandToCheck.length; i < commandsInputBuffer.length; i++) {
    console.log(i, commandToCheck, commandsInputBuffer.substring(0, i));
    if (commandToCheck === commandsInputBuffer.substring(0, i)) {
      return commandsInputBuffer.substring(i, commandsInputBuffer.length);
    }
  }
  return null;
};

const checkForCommands = (
  commandsInputBuffer: string,
  macrosCollection: MacrosCollection,
): IMacros[] | null => {
  const foundCommands = Object.values(macrosCollection).filter(
    ({ openingCommand }) => {
      return openingCommand.startsWith(commandsInputBuffer);
    },
  );
  return foundCommands.length ? foundCommands : null;
};

const CustomTextAreaBlock = React.forwardRef<
  HTMLInputElement,
  ICustomTextAreaBlockProps
>(
  (
    {
      isActive,
      baseComponent,
      placeholder,
      macrosCollection,
      onChange,
      onInput,
      closingCommands,
      id,
    },
    currentInput,
  ) => {
    const [contentParamsSet, addToContentParamsSet] =
      useStateArray<ComponentParams>([]);
    const [commandInputBuffer, setCommandInputBuffer] = useState('');
    const contentFromParams = useCommandEffectHandler(id);

    const internalOnInput = (value: string, valueDiff: string) => {
      let newValue = value;
      let newValueDisplay = value;
      const newCommandBuffer = commandInputBuffer + valueDiff;
      const detectedCommands = checkForCommands(
        newCommandBuffer,
        macrosCollection,
      );
      if (valueDiff.length > 1) {
        // Not a character
        setCommandInputBuffer('');
        onInput(value);
        return value;
      }
      if (detectedCommands) {
        if (detectedCommands.length === 1) {
          // Command detected
          const expectedCommand = detectedCommands[0].openingCommand;
          console.log('BOLD');
          addToContentParamsSet({
            id: id + '_' + genrateRandomString(),
            command: detectedCommands[0],
          });
          setCommandInputBuffer('');
        } else {
          // Multiple commands partial match detected, user is, possibly, typing a command
          console.log('SAVE', newCommandBuffer);
          setCommandInputBuffer(newCommandBuffer);
        }
      } else {
        //FIXME Dont use command buffer, to process case  * > * > backspace > any key
        const partialCommand = Object.values(macrosCollection)
          .filter(({ openingCommand }) =>
            commandPartialCheck(openingCommand, newCommandBuffer),
          )
          .reduce(
            (longestCommand, foundCommand) =>
              longestCommand === null ||
              foundCommand.openingCommand.length >
                longestCommand.openingCommand.length
                ? foundCommand
                : longestCommand,
            null as IMacros | null,
          );
        if (
          partialCommand &&
          newCommandBuffer.length - partialCommand.openingCommand.length === 1
        ) {
          // Command not detected, but user's previous input matched the command
          const backtrackOverflow = newCommandBuffer.substring(
            partialCommand.openingCommand.length,
            newCommandBuffer.length,
          );
          //Fix special actions (backspace, etc)
          console.log('BACKTRACK', partialCommand, backtrackOverflow);
          const overflowLength = backtrackOverflow.length;
          newValueDisplay = value.substring(
            0,
            value.length -
              overflowLength -
              partialCommand.openingCommand.length,
          );
          addToContentParamsSet({
            id: id + '_' + genrateRandomString(),
            command: partialCommand,
            backtrackOverflow,
          });
          setCommandInputBuffer('');
        }
      }
      onInput(newValue);
      return newValueDisplay;
    };

    const internalOnChange = (value: string) => {
      console.log('f', value);
      onChange(value);
      return value;
    };

    const BaseComponent = baseComponent || 'div';
    return (
      <BaseComponent>
        <SimpleInput
          ref={currentInput}
          id={id + '_initial'}
          baseComponent={'span'}
          onInput={internalOnInput}
          onChange={internalOnChange}
        />
        {contentParamsSet
          .map((contentParams) => {
            return [
              contentFromParams({
                ...contentParams,
                onInput: internalOnInput,
                onChange: internalOnChange,
                currentInputRef: currentInput,
              }),
              <SimpleInput
                key={id + '_input_' + contentParams.id}
                ref={currentInput}
                id={id + '_input_' + contentParams.id}
                baseComponent={'span'}
                onInput={internalOnInput}
                onChange={internalOnChange}
              />,
            ];
          })
          .flat()}
      </BaseComponent>
    );
  },
);

export default CustomTextAreaBlock;
