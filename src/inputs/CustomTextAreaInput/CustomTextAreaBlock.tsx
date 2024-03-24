import React, {
  ReactEventHandler,
  RefObject,
  UIEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { css } from '@emotion/react';
import { ReactComponentLike, ReactNodeLike } from 'prop-types';
import { genrateRandomString } from '../../helpers/generateRandomString';
import { regexEscape } from '../../helpers/regexExcape';
import { useStateArray } from '../../hooks/useStateArray';
import {
  CommandEffectType,
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
import { useFocus } from './hooks/useFocus';

export interface ICustomTextAreaBlockProps {
  id: string;
  value?: string;
  baseComponent?: ReactComponentLike;
  placeholder?: string;
  macrosCollection: MacrosCollection;
  onChange: (value: string, shouldFocusNext?: boolean) => void;
  onInput: (value: string) => void;
  isFocused?: boolean;
}

interface ISimpleInputProps {
  id: string;
  value?: string;
  placeholder?: string;
  onChange: (value: string, shouldFocusNext?: boolean) => string;
  onInput: (value: string, valueDiff: string) => string;
  onFocus: (target: HTMLElement) => void;
}

const SimpleInput = React.forwardRef<HTMLElement, ISimpleInputProps>(
  ({ id, value, placeholder, onInput, onChange, onFocus }, currentInput) => {
    const eventHandler =
      <Args extends any[]>(
        callback: (value: string, ...args: Args) => string,
        ...args: Args
      ): ReactEventHandler<HTMLSpanElement> =>
      (event) => {
        const target = event.currentTarget;
        if (!target) return;
        const newValue = callback(target.innerHTML, ...args);
        if (newValue !== target.innerHTML) {
          target.innerHTML = newValue;
        }
      };

    return (
      <span
        ref={currentInput}
        id={id}
        css={css`
          display: inline-block;
        `}
        onKeyUp={(event) => {
          eventHandler(onInput, event.key)(event);
        }}
        onBlur={eventHandler(onChange, false)}
        onFocus={(event) => onFocus(event.currentTarget)}
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
  HTMLElement,
  ICustomTextAreaBlockProps
>(
  (
    {
      baseComponent,
      placeholder,
      macrosCollection,
      onChange,
      onInput,
      id,
      isFocused,
    },
    currentInput,
  ) => {
    const { state: contentParamsSet, push: addToContentParamsSet } =
      useStateArray<ComponentParams>([]);
    const commandDetector = useCommandDetector(
      macrosCollectionToCommands(macrosCollection),
    );
    const contentFromParams = useCommandEffectHandler(macrosCollection);
    const { refByIndex, focus, focusInit, focusNext, focusIndex, unfocus } =
      useFocus(currentInput as RefObject<HTMLElement>);

    const {
      state: input,
      push: pushInput,
      setItem: updateInput,
    } = useStateArray<string>([]);

    let isFocusNext = false;

    const internalOnInput = (value: string, valueDiff: string) => {
      let newValue = value;
      let newValueDisplay = value;

      const commandDetectorResult = commandDetector(value, valueDiff);

      switch (commandDetectorResult.status) {
        case CommandDetectorStatus.Detected: {
          const { command } = commandDetectorResult;
          const macros = commandToMacros(command, macrosCollection);
          newValueDisplay = removeCommandFromString(newValueDisplay, command);
          if (macros.commandEffect.type === CommandEffectType.ClosingCommand) {
            console.log('CLOSING');
            onChange(newValue + command, true);
            break;
          }
          addToContentParamsSet({
            id: id + '_' + genrateRandomString(),
            command: macros,
          });

          isFocusNext = true;
          break;
        }
        case CommandDetectorStatus.Backtrack: {
          const { command, backtrackOverflow } = commandDetectorResult;
          const macros = commandToMacros(command, macrosCollection);
          newValueDisplay = removeCommandFromString(
            newValueDisplay,
            command,
            backtrackOverflow,
          );
          if (macros.commandEffect.type === CommandEffectType.ClosingCommand) {
            // TODO Refactor as "immediate commands".
            /**  Immediate commands - commands, that have a function as a command effect
             * and execute it immediately after detection.
             * These commands do not display any components.
             * */
            console.log('CLOSING');
            onChange(newValue + command, true);
            break;
          }

          addToContentParamsSet({
            id: id + '_' + genrateRandomString(),
            command: commandToMacros(command, macrosCollection),
            backtrackOverflow,
          });

          isFocusNext = true;
          break;
        }
        case CommandDetectorStatus.TypingInProgress:
        case CommandDetectorStatus.None:
        default:
          break;
      }

      updateInput(focusIndex, newValue);
      if (isFocusNext) {
        focusNext();
      }
      return newValueDisplay;
    };

    useEffect(() => {
      console.log(input);
      onInput(input.join(''));
    }, [input]);

    const internalOnChange = (value: string, shouldFocusNext?: boolean) => {
      console.log('INTERNAL ON CHANGE');
      // if (shouldFocusNext) {
      //   focusNext();
      // } // else {
      //   unfocus();
      // }
      onChange(input.join(''), shouldFocusNext);
      return value;
    };

    const onFocus = (index: number) => (target: HTMLElement) => {
      console.log('INPUT FOCUS');
      focus(index);
    };

    useEffect(() => {
      //@ts-ignore
      if (isFocused) {
        console.log('INIT');
        focusInit();
      } // else {
      //   unfocus();
      // }
      //@ts-ignore
    }, []);

    const commandEffectElements = contentParamsSet
      .map((contentParams, i) => {
        console.log(
          'LOOP',
          refByIndex(2 * i + 1),
          2 * i + 1,
          refByIndex(2 * i + 2),
          2 * i + 2,
        );
        return [
          contentFromParams({
            ...contentParams,
            onInput: (value) => {
              updateInput(2 * i + 1, value);
            }, // FIXME Append value of nested inputs, not replace
            onChange: (value: string, shouldFocusNext) => {
              if (!shouldFocusNext) {
                internalOnChange(value, false);
                return;
              }
              console.log('INDEX', focusIndex);
              focusNext();
            }, // TODO Use focus next
            currentInputRef: refByIndex(2 * i + 1),
          }),
          <SimpleInput
            ref={refByIndex(2 * i + 2)}
            key={id + '_input_' + contentParams.id}
            id={id + '_input_' + contentParams.id}
            onInput={internalOnInput}
            onChange={internalOnChange}
            onFocus={onFocus(2 * i + 2)}
          />,
        ];
      })
      .flat();

    // TODO Enable user to add command characters into text by reverting commands effect on Backspace
    const BaseComponent = baseComponent || 'div';
    return (
      <BaseComponent
        css={css`
          min-width: 20px;
          display: inline-block;
        `}>
        <SimpleInput
          ref={refByIndex(0)}
          id={id + '_initial'}
          onInput={internalOnInput}
          onChange={internalOnChange}
          onFocus={onFocus(0)}
        />
        {commandEffectElements}
      </BaseComponent>
    );
  },
);

export default CustomTextAreaBlock;
