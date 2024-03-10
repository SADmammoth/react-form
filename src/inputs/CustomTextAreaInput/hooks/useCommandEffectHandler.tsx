import { ForwardedRef, RefObject } from 'react';
import { ReactNodeLike } from 'prop-types';
import {
  CommandEffectType,
  IMacros,
} from '../../../types/InputsProps/inputTypes/ICustomTextAreaInputProps';
import AsyncCommandPlaceholder from '../AsyncCommandEffectPlaceholder';
import NestedTextInput from '../NestedTextInput';

interface ICommandEffectHandlerArgs {
  id: string;
  onInput: (value: string) => void;
  onChange: (value: string, focusNext?: boolean) => void;
  command: IMacros;
  currentInputRef: ForwardedRef<HTMLInputElement>;
  backtrackOverflow?: string;
}

export const useCommandEffectHandler =
  () =>
  ({
    id,
    currentInputRef,
    command,
    onInput,
    onChange,
    backtrackOverflow,
  }: ICommandEffectHandlerArgs): ReactNodeLike => {
    const { commandEffect, openingCommand } = command;
    switch (commandEffect.type) {
      case CommandEffectType.Simple: {
        return (
          <AsyncCommandPlaceholder
            key={id}
            commandEffectPromise={commandEffect.callback(backtrackOverflow)}
            placeholder={commandEffect.placeholder?.(backtrackOverflow)}
          />
        );
      }
      case CommandEffectType.TextInput: {
        return (
          <NestedTextInput
            key={id}
            id={id}
            ref={currentInputRef}
            command={command}
            wrapper={commandEffect.wrapper}
            onChange={onChange}
            onInput={onInput}
            placeholder={commandEffect.placeholder}
            closingCommands={commandEffect.closingCommands}
          />
        );
      }
      case CommandEffectType.CustomInput: {
        return commandEffect.input(
          currentInputRef as RefObject<HTMLElement>,
          onInput,
          (finalValue, focusNext, placeholderElement) => {
            console.log(focusNext ? 'CLOSE' : 'FOCUS AWAY');
            onChange(finalValue, focusNext); //TODO Use placeholder
          },
          backtrackOverflow,
        );
      }
      // TODO
      default: {
        return <b>{backtrackOverflow || '"' + openingCommand + '"'}</b>;
      }
    }
  };
