import { useState } from 'react';
import { InputsProps } from '../../types/InputsProps/InputsProps';
import { InputsState } from '../../types/State/InputsState';
import { UseInputsStateReturn } from '../../types/State/UseInputsStateReturn';
import { UpdateInputCallback } from '../../types/UpdateInputCallback';

export function useInputsState<InitInputsProps extends InputsProps>(
  initState: InputsState<InitInputsProps>,
): UseInputsStateReturn<InitInputsProps> {
  const [inputs, setInputs] = useState(initState);

  const updateInputs: UpdateInputCallback<InitInputsProps> = (name, props) => {
    setInputs((oldInputs) => {
      return { ...oldInputs, [name]: { ...oldInputs[name], ...props } };
    });
  };

  const resetState = () => {
    setInputs(initState);
  };
  return [inputs, updateInputs, resetState];
}
