import { useMemo } from 'react';
import { fillDefaultFields } from '../functions/fillDefaultFields';
import { formatFormOutput } from '../functions/formatFormOutput';
import { inputsPropsToStates } from '../functions/inputsPropsToState';
import { stateToInputsComponentsProps } from '../functions/stateToInputsComponentsProps';
import { validateForm } from '../functions/validateForm';
import { IFormProps } from '../types/IFormProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { StylesData } from '../types/StylesData';
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

  const [inputs, updateInput, resetInputsState] =
    useInputsState(inputsInitState);
  const [values, updateValue, setValue, resetValuesState] =
    useValueState(valuesInitState);

  const stylesData = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(inputsProps).map(([name, { type }]) => {
          return [name, type];
        }),
      ) as StylesData<InitInputsProps>,
    [inputsProps],
  );

  return {
    inputs: stateToInputsComponentsProps(inputs, values, {
      formId,
      setValue,
      updateValue,
    }),
    formProps: {
      onSubmit: (event) => {
        if (onSubmit) {
          event.preventDefault();
        }
        if (!validateForm(values)) {
          //Notification
          console.error('Validation failed');
          return false;
        }
        const data = formatFormOutput(values);
        if (onSubmit) {
          onSubmit(data).then(() => {
            if (resetOnSubmit) {
              resetInputsState();
              resetValuesState();
            }
          });
        }
      },
    },
    setInputProps: updateInput,
    setValue,
    stylesData,
  };
}
