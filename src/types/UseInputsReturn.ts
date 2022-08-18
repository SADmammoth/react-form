import { IFormComponentProps } from './IFormComponentProps';
import { InputsComponentsProps } from './InputsComponentsProps/InputsComponentsProps';
import { InputPropValueType } from './InputsProps/InputPropValueType';
import { InputPropsByType } from './InputsProps/InputProps';
import { InputsProps } from './InputsProps/InputsProps';
import { SetValueCallback } from './SetValueCallback';
import { StylesData } from './StylesData';

export type UseInputsReturn<Props extends InputsProps> = {
  inputs: InputsComponentsProps<Props>;
  formProps: IFormComponentProps;
  setValue: SetValueCallback<Props>;
  setInputProps: <Name extends keyof Props>(
    name: Name,
    props: Partial<InputPropsByType[Props[Name]['type']]>,
  ) => void;

  stylesData: StylesData<Props>;
};
