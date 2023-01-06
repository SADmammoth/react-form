import { StyleByType } from 'src/helpers/getStyleByType';
import { IFormProps } from 'src/types/IFormProps';
import { InputStyle } from 'src/types/InputStyle';
import { InputComponentProps } from 'src/types/InputsComponentsProps/InputsComponentsProps';
import { InputPropsByType } from '../types/InputsProps/InputProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { UseInputsComponentsReturn } from '../types/UseInputsComponentsReturn';
import { useInputs } from './useInputs';
import { useInputsStyles } from './useInputsStyles';
import {
  RegisteredInputsMap,
  useRegisteredInputsMap,
} from './useRegisterInputs';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const createComponent = <InitInputsProps extends InputsProps>(
  registeredInputs: RegisteredInputsMap<InitInputsProps>,
  styles: InputStyle<InitInputsProps>,
) => {
  type Props = InputComponentProps<InitInputsProps, keyof InputPropsByType>;
  return ([name, { type, ...inputProps }]: [name: string, props: Props]) => {
    return [
      capitalize(name),
      ({ style }: { style: StyleByType[keyof StyleByType] }) => {
        const Input = registeredInputs[type] as React.ComponentType<Props>;
        const mappedInputProps = {
          type,
          style: { ...styles[type], ...style },
          ...inputProps,
        } as Props;
        console.log(registeredInputs);
        return <Input key={mappedInputProps.name} {...mappedInputProps} />;
      },
    ];
  };
};

export function useInputsComponents<InitInputsProps extends InputsProps>(
  props: IFormProps<InitInputsProps>,
): UseInputsComponentsReturn<InitInputsProps> {
  const registeredInputs = useRegisteredInputsMap();
  const { inputs, stylesData, ...rest } = useInputs(props);
  const styles = useInputsStyles(stylesData);

  return {
    Inputs: Object.fromEntries(
      Object.entries(inputs).map(createComponent(registeredInputs, styles)),
    ),
    ...rest,
  };
}
