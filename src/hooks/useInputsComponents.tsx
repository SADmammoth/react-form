import { InputComponentProps } from 'src/types/InputsComponentsProps/InputsComponentsProps';
import { RegisteredInputsMap } from 'src/types/RegisteredInputsMap';
import { ALL_INPUTS_MAP } from '../const/ALL_INPUTS_MAP';
import { StyleByType } from '../helpers/getStyleByType';
import { IFormProps } from '../types/IFormProps';
import { InputStyle } from '../types/InputStyle';
import { InputPropsByType } from '../types/InputsProps/InputProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { UseInputsComponentsReturn } from '../types/UseInputsComponentsReturn';
import { useInputs } from './useInputs';
import { useInputsStyles } from './useInputsStyles';

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
        return <Input key={mappedInputProps.name} {...mappedInputProps} />;
      },
    ];
  };
};

export function useInputsComponents<InitInputsProps extends InputsProps>(
  props: IFormProps<InitInputsProps>,
  registeredInputsMap = ALL_INPUTS_MAP,
): UseInputsComponentsReturn<InitInputsProps> {
  const { inputs, stylesData, ...rest } = useInputs(props);
  const styles = useInputsStyles(stylesData);

  return {
    Inputs: Object.fromEntries(
      Object.entries(inputs).map(createComponent(registeredInputsMap, styles)),
    ),
    ...rest,
  };
}
