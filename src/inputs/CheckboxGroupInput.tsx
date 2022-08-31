import { Optional } from '../helpers/Optional';
import { StyleByType } from '../helpers/getStyleByType';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import CheckboxInput from './CheckboxInput';

const CheckboxGroupInput = ({
  formId,
  name,
  label,
  setValue,
  style,
  value,
  valueOptions,
}: InputComponentProps<InputsProps, InputType.CheckboxGroup>) => {
  const id = formId + name;

  let checkboxStyles: StyleByType[InputType.Checkbox];
  let checkboxesStyles, checkboxesLabelStyle;
  if (style)
    ({
      checkboxes: checkboxesStyles,
      checkboxesLabel: checkboxesLabelStyle,
      ...checkboxStyles
    } = style);

  const addValue = (newValue: string) => {
    const oldValues = value === undefined ? [] : value;
    const newValueOption = valueOptions.find(({ value }) => value === newValue);
    if (!newValueOption) return;
    setValue(name, [...oldValues, newValueOption]);
  };

  const removeValue = (newValue: string) => {
    const oldValues = value === undefined ? [] : value;
    const newValueOptionIndex = oldValues.findIndex(
      ({ value }) => value === newValue,
    );
    if (newValueOptionIndex < 0) return;

    setValue(name, [
      ...oldValues.slice(0, newValueOptionIndex),
      ...oldValues.slice(newValueOptionIndex + 1, oldValues.length),
    ]);
  };

  return (
    <div css={checkboxesStyles}>
      <Optional $={!!label}>
        <label htmlFor={id} css={checkboxesLabelStyle}>
          {label}
        </label>
      </Optional>
      {valueOptions.map(({ label, value: optionValue }) => (
        <CheckboxInput
          style={checkboxStyles}
          label={label}
          type={InputType.Checkbox}
          formId={formId}
          name={optionValue}
          setValue={(name, isChecked) => {
            //@ts-ignore
            if (isChecked) {
              //@ts-ignore
              addValue(name);
            } else {
              //@ts-ignore
              removeValue(name);
            }
            return isChecked;
          }}
          updateValue={(_, value) => value}
          value={
            value
              ? !!value.find(
                  ({ value: valueCandidate }) => valueCandidate === optionValue,
                )
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default CheckboxGroupInput;
