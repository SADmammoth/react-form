import { InputsProps } from '../../types/InputsProps/InputsProps';
import { InputsState } from '../../types/State/InputsState';
import { UseInputsStateReturn } from '../../types/State/UseInputsStateReturn';

export function useInputsState<InitInputsProps extends InputsProps>(
  initState: InputsState<InitInputsProps>,
): UseInputsStateReturn<InitInputsProps> {
  return {} as unknown as UseInputsStateReturn<InitInputsProps>; //TODO
}
