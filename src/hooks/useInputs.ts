import { fillDefaultFields } from '../functions/fillDefaultFields';
import { formatFormOutput } from '../functions/formatFormOutput';
import { inputsPropsToStates } from '../functions/inputsPropsToState';
import { stateToInputsComponentsProps } from '../functions/stateToInputsComponentsProps';
import { IFormProps } from '../types/IFormProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { UseInputsReturn } from '../types/UseInputsReturn';
import { useInputsState } from './state/useInputsState';
import { useValueState } from './state/useValueState';

export function useInputs<InitInputsProps extends InputsProps>({
  inputs: inputsProps,

  formId,
  onSubmit,
  resetOnSubmit,
}: IFormProps<InitInputsProps>): UseInputsReturn<InitInputsProps> {
  const [inputsInitState, valuesInitState] = inputsPropsToStates(
    fillDefaultFields(inputsProps),
  );

  const [inputs, updateInput] = useInputsState(inputsInitState);
  const [values, updateValue, setValue] = useValueState(valuesInitState);

  return {
    inputs: stateToInputsComponentsProps(inputs, {
      formId,
      setValue,
      updateValue,
    }),
    formProps: {
      onSubmit: () => {
        if (onSubmit) return onSubmit(formatFormOutput(values), resetOnSubmit);
      },
    },
    setInputProps: updateInput,
    setValue,
  };
}
