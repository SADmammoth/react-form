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
        console.log(oldValue.byCharValidator(value));
        if (!oldValue.byCharValidator(value)) {
          return oldValue.value as unknown as typeof value; //FIXME
        }
      }
      setValues({ ...values, [name]: { ...oldValue, value } });

      return value;
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
          return oldValue.value as unknown as typeof value; //FIXME
        }
      }
      setValues({ ...values, [name]: { ...oldValue, value } });

      return value;
    },
    [values],
  );

  const resetState = () => {
    setValues(initState);
  };

  return [values, updateValue, setValue, resetState];
}
