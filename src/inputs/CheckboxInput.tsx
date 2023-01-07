import { Optional } from '../helpers/Optional';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';

const CheckboxInput = ({
  formId,
  type,
  name,
  label,
  setValue,
  style,
  value,
  disabled,
  required,
}: InputComponentProps<InputsProps, InputType.Checkbox>) => {
  const id = formId + name;

  const inputBoxStyle = style ? style.inputBox : null;
  const checkboxStyle = style ? style.checkbox : null;
  const labelStyle = style ? style.label : null;

  return (
    <div css={inputBoxStyle}>
      <input
        id={id}
        name={name}
        type={type}
        onChange={(event) => {
          //@ts-ignore
          event.target.checked = setValue(name, event.target.checked);
        }}
        css={checkboxStyle}
        defaultChecked={value}
        disabled={disabled}
        required={required}
        value={id}
      />
      <Optional $={!!label}>
        <label htmlFor={id} css={labelStyle}>
          {label}
        </label>
      </Optional>
    </div>
  );
};

export default CheckboxInput;
