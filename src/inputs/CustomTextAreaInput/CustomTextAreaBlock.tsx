import React, { ReactEventHandler, UIEvent, useState } from 'react';
import { css } from '@emotion/react';
import { ReactComponentLike, ReactNodeLike } from 'prop-types';
import { genrateRandomString } from '../../helpers/generateRandomString';
import { regexEscape } from '../../helpers/regexExcape';
import { useStateArray } from '../../hooks/useStateArray';
import {
  IMacros,
  MacrosCollection,
} from '../../types/InputsProps/inputTypes/ICustomTextAreaInputProps';
import NestedTextInput from './NestedTextInput';
import {
  commandToMacros,
  macrosCollectionToCommands,
} from './helpers/macrosCollectionConverter';
import { removeCommandFromString } from './helpers/removeCommandFromString';
import {
  CommandDetectorStatus,
  useCommandDetector,
} from './hooks/useCommandDetector';
import { useCommandEffectHandler } from './hooks/useCommandEffectHandler';

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
  placeholder?: string;
  onChange: (value: string) => string;
  onInput: (value: string, valueDiff: string) => string;
}

const SimpleInput = React.forwardRef<HTMLElement, ISimpleInputProps>(
  ({ id, value, placeholder, onInput, onChange }, ref) => {
    const eventHandler =
      (
        callback: (value: string) => string,
      ): ReactEventHandler<HTMLSpanElement> =>
      (event) => {
        const target = event.currentTarget;
        if (!target) return;
        const newValue = callback(target.innerHTML);
        if (newValue !== target.innerHTML) {
          target.innerHTML = newValue;
        }
      };

    return (
      <span
        ref={ref}
        id={id}
        css={css`
          display: inline-block;
        `}
        onKeyUp={(event) => {
          eventHandler((value) => onInput(value, event.key))(event);
        }}
        onBlur={eventHandler(onChange)}
        contentEditable={true}>
        {value ?? placeholder}
      </span>
    );
  },
);

type ComponentParams = {
  id: string;
  backtrackOverflow?: string;
  command: IMacros;
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
    const commandDetector = useCommandDetector(
      macrosCollectionToCommands(macrosCollection),
    );
    const contentFromParams = useCommandEffectHandler();

    const internalOnInput = (value: string, valueDiff: string) => {
      let newValue = value;
      let newValueDisplay = value;

      const commandDetectorResult = commandDetector(value, valueDiff);

      switch (commandDetectorResult.status) {
        case CommandDetectorStatus.Detected: {
          const { command } = commandDetectorResult;
          newValueDisplay = removeCommandFromString(newValueDisplay, command);
          addToContentParamsSet({
            id: id + '_' + genrateRandomString(),
            command: commandToMacros(command, macrosCollection),
          });
          break;
        }
        case CommandDetectorStatus.Backtrack: {
          const { command, backtrackOverflow } = commandDetectorResult;
          newValueDisplay = removeCommandFromString(
            newValueDisplay,
            command,
            backtrackOverflow,
          );
          addToContentParamsSet({
            id: id + '_' + genrateRandomString(),
            command: commandToMacros(command, macrosCollection),
            backtrackOverflow,
          });
          break;
        }
        case CommandDetectorStatus.TypingInProgress:
        case CommandDetectorStatus.None:
        default:
          break;
      }

      onInput(newValue);
      return newValueDisplay;
    };

    const internalOnChange = (value: string) => {
      onChange(value);
      return value;
    };

    // TODO Enable user to add command characters into text by reverting commands effect on Backspace
    const BaseComponent = baseComponent || 'div';
    return (
      <BaseComponent>
        <SimpleInput
          ref={currentInput}
          id={id + '_initial'}
          onInput={internalOnInput}
          onChange={internalOnChange}
        />
        {contentParamsSet
          .map((contentParams) => {
            return [
              contentFromParams({
                ...contentParams,
                onInput, // FIXME Append value of nested inputs, not replace
                onChange: (value, focusNext) => onChange(value), // TODO Use focus next
                currentInputRef: currentInput,
              }),
              <SimpleInput
                key={id + '_input_' + contentParams.id}
                ref={currentInput}
                id={id + '_input_' + contentParams.id}
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
