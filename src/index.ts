import { FormDataOutput } from './types/FormDataOutput/FormDataOutput';
import { InputsProps } from './types/InputsProps/InputsProps';
import { InputType } from './types/InputsProps/atomic/InputType';

function getFormOutput<Props extends InputsProps>(props: Props) {
  return {} as unknown as FormDataOutput<Props>;
}

const data = getFormOutput({
  one: {
    type: InputType.Number,
    label: 'Label',
    value: 2,
  },
  three: {
    type: InputType.Checkbox,
    label: 'Label',
  },
});

data.one;
