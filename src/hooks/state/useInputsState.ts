import { InputsProps } from '../../types/InputsProps/InputsProps';
import { UseInputsStateReturn } from '../../types/State/UseInputsStateReturn';

export function useInputsState<
  Props extends InputsProps,
>(): UseInputsStateReturn<Props> {
  return {} as unknown as UseInputsStateReturn<Props>; //TODO
}
