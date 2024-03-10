import { useRef } from 'react';
import { InputComponentProps } from '../../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../../types/InputsProps/InputsProps';
import { InputType } from '../../types/InputsProps/atomic/InputType';
import CustomTextAreaBlock from './CustomTextAreaBlock';

const CustomTextAreaInput = (
  props: InputComponentProps<InputsProps, InputType.CustomTextArea>,
) => {
  const {
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
    macrosCollection,
    baseComponent,
  } = props;

  const ref = useRef<HTMLElement>(null);

  const onInput = (value: string) => {
    updateValue(name, value);
  };

  const onChange = (value: string) => {
    setValue(name, value);
  };

  return (
    <div css={style?.root}>
      <label htmlFor={formId + name} css={style?.label}>
        {label}
      </label>
      <CustomTextAreaBlock
        ref={ref}
        id={formId + name}
        value={value}
        onInput={onInput}
        onChange={onChange}
        placeholder={placeholder}
        macrosCollection={macrosCollection}
        isFocused={false}
      />
    </div>
  );
};

export default CustomTextAreaInput;
