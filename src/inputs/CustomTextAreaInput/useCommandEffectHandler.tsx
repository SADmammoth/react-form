import { ForwardedRef, RefObject } from 'react';
import { ReactNodeLike } from 'prop-types';
import {
  CommandEffectType,
  IMacros,
} from '../../types/InputsProps/inputTypes/ICustomTextAreaInputProps';
import AsyncCommandPlaceholder from './AsyncCommandEffectPlaceholder';

interface ICommandEffectHandlerArgs {
  onInput: any;
  onChange: any;
  command: IMacros;
  currentInputRef: ForwardedRef<HTMLInputElement>;
  backtrackOverflow?: string;
}

export const useCommandEffectHandler =
  (id: string) =>
  ({
    currentInputRef,
    command: { commandEffect, openingCommand },
    onInput,
    onChange,
    backtrackOverflow,
  }: ICommandEffectHandlerArgs): ReactNodeLike => {
    switch (commandEffect.type) {
      case CommandEffectType.Simple: {
        return (
          <AsyncCommandPlaceholder
            commandEffectPromise={commandEffect.callback(backtrackOverflow)}
            placeholder={commandEffect.placeholder?.(backtrackOverflow)}
          />
        );
      }
      // TODO
      default: {
        return <b>{backtrackOverflow || '"' + openingCommand + '"'}</b>;
      }
    }
  };
