import { InputsProps } from '../InputsProps';
import { InputType } from '../atomic/InputType';

export type SubformInputs =
  | InputsProps
  | ((name: string) => Promise<InputsProps>);

export interface ISubform {
  type: InputType.Subform;
  label: string;
  inputs: SubformInputs;
}
