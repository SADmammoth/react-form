import { useCallback } from 'react';
import { Optional } from '../helpers/Optional';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import Button from './generic/Button';
import Icon, { IconType } from './generic/Icon';

const NumberInput = ({
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
  min,
  max,
}: InputComponentProps<InputsProps, InputType.Number>) => {
  const id = formId + name;

  const inputStyle = style ? style.root : null;
  const inputBoxStyle = style ? style.inputBox : null;
  const labelStyle = style ? style.label : null;
  const buttonStyle = style ? style.button : null;
  const buttonsStyle = style ? style.buttons : null;

  const getValue = useCallback(() => {
    return value !== undefined ? value : min || 0;
  }, [value]);

  const increment = useCallback(() => {
    updateValue(name, getValue() + 1);
  }, [value]);

  const decrement = useCallback(() => {
    updateValue(name, (value !== undefined ? value : max || 0) - 1);
  }, [value]);

  return (
    <div css={inputBoxStyle}>
      <input
        css={inputStyle}
        id={id}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          //@ts-ignore
          const num = parseInt(event.target.value);
          event.target.value = (
            updateValue(name, num === num ? num : undefined) || ''
          ).toString(); // Change to ref
        }}
        onBlur={(event) => {
          const num = parseInt(event.target.value);
          event.target.value = (
            setValue(name, num === num ? num : undefined) || ''
          ).toString(); // Change to ref
        }}
        disabled={disabled}
        required={required}
      />
      <Optional $={!!label}>
        <label htmlFor={id} css={labelStyle}>
          {label}
        </label>
      </Optional>
      <div css={buttonsStyle}>
        <Button
          disabled={value === max}
          style={buttonStyle}
          label="Plus"
          onClick={() => {
            increment();
          }}>
          <Icon type={IconType.ChevronUp} />
        </Button>
        <Button
          disabled={value === min}
          style={buttonStyle}
          label="Minus"
          onClick={() => {
            decrement();
          }}>
          <Icon type={IconType.ChevronDown} />
        </Button>
      </div>
    </div>
  );
};

export default NumberInput;
