import { InputsProps } from '../InputsProps/InputsProps';
import { SetValueCallback } from '../SetValueCallback';
import { UpdateValueCallback } from '../UpdateValueCallback';

export type CommonInputsComponentsProps<Props extends InputsProps> = {
  formId: string;
  updateValue: UpdateValueCallback<Props>;
  setValue: SetValueCallback<Props>;
};
