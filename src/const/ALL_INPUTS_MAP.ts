import CheckboxGroupInput from '../inputs/CheckboxGroupInput';
import CheckboxInput from '../inputs/CheckboxInput';
import FileInput from '../inputs/FileInput';
import NumberInput from '../inputs/NumberInput';
import RadioGroupInput from '../inputs/RadioGroupInput';
import RangeInput from '../inputs/RangeInput';
import SearchInput from '../inputs/SearchInputs';
import SegmentedSliderInput from '../inputs/SegmentedSliderInput';
import SelectInput from '../inputs/SelectInput';
import SliderInput from '../inputs/SliderInput';
import TextInput from '../inputs/TextInput';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { RegisteredInputsMap } from '../types/RegisteredInputsMap';

export const ALL_INPUTS_MAP: RegisteredInputsMap = {
  [InputType.Checkbox]: CheckboxInput,
  [InputType.CheckboxGroup]: CheckboxGroupInput,
  [InputType.Number]: NumberInput,
  [InputType.Text]: TextInput,
  [InputType.RadioGroup]: RadioGroupInput,
  [InputType.Slider]: SliderInput,
  [InputType.SegmentedSlider]: SegmentedSliderInput,
  [InputType.Range]: RangeInput,
  [InputType.Select]: SelectInput,
  [InputType.Search]: SearchInput,
  [InputType.File]: FileInput,
};
