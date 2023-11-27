import { ReactNodeLike } from 'prop-types';
import { IActionButton } from '../atomic/IActionButton';
import { InputType } from '../atomic/InputType';
import { ITextBasedInputs } from '../compound/ITextBasedInputs';

export type MacrosCollection = {
  [commandKey: string]: {
    openingCommand: string;
    closingCommand?: string;
    commandEffect: (input: string) => Promise<ReactNodeLike>;
  };
};

export interface ICustomTextAreaInputProps extends ITextBasedInputs {
  type: InputType.CustomTextArea;
  macrosCommandPrefix?: string;
  macrosCollection: MacrosCollection;
  actionButton?: IActionButton;
}
