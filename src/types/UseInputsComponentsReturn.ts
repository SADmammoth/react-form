import { StyleByType } from 'src/helpers/getStyleByType';
import { IFormComponentProps } from './IFormComponentProps';
import { InputComponent } from './InputComponent';
import { InputsComponentsProps } from './InputsComponentsProps/InputsComponentsProps';
import { InputPropsByType } from './InputsProps/InputProps';
import { InputsProps } from './InputsProps/InputsProps';
import { SetValueCallback } from './SetValueCallback';
import { StylesData } from './StylesData';

type KeyOfInputsComponents<PropsKeys> = PropsKeys extends string
  ? Capitalize<PropsKeys>
  : PropsKeys;

export type InputsComponents<Props extends InputsProps> = {
  [name in KeyOfInputsComponents<keyof Props>]: React.ComponentType<{
    style: StyleByType[Props[name]['type']];
  }>;
};

export type UseInputsComponentsReturn<Props extends InputsProps> = {
  Inputs: InputsComponents<Props>;
  formProps: IFormComponentProps;
  setValue: SetValueCallback<Props>;
  setInputProps: <Name extends keyof Props>(
    name: Name,
    props: Partial<InputPropsByType[Props[Name]['type']]>,
  ) => void;
};
