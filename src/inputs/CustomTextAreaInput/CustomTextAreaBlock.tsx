import React, {
  ReactEventHandler,
  RefObject,
  UIEvent,
  useEffect,
  useMemo,
  useRef,
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
import { putContentEditableCursorToEnd } from './helpers/putContentEditableCursorToEnd';
import { removeCommandFromString } from './helpers/removeCommandFromString';
import {
  CommandDetectorStatus,
  useCommandDetector,
} from './hooks/useCommandDetector';
import { useCommandEffectHandler } from './hooks/useCommandEffectHandler';
import { useFocus } from './hooks/useFocus';

const CANCEL_COMMAND_KEYS = ['Backspace'];

export interface ICustomTextAreaBlockProps {
  id: string;
  value?: string;
  baseComponent?: ReactComponentLike;
  placeholder?: string;
  macrosCollection: MacrosCollection;
  onChange: (value: string, shouldFocusNext?: boolean) => void;
  onAbort?: (value: string) => void;
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
        onFocus={(event) => {
          const target = event.currentTarget;
          if (!target) return;
          onFocus(event.currentTarget);
          console.log('VALUE', value);
          if (value !== target.innerHTML) {
            target.innerHTML = value ?? '';
          }
          putContentEditableCursorToEnd(target);
        }}
        contentEditable={true}>
        {placeholder}
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
      onAbort,
      id,
      isFocused,
    },
    currentInput,
  ) => {
    const {
      state: contentParamsSet,
      push: addToContentParamsSet,
      pop: popFromContentParamsSet,
    } = useStateArray<ComponentParams>([]);
    const commandDetector = useCommandDetector(
      macrosCollectionToCommands(macrosCollection),
    );
    const contentFromParams = useCommandEffectHandler(macrosCollection);
    const {
      refByIndex,
      focus,
      focusInit,
      focusNext,
      focusPrev,
      focusIndex,
      unfocus,
    } = useFocus(currentInput as RefObject<HTMLElement>);
    const {
      state: inputsValues,
      setItem: updateInputValue,
      removeIndex: removeInputValue,
    } = useStateArray<string>([]);

    const {
      state: input,
      push: pushInput,
      setItem: updateInput,
      removeIndex: removeInput,
    } = useStateArray<string>([]);

    let isFocusNext = false;

    const internalOnInput = (value: string, valueDiff: string) => {
      let newValue = value;
      let newValueDisplay = value;

      if (onAbort && value === '' && CANCEL_COMMAND_KEYS.includes(valueDiff)) {
        onAbort(value);
        return value;
      }

      const commandDetectorResult = commandDetector(value, valueDiff);

      switch (commandDetectorResult.status) {
        case CommandDetectorStatus.Detected: {
          const { command } = commandDetectorResult;
          const macros = commandToMacros(command, macrosCollection);
          newValueDisplay = removeCommandFromString(newValueDisplay, command);
          if (macros.commandEffect.type === CommandEffectType.FunctionCall) {
            macros.commandEffect.function(value);
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
          if (macros.commandEffect.type === CommandEffectType.FunctionCall) {
            macros.commandEffect.function(value);
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
      updateInputValue(focusIndex, newValueDisplay);
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
      // TODO Replace shouldFocusNext with focusIndex, to focus previous input on certain keys
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
              focusNext();
            },
            onAbort: (value: string) => {
              console.log('ABORT', value);
              const removedCommand = popFromContentParamsSet();
              const {
                command: { openingCommand },
                backtrackOverflow,
              } = removedCommand;
              const commandReplacement =
                openingCommand + (backtrackOverflow ?? '');
              const previousInput = input[focusIndex - 1];
              updateInput(focusIndex - 1, previousInput + commandReplacement);
              removeInput(focusIndex);

              const previousInputValue = inputsValues[focusIndex - 1];
              console.log(
                focusIndex - 1,
                previousInputValue + commandReplacement,
              );
              updateInputValue(
                focusIndex - 1,
                previousInputValue + commandReplacement,
              );
              removeInputValue(focusIndex);
              focusPrev();
            },
            value: contentParams.backtrackOverflow ?? inputsValues[2 * i + 1],
            currentInputRef: refByIndex(2 * i + 1),
          }),
          <SimpleInput
            ref={refByIndex(2 * i + 2)}
            key={id + '_input_' + contentParams.id}
            id={id + '_input_' + contentParams.id}
            onInput={internalOnInput}
            onChange={internalOnChange}
            onFocus={onFocus(2 * i + 2)}
            value={inputsValues[2 * i + 1]}
          />,
        ];
      })
      .flat();
    console.log('VALUES', inputsValues);
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
          value={inputsValues[0]}
        />
        {commandEffectElements}
      </BaseComponent>
    );
  },
);

export default CustomTextAreaBlock;
