import { useReducer, useState } from 'react';

import { actions } from './actions';
import manageSubforms from './helpers/manageSubforms';
import reducer from './reducer';

export default function useInputsState() {
  const [state, dispatch] = useReducer(reducer, {});
  // const [output, setOutput] = useSubforms(state);

  return [manageSubforms(state), actions(dispatch)];
}
