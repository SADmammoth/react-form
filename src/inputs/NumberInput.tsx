import { Optional } from '../helpers/Optional';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';

const NumberInput = ({
  type,
  label,
  name,
  formId,
  placeholder,
  value,
  setValue,
  updateValue,
  disabled,
  required,
  style,
}: InputComponentProps<InputsProps, InputType.Text>) => {
  const id = formId + name;

  const inputStyle = style ? style.root : null;
  const inputBoxStyle = style ? style.inputBox : null;
  const labelStyle = style ? style.label : null;

  return (
    <div css={inputBoxStyle}>
      <input
        css={inputStyle}
        id={id}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value as string}
        onChange={(event) => {
          //@ts-ignore
          event.target.value = updateValue(name, event.target.value) || ''; // Change to ref
        }}
        onBlur={(event) => {
          //@ts-ignore
          event.target.value = setValue(name, event.target.value) || '';
        }}
        disabled={disabled}
        required={required}
      />
      <Optional $={!!label}>
        <label htmlFor={id} css={labelStyle}>
          {label}
        </label>
      </Optional>
    </div>
  );
};

export default NumberInput;
