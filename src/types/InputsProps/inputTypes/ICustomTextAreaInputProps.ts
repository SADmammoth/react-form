import { MutableRefObject, RefObject } from 'react';
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
      callback: () => ReactNodeLike;
    }
  | {
      type: 'text-input';
      wrapper: ReactComponentLike;
    }
  | {
      type: 'custom-input';
      input: (
        ref: RefObject<HTMLElement>,
        onChange: (value: string) => {},
      ) => ReactNodeLike;
    }
  | { type: 'element'; element: ReactNodeLike }
  | {
      type: 'self';
      macrosCollection?: MacrosCollection;
      wrapper: ReactComponentLike;
    };

export type MacrosCollection = {
  [commandKey: string]: {
    openingCommand: string;
    commandEffect: CommandEffect;
  };
};

export interface ICustomTextAreaInputProps extends ITextBasedInputs {
  type: InputType.CustomTextArea;
  macrosCommandPrefix?: string;
  macrosCollection: MacrosCollection;
  actionButton?: IActionButton;
}
