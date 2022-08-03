import { useCallback, useState } from 'react';
import { InputsProps } from '../../types/InputsProps/InputsProps';
import { SetValueCallback } from '../../types/SetValueCallback';
import { UseValuesStateReturn } from '../../types/State/UseValueStateReturn';
import { ValuesState } from '../../types/State/ValuesState';
import { UpdateValueCallback } from '../../types/UpdateValueCallback';

export function useValueState<InitInputsProps extends InputsProps>(
  initState: ValuesState<InitInputsProps>,
): UseValuesStateReturn<InitInputsProps> {
  const [values, setValues] = useState(initState);

  const updateValue: UpdateValueCallback<InitInputsProps> = useCallback(
    (name, value) => {
      const oldValue = values[name];
      //TODO Highlight Input
      //TODO Control
      //TODO Binding

      if (oldValue.byCharValidator) {
        if (!oldValue.byCharValidator(value)) {
          return false;
        }
      }
      setValues({ ...values, [name]: { ...oldValue, value } });

      return true;
    },
    [values],
  );

  const setValue: SetValueCallback<InitInputsProps> = useCallback(
    (name, value) => {
      const oldValue = values[name];
      //TODO Highlight Input
      //TODO Control
      //TODO Binding
      if (oldValue.validator) {
        if (!oldValue.validator(value)) {
          return false;
        }
      }
      setValues({ ...values, [name]: { ...oldValue, value } });

      return true;
    },
    [values],
  );

  const resetState = () => {
    setValues(initState);
  };

  return [values, updateValue, setValue, resetState];
}
