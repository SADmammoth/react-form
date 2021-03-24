import { useCallback, useReducer } from 'react';
import formReducer, { init, actions } from './formReducer';
import useCreateInputs from './handlers/useCreateInputs';
import useUpdateInput from './handlers/useUpdateInput';
import useCreateValues from './handlers/useCreateValues';
import useUpdateValue from './handlers/useUpdateValue';
import useInputHighlight from './useInputHighlight';

export default function useFormReducer(onInputsUpdate, notifications, render) {
  const highlightInput = useInputHighlight(
    (...args) => {
      dispatch(actions.highlightInput(...args));
    },
    (...args) => {
      dispatch(actions.unhighlightInput(...args));
    },
    2000,
    notifications
  );

  const createInputs = useCreateInputs(
    updateValueCallback,
    highlightInput,
    render
  );
  const updateInput = useUpdateInput(
    updateValueCallback,
    onInputsUpdate,
    highlightInput,
    render
  );
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
