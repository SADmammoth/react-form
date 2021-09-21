/* eslint-disable no-use-before-define */
import { useReducer } from 'react';

import formReducer, { init, actions } from './formReducer';
import useCreateInputs from './handlers/useCreateInputs';
import useCreateValues from './handlers/useCreateValues';
import useUpdateInput from './handlers/useUpdateInput';
import useUpdateValue from './handlers/useUpdateValue';
import useInputHighlight from './useInputHighlight';

export default function useFormReducer(
  notifications,
  unloadProps,
  updateProps,
  inputAdditionalFields,
) {
  const highlightInput = useInputHighlight(
    (...args) => {
      dispatch(actions.highlightInput(...args));
    },
    (...args) => {
      dispatch(actions.unhighlightInput(...args));
    },
    2000,
    notifications,
  );

  const createInputs = useCreateInputs(
    updateValueCallback,
    highlightInput,
    notifications,
    unloadProps,
    updateProps,
    inputAdditionalFields,
  );
  const updateInput = useUpdateInput();
  const createValues = useCreateValues();
  const updateValue = useUpdateValue();

  const [state, dispatch] = useReducer(
    formReducer(updateInput, updateValue, createInputs, createValues),
    init,
  );

  function updateValueCallback(name, value) {
    dispatch(actions.updateValue(name, value));
  }

  return [state, dispatch, actions];
}
