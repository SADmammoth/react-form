import { useEffect, useReducer, useState } from 'react';

import { actions } from './actions';
import manageSubforms from './helpers/manageSubforms';
import useSubforms from './helpers/useSubforms';
import reducer from './reducer';

export default function useInputsState() {
  const [state, dispatch] = useReducer(reducer, {});
  const [output, setOutput] = useSubforms(state);

  useEffect(() => {
    setOutput(state);
  }, [state]);

  return [output, actions(dispatch)];
}
