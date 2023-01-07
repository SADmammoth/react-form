import { InputPropValueType } from 'src/types/InputsProps/InputPropValueType';
import { Optional } from '../helpers/Optional';
import { StyleByType } from '../helpers/getStyleByType';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import CheckboxInput from './CheckboxInput';

const RadioGroupInput = ({
  formId,
  name,
  label,
  setValue,
  style,
  value,
  valueOptions,
  disabled,
  required,
}: InputComponentProps<InputsProps, InputType.RadioGroup>) => {
  const id = formId + name;

  let checkboxStyles: StyleByType[InputType.Checkbox];
  let checkboxesStyles, checkboxesLabelStyle;
  if (style)
    ({
      checkboxes: checkboxesStyles,
      checkboxesLabel: checkboxesLabelStyle,
      ...checkboxStyles
    } = style);

  return (
    <div css={checkboxesStyles}>
      <Optional $={!!label}>
        <label htmlFor={id} css={checkboxesLabelStyle}>
          {label}
        </label>
      </Optional>
      {valueOptions.map(({ label, value: optionValue }) => (
        <CheckboxInput
          key={name + optionValue}
          style={checkboxStyles}
          label={label}
          type={InputType.Checkbox}
          formId={formId + optionValue}
          name={name + '[]'}
          setValue={(m, isChecked) => {
            let newValue;
            if (isChecked) {
              newValue = { label, value: optionValue };
            } else if (required) return true as typeof isChecked;
            setValue(name, newValue);
            return isChecked;
          }}
          updateValue={(_, value) => value}
          value={value ? value.value === optionValue : undefined}
          disabled={disabled}
          required={!value && required}
        />
      ))}
    </div>
  );
};

export default RadioGroupInput;
