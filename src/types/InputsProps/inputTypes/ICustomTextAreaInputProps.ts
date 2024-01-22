import { MutableRefObject, ReactEventHandler, RefObject } from 'react';
import { ReactComponentLike, ReactNodeLike } from 'prop-types';
import { IActionButton } from '../atomic/IActionButton';
import { InputType } from '../atomic/InputType';
import { ITextBasedInputs } from '../compound/ITextBasedInputs';

export enum CommandEffectType {
  Simple = 'simple',
  TextInput = 'text-input',
  CustomInput = 'custom-input',
  Element = 'element',
  Self = 'self',
}

export type CommandEffect =
  | {
      type: 'simple';
      callback: () => Promise<ReactNodeLike>;
    }
  | {
      type: 'text-input';
      wrapper: ReactComponentLike;
      closingCommands?: string[];
    }
  | {
      type: 'custom-input';
      input: (
        ref: RefObject<HTMLElement>,
        onChange: ReactEventHandler,
        onClose: (placeholderElement?: ReactNodeLike) => void,
        isActive: boolean,
      ) => ReactNodeLike;
    }
  | {
      type: 'self';
      macrosCollection?: (
        parentMacrosCollection: MacrosCollection,
      ) => MacrosCollection;
      wrapper: ReactComponentLike;
      closingCommands?: string[];
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
}
