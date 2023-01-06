import CheckboxGroupInput from '../inputs/CheckboxGroupInput';
import CheckboxInput from '../inputs/CheckboxInput';
import NumberInput from '../inputs/NumberInput';
import TextInput from '../inputs/TextInput';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { RegisteredInputsMap, registerInputs } from './useRegisterInputs';

const ALL_INPUTS_MAP: RegisteredInputsMap = {
  [InputType.Checkbox]: CheckboxInput,
  [InputType.CheckboxGroup]: CheckboxGroupInput,
  [InputType.Number]: NumberInput,
  [InputType.Text]: TextInput,
};

function registerAllInputs() {
  registerInputs(ALL_INPUTS_MAP);
}

export function useRegisterAllInputs() {
  return registerAllInputs;
}
