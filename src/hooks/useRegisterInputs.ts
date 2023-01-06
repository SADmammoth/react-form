import { InputPropsByType } from 'src/types/InputsProps/InputProps';
import { InputComponent } from '../types/InputComponent';
import { InputsProps } from '../types/InputsProps/InputsProps';

export type RegisteredInputsMap<Props extends InputsProps = InputsProps> = {
  [typeKey in keyof InputPropsByType]?: InputComponent<Props, typeKey>;
};

let REGISTERED_INPUTS_MAP = {};

export function registerInputs(registeredInputsMap: RegisteredInputsMap) {
  REGISTERED_INPUTS_MAP = registeredInputsMap;
}

export function useRegisterInputs() {
  return registerInputs;
}

export function useRegisteredInputsMap() {
  return REGISTERED_INPUTS_MAP;
}
