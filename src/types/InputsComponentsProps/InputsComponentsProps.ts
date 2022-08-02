import { InputsProps } from '../InputsProps/InputsProps';
import { SetValueCallback } from '../SetValueCallback';
import { InputsState } from '../State/InputsState';
import { UpdateValueCallback } from '../UpdateValueCallback';

export type InputsComponentsProps<Props extends InputsProps> =
  InputsState<Props> & {
    formId: string;
    updateValue: UpdateValueCallback;
    setValue: SetValueCallback;
  };
