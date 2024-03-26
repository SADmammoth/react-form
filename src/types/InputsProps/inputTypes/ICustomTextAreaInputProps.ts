import { MutableRefObject, ReactEventHandler, RefObject } from 'react';
import { ReactComponentLike, ReactNodeLike } from 'prop-types';
import { IActionButton } from '../atomic/IActionButton';
import { InputType } from '../atomic/InputType';
import { ITextBasedInputs } from '../compound/ITextBasedInputs';

export enum CommandEffectType {
  Simple = 'simple',
  TextInput = 'text-input',
  CustomInput = 'custom-input',
  NestedBlock = 'nested-block',
  FunctionCall = 'function-call',
}

export type CommandEffect =
  | {
      type: CommandEffectType.Simple;
      callback: (initialValue?: string) => Promise<ReactNodeLike>;
      placeholder?: (initialValue?: string) => ReactNodeLike;
      //TODO call callback on click: bool
      //TODO Static rendering === placeholder?
    }
  | {
      type: CommandEffectType.TextInput;
      wrapper: ReactComponentLike;
      closingCommands?: string[] | null;
      placeholder?: string;
    }
  | {
      type: CommandEffectType.CustomInput;
      input: (
        ref: RefObject<HTMLElement> | null,
        onInput: (value: string) => void,
        onChange: (
          finalValue: string,
          focusNext?: boolean,
          placeholderElement?: ReactNodeLike,
        ) => void,
        initialValue?: string,
      ) => ReactNodeLike;
    }
  | {
      type: CommandEffectType.NestedBlock;
      macrosCollection?: (
        parentMacrosCollection: MacrosCollection,
      ) => MacrosCollection;
      wrapper: ReactComponentLike;
      closingCommands?: string[];
      isAbortable?: boolean;
    }
  | {
      type: CommandEffectType.FunctionCall;
      function: (value: string) => void;
    };

export interface IMacros {
  openingCommand: string;
  commandEffect: CommandEffect;
}

export type MacrosCollection = {
  [commandKey: string]: IMacros;
};

export interface ICustomTextAreaInputProps extends ITextBasedInputs {
  type: InputType.CustomTextArea;
  macrosCommandPrefix?: string;
  macrosCollection: MacrosCollection;
  actionButton?: IActionButton;
  baseComponent?: ReactComponentLike;
}
