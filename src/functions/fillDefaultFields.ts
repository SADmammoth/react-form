import { InputPropsIntersection } from '../types/InputsProps/InputProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';

const defaultProps = {
  [InputType.Text]: {
    disabled: false,
    hidden: false,
    required: false,

    minSymbols: 0,
    maxSymbols: Infinity,
    placeholder: '',
  },
  [InputType.Number]: {
    disabled: false,
    hidden: false,
    required: false,

    min: -Infinity,
    max: Infinity,
    step: 1,
  },
  [InputType.Checkbox]: {
    disabled: false,
    hidden: false,
    required: false,
  },
  [InputType.CheckboxGroup]: {
    disabled: false,
    hidden: false,
    required: false,
  },
  [InputType.File]: {
    disabled: false,
    hidden: false,
    required: false,

    allowMultiple: false,
  },
  [InputType.Image]: {
    disabled: false,
    hidden: false,
    required: false,

    allowMultiple: false,
  },
  [InputType.RadioGroup]: {
    disabled: false,
    hidden: false,
    required: false,
  },
  [InputType.Range]: {
    disabled: false,
    hidden: false,
    required: false,

    alwaysShowTip: false,
  },
  [InputType.Search]: {
    disabled: false,
    hidden: false,
    required: false,

    allowScroll: false,
    allowMultiple: false,
    minSymbols: 0,
    maxSymbols: Infinity,
    placeholder: '',
  },
  [InputType.Select]: {
    disabled: false,
    hidden: false,
    required: false,

    allowScroll: false,
    allowMultiple: false,
  },
  [InputType.Slider]: {
    disabled: false,
    hidden: false,
    required: false,

    alwaysShowTip: false,
  },
  [InputType.TextArea]: {
    disabled: false,
    hidden: false,
    required: false,

    allowScroll: false,
    isResizable: true,
    minSymbols: 0,
    maxSymbols: Infinity,
    placeholder: '',
  },
};

export function fillDefaultFields<Props extends InputsProps>(
  inputsProps: Props,
): Props {
  return Object.fromEntries(
    Object.entries(inputsProps).map(([name, inputProps]) => [
      name,
      {
        ...defaultProps[inputProps.type],
        ...inputProps,
      },
    ]),
  ) as Props;
}
