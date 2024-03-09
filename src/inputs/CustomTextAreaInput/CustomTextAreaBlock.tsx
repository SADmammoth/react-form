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
  CommandDetectorStatus,
  useCommandDetector,
} from './useCommandDetector';
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
    const commandDetector = useCommandDetector(macrosCollection);
    const contentFromParams = useCommandEffectHandler();

    const internalOnInput = (value: string, valueDiff: string) => {
      let newValue = value;
      let newValueDisplay = value;

      const { command, status, backtrackOverflow } = commandDetector(
        value,
        valueDiff,
      );

      switch (status) {
        case CommandDetectorStatus.Backtrack:
        case CommandDetectorStatus.Detected: {
          console.log(
            `${regexEscape((command as IMacros).openingCommand)}${
              backtrackOverflow ? regexEscape(backtrackOverflow) : ''
            }$`,
          );
          newValueDisplay = newValueDisplay.replace(
            new RegExp(
              `${regexEscape((command as IMacros).openingCommand)}${
                backtrackOverflow ? regexEscape(backtrackOverflow) : ''
              }$`,
            ),
            '',
          );
          addToContentParamsSet({
            id: id + '_' + genrateRandomString(),
            command: command as IMacros,
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
