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
      if (oldValue.byCharValidator && oldValue.byCharValidator(value)) {
        setValues({ ...values, [name]: { ...oldValue, value } });
        return true;
      }
      //TODO Highlight Input
      return false;
    },
    [values],
  );

  const setValue: SetValueCallback<InitInputsProps> = useCallback(
    (name, value) => {
      const oldValue = values[name];
      if (oldValue.validator && oldValue.validator(value)) {
        setValues({ ...values, [name]: { ...oldValue, value } });
        return true;
      }
      //TODO Highlight Input
      return false;
    },
    [values],
  );

  return [values, updateValue, setValue];
}
