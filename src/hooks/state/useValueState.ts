import { InputsProps } from '../../types/InputsProps/InputsProps';
import { UseValuesStateReturn } from '../../types/State/UseValueStateReturn';
import { ValuesState } from '../../types/State/ValuesState';

export function useValueState<InitInputsProps extends InputsProps>(
  initState: ValuesState<InitInputsProps>,
): UseValuesStateReturn<InitInputsProps> {
  return {} as unknown as UseValuesStateReturn<InitInputsProps>;
}
