import { useReducer } from 'react';

import { actions } from './actions';
import reducer from './reducer';

export default function useInputsState() {
  const [state, dispatch] = useReducer(reducer, {});

  return [state, actions(dispatch)];
}
