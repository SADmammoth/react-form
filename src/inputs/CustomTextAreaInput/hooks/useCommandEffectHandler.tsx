import { ForwardedRef, RefObject } from 'react';
import { ReactNodeLike } from 'prop-types';
import { genrateRandomString } from 'src/helpers/generateRandomString';
import {
  CommandEffectType,
  IMacros,
  MacrosCollection,
} from '../../../types/InputsProps/inputTypes/ICustomTextAreaInputProps';
import AsyncCommandPlaceholder from '../AsyncCommandEffectPlaceholder';
import CustomTextAreaBlock from '../CustomTextAreaBlock';
import NestedTextInput from '../NestedTextInput';
import {
  addClosingMacroses,
  commandToMacros,
  createClosingMacros,
  createClosingMacroses,
  filterClosingCommands,
} from '../helpers/macrosCollectionConverter';

interface ICommandEffectHandlerArgs {
  id: string;
  onInput: (value: string) => void;
  onChange: (value: string, focusNext?: boolean) => void;
  command: IMacros;
  currentInputRef: RefObject<HTMLElement> | null;
  backtrackOverflow?: string;
}

export const useCommandEffectHandler =
  (macrosCollection: MacrosCollection) =>
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
      case CommandEffectType.NestedBlock: {
        const closingCommands = commandEffect.closingCommands ?? [
          command.openingCommand,
        ];
        const extendedMacrosCollection = addClosingMacroses(
          filterClosingCommands(
            commandEffect.macrosCollection?.(macrosCollection) ??
              macrosCollection,
          ),
          closingCommands,
        );
        return (
          <CustomTextAreaBlock
            id={id}
            key={id}
            ref={currentInputRef}
            macrosCollection={extendedMacrosCollection}
            baseComponent={commandEffect.wrapper}
            onInput={onInput} // TODO Closing commands handling
            onChange={onChange}
            value={backtrackOverflow}
            isFocused={true}
          />
        );
      }
      default: {
        return `<UNKNOWN COMMAND EFFECT TYPE '${command.commandEffect.type}'>`;
      }
    }
  };
