import React, { Attributes, useState } from 'react';
import { InputComponent } from '../types/InputComponent';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputPropsByType } from '../types/InputsProps/InputProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { StatefullInputProps } from '../types/StatefullInputProps';

export function withValueState<Type extends keyof InputPropsByType>(
  WrappedInput: InputComponent<InputsProps, Type>,
): React.ComponentType<StatefullInputProps<Type>> {
  return ({ ...props }) => {
    const [value, setValue] = useState(props.value);
    const passedProps: Attributes & InputComponentProps<InputsProps, Type> = {
      key: props.name,
      ...props,
      formId: props.name,
      updateValue: (_, newValue) => {
        if (props.onInput)
          props.onInput(newValue as unknown as InputPropsByType[Type]['value']);
        setValue(newValue as unknown as InputPropsByType[Type]['value']);
        return true;
      },
      setValue: (_, newValue) => {
        if (props.onChange) props.onChange(newValue);
        setValue(newValue);
        return true;
      },
      value,
    };

    return React.createElement(WrappedInput, passedProps);
  };
}
