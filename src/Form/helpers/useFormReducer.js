import { useReducer } from 'react';
import formReducer, { init, actions } from './formReducer';
import useCreateInputs from './handlers/useCreateInputs';
import useUpdateInput from './handlers/useUpdateInput';
import useCreateValues from './handlers/useCreateValues';
import useUpdateValue from './handlers/useUpdateValue';

export default function useFormReducer(onInputsUpdate) {
  const createInputs = useCreateInputs(updateValueCallback, onInputsUpdate);
  const updateInput = useUpdateInput(updateValueCallback, onInputsUpdate);
  const createValues = useCreateValues();
  const updateValue = useUpdateValue();

  const [state, dispatch] = useReducer(
    formReducer(
      updateInput,
      updateValue,
      createInputs,
      createValues,
      onInputsUpdate
    ),
    init
  );

  function updateValueCallback(name, value) {
    dispatch(actions.updateValue(name, value));
  }

  return [state, dispatch, actions];
}
