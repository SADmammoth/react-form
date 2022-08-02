import { IFormProps } from '../types/IFormProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { UseInputsReturn } from '../types/UseInputsReturn';

export function useInputs<InitInputsProps extends InputsProps>(
  inputs: IFormProps<InitInputsProps>,
): UseInputsReturn<InitInputsProps> {
  return {} as unknown as UseInputsReturn<InitInputsProps>; //TODO
}
