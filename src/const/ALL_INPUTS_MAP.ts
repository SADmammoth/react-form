import CheckboxGroupInput from '../inputs/CheckboxGroupInput';
import CheckboxInput from '../inputs/CheckboxInput';
import NumberInput from '../inputs/NumberInput';
import RadioGroupInput from '../inputs/RadioGroupInput';
import TextInput from '../inputs/TextInput';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { RegisteredInputsMap } from '../types/RegisteredInputsMap';

export const ALL_INPUTS_MAP: RegisteredInputsMap = {
  [InputType.Checkbox]: CheckboxInput,
  [InputType.CheckboxGroup]: CheckboxGroupInput,
  [InputType.Number]: NumberInput,
  [InputType.Text]: TextInput,
  [InputType.RadioGroup]: RadioGroupInput,
};
