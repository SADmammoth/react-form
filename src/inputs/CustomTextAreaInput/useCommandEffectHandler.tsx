import { ForwardedRef, RefObject } from 'react';
import { IMacros } from '../../types/InputsProps/inputTypes/ICustomTextAreaInputProps';

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
  }: ICommandEffectHandlerArgs) => {
    switch (commandEffect.type) {
      // TODO
      default: {
        return <b>{backtrackOverflow || '"' + openingCommand + '"'}</b>;
      }
    }
  };
